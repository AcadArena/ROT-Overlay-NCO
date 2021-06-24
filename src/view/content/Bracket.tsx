import { makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import luzon from "../../assets/imgs/luzon.png";
import vismin from "../../assets/imgs/vismin.png";
import bracket from "../../assets/imgs/bracket.png";
import metro from "../../assets/imgs/metromanila.png";
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
      margin: "0px 30px 0 20px",
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      filter: "drop-shadow(5px 8px 0px #004fff)",
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
    height: 70,
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

  match1: { top: 20.5 },
  match2: { top: 103 },
  match3: { top: 58, left: 241 },
  match4: {
    top: 213,
    left: 20,
    transformOrigin: "top left",
    transform: "scale(0.92)",
  },
  match5: {
    top: 289,
    left: 20,
    transformOrigin: "top left",
    transform: "scale(0.92)",
  },
  match6: {
    top: 204,
    left: 241,
    transformOrigin: "top left",
    transform: "scale(0.92)",
  },
  match7: {
    top: 281,
    left: 241,
    transformOrigin: "top left",
    transform: "scale(0.92)",
  },
  match8: {
    top: 258,
    left: 457,
    transformOrigin: "top left",
    transform: "scale(0.92)",
  },
  match9: {
    top: 216,
    left: 666,
    transformOrigin: "top left",
    transform: "scale(0.92)",
  },
  match10: {
    top: 69,
    left: 524,
  },
}));

const conferences: any = {
  NCOS2MLBB_Luzon: luzon,
  NCOS2MLBB_VisMin: vismin,
  NCOS2MLBB_Metro: metro,
};

