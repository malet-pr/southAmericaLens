import {BackPlate} from "SpectaclesUIKit.lspkg/Scripts/BackPlate"
import {RoundedRectangle} from "SpectaclesUIKit.lspkg/Scripts/Visuals/RoundedRectangle/RoundedRectangle"
import {Button} from "SpectaclesUIKit.lspkg/Scripts/Components/Button/Button"
import Event from "SpectaclesInteractionKit.lspkg/Utils/Event"
import {CountryData} from "./AtlasCountryData"
import {obj,flex,item,text,button,setButtonLabelOpacity} from "./AtlasLayoutUI"

const CLOSE=requireAsset("../Icons/close.png") as Texture
const UP=requireAsset("../Icons/keyboard_arrow_up.png") as Texture
const DOWN=requireAsset("../Icons/keyboard_arrow_down.png") as Texture
const IMAGE_MATERIAL=requireAsset("../Materials/ImageMaterial.mat") as Material
const FLAGS:Record<string,Texture>={ar:requireAsset("../AtlasData/Flags/ar.png") as Texture,bo:requireAsset("../AtlasData/Flags/bo.png") as Texture,br:requireAsset("../AtlasData/Flags/br.png") as Texture,cl:requireAsset("../AtlasData/Flags/cl.png") as Texture,co:requireAsset("../AtlasData/Flags/co.png") as Texture,ec:requireAsset("../AtlasData/Flags/ec.png") as Texture,gy:requireAsset("../AtlasData/Flags/gy.png") as Texture,py:requireAsset("../AtlasData/Flags/py.png") as Texture,pe:requireAsset("../AtlasData/Flags/pe.png") as Texture,sr:requireAsset("../AtlasData/Flags/sr.png") as Texture,uy:requireAsset("../AtlasData/Flags/uy.png") as Texture,ve:requireAsset("../AtlasData/Flags/ve.png") as Texture}

@component
export class AtlasReaderUI extends BaseScriptComponent {
 @ui.label("<b>Atlas reading panel</b>")
 @ui.group_start("Readability")
 @input @hint("Reading panel width in centimeters") width:number=55
 @input @hint("Reading panel height in centimeters") height:number=33
 @input @hint("Country hue brightness behind white reading text") backgroundBrightness:number=.45
 @input @hint("Body text em-square size. Keep large; content never auto-shrinks.") @widget(new SliderWidget(60,76,1)) bodyFontSize:number=68
 @input @hint("Up and Down button label size") @widget(new SliderWidget(50,64,1)) buttonFontSize:number=54
 @input @hint("Page heading size in the fixed footer") @widget(new SliderWidget(48,60,1)) pageFontSize:number=52
 @ui.group_end
 public readonly onClose=new Event<void>()
 public readonly onScroll=new Event<number>()
 public page=0
 public countryId=""
 public flagCountryId=""
 public bodyValue=""
 public panelColor:vec4=new vec4(1,1,1,1)
 public controlsEnabled=false
 public canScrollUp=false
 public canScrollDown=false
 public pageTitle="Basics"
 public readonly pageCount=3
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
  const column=flex(content,"ReaderColumn",this.width-4,this.height-3,false,0.5)
  item(column,"ReaderHeader",this.width-4,5,(header)=>{
   const row=flex(header,"ReaderHeaderRow",this.width-4,5,true,1)
   item(row,"CountryFlag",7,4.5,(host)=>{const im=host.createComponent("Component.Image") as Image;this.flagMaterial=IMAGE_MATERIAL.clone();this.flagMaterial.mainPass.depthTest=true;this.flagMaterial.mainPass.depthWrite=false;im.clearMaterials();im.addMaterial(this.flagMaterial);host.getTransform().setLocalScale(new vec3(7,4.5,1))})
   this.title=text(row,"CountryName","South America",33,5,"Title")
   this.closeButton=button(row,"AtlasClose","",CLOSE,5.5,5.5,()=>this.onClose.invoke(),110,this.buttonFontSize)
  })
  this.body=text(column,"CountrySummary","",this.width-6,18,"Body",true,110,this.bodyFontSize);this.body.enableRichText=false;this.body.lineSpacing=1.08
  item(column,"ReaderFooter",this.width-6,5.5,(footer)=>{const row=flex(footer,"ReaderFooterRow",this.width-6,5.5,true,1);this.upButton=button(row,"AtlasScrollUp","Up",UP,11,5.5,()=>{if(this.canScrollUp)this.onScroll.invoke(-1)},110,this.buttonFontSize);this.pagination=text(row,"ReaderPage","1 / 3\nBasics",25,5,"Caption",false,110,this.pageFontSize);this.downButton=button(row,"AtlasScrollDown","Down",DOWN,11,5.5,()=>{if(this.canScrollDown)this.onScroll.invoke(1)},110,this.buttonFontSize)})
  for(const b of [this.closeButton,this.upButton,this.downButton])b.onInitialized.add(()=>this.syncControls())
 }
 public showCountry(c:CountryData,page:number):void {
  this.countryId=c.id;this.flagCountryId=c.id;this.page=page
  this.title.text=c.name;this.flagMaterial.mainPass.baseTex=FLAGS[c.id]
  const headings=["Basics","People & economy","Climate & religions"]
  const fields=[["Capital city",c.capital,"Official language(s)",c.languages],["Currency",c.currency,"Population",c.population],["Climate",c.climate,"Main religion(s)",c.religions]]
  const field=fields[page];this.bodyValue=field[0]+"\n"+field[1]+"\n\n"+field[2]+"\n"+field[3]
  this.body.text=field[0].toUpperCase()+"\n"+field[1]+"\n\n"+field[2].toUpperCase()+"\n"+field[3];this.pageTitle=headings[page];this.pagination.text=(page+1)+" / 3\n"+this.pageTitle
  this.panelColor=new vec4(c.color[0]*this.backgroundBrightness,c.color[1]*this.backgroundBrightness,c.color[2]*this.backgroundBrightness,1)
  const rr=this.sceneObject.getComponent(RoundedRectangle.getTypeName()) as RoundedRectangle;if(rr){rr.gradient=false;rr.backgroundColor=this.panelColor}
  this.syncControls()
 }
 private setButtonActive(b:Button,active:boolean):void {if(!b)return;b.inactive=!active;if(b.initialized&&b.interactable&&b.interactable.enabled!==active){b.inactive=active;b.inactive=!active}}
 private syncControls():void {this.canScrollUp=this.controlsEnabled&&this.page>0;this.canScrollDown=this.controlsEnabled&&this.page<this.pageCount-1;this.setButtonActive(this.closeButton,this.controlsEnabled);for(const pair of [[this.upButton,this.canScrollUp],[this.downButton,this.canScrollDown]] as [Button,boolean][]){const [b,active]=pair;if(!b)continue;this.setButtonActive(b,active);setButtonLabelOpacity(b,active?1:.38)}}
 public setControlsEnabled(enabled:boolean):void {this.controlsEnabled=enabled;this.syncControls()}
 public setVisible(visible:boolean):void {this.sceneObject.enabled=visible}
}
