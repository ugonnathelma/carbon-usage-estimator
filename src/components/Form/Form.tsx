import React, { Dispatch, ChangeEvent } from "react";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Stack,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import countries from "../../utils/constants/countries.json";

import { connect } from "react-redux";
import {
  submitFormWithValues,
  updateFormInputValues,
} from "../../redux/actions";
import { ResponsiveContainer } from "recharts";

interface IFormProps {
  location: string;
  electricityUnit: string;
  electricityUsage: string;
  dispatch: Dispatch<IAction>;
}

const Form = ({
  location,
  electricityUnit,
  electricityUsage,
  dispatch,
}: IFormProps) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    const { value, name } = event.target;
    dispatch(updateFormInputValues({ [name]: value }));
  };

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    dispatch(updateFormInputValues({ [name]: value }));
  };

  const handleSubmit = () => {
    dispatch(
      submitFormWithValues({ location, electricityUnit, electricityUsage })
    );
  };

  const isElectricityUsageValid = parseFloat(electricityUsage) >= 0;

  const isSubmitDisabled = !Boolean(
    location && electricityUnit && electricityUsage && isElectricityUsageValid
  );

  return (
    <ResponsiveContainer>
      <Stack spacing={2} data-testid="form">
        <Typography variant="h4" component="h4">
          Carbon Usage Estimator
        </Typography>
        <TextField
          error={Boolean(electricityUsage && !isElectricityUsageValid)}
          name="electricityUsage"
          value={electricityUsage}
          helperText="Only positive decimal numbers are valid"
          required
          label="Electricity Usage"
          variant="filled"
          fullWidth
          inputProps={{
            type: "number",
            role: "electricity-usage-input",
          }}
          id="electricity_value"
          onChange={handleTextChange}
        />
        <FormControl variant="filled" fullWidth>
          <InputLabel id="locationlabel">Location</InputLabel>
          <Select
            name="location"
            required
            labelId="locationLabel"
            id="location"
            value={location}
            SelectDisplayProps={{ role: "location-dropdown" }}
            onChange={handleChange}
          >
            {countries.map(({ name, code }: ICountries) => {
              return (
                <MenuItem key={code} value={code}>
                  {name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl variant="filled" fullWidth>
          <InputLabel id="electricity-unit-label">
            Unit of Measurement
          </InputLabel>
          <Select
            inputProps={{ "data-testid": "electricity_unit" }}
            name="electricityUnit"
            labelId="electricity-unit-label"
            id="electricity_unit"
            value={electricityUnit}
            onChange={handleChange}
          >
            <MenuItem value="mwh">mwh</MenuItem>
            <MenuItem value="kwh">kwh</MenuItem>
          </Select>
        </FormControl>

        <Button
          fullWidth
          data-testid="submit-button"
          variant="contained"
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
        >
          Submit
        </Button>
      </Stack>
    </ResponsiveContainer>
  );
};

export const ConnectedForm = connect((state: DefaultRootState) => {
  const { location, electricityUnit, electricityUsage } = state;
  return { location, electricityUnit, electricityUsage };
})(Form);
