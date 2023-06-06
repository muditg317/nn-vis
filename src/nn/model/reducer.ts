import { useReducer } from "react";
import type { UnionToIntersection } from "~/utils/types";

type MergedWithout<T, K extends keyof T, S> =
    // T;
    { [k in K]: LooseAutocomplete<S, T[K] extends S ? T[K] : never> } & UnionToIntersection<
      T extends unknown ? Omit<T, K> : never
    >;

type LooseAutocomplete<Base, T extends Base> =
  Base extends string ? LooseAutocompleteStr<T extends string ? T : never> :
  Base extends number ? LooseAutocompleteNum<T extends number ? T : never> :
  Base;
type LooseAutocompleteStr<T extends string> = T;// | Omit<string, T>;
type LooseAutocompleteNum<T extends number> = T;// | Omit<number, T>;

interface ModelInput_simple {
  type: "simple",
  inputSize: number,
}
interface ModelInput_image {
  type: "image",
  dims: [number, number],
  channels: number,
}
export type ModelInput = ModelInput_simple | ModelInput_image;
// type s = ModelInput & { type: "simple" };


export interface Layer {
  id: string,
  type: string,
  name: string,
  // params: any,
}

export interface Model {
  input: MergedWithout<ModelInput, "type", string>,
  layers: Layer[],
}

interface ModelAction_setInputType {
  type: "SET_INPUT_TYPE",
  input_type: ModelInput["type"],
}
export type ModelAction = ModelAction_setInputType;

function modelReducer(model: Model, update: ModelAction): Model {
  switch (update.type) {
    case "SET_INPUT_TYPE":
      return setInputType(model, update);
    default:
      return model;
  }
}

function defaultModel(): Model {
  return {
    input: {
      type: "simple",
      inputSize: 2,
      dims: [28, 28],
      channels: 1,
    },
    layers: [],
  };
}

function setInputType(model: Model, update: ModelAction_setInputType): Model {
  const r = {
    ...model,
    input: {
      ...model.input,
      type: update.input_type,
    },
  };
  console.log(r);
  return r;
}


export default function useModelReducer() {
  return useReducer(modelReducer, defaultModel());
}