const Bracket = () => {
  const c = makeComponentStyles();
  const { tournament, live_data } = useSelector(
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

  const getOrgLogo = (id: number): string => {
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

  const team = (id: number | undefined) => {
    return tournament?.participants?.find(
      (p) => p.group_player_ids.includes(id ?? 0) || p.id === id
    );
  };

  const getColor = (m: Match | undefined, player: number) => {
    if (m) {
      if (player === 1) {
        if (
          getMatchWins(m, team(m.player1_id)) >
            getMatchWins(m, team(m.player2_id)) &&
          getMatchWins(m, team(m.player1_id)) > 1
        ) {
          return "#004fff";
        } else {
          return "#02143c";
        }
      } else {
        if (
          getMatchWins(m, team(m.player1_id)) <
            getMatchWins(m, team(m.player2_id)) &&
          getMatchWins(m, team(m.player2_id)) > 1
        ) {
          return "#004fff";
        } else {
          return "#02143c";
        }
      }
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
                  tournament?.matches[0]?.player1_id ?? 0
                )})`,
              }}
            ></div>
            <div className="name">
              {getOrgName(tournament?.matches[0]?.player1_id ?? 0)}
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
                  tournament?.matches[0]?.player2_id ?? 0
                )})`,
              }}
            ></div>
            <div className="name">
              {getOrgName(tournament?.matches[0]?.player2_id ?? 0)}
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
                  tournament?.matches[1]?.player1_id ?? 0
                )})`,
              }}
            ></div>
            <div className="name">
              {getOrgName(tournament?.matches[1]?.player1_id ?? 0)}
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
                  tournament?.matches[1]?.player2_id ?? 0
                )})`,
              }}
            ></div>
            <div className="name">
              {getOrgName(tournament?.matches[1]?.player2_id ?? 0)}
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
                    tournament?.matches[2]?.player1_id ?? 0
                  )})`,
                }}
              ></div>
            ) : (
              <div style={{ margin: "0px 10px" }}></div>
            )}
            <div className="name">
              {getOrgName(tournament?.matches[2]?.player1_id ?? 0)}
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
                    tournament?.matches[2]?.player2_id ?? 0
                  )})`,
                }}
              ></div>
            ) : (
              <div style={{ margin: "0px 10px" }}></div>
            )}
            <div className="name">
              {getOrgName(tournament?.matches[2]?.player2_id ?? 0)}
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
                    tournament?.matches[3]?.player1_id ?? 0
                  )})`,
                }}
              ></div>
            ) : (
              <div style={{ margin: "0px 10px" }}></div>
            )}
            <div className="name">
              {getOrgName(tournament?.matches[3]?.player1_id ?? 0)}
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
                    tournament?.matches[3]?.player2_id ?? 0
                  )})`,
                }}
              ></div>
            ) : (
              <div style={{ margin: "0px 10px" }}></div>
            )}
            <div className="name">
              {getOrgName(tournament?.matches[3]?.player2_id ?? 0)}
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
            {tournament?.matches[4]?.player1_id ? (
              <div
                className="logo"
                style={{
                  backgroundImage: `url(${getOrgLogo(
                    tournament?.matches[4]?.player1_id ?? 0
                  )})`,
                }}
              ></div>
            ) : (
              <div style={{ margin: "0px 10px" }}></div>
            )}
            <div className="name">
              {getOrgName(tournament?.matches[4]?.player1_id ?? 0)}
            </div>
            {tournament?.matches[4]?.player1_id &&
              tournament?.matches[4]?.player2_id && (
                <div
                  className="score"
                  style={{ color: getColor(tournament?.matches[4], 1) }}
                >
                  {getMatchWins(
                    tournament?.matches[4],
                    team(tournament?.matches[4].player1_id)
                  )}
                </div>
              )}
          </div>

          {/* Right Team */}
          <div className="team right">
            {tournament?.matches[4]?.player2_id ? (
              <div
                className="logo"
                style={{
                  backgroundImage: `url(${getOrgLogo(
                    tournament?.matches[4]?.player2_id ?? 0
                  )})`,
                }}
              ></div>
            ) : (
              <div style={{ margin: "0px 10px" }}></div>
            )}
            <div className="name">
              {getOrgName(tournament?.matches[4]?.player2_id ?? 0)}
            </div>

            {tournament?.matches[4]?.player2_id &&
              tournament?.matches[4]?.player1_id && (
                <div
                  className="score"
                  style={{ color: getColor(tournament?.matches[4], 2) }}
                >
                  {getMatchWins(
                    tournament?.matches[4],
                    team(tournament?.matches[4].player2_id)
                  )}
                </div>
              )}
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
                    tournament?.matches[5]?.player1_id ?? 0
                  )})`,
                }}
              ></div>
            ) : (
              <div style={{ margin: "0px 10px" }}></div>
            )}
            <div className="name">
              {getOrgName(tournament?.matches[5]?.player1_id ?? 0)}
            </div>
            {tournament?.matches[5]?.player1_id &&
              tournament?.matches[5]?.player2_id && (
                <div
                  className="score"
                  style={{ color: getColor(tournament?.matches[5], 1) }}
                >
                  {getMatchWins(
                    tournament?.matches[5],
                    team(tournament?.matches[5].player1_id)
                  )}
                </div>
              )}
          </div>

          {/* Right Team */}
          <div className="team right">
            {tournament?.matches[5]?.player2_id ? (
              <div
                className="logo"
                style={{
                  backgroundImage: `url(${getOrgLogo(
                    tournament?.matches[5]?.player2_id ?? 0
                  )})`,
                }}
              ></div>
            ) : (
              <div style={{ margin: "0px 10px" }}></div>
            )}
            <div className="name">
              {getOrgName(tournament?.matches[5]?.player2_id ?? 0)}
            </div>

            {tournament?.matches[5]?.player2_id &&
              tournament?.matches[5]?.player1_id && (
                <div
                  className="score"
                  style={{ color: getColor(tournament?.matches[5], 2) }}
                >
                  {getMatchWins(
                    tournament?.matches[5],
                    team(tournament?.matches[5].player2_id)
                  )}
                </div>
              )}
          </div>
        </div>

        {/* Match 7 ======================================================= */}
        <div className={c.match + " " + c.match7}>
          {/* Left Team */}
          <div className="team">
            {tournament?.matches[6]?.player1_id ? (
              <div
                className="logo"
                style={{
                  backgroundImage: `url(${getOrgLogo(
                    tournament?.matches[6]?.player1_id ?? 0
                  )})`,
                }}
              ></div>
            ) : (
              <div style={{ margin: "0px 10px" }}></div>
            )}
            <div className="name">
              {getOrgName(tournament?.matches[6]?.player1_id ?? 0)}
            </div>
            {tournament?.matches[6]?.player1_id &&
              tournament?.matches[6]?.player2_id && (
                <div
                  className="score"
                  style={{ color: getColor(tournament?.matches[6], 1) }}
                >
                  {getMatchWins(
                    tournament?.matches[6],
                    team(tournament?.matches[6].player1_id)
                  )}
                </div>
              )}
          </div>

          {/* Right Team */}
          <div className="team right">
            {tournament?.matches[6]?.player2_id ? (
              <div
                className="logo"
                style={{
                  backgroundImage: `url(${getOrgLogo(
                    tournament?.matches[6]?.player2_id ?? 0
                  )})`,
                }}
              ></div>
            ) : (
              <div style={{ margin: "0px 10px" }}></div>
            )}
            <div className="name">
              {getOrgName(tournament?.matches[6]?.player2_id ?? 0)}
            </div>

            {tournament?.matches[6]?.player2_id &&
              tournament?.matches[6]?.player1_id && (
                <div
                  className="score"
                  style={{ color: getColor(tournament?.matches[6], 2) }}
                >
                  {getMatchWins(
                    tournament?.matches[6],
                    team(tournament?.matches[6].player2_id)
                  )}
                </div>
              )}
          </div>
        </div>

        {/* Match 8 ======================================================= */}
        <div className={c.match + " " + c.match8}>
          {/* Left Team */}
          <div className="team">
            {tournament?.matches[7]?.player1_id ? (
              <div
                className="logo"
                style={{
                  backgroundImage: `url(${getOrgLogo(
                    tournament?.matches[7]?.player1_id ?? 0
                  )})`,
                }}
              ></div>
            ) : (
              <div style={{ margin: "0px 10px" }}></div>
            )}
            <div className="name">
              {getOrgName(tournament?.matches[7]?.player1_id ?? 0)}
            </div>
            {tournament?.matches[7]?.player1_id &&
              tournament?.matches[7]?.player2_id && (
                <div
                  className="score"
                  style={{ color: getColor(tournament?.matches[7], 1) }}
                >
                  {getMatchWins(
                    tournament?.matches[7],
                    team(tournament?.matches[7].player1_id)
                  )}
                </div>
              )}
          </div>

          {/* Right Team */}
          <div className="team right">
            {tournament?.matches[7]?.player2_id ? (
              <div
                className="logo"
                style={{
                  backgroundImage: `url(${getOrgLogo(
                    tournament?.matches[7]?.player2_id ?? 0
                  )})`,
                }}
              ></div>
            ) : (
              <div style={{ margin: "0px 10px" }}></div>
            )}
            <div className="name">
              {getOrgName(tournament?.matches[7]?.player2_id ?? 0)}
            </div>

            {tournament?.matches[7]?.player2_id &&
              tournament?.matches[7]?.player1_id && (
                <div
                  className="score"
                  style={{ color: getColor(tournament?.matches[7], 2) }}
                >
                  {getMatchWins(
                    tournament?.matches[7],
                    team(tournament?.matches[7].player2_id)
                  )}
                </div>
              )}
          </div>
        </div>

        {/* Match 9 ======================================================= */}
        <div className={c.match + " " + c.match9}>
          {/* Left Team */}
          <div className="team">
            {tournament?.matches[8]?.player1_id ? (
              <div
                className="logo"
                style={{
                  backgroundImage: `url(${getOrgLogo(
                    tournament?.matches[8]?.player1_id ?? 0
                  )})`,
                }}
              ></div>
            ) : (
              <div style={{ margin: "0px 10px" }}></div>
            )}
            <div className="name">
              {getOrgName(tournament?.matches[8]?.player1_id ?? 0)}
            </div>
            {tournament?.matches[8]?.player1_id &&
              tournament?.matches[8]?.player2_id && (
                <div
                  className="score"
                  style={{ color: getColor(tournament?.matches[8], 1) }}
                >
                  {getMatchWins(
                    tournament?.matches[8],
                    team(tournament?.matches[8].player1_id)
                  )}
                </div>
              )}
          </div>

          {/* Right Team */}
          <div className="team right">
            {tournament?.matches[8]?.player2_id ? (
              <div
                className="logo"
                style={{
                  backgroundImage: `url(${getOrgLogo(
                    tournament?.matches[8]?.player2_id ?? 0
                  )})`,
                }}
              ></div>
            ) : (
              <div style={{ margin: "0px 10px" }}></div>
            )}
            <div className="name">
              {getOrgName(tournament?.matches[8]?.player2_id ?? 0)}
            </div>

            {tournament?.matches[8]?.player2_id &&
              tournament?.matches[8]?.player1_id && (
                <div
                  className="score"
                  style={{ color: getColor(tournament?.matches[8], 2) }}
                >
                  {getMatchWins(
                    tournament?.matches[8],
                    team(tournament?.matches[8].player2_id)
                  )}
                </div>
              )}
          </div>
        </div>

        {/* Match 10 ======================================================= */}
        <div className={c.match + " " + c.match10}>
          {/* Left Team */}
          <div className="team">
            {tournament?.matches[9]?.player1_id ? (
              <div
                className="logo"
                style={{
                  backgroundImage: `url(${getOrgLogo(
                    tournament?.matches[9]?.player1_id ?? 0
                  )})`,
                }}
              ></div>
            ) : (
              <div style={{ margin: "0px 10px" }}></div>
            )}
            <div className="name">
              {getOrgName(tournament?.matches[9]?.player1_id ?? 0)}
            </div>
            {tournament?.matches[9]?.player1_id &&
              tournament?.matches[9]?.player2_id && (
                <div
                  className="score"
                  style={{ color: getColor(tournament?.matches[9], 1) }}
                >
                  {getMatchWins(
                    tournament?.matches[9],
                    team(tournament?.matches[9].player1_id)
                  )}
                </div>
              )}
          </div>

          {/* Right Team */}
          <div className="team right">
            {tournament?.matches[9]?.player2_id ? (
              <div
                className="logo"
                style={{
                  backgroundImage: `url(${getOrgLogo(
                    tournament?.matches[9]?.player2_id ?? 0
                  )})`,
                }}
              ></div>
            ) : (
              <div style={{ margin: "0px 10px" }}></div>
            )}
            <div className="name">
              {getOrgName(tournament?.matches[9]?.player2_id ?? 0)}
            </div>

            {tournament?.matches[9]?.player2_id &&
              tournament?.matches[9]?.player1_id && (
                <div
                  className="score"
                  style={{ color: getColor(tournament?.matches[9], 2) }}
                >
                  {getMatchWins(
                    tournament?.matches[9],
                    team(tournament?.matches[9].player2_id)
                  )}
                </div>
              )}
          </div>
        </div>
      </div>

      <div className={c.conference}>
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
      </div>
    </div>
  );
};

export default Bracket;
