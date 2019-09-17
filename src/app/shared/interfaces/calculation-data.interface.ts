export interface CalculationDataInterface {
  style: string ;
  schema: number;
  sizes: Array<number>;
  configuration: {
    downSelection: boolean
    freezerSelection: boolean,
    ovenSelection: boolean,
    mezzanineSelection: boolean,
    shelvesSelection: boolean,
    islandSelection: boolean,
    islandSize: number
  };
}

