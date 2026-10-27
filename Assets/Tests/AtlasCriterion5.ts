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
export class AtlasCriterion5 extends Scenario {
  async run():Promise<void> {
    const i=new AtlasLeafInteractor();await baseline(i);await i.tap('Country_br')
    const names=['AtlasWorld','AtlasLibrary','AtlasDesk','AtlasMap','AtlasReader'],anchors=names.map(name=>({object:object(name),position:object(name).getTransform().getWorldPosition(),rotation:object(name).getTransform().getWorldRotation()}))
    const camera=main().camera.sceneObject,ct=camera.getTransform(),parent=camera.getParent(),cp=ct.getWorldPosition(),cr=ct.getWorldRotation(),cs=ct.getWorldScale()
    const rig=global.scene.createSceneObject('AtlasLeafCameraMotion')
    // A temporary tracking parent simulates a translated, turned viewer without changing authored settings.
    camera.setParent(rig);ct.setWorldPosition(cp);ct.setWorldRotation(cr);ct.setWorldScale(cs)
    try {
      rig.getTransform().setWorldPosition(new vec3(35,0,15));rig.getTransform().setWorldRotation(quat.angleAxis(.45,new vec3(0,1,0)));await sleep(750)
      expect(distance(ct.getWorldPosition(),cp)).toBeGreaterThan(20)
      for(const a of anchors){expect(distance(a.object.getTransform().getWorldPosition(),a.position)<.05).toBe(true);const now=a.object.getTransform().getWorldRotation();expect(Math.abs(now.x-a.rotation.x)+Math.abs(now.y-a.rotation.y)+Math.abs(now.z-a.rotation.z)+Math.abs(now.w-a.rotation.w)<.001).toBe(true)}
      expect(object('AtlasLibrary').getChildrenCount()).toBeGreaterThan(3)
    } finally {
      camera.setParent(parent);ct.setWorldPosition(cp);ct.setWorldRotation(cr);ct.setWorldScale(cs);rig.destroy();await nextFrame()
    }
    expect(distance(ct.getWorldPosition(),cp)<.1).toBe(true)
    expect(main().phase).toBe('open');expect(label('CountryName')).toBe('Brazil');expect(object('AtlasReader').isEnabledInHierarchy).toBe(true)
  }
}

