import { makeStyles } from "@material-ui/core";
import React from "react";
import frameBG from "../../assets/imgs/frameBG.png";
import frameElements from "../../assets/imgs/frameElements.png";

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
    clipPath:
      "polygon(0% 0%, 100% 0%, 100% 80%, 88.69047619047619% 100%, 0% 100%)",

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
