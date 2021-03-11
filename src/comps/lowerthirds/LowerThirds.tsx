import { Container, makeStyles } from "@material-ui/core";
import React from "react";
import ltlogo from "../../assets/imgs/ltlogo.svg";

export type LowerThirdsSize = "small" | "medium" | "large" | number;

interface LowerThirdsProp {
  size?: LowerThirdsSize;
  shadow?: boolean;
  disablelogo?: boolean;
  className?: string;
  [key: string]: any;
  reversecut?: boolean;
  nocut?: boolean;
  innerProps?: any;
}

const getPercentage = (base: number, n: number) => {
  return (n / base) * 100;
};

export const getLTWidth = (size?: string | number): number => {
  if (!isNumber(size)) {
    switch (size) {
      case "small":
        return 490;
      case "medium":
        return 863;
      case "large":
        return 1614;
      default:
        return 863;
    }
  } else {
    var x: number = +(size ?? 863);
    return x;
  }
};

const isNumber = (n: any): boolean => {
  return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
};

const ms = makeStyles({
  lowerThirds: {
    // margin: 50,
    height: 126,
    backgroundColor: "#02143c",
    transition: "0.6s cubic-bezier(0.25, 1, 0.5, 1)",
    width: ({ size }: LowerThirdsProp): number => getLTWidth(size),
    clipPath: ({ size, reversecut, nocut }: LowerThirdsProp) =>
      reversecut
        ? `polygon(0% -100%, 100% -100%, 100% 100%,${getPercentage(
            getLTWidth(size),
            39
          )}% 100%, 0% ${getPercentage(126, 90)}%)`
        : `polygon(0% -100%, 100% -100%, 100% ${getPercentage(126, 90)}%, ${
            100 - getPercentage(getLTWidth(size), 39)
          }% 100%, 0% 100%)`,

    display: "flex",
  },
  shadowWrapper: {
    filter: (props): string =>
      props.shadow
        ? props.reversecut
          ? "drop-shadow(-12px 9px 0 #004fff)"
          : "drop-shadow(12px 9px 0 #004fff)"
        : "none",
  },
  logo: {
    position: "relative",
    height: 126,
    width: 128,
    backgroundColor: "#004fff",

    "& .logo": {
      position: "relative",
      height: 126,
      width: 128,
      backgroundColor: "#004fff",
      zIndex: 100,
      backgroundSize: "auto 75%",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundImage: `url(${ltlogo})`,
    },

    "&::before": {
      content: "''",
      width: 160,
      height: 126,
      position: "absolute",
      top: 0,
      left: 0,
      backgroundColor: "#004fff",
      clipPath: `polygon(0% 0%, 100% 0%, ${getPercentage(
        160,
        128
      )}% 100%, 0% 100%)`,
      zIndex: 90,
    },
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
});

const LowerThirds: React.FC<LowerThirdsProp> = ({
  className,
  children,
  disablelogo,
  nocut,
  reversecut,
  shadow,
  size,
  innerProps,
  ...props
}) => {
  const c = ms({ disablelogo, nocut, reversecut, shadow, size });
  return (
    <div className={c.shadowWrapper + " " + className} {...props}>
      <div className={c.lowerThirds} {...innerProps}>
        {!disablelogo && (
          <div className={c.logo}>
            <div className="logo"></div>
          </div>
        )}
        <div className={c.content}>{children}</div>
      </div>
    </div>
  );
};

export default LowerThirds;
