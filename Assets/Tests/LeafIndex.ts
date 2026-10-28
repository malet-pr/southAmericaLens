import {scenariosIndex} from "Leaf.lspkg/Scenarios/decorator/ScenarioIndexDecorator"
import {ScenarioMetadata} from "Leaf.lspkg/Scenarios/scenario/ScenarioMetadata"
import {AtlasCriterion1,AtlasCriterion2,AtlasCriterion3,AtlasCriterion4,AtlasCriterion5,AtlasIKControls} from "./AtlasLeafScenarios"
import {AtlasReadability} from "./AtlasReadability"
import {AtlasWelcomeScenario} from "./AtlasWelcomeScenario"
@component
export class LeafIndex extends BaseScriptComponent {
  @scenariosIndex
  static scenariosIndex:ScenarioMetadata[]=[
    {id:'atlas-1-map-region-small-country',typename:AtlasCriterion1.getTypeName(),parameters:{__leaf__timeout_secs:'90',__leaf__diagnostic_policy:'fail-fast'}},
    {id:'atlas-2-rise-highlight-flag',typename:AtlasCriterion2.getTypeName(),parameters:{__leaf__timeout_secs:'90',__leaf__diagnostic_policy:'fail-fast'}},
    {id:'atlas-3-all-fields-fixed-close',typename:AtlasCriterion3.getTypeName(),parameters:{__leaf__timeout_secs:'90',__leaf__diagnostic_policy:'fail-fast'}},
    {id:'atlas-4-switch-return-close',typename:AtlasCriterion4.getTypeName(),parameters:{__leaf__timeout_secs:'90',__leaf__diagnostic_policy:'fail-fast'}},
    {id:'atlas-5-world-anchor-walk-return',typename:AtlasCriterion5.getTypeName(),parameters:{__leaf__timeout_secs:'90',__leaf__diagnostic_policy:'fail-fast'}},
    {id:'atlas-ik-reader-controls',typename:AtlasIKControls.getTypeName(),parameters:{__leaf__timeout_secs:'90',__leaf__diagnostic_policy:'fail-fast'}},
    {id:'atlas-readability-all-countries',typename:AtlasReadability.getTypeName(),parameters:{__leaf__timeout_secs:'120',__leaf__diagnostic_policy:'fail-fast'}},
    {id:'atlas-welcome-world-anchor-dismiss',typename:AtlasWelcomeScenario.getTypeName(),parameters:{__leaf__timeout_secs:'90',__leaf__diagnostic_policy:'fail-fast'}}
  ]
}
