import React from "react";
import "./App.css";
import { ConnectedForm } from "./components/Form/Form";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ConnectedChart } from "./components/Chart/Chart";
import { Box, Grid } from "@mui/material";

const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Box p={6} mt={3}>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <ConnectedChart />
            </Grid>
            <Grid item xs={12} md={6}>
              <ConnectedForm />
            </Grid>
          </Grid>
        </Box>
      </Provider>
    </div>
  );
};

export default App;
