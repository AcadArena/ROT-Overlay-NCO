import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

import border from "../assets/imgs/veto-codm-border2.png";
import { ReduxState } from "../config/types/types";
import { CodmMap, maps } from "../config/types/vetoCodm.interface";

const mcs = makeStyles({
  screen: {
    height: 822,
    width: 1663,
    position: "relative",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${border})`,
    display: "flex",
  },
  grid: {
    display: "grid",
    width: "100%",
    gridTemplateColumns: "repeat(10,1fr)",
    gridTemplateRows: "61px 521px 71px 98px",
    padding: "9px 0",

    "& .map": { gridColumn: "auto / span 2" },

    "& .pick": {
      backgroundColor: "rgba(255,255,255,1)",
      border: "4px solid #02143c",
      borderBottom: "8px solid #02143c",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gridColumn: "auto / span 2",

      "& .text": {
        padding: "10px 25px",
        fontFamily: "Anton",
        backgroundColor: "rgba(0,0,0,.75)",
        fontSize: 32,
        color: "#ffd200",
        textTransform: "uppercase",
      },
    },

    "& .mode": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Anton",
      fontSize: 31,
      color: "#ffffff",
      textTransform: "uppercase",
      gridColumn: "auto / span 2",
    },

    "& .ban": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Anton",
      border: "6px solid #02143c",
      position: "relative",

      "& .bg": {
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        filter: "grayscale(100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: 10,
      },
      "& .text": {
        backgroundColor: "rgba(0,0,0,.75)",
        fontSize: 20,
        color: "#FFF",
        textTransform: "uppercase",
        padding: "7px 15px",
        lineHeight: 1,

        zIndex: 10,
      },
    },

    "& .map1": {
      marginLeft: 4,
    },
    "& .map2": {
      marginRight: 4,
      borderLeft: 0,
    },

    "& .ban_mode": {
      gridColumn: "auto / span 2",
      paddingTop: 5,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Anton",
      fontSize: 24,
      color: "#ffd000",
      textTransform: "uppercase",
      lineHeight: 1,
    },
    "& > *": {
      backgroundSize: "cover",
      backgroundPosition: "center",
    },

    "& .match": {
      gridColumn: "7 / 11",
      gridRow: "4 / 6",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 6,
      "& .vs": {
        fontFamily: "Druk Wide Bold",
        fontSize: 50,
        padding: "0 60px",
      },

      "& .team": {
        height: 120,
        width: 150,
        backgroundPosition: "center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      },
    },
  },
});

const VetoScreen = () => {
  const c = mcs();
  const { match, tournament } = useSelector((state: ReduxState) => state.live);

  const getLogo = (id: number = 0) => {
    return tournament?.participants.find(
      (p) => p.id === id || p.group_player_ids.includes(id)
    )?.logo;
  };
  return (
    <div className={c.screen}>
      <div className={c.grid}>
        {/* maps */}
        <div className="map" />
        <div className="map" />
        <div className="map" />
        <div className="map" />
        <div className="map" />
        {/*  */}
        <div
          className="pick"
          style={{
            borderLeft: "8px solid #02143c",
            backgroundImage: `url(${
              maps[match?.veto_codm?.map1?.pick as CodmMap]
            })`,
          }}
        >
          {match?.veto_codm?.map1?.pick && (
            <div className="text">{match?.veto_codm?.map1?.pick}</div>
          )}
        </div>
        <div
          className="pick"
          style={{
            backgroundImage: `url(${
              maps[match?.veto_codm?.map2?.pick as CodmMap]
            })`,
          }}
        >
          {match?.veto_codm?.map2?.pick && (
            <div className="text">{match?.veto_codm?.map2?.pick}</div>
          )}
        </div>
        <div
          className="pick"
          style={{
            backgroundImage: `url(${
              maps[match?.veto_codm?.map3?.pick as CodmMap]
            })`,
          }}
        >
          {match?.veto_codm?.map3?.pick && (
            <div className="text">{match?.veto_codm?.map3?.pick}</div>
          )}
        </div>
        <div
          className="pick"
          style={{
            backgroundImage: `url(${
              maps[match?.veto_codm?.map4?.pick as CodmMap]
            })`,
          }}
        >
          {match?.veto_codm?.map4?.pick && (
            <div className="text">{match?.veto_codm?.map4?.pick}</div>
          )}
        </div>
        <div
          className="pick"
          style={{
            borderRight: "8px solid #02143c",
            backgroundImage: `url(${
              maps[match?.veto_codm?.map5?.pick as CodmMap]
            })`,
          }}
        >
          {match?.veto_codm?.map5?.pick && (
            <div className="text">{match?.veto_codm?.map5?.pick}</div>
          )}
        </div>

        {/* modes */}

        <div className="mode">{match?.veto_codm?.map1?.mode}</div>
        <div className="mode">{match?.veto_codm?.map2?.mode}</div>
        <div className="mode">{match?.veto_codm?.map3?.mode}</div>
        <div className="mode">{match?.veto_codm?.map4?.mode}</div>
        <div className="mode">{match?.veto_codm?.map5?.mode}</div>

        {/* BANS */}

        <div className="ban">
          <div
            className="bg"
            style={{
              backgroundImage: `url(${
                maps[match?.veto_codm?.map1?.ban1 as CodmMap]
              })`,
            }}
          ></div>
          {match?.veto_codm?.map1?.ban1 && (
            <div className="text">{match?.veto_codm?.map1?.ban1}</div>
          )}
        </div>
        <div className="ban map2">
          <div
            className="bg"
            style={{
              backgroundImage: `url(${
                maps[match?.veto_codm?.map1?.ban2 as CodmMap]
              })`,
            }}
          ></div>
          {match?.veto_codm?.map1?.ban2 && (
            <div className="text">{match?.veto_codm?.map1?.ban2}</div>
          )}
        </div>

        <div className="ban map1">
          <div
            className="bg"
            style={{
              backgroundImage: `url(${
                maps[match?.veto_codm?.map2?.ban1 as CodmMap]
              })`,
            }}
          ></div>
          {match?.veto_codm?.map2?.ban1 && (
            <div className="text">{match?.veto_codm?.map2?.ban1}</div>
          )}
        </div>
        <div className="ban map2">
          <div
            className="bg"
            style={{
              backgroundImage: `url(${
                maps[match?.veto_codm?.map2?.ban2 as CodmMap]
              })`,
            }}
          ></div>
          {match?.veto_codm?.map2?.ban2 && (
            <div className="text">{match?.veto_codm?.map2?.ban2}</div>
          )}
        </div>

        <div className="ban map1">
          <div
            className="bg"
            style={{
              backgroundImage: `url(${
                maps[match?.veto_codm?.map3?.ban1 as CodmMap]
              })`,
            }}
          ></div>
          {match?.veto_codm?.map3?.ban1 && (
            <div className="text">{match?.veto_codm?.map3?.ban1}</div>
          )}
        </div>
        <div className="ban map3">
          <div
            className="bg"
            style={{
              backgroundImage: `url(${
                maps[match?.veto_codm?.map3?.ban2 as CodmMap]
              })`,
            }}
          ></div>
          {match?.veto_codm?.map3?.ban2 && (
            <div className="text">{match?.veto_codm?.map3?.ban2}</div>
          )}
        </div>

        <div className="ban_mode">Ban {match?.veto_codm?.map1?.ban_mode}</div>
        <div className="ban_mode">Ban {match?.veto_codm?.map2?.ban_mode}</div>
        <div className="ban_mode">Ban {match?.veto_codm?.map3?.ban_mode}</div>

        <div className="match">
          <div
            className="team"
            style={{ backgroundImage: `url(${getLogo(match?.player1_id)})` }}
          ></div>
          <div className="vs">VS</div>
          <div
            className="team"
            style={{ backgroundImage: `url(${getLogo(match?.player2_id)})` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default VetoScreen;
