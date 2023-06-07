import type { Dispatch } from "react";
import type { ModelAction } from "~/nn/model/model-reducer";
import type { Model, ModelInput } from "~/nn/model/types";
import { Radio } from "../radio";
import React, { useCallback } from "react";
import { LayersAction } from "~/nn/model/layers-reducer";

interface ModelProps {
  model: Model
  updateModel: Dispatch<ModelAction>
  updateLayers: Dispatch<LayersAction>
}
export default function Model({ model, updateModel, updateLayers }: ModelProps) {
  // console.log("model", model);
  return (<>
    <p className="w-full">{JSON.stringify(model)}</p>
    <ol className="flex flex-col items-center w-full gap-2 pt-2">
      <ModelDisplayRow title="Inputs">
        <Radio
          name="input-type"
          options={["simple"]}
          selected={model.input.type}
          select={(s) => updateModel({type: "SET_INPUT_TYPE", input_type: s})} />
        {
          (() => {
            switch (model.input.type) {
              case "simple":
                return <span className="flex flex-row ml-4">
                    <label htmlFor="input_size" className="mr-2"># inputs: </label>
                    <input type="number" id="input_size" value={model.input.input_size} onChange={(e) => parseInt(e.target.value)} />
                  </span>
              default:
                return <span>Unknown input type</span>
            }
          })()
        }
      </ModelDisplayRow>
      {model.layers.map((layer, i) => {
        return (<ModelDisplayRow key={layer.id} title={`Layer ${i+1}`}>
          {layer.name}
        </ModelDisplayRow>)
      })}
      <button onClick={() => updateLayers({type: "ADD_LAYER"})}>
        Add layer
      </button>
    </ol>
  </>)
}

interface ModelDisplayRowProps {
  title: string
  children: React.ReactNode
}
function ModelDisplayRow({ title, children}: ModelDisplayRowProps) {
  return (
    <section className="flex flex-row items-center w-full gap-2 px-4">
      <h3 className="self-start w-24 mb-8 italic font-bold underline min-w-max">{title}: </h3>
      <div className="flex flex-row items-center justify-start w-full h-full">
        {children}
      </div>
    </section>
  );
}