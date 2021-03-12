import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { config, Spring } from "react-spring/renderprops-universal";
import Flag from "../comps/containers/Flag";
import { ReduxState } from "../config/types/types";

const mcs = makeStyles((theme) => ({
  vsScreen: {
    height: 1080,
    width: 1920,
    display: "flex",
    justifyContent: "space-between",
    padding: "0px 180px",

    "& .mid": {
      textAlign: "center",
      color: "#02143c",
      marginTop: 10,
      textTransform: "uppercase",
      fontFamily: "Druk Wide Bold",
      fontSize: 75,
      lineHeight: 1,
      paddingBottom: 30,
      alignSelf: "center",
    },
  },
  flag: {
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
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: 105,
    },
    // "& .border": {
    //   height: 3,
    //   width: 330,
    //   backgroundColor: "#ffd200",
    // },
  },
}));

const VsScreen = () => {
  const c = mcs();
  const { match, tournament } = useSelector((state: ReduxState) => state.live);

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
    <div className={c.vsScreen}>
      <Spring
        from={{ opacity: 0, transform: "translateY(-100%)" }}
        to={{ opacity: 1, transform: "translateY(0%)" }}
      >
        {(props) => (
          <Flag className={c.flag} style={props}>
            <div
              className="logo"
              style={{
                backgroundImage: `url(${getOrgLogo(match?.player1_id ?? 0)})`,
              }}
            ></div>
            <div className="school">{getUniName(match?.player1_id ?? 0)}</div>
            <div className="org">{getOrgName(match?.player1_id ?? 0)}</div>
            <div className="border"></div>
          </Flag>
        )}
      </Spring>
      <Spring
        from={{ opacity: 0, transform: "translateY(-100%)" }}
        to={{ opacity: 1, transform: "translateY(0%)" }}
        delay={400}
      >
        {(props) => (
          <div className="mid" style={props}>
            VERSUS
          </div>
        )}
      </Spring>

      <Spring
        from={{ opacity: 0, transform: "translateY(-100%)" }}
        to={{ opacity: 1, transform: "translateY(0%)" }}
      >
        {(props) => (
          <Flag className={c.flag} style={props}>
            <div
              className="logo"
              style={{
                backgroundImage: `url(${getOrgLogo(match?.player2_id ?? 0)})`,
              }}
            ></div>
            <div className="school">{getUniName(match?.player2_id ?? 0)}</div>
            <div className="org">{getOrgName(match?.player2_id ?? 0)}</div>
            <div className="border"></div>
          </Flag>
        )}
      </Spring>
    </div>
  );
};

export default VsScreen;
