import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import LowerThirds, {
  getLTWidth,
  LowerThirdsSize,
} from "../comps/lowerthirds/LowerThirds";
import { LowerThirdsMode, ReduxState } from "../config/types/types";

import Marquee from "react-fast-marquee";

const getSize = (string: LowerThirdsMode): LowerThirdsSize => {
  switch (string) {
    case "ticker":
      return "medium";
    case "casters":
      return "medium";
    case "long":
      return "large";
    case "playerStats":
      return "medium";
    case "playerQuote":
      return "medium";
    default:
      return "medium";
  }
};

const mcs = makeStyles((theme) => ({
  // ticker
  tickerWrapper: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },

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
    alignItems: "center",
  },

  tickerItem: {
    display: "flex",
  },
}));

const Ticker = () => {
  const c = mcs();

  const { lowerThirds } = useSelector((state: ReduxState) => state.live);

  return (
    <LowerThirds shadow>
      <div className={c.tickerWrapper}>
        <div className={c.headline}>{lowerThirds?.headline}</div>
        <div className={c.ticker}>
          <Marquee
            gradientWidth={100}
            className={c.tickerInner}
            style={{
              width: getLTWidth(getSize(lowerThirds?.mode ?? "ticker")) - 126,
            }}
          >
            {lowerThirds?.ticker.split("\n").map((item, i) => (
              <div
                key={i}
                className={c.tickerItem}
                style={{ whiteSpace: "pre" }}
              >
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
      </div>
    </LowerThirds>
  );
};

export default Ticker;
