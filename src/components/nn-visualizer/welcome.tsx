interface WelcomeProps {
  close: () => void
}
export default function Welcome({ close }: WelcomeProps) {
  console.log("rendering welcome");
  return (<>
    <div className="flex flex-col items-center justify-center w-full h-full">
      <p className="text-2xl">Welcome to the NN Visualizer!</p>
      <p className="text-xl">This is a tool to help you learn about neural networks.</p>
      <p className="text-xl">To get started, click on the &ldquo;model&rdquo;  tab.</p>
      <button className="px-4 py-2 mt-4 text-xl text-white bg-purple-500 rounded-md hover:bg-purple-600" onClick={close}>Go to model!</button>
    </div>
  </>)
}