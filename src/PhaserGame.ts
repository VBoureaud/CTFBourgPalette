import Phaser from 'phaser'

import configGlobal from './config';
import OverWorldScene from './scenes/OverWorldScene'
import SoftwareScene from './scenes/SoftwareScene'

declare global {
    interface Window {
        mouseOverMenu:any;
    }
}

const config: Phaser.Types.Core.GameConfig = {
  title: configGlobal.game.name,
  version: configGlobal.version,
  type: Phaser.AUTO,
  parent: 'phaser-container',
  //backgroundColor: '#282c34',
  pixelArt: true,
  autoFocus: true,
  scale: {
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.NO_CENTER,
    width: getWidth(),
    height: getHeight(),
    zoom: (resizeDPR() ? Math.floor(window.devicePixelRatio) / window.devicePixelRatio : 1),
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: configGlobal.debug,
      gravity: { y: 0 },
    },
  },
  scene: [OverWorldScene, SoftwareScene],
}

const game = new Phaser.Game(config);

// ------------------------------------------------------------------------------------
// DevicePixelRatio handling

function mobileOrTablet() {
  if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i) 
      || navigator.userAgent.match(/iPad/i) 
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i))
    return true;
  return false;
}
function resizeDPR() {
  // Integer DPR return false
  if (Number.isInteger(window.devicePixelRatio)) {
    return false
  // Non-mobile, non-integer DPR between 1 and 2 (e.g. my laptop screen on Win has 1.25), return true
  } else if (!mobileOrTablet() && 1 < window.devicePixelRatio && window.devicePixelRatio < 2) {
    return true
  // Everything else return false (see if this works)
  } else {
    return false
  }
}

// ------------------------------------------------------------------------------------
// RESIZE BEHAVIOR
function getWidth() {
  return (resizeDPR() ? window.innerWidth * window.devicePixelRatio : window.innerWidth)
}
function getHeight() {
  return (resizeDPR() ? window.innerHeight * window.devicePixelRatio : window.innerHeight)
}
window.addEventListener('resize', function (event) {
    // Has to be done here instead of in the scene's resize event handler
  // bc otherwise we get infinite recursion (game.scale.resize emits 'resize')
  game.scale.resize(getWidth(), getHeight());
}, false);


export default game;
