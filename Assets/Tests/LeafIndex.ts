import {scenariosIndex} from "Leaf.lspkg/Scenarios/decorator/ScenarioIndexDecorator"
import {ScenarioMetadata} from "Leaf.lspkg/Scenarios/scenario/ScenarioMetadata"
import {AtlasCriterion1,AtlasCriterion2,AtlasCriterion3,AtlasCriterion4,AtlasCriterion5,AtlasIKControls} from "./AtlasLeafScenarios"
@component
export class LeafIndex extends BaseScriptComponent {
  @scenariosIndex
  static scenariosIndex:ScenarioMetadata[]=[
    {id:'atlas-1-map-region-small-country',typename:AtlasCriterion1.getTypeName(),parameters:{__leaf__timeout_secs:'90'}},
    {id:'atlas-2-rise-highlight-flag',typename:AtlasCriterion2.getTypeName(),parameters:{__leaf__timeout_secs:'90'}},
    {id:'atlas-3-all-fields-fixed-close',typename:AtlasCriterion3.getTypeName(),parameters:{__leaf__timeout_secs:'90'}},
    {id:'atlas-4-switch-return-close',typename:AtlasCriterion4.getTypeName(),parameters:{__leaf__timeout_secs:'90'}},
    {id:'atlas-5-world-anchor-walk-return',typename:AtlasCriterion5.getTypeName(),parameters:{__leaf__timeout_secs:'90'}},
    {id:'atlas-ik-reader-controls',typename:AtlasIKControls.getTypeName(),parameters:{__leaf__timeout_secs:'90'}}
  ]
}
