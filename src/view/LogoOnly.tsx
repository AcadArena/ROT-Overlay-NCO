import React from "react";
import { useSelector } from "react-redux";
import logo from "../assets/imgs/logo-w-container.png";
import { ReduxState } from "../config/types/types";

const LogoOnly = () => {
  const {
    live_data = { season: "2", split_title: "Luzon", stage: "Playoffs" },
  } = useSelector((state: ReduxState) => state.live);
  return (
    <div
      style={{
        width: 381,
        height: 211,
        backgroundSize: "100% 100%",
        backgroundImage: `url(${logo})`,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "90%",
          bottom: 0,
          height: 36,
          marginLeft: 10,
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // fontFamily: "Druk Wide Bold",
          fontFamily: "industry",
          fontWeight: "bold",
          fontSize: 20,
          color: "#f8f8f8",
          lineHeight: 1,
          transform: "translateY(-1px)",
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        S{live_data.season} {live_data.split_title} - {live_data.stage}
      </div>
    </div>
  );
};

export default LogoOnly;
