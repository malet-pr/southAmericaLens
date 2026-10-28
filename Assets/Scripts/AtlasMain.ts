import {COUNTRY_DATA} from "./AtlasCountryData"
import {AtlasMapMesh} from "./AtlasMapMesh"
import {AtlasReaderUI} from "./AtlasReaderUI"
import {AtlasNavigationUI} from "./AtlasNavigationUI"
import {AtlasWelcomeUI} from "./AtlasWelcomeUI"
@component
export class AtlasMain extends BaseScriptComponent {
 @input @hint("Initial viewer camera") camera!:Camera
 @input @hint("World anchored environment root") worldRoot!:SceneObject
 @input @hint("Precise geographic map component") map!:AtlasMapMesh
 @input @hint("Reading panel UI") reader!:AtlasReaderUI
 @input @hint("Atlas region toolbar UI") navigation!:AtlasNavigationUI
 @input @allowUndefined @hint("World-anchored first-use guidance placard") welcome?:AtlasWelcomeUI
 @input @hint("Time in seconds for each rise and return") transitionSeconds:number=.4
 @input @hint("Horizontal desk distance from the initial viewer, centimeters") deskDistanceCm:number=110
 public countryId=""
 public phase="closed"
 public page=0
 public region="full"
 public transitionHistory:string[]=[]
 public ready=false
 public welcomeDismissed=false
 private elapsed=0
 private fromPosition!:vec3
 private toPosition!:vec3
 private fromRotation!:quat
 private toRotation!:quat
 private readingPosition!:vec3
 private readingRotation!:quat
 private afterReturn:(()=>void)|null=null
 onAwake():void {
  this.createEvent("OnStartEvent").bind(()=>{const e=this.createEvent("DelayedCallbackEvent");e.bind(()=>this.initialize());e.reset(.1)})
  this.createEvent("UpdateEvent").bind(()=>this.updateTransition())
 }
 private initialize():void {
  const ct=this.camera.getTransform(),cp=ct.getWorldPosition(),f=ct.getWorldRotation().multiplyVec3(new vec3(0,0,-1));f.y=0;const forward=f.normalize(),yaw=Math.atan2(-forward.x,-forward.z)
  this.worldRoot.getTransform().setWorldPosition(new vec3(cp.x+forward.x*this.deskDistanceCm,cp.y-160,cp.z+forward.z*this.deskDistanceCm));this.worldRoot.getTransform().setWorldRotation(quat.angleAxis(yaw,new vec3(0,1,0)))
  this.readingPosition=this.reader.sceneObject.getTransform().getWorldPosition();this.readingRotation=this.reader.sceneObject.getTransform().getWorldRotation();this.reader.setVisible(false);if(this.welcome)this.welcome.setVisible(true)
  this.map.onSelect.add(id=>this.selectCountry(id));this.map.onHover.add(name=>{if(name)this.navigation.setStatus(name);else this.navigation.setRegion(this.region)})
  this.navigation.onRegion.add(region=>this.changeRegion(region));this.reader.onClose.add(()=>this.close());this.reader.onScroll.add(delta=>this.scroll(delta));this.ready=true;console.log("[Atlas] ready: 12 countries, world anchored")
 }
 public selectCountry(id:string):void {if(!this.ready||this.phase==="rising"||this.phase==="returning"||id===this.countryId)return;if(!COUNTRY_DATA.some(c=>c.id===id))return;this.welcomeDismissed=true;if(this.welcome)this.welcome.dismiss();if(this.phase==="open")this.beginReturn(()=>this.beginRise(id));else this.beginRise(id)}
 private beginRise(id:string):void {this.countryId=id;this.page=0;this.map.setSelected(id);this.reader.showCountry(COUNTRY_DATA.find(c=>c.id===id)!,0);this.reader.setVisible(true);this.reader.setControlsEnabled(false);const t=this.reader.sceneObject.getTransform();this.fromPosition=this.map.countryWorldPosition(id);this.toPosition=this.readingPosition;this.fromRotation=this.map.sceneObject.getTransform().getWorldRotation();this.toRotation=this.readingRotation;t.setWorldPosition(this.fromPosition);t.setWorldRotation(this.fromRotation);t.setLocalScale(new vec3(.025,.025,.025));this.phase="rising";this.elapsed=0;this.transitionHistory.push("rise:"+id)}
 private beginReturn(after:(()=>void)|null=null):void {if(this.phase!=="open")return;this.afterReturn=after;this.reader.setControlsEnabled(false);this.fromPosition=this.reader.sceneObject.getTransform().getWorldPosition();this.toPosition=this.map.countryWorldPosition(this.countryId);this.fromRotation=this.readingRotation;this.toRotation=this.map.sceneObject.getTransform().getWorldRotation();this.phase="returning";this.elapsed=0;this.transitionHistory.push("return:"+this.countryId)}
 private updateTransition():void {if(this.phase!=="rising"&&this.phase!=="returning")return;this.elapsed+=getDeltaTime();const t=Math.min(1,this.elapsed/Math.max(.05,this.transitionSeconds)),e=t*t*(3-2*t),tr=this.reader.sceneObject.getTransform();tr.setWorldPosition(vec3.lerp(this.fromPosition,this.toPosition,e));tr.setWorldRotation(quat.slerp(this.fromRotation,this.toRotation,e));const s=this.phase==="rising"?.025+.975*e:1-.975*e;tr.setLocalScale(new vec3(s,s,s));if(t<1)return;if(this.phase==="rising"){this.phase="open";this.reader.setControlsEnabled(true);this.transitionHistory.push("open:"+this.countryId)}else{const old=this.countryId;this.reader.setVisible(false);this.map.setSelected("");this.countryId="";this.phase="closed";this.transitionHistory.push("closed:"+old);const after=this.afterReturn;this.afterReturn=null;if(after)after()}}
 public close():void {this.beginReturn()}
 public scroll(delta:number):void {if(this.phase!=="open")return;this.page=Math.max(0,Math.min(2,this.page+delta));this.reader.showCountry(COUNTRY_DATA.find(c=>c.id===this.countryId)!,this.page)}
 public changeRegion(region:string):void {if(this.phase==="rising"||this.phase==="returning")return;const apply=()=>{this.region=region;this.map.setRegion(region);this.navigation.setRegion(region)};if(this.phase==="open")this.beginReturn(apply);else apply()}
}
