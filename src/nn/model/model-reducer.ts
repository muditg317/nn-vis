import { useCallback, useReducer } from "react";
import type { UnionToIntersection } from "~/utils/types";
import { Model, ModelInput } from "./types";
import { LayersAction, defaultLayer, layersReducer } from "./layers-reducer";

interface ModelAction_setInputType {
  type: "SET_INPUT_TYPE",
  input_type: ModelInput["type"],
}
interface ModelAction_updateInputSize {
  type: "UPDATE_INPUT_SIZE",
  input_size: number,
}
interface ModelAction_layersAction {
  type: "LAYERS_ACTION",
  layers_action: LayersAction,
}
export type ModelAction =
  | ModelAction_setInputType
  | ModelAction_updateInputSize
  | ModelAction_layersAction;

function modelReducer(model: Model, update: ModelAction): Model {
  switch (update.type) {
    case "SET_INPUT_TYPE":
      return setInputType(model, update);
    case "UPDATE_INPUT_SIZE":
      return updateInputSize(model, update);
    case "LAYERS_ACTION":
      return layersAction(model, update);
    default:
      return model;
  }
}

function defaultModel(): Model {
  return {
    input: {
      type: "simple",
      input_size: 2,
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
function updateInputSize(model: Model, update: ModelAction_updateInputSize): Model {
  return {
    ...model,
    input: {
      ...model.input,
      input_size: update.input_size,
    },
  };
}
function layersAction(model: Model, update: ModelAction_layersAction): Model {
  return {
    ...model,
    layers: layersReducer(model.layers, update.layers_action),
  };
}

export default function useModelReducer() {
  const [model, updateModel] = useReducer(modelReducer, defaultModel());
  const updateLayers = useCallback((layers_action: LayersAction) => {
    updateModel({
      type: "LAYERS_ACTION",
      layers_action,
    });
  }, []);
  return {
    model,
    updateModel,
    updateLayers,
  };
}