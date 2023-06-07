import { ElementOf } from "~/utils/types";

type MustInclude<T extends string, U extends T[], error=true> = [T] extends [ElementOf<U>] ? U : (error extends true ? `${T extends ElementOf<U> ? never : T} is not in [${ElementOf<U>}]` : never);

interface RadioProps<O extends string, Arr extends O[]> {
  name: string,
  options: MustInclude<O, Arr>,
  selected: O,
  select: (newVal: O) => void,
  className?: string
}
export function Radio<O extends string, Arr extends O[]>({ name, options, selected, select, className = "" }: RadioProps<O, Arr>) {
  options = options as MustInclude<O, Arr, false>;
  return (<>
    <div className={`flex flex-col items-start justify-center ${className}`}>
      {options.map((option) => {
        // const selectedClass = option === selected ? "bg-blue-500" : "bg-blue-300";
        const id = option.toLowerCase().replace(/\s/g,'');
        return (<span key={option} className="flex flex-row items-center">
          <input type="radio" className="mt-1" id={id} name={name} value={option} checked={option === selected} onChange={(e) => select(e.target.value as O)} />
          <label htmlFor={id} className="text-center">{option}</label>
        </span>);
      })}
    </div>
  </>);
}