export const transformProductResponse = (
  newData: any[],
  storeId: string,
  departID: string,
) => {
  //   const newObject = newData.reduce((acc, current) => {
  //     return { ...acc, ...current };
  //   }, {});

  const storeArray = newData.find((obj) => obj[storeId])?.[storeId];
  console.log(storeArray, storeId, newData);

  const departmentArray = storeArray[departID].map((prev: any) => prev);

  return departmentArray;
};
