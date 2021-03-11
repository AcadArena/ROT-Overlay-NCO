import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { config, Spring } from "react-spring/renderprops-universal";
import { ReduxState } from "../config/types/types";
import bg from "../assets/imgs/bg.png";
import Flag from "../comps/containers/Flag";

const mcs = makeStyles({
  screen: {
    width: 1920,
    height: 1080,
    display: "flex",
    flexDirection: "column",
    position: "relative",
    justifyContent: "center",
  },
  text: {
    position: "absolute",
    alignSelf: "center",
    justifySelf: "center",
    zIndex: 10,
    "& .text": {
      fontFamily: "Druk Wide Bold",
      fontSize: 300,
      lineHeight: 1,
      position: "relative",
    },

    "& .front": {
      color: "#004fff",
      zIndex: 99,
    },
    "& .back": {
      color: "transparent",
      "-webkit-text-stroke": "2px #004fff",
    },

    "& .top": {
      marginBottom: -40,
      transform: "translateY(100%)",
    },
    "& .bottom": { marginTop: -40, transform: "translateY(-100%)" },
  },
  bg: {
    height: 1080,
    width: 1920,
    backgroundSize: "100% 100%",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundImage: `url(${bg})`,
    zIndex: 9,
  },
  bg2: {
    height: 1080,
    width: 1920,
    backgroundSize: "100% 100%",
    backgroundColor: "#004fff",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 8,
  },
  flag: {
    alignSelf: "center",
    zIndex: 100,
    position: "absolute",
    top: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 180,
    "& .logo": {
      width: 330,
      height: 330,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },

    "& .school": {
      width: 330,
      textAlign: "center",
      color: "#f8f8f8",
      marginTop: 40,
      textTransform: "uppercase",
      fontFamily: "industry",
      fontWeight: "bold",
      fontSize: 24,
      lineHeight: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: 48,
    },
    "& .org": {
      width: 330,
      textAlign: "center",
      color: "#ffd200",
      marginTop: 10,
      textTransform: "uppercase",
      fontFamily: "Druk Wide Bold",
      fontSize: 36,
      lineHeight: 1,
      paddingBottom: 30,
      borderBottom: "3px solid #ffd200",
      height: 105,
    },
  },
});

const Winner = () => {
  const c = mcs();
  const { match_winner, tournament } = useSelector(
    (state: ReduxState) => state.live
  );

  const getOrgName = (id: number): string => {
    return (
      tournament?.participants?.find((p) => p.id === id)?.org_name ??
      tournament?.participants.find((p) => p.group_player_ids.includes(id))
        ?.org_name ??
      "TBD"
    );
  };

  const getUniName = (id: number): string => {
    return (
      tournament?.participants?.find((p) => p.id === id)?.university_name ??
      tournament?.participants.find((p) => p.group_player_ids.includes(id))
        ?.university_name ??
      "TBD"
    );
  };

  const getOrgLogo = (id: number): string => {
    return (
      tournament?.participants?.find((p) => p.id === id)?.logo ??
      tournament?.participants.find((p) => p.group_player_ids.includes(id))
        ?.logo ??
      ""
    );
  };
  return (
    <div className={c.screen}>
      {match_winner?.live && (
        <>
          <Spring
            from={{ opacity: 0, transform: "translateY(100px)" }}
            to={{ opacity: 1, transform: "translateY(0px)" }}
          >
            {(props) => (
              <div className={c.text} style={props}>
                <Spring
                  from={{
                    transform: "translateY(100%)",
                  }}
                  to={{
                    transform: "translateY(0%)",
                  }}
                >
                  {(props) => (
                    <div className="text back top" style={props}>
                      WINNER
                    </div>
                  )}
                </Spring>

                <div className="text front">WINNER</div>
                <Spring
                  from={{
                    transform: "translateY(-100%)",
                  }}
                  to={{
                    transform: "translateY(0%)",
                  }}
                >
                  {(props) => (
                    <div className="text back bottom" style={props}>
                      WINNER
                    </div>
                  )}
                </Spring>
              </div>
            )}
          </Spring>
          <Spring
            from={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            }}
            to={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            }}
            config={config.slow}
            delay={1000}
          >
            {(props) => <div className={c.bg} style={props}></div>}
          </Spring>
          <Spring
            from={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            }}
            to={{
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            }}
            delay={800}
          >
            {(props) => <div className={c.bg2} style={props}></div>}
          </Spring>

          <Spring
            from={{
              opacity: 0,
              transform: "translateY(-100%)",
            }}
            to={{
              opacity: 1,
              transform: "translateY(0%)",
            }}
            config={config.slow}
            delay={1000}
          >
            {(props) => (
              <Flag className={c.flag} style={props}>
                <div
                  className="logo"
                  style={{
                    backgroundImage: `url(${getOrgLogo(
                      match_winner.team?.id ?? 0
                    )})`,
                  }}
                ></div>
                <div className="school">
                  {getUniName(match_winner.team?.id ?? 0)}
                </div>
                <div className="org">
                  {getOrgName(match_winner.team?.id ?? 0)}
                </div>
              </Flag>
            )}
          </Spring>
        </>
      )}
    </div>
  );
};

export default Winner;
