import { Cart, OrderLine } from './cart';
import { add } from './addition';
import { describe, it } from 'vitest';

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
    expect(new Cart(someOrderLines, false).compute()).toBe(40);
  });

  it.each`
    price | expectedCartTotal
    ${60} | ${55}
    ${61} | ${56}
    ${2}  | ${0}
  `(
    'should add discount when first purchase of a new member',
    ({ price, expectedCartTotal }) => {
      const someOrderLines = [
        new OrderLine({
          productName: 'Some book',
          price,
          quantity: 1,
        }),
      ];
      expect(new Cart(someOrderLines, true).compute()).toBe(expectedCartTotal);
    },
  );

  it('should add two numbers', () => {
    const a = 1;
    const b = 1;
    const result = 2;
    expect(add(a, b)).toBe(result);
  });
});
