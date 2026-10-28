import {Scenario} from "Leaf.lspkg/Scenarios/scenario/Scenario"
import {expect} from "Leaf.lspkg/Utils/common/Expect"
import {nextFrame,sleep} from "Leaf.lspkg/Utils/common/Utils"
import {AtlasWelcomeUI} from "../Scripts/AtlasWelcomeUI"
import {AtlasLeafInteractor} from "./AtlasLeafInteractor"
import {assertTextFits,baseline,distance,label,main,object} from "./AtlasLeafSupport"

/** The MCP runner resets the preview before this first-arrival scenario. */
@component
export class AtlasWelcomeScenario extends Scenario {
  async run():Promise<void> {
    const i=new AtlasLeafInteractor();await baseline(i)
    const root=object('AtlasWelcome'),welcome=root.getComponent(AtlasWelcomeUI.getTypeName()) as AtlasWelcomeUI
    expect(welcome.visible).toBe(true);expect(root.isEnabledInHierarchy).toBe(true)
    expect(main().welcomeDismissed).toBe(false)
    expect(label('AtlasWelcomeInstruction').includes('Look down')).toBe(true)
    expect(label('AtlasWelcomeInstruction').includes('pinch')).toBe(true)
    assertTextFits('AtlasWelcomeTitle');assertTextFits('AtlasWelcomeInstruction')
    const world=root.getTransform().getWorldPosition()
    const camera=main().camera.sceneObject,ct=camera.getTransform(),parent=camera.getParent(),cp=ct.getWorldPosition(),cr=ct.getWorldRotation(),cs=ct.getWorldScale()
    const motion=global.scene.createSceneObject('AtlasLeafWelcomeCameraMotion')
    camera.setParent(motion);ct.setWorldPosition(cp);ct.setWorldRotation(cr);ct.setWorldScale(cs)
    try {
      motion.getTransform().setWorldPosition(new vec3(25,0,10));motion.getTransform().setWorldRotation(quat.angleAxis(.3,new vec3(0,1,0)));await sleep(500)
      expect(distance(ct.getWorldPosition(),cp)).toBeGreaterThan(15)
      expect(distance(root.getTransform().getWorldPosition(),world)<.05).toBe(true)
    } finally {
      camera.setParent(parent);ct.setWorldPosition(cp);ct.setWorldRotation(cr);ct.setWorldScale(cs);motion.destroy();await nextFrame()
    }
    await i.tap('Country_br')
    expect(main().welcomeDismissed).toBe(true);expect(welcome.visible).toBe(false);expect(root.isEnabledInHierarchy).toBe(false)
    await i.tap('AtlasClose')
    expect(main().phase).toBe('closed');expect(welcome.visible).toBe(false)
  }
}
