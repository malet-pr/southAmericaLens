import {Scenario} from "Leaf.lspkg/Scenarios/scenario/Scenario"
import {expect} from "Leaf.lspkg/Utils/common/Expect"
import {findSceneObjectByName,sleep,nextFrame} from "Leaf.lspkg/Utils/common/Utils"
import {findInteractableByName} from "Leaf.lspkg/Interactors/InteractableUtils"
import {createIKInteractor} from "Leaf.lspkg/Interactors/interactor/ik/visualizer/BitmojiAvatar"
import {AtlasMain} from "../Scripts/AtlasMain"
import {AtlasMapMesh} from "../Scripts/AtlasMapMesh"
import {AtlasReaderUI} from "../Scripts/AtlasReaderUI"
import {COUNTRY_DATA} from "../Scripts/AtlasCountryData"
import {AtlasLeafInteractor} from "./AtlasLeafInteractor"
import {RoundedRectangle} from "SpectaclesUIKit.lspkg/Scripts/Visuals/RoundedRectangle/RoundedRectangle"

import {object,main,map,reader,label,distance,baseline,flagMatches} from "./AtlasLeafSupport"
@component
export class AtlasCriterion2 extends Scenario {
  async run():Promise<void> {
    const i=new AtlasLeafInteractor();await baseline(i)
    const start=map().countryWorldPosition('br'),seen:{phase:string,p:vec3}[]=[]
    const sample=this.createEvent('UpdateEvent');sample.bind(()=>seen.push({phase:main().phase,p:object('AtlasReader').getTransform().getWorldPosition()}))
    const before=main().transitionHistory.length
    try{await i.tap('Country_br',650)}finally{sample.enabled=false}
    expect(main().transitionHistory.slice(before)).toEqual(['rise:br','open:br'])
    expect(main().phase).toBe('open');expect(map().selectedId).toBe('br');expect(object('AtlasReader').isEnabledInHierarchy).toBe(true)
    expect(label('CountryName')).toBe('Brazil');flagMatches('br')
    const country=COUNTRY_DATA.find(c=>c.id==='br')!
    const actual=(object('AtlasReader').getComponent(RoundedRectangle.getTypeName()) as RoundedRectangle).backgroundColor
    expect(actual.x).toBeCloseTo(country.color[0]*.45,4);expect(actual.y).toBeCloseTo(country.color[1]*.45,4);expect(actual.z).toBeCloseTo(country.color[2]*.45,4)
    expect(reader().panelColor.x).toBeCloseTo(actual.x,4);expect(reader().panelColor.y).toBeCloseTo(actual.y,4);expect(reader().panelColor.z).toBeCloseTo(actual.z,4)
    const selectedZ=object('Country_br').getTransform().getLocalPosition().z
    expect(selectedZ).toBeGreaterThan(object('Country_pe').getTransform().getLocalPosition().z)
    const end=object('AtlasReader').getTransform().getWorldPosition()
    expect(distance(start,end)).toBeGreaterThan(15)
    expect(seen.some(s=>s.phase==='rising'&&distance(s.p,start)>1&&distance(s.p,end)>1)).toBe(true)
    const panelNormal=object('AtlasReader').getTransform().getWorldRotation().multiplyVec3(new vec3(0,0,1))
    expect(Math.abs(panelNormal.y)<0.1).toBe(true)
    expect(distance(main().camera.getTransform().getWorldPosition(),end)>75).toBe(true)
    expect(distance(main().camera.getTransform().getWorldPosition(),end)<130).toBe(true)
  }
}

