import {COUNTRY_DATA,ATLAS_TERRITORIES,CountryData} from "./AtlasCountryData"
import {Interactable} from "SpectaclesInteractionKit.lspkg/Components/Interaction/Interactable/Interactable"
import Event from "SpectaclesInteractionKit.lspkg/Utils/Event"
type Point=[number,number]
type CountryVisual={root:SceneObject,visual:RenderMeshVisual,material:Material,collider:ColliderComponent,interactable:Interactable}
const VIEWS:Record<string,number[]>={full:[-82,-34,-62,17],north:[-77,-48,-4,13],central:[-82,-45,-26,3],south:[-76,-48,-56,-20]}
function insideTriangle(p:Point,a:Point,b:Point,c:Point):boolean {const cross=(u:Point,v:Point,w:Point)=>(v[0]-u[0])*(w[1]-u[1])-(v[1]-u[1])*(w[0]-u[0]);return cross(a,b,p)>=-1e-8&&cross(b,c,p)>=-1e-8&&cross(c,a,p)>=-1e-8}
function triangles(poly:Point[]):number[] {const ids=poly.map((_,i)=>i),out:number[]=[];let guard=poly.length*poly.length*2;while(ids.length>3&&guard-->0){let found=false;for(let i=0;i<ids.length;i++){const a=ids[(i+ids.length-1)%ids.length],b=ids[i],c=ids[(i+1)%ids.length];if((poly[b][0]-poly[a][0])*(poly[c][1]-poly[b][1])-(poly[b][1]-poly[a][1])*(poly[c][0]-poly[b][0])<=1e-8)continue;if(ids.some(v=>v!==a&&v!==b&&v!==c&&insideTriangle(poly[v],poly[a],poly[b],poly[c])))continue;out.push(a,b,c);ids.splice(i,1);found=true;break}if(!found)break}if(ids.length===3)out.push(ids[0],ids[1],ids[2]);return out}
function clip(poly:Point[],axis:number,bound:number,greater:boolean):Point[] {const output:Point[]=[];for(let i=0;i<poly.length;i++){const a=poly[i],b=poly[(i+1)%poly.length],ai=greater?a[axis]>=bound:a[axis]<=bound,bi=greater?b[axis]>=bound:b[axis]<=bound;if(ai)output.push(a);if(ai!==bi){const t=(bound-a[axis])/(b[axis]-a[axis]);output.push([a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t])}}return output}
function builder():MeshBuilder {const b=new MeshBuilder([{name:"position",components:3},{name:"normal",components:3},{name:"texture0",components:2}]);b.topology=MeshTopology.Triangles;b.indexType=MeshIndexType.UInt16;return b}
function mesh(polygons:Point[][],origin:Point):RenderMesh {
 const b=builder(),verts:number[]=[],idx:number[]=[]
 for(let polygon of polygons){if(polygon.length<3)continue;polygon=polygon.map(p=>[p[0]-origin[0],p[1]-origin[1]] as Point);let area=0;for(let i=0;i<polygon.length;i++){const a=polygon[i],c=polygon[(i+1)%polygon.length];area+=a[0]*c[1]-c[0]*a[1]}if(area<0)polygon.reverse();const tri=triangles(polygon),start=verts.length/8;for(const p of polygon)verts.push(p[0],p[1],0.15,0,0,1,0,0);for(const t of tri)idx.push(start+t);const back=verts.length/8;for(const p of polygon)verts.push(p[0],p[1],-0.1,0,0,-1,0,0);for(let i=0;i<tri.length;i+=3)idx.push(back+tri[i],back+tri[i+2],back+tri[i+1]);for(let i=0;i<polygon.length;i++){const a=polygon[i],c=polygon[(i+1)%polygon.length],dx=c[0]-a[0],dy=c[1]-a[1],len=Math.sqrt(dx*dx+dy*dy)||1,s=verts.length/8;verts.push(a[0],a[1],-.1,dy/len,-dx/len,0,0,0,c[0],c[1],-.1,dy/len,-dx/len,0,0,0,c[0],c[1],.15,dy/len,-dx/len,0,0,0,a[0],a[1],.15,dy/len,-dx/len,0,0,0);idx.push(s,s+1,s+2,s,s+2,s+3)}}
 if(verts.length===0){verts.push(0,0,0,0,0,1,0,0,.001,0,0,0,0,1,0,0,0,.001,0,0,0,1,0,0);idx.push(0,1,2)}b.appendVerticesInterleaved(verts);b.appendIndices(idx);b.updateMesh();return b.getMesh()
}
@component
export class AtlasMapMesh extends BaseScriptComponent {
 @input @hint("Unlit material for precise geographic country meshes") baseMaterial!:Material
 @input @hint("Show exact geographic hit surfaces for debugging") debugColliders:boolean=false
 public readonly onSelect=new Event<string>()
 public readonly onHover=new Event<string>()
 public region="full"
 public selectedId=""
 public countryCount=12
 private visuals:Record<string,CountryVisual>={}
 private territoryRoots:SceneObject[]=[]
 private borders!:RenderMeshVisual
 onAwake():void {this.createEvent("OnStartEvent").bind(()=>this.build())}
 private build():void {
  const platen=global.scene.createSceneObject("AtlasInclinedPlaten");platen.setParent(this.sceneObject);const board=platen.createComponent("Component.RenderMeshVisual") as RenderMeshVisual;board.mesh=mesh([[[-29.5,-22],[29.5,-22],[29.5,22],[-29.5,22]]],[0,0]);const wood=this.baseMaterial.clone();wood.mainPass.baseColor=new vec4(.55,.35,.16,1);board.mainMaterial=wood;platen.getTransform().setLocalPosition(new vec3(0,0,-1.6));platen.getTransform().setLocalScale(new vec3(1,1,8))
  const paper=global.scene.createSceneObject("AtlasMapPaper");paper.setParent(this.sceneObject);const p=paper.createComponent("Component.RenderMeshVisual") as RenderMeshVisual;p.mesh=mesh([[[-27.5,-20],[27.5,-20],[27.5,20],[-27.5,20]]],[0,0]);const pm=this.baseMaterial.clone();pm.mainPass.baseColor=new vec4(.20,.29,.34,1);p.mainMaterial=pm;paper.getTransform().setLocalPosition(new vec3(0,0,-.3))
  for(const c of COUNTRY_DATA){const root=global.scene.createSceneObject("Country_"+c.id);root.setParent(this.sceneObject);const visual=root.createComponent("Component.RenderMeshVisual") as RenderMeshVisual;const mat=this.baseMaterial.clone();visual.mainMaterial=mat;const collider=root.createComponent("Physics.ColliderComponent") as ColliderComponent;collider.fitVisual=false;collider.debugDrawEnabled=this.debugColliders;const interactable=root.createComponent(Interactable.getTypeName()) as Interactable;interactable.colliders=[collider];interactable.onTriggerEnd.add(()=>this.onSelect.invoke(c.id));interactable.onHoverEnter.add(()=>{this.tint(c,true);this.onHover.invoke(c.name)});interactable.onHoverExit.add(()=>{this.tint(c,false);this.onHover.invoke("")});this.visuals[c.id]={root,visual,material:mat,collider,interactable}}
  const bo=global.scene.createSceneObject("AtlasCountryBorders");bo.setParent(this.sceneObject);this.borders=bo.createComponent("Component.RenderMeshVisual") as RenderMeshVisual;const bm=this.baseMaterial.clone();bm.mainPass.baseColor=new vec4(.98,.94,.78,1);this.borders.mainMaterial=bm
  for(const t of ATLAS_TERRITORIES){const root=global.scene.createSceneObject("Territory_"+t.id);root.setParent(this.sceneObject);const rv=root.createComponent("Component.RenderMeshVisual") as RenderMeshVisual;const m=this.baseMaterial.clone();m.mainPass.baseColor=new vec4(.62,.65,.67,1);rv.mainMaterial=m;this.territoryRoots.push(root)}
  this.setRegion("full")
 }
 public project(lon:number,lat:number):Point {const v=VIEWS[this.region],sx=55/((v[1]-v[0])*.94),sy=40/(v[3]-v[2]),s=Math.min(sx,sy);return [(lon-(v[0]+v[1])/2)*s*.94,(lat-(v[2]+v[3])/2)*s]}
 private polygons(raw:number[][][]):Point[][] {return raw.map(ring=>{let p=ring.map(p=>this.project(p[0],p[1]));if(p.length>1&&Math.abs(p[0][0]-p[p.length-1][0])+Math.abs(p[0][1]-p[p.length-1][1])<1e-7)p.pop();p=clip(p,0,-27.5,true);p=clip(p,0,27.5,false);p=clip(p,1,-20,true);return clip(p,1,20,false)}).filter(p=>p.length>=3)}
 public setRegion(region:string):void {this.region=VIEWS[region]?region:"full";if(!this.borders)return;const borderPolys:Point[][]=[];for(const c of COUNTRY_DATA){const v=this.visuals[c.id],polys=this.polygons(c.polygons),origin=this.project(c.label[0],c.label[1]);v.root.enabled=polys.length>0;v.root.getTransform().setLocalPosition(new vec3(origin[0],origin[1],0));v.visual.mesh=mesh(polys,origin);const shape=Shape.createMeshShape();shape.mesh=v.visual.mesh;shape.convex=false;v.collider.shape=shape;this.tint(c,false);for(const p of polys)for(let i=0;i<p.length;i++){const a=p[i],b=p[(i+1)%p.length],dx=b[0]-a[0],dy=b[1]-a[1],len=Math.sqrt(dx*dx+dy*dy)||1,nx=-dy/len*.075,ny=dx/len*.075;borderPolys.push([[a[0]+nx,a[1]+ny],[a[0]-nx,a[1]-ny],[b[0]-nx,b[1]-ny],[b[0]+nx,b[1]+ny]])}}
  this.borders.mesh=mesh(borderPolys,[0,0]);this.borders.sceneObject.getTransform().setLocalPosition(new vec3(0,0,.2));ATLAS_TERRITORIES.forEach((t,i)=>{const root=this.territoryRoots[i],p=this.polygons(t.polygons);root.enabled=p.length>0;(root.getComponent("Component.RenderMeshVisual") as RenderMeshVisual).mesh=mesh(p,[0,0])})
 }
 private tint(c:CountryData,hover:boolean):void {const v=this.visuals[c.id];if(!v)return;const selected=c.id===this.selectedId,f=selected?1.25:hover?1.16:1;v.material.mainPass.baseColor=new vec4(Math.min(1,c.color[0]*f),Math.min(1,c.color[1]*f),Math.min(1,c.color[2]*f),1);const p=v.root.getTransform().getLocalPosition();v.root.getTransform().setLocalPosition(new vec3(p.x,p.y,selected?.45:0))}
 public setSelected(id:string):void {this.selectedId=id;COUNTRY_DATA.forEach(c=>this.tint(c,false))}
 public countryWorldPosition(id:string):vec3 {const c=COUNTRY_DATA.find(c=>c.id===id)!;const p=this.project(c.label[0],c.label[1]);return this.sceneObject.getTransform().getWorldTransform().multiplyPoint(new vec3(p[0],p[1],.3))}
}

