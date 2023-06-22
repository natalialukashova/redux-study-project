export const PRODUCTS = [
  { id: 1, name: "test 1", price: 100 },
  { id: 2, name: "test 2", price: 250 },
  { id: 3, name: "test 3", price: 310 },
  { id: 4, name: "test 4", price: 440 },
  { id: 5, name: "test 5", price: 520 },
  { id: 6, name: "test 6", price: 680 },
  { id: 7, name: "test 7", price: 730 },
];

export function fakeFetch(response) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(response);
    }, 1000);
  });
}
