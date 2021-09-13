import { transformProductResponse } from '../../transformers/products';

export const getItems = async (storeId: string, departID: string) =>
  transformProductResponse(
    [
      {
        Woolworths: {
          produce: [
            {
              id: 'Apples',
              weight: 1000,
              color: 'Pink',
              price: 4.99,
            },
            {
              id: 'Strawberries',
              weight: 250,
              color: 'Red',
              price: 3.99,
            },
            {
              id: 'Tomatoes',
              weight: 500,
              color: 'red',
              price: 6.99,
            },
            {
              id: 'Blueberries',
              weight: 200,
              color: 'Blue',
              price: 4.99,
            },
            {
              id: 'Cashews',
              weight: 400,
              color: 'Beige',
              price: 8.99,
            },
            {
              id: 'Onions',
              weight: 100,
              color: 'Brown',
              price: 0.7,
            },
            {
              id: 'Carrots',
              weight: 1000,
              color: 'Orange',
              price: 3.99,
            },
            {
              id: 'Broccolini',
              weight: 200,
              color: 'Green',
              price: 2.99,
            },
            {
              id: 'Avocados',
              weight: 200,
              color: 'Green',
              price: 2,
            },
            {
              id: 'Oranges',
              weight: 3000,
              color: 'Orange',
              price: 5.99,
            },
            {
              id: 'Potatoes',
              weight: 200,
              color: 'White',
              price: 1,
            },
            {
              id: 'Bananas',
              weight: 500,
              color: 'Yellow',
              price: 2.5,
            },
          ],
          deli: [
            {
              id: 'Whole roast chicken',
              weight: 2000,
              color: 'Brown',
              price: 10,
            },
            {
              id: 'Microwave meal',
              weight: 300,
              color: 'White',
              price: 7,
            },
            {
              id: 'Chicken Thigh kg',
              weight: 400,
              color: 'White',
              price: 5,
            },
            {
              id: 'Chicken Breast kg',
              weight: 400,
              color: 'White',
              price: 4,
            },
            {
              id: 'Shredded chicken breast',
              weight: 400,
              color: 'White',
              price: 6,
            },
            {
              id: 'Sundried Tomatoes',
              weight: 300,
              color: 'Red',
              price: 7,
            },
          ],
          perishables: [
            {
              id: 'Chobani 1L',
              weight: 1000,
              color: 'White',
              price: 6,
            },
          ],
          meat: [{ id: 'Minced Beef', weight: 500, color: 'Red', price: 9.99 }],
          grocery: [
            { id: 'Peanut Butter', weight: 200, color: 'Brown', price: 3.99 },
          ],
        },
      },
    ],
    storeId,
    departID,
  );
