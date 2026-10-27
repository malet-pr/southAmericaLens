import {Scenario} from "Leaf.lspkg/Scenarios/scenario/Scenario"
import {expect} from "Leaf.lspkg/Utils/common/Expect"
import {findSceneObjectByName,sleep,nextFrame} from "Leaf.lspkg/Utils/common/Utils"
import {findInteractableByName} from "Leaf.lspkg/Interactors/InteractableUtils"
import {createIKInteractor} from "Leaf.lspkg/Interactors/interactor/ik/visualizer/BitmojiAvatar"
import {AtlasMain} from "../Scripts/AtlasMain"
import {AtlasMapMesh} from "../Scripts/AtlasMapMesh"
import {AtlasReaderUI} from "../Scripts/AtlasReaderUI"
import {COUNTRY_DATA} from "../Scripts/AtlasCountryData"
import {AtlasLeafInteractor} from "./AtlasLeafInteractor"

// Names below are verified against AtlasMain/AtlasMapMesh/UI source and bootstrap.
export function object(name:string):SceneObject {
  const value=findSceneObjectByName(name)
  if(!value)throw new Error('Scene object missing: '+name)
  return value
}
export function main():AtlasMain {return object('AtlasController').getComponent(AtlasMain.getTypeName()) as AtlasMain}
export function map():AtlasMapMesh {return object('AtlasMap').getComponent(AtlasMapMesh.getTypeName()) as AtlasMapMesh}
export function reader():AtlasReaderUI {return object('AtlasReader').getComponent(AtlasReaderUI.getTypeName()) as AtlasReaderUI}
export function label(name:string):string {return (object(name).getComponent('Component.Text') as Text).text}
export function distance(a:vec3,b:vec3):number {return a.sub(b).length}
export async function baseline(i:AtlasLeafInteractor):Promise<void> {
  await sleep(1500)
  expect(main().ready).toBe(true)
  if(main().phase==='rising'||main().phase==='returning')await sleep(1000)
  if(main().phase==='open')await i.tap('AtlasClose')
  if(main().region!=='full')await i.tap('ReturnFullMap')
  expect(main().phase).toBe('closed')
}
export function flagMatches(id:string):void {
  const image=object('CountryFlag').getComponent('Component.Image') as Image
  const flags:Record<string,Texture>={br:requireAsset('../AtlasData/Flags/br.png') as Texture,sr:requireAsset('../AtlasData/Flags/sr.png') as Texture,ar:requireAsset('../AtlasData/Flags/ar.png') as Texture}
  expect(image.mainMaterial.mainPass.baseTex.name).toBe(flags[id].name)
  expect(reader().flagCountryId).toBe(id)
}

