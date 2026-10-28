import {BackPlate} from "SpectaclesUIKit.lspkg/Scripts/BackPlate"
import {RoundedRectangle} from "SpectaclesUIKit.lspkg/Scripts/Visuals/RoundedRectangle/RoundedRectangle"
import {obj,flex,item,text} from "./AtlasLayoutUI"
const DOWN=requireAsset("../Icons/keyboard_arrow_down.png") as Texture
const IMAGE_MATERIAL=requireAsset("../Materials/ImageMaterial.mat") as Material

/** First-use guidance stays in the world and disappears after the first valid country selection. */
@component
export class AtlasWelcomeUI extends BaseScriptComponent {
 @input @hint("First-use instruction text size") @widget(new SliderWidget(60,76,1)) instructionFontSize:number=68
 public visible=true
 public readonly instruction="Look down to the desk.\nAim at a country and pinch to explore."
 onAwake():void {
  this.sceneObject.createComponent("Component.Canvas")
  const plate=this.sceneObject.createComponent(BackPlate.getTypeName()) as BackPlate;plate.size=new vec2(55,20);plate.style="simple"
  plate.onInitialized.add(()=>{const r=this.sceneObject.getComponent(RoundedRectangle.getTypeName()) as RoundedRectangle;r.gradient=false;r.backgroundColor=new vec4(.11,.19,.27,1)})
  const column=flex(obj(this.sceneObject,"WelcomeContent",.7),"WelcomeColumn",51,17,false,.5)
  text(column,"AtlasWelcomeTitle","South America Atlas",49,4.5,"Title")
  text(column,"AtlasWelcomeInstruction",this.instruction,49,7,"Body",false,110,this.instructionFontSize)
  item(column,"AtlasWelcomeDownIcon",5,4,(s)=>{const im=s.createComponent("Component.Image") as Image;const m=IMAGE_MATERIAL.clone();m.mainPass.baseTex=DOWN;m.mainPass.depthTest=true;m.mainPass.depthWrite=false;im.clearMaterials();im.addMaterial(m);s.getTransform().setLocalScale(new vec3(5,4,1))})
 }
 public setVisible(visible:boolean):void {this.visible=visible;this.sceneObject.enabled=visible}
 public dismiss():void {this.setVisible(false)}
}
