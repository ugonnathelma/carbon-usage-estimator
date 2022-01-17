export const calculateCarbonUsage = async (values: DefaultRootState) => {
  const { electricityUsage, electricityUnit, location } = values;

  const data = {
    type: "electricity",
    electricity_unit: electricityUnit,
    electricity_value: electricityUsage,
    country: location,
  };

  const response = await fetch(`${process.env.REACT_APP_API_URL}/estimates`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json();
};
