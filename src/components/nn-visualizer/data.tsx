interface DataProps {
  data: string
}
export default function Data({ data }: DataProps) {
  // console.log("data", data);
  return (<>
    <div className="flex flex-col items-center justify-center w-full h-full">
      <p className="text-2xl">Data</p>
      <p className="text-xl">This is a tool to help you learn about neural networks.</p>
      <p className="text-xl">To get started, click on the &ldquo;model&rdquo; tab.</p>
      {data}
    </div>
  </>)
}