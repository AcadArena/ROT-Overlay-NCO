import React from "react";
import ingameMlbb from "../../assets/imgs/ingameMlbb.png";
import Metro from "../../assets/imgs/Metro.png";
import { makeStyles } from "@material-ui/core";

const IngameStyle = makeStyles((theme) => ({
  screen: {
    width: 1920,
    height: 1080,

    "& .lowerthird": {
      backgroundImage: `url(${ingameMlbb})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      width: "100%",
      height: "100%",
    },

    "& .mlbbContentScore": {
      fontSize: 50,
      fontWeight: "bold",
      position: "absolute",
      top: 55,
      color: "#fff",

      "& .team1Score": {
        position: "absolute",
        left: 845,
      },

      "& .team2Score": {
        position: "absolute",
        left: 1046,
      },
    },

    "& .metroCompliance": {
      position: "absolute",
      top: 10,
      left: 360,
      width: "95px",
      height: "110px",
    },

    "& .mlbbContentName": {
      padding: 65,
      display: "flex",
      justifyContent: "center",
      color: "#fff",
      fontWeight: "bold",
      textTransform: "uppercase",
      zIndex: 50,
    },

    "& .team1": {
      fontSize: 35,
      position: "absolute",
      left: 565,
    },

    "& .team2": {
      fontSize: 35,
      position: "absolute",
      left: 1110,
    },
  },
}));

const IngameMLBB: React.FC = () => {
  const styles = IngameStyle();
  return (
    <div className={styles.screen}>
      <div className="lowerthird">
        <img className="metroCompliance" src={Metro} alt="" />
        <div className="mlbbContentName">
          <span className="team1">gearhawks</span>
          <span className="team2">gearhawks</span>
        </div>
        <div className="mlbbContentScore">
          <span className="team1Score">0</span>
          <span className="team2Score">1</span>
        </div>
      </div>
    </div>
  );
};

export default IngameMLBB;
