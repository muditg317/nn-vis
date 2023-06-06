import { Reducer, useReducer } from "react";

export interface Layer {
  id: string,
  type: string,
  name: string,
  params: any,
}

export interface Model {
  layers: Layer[],
  lastAction: typeof ACTION_NAMES[number] | "",
}

const ACTION_NAMES = ["ADD_LAYER", "REMOVE_LAYER", "UPDATE_LAYER", "UPDATE_MODEL"] as const;
export interface ModelAction {
  type: typeof ACTION_NAMES[number],
  payload: any,
}

function modelReducer(model: Model, update: ModelAction): Model {
  return {
    ...model,
    lastAction: update.type,
  };
}
function defaultModel(): Model {
  return {
    layers: [],
    lastAction: ""
  };
};

export type ModelReducerType = Reducer<Model, ModelAction>;

export default function useModelReducer() {
  return useReducer(modelReducer, defaultModel());
}