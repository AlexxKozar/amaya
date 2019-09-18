export class ValueFormattersHelpers {
  /**
   * Converts number in format "0000000.000" to string in format "0,000,000.0"
   */
  static toMoneyFormat(amount: number = 0, decimalCount: number = 1, decimal: string = '.', thousands: string = ',') {
    decimalCount = Math.abs(decimalCount);
    const negativeSign = amount < 0 ? '-' : '';
    amount = Math.abs(amount);

    const i = parseInt(amount.toString(), 10);
    const k = i.toString();
    const j = k.length > 3 ? k.length % 3 : 0;

    return (
      negativeSign +
      (j ? k.substr(0, j) + thousands : '') +
      k.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
      (decimalCount
        ? decimal +
        Math.abs(amount - i)
          .toFixed(decimalCount)
          .slice(2)
        : '')
    );
  }
}
