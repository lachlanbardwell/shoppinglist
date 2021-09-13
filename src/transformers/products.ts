export const transformProductResponse = (
  newData: any[],
  storeId: string,
  departID: string,
) => {
  // ?. Operator reads storeId within connected object, without needing to
  // use a reduce function
  const storeArray = newData.find((obj) => obj[storeId])?.[storeId];

  return storeArray[departID];
};
