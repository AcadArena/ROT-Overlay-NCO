import crash from "../../assets/imgs/codm_maps/crash.jpg";
import crossfire from "../../assets/imgs/codm_maps/crossfire.jpg";
import firingRange from "../../assets/imgs/codm_maps/firing-range.jpg";
import hijacked from "../../assets/imgs/codm_maps/hijacked.jpg";
import killhouse from "../../assets/imgs/codm_maps/killhouse.jpg";
import meltdown from "../../assets/imgs/codm_maps/meltdown.jpg";
import nuketown from "../../assets/imgs/codm_maps/nuketown.jpg";
import standoff from "../../assets/imgs/codm_maps/standoff.jpg";
import takeoff from "../../assets/imgs/codm_maps/takeoff.jpg";
import summit from "../../assets/imgs/codm_maps/summit.jpg";

export interface VetoCodm {
  map1?: {
    mode?: CodmMode;
    pick?: CodmMap;
    ban1?: CodmMap;
    ban2?: CodmMap;
    ban_mode?: CodmMode;
  };
  map2?: {
    mode?: CodmMode;
    pick?: CodmMap;
    ban1?: CodmMap;
    ban2?: CodmMap;
    ban_mode?: CodmMode;
  };
  map3?: {
    mode?: CodmMode;
    pick?: CodmMap;
    ban1?: CodmMap;
    ban2?: CodmMap;
    ban_mode?: CodmMode;
  };
  map4?: {
    mode?: CodmMode;
    pick?: CodmMap;
    ban1?: CodmMap;
    ban2?: CodmMap;
    ban_mode?: CodmMode;
  };
  map5?: {
    mode?: CodmMode;
    pick?: CodmMap;
    ban1?: CodmMap;
    ban2?: CodmMap;
    ban_mode?: CodmMode;
  };
}

export enum CodmMap {
  CRASH = "Crash",
  CROSSFIRE = "Crossfire",
  FIRING_RANGE = "Firing Range",
  HIJACKED = "Hijacked",
  KILLHOUSE = "Killhouse",
  NUKETOWN = "Nuketown",
  STANDOFF = "Standoff",
  TAKEOFF = "Takeoff",
  MELTDOWN = "Meltdown",
  SUMMIT = "Summit",
}

export const maps = {
  [CodmMap.CRASH]: crash,
  [CodmMap.CROSSFIRE]: crossfire,
  [CodmMap.FIRING_RANGE]: firingRange,
  [CodmMap.HIJACKED]: hijacked,
  [CodmMap.KILLHOUSE]: killhouse,
  [CodmMap.MELTDOWN]: meltdown,
  [CodmMap.NUKETOWN]: nuketown,
  [CodmMap.STANDOFF]: standoff,
  [CodmMap.TAKEOFF]: takeoff,
  [CodmMap.SUMMIT]: summit,
};

export enum CodmMode {
  HARDPOINT = "Hardpoint",
  SEARCH_AND_DESTROY = "Search & Destroy",
  DOMINATION = "Domination",
  TEAM_DEATHMATCH = "Team Deathmatch",
  SNIPER_ONLY = "Sniper Only",
  FRONTLINE = "Frontline",
}
