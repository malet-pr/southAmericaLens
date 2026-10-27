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
export class AtlasCriterion3 extends Scenario {
  async run():Promise<void> {
    const i=new AtlasLeafInteractor();await baseline(i);await i.tap('Country_br')
    const c=COUNTRY_DATA.find(c=>c.id==='br')!,close=object('AtlasClose'),position=close.getTransform().getWorldPosition()
    const assertClose=()=>{
      expect(close.isEnabledInHierarchy).toBe(true);expect(findInteractableByName('AtlasClose').enabled).toBe(true);expect(distance(close.getTransform().getWorldPosition(),position)<0.02).toBe(true)
      const summary=object('CountrySummary').getComponent('Component.Text') as Text
      const glyph=summary.getBoundingBox(summary.text.length-1,summary.text.length),rect=summary.layoutRect
      expect(glyph.getSize().x>0&&glyph.getSize().y>0).toBe(true)
      expect(glyph.left>=rect.left-.05&&glyph.right<=rect.right+.05&&glyph.bottom>=rect.bottom-.05&&glyph.top<=rect.top+.05).toBe(true)
    }
    expect(label('CountrySummary').includes(c.capital)).toBe(true);expect(label('CountrySummary').includes(c.languages)).toBe(true);assertClose()
    const page=main().page;await i.tap('AtlasScrollDown');expect(main().page).toBe(page+1)
    expect(label('CountrySummary').includes(c.currency)).toBe(true);expect(label('CountrySummary').includes(c.population)).toBe(true);expect(label('CountrySummary').includes('2024')).toBe(true);assertClose()
    const page2=main().page;await i.tap('AtlasScrollDown');expect(main().page).toBe(page2+1)
    expect(label('CountrySummary').includes(c.climate)).toBe(true);expect(label('CountrySummary').includes(c.religions)).toBe(true);assertClose()
    const bottom=main().page;await i.tap('AtlasScrollDown');expect(main().page).toBe(bottom);assertClose()
    await i.tap('AtlasScrollUp');expect(main().page).toBe(bottom-1);await i.tap('AtlasScrollUp');expect(main().page).toBe(page)
    await i.tap('AtlasScrollUp');expect(main().page).toBe(page);assertClose()
    // Leave the longest summary open for the accompanying visual QA capture.
    await i.tap('AtlasScrollDown');await i.tap('AtlasScrollDown');assertClose()
  }
}

