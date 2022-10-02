export const convertDepart: (depart: string) => string = (
  inputDepart: string,
) => {
  return inputDepart.substring(0, 1).toUpperCase() + inputDepart.substring(1);
};
