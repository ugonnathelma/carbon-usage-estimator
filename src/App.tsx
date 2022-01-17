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
        <Box
          p={6}
          mt={3}
          justifyContent={"center"}
          display={"flex"}
          height={"100%"}
        >
          <Grid container spacing={[0, 4, 6]} maxWidth={"1500px"}>
            <Grid item xs={12} md={6} mb={[4, 0]}>
              <ConnectedChart />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              marginBottom={4}
              height={"100%"}
              maxHeight={"400px"}
            >
              <ConnectedForm />
            </Grid>
          </Grid>
        </Box>
      </Provider>
    </div>
  );
};

export default App;
