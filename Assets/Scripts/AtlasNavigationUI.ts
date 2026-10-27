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
  const p=this.sceneObject.createComponent(BackPlate.getTypeName()) as BackPlate;p.size=new vec2(73,14)
  const column=flex(obj(this.sceneObject,"NavigationContent",0.7),"NavigationColumn",69,12,false,0.7)
  this.status=text(column,"AtlasStatus","South America  •  12 sovereign countries",67,2.8,"Headline",false,145)
  item(column,"RegionControls",69,6,(host)=>{const row=flex(host,"RegionButtons",69,6,true,1);button(row,"RegionNorth","North",ZOOM,14,6,()=>this.onRegion.invoke("north"),145);button(row,"RegionCentral","Central",ZOOM,14,6,()=>this.onRegion.invoke("central"),145);button(row,"RegionSouth","South",ZOOM,14,6,()=>this.onRegion.invoke("south"),145);button(row,"ReturnFullMap","Full map",WORLD,20,6,()=>this.onRegion.invoke("full"),145)})
  text(column,"AtlasHint","Aim & pinch a country • Enlarge a region for small countries",66,2.4,"Caption",false,145)
 }
 public setStatus(message:string):void {if(this.status)this.status.text=message}
 public setRegion(region:string):void {this.region=region;this.setStatus(region==="full"?"South America  •  12 sovereign countries":region[0].toUpperCase()+region.slice(1)+" enlarged  •  select a country")}
}
