import { makeStyles } from "@material-ui/core";
import React from "react";
import LowerThirds from "./LowerThirds";
import Ticker from "react-ticker";
import Marquee from "react-fast-marquee";
import { useSelector } from "react-redux";
import { ReduxState } from "../../config/types/types";
import classes from "*.module.css";

const ms = makeStyles({
  headline: {
    color: "#ffd200",
    fontFamily: "'industry', sans-serif",
    fontSize: 34,
    fontWeight: "bold",
    flex: 1,
    padding: "0px 39px 0px 67px",
    display: "flex",
    alignItems: "center",
    textTransform: "uppercase",
    overflow: "hidden",
  },
  ticker: {
    backgroundColor: "#fff",
    color: "#02143c",
    fontFamily: "'industry'",
    height: 37,
    display: "flex",
    alignItems: "center",
    padding: "0px 39px 0px 0px",
    fontSize: "13.5pt",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    position: "relative",
    width: "100%",
  },
  tickerInner: {
    width: 735,
    alignItems: "center",
  },
  tickerItem: {
    display: "flex",
  },
});

const LowerThirdTicker = () => {
  const c = ms();
  const { lowerThirds } = useSelector((state: ReduxState) => state.live);
  return (
    <LowerThirds shadow>
      <div className={c.headline}>{lowerThirds?.headline}</div>
      <div className={c.ticker}>
        <Marquee gradientWidth={100} className={c.tickerInner}>
          {lowerThirds?.ticker.split("\n").map((item, i) => (
            <div className={c.tickerItem} style={{ whiteSpace: "pre" }}>
              {item}
              {lowerThirds?.ticker.split("\n").length - 1 === i ? (
                <span style={{ margin: "0px 20px" }}></span>
              ) : (
                <span style={{ margin: "0px 20px" }}>|</span>
              )}
            </div>
          ))}
        </Marquee>
      </div>
    </LowerThirds>
  );
};

export default LowerThirdTicker;
