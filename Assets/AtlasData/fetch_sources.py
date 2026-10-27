"""Download reproducible, public reference data; never contacts Lens Studio."""
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import urllib.request

BASE = Path(__file__).resolve().parent
CODES = {'ar':'ar','bo':'bl','br':'br','cl':'ci','co':'co','ec':'ec',
         'gy':'gy','py':'pa','pe':'pe','sr':'ns','uy':'uy','ve':'ve'}

def download(item):
    name, url = item
    path = BASE / name
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.exists() and path.stat().st_size:
        return name + ': already saved'
    try:
        req = urllib.request.Request(url, headers={'User-Agent':'SouthAmericaLibraryAtlas/1.0'})
        with urllib.request.urlopen(req, timeout=30) as response:
            blob = response.read()
        path.write_bytes(blob)
        return name + ': ' + str(len(blob)) + ' bytes'
    except Exception as error:
        return name + ': ERROR ' + str(error)

jobs = []
for iso, factbook in CODES.items():
    jobs.append((f'References/{iso}.json', f'https://raw.githubusercontent.com/factbook/factbook.json/master/south-america/{factbook}.json'))
    jobs.append((f'Flags/{iso}.png', f'https://flagcdn.com/w320/{iso}.png'))
with ThreadPoolExecutor(max_workers=6) as pool:
    for result in pool.map(download, jobs):
        print(result)
