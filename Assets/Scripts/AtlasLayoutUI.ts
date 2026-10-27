import {FlexLayout} from "SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexLayout"
import {FlexItem} from "SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexItem"
import {FlexAlign, FlexDirection, FlexJustify} from "SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/Flex/FlexTypes"
import {Button} from "SpectaclesUIKit.lspkg/Scripts/Components/Button/Button"
import {ElementContent} from "SpectaclesUIKit.lspkg/Scripts/Components/Content/ElementContent"
import {ContentVerticalAlignment} from "SpectaclesUIKit.lspkg/Scripts/Components/Layout2D/LayoutTypes"

const TYPE_SCALE={Title:{size:93,weight:700},Headline:{size:54,weight:700},Body:{size:39,weight:500},Caption:{size:38,weight:500},Button:{size:39,weight:500}}
export type AtlasTextRole=keyof typeof TYPE_SCALE
export function applyTextRole(t:Text,role:AtlasTextRole,distanceCm=110):void {t.size=TYPE_SCALE[role].size*distanceCm/110;(t as Text & {weight?:number}).weight=TYPE_SCALE[role].weight}
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
export function text(parent:SceneObject,name:string,value:string,w:number,h:number,role:AtlasTextRole="Body",left=false,distanceCm=110):Text {
 const s=item(parent,name,w,h,()=>{});const t=s.createComponent("Component.Text") as Text;t.text=value;applyTextRole(t,role,distanceCm);t.depthTest=true;t.horizontalAlignment=left?HorizontalAlignment.Left:HorizontalAlignment.Center;t.verticalAlignment=VerticalAlignment.Center;t.horizontalOverflow=HorizontalOverflow.Wrap;t.verticalOverflow=VerticalOverflow.Truncate;t.layoutRect=Rect.create(-w/2,w/2,-h/2,h/2);t.textFill.color=new vec4(1,1,0.94,1);s.getTransform().setLocalPosition(new vec3(0,0,0.15));return t
}
export function button(parent:SceneObject,name:string,label:string,icon:Texture,w:number,h:number,action:()=>void,distanceCm=110):Button {
 let b:Button
 item(parent,name,w,h,(s)=>{b=s.createComponent(Button.getTypeName()) as Button;b.size=new vec3(w,h,1);b.onTriggerUp.add(action);const c=obj(s,name+"Label",0.08);const ec=c.createComponent(ElementContent.getTypeName()) as ElementContent;ec.text=label;ec.textSize=TYPE_SCALE.Button.size*distanceCm/110;ec.leadingIcon=icon;ec.leadingIconSize=1.8;ec.spacing=0.5;ec.autoResize=false;ec.contentAlignment="center";ec.sizeOverride=new vec2(w-1,h-0.6);})
 return b!
}
