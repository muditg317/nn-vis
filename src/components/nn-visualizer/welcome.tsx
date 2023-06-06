interface WelcomeProps {
}
export default function Welcome({ }: WelcomeProps) {
  return (<>
    <div className="flex flex-col items-center justify-center w-full h-full">
      <p className="text-2xl">Welcome to the NN Visualizer!</p>
      <p className="text-xl">This is a tool to help you learn about neural networks.</p>
      <p className="text-xl">To get started, click on the "model" tab.</p>
    </div>
  </>)
}