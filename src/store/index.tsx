import React, {useEffect, createContext, useState} from "react";

import config from '../config';
import { storageData, getStorage, rmStorage } from './localStorage';
import { User, Quests, Quest, WifiType } from './types';

const defaultUser: User = {
    name: 'User 1',
    level: 1,
    newLevel: false,
    loadingLevel: false,
    wifiKnow: [],
    imsiHandler: 0,
};

interface IContextStore {
    quests: Quests;
    quest: Quest | null;
    currentQ: string;
    wifi: WifiType[],
    user: User | null;
    getNextQuest: Function;
    getPrevQuest: Function;
    setNewQuestViewed: Function;
    setNewLevelViewed: Function;
    addWifiKnow: Function;
    resetGame: Function;
    getDevicesFromWifi: Function;
    loadAFlag: Function;
    ddosWifi: Function;
};

const GameContext = createContext({
    quests: config.game.quests,
    quest: null,
    currentQ: '',
    wifi: [],
    user: null,
    getNextQuest: () => {},
    getPrevQuest: () => {},
    setNewQuestViewed: () => {},
    setNewLevelViewed: () => {},
    addWifiKnow: () => {},
    resetGame: () => {},
    getDevicesFromWifi: () => {},
    loadAFlag: () => {},
    ddosWifi: () => {},
} as IContextStore);

export const GameContextProvider = (props: any) => {
    const [user, setUser] = useState<User | null>(null);
    const [wifi, setWifi] = useState<WifiType[]>([]);
    const [quest, setQuest] = useState<Quest | null>(null);
    const [currentQ, setCurrentQ] = useState<string>('');

    useEffect(() => {
        const initGame = async () => {
            const u = await getStorage('user');
            await setUser(u ? u : defaultUser);
            await storageData('user', u ? u : defaultUser);
            await setWifi(config.game.wifi)
            await initQuest(u ? (u.level - 1) : 0, u ? u : defaultUser);
            console.log(config.game.name + ' ready to play!');
        }

        initGame();
    }, []);

    // get flag for current quest
    const initQuest = (index: number, pUser?: User) => {
        const quests: Quests = config.game.quests;
        const keys = Object.keys(quests);
        if (index < keys.length) {
            setCurrentQ(keys[index]);
            setQuest(quests[keys[index]]);
            const checkUser = pUser ? pUser : user;
            if (quests[keys[index]].imsiHandler && checkUser && checkUser.imsiHandler === 0) {
                setImsiCatcherStart();
            }
        }
    }

    // change level user + save in localstorage
    const increaseUser = (newLevel: boolean) => {
        const newU = user;
        if (newU) {
            newU.level = newU.level + 1;
            newU.newLevel = newLevel;
            setUser(newU);
            storageData('user', newU);
        }
    }

    const getPrevQuest = () => {
        const quests: Quests = config.game.quests;
        const keys = Object.keys(quests);
        const index = keys.indexOf(currentQ);
        if (index - 1 >= 0)
            return keys[index - 1];
        return '';
    }

    // if return '' => no more quest
    const getNextQuest = () => {
        const quests: Quests = config.game.quests;
        const keys = Object.keys(quests);
        const index = keys.indexOf(currentQ);
        if (index + 1 < keys.length) {
            increaseUser(true);
            initQuest(index + 1);
            return keys[index + 1];
        } else {
            // end of the game
            increaseUser(false);
        }
        return '';
    }

    const setNewQuestViewed = () => {
        const newU = user;
        if (newU) {
            newU.newLevel = false;
            setUser(newU);
            storageData('user', newU);
        }
    }

    const setNewLevelViewed = () => {
        const newU = user;
        if (newU) {
            newU.loadingLevel = false;
            setUser(newU);
            storageData('user', newU);
        }
    }

    const setImsiCatcherStart = async () => {
        const newU = await getStorage('user');
        if (newU) {
            const d = new Date();
            newU.imsiHandler = d.getTime();
            setUser(newU);
            storageData('user', newU);
        }   
    }

    const addWifiKnow = (name: string) => {
        const newU = user;
        if (newU && newU.wifiKnow.indexOf(name) === -1) {
            newU.wifiKnow.push(name);
            setUser(newU);
            storageData('user', newU);
        }
    }

    const resetGame = () => {
        rmStorage('user');
        window.location.href = window.location.href;
    }

    const getDevicesFromWifi = (wifiName: string) => {
        const wifiList = wifi.filter(elt => elt.name === wifiName);
        if (!wifiList) return [];
        return wifiList[0] ? wifiList[0].devices : [];
    }

    const loadAFlag = (flag: string) => {
        const quests: Quests = config.game.quests;
        const flagList = Object.keys(quests);
        const questIndex = flagList.indexOf(flag);
        if (questIndex === -1 || !user) {
            return false;
        }
        const newU = user;
        const quest = quests[flagList[questIndex]];
        newU.level = questIndex + 1;
        newU.newLevel = true;
        newU.loadingLevel = true;
        for (let i = 0; i < quest.wifiKnow.length; i++) {
            if (newU.wifiKnow.indexOf(quest.wifiKnow[i]) === -1)
                newU.wifiKnow.push(quest.wifiKnow[i]);
        }
        storageData('user', newU);

        //relaunch
        window.location.href = window.location.href;
    }

    const ddosWifi = (name: string) => {
        const cWifi = wifi;
        for (let i = 0; i < cWifi.length; i++)
            if (cWifi[i].name === name)
                cWifi[i].actif = !cWifi[i].actif;
        setWifi(cWifi);
    }

    return (
        <GameContext.Provider
            value={{
                quests: config.game.quests,
                quest,
                currentQ,
                wifi,
                user,
                getNextQuest,
                getPrevQuest,
                setNewQuestViewed,
                setNewLevelViewed,
                addWifiKnow,
                resetGame,
                getDevicesFromWifi,
                loadAFlag,
                ddosWifi,
            }}>
            {props.children}
        </GameContext.Provider>
    )
}

export default GameContext;