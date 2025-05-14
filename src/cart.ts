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

  constructor(orderLine: OrderLine[]) {
    this.orderLines = orderLine;
  }

  public compute() {
    let total = 0;
    for (const item of this.orderLines) {
      total += item.totalPrice;
    }
    return total;
  }
}
