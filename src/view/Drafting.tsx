import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import LowerThirds from "../comps/lowerthirds/LowerThirds";
import { Participant, ReduxState } from "../config/types/types";

const mcs = makeStyles({
  screen: {
    height: 1080,
    width: 1920,
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  teams: {
    width: 1878,
    height: 126,
    marginTop: 23,
    display: "flex",
    justifyContent: "space-between",
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
          fontSize: 20,
          fontWeight: "bold",
          lineHeight: 1,
          // letterSpacing: 1,
        },
        "& .name": {
          color: "#ffd200",
          fontFamily: "Druk Wide Bold, sans-serif",
          textTransform: "uppercase",
          fontSize: 34,
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
});

const Drafting = () => {
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
      <div className={c.teams}>
        <LowerThirds shadow disablelogo size={783}>
          <div className="team">
            <div
              className="logo"
              style={{
                backgroundImage: `url(${getTeamLogo(
                  swap_team_positions ? match?.player2_id : match?.player1_id
                )}})`,
              }}
            ></div>
            <div className="details">
              <div className="school">
                {
                  getParticipant(
                    (swap_team_positions
                      ? match?.player2_id
                      : match?.player1_id) ?? 0
                  )?.university_name
                }
              </div>
              <div className="name">
                {
                  getParticipant(
                    (swap_team_positions
                      ? match?.player2_id
                      : match?.player1_id) ?? 0
                  )?.org_name
                }
              </div>
            </div>
            <div className="score">
              {getFinalScore(
                match?.scores_csv ?? "",
                swap_team_positions ? 2 : 1
              )}
            </div>
          </div>
        </LowerThirds>
        <LowerThirds shadow disablelogo reversecut size={783}>
          <div className="team">
            <div className="score">
              {getFinalScore(
                match?.scores_csv ?? "",
                swap_team_positions ? 1 : 2
              )}
            </div>
            <div className="details right">
              <div className="school">
                {
                  getParticipant(
                    (swap_team_positions
                      ? match?.player1_id
                      : match?.player2_id) ?? 0
                  )?.university_name
                }
              </div>
              <div className="name">
                {
                  getParticipant(
                    (swap_team_positions
                      ? match?.player1_id
                      : match?.player2_id) ?? 0
                  )?.org_name
                }
              </div>
            </div>
            <div
              className="logo"
              style={{
                backgroundImage: `url(${getTeamLogo(
                  swap_team_positions ? match?.player1_id : match?.player2_id
                )}})`,
              }}
            ></div>
          </div>
        </LowerThirds>
      </div>
    </div>
  );
};

export default Drafting;
