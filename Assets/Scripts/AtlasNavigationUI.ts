import {BackPlate} from "SpectaclesUIKit.lspkg/Scripts/BackPlate"
import Event from "SpectaclesInteractionKit.lspkg/Utils/Event"
import {obj,flex,item,text,button} from "./AtlasLayoutUI"
const ZOOM=requireAsset("../Icons/zoom_in.png") as Texture
const WORLD=requireAsset("../Icons/public.png") as Texture
@component
export class AtlasNavigationUI extends BaseScriptComponent {
 public readonly onRegion=new Event<string>()
 public region="full"
 private status!:Text
 onAwake():void {
  this.sceneObject.createComponent("Component.Canvas")
  const p=this.sceneObject.createComponent(BackPlate.getTypeName()) as BackPlate;p.size=new vec2(15,29)
  const column=flex(obj(this.sceneObject,"NavigationContent",0.7),"NavigationColumn",13,27.5,false,0.7)
  this.status=text(column,"AtlasStatus","Regions",13,3,"Headline")
  item(column,"RegionControls",13,23.5,(host)=>{const controls=flex(host,"RegionButtons",13,23.5,false,.5);button(controls,"RegionNorth","North",ZOOM,13,5.5,()=>this.onRegion.invoke("north"));button(controls,"RegionCentral","Central",ZOOM,13,5.5,()=>this.onRegion.invoke("central"));button(controls,"RegionSouth","South",ZOOM,13,5.5,()=>this.onRegion.invoke("south"));button(controls,"ReturnFullMap","Full map",WORLD,13,5.5,()=>this.onRegion.invoke("full"))})
 }
 public setStatus(message:string):void {if(this.status)this.status.text=message}
 public setRegion(region:string):void {this.region=region;this.setStatus(region==="full"?"Regions":region[0].toUpperCase()+region.slice(1)+" region")}
}
