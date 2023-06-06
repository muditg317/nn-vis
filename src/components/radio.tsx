
interface RadioProps<O extends string> {
  name: string,
  options: ReadonlyArray<O>,
  selected: O,
  select: (newVal: O) => void,
}
export function Radio<O extends string>({ name, options, selected, select }: RadioProps<O>) {
  return (<>
    <div className="flex flex-col items-start justify-center w-full h-full">
      {options.map((option) => {
        // const selectedClass = option === selected ? "bg-blue-500" : "bg-blue-300";
        const id = option.toLowerCase().replace(/\s/g,'');
        return (<span key={option} className="flex flex-row">
          <input type="radio" id={id} name={name} value={option} checked={option === selected} onChange={(e) => select(e.target.value as O)} />
          <label htmlFor={id}>{option}</label>
        </span>);
      })}
    </div>
  </>);
}