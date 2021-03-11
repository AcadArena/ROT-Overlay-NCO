import { makeStyles } from "@material-ui/core";
import React from "react";
import frameBG from "../../assets/imgs/frameBG.png";
import frameElements from "../../assets/imgs/frameElements.png";
import laurel from "../../assets/imgs/laurel.svg";

const ms = makeStyles((theme) => ({
  box: {
    display: "flex",
    height: 540,
    width: 1008,
    // backgroundColor: "#02143c",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundImage: `url(${frameBG})`,
    overflow: "visible",
    clipPath:
      "polygon(0% 0%, 100% 0%, 100% 80%, 88.69047619047619% 100%, 50% 100%, 50% 200%, -100% 200%, -100% 50%)",

    //88.69047619047619
    "&::after": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url(${frameElements})`,
      zIndex: 999,
    },

    "&::before": {
      content: "''",
      position: "absolute",
      top: "calc(100% - 80px)",
      left: -32,
      height: 114,
      width: 103,
      backgroundSize: "100% 100%",
      backgroundRepeat: "no-repeat",
      backgroundImage: `url(${laurel})`,
      zIndex: 1000,
      animation: "$floating 1.5s ease-in-out infinite alternate",
    },
  },

  "@keyframes floating": {
    "0%": {
      transform: "translate3d(0,-4px,0)",
    },
    "100%": {
      transform: "translate3d(0,4px,0)",
    },
  },
}));

const Frame: React.FC<{ className?: string }> = ({
  className,
  children,
  ...props
}) => {
  const c = ms();
  return (
    <div className={c.box + " " + className} {...props}>
      {children}
    </div>
  );
};

export default Frame;
