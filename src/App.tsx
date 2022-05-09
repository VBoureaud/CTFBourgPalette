import React, { useState, useEffect, useContext } from 'react';

import config from './config';
import GameContext from "./store";
import { getHour, calculateDistance } from "./store/utils";

import {
  Objects,
} from "./store/types";

import './App.css';
import "antd/dist/antd.css";
import "nes.css/css/nes.min.css";

import phaserGame from './PhaserGame';

import NavBar from './components/NavBar';
import PixelPhone from './components/PixelPhone';
import PhoneWifi, { PhoneWifiTiled } from './components/PhoneWifi';
import PhoneAim, { PhoneAimTiled } from './components/PhoneAim';
import { PhoneContactTiled } from './components/PhoneContact';
import { PhoneCallTiled } from './components/PhoneCall';
import { PhoneMailTiled } from './components/PhoneMail';
import { PhoneMessageTiled } from './components/PhoneMessage';
import ComputerScreen from './components/ComputerScreen';

import { WifiOutlined, ThunderboltOutlined, LoadingOutlined } from '@ant-design/icons';
import { Modal, Input } from "antd";
const { Search } = Input;

type Player = {
  x: number;
  y: number;
};

function App() {
  const store = useContext(GameContext);
  const objects: Objects = config.game.objects;
  const [progressionQuest, setProgressionQuest] = useState<string[]>([]);
  ///////////////

  const [countLoader, setCountLoader] = useState(1);
  const [dialogSign, setDialogSign] = useState('');
  
  // screen display
  const [screenVisible, setScreenVisible] = useState(false);
  const [stepScreenComputer, setStepScreenComputer] = useState<string | undefined>('');

  // phone display
  const [stepPhone, setStepPhone] = useState('');
  const [phoneConnected, setPhoneConnected] = useState<string[]>([]);
  const [phoneVisible, setPhoneVisible] = useState(false);
  const [player, setPlayer] = useState<Player | null>(null);
  
  // menu display
  const [stepMenu, setStepMenu] = useState(0);
  const [questMenu, setQuestMenu] = useState('');
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  
  // during quest
  const [signText, setSignText] = useState('');
  const [stepDialogQuest, setStepDialogQuest] = useState(0);
  const [dialogQuest, setDialogQuest] = useState('');
  const [successText, setSuccessText] = useState('');
  const [breakGame, setBreakGame] = useState(false);

  // Loader (for debug)
  useEffect(() => {
    if (phaserGame.scene.keys.OverWorldScene) {
      setCountLoader(0);
    }
  }, []);


  // when sign change
  useEffect(() => {
    //console.log('signText', signText);
    if (store.user && !stepDialogQuest && !stepScreenComputer) {
      if (store.quest) {
        const questGoal = Object.keys(store.quest.goalOrder).filter(elt => store.quest && !store.quest.goalOrder[elt].optional);
        const order = questGoal.indexOf(signText) === -1 ? 0 : questGoal.indexOf(signText);
        const orderRespected = store.quest.orderFix ? order === progressionQuest.length : true;
        if (store.quest.goalOrder[signText] && orderRespected && progressionQuest.indexOf(signText) === -1) {
          if (store.quest.goalOrder[signText].computerScreen) {
            setStepScreenComputer(store.quest.goalOrder[signText].computerMode);
            handleScreen(true);
          }
          else handleDialogQuest(signText);
        } else setDialogSign(signText);
      }
      else setDialogSign(signText);
    }
  }, [signText]);

  // Loader & events
  useEffect(() => {
    if (countLoader > 0) {
      setTimeout(async () => {
        if (countLoader > 0 && store && store.user && phaserGame.scene.keys.OverWorldScene) {
          setCountLoader(0);

          // ADD HANDLER FOR SIGN EVENT 
          phaserGame.scene.keys.OverWorldScene.events.on('sign', (text: string) => setSignText(text));
          phaserGame.scene.keys.SoftwareScene.events.on('sign', (text: string) => setSignText(text));
          phaserGame.scene.keys.OverWorldScene.events.on('player', (player: any) => setPlayer(player));
          
          // check loading quest
          if (store.user.loadingLevel) {
            const prevQuestFinished = store.getPrevQuest();
            if (prevQuestFinished) setSuccessText(store.quests[prevQuestFinished].success + '\n\nFlag is: ' + store.currentQ);
            setIsMenuVisible(true);
            handleBreak();
            store.setNewLevelViewed();
          }

          // init player position
          getUserPosition();
        }
        else if (countLoader > 0) setCountLoader(countLoader + 1);
      }, 1000);
    }
  }, [countLoader]);

  const handlePhoneSuccess = async (method: string, text: string) => {
    if (!store.quest) return false;
    if (method === 'wifi') {
      store.addWifiKnow(text);
      
      // close phone
      handlePhone();

      const cQ = progressionQuest;
      cQ.push('phone');
      await setProgressionQuest(cQ)
    }
    await checkQuest();
  }

  const checkQuest = () => {
    if (!store.quest) return false;

    // remove optionnal
    const progression = progressionQuest.filter(elt => store.quest && store.quest.goalOrder[elt].optional ? false : true)
    const goal = Object.keys(store.quest.goalOrder).filter(elt => store.quest && store.quest.goalOrder[elt].optional ? false : true);
    
    // todo, if press enter to pass dialog = check menu not open
    if (progression.join(',') === goal.join(',')) {
      const flag = store.getNextQuest();
      if (flag) setSuccessText(store.quest.success + '\n\nFlag is: ' + flag);
      else setSuccessText(store.quest.success + '\n\nYou have completed the game.');
      setIsMenuVisible(true);
      setProgressionQuest([]);
      handleBreak();
    }
  }

  const handleDialogQuest = (text: string) => {
    if (!store.quest) return false;

    const cQ = progressionQuest;
    const goal = store.quest.goalOrder[text];
    
    // dialog start = break movement
    if (stepDialogQuest === 0 && goal.break)
      handleBreak();
    // dialog continue
    if (goal.dialog && goal.dialog.length > stepDialogQuest) {
      setDialogSign(text);
      setDialogQuest(goal.dialog[stepDialogQuest]);
      setStepDialogQuest(stepDialogQuest + 1);
    }
    // dialog done
    else if (goal.dialog && stepDialogQuest === goal.dialog.length) {
      setDialogSign('');
      setStepDialogQuest(0);
      setDialogQuest('');
      cQ.push(text);
      setProgressionQuest(cQ);
      handleBreak();
      checkQuest();
    }
  }

  const handleBreak = () => {
    setBreakGame(!breakGame);
    const OverWorldScene = phaserGame.scene.keys.OverWorldScene;
    const SoftwareScene = phaserGame.scene.keys.SoftwareScene;
    OverWorldScene.events.emit('break');
    SoftwareScene.events.emit('break');
  }

  const getUserPosition = () => {
    const OverWorldScene = phaserGame.scene.keys.OverWorldScene;
    OverWorldScene.events.emit('position');
  }

  const handlePhone = () => {
    if (!store.user || countLoader) return false;
    checkConnected();
    setPhoneVisible(!phoneVisible);
    handleBreak();
  }

  const checkConnected = async () => {
    await getUserPosition();
    if (player) {
      const connected = store.wifi
        .filter(elt => elt.actif)
        .filter(elt => store.user && store.user.wifiKnow.indexOf(elt.name) !== -1)
        .filter(elt => calculateDistance([player.x, player.y], elt.coord) >= 0)
        .sort((a, b) => calculateDistance([player.x, player.y], a.coord) - calculateDistance([player.x, player.y], b.coord))
        .map(elt => elt.name);
      setPhoneConnected(connected);
    }
  }

  const handleMenu = () => {
    if (!store.user || countLoader) return false;
    setIsMenuVisible(!isMenuVisible);
    setStepMenu(0);
    handleBreak();
    if (successText)
      setSuccessText('');
  }

  const handleScreen = (open: boolean) => {
    handleBreak();
    setScreenVisible(open);
    if (!open) setStepScreenComputer('');
  }

  // Gestion Menu
  const menuDisplay = () => {
    const currentLevel = store.user ? store.user.level : 1;
    const newLevel = store.user ? store.user.newLevel : false;
    const enumMenu = {
      init: 0,
      enterCode: 1,
      saveCode: 2,
      option: 3,
      quests: 4,
      descQuest: 5,
      credit: 6,
    };

    const initMenu = (
      <>
        <p style={{ fontSize: '12px' }}>V {config.version} - level {currentLevel}</p>
        <p onClick={() => setStepMenu(enumMenu.enterCode)}>ENTER A FLAG</p>
        <p onClick={() => setStepMenu(enumMenu.saveCode)}>SAVE</p>
        <p onClick={() => setStepMenu(enumMenu.quests)}>
          QUESTS
          {newLevel && <span style={{ color: 'tomato', fontSize: '10px', fontWeight: 'bold', position: 'relative', bottom: '6px' }}>NEW</span>}
        </p>
        <p onClick={() => setStepMenu(enumMenu.option)}>OPTION</p>
        <p onClick={() => setStepMenu(enumMenu.credit)}>CREDIT</p>
        <p onClick={handleMenu}>EXIT</p>
      </>
    );

    const enterCodeMenu = (
      <div className="nes-field">
        <label>Enter a flag</label>
        <Search
          placeholder="Flag"
          enterButton="ENTER"
          prefix={<ThunderboltOutlined />}
          onSearch={(value) => store.loadAFlag(value)}
        />
        <p style={{ marginTop: '5px' }}>If nothing happens: your flag is false.</p>
        <p style={{ marginTop: '15px' }} onClick={() => setStepMenu(enumMenu.init)}>BACK</p>
      </div>
    );

    const saveCodeMenu = (
      <>
        <p>Your current Flag is:</p>
        <p style={{ background: '#333', color: 'white', padding: '3px' }}>{store.currentQ}</p>
        <p style={{ marginTop: '15px' }} onClick={() => setStepMenu(enumMenu.init)}>BACK</p>
      </>
    );

    const optionMenu = (
      <>
        <p onClick={() => store.resetGame()} style={{ background: 'tomato', color: 'white', padding: '5px', }}>Reset your game</p>
        <p style={{ marginTop: '15px' }} onClick={() => setStepMenu(enumMenu.init)}>BACK</p>
      </>
    )

    const creditMenu = (
      <>
        <a href="https://github.com/VBoureaud/CTFBourgPalette">README</a>
        <p style={{ marginTop: '15px' }} onClick={() => setStepMenu(enumMenu.init)}>BACK</p>
      </>
    )

    const availableQuests: string[] = Object.keys(store.quests).filter(e => store.quests[e].level <= currentLevel);
    const questsMenu = (
      <>
        {availableQuests.map((e: string, index: number) => 
            <p key={index} onClick={() => {
                setQuestMenu(e);
                setStepMenu(enumMenu.descQuest);
                if (index === availableQuests.length - 1 && newLevel)
                  store.setNewQuestViewed();
              }
            }>
              {store.quests && store.quests[e] && store.quests[e].title}
              {(index < availableQuests.length - 1) && <span className="questDoneIcon"></span>}
              {(index === availableQuests.length - 1 && currentLevel > availableQuests.length) && <span className="questDoneIcon"></span>}
              {(index === availableQuests.length - 1) && newLevel && <span style={{ color: 'tomato', fontSize: '10px', fontWeight: 'bold', position: 'relative', bottom: '6px' }}>NEW</span>}
            </p>
          )}
        <p style={{ marginTop: '15px' }} onClick={() => setStepMenu(enumMenu.init)}>BACK</p>
      </>
    );
    const descQuestMenu = (
      <>
        <p>{store.quests[questMenu] && store.quests[questMenu].level <= currentLevel && store.quests[questMenu].title}</p>
        <p>{store.quests[questMenu] && store.quests[questMenu].level <= currentLevel && store.quests[questMenu].desc}</p>
        <p style={{ marginTop: '15px' }} onClick={() => setStepMenu(enumMenu.quests)}>BACK</p>
      </>
    )

    const stepArr = [initMenu, enterCodeMenu, saveCodeMenu, optionMenu, questsMenu, descQuestMenu, creditMenu]
    return (<div>
      {stepArr[stepMenu]}
    </div>);
  }

  return (
    <div className="App">
      {/* Title & Menu Btn*/}
      <NavBar
        onClick={handleMenu}
      />

      {/* Loader Screen */}
      {countLoader > 0 && <div style={{ background: 'black', display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center' }}>
        <LoadingOutlined style={{ fontSize: '50px', color: 'white', marginBottom: '20px' }} />
        <p style={{ color: 'white' }}>Loading...</p>
      </div>}
      
      {/* Phone Btn */}
      {store.user && store.user.level > 1 && <div onClick={handlePhone} className="phoneBtn">
        <p className="nes-btn is-primary" style={{ padding: '0 10px' }}>
          <span style={{ color: 'white' }}>Phone</span>
        </p>
      </div>}

      {/* Dialog modal */}
      {dialogSign && (objects[dialogSign].default || dialogQuest) && <div onClick={dialogQuest ? () => handleDialogQuest(dialogSign) : () => {}} className="dialogSign nes-container is-rounded with-title">
        {objects[dialogSign].name && <p className="title">{objects[dialogSign].name}</p>}
        <p>{dialogQuest ? dialogQuest : objects[dialogSign].default}</p>
        {dialogQuest && <span className="dialogCursor"></span>}
      </div>}

      {/* Modal for Menu & Success Quest */}
      <Modal
        title=""
        footer={[]}
        closable={false}
        wrapClassName="menuGame"
        visible={isMenuVisible}
        onCancel={handleMenu}>
          {!successText ? menuDisplay() : successText.split("\n").map((item, idx) => (
              <span key={idx}>
                  {item}
                  <br/>
              </span>
            )
          )}
      </Modal>

      {/* Modal for Computer Screen */}
      <Modal
        title=""
        footer={[<p key={0} onClick={() => handleScreen(false)}>close</p>]}
        closable={false}
        wrapClassName="computerScreen"
        visible={screenVisible}
        onCancel={() => handleScreen(false)}>
          <ComputerScreen
            mode={stepScreenComputer}
            started={store.user ? store.user.imsiHandler : 0}
          />
      </Modal>

      {/* Modal for Phone content */}
      <Modal
        title=""
        footer={[]}
        closable={false}
        wrapClassName="phoneGame"
        visible={phoneVisible}
        onCancel={handlePhone}>
          <PixelPhone>
            <div className="barPhone">
              {player
                && phoneConnected.length > 0
                && <span><WifiOutlined style={{ fontSize: '12px' }} /> {phoneConnected[0]}</span>}
              {!phoneConnected.length && <span>No network</span>}
              <p>{getHour()}</p>
            </div>
            {player && stepPhone === 'wifi' 
              && <PhoneWifi
                position={[player.x, player.y]}
                onCancel={() => setStepPhone('')}
                onConfirm={(name: string) => { handlePhoneSuccess('wifi', name) }}
                wifiKnow={store.user ? store.user.wifiKnow : []}
                data={store.wifi ? store.wifi : []}
              />}
            {stepPhone === 'aim' 
              && <PhoneAim
                wifiName={phoneConnected[0]}
                devices={store.getDevicesFromWifi(phoneConnected[0])}
                onCancel={() => setStepPhone('')}
                onConfirm={(name: string) => { handlePhoneSuccess('aim', name) }}
                onDdos={(name: string) => { store.ddosWifi(name); checkConnected(); }}
              />}
            {!stepPhone && <div className="phoneContainer">
              <PhoneWifiTiled onClick={() => setStepPhone('wifi')}/>
              <PhoneAimTiled actif={phoneConnected.length > 0} onClick={() => setStepPhone('aim')} />
              <PhoneContactTiled />
              <PhoneMailTiled />
              <PhoneCallTiled />
              <PhoneMessageTiled />
            </div>}
          </PixelPhone>
      </Modal>
    </div>
  )
}

export default App
