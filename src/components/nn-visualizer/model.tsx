import { Model } from "~/nn/model/reducer";

interface ModelProps {
  model: Model
}
export default function Model({ model }: ModelProps) {
  return (<>
    <div className="flex flex-col items-center justify-center w-full h-full">
      <p className="text-2xl">Model</p>
      <p className="text-xl">This is a tool to help you learn about neural networks.</p>
      <p className="text-xl">To get started, click on the "model" tab.</p>
      {JSON.stringify(model)}
    </div>
  </>)
}