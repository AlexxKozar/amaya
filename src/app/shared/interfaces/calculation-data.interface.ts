export interface CalculationDataInterface {
  style: string ;
  schema: number;
  sizes: Array<number>;
  configuration: {
    down: {selected: boolean}
    freezer: {selected: boolean},
    oven: {selected: boolean},
    shelves: {selected: boolean},
    mezzanine: {selected: boolean},
    island: {
      selected: boolean,
      size: number
    }
  };
}

