import React, { Dispatch } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Box,
} from "@mui/material";

import { connect } from "react-redux";
import { getCountrySubset } from "../../utils/getCountrySubset";
import { filterByLocation, updateFormInputValues } from "../../redux/actions";

interface IChartProps {
  estimates: [];
  dispatch: Dispatch<IAction>;
  filterLocation: string;
  estimateCountries: string[];
  filteredEstimates: [];
}

const Chart = ({
  estimates,
  filterLocation,
  estimateCountries,
  filteredEstimates,
  dispatch,
}: IChartProps) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    const { value, name } = event.target;
    dispatch(updateFormInputValues({ [name]: value }));
    dispatch(filterByLocation({ location: value }));
  };

  return (
    <Stack data-testid="chart">
      <FormControl variant="filled" fullWidth>
        <InputLabel id="filterlocationlabel">Filter by Location</InputLabel>
        <Select
          name="filterLocation"
          required
          labelId="filterlocationLabel"
          id="filterLocation"
          value={filterLocation || ""}
          onChange={handleChange}
          SelectDisplayProps={{ role: "filter-dropdown" }}
        >
          <MenuItem value={""}>
            <em>All</em>
          </MenuItem>
          {getCountrySubset(estimateCountries).map(
            ({ name, code }: ICountries) => {
              return (
                <MenuItem key={code} value={code}>
                  {name}
                </MenuItem>
              );
            }
          )}
        </Select>
      </FormControl>
      <br />
      <Box ml={"-45px"}>
        <ResponsiveContainer
          width="100%"
          minHeight={"400px"}
          minWidth={"270px"}
        >
          <LineChart
            data={filteredEstimates.length ? filteredEstimates : estimates}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="estimated_at" />
            <YAxis dataKey="carbon_kg" />
            <Tooltip />
            <Legend />
            <Line
              name="Carbon Usage (KG)"
              type="monotone"
              dataKey="carbon_kg"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>{" "}
      </Box>
    </Stack>
  );
};

export const ConnectedChart = connect((state: DefaultRootState) => {
  const { estimates, estimateCountries, filteredEstimates, filterLocation } =
    state;
  return {
    estimates,
    filterLocation,
    estimateCountries,
    filteredEstimates,
  };
})(Chart);
