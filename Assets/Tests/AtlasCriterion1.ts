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
import {BackPlate} from "SpectaclesUIKit.lspkg/Scripts/BackPlate"

import {object,main,map,reader,label,distance,baseline,flagMatches} from "./AtlasLeafSupport"
@component
export class AtlasCriterion1 extends Scenario {
  async run():Promise<void> {
    const i=new AtlasLeafInteractor();await baseline(i)
    expect(COUNTRY_DATA.length).toBe(12)
    expect(map().countryCount).toBe(12)
    for(const c of COUNTRY_DATA){const country=object('Country_'+c.id);expect(country.isEnabledInHierarchy).toBe(true);expect((country.getComponent('Component.RenderMeshVisual') as RenderMeshVisual).mesh).toBeTruthy();expect(findInteractableByName('Country_'+c.id)).toBeTruthy()}
    const fullY=map().project(-56,4)[1]-map().project(-56,2)[1]
    await i.tap('RegionNorth')
    expect(main().region).toBe('north');expect(map().region).toBe('north')
    expect(map().project(-56,4)[1]-map().project(-56,2)[1]).toBeGreaterThan(fullY*2)
    await i.tap('Country_sr')
    expect(main().countryId).toBe('sr');expect(main().phase).toBe('open');expect(label('CountryName')).toBe('Suriname');flagMatches('sr')
    const history=main().transitionHistory.length
    await i.tap('ReturnFullMap',1000)
    expect(main().region).toBe('full');expect(main().phase).toBe('closed');expect(map().selectedId).toBe('')
    expect(main().transitionHistory.slice(history)).toEqual(['return:sr','closed:sr'])
    expect(map().project(-56,4)[1]-map().project(-56,2)[1]).toBeCloseTo(fullY,4)
    for(const c of COUNTRY_DATA)expect(object('Country_'+c.id).isEnabledInHierarchy).toBe(true)
    // Check actual country-mesh extents against the sidebar in their shared X axis.
    const nav=object('AtlasNavigation'),plate=nav.getComponent(BackPlate.getTypeName()) as BackPlate
    const toolbarRight=nav.getTransform().getLocalPosition().x+plate.size.x/2-map().sceneObject.getTransform().getLocalPosition().x
    const checkClearance=()=>{for(const c of COUNTRY_DATA){const root=object('Country_'+c.id);if(!root.isEnabledInHierarchy)continue;const mesh=(root.getComponent('Component.RenderMeshVisual') as RenderMeshVisual).mesh;expect(mesh.aabbMin.x+root.getTransform().getLocalPosition().x).toBeGreaterThan(toolbarRight+.25)}}
    checkClearance()
    for(const view of [{id:'north',button:'RegionNorth'},{id:'central',button:'RegionCentral'},{id:'south',button:'RegionSouth'},{id:'full',button:'ReturnFullMap'}]) {
      await i.tap(view.button,650);expect(main().region).toBe(view.id);checkClearance()
      if(view.id==='north'){await i.tap('Country_co');expect(label('CountryName')).toBe('Colombia')}
      if(view.id==='central'){await i.tap('Country_ec');expect(label('CountryName')).toBe('Ecuador')}
    }
  }
}

