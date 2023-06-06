import type { Dispatch } from "react";
import type { Model, ModelAction, ModelInput } from "~/nn/model/reducer";
import { Radio } from "../radio";

interface ModelProps {
  model: Model
  updateModel: Dispatch<ModelAction>
}
export default function Model({ model, updateModel }: ModelProps) {
  // console.log("model", model);
  return (<>
    <ol className="flex flex-col items-center justify-center w-full h-full">
      <section className="flex flex-row items-center gap-2">
        <p>Inputs: </p>
        <Radio<ModelInput["type"]>
          name="input-type"
          options={["simple","image"]}
          selected={model.input.type}
          select={(s) => updateModel({type: "SET_INPUT_TYPE", input_type: s})} />
        {model.input.type === "simple"
          ? <input type="number" value={model.input.inputSize} onChange={(e) => parseInt(e.target.value)} />
          : <span>
              {/* <input type="number" value={model.input.inputSize} onChange={(e) => updateModel({type: "SET_INPUT_SIZE", s: parseInt(e.target.value)})} /> */}
          </span>
        }
      </section>
      <p className="text-2xl">Model</p>
      <p className="text-xl">This is a tool to help you learn about neural networks.</p>
      <p className="text-xl">To get started, click on the &ldquo;model&rdquo;  tab.</p>
      {JSON.stringify(model)}
    </ol>
  </>)
}