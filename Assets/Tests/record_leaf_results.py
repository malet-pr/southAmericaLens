"""Extract only atlas test evidence, excluding unrelated editor/session log data."""
from pathlib import Path
import json,re

base=Path(__file__).resolve().parent
record=json.loads((base/'LeafRunResults.json').read_text(encoding='utf8'))
baseline=record['logBaseline']
with open(baseline['logFile'],'rb') as stream:
    stream.seek(baseline['byteOffset'])
    lines=stream.read().decode('utf8',errors='replace').splitlines()
evidence=[line for line in lines if ('[DefaultLeafScenarioManager]' in line and re.search(r'(RUNS:|PASSED:|FAILED:).*atlas-',line)) or '[Atlas LEAF] IK scroll route:' in line]
(base/'LEAF-preview-evidence.log').write_text('\n'.join(evidence)+'\n',encoding='utf8')
passed={match.group(1) for line in evidence if (match:=re.search(r'PASSED: (atlas-[a-z0-9-]+)',line))}
expected={row['scenarioId'] for row in record['results']}
assert expected<=passed, 'Missing authoritative pass lines: '+str(expected-passed)
print('Saved authoritative Lens-side pass evidence for all '+str(len(expected))+' scenarios.')
