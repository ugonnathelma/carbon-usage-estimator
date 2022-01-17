import countries from "../utils/constants/countries.json";
export const getCountrySubset = (countriesList: string[]) => {
  return countries.filter(({ code }) =>
    countriesList.includes(code.toLowerCase())
  );
};
