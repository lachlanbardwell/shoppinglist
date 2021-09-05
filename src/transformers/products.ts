export const transformProductResponse = (
  newData: any[],
  storeId: string,
  departID: string,
) => {
  const storeArray = newData.find((obj) => obj[storeId])?.[storeId];
  console.log(storeArray, storeId, newData);

  return storeArray[departID];
};
