import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import luzon from "../../assets/imgs/luzon.png";
import vismin from "../../assets/imgs/vismin.png";
import codm from "../../assets/imgs/codm_logo.png";
import bracket from "../../assets/imgs/bracket_single_elim.png";
import metro from "../../assets/imgs/Metro.png";
import { Match, Participant, ReduxState } from "../../config/types/types";

const makeComponentStyles = makeStyles((theme) => ({
  page: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    paddingTop: 75,
    paddingLeft: 85,

    "& .stage": {
      fontFamily: "Druk Wide Bold",
      textTransform: "uppercase",
      color: "#ffd200",
      fontSize: 42,
    },

    "& .bracket": {
      // width: 951,
      // height: 399,
      width: 850,
      height: 356.62460567823,
      marginTop: 10,
      backgroundSize: "contain",
      backgroundPosition: "top left",
      backgroundRepeat: "no-repeat",
      backgroundImage: `url(${bracket})`,
      position: "relative",
    },
  },

  conference: {
    position: "absolute",
    top: 64,
    right: 45,
    display: "flex",
    flexDirection: "row-reverse",
    height: 110,
    paddingLeft: 50,
    "& .logo": {
      width: 91,
      // margin: "0px 30px 0 20px",
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      // filter: "drop-shadow(5px 8px 0px #004fff)",
    },

    "& .text": {
      color: "#ffd200",
      fontFamily: "industry",
      textTransform: "uppercase",
      lineHeight: 1,
      paddingTop: 20,
      display: "flex",
      flexDirection: "column",
      textAlign: "right",

      "& .headline": {
        fontWeight: "bold",
        fontSize: 48,
      },

      "& .sub": {
        paddingTop: 3,
        fontSize: 16.5,
        letterSpacing: 3,
        color: "#f8f8f8",
        whiteSpace: "nowrap",
      },
    },
  },
  match: {
    width: 200,
    height: 71,
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    justifyContent: "space-between",

    "& .right": {
      "& .name": {
        transform: "translateY(-1px)",
      },
    },

    "& .team": {
      height: 33.5,
      width: 200,
      display: "flex",
      alignItems: "center",

      "& .logo": {
        margin: "0px 10px 0 5px",
        height: "90%",
        width: 35,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        filter: "drop-shadow(0px 4px 2px rgba(0,0,0,.5))",
      },

      "& .name": {
        color: "#02143c",
        fontSize: 14,
        fontFamily: "industry",
        textTransform: "uppercase",
        fontWeight: "bold",
        width: 110,
        lineHeight: 1,
      },

      "& .score": {
        fontSize: 24,
        color: "#02143c",
        fontFamily: "industry",
        textTransform: "uppercase",
        fontWeight: "bold",
        flex: 1,
        textAlign: "right",
        paddingRight: 10,
        lineHeight: 1,
        marginTop: -3,
      },
    },
  },

  match1: { top: 21 },
  match2: { top: 108 },
  match3: { top: 195 },
  match4: { top: 282 },
  match5: { top: 60, left: 312 },
  match6: { top: 233.5, left: 312 },
  match7: { top: 150, left: 605 },
}));

const conferences: any = {
  NCOS2LoL_Luzon: luzon,
  NCOS2LoL_VisMin: vismin,
  NCOS2LoL_Metro: metro,
  NCOS2CODM: codm,
};

