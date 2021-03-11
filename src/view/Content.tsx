import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import Frame from "../comps/containers/Frame";
import { ReduxState } from "../config/types/types";
import Bracket from "./content/Bracket";
import ScheduleAndMatch from "./content/ScheduleAndMatch";

const ms = makeStyles((theme) => ({
  page: {
    position: "relative",
    height: 1080,
    width: 1920,
    overflow: "hidden",
    backgroundColor: "transparent",
  },
  box: {
    position: "absolute",
    // top: 216,
    left: 50,

    "& .fade-enter": {
      opacity: 0,
      transform: "translateX(-10px)",
    },
    "& .fade-enter-active": {
      opacity: 1,
      transform: "translateX(0px)",
    },
    "& .fade-exit": {
      opacity: 1,
      transform: "translateX(0px)",
    },
    "& .fade-exit-active": {
      opacity: 0,
      transform: "translateX(-10px)",
    },
    "& .fade-exit-active, .fade-enter-active": {
      transition: "300ms ease-out",
    },
  },
  wrapper: {
    height: "100%",
    width: "100%",
    position: "relative",
  },
}));

const Content = () => {
  const c = ms();
  const { container_mode } = useSelector((state: ReduxState) => state.live);

  return (
    <div className={c.page}>
      <Frame className={c.box}>
        <SwitchTransition>
          <CSSTransition
            key={container_mode}
            addEndListener={(node, done) =>
              node.addEventListener("transitionend", done, false)
            }
            classNames="fade"
          >
            <div className={c.wrapper}>
              {container_mode === "schedule" && <ScheduleAndMatch />}
              {container_mode === "bracket" && <Bracket />}
            </div>
          </CSSTransition>
        </SwitchTransition>
        {/* <ScheduleAndMatch /> */}
      </Frame>
    </div>
  );
};

export default Content;
