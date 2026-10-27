// Parametric architectural detail: repeated floor boards, wainscot panels and ceiling beams.
@component
export class AtlasLibraryMesh extends BaseScriptComponent {
 private material=requireAsset("../Materials/AtlasMapMaterial.mat") as Material
 onAwake():void {this.createEvent("OnStartEvent").bind(()=>this.build())}
 private build():void {
  const batches:{color:vec4,boxes:number[][]}[]=[{color:new vec4(.47,.30,.16,1),boxes:[]},{color:new vec4(.58,.39,.22,1),boxes:[]},{color:new vec4(.29,.21,.17,1),boxes:[]},{color:new vec4(.33,.19,.20,1),boxes:[[0,.18,70,135,.25,160]]},{color:new vec4(.80,.61,.29,1),boxes:[[0,.35,-8,135,.1,1],[0,.35,148,135,.1,1],[-66,.35,70,1,.1,156],[66,.35,70,1,.1,156]]}]
  for(let x=-240;x<240;x+=24)for(let z=-230;z<250;z+=60)batches[(Math.round((x+240)/24)+Math.round((z+230)/60))%2].boxes.push([x+12,-1,z+30,23.7,2,59.7])
  // The warm wall panels and ceiling mark out a surrounding room without hiding the real room on glasses.
  batches[2].boxes.push([0,140,-234,500,280,4],[-246,140,10,4,280,490],[246,140,10,4,280,490],[0,140,254,500,280,4],[0,280,10,500,4,490])
  for(let x=-240;x<=240;x+=60)batches[0].boxes.push([x,270,10,8,16,490])
  for(let z=-230;z<=250;z+=60)batches[0].boxes.push([0,270,z,490,16,8])
  // Four brass risers support the 20-degree atlas platen above the antique desk.
  for(const x of [-24,24]){batches[4].boxes.push([x,92,-16,1.2,20,1.2],[x,86.5,16,1.2,9,1.2])}
  batches[0].boxes.push([0,82,-16,51,2,4],[0,82,16,51,2,4])
  batches.forEach((batch,index)=>{const vertices:number[]=[],indices:number[]=[];for(const box of batch.boxes)this.box(vertices,indices,box);const b=new MeshBuilder([{name:"position",components:3},{name:"normal",components:3},{name:"texture0",components:2}]);b.topology=MeshTopology.Triangles;b.indexType=MeshIndexType.UInt16;b.appendVerticesInterleaved(vertices);b.appendIndices(indices);b.updateMesh();const s=global.scene.createSceneObject("LibraryArchitecture_"+index);s.setParent(this.sceneObject);const rv=s.createComponent("Component.RenderMeshVisual") as RenderMeshVisual;rv.mesh=b.getMesh();const mat=this.material.clone();mat.mainPass.baseColor=batch.color;rv.mainMaterial=mat})
 }
 private box(v:number[],t:number[],b:number[]):void {const [x,y,z,w,h,d]=b,px=w/2,py=h/2,pz=d/2;const faces=[[[1,0,0],[[px,-py,-pz],[px,py,-pz],[px,py,pz],[px,-py,pz]]],[[-1,0,0],[[-px,-py,pz],[-px,py,pz],[-px,py,-pz],[-px,-py,-pz]]],[[0,1,0],[[-px,py,-pz],[-px,py,pz],[px,py,pz],[px,py,-pz]]],[[0,-1,0],[[-px,-py,pz],[-px,-py,-pz],[px,-py,-pz],[px,-py,pz]]],[[0,0,1],[[-px,-py,pz],[px,-py,pz],[px,py,pz],[-px,py,pz]]],[[0,0,-1],[[px,-py,-pz],[-px,-py,-pz],[-px,py,-pz],[px,py,-pz]]]];for(const f of faces){const n=f[0] as number[],points=f[1] as number[][],s=v.length/8;for(const p of points)v.push(p[0]+x,p[1]+y,p[2]+z,n[0],n[1],n[2],0,0);t.push(s,s+1,s+2,s,s+2,s+3)}}
}
