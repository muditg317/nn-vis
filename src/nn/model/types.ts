import { MergedWithout } from "~/utils/reducer-utils";

interface ModelInput_simple {
  type: "simple",
  input_size: number,
}
// interface ModelInput_image {
//   type: "image",
//   dims: [number, number],
//   channels: number,
// }
export type ModelInput =
  | ModelInput_simple
  // | ModelInput_image
  ;

export interface Layer {
  id: string,
  type: string,
  name: string,
}

export interface Model {
  input: MergedWithout<ModelInput, "type", string>,
  layers: Layer[],
}
