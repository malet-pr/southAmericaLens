import {FlexLayout} from "SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexLayout"
import {FlexItem} from "SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexItem"
import {FlexAlign, FlexDirection, FlexJustify} from "SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexTypes"
import {Button} from "SpectaclesUIKit.lspkg/Scripts/Components/Button/Button"
import {ContentVerticalAlignment} from "SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/LayoutTypes"

const TYPE_SCALE={Title:{size:93,weight:700},Headline:{size:54,weight:700},Body:{size:39,weight:500},Caption:{size:38,weight:500},Button:{size:39,weight:500}}
export type AtlasTextRole=keyof typeof TYPE_SCALE
export function applyTextRole(t:Text,role:AtlasTextRole,distanceCm=110,sizeOverride?:number):void {t.size=(sizeOverride??TYPE_SCALE[role].size)*distanceCm/110;(t as Text & {weight?:number}).weight=TYPE_SCALE[role].weight}
export function obj(parent:SceneObject,name:string,z=0):SceneObject {const s=global.scene.createSceneObject(name);s.setParent(parent);s.getTransform().setLocalPosition(new vec3(0,0,z));return s}
export function flex(parent:SceneObject,name:string,w:number,h:number,row=false,gap=0):SceneObject {
 const s=obj(parent,name,0.02);const f=s.createComponent(FlexLayout.getTypeName()) as FlexLayout;f.autoDiscoverItemsOnStart=false
 f.onInitialized.add(()=>{f.width=w;f.height=h;f.direction=row?FlexDirection.Row:FlexDirection.Column;f.justifyContent=FlexJustify.Center;f.alignItems=FlexAlign.Center;f.rowGap=row?0:gap;f.columnGap=row?gap:0;f.verticalAlignment=ContentVerticalAlignment.Center;})
 return s
}
export function item(parent:SceneObject,name:string,w:number,h:number,build:(s:SceneObject)=>void):SceneObject {
 const s=obj(parent,name,0.02);const fi=s.createComponent(FlexItem.getTypeName()) as FlexItem;fi.overrideWidth=w;fi.overrideHeight=h;fi.flexShrink=0;build(s)
 const p=parent.getComponent(FlexLayout.getTypeName()) as FlexLayout;if(p)p.addItems([fi]);return s
}
export function text(parent:SceneObject,name:string,value:string,w:number,h:number,role:AtlasTextRole="Body",left=false,distanceCm=110,sizeOverride?:number):Text {
 const s=item(parent,name,w,h,()=>{});const t=s.createComponent("Component.Text") as Text;t.text=value;applyTextRole(t,role,distanceCm,sizeOverride);t.depthTest=true;t.horizontalAlignment=left?HorizontalAlignment.Left:HorizontalAlignment.Center;t.verticalAlignment=VerticalAlignment.Center;t.horizontalOverflow=HorizontalOverflow.Wrap;t.verticalOverflow=VerticalOverflow.Truncate;t.layoutRect=Rect.create(-w/2,w/2,-h/2,h/2);t.textFill.color=new vec4(1,1,0.94,1);s.getTransform().setLocalPosition(new vec3(0,0,0.15));return t
}
export function button(parent:SceneObject,name:string,label:string,_icon:Texture,w:number,h:number,action:()=>void,distanceCm=110,fontSize=54):Button {
 let b:Button
 // Text-only faces are deliberate: native icon images flatten in this installed preview renderer.
 item(parent,name,w,h,(s)=>{b=s.createComponent(Button.getTypeName()) as Button;b.size=new vec3(w,h,1);b.onTriggerUp.add(action);const c=obj(s,name+"Label",0.7),row=flex(c,name+"ContentRow",w-1,h-.6,true)
  text(row,name+"Text",label||"X",w-1,h-.6,"Button",false,distanceCm,label?fontSize:fontSize*1.5)
 })
 return b!
}
/** Fade only the composed label, retaining UIKit's own inactive face and fixed layout. */
export function setButtonLabelOpacity(b:Button,opacity:number):void {
 const walk=(s:SceneObject)=>{const t=s.getComponent("Component.Text") as Text;if(t)t.textFill.color=new vec4(1,1,.94,opacity);const im=s.getComponent("Component.Image") as Image;if(im)im.mainMaterial.mainPass.baseColor=new vec4(1,1,1,opacity);for(let i=0;i<s.getChildrenCount();i++)walk(s.getChild(i))}
 for(let i=0;i<b.sceneObject.getChildrenCount();i++){const c=b.sceneObject.getChild(i);if(c.name===b.sceneObject.name+"Label")walk(c)}
}
