import { makeStyles } from "@material-ui/core";
import React from "react";
import Flag from "../comps/containers/Flag";
import main from "../assets/imgs/main.png";
import lol from "../assets/imgs/lol.png";
import codm from "../assets/imgs/codm-logo.png";
import TimerComponent from "../comps/timer/TimerComp";
import { useSelector } from "react-redux";
import { ReduxState } from "../config/types/types";
import { Spring, config } from "react-spring/renderprops-universal";

const mcs = makeStyles((theme) => ({
  timer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "90px 0 200px 0",
    "& .logo": {
      width: 291,
      height: 284,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundImage: `url(${main})`,
    },

    "& .starting": {
      color: "#004fff",
      marginTop: 85,
      fontSize: 25,
      paddingBottom: 20,
      borderBottom: "3px solid #ffd200",
      fontFamily: "Druk Wide Bold",
      textTransform: "uppercase",
    },
    "& .time": {
      color: "#f8f8f8",
      fontSize: 75,
      fontFamily: "Druk Wide Bold",
    },

    "& .game": {
      marginTop: 45,
      marginLeft: 10,
      height: 105,
      width: 300,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },
  },
}));

const games = (game: string = "") => {
  switch (game) {
    case "League of Legends":
      return lol;
    case "Call of Duty Mobile":
      return codm;
    default:
      return "";
  }
};

const Timer = () => {
  const c = mcs();
  const { countdown_minutes = Date.now(), tournament } = useSelector(
    (state: ReduxState) => state.live
  );
  return (
    <div>
      <Spring
        from={{ opacity: 0, transform: "translateY(-100%)" }}
        to={{ opacity: 1, transform: "translateY(-0)" }}
      >
        {(props) => (
          <Flag className={c.timer} style={props}>
            <div className="logo"></div>
            <div className="starting">Starting soon</div>
            <div className="time">
              <TimerComponent expiryTimestamp={countdown_minutes} />
            </div>
            <div
              className="game"
              style={{
                backgroundImage: `url(${games(tournament?.game_name)})`,
              }}
            ></div>
          </Flag>
        )}
      </Spring>
    </div>
  );
};

export default Timer;
