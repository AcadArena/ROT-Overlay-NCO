import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { Match, Participant, ReduxState } from "../../config/types/types";
import luzon from "../../assets/imgs/luzon.png";
import metro from "../../assets/imgs/metro.png";
import vismin from "../../assets/imgs/vismin.png";
import { format } from "date-fns";
import { Spring, Transition } from "react-spring/renderprops";

const ms = makeStyles((theme) => ({
  current: {
    display: "flex",
    flexDirection: "column",
    width: "50%",

    paddingTop: 62,
    paddingBottom: 30,

    "& .head": {
      display: "flex",
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
          marginRight: 0,
          transform: "skew(-10deg)",
          fontFamily: "industry",
          fontWeight: "bold",
          width: 97,
          whiteSpace: "nowrap",
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
            flex: 1,
            display: "flex",
            alignItems: "center",
          },
        },
      },
    },
  },
  wrapper: {
    height: "100%",
    width: "100%",
    position: "relative",
    display: "flex",
  },
  match: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    padding: "0px 30px 0px 30px",
    "& .team": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: 120,
      margin: 40,
      "& .team-name": {
        fontFamily: "industry",
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        color: "#f8f8f8",
        textTransform: "uppercase",
        lineHeight: 1,
        paddingTop: 10,
      },
      "& .logo": {
        height: 120,
        width: 120,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      },
    },

    "& .badge-wrap": {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      maxWidth: 52,
      position: "relative",
      "& .badge": {
        color: "#fbfbfb",
        backgroundColor: "#004fff",
        padding: "3px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginRight: 0,
        transform: "skew(-10deg)",
        fontFamily: "industry",
        fontWeight: "bold",
        fontSize: 20,
        whiteSpace: "nowrap",
        position: "absolute",
        top: -100,
        "& .item": {
          marginTop: -3,
        },
      },
      "& .vs": {
        color: "#ffd200",
        fontFamily: "Druk Wide Bold",
        fontSize: 36,
      },
    },
  },
}));

const conferences: any = {
  NCOS2LoL_Luzon: luzon,
  NCOS2LoL_VisMin: vismin,
  NCOS2LoL_Metro: metro,
};

const ScheduleAndMatch = () => {
  const c = ms();
  const {
    matches_today = [],
    tournament,
    live_data,
    match: matchWS,
  } = useSelector((state: ReduxState) => state.live);
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

  const getMatchWins = (match: Match, team?: Participant) => {
    const groupIds: number[] = team?.group_player_ids ?? [];

    let win: number = 0;
    let lost: number = 0;

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
    return win;
  };

  const team = (id: number | undefined) => {
    return tournament?.participants?.find(
      (p) => p.group_player_ids.includes(id ?? 0) || p.id === id
    );
  };

  const badger = (m: Match | undefined) => {
    let team1 = team(m?.player1_id);
    let team2 = team(m?.player2_id);

    if (m) {
      if (getMatchWins(m, team1) > 0 || getMatchWins(m, team2) > 0) {
        return `${getMatchWins(m, team1)} - ${getMatchWins(m, team2)}`;
      } else {
        return format(new Date(m.schedule ?? Date.now()), "hh:mm a") ?? "SOON";
      }
    }
  };
  return (
    <div className={c.wrapper}>
      <div className={c.current}>
        <div className="head">
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
        <Spring
          from={{ opacity: 0, transform: "translateY(-10px)" }}
          to={{ opacity: 1, transform: "translateY(0px)" }}
          delay={1500}
        >
          {(props) => (
            <div className={c.match} style={props}>
              <div className="team">
                <div
                  className="logo"
                  style={{
                    backgroundImage: `url(${getOrgLogo(
                      matchWS?.player1_id ?? 0
                    )})`,
                  }}
                ></div>
                <div className="team-name">
                  {getOrgName(matchWS?.player1_id ?? 0)}
                </div>
              </div>
              <div className="badge-wrap">
                <div className="badge">
                  <div className="item">{badger(matchWS)}</div>
                </div>
                <div className="vs">VS</div>
              </div>
              <div className="team">
                <div
                  className="logo"
                  style={{
                    backgroundImage: `url(${getOrgLogo(
                      matchWS?.player2_id ?? 0
                    )})`,
                  }}
                ></div>
                <div className="team-name">
                  {getOrgName(matchWS?.player2_id ?? 0)}
                </div>
              </div>
            </div>
          )}
        </Spring>
      </div>
      <div className={c.schedule}>
        <div className="head">SCHEDULE</div>

        <div className="matches">
          <Transition
            items={matches_today.filter((m) => m.id !== matchWS?.id)}
            keys={(m) => m.id}
            from={{
              opacity: 0,
              maxHeight: 0,
              marginBottom: 0,
            }}
            enter={[
              { opacity: 0.000001 },
              {
                maxHeight: 85.87,
                marginBottom: 20,
                opacity: 1,
                transform: "translateX(0px)",
              },
            ]}
            leave={{
              opacity: 0,
              maxHeight: 0,
              marginBottom: 0,
            }}
            trail={300}
          >
            {(match) => (props) => (
              // @ts-ignore
              <div className="match" style={props}>
                <div className="badge">
                  <div className="item">{badger(match)}</div>
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
            )}
          </Transition>
          {/* {matches_today
            .filter((m) => m.id !== matchWS?.id)
            .map((match) => (
              <div className="match">
                <div className="badge">
                  <div className="item">{badger(match)}</div>
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
            ))} */}
        </div>
      </div>
    </div>
  );
};

export default ScheduleAndMatch;
