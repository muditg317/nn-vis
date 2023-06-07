import { useReducer } from "react";
import { MergedWithout } from "~/utils/reducer-utils";
import type { UnionToIntersection } from "~/utils/types";
import { Layer, ModelInput } from "./types";


interface LayersAction_addLayer {
  type: "ADD_LAYER",
}
interface LayersAction_setType {
  type: "SET_TYPE",
  layer_id: Layer["id"],
  layer_type: Layer["type"],
}
export type LayersAction =
  | LayersAction_addLayer
  | LayersAction_setType;

export function layersReducer(layers: Layer[], update: LayersAction): Layer[] {
  switch (update.type) {
    case "ADD_LAYER":
      return addLayer(layers, update);
    case "SET_TYPE":
      return setType(layers, update);
    default:
      return layers;
  }
}

export function defaultLayer(): Layer {
  return {
    id: crypto.randomUUID(),
    name: "NN Layer",
    type: "fc-dense",
  };
}

function addLayer(layers: Layer[], update: LayersAction_addLayer): Layer[] {
  return [
    ...layers,
    defaultLayer(),
  ];
}
function setType(layers: Layer[], update: LayersAction_setType): Layer[] {
  const ind = layers.findIndex(l => l.id === update.layer_id);
  if (ind === -1) {
    return layers;
  }
  const layer = layers[ind] as Layer;
  return [
    ...layers.slice(0, ind),
    {
      ...layer,
      type: update.layer_type,
    },
    ...layers.slice(ind + 1),
  ];
}

