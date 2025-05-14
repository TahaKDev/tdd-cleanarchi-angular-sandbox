export class OrderLine {
  productName: string;
  quantity: number;
  price: number;
  constructor({
    productName,
    quantity,
    price,
  }: {
    productName: string;
    quantity: number;
    price: number;
  }) {
    this.productName = productName;
    this.quantity = quantity;
    this.price = price;
  }

  get totalPrice() {
    return this.price * this.quantity;
  }
}

export class Cart {
  orderLines: OrderLine[];

  constructor(
    orderLine: OrderLine[],
    private isFirstPurchase: boolean,
  ) {
    this.orderLines = orderLine;
  }

  public compute() {
    const total = this.orderLines.reduce(
      (sum, item) => sum + item.totalPrice,
      0,
    );
    return this.isFirstPurchase ? Math.max(total - 5, 0) : total;
  }
}
