import {Scenario} from "Leaf.lspkg/Scenarios/scenario/Scenario"
import {expect} from "Leaf.lspkg/Utils/common/Expect"
import {COUNTRY_DATA} from "../Scripts/AtlasCountryData"
import {AtlasLeafInteractor} from "./AtlasLeafInteractor"
import {assertTextFits,baseline,button,label,main,object} from "./AtlasLeafSupport"

@component
export class AtlasReadability extends Scenario {
  async run():Promise<void> {
    const i=new AtlasLeafInteractor()
    await baseline(i)
    for(const c of COUNTRY_DATA) {
      await i.tap('Country_'+c.id,1100)
      expect(main().countryId).toBe(c.id)
      expect(label('CountryName')).toBe(c.name)
      assertTextFits('CountryName')
      const fields=[[c.capital,c.languages],[c.currency,c.population],[c.climate,c.religions]]
      for(let page=0;page<fields.length;page++) {
        if(page>0)await i.tap('AtlasScrollDown',200)
        expect(main().page).toBe(page)
        expect((object('CountrySummary').getComponent('Component.Text') as Text).size).toBeGreaterThan(59)
        fields[page].forEach(value=>expect(label('CountrySummary').includes(value)).toBe(true))
        assertTextFits('CountrySummary');assertTextFits('ReaderPage')
        expect(button('AtlasClose').inactive).toBe(false)
        expect(button('AtlasScrollUp').inactive).toBe(page===0)
        expect(button('AtlasScrollDown').inactive).toBe(page===2)
      }
    }
  }
}
