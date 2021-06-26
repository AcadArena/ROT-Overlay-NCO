import React from "react";
import { useSelector } from "react-redux";
import { Participant, ReduxState } from "../../config/types/types";
import ingameMlbb2 from "../../assets/imgs/ingameMlbb2.png";
// import Metro from "../../assets/imgs/Metro.png";
import { makeStyles } from "@material-ui/core";

import luzon from "../../assets/imgs/luzon.png";
import vismin from "../../assets/imgs/vismin.png";
import metro from "../../assets/imgs/metromanila.png";

// @ts-ignore
import { Textfit } from "react-textfit";

const conferences: { [key: string]: string } = {
  NCOS2MLBB_Luzon: luzon,
  NCOS2MLBB_VisMin: vismin,
  NCOS2MLBB_Metro: metro,
};

const IngameStyle = makeStyles((theme) => ({
  screen: {
    width: 1920,
    height: 1080,
    position: "relative",
    "& .badge": {
      position: "absolute",
      width: 143,
      height: 125,
      left: 338,
      top: 0,
      backgroundSize: "auto 85%",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },

    "& .lowerthird": {
      backgroundImage: `url(${ingameMlbb2})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      width: "100%",
      height: "100%",
    },

    "& .metroCompliance": {
      position: "absolute",
      top: 10,
      left: 360,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      width: "95px",
      height: "110px",
    },

    "& .score": {
      margin: "0px 47px",
    },

    "& .tournament-wrapper": {
      display: "flex",
      fontSize: 24,
      padding: "55px 30rem",
      color: "#000000",

      "& .spacer": {
        width: 140,
        height: 69,
      },

      "& .teamOne-wrapper": {
        fontFamily: "Druk Wide Bold, sans-serif",
        display: "flex",
        alignItems: "center",
        position: "relative",
        width: 350,
        height: 70,
        padding: "50px 0 0",
        // background: "#000",
        // justifyContent: "center",

        "& .team-details": {
          display: "flex",
          alignItems: "center",
          // background: "#000",
          width: "100%",

          "& .logo": {
            position: "absolute",
            left: 10,
            top: 2,
            height: "100%",
            width: 40,
            margin: "0px 10px",
            // objectFit: "contain",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          },

          "& .team1Name": {
            width: 258,
            height: 48,
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            color: "#ffffff",
            position: "absolute",
            left: "5rem",
            top: 12,
            lineHeight: 1,
          },
        },

        "& .team-score": {
          width: 60,
          height: 60,
          margin: "0 0 50px 380px",
          background: "#000",
          position: "relative",

          "& .team1Score": {
            fontSize: 35,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            margin: "auto",
            // left: "15rem",
            // right: 0,
            color: "#fff",
          },
        },
      },

      "& .teamTwo-wrapper": {
        fontFamily: "Druk Wide Bold, sans-serif",
        display: "flex",
        alignItems: "center",
        position: "relative",
        width: 350,
        height: 70,
        padding: "50px 0 0",

        // background: "#000",
        // justifyContent: "center",

        "& .team-details": {
          // display: "flex",
          // alignItems: "center",
          // background: "#000",
          width: "100%",

          "& .logo": {
            position: "absolute",
            left: 540,
            top: 2,
            height: "100%",
            width: 40,
            margin: "0px 10px",
            // objectFit: "contain",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          },

          "& .team2Name": {
            width: 258,
            textAlign: "center",
            color: "#ffffff",
            position: "absolute",
            left: 270,
            top: 12,
            height: 48,
            lineHeight: 1,
            display: "flex",
            alignItems: "center",
          },
        },

        "& .team-score": {
          width: 60,
          height: 60,
          margin: "0 100px 50px 0px",
          // background: "#000",
          position: "relative",

          "& .team2Score": {
            fontSize: 35,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            margin: "auto",
            // left: "15rem",
            // right: 0,
            color: "#fff",
          },
        },
      },
    },
  },
}));

const IngameMLBB: React.FC = () => {
  const styles = IngameStyle();
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
    <div className={styles.screen}>
      <div
        className="badge"
        style={{
          backgroundImage: `url("${conferences[tournament?.url ?? ""]}")`,
        }}
      ></div>

      <div className="lowerthird">
        {/* <img className="metroCompliance" src={Metro} alt="" /> */}
        {/* <div
          className="metroCompliance"
          style={{ backgroundImage: `url(${Metro})` }}
        /> */}
        <div className="tournament-wrapper">
          <div className="teamOne-wrapper">
            <div className="team-details">
              <div
                className="logo"
                style={{
                  backgroundImage: `url(${getTeamLogo(
                    swap_team_positions ? match?.player2_id : match?.player1_id
                  )})`,
                }}
              />
              <Textfit max={24} mode="single" className="team1Name">
                {
                  getParticipant(
                    (swap_team_positions
                      ? match?.player2_id
                      : match?.player1_id) ?? 0
                  )?.org_name
                }
              </Textfit>
            </div>
            <div className="team-score">
              <span className="team1Score">
                {" "}
                {getFinalScore(
                  match?.scores_csv ?? "",
                  swap_team_positions ? 2 : 1
                )}
              </span>
            </div>
          </div>
          {/* <div className="spacer" /> */}
          <div className="teamTwo-wrapper">
            <div className="team-details">
              <div
                className="logo"
                style={{
                  backgroundImage: `url(${getTeamLogo(
                    swap_team_positions ? match?.player1_id : match?.player2_id
                  )}})`,
                }}
              />
              <Textfit max={24} mode="single" className="team2Name">
                {
                  getParticipant(
                    (swap_team_positions
                      ? match?.player1_id
                      : match?.player2_id) ?? 0
                  )?.org_name
                }
              </Textfit>
            </div>
            <div className="team-score">
              <span className="team2Score">
                {" "}
                {getFinalScore(
                  match?.scores_csv ?? "",
                  swap_team_positions ? 1 : 2
                )}
              </span>
            </div>
          </div>
        </div>
        {/* <div className="mlbbContentScore">
          <span className="team2">
            {
              getParticipant(
                (swap_team_positions ? match?.player1_id : match?.player2_id) ??
                  0
              )?.university_name
            }
          </span>
          <span className="team2Score">
            {" "}
            {getFinalScore(
              match?.scores_csv ?? "",
              swap_team_positions ? 1 : 2
            )}
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default IngameMLBB;
