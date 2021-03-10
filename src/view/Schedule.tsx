import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import Frame from "../comps/containers/Frame";
import { ReduxState } from "../config/types/types";

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
    top: 216,
    left: 774,
  },
  current: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
  },
  schedule: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    alignItems: "center",
    paddingTop: 91,

    "& .head": {
      fontFamily: "Druk Wide Bold",
      fontSize: 40,
      color: "#ffd200",
    },

    "& .matches": {
      display: "flex",
      flexDirection: "column",
      marginTop: 14,
      marginRight: 40,

      "& .match": {
        display: "flex",
        marginBottom: 20,

        "& .vs": {
          color: "#ffd200",
          fontSize: 16,
          margin: "0px 20px",
          fontFamily: "Druk Wide Bold",
          alignSelf: "center",
        },

        "& .badge": {
          color: "#fbfbfb",
          backgroundColor: "#004fff",
          padding: "3px 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          marginRight: 20,
          transform: "skew(-10deg)",
          fontFamily: "industry",
          fontWeight: "bold",
          width: 97,
          // height: 30,

          "& .item": {
            marginTop: -3,
          },
        },

        "& .team": {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 150,
          "& .logo": {
            height: 55,
            width: 55,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            marginBottom: 3,
          },

          "& .name": {
            color: "#fbfbfb",
            fontFamily: "industry",
            textTransform: "uppercase",
            fontWeight: "bold",
            lineHeight: 1,
            textAlign: "center",
          },
        },
      },
    },
  },
}));

const Schedule = () => {
  const c = ms();
  const { matches_today = [], tournament = { participants: [] } } = useSelector(
    (state: ReduxState) => state.live
  );

  const getOrgName = (id: number): string => {
    return (
      tournament?.participants?.find((p) => p.id === id)?.org_name ??
      tournament?.participants.find((p) => p.group_player_ids.includes(id))
        ?.org_name ??
      ""
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
    <div className={c.page}>
      <Frame className={c.box}>
        <div className={c.current}></div>
        <div className={c.schedule}>
          <div className="head">SCHEDULE</div>

          <div className="matches">
            {matches_today.map((match) => (
              <div className="match">
                <div className="badge">
                  <div className="item">5:00 PM</div>
                </div>
                <div className="team">
                  <div
                    className="logo"
                    style={{
                      backgroundImage: `url(${getOrgLogo(match.player1_id)})`,
                    }}
                  ></div>
                  <div className="name">{getOrgName(match.player1_id)}</div>
                </div>
                <div className="vs">VS</div>
                <div className="team">
                  <div
                    className="logo"
                    style={{
                      backgroundImage: `url(${getOrgLogo(match.player2_id)})`,
                    }}
                  ></div>
                  <div className="name">{getOrgName(match.player2_id)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Frame>
    </div>
  );
};

export default Schedule;
