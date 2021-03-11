import { Divider, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import LowerThirds, {
  getLTWidth,
  LowerThirdsSize,
} from "../comps/lowerthirds/LowerThirds";
import {
  ReduxState,
  LowerThirdsMode,
  Participant,
} from "../config/types/types";
import Marquee from "react-fast-marquee";
import theme from "../Theme";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { wsContext } from "../config/WebsocketProvider";
import { Transition } from "react-spring/renderprops";
import { RouteComponentProps, withRouter } from "react-router-dom";
import LeftFrame from "../assets/imgs/casterframeleft.png";
import RightFrame from "../assets/imgs/casterframeright.png";

const ms = makeStyles({
  screen: {
    position: "relative",
    height: 1080,
    width: 1920,
    overflow: "hidden",
    backgroundColor: "transparent",
  },

  LowerThirds: {
    position: "absolute",
    bottom: 99,
    left: 108,

    "& .fade-enter": {
      opacity: 0,
      transform: "translateX(-15px)",
    },
    "& .fade-enter-active": {
      opacity: 1,
      transform: "translateX(0px)",
    },
    "& .fade-exit": {
      opacity: 1,
      transform: "translateX(0px)",
    },
    "& .fade-exit-active": {
      transform: "translateX(-15px)",
      opacity: 0,
    },

    "& .fade-enter-active, .fade-exit-active": {
      transition: "0.6s cubic-bezier(0.25, 1, 0.5, 1)",
    },
  },

  // ticker
  tickerWrapper: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },

  headline: {
    color: "#ffd200",
    fontFamily: "'industry', sans-serif",
    fontSize: 34,
    fontWeight: "bold",
    flex: 1,
    padding: "0px 39px 0px 67px",
    display: "flex",
    alignItems: "center",
    textTransform: "uppercase",
    overflow: "hidden",
  },
  ticker: {
    backgroundColor: "#fff",
    color: "#02143c",
    fontFamily: "'industry'",
    height: 37,
    display: "flex",
    alignItems: "center",
    padding: "0px 39px 0px 0px",
    fontSize: "13.5pt",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    position: "relative",
    width: "100%",
  },
  tickerInner: {
    alignItems: "center",
  },
  tickerItem: {
    display: "flex",
  },

  // Casters
  castersWrapper: {
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "center",
    // justifyContent: "center",
    marginLeft: theme.spacing(2),

    "& .caster": {
      display: "flex",
      padding: theme.spacing(0, 6),
      flexDirection: "column",
      borderRight: "3px solid rgba(255,255,255,.7)",

      "&:last-child": {
        borderRight: "none",
      },

      "& .name": {
        color: "#fff",
        fontFamily: "industry",
        fontSize: 38,
        textTransform: "uppercase",
        fontWeight: "bold",
        whiteSpace: "pre",
      },
      "& .ign": {
        fontWeight: "bold",
        color: "#ffd200",
        fontFamily: "industry",
        fontSize: 20,
        textTransform: "uppercase",
      },
    },
  },
  ltContent: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  announcements: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "0px 39px 0px 67px",

    "& .headline": {
      color: "#ffd200",
      fontFamily: "'industry', sans-serif",
      fontSize: 28,
      fontWeight: "bold",
      textTransform: "uppercase",
    },

    "& .content": {
      textTransform: "uppercase",
      fontFamily: "industry",
      color: "#f9f9f9",
      fontSize: 54,
      fontWeight: "bold",
      marginTop: -15,
      whiteSpace: "nowrap",
    },
  },
  playerStats: {
    display: "flex",
    height: "100%",
    width: "100%",
    paddingLeft: theme.spacing(7),
    alignItems: "center",

    "& .teamLogo": {
      width: 100,
      height: "90% ",
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    },

    "& .playerPhoto": {
      backgroundSize: "contain",
      backgroundPosition: "bottom center",
      backgroundRepeat: "no-repeat",
      transformOrigin: "bottom center",
      height: "100%",
      width: 120,
      transform: "scale(1.3)",
    },

    "& .content": {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(0, 7, 0, 3),

      "& .playerName": {
        fontFamily: "industry",
        fontWeight: "bold",
        fontSize: 24,
        textTransform: "uppercase",
        color: "#ffd200",
      },
      "& .quote": {
        fontFamily: "industry",
        alignSelf: "flex-start",
        fontWeight: 600,
        fontSize: 26,
        textTransform: "uppercase",
        color: "#f9f9f9",
        lineHeight: 1,
        // textAlign: "center",
        // padding: theme.spacing(0, 3),
        // position: "relative",

        // "&::before": {
        //   content: "'\"'",

        //   opacity: 0.5,
        //   position: "absolute",
        //   top: -5,
        //   right: "95%",
        //   fontFamily: "industry",
        //   fontWeight: "bold",
        //   fontSize: 40,
        //   color: "#f9f9f9",
        // },
        // "&::after": {
        //   content: "'\"'",
        //   opacity: 0.5,
        //   position: "absolute",
        //   top: -5,
        //   left: "95%",
        //   fontFamily: "industry",
        //   fontWeight: "bold",
        //   fontSize: 40,
        //   color: "#f9f9f9",
        // },
      },

      "& .stats": {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        "& .divider": {
          width: 2,
          height: 48,
          backgroundColor: "#f9f9f9",
        },

        "& .statItem": {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",

          "&:first-child": {
            paddingLeft: 0,
          },
          "&:last-child": {
            borderRight: "none",
          },

          "& .property": {
            color: "#ffd200",
            fontSize: 16,
            fontFamily: "industry",
            fontWeight: "bold",
            fontStyle: "italic",
            textTransform: "uppercase",
          },

          "& .value": {
            marginTop: -5,
            color: "#fff",
            fontSize: 28,
            fontFamily: "industry",
            fontWeight: "bold",
            textTransform: "uppercase",
          },
        },
      },
    },
  },
  hidden: {
    height: 0,
    width: 0,
    opacity: 0,
    display: "none",
  },
  match: {
    display: "flex",
    position: "absolute",
    bottom: 99,
    left: 108,
    zIndex: 999,
    justifyContent: "space-between",
    width: 1700,
    alignItems: "center",

    "& .vs": {
      fontFamily: "Druk Wide Bold, sans-serif",
      fontSize: 34,
      color: "#004fff",
    },

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

  casters: {
    display: "flex",
    width: 1700,
    height: 542,
    position: "absolute",
    top: 252,
    left: 108,
    justifyContent: "space-between",

    "& .caster": {
      height: 542,
      width: 787,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      position: "relative",
      "& .ign": {
        position: "absolute",
        bottom: 23,
        color: "#fff",
        fontSize: 30,
        letterSpacing: 2,
        textTransform: "uppercase",
        fontFamily: "Druk Wide Bold",
      },
    },

    "& .left": {
      backgroundImage: `url(${LeftFrame})`,
      "& .ign": {
        left: 25,
      },
    },
    "& .right": {
      backgroundImage: `url(${RightFrame})`,
      "& .ign": {
        textAlign: "right",
        right: 25,
      },
    },
  },
});

