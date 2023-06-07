import { UnionToIntersection } from "./types";

export type MergedWithout<T, K extends keyof T, S> =
    // T;
    { [k in K]: LooseAutocomplete<S, T[K] extends S ? T[K] : never> } & UnionToIntersection<
      T extends unknown ? Omit<T, K> : never
    >;

export type LooseAutocomplete<Base, T extends Base> =
  Base extends string ? LooseAutocompleteStr<T extends string ? T : never> :
  Base extends number ? LooseAutocompleteNum<T extends number ? T : never> :
  Base;
type LooseAutocompleteStr<T extends string> = T;// | Omit<string, T>;
type LooseAutocompleteNum<T extends number> = T;// | Omit<number, T>;
