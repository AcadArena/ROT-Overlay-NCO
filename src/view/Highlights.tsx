import React from "react";
import { makeStyles } from "@material-ui/core";
import bg from "../assets/imgs/highlights.png";
import useTournament from "../config/hooks/useTournament";
// @ts-ignore
import { Textfit } from "react-textfit";
import { useSelector } from "react-redux";
import { Live, ReduxState } from "../config/types/types";

const mcs = makeStyles((theme) => ({
  highlight: {
    width: 1396,
    height: 687,
    backgroundSize: "100% 100%",
    backgroundImage: `url("${bg}")`,
    position: "relative",

    "& .content": {
      height: 522,
      width: 369,
      position: "absolute",
      top: 72,
      left: 52,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",

      "& .match": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        marginTop: 80,

        "& .team": {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",

          width: 150,
          flexShrink: 0,
          "& .logo": {
            height: 100,
            width: 150,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          },
          "& .name": {
            paddingTop: 10,
            width: 150,
            fontFamily: "Anton",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            height: 45,
            textAlign: "center",
            lineHeight: 1,
            textTransform: "uppercase",
          },
        },

        "& .vs": {
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          "& .text": {
            fontFamily: "Anton",
            color: "#fff",
            fontSize: 28,
            lineHeight: 1,
          },
          "& .bestof": {
            fontFamily: "Druk Wide Bold",
            lineHeight: 1,
            color: "#ffd200",
          },
        },
      },

      "& .sched": {
        display: "flex",
        flexDirection: "column",
        marginTop: 82,
        width: "100%",
        "& .s": {
          display: "flex",
          alignItems: "center",
          width: "100%",
          marginBottom: 10,
          "& .badge": {
            flexShrink: 0,
            color: "#fff",
            fontFamily: "Industry",
            backgroundColor: "#004fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 86,
            transform: "skew(-20deg)",
            marginRight: 14,
            "& .text": {
              transform: "skew(20deg)",
              fontWeight: "bold",
              lineHeight: 1,
              padding: 4,
            },
          },
          "& .team": {
            display: "flex",
            flexShrink: 0,
            alignItems: "center",
            width: 120,
            "& .logo": {
              flexShrink: 0,
              height: 40,
              width: 40,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            },

            "& .name": {
              paddingLeft: 8,
              fontFamily: "Druk Wide Bold",
              color: "#fff",
              width: 80,
            },
          },

          "& .vs": {
            fontFamily: "Industry",
            color: "#fff",
            padding: "0px 10px",
            fontWeight: "bold",
          },
        },
      },
    },
  },
}));

const Highlights = () => {
  const c = mcs();
  const { matches_today } = useSelector<ReduxState, Live>(
    (state) => state.live
  );
  const { match, team, badger } = useTournament();
  return (
    <div className={c.highlight}>
      <div className="content">
        <div className="match">
          <div className="team">
            <div
              className="logo"
              style={{
                backgroundImage: `url("${team(match?.player1_id)?.logo}")`,
              }}
            ></div>
            <Textfit mode="single" max={28} className="name">
              {team(match?.player1_id)?.org_name}
            </Textfit>
          </div>
          <div className="vs">
            <div className="text">VS</div>
            <div className="bestof">BO{match?.bestOf ?? 3}</div>
          </div>
          <div className="team">
            <div
              className="logo"
              style={{
                backgroundImage: `url("${team(match?.player2_id)?.logo}")`,
              }}
            ></div>
            <Textfit mode="single" max={28} className="name">
              {team(match?.player2_id)?.org_name}
            </Textfit>
          </div>
        </div>

        <div className="sched">
          {matches_today
            ?.filter((m) => m.id !== match?.id)
            .map((m) => (
              <div className="s">
                <div className="badge">
                  <div className="text">{badger(m)}</div>
                </div>
                <div className="team">
                  <div
                    className="logo"
                    style={{
                      backgroundImage: `url("${team(m.player1_id)?.logo}")`,
                    }}
                  ></div>
                  <Textfit max={14} mode="single" className="name">
                    {team(m.player1_id)?.university_acronym}
                  </Textfit>
                </div>
                <div className="vs">VS</div>
                <div className="team">
                  <div
                    className="logo"
                    style={{
                      backgroundImage: `url("${team(m.player2_id)?.logo}")`,
                    }}
                  ></div>
                  <Textfit max={14} mode="single" className="name">
                    {team(m.player2_id)?.university_acronym}
                  </Textfit>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Highlights;
