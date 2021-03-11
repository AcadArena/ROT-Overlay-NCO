import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "./assets/fonts/industry-fonts.css";
import LowerThirds from "./comps/lowerthirds/LowerThirds";
import { makeStyles } from "@material-ui/core";
import LowerThirdTicker from "./comps/lowerthirds/LowerThirdTicker";
import { Route, Switch } from "react-router-dom";
import CasterCam from "./view/CasterCam";
import Content from "./view/Content";
import Timer from "./view/Timer";
import Ticker from "./view/Ticker";
import VsScreen from "./view/VsScreen";
import Ingame from "./view/Ingame";
import Winner from "./view/Winner";
import LogoOnly from "./view/LogoOnly";
import Drafting from "./view/Drafting";

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
        <Route path="/content">
          <Content />
        </Route>
        <Route path="/timer">
          <Timer />
        </Route>
        <Route path="/ticker">
          <Ticker />
        </Route>
        <Route path="/vs">
          <VsScreen />
        </Route>
        <Route path="/ingame">
          <Ingame />
        </Route>
        <Route path="/winner">
          <Winner />
        </Route>
        <Route path="/logo">
          <LogoOnly />
        </Route>
        <Route path="/drafting">
          <Drafting />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
