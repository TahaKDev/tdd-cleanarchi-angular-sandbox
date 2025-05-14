import { calculateTotal, Cart, OrderLine } from './cart';
import { add } from './addition';

describe('Cart computation', () => {
  it('should calculate the total of the cart', () => {
    const someOrderLines = [
      new OrderLine({
        productName: 'Some book',
        price: 10,
        quantity: 2,
      }),
      new OrderLine({
        productName: 'Some other book',
        price: 20,
        quantity: 1,
      }),
    ];
    expect(new Cart(someOrderLines).compute()).toBe(40);
  });

  it('should add two numbers', () => {
    const a = 1;
    const b = 1;
    const result = 2;
    expect(add(a, b)).toBe(result);
  });
});
