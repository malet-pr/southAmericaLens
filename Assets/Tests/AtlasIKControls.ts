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
export class AtlasIKControls extends Scenario {
  async run():Promise<void> {
    const i=new AtlasLeafInteractor();await baseline(i);await i.tap('Country_br')
    const ik=createIKInteractor(),down=findInteractableByName('AtlasScrollDown')
    const indirect=ik.right.isIndirect(down)
    print('[Atlas LEAF] IK scroll route: '+(indirect?'far-field aim and pinch':'direct reach'))
    const page=main().page;await ik.trigger(down);await sleep(550);expect(main().page).toBe(page+1)
    await ik.trigger(findInteractableByName('AtlasClose'));await sleep(650);expect(main().phase).toBe('closed')
    // Far-field is the intended atlas input; report the route explicitly, without claiming direct hand reach.
  }
}
