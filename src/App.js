import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import Assets from "./components/Pages/Asset";
import Routes from "./components/Pages/Route";
import Vehicle from "./components/Pages/Vehicle";
import Configure from "./components/Pages/Configure";

// Create a custom generateClassName function with a production prefix
const generateClassName = createGenerateClassName({ productionPrefix: "assets" });
// 
// Define the routing configuration component
export default ({ history }) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
            <Route path="/assets/list" exact component={Assets} />
            <Route path="/assets/route/add" exact component={Routes} />
            <Route
              path="/assets/route/edit/:editid"
              exact
              component={Routes}
            />
            <Route
              path="/assets/vehicle/edit/:editid"
              exact
              component={Vehicle}
            />
            <Route path="/assets/vehicle/add" exact component={Vehicle} />
            <Route path="/assets/configure" exact component={Configure} />
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};