// const isNumber = (n: any): boolean => {
//   return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
// };

const getSize = (string: LowerThirdsMode): LowerThirdsSize => {
  switch (string) {
    case "ticker":
      return "medium";
    case "casters":
      return "medium";
    case "long":
      return "large";
    case "playerStats":
      return "medium";
    case "playerQuote":
      return "medium";
    default:
      return "medium";
  }
};

const CasterCam: React.FC<RouteComponentProps> = ({ location: { search } }) => {
  const c = ms();
  const {
    lowerThirds,
    casters = [],
    casters_alt,
    match,
    match_live,
    tournament,
  } = useSelector((state: ReduxState) => state.live);

  let params = new URLSearchParams(search);

  const ws = React.useContext(wsContext);
  React.useEffect(() => {
    ws.updateSocketUsername("Caster Cam Module");
  }, []);

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
      <img src={lowerThirds?.player?.photo_main} className={c.hidden} />
      <img src={lowerThirds?.player?.team?.logo} className={c.hidden} />
      <img src={getTeamLogo(match?.player1_id)} className={c.hidden} />
      <img src={getTeamLogo(match?.player2_id)} className={c.hidden} />

      <Transition
        items={match_live}
        from={{ opacity: 0, transform: "translateY(10px)" }}
        enter={{ opacity: 1, transform: "translateY(0px)" }}
        leave={{ opacity: 0, transform: "translateY(10px)" }}
      >
        {(toggle) =>
          toggle
            ? (props) => (
                <div className={c.match} style={props}>
                  <LowerThirds size={783} disablelogo shadow>
                    <div className="team">
                      <div
                        className="logo"
                        style={{
                          backgroundImage: `url(${getTeamLogo(
                            match?.player1_id
                          )}})`,
                        }}
                      ></div>
                      <div className="details">
                        <div className="school">
                          {
                            getParticipant(match?.player1_id ?? 0)
                              ?.university_name
                          }
                        </div>
                        <div className="name">
                          {getParticipant(match?.player1_id ?? 0)?.org_name}
                        </div>
                      </div>
                      <div className="score">
                        {getFinalScore(match?.scores_csv ?? "", 1)}
                      </div>
                    </div>
                  </LowerThirds>
                  <div className="vs">VS</div>
                  <LowerThirds size={783} reversecut shadow disablelogo>
                    <div className="team">
                      <div className="score">
                        {getFinalScore(match?.scores_csv ?? "", 2)}
                      </div>
                      <div className="details right">
                        <div className="school">
                          {
                            getParticipant(match?.player2_id ?? 0)
                              ?.university_name
                          }
                        </div>
                        <div className="name">
                          {getParticipant(match?.player2_id ?? 0)?.org_name}
                        </div>
                      </div>
                      <div
                        className="logo"
                        style={{
                          backgroundImage: `url(${getTeamLogo(
                            match?.player2_id
                          )}})`,
                        }}
                      ></div>
                    </div>
                  </LowerThirds>
                </div>
              )
            : (props) => (
                <LowerThirds
                  size={getSize(lowerThirds?.mode ?? "ticker")}
                  shadow
                  className={c.LowerThirds}
                  style={{ ...props }}
                >
                  <SwitchTransition mode="out-in">
                    <CSSTransition
                      key={lowerThirds?.mode}
                      addEndListener={(node, done) => {
                        node.addEventListener("transitionend", done, false);
                      }}
                      classNames="fade"
                    >
                      <div style={{ color: "#fff" }} className={c.ltContent}>
                        {/* TICKER */}
                        {lowerThirds?.mode === "ticker" && (
                          <div className={c.tickerWrapper}>
                            <div className={c.headline}>
                              {lowerThirds?.headline}
                            </div>
                            <div className={c.ticker}>
                              <Marquee
                                gradientWidth={100}
                                className={c.tickerInner}
                                style={{
                                  width:
                                    getLTWidth(
                                      getSize(lowerThirds?.mode ?? "ticker")
                                    ) - 126,
                                }}
                              >
                                {lowerThirds?.ticker
                                  .split("\n")
                                  .map((item, i) => (
                                    <div
                                      key={i}
                                      className={c.tickerItem}
                                      style={{ whiteSpace: "pre" }}
                                    >
                                      {item}
                                      {lowerThirds?.ticker.split("\n").length -
                                        1 ===
                                      i ? (
                                        <span
                                          style={{ margin: "0px 20px" }}
                                        ></span>
                                      ) : (
                                        <span style={{ margin: "0px 20px" }}>
                                          |
                                        </span>
                                      )}
                                    </div>
                                  ))}
                              </Marquee>
                            </div>
                          </div>
                        )}

                        {/* CASTER */}
                        {lowerThirds?.mode === "casters" && (
                          <div className={c.castersWrapper}>
                            {!Boolean(params.get("alt"))
                              ? casters?.map((caster) => (
                                  <div className="caster" key={caster.ign}>
                                    <Typography variant="h4" className="name">
                                      {caster.name}
                                    </Typography>
                                    <Typography variant="h5" className="ign">
                                      {caster.ign}
                                    </Typography>
                                  </div>
                                ))
                              : casters_alt?.map((caster) => (
                                  <div className="caster" key={caster.ign}>
                                    <Typography variant="h4" className="name">
                                      {caster.name}
                                    </Typography>
                                    <Typography variant="h5" className="ign">
                                      {caster.ign}
                                    </Typography>
                                  </div>
                                ))}
                          </div>
                        )}

                        {/* Announcements */}
                        {lowerThirds?.mode === "long" && (
                          <div className={c.announcements}>
                            <Typography variant="h6" className="headline">
                              {lowerThirds.announcement_headline}
                            </Typography>

                            <Typography variant="h4" className="content">
                              {lowerThirds.announcement_content}
                            </Typography>
                          </div>
                        )}

                        {lowerThirds?.mode === "playerStats" && (
                          <div className={c.playerStats}>
                            <div
                              className="teamLogo"
                              style={{
                                backgroundImage: `url(${lowerThirds?.player?.team?.logo})`,
                              }}
                            ></div>
                            <div className="content">
                              <div className="playerName">
                                {lowerThirds?.player?.ign}
                              </div>
                              <div className="stats">
                                <div className="statItem">
                                  <div className="property">
                                    {lowerThirds?.player_stats?.left?.property}
                                  </div>
                                  <div className="value">
                                    {lowerThirds?.player_stats?.left?.value}
                                  </div>
                                </div>
                                <Divider
                                  component="div"
                                  className="divider"
                                  orientation="vertical"
                                />
                                <div className="statItem">
                                  <div className="property">
                                    {
                                      lowerThirds?.player_stats?.middle
                                        ?.property
                                    }
                                  </div>
                                  <div className="value">
                                    {lowerThirds?.player_stats?.middle?.value}
                                  </div>
                                </div>

                                <Divider
                                  component="div"
                                  variant="fullWidth"
                                  className="divider"
                                  orientation="vertical"
                                />
                                <div className="statItem">
                                  <div className="property">
                                    {lowerThirds?.player_stats?.right?.property}
                                  </div>
                                  <div className="value">
                                    {lowerThirds?.player_stats?.right?.value}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div
                              className="playerPhoto"
                              style={{
                                backgroundImage: `url(${lowerThirds?.player?.photo_main})`,
                              }}
                            ></div>
                          </div>
                        )}

                        {lowerThirds?.mode === "playerQuote" && (
                          <div className={c.playerStats}>
                            <div
                              className="teamLogo"
                              style={{
                                backgroundImage: `url(${lowerThirds?.player?.team?.logo})`,
                              }}
                            ></div>
                            <div className="content">
                              <div className="playerName">
                                {lowerThirds?.player?.ign}
                              </div>
                              <div className="quote">
                                "{lowerThirds?.player_quote}"
                              </div>
                            </div>
                            <div
                              className="playerPhoto"
                              style={{
                                backgroundImage: `url(${lowerThirds?.player?.photo_main})`,
                              }}
                            ></div>
                          </div>
                        )}
                      </div>
                    </CSSTransition>
                  </SwitchTransition>
                </LowerThirds>
              )
        }
      </Transition>

      <div className={c.casters}>
        <div className="caster left">
          <div className="ign">{casters && casters[0]?.name}</div>
        </div>
        <div className="caster right">
          <div className="ign">{casters && casters[1]?.name}</div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CasterCam);
