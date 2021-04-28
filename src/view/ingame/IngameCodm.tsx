import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import LowerThirds from "../../comps/lowerthirds/LowerThirds";
import { Participant, ReduxState } from "../../config/types/types";
import frame from "../../assets/imgs/ingameframe.png";

const mcs = makeStyles({
  screen: {
    width: 1920,
    height: 1080,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },

  top: {
    width: 1441,
    height: 60,
    display: "flex",
    justifyContent: "space-between",
    "& .left": { transformOrigin: "top left" },
    "& .rightlt": {
      transformOrigin: "top center",
      transform: "scale(0.4761904761904762) translateX(160px)!important",
    },
    "& .lt": {
      transform: "scale(0.4761904761904762)",
      "& .team": {
        height: "100%",
        display: "flex",
        alignItems: "center",

        "& .logo": {
          height: "80%",
          width: 100,
          margin: "0px 57px 0px 62px",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        },
        "& .details": {
          display: "flex",
          flexDirection: "column",
          flex: 1,

          "& .school": {
            color: "#ddd",
            fontFamily: "industry, sans-serif",
            textTransform: "uppercase",
            fontSize: 26,
            fontWeight: "bold",
            lineHeight: 1,
            whiteSpace: "nowrap",
            // letterSpacing: 1,
          },
          "& .name": {
            color: "#ffd200",
            fontFamily: "Druk Wide Bold, sans-serif",
            textTransform: "uppercase",
            fontSize: 38,
            lineHeight: 1,
          },
        },

        "& .right": {
          "& .school": { textAlign: "right" },
          "& .name": { textAlign: "right" },
        },

        "& .score": {
          color: "#f9f9f9",
          fontFamily: "Druk Wide Bold, sans-serif",
          textTransform: "uppercase",
          fontSize: 55,
          margin: "0px 47px",
        },
      },
    },
  },
  bottom: {
    height: 307,
    width: 779,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundImage: `url(${frame})`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& .text": {
      marginTop: 18,
      width: 700,
      // backgroundColor: "rgba(0,0,0,.5)",
      textAlign: "center",
      fontFamily: "Druk Wide Bold",
      textTransform: "uppercase",
      fontSize: 21,
      color: "#f8f8f8",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: 66.2,
    },
  },
});

const IngameCodm = () => {
  const c = mcs();
  const { tournament, match, swap_team_positions, live_data } = useSelector(
    (state: ReduxState) => state.live
  );

  const getParticipant = (id: number): Participant | undefined => {
    return (
      tournament?.participants.find((p) => p.id === id) ??
      tournament?.participants.find((p) => p.group_player_ids.includes(id))
    );
  };

  const getTeamLogo = (id: number = 0): string => {
    return (
      tournament?.participants.find((p) => p.id === id)?.logo ??
      tournament?.participants.find((p) => p.group_player_ids.includes(id))
        ?.logo ??
      ""
    );
  };

  const getFinalScore = (score: string, teamIndex: number) => {
    const scores: string[] = score.split(",");
    let team1: number = 0;
    let team2: number = 0;

    scores.forEach((s) => {
      let ss = s.match(/^(\d*)-(\d*)/);
      if (ss && parseInt(ss[1]) > parseInt(ss[2])) {
        team1 = team1 + 1;
      } else if (ss && parseInt(ss[1]) < parseInt(ss[2])) {
        team2 = team2 + 1;
      }
    });
    return teamIndex === 1 ? team1 : team2;
  };

  return (
    <div className={c.screen}>
      <div className={c.top}></div>
    </div>
  );
};

export default IngameCodm;
