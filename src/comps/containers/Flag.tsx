import { makeStyles } from "@material-ui/core";
import React from "react";
import flagPng from "../../assets/imgs/flag.png";

const mcs = makeStyles((theme) => ({
  flag: {
    height: 1024,
    width: 456,
    backgroundSize: "100% auto",
    backgroundPosition: "bottom center",
    backgroundRepeat: "no-repeat",
    backgroundImage: `url(${flagPng})`,
  },
}));

const Flag: React.FC<{ className?: string; [any: string]: any }> = ({
  className,
  children,
  ...props
}) => {
  const c = mcs();
  return (
    <div className={c.flag + " " + className} {...props}>
      {children}
    </div>
  );
};

export default Flag;
