import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "./assets/fonts/industry-fonts.css";
import LowerThirds from "./comps/lowerthirds/LowerThirds";
import { makeStyles } from "@material-ui/core";
import LowerThirdTicker from "./comps/lowerthirds/LowerThirdTicker";
import { Route, Switch } from "react-router-dom";
import CasterCam from "./view/CasterCam";

const ms = makeStyles({
  app: {
    overflow: "hidden",
    width: 1920,
    height: 1080,
    backgroundColor: "transparent",
  },
});

function App() {
  const c = ms();
  return (
    <div className={c.app}>
      <Switch>
        <Route path="/castercam">
          <CasterCam />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
