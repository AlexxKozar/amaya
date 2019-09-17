import { Injectable } from '@angular/core';
import { CalculationDataInterface } from '@interfaces/calculation-data.interface';
import { PRICES } from '@constants/prices.constant';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  private prices = PRICES;
  private formsData = {
    style: 'urban',
    sizes: [0, 0, 0],
    configuration: {
      downSelection: false,
      freezerSelection: false,
      ovenSelection: false,
      mezzanineSelection: false,
      shelvesSelection: false,
      islandSelection: false,
      islandSize: 0
    },
    schema: 1
  };

  constructor() {}

  public calculateKitchenPrice(data: CalculationDataInterface = this.formsData) {
    const { style, sizes, configuration } = data;
    const kitchenPrices = this.prices[style];
    const totalSize = this.calculateTotalSize(sizes);
    const kitchenPrice = kitchenPrices.kitchen * totalSize;
    const downPrice = +configuration.downSelection * kitchenPrices.down * totalSize;
    const mezzaninePrice = +configuration.mezzanineSelection * kitchenPrices.mezzanine * totalSize;
    const islandPrice = +configuration.islandSelection * kitchenPrices.island * configuration.islandSize / 1000;
    const freezerPrice = +configuration.freezerSelection * kitchenPrices.freezer;
    const ovenPrice = +configuration.ovenSelection * kitchenPrices.oven;
    const shelvesPrice = +configuration.shelvesSelection * kitchenPrices.shelves;
    const mountingPrice = kitchenPrices.mounting * totalSize;
    const deliveryPrice = kitchenPrices.delivery;

    const configurationPrice =
      kitchenPrice +
      downPrice +
      mezzaninePrice +
      islandPrice +
      freezerPrice +
      ovenPrice +
      shelvesPrice;

    const totalPrice =
      configurationPrice +
      mountingPrice +
      deliveryPrice;

    return {
      totalPrice,
      configurationPrice,
      kitchenPrice,
      downPrice,
      mezzaninePrice,
      islandPrice,
      freezerPrice,
      ovenPrice,
      shelvesPrice,
      mountingPrice,
      deliveryPrice
    };
  }

  public setStyle(style: string) {
    this.formsData.style = style;
  }

  public setSchema(schema: number) {
    this.formsData.schema = schema;
  }

  public setSizes(sizes: Array<number>) {
    this.formsData.sizes = sizes;
  }

  public setConfiguration(configuration: CalculationDataInterface['configuration']) {
    this.formsData.configuration = configuration;
  }

  public getFormsData(): CalculationDataInterface {
    return this.formsData;
  }

  private calculateTotalSize(sizes: Array<number>) {
    let total = 0;
    sizes.forEach(size => {
      total += size;
    });
    return total / 1000;
  }

}
