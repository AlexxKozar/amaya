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
      down: {selected: false},
      freezer: {selected: false},
      oven: {selected: false},
      mezzanine: {selected: false},
      shelves: {selected: false},
      island: {
        selected: false,
        size: 0
      },
    },
    schema: 1
  };

  constructor() {}

  public calculateKitchenPrice(data: CalculationDataInterface = this.formsData) {
    const { style, sizes, configuration } = data;
    const kitchenPrices = this.prices[style];
    const totalSize = this.calculateTotalSize(sizes);
    const kitchenPrice = Math.round(kitchenPrices.kitchen * totalSize);
    const downPrice = Math.round(+configuration.down.selected * kitchenPrices.down * totalSize);
    const mezzaninePrice = Math.round(+configuration.mezzanine.selected * kitchenPrices.mezzanine * totalSize);
    const islandPrice = Math.round(+configuration.island.selected * kitchenPrices.island * configuration.island.size / 1000);
    const freezerPrice = +configuration.freezer.selected * kitchenPrices.freezer;
    const ovenPrice = +configuration.oven.selected * kitchenPrices.oven;
    const shelvesPrice = +configuration.shelves.selected * kitchenPrices.shelves;
    const mountingPrice = Math.round(kitchenPrices.mounting * totalSize);
    const deliveryPrice = kitchenPrices.delivery;

    const totalPrice = Math.round(
      kitchenPrice +
      downPrice +
      mezzaninePrice +
      islandPrice +
      freezerPrice +
      ovenPrice +
      shelvesPrice +
      mountingPrice +
      deliveryPrice
    );

    return {
      totalPrice,
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
