export type User = {
    name: string;
    level: number;
    newLevel: boolean;
    loadingLevel: boolean;
    wifiKnow: string[];
    imsiHandler: number;
}

export type Quests = {
    [index: string]: Quest;
}

export type Quest = {
  level: number;
  title: string;
  desc: string;
  map: string;
  wifiKnow: string[];
  goalOrder: GoalObj;
  imsiHandler: boolean;
  success?: string;
  orderFix: boolean;
}

export type GoalObj = {
    [index: string]: {
      break?: boolean;
      method?: string;
      name?: string;
      optional?: boolean;
      computerScreen?: boolean;
      computerMode?: string;
      dialog?: string[];
    };
}

export type Objects = {
    [index: string]: {
      name: string;
      default: string;
    };
}

export type WifiType = {
    actif: boolean;
    name: string;
    pwd: string;
    coord: number[];
    devices?: Device[];
};

export type Device = {
    name: string;
    proba: number;
    ip: string;
    type: string;
    actif?: boolean;
    credentials?: string | string[];
    probaCredential?: number;
};