const Bracket = () => {
  const c = makeComponentStyles();
  const { tournament, live_data } = useSelector(
    (state: ReduxState) => state.live
  );

  const getOrgName = (id: number = 0): string => {
    return (
      tournament?.participants?.find((p) => p.id === id)?.org_name ??
      tournament?.participants.find((p) => p.group_player_ids.includes(id))
        ?.org_name ??
      "TBD"
    );
  };

  const getOrgLogo = (id: number = 0): string => {
    return (
      tournament?.participants?.find((p) => p.id === id)?.logo ??
      tournament?.participants.find((p) => p.group_player_ids.includes(id))
        ?.logo ??
      ""
    );
  };

  const getMatchWins = (match: Match | undefined, team?: Participant) => {
    const groupIds: number[] = team?.group_player_ids ?? [];

    let win: number = 0;
    let lost: number = 0;

    if (match) {
      let isTeam1 =
        groupIds.includes(match.player1_id) || team?.id === match.player1_id;

      let sss = match.scores_csv.split(",");

      sss.forEach((ssss) => {
        let ss = ssss.match(/^(\d*)-(\d*)/);

        if (isTeam1) {
          if (ss && parseInt(ss[1]) > parseInt(ss[2])) {
            win = win + 1;
          } else if (ss && parseInt(ss[1]) < parseInt(ss[2])) {
            lost = lost + 1;
          }
        } else {
          if (ss && parseInt(ss[1]) < parseInt(ss[2])) {
            win = win + 1;
          } else if (ss && parseInt(ss[1]) > parseInt(ss[2])) {
            lost = lost + 1;
          }
        }
      });
    }
    return win;
  };

  const team = (id: number | undefined = 0) => {
    return tournament?.participants?.find(
      (p) => p.group_player_ids.includes(id) || p.id === id
    );
  };

  const getColor = (m: Match | undefined, player: number) => {
    if (m) {
      if (player === 1) {
        if (
          getMatchWins(m, team(m.player1_id)) >
            getMatchWins(m, team(m.player2_id)) &&
          getMatchWins(m, team(m.player1_id)) > 2
        ) {
          return "#004fff";
        } else {
          return "#02143c";
        }
      } else {
        if (
          getMatchWins(m, team(m.player1_id)) <
            getMatchWins(m, team(m.player2_id)) &&
          getMatchWins(m, team(m.player2_id)) > 2
        ) {
          return "#004fff";
        } else {
          return "#02143c";
        }
      }
    }
  };

  const getPreviousMatchWinner = (i: number = 0): Participant | undefined => {
    const match = tournament?.matches[i];
    const player1_id = match?.player1_id;
    const player2_id = match?.player2_id;

    if (getMatchWins(match, team(player1_id)) > 2) {
      console.log(getOrgLogo(player1_id));
      return team(player1_id);
    } else if (getMatchWins(match, team(player2_id)) > 2) {
      console.log(getOrgLogo(player2_id));
      return team(player2_id);
    }
  };

  return (
    <div className={c.page}>
      <div className="stage">Playoffs</div>
      <div className="bracket">
        {/* Match 1  =======================================================*/}
        <div className={c.match + " " + c.match1}>
          {/* Left Team */}
          <div className="team">
            <div
              className="logo"
              style={{
                backgroundImage: `url(${getOrgLogo(
                  tournament?.matches[0]?.player1_id
                )})`,
              }}
            ></div>
            <div className="name">
              {getOrgName(tournament?.matches[0]?.player1_id)}
            </div>
            <div
              className="score"
              style={{ color: getColor(tournament?.matches[0], 1) }}
            >
              {getMatchWins(
                tournament?.matches[0],
                team(tournament?.matches[0].player1_id)
              )}
            </div>
          </div>

          {/* Right Team */}
          <div className="team right">
            <div
              className="logo"
              style={{
                backgroundImage: `url(${getOrgLogo(
                  tournament?.matches[0]?.player2_id
                )})`,
              }}
            ></div>
            <div className="name">
              {getOrgName(tournament?.matches[0]?.player2_id)}
            </div>
            <div
              className="score"
              style={{ color: getColor(tournament?.matches[0], 2) }}
            >
              {getMatchWins(
                tournament?.matches[0],
                team(tournament?.matches[0].player2_id)
              )}
            </div>
          </div>
        </div>

        {/* Match 2 ======================================================= */}
        <div className={c.match + " " + c.match2}>
          {/* Left Team */}
          <div className="team">
            <div
              className="logo"
              style={{
                backgroundImage: `url(${getOrgLogo(
                  tournament?.matches[1]?.player1_id
                )})`,
              }}
            ></div>
            <div className="name">
              {getOrgName(tournament?.matches[1]?.player1_id)}
            </div>
            <div
              className="score"
              style={{ color: getColor(tournament?.matches[1], 1) }}
            >
              {getMatchWins(
                tournament?.matches[1],
                team(tournament?.matches[1].player1_id)
              )}
            </div>
          </div>

          {/* Right Team */}
          <div className="team right">
            <div
              className="logo"
              style={{
                backgroundImage: `url(${getOrgLogo(
                  tournament?.matches[1]?.player2_id
                )})`,
              }}
            ></div>
            <div className="name">
              {getOrgName(tournament?.matches[1]?.player2_id)}
            </div>
            <div
              className="score"
              style={{ color: getColor(tournament?.matches[1], 2) }}
            >
              {getMatchWins(
                tournament?.matches[1],
                team(tournament?.matches[1].player2_id)
              )}
            </div>
          </div>
        </div>

        {/* Match 3 ======================================================= */}
        <div className={c.match + " " + c.match3}>
          {/* Left Team */}
          <div className="team">
            {tournament?.matches[2]?.player1_id ? (
              <div
                className="logo"
                style={{
                  backgroundImage: `url(${getOrgLogo(
                    tournament?.matches[2]?.player1_id
                  )})`,
                }}
              ></div>
            ) : (
              <div style={{ margin: "0px 10px" }}></div>
            )}
            <div className="name">
              {getOrgName(tournament?.matches[2]?.player1_id)}
            </div>
            {tournament?.matches[2]?.player1_id &&
              tournament?.matches[2]?.player2_id && (
                <div
                  className="score"
                  style={{ color: getColor(tournament?.matches[2], 1) }}
                >
                  {getMatchWins(
                    tournament?.matches[2],
                    team(tournament?.matches[2].player1_id)
                  )}
                </div>
              )}
          </div>

          {/* Right Team */}
          <div className="team right">
            {tournament?.matches[2]?.player2_id ? (
              <div
                className="logo"
                style={{
                  backgroundImage: `url(${getOrgLogo(
                    tournament?.matches[2]?.player2_id
                  )})`,
                }}
              ></div>
            ) : (
              <div style={{ margin: "0px 10px" }}></div>
            )}
            <div className="name">
              {getOrgName(tournament?.matches[2]?.player2_id)}
            </div>

            {tournament?.matches[2]?.player2_id &&
              tournament?.matches[2]?.player1_id && (
                <div
                  className="score"
                  style={{ color: getColor(tournament?.matches[2], 2) }}
                >
                  {getMatchWins(
                    tournament?.matches[2],
                    team(tournament?.matches[2].player2_id)
                  )}
                </div>
              )}
          </div>
        </div>

        {/* Match 4 ======================================================= */}
        <div className={c.match + " " + c.match4}>
          {/* Left Team */}
          <div className="team">
            {tournament?.matches[3]?.player1_id ? (
              <div
                className="logo"
                style={{
                  backgroundImage: `url(${getOrgLogo(
                    tournament?.matches[3]?.player1_id
                  )})`,
                }}
              ></div>
            ) : (
              <div style={{ margin: "0px 10px" }}></div>
            )}
            <div className="name">
              {getOrgName(tournament?.matches[3]?.player1_id)}
            </div>
            {tournament?.matches[3]?.player1_id &&
              tournament?.matches[3]?.player2_id && (
                <div
                  className="score"
                  style={{ color: getColor(tournament?.matches[3], 1) }}
                >
                  {getMatchWins(
                    tournament?.matches[3],
                    team(tournament?.matches[3].player1_id)
                  )}
                </div>
              )}
          </div>

          {/* Right Team */}
          <div className="team right">
            {tournament?.matches[3]?.player2_id ? (
              <div
                className="logo"
                style={{
                  backgroundImage: `url(${getOrgLogo(
                    tournament?.matches[3]?.player2_id
                  )})`,
                }}
              ></div>
            ) : (
              <div style={{ margin: "0px 10px" }}></div>
            )}
            <div className="name">
              {getOrgName(tournament?.matches[3]?.player2_id)}
            </div>

            {tournament?.matches[3]?.player2_id &&
              tournament?.matches[3]?.player1_id && (
                <div
                  className="score"
                  style={{ color: getColor(tournament?.matches[3], 2) }}
                >
                  {getMatchWins(
                    tournament?.matches[3],
                    team(tournament?.matches[3].player2_id)
                  )}
                </div>
              )}
          </div>
        </div>

        {/* Match 5 ======================================================= */}
        <div className={c.match + " " + c.match5}>
          {/* Left Team */}
          <div className="team">
            <div
              className="logo"
              style={{
                backgroundImage: `url(${
                  team(tournament?.matches[4]?.player1_id)
                    ? getOrgLogo(tournament?.matches[4]?.player1_id)
                    : getPreviousMatchWinner(0)?.logo
                })`,
              }}
            ></div>
            <div className="name">
              {team(tournament?.matches[4]?.player1_id)
                ? getOrgName(tournament?.matches[4]?.player1_id)
                : getPreviousMatchWinner(0)?.org_name || "TBD"}
            </div>
            <div
              className="score"
              style={{ color: getColor(tournament?.matches[4], 1) }}
            >
              {getMatchWins(
                tournament?.matches[4],
                team(tournament?.matches[4].player1_id)
              )}
            </div>
          </div>

          {/* Right Team */}
          <div className="team right">
            {tournament?.matches[4]?.player2_id ? (
              <div
                className="logo"
                style={{
                  backgroundImage: `url(${getOrgLogo(
                    tournament?.matches[4]?.player2_id
                  )})`,
                }}
              ></div>
            ) : (
              <div style={{ margin: "0px 10px" }}></div>
            )}
            <div className="name">
              {getOrgName(tournament?.matches[4]?.player2_id)}
            </div>

            <div
              className="score"
              style={{ color: getColor(tournament?.matches[4], 2) }}
            >
              {getMatchWins(
                tournament?.matches[4],
                team(tournament?.matches[4].player2_id)
              )}
            </div>
          </div>
        </div>

        {/* Match 6 ======================================================= */}
        <div className={c.match + " " + c.match6}>
          {/* Left Team */}
          <div className="team">
            {tournament?.matches[5]?.player1_id ? (
              <div
                className="logo"
                style={{
                  backgroundImage: `url(${getOrgLogo(
                    tournament?.matches[5]?.player1_id
                  )})`,
                }}
              ></div>
            ) : (
              <div style={{ margin: "0px 10px" }}></div>
            )}
            <div className="name">
              {getOrgName(tournament?.matches[5]?.player1_id)}
            </div>
            <div
              className="score"
              style={{ color: getColor(tournament?.matches[5], 1) }}
            >
              {getMatchWins(
                tournament?.matches[5],
                team(tournament?.matches[5].player1_id)
              )}
            </div>
          </div>

          {/* Right Team */}
          <div className="team right">
            <div
              className="logo"
              style={{
                backgroundImage: `url(${
                  team(tournament?.matches[5].player2_id)
                    ? getOrgLogo(tournament?.matches[5]?.player2_id)
                    : getPreviousMatchWinner(3)?.logo
                })`,
              }}
            ></div>
            <div className="name">
              {team(tournament?.matches[5]?.player2_id)
                ? getOrgName(tournament?.matches[5]?.player2_id)
                : getPreviousMatchWinner(3)?.org_name || "TBD"}
            </div>

            <div
              className="score"
              style={{ color: getColor(tournament?.matches[5], 2) }}
            >
              {getMatchWins(
                tournament?.matches[5],
                team(tournament?.matches[5].player2_id)
              )}
            </div>
          </div>
        </div>

        {/* Match 6 ======================================================= */}
        <div className={c.match + " " + c.match7}>
          {/* Left Team */}
          <div className="team">
            <div
              className="logo"
              style={{
                backgroundImage: `url(${
                  team(tournament?.matches[6]?.player1_id)
                    ? getOrgLogo(tournament?.matches[6]?.player1_id)
                    : getPreviousMatchWinner(4)?.logo
                })`,
              }}
            ></div>
            <div className="name">
              {team(tournament?.matches[6]?.player1_id)
                ? getOrgName(tournament?.matches[6]?.player1_id)
                : getPreviousMatchWinner(4)?.org_name || "TBD"}
            </div>
            <div
              className="score"
              style={{ color: getColor(tournament?.matches[6], 1) }}
            >
              {getMatchWins(
                tournament?.matches[6],
                team(tournament?.matches[6].player1_id)
              )}
            </div>
          </div>

          {/* Right Team */}
          <div className="team right">
            <div
              className="logo"
              style={{
                backgroundImage: `url(${
                  team(tournament?.matches[6]?.player2_id)
                    ? getOrgLogo(tournament?.matches[6]?.player2_id)
                    : getPreviousMatchWinner(5)?.logo
                })`,
              }}
            ></div>
            <div className="name">
              {team(tournament?.matches[6]?.player2_id)
                ? getOrgName(tournament?.matches[6]?.player2_id)
                : getPreviousMatchWinner(5)?.org_name || "TBD"}
            </div>

            <div
              className="score"
              style={{ color: getColor(tournament?.matches[6], 2) }}
            >
              {getMatchWins(
                tournament?.matches[6],
                team(tournament?.matches[6].player2_id)
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <div className={c.conference}>
        <div
          className="logo"
          style={{
            backgroundImage: `url(${conferences[tournament?.url ?? ""]})`,
          }}
        ></div>
        <div className="text">
          <div className="headline">{live_data?.split_title}</div>
          <div className="sub">
            Season {live_data?.season} - {live_data?.stage}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Bracket;
