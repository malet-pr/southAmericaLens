import {BackPlate} from "SpectaclesUIKit.lspkg/Scripts/BackPlate"
import {RoundedRectangle} from "SpectaclesUIKit.lspkg/Scripts/Visuals/RoundedRectangle/RoundedRectangle"
import {Button} from "SpectaclesUIKit.lspkg/Scripts/Components/Button/Button"
import Event from "SpectaclesInteractionKit.lspkg/Utils/Event"
import {CountryData} from "./AtlasCountryData"
import {obj,flex,item,text,button} from "./AtlasLayoutUI"

const CLOSE=requireAsset("../Icons/close.png") as Texture
const UP=requireAsset("../Icons/keyboard_arrow_up.png") as Texture
const DOWN=requireAsset("../Icons/keyboard_arrow_down.png") as Texture
const IMAGE_MATERIAL=requireAsset("../Materials/ImageMaterial.mat") as Material
const FLAGS:Record<string,Texture>={ar:requireAsset("../AtlasData/Flags/ar.png") as Texture,bo:requireAsset("../AtlasData/Flags/bo.png") as Texture,br:requireAsset("../AtlasData/Flags/br.png") as Texture,cl:requireAsset("../AtlasData/Flags/cl.png") as Texture,co:requireAsset("../AtlasData/Flags/co.png") as Texture,ec:requireAsset("../AtlasData/Flags/ec.png") as Texture,gy:requireAsset("../AtlasData/Flags/gy.png") as Texture,py:requireAsset("../AtlasData/Flags/py.png") as Texture,pe:requireAsset("../AtlasData/Flags/pe.png") as Texture,sr:requireAsset("../AtlasData/Flags/sr.png") as Texture,uy:requireAsset("../AtlasData/Flags/uy.png") as Texture,ve:requireAsset("../AtlasData/Flags/ve.png") as Texture}

@component
export class AtlasReaderUI extends BaseScriptComponent {
 @input @hint("Reading panel width in centimeters") width:number=55
 @input @hint("Reading panel height in centimeters") height:number=35
 @input @hint("Country hue brightness behind white reading text") backgroundBrightness:number=.45
 public readonly onClose=new Event<void>()
 public readonly onScroll=new Event<number>()
 public page=0
 public countryId=""
 public flagCountryId=""
 public bodyValue=""
 public panelColor:vec4=new vec4(1,1,1,1)
 private title!:Text
 private body!:Text
 private pagination!:Text
 private flagMaterial!:Material
 private plate!:BackPlate
 private closeButton!:Button
 private upButton!:Button
 private downButton!:Button
 onAwake():void {
  this.sceneObject.createComponent("Component.Canvas")
  this.plate=this.sceneObject.createComponent(BackPlate.getTypeName()) as BackPlate;this.plate.size=new vec2(this.width,this.height);this.plate.style="simple"
  const content=obj(this.sceneObject,"AtlasReaderContent",0.7)
  const column=flex(content,"ReaderColumn",this.width-4,this.height-3,false,0.8)
  item(column,"ReaderHeader",this.width-4,7,(header)=>{
   const row=flex(header,"ReaderHeaderRow",this.width-4,7,true,1)
   item(row,"CountryFlag",8,5,(host)=>{const im=host.createComponent("Component.Image") as Image;this.flagMaterial=IMAGE_MATERIAL.clone();this.flagMaterial.mainPass.depthTest=true;this.flagMaterial.mainPass.depthWrite=false;im.clearMaterials();im.addMaterial(this.flagMaterial);host.getTransform().setLocalScale(new vec3(8,5,1))})
   this.title=text(row,"CountryName","South America",32,6,"Title")
   this.closeButton=button(row,"AtlasClose","",CLOSE,6,6,()=>this.onClose.invoke())
  })
  this.body=text(column,"CountrySummary","",this.width-7,16,"Body",true)
  item(column,"ReaderFooter",this.width-6,6,(footer)=>{const row=flex(footer,"ReaderFooterRow",this.width-6,6,true,2);this.upButton=button(row,"AtlasScrollUp","Up",UP,10,6,()=>this.onScroll.invoke(-1));this.pagination=text(row,"ReaderPage","1 / 3",20,4,"Caption");this.downButton=button(row,"AtlasScrollDown","Down",DOWN,10,6,()=>this.onScroll.invoke(1))})
 }
 public showCountry(c:CountryData,page:number):void {
  this.countryId=c.id;this.flagCountryId=c.id;this.page=page
  this.title.text=c.name;this.flagMaterial.mainPass.baseTex=FLAGS[c.id]
  const pages=["Capital city\n"+c.capital+"\n\nOfficial language(s)\n"+c.languages,"Currency\n"+c.currency+"\n\nPopulation\n"+c.population,"Climate\n"+c.climate+"\n\nMain religion(s)\n"+c.religions]
  this.bodyValue=pages[page];this.body.text=this.bodyValue;this.pagination.text=(page+1)+" / 3  •  Summary"
  this.panelColor=new vec4(c.color[0]*this.backgroundBrightness,c.color[1]*this.backgroundBrightness,c.color[2]*this.backgroundBrightness,1)
  const rr=this.sceneObject.getComponent(RoundedRectangle.getTypeName()) as RoundedRectangle;if(rr){rr.gradient=false;rr.backgroundColor=this.panelColor}
 }
 public setControlsEnabled(enabled:boolean):void {if(this.closeButton)this.closeButton.enabled=enabled;if(this.upButton)this.upButton.enabled=enabled;if(this.downButton)this.downButton.enabled=enabled}
 public setVisible(visible:boolean):void {this.sceneObject.enabled=visible}
}
