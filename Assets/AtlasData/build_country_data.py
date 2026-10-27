"""Build the Lens's offline reference module from saved public-domain borders."""
import json
from pathlib import Path

BASE = Path(__file__).resolve().parent
META = [
('ar','Argentina','Buenos Aires','Spanish (de facto national language)','Argentine peso (ARS)','Mostly temperate; dry Patagonia and colder far-southern areas.','Catholic and Evangelical Christianity are prominent. Other faiths and nonreligious people are also represented.',[0.24,0.68,0.98]),
('bo','Bolivia','Sucre; La Paz is the seat of government','Spanish and 36 Indigenous languages, including Quechua, Aymara and Guarani','Boliviano (BOB)','Elevation shapes the climate: humid tropical lowlands and cold, drier highlands.','Catholic and Protestant Christianity are prominent; Indigenous spiritual traditions also continue.',[0.98,0.62,0.22]),
('br','Brazil','Brasilia','Portuguese','Brazilian real (BRL)','Tropical across much of the country; more temperate in the south.','Catholic and Evangelical Christianity are prominent, alongside Spiritism, Afro-Brazilian traditions, other faiths and nonreligious people.',[0.35,0.83,0.39]),
('cl','Chile','Santiago','Spanish (de facto national language)','Chilean peso (CLP)','Arid northern desert, Mediterranean central valleys and cool, wet southern areas.','Catholic and Evangelical/Protestant Christianity are prominent. Many people have no religious affiliation.',[0.98,0.39,0.47]),
('co','Colombia','Bogota','Spanish; ethnic-group languages are also official in their territories','Colombian peso (COP)','Warm tropical coasts and eastern plains; cooler conditions in mountain areas.','Catholic and Protestant Christianity are prominent, with other faiths and nonreligious people also represented.',[0.96,0.79,0.26]),
('ec','Ecuador','Quito','Spanish; Kichwa and Shuar for intercultural relations; other Indigenous languages in their areas','US dollar (USD)','Tropical coastal and Amazonian lowlands; cooler Andean highlands.','Catholic and Protestant Christianity are prominent. Other faiths and nonreligious people are also represented.',[0.65,0.43,0.98]),
('gy','Guyana','Georgetown','English','Guyanese dollar (GYD)','Hot, humid tropical conditions, with trade winds and two main rainy seasons.','Christianity, Hinduism and Islam are major traditions. Other beliefs and nonreligious people are also represented.',[0.98,0.48,0.20]),
('py','Paraguay','Asuncion','Spanish and Guarani','Paraguayan guarani (PYG)','Subtropical to temperate; wetter in the east and increasingly dry toward the western Chaco.','Catholic Christianity is the largest tradition; Protestant communities and other beliefs are also present.',[0.91,0.38,0.80]),
('pe','Peru','Lima','Spanish; Quechua, Aymara and other Indigenous languages where predominant','Sol (PEN)','Dry Pacific coast, cold Andean heights and tropical eastern rainforest.','Catholic and Evangelical Christianity are prominent. Indigenous spiritual traditions and other beliefs also continue.',[0.25,0.82,0.75]),
('sr','Suriname','Paramaribo','Dutch','Surinamese dollar (SRD)','Humid tropical conditions, moderated by trade winds.','Christianity, Hinduism and Islam are major traditions; Winti and other beliefs are also represented.',[0.45,0.67,0.99]),
('uy','Uruguay','Montevideo','Spanish (de facto national language)','Uruguayan peso (UYU)','Temperate conditions, with relatively mild winters and warm summers.','Many people have no religious affiliation. Catholic and Protestant Christianity, Afro-Uruguayan traditions and other faiths are present.',[0.80,0.84,0.33]),
('ve','Venezuela','Caracas','Spanish; Indigenous languages have official status for Indigenous peoples','Bolivar (VES)','Tropical lowlands are hot and humid; higher areas have milder conditions.','Catholic and Protestant Christianity are prominent, alongside other faiths and nonreligious people.',[0.45,0.89,0.94]),
]
COUNTRY_CODES = {'ar':'ar','bo':'bl','br':'br','cl':'ci','co':'co','ec':'ec','gy':'gy','py':'pa','pe':'pe','sr':'ns','uy':'uy','ve':'ve'}
geo = json.loads((BASE/'natural-earth-countries.geojson').read_text())
pop = {x['country']['id'].lower():x['value'] for x in json.loads((BASE/'population-2024.json').read_text())[1]}
data = []
for iso,name,capital,languages,currency,climate,religions,color in META:
    feature = next(f for f in geo['features'] if f['properties']['ADMIN'] == name)
    g = feature['geometry']
    rings = [g['coordinates'][0]] if g['type']=='Polygon' else [poly[0] for poly in g['coordinates']]
    data.append(dict(id=iso,name=name,capital=capital,languages=languages,currency=currency,
        population=f"{pop[iso]:,} (2024; World Bank)",populationValue=pop[iso],populationYear=2024,
        climate=climate,religions=religions,color=color,polygons=rings,
        label=[feature['properties']['LABEL_X'],feature['properties']['LABEL_Y']],
        flagPath=f'../AtlasData/Flags/{iso}.png',
        sources=[f"https://github.com/factbook/factbook.json/blob/master/south-america/{COUNTRY_CODES[iso]}.json",
            f'https://data.worldbank.org/indicator/SP.POP.TOTL?locations={iso.upper()}',f'https://flagcdn.com/w320/{iso}.png']))
france = next(f for f in geo['features'] if f['properties']['ADMIN']=='France')
guiana = [poly[0] for poly in france['geometry']['coordinates'] if all(-60<x<-45 and -1<y<10 for x,y in poly[0])]
assert len(data)==12 and all(len(c['polygons'])>0 for c in data)
out = BASE.parent/'Scripts'/'AtlasCountryData.ts'
out.parent.mkdir(exist_ok=True)
types = '''// Offline reference snapshot; see ../AtlasData/SOURCES.md. Coordinates: [longitude,latitude].
export type CountryData = {
    id: string; name: string; capital: string; languages: string; currency: string;
    population: string; populationValue: number; populationYear: number;
    climate: string; religions: string; color: number[]; polygons: number[][][];
    label: number[]; flagPath: string; sources: string[];
};
'''
out.write_text(types+'export const COUNTRY_DATA: CountryData[] = '+json.dumps(data,ensure_ascii=False,separators=(',',':'))+';\n'
    +'export const ATLAS_TERRITORIES = '+json.dumps([dict(id='gf',name='French Guiana (France)',polygons=guiana,label=[-53.2,4])],separators=(',',':'))+';\n',encoding='utf8')
print(f'Wrote {out}: 12 sovereign countries, {sum(len(p) for c in data for p in c["polygons"])} border vertices, French Guiana context polygons: {len(guiana)}')
