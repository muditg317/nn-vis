import type { Model } from "~/nn/model/reducer"

interface GymProps {
  // data: string
  model: Model
}
export default function Gym({ }: GymProps) {
  // console.log("gym");
  return (<>
    <div className="flex flex-col items-center justify-center w-full h-full">
      <p className="text-2xl">Gym</p>
      <p className="text-xl">This is a tool to help you learn about neural networks.</p>
      <p className="text-xl">To get started, click on the &ldquo;model&rdquo;  tab.</p>
      {/* {} */}
    </div>
  </>)
}