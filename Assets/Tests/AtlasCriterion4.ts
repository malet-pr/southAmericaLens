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

import {object,main,map,reader,label,distance,baseline,flagMatches} from "./AtlasLeafSupport"
@component
export class AtlasCriterion4 extends Scenario {
  async run():Promise<void> {
    const i=new AtlasLeafInteractor();await baseline(i);await i.tap('Country_br');await i.tap('AtlasScrollDown')
    const count=main().transitionHistory.length
    const phases:string[]=[];const positions:vec3[]=[]
    const sample=this.createEvent('UpdateEvent');sample.bind(()=>{phases.push(main().phase);positions.push(object('AtlasReader').getTransform().getWorldPosition())})
    try{await i.tap('Country_ar',1100)}finally{sample.enabled=false}
    expect(main().transitionHistory.slice(count)).toEqual(['return:br','closed:br','rise:ar','open:ar'])
    expect(phases.includes('returning')).toBe(true);expect(phases.includes('rising')).toBe(true)
    expect(positions.length).toBeGreaterThan(5)
    expect(main().countryId).toBe('ar');expect(main().page).toBe(0);expect(map().selectedId).toBe('ar');expect(label('CountryName')).toBe('Argentina');flagMatches('ar')
    expect(object('Country_br').getTransform().getLocalPosition().z).toBeCloseTo(0,4)
    const closeHistory=main().transitionHistory.length,openPosition=object('AtlasReader').getTransform().getWorldPosition(),end=map().countryWorldPosition('ar')
    const returning:vec3[]=[];const closeSample=this.createEvent('UpdateEvent');closeSample.bind(()=>{if(main().phase==='returning')returning.push(object('AtlasReader').getTransform().getWorldPosition())})
    try{await i.tap('AtlasClose',650)}finally{closeSample.enabled=false}
    expect(main().transitionHistory.slice(closeHistory)).toEqual(['return:ar','closed:ar'])
    expect(returning.some(p=>distance(p,openPosition)>1&&distance(p,end)>1)).toBe(true)
    expect(main().phase).toBe('closed');expect(main().countryId).toBe('');expect(map().selectedId).toBe('');expect(object('AtlasReader').isEnabledInHierarchy).toBe(false)
    expect(distance(object('AtlasReader').getTransform().getWorldPosition(),end)<0.05).toBe(true)
  }
}

