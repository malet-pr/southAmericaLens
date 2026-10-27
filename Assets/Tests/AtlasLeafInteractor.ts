import {DefaultLeafInteractor} from "Leaf.lspkg/Interactors/interactor/DefaultLeafInteractor"
import {findInteractablesByName} from "Leaf.lspkg/Interactors/InteractableUtils"
import {sleep} from "Leaf.lspkg/Utils/common/Utils"

/** All actions travel through the real SIK Interactable event path. */
export class AtlasLeafInteractor extends DefaultLeafInteractor {
  async tap(name:string,settleMs=550):Promise<void> {
    const target=findInteractablesByName(name,undefined,true)[0]
    if(!target) throw new Error('Enabled atlas interactable missing: '+name)
    await this.trigger(target)
    await sleep(settleMs)
  }
}
