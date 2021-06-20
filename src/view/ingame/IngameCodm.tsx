import { makeStyles } from "@material-ui/core";
import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Participant, ReduxState } from "../../config/types/types";
import frame from "../../assets/imgs/codm-ingame.png";

const mcs = makeStyles({
  screen: {
    width: 1920,
    height: 1080,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundSize: "stretch",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${frame})`,
    position: "relative",
  },
  top: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    transform: "translateX(14px)",

    "& .spacer": {
      width: 519,
      height: 69,
    },

    "& .one": {
      "& .details": {
        padding: "0 0 0 45px",
      },
      "& .score": {
        margin: "3px 0 0 46px",
        transform: "skew(40deg)  translateX(2px)",
      },
    },

    "& .two": {
      flexDirection: "row-reverse",
      "& .details": {
        padding: "0 45px 0 0",
        textAlign: "right",
        alignItems: "flex-end",
      },
      "& .score": {
        margin: "3px 46px 0 0",
        transform: "skew(-40deg) translateX(-2px)",
      },
    },

    "& .team": {
      display: "flex",
      height: 69,
      width: 288,

      "& .logo": {
        height: 60,
        width: 60,
        alignSelf: "center",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      },
      "& .details-wrapper": {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        "& .details": {
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          height: 55,
          "& .school": {
            fontFamily: "Druk Wide Bold",
            lineHeight: 1,
            fontWeight: "bold",
            fontSize: 20,
          },
          "& .org": {
            fontFamily: "industry",
            fontWeight: "bold",
            lineHeight: 1,
            textTransform: "uppercase",
          },
        },

        "& .score": {
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 5,
          "& .bar": {
            height: 10,
            border: "2px solid #ffd000",
            backgroundColor: "rgba(0,0,0,.3)",
          },
        },
      },
    },
  },

  stage: {
    position: "absolute",
    height: 50,
    width: 300,
    bottom: 195,
    left: 49,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,.5)",

    fontFamily: "Anton",
    color: "#fff",
    textTransform: "uppercase",
    fontSize: 35,
  },
});

const IngameCodm = () => {
  const c = mcs();
  const {
    tournament,
    match,
    swap_team_positions: swap,
    live_data,
  } = useSelector((state: ReduxState) => state.live);

  const team = (id: number = 0): Participant | undefined => {
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

  const getFinalScore = (score: string = "0-0", teamIndex: 1 | 2) => {
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
      <div className={c.top}>
        <div className="team one">
          <div
            className="logo"
            style={{
              backgroundImage: `url(${getTeamLogo(
                swap ? match?.player2_id : match?.player1_id
              )})`,
            }}
          ></div>
          <div className="details-wrapper">
            <div className="details">
              <div className="school">
                {
                  team(swap ? match?.player2_id : match?.player1_id)
                    ?.university_acronym
                }
              </div>
              <div className="org">
                {team(swap ? match?.player2_id : match?.player1_id)?.org_name}
              </div>
            </div>
            <div className="score">
              <Bar
                shaded={getFinalScore(match?.scores_csv, swap ? 2 : 1) > 0}
              />
              <Bar
                shaded={getFinalScore(match?.scores_csv, swap ? 2 : 1) > 1}
              />
              <Bar
                shaded={getFinalScore(match?.scores_csv, swap ? 2 : 1) > 2}
              />
            </div>
          </div>
        </div>
        <div className="spacer"></div>
        <div className="team two">
          <div
            className="logo"
            style={{
              backgroundImage: `url(${getTeamLogo(
                swap ? match?.player1_id : match?.player2_id
              )})`,
            }}
          ></div>
          <div className="details-wrapper">
            <div className="details">
              <div className="school">
                {
                  team(swap ? match?.player1_id : match?.player2_id)
                    ?.university_acronym
                }
              </div>
              <div className="org">
                {team(swap ? match?.player1_id : match?.player2_id)?.org_name}
              </div>
            </div>
            <div className="score">
              <Bar
                shaded={getFinalScore(match?.scores_csv, swap ? 1 : 2) > 2}
              />
              <Bar
                shaded={getFinalScore(match?.scores_csv, swap ? 1 : 2) > 1}
              />
              <Bar
                shaded={getFinalScore(match?.scores_csv, swap ? 1 : 2) > 0}
              />
            </div>
          </div>
        </div>
      </div>

      {/**
       * This section is for the lower left info
       */}

      <div className={c.stage}>{live_data?.stage}</div>
    </div>
  );
};

export default IngameCodm;

const Bar: FC<{ shaded?: boolean }> = ({ shaded }) => {
  return (
    <div
      className="bar"
      style={{ backgroundColor: shaded ? "#ffd000" : "rgba(0,0,0,.3)" }}
    />
  );
};
