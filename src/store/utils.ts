
export const calculateDistance = (player: number[], coord: number[]) => {
  const playerX = player[0];
  const playerY = player[1];
  const wifiX = coord[0];
  const wifiY = coord[1];
  const distance = Math.sqrt((Math.pow(wifiX-playerX,2))+(Math.pow(wifiY-playerY,2)));
  return 5 - parseInt('' + distance / 100);
}

export const getHour = () => {
  const d = new Date();
  const hour = ('0' + d.getHours()).slice(-2) 
    + ':' + ('0' + d.getMinutes()).slice(-2);
  return hour;
}

export const displayDate = (dayToRm: number) => {
  const myDate = new Date();
  if (dayToRm)
    myDate.setDate(myDate.getDate() - dayToRm);
  const fullDate = ('0' + (myDate.getMonth() + 1)).slice(-2) + '/'
    + ('0' + myDate.getDate()).slice(-2) + '/' + 
    + myDate.getFullYear();
  return fullDate;
}

export const shuffle = (array: any) => {
  let currentIndex = array.length, temporaryValue, randomIndex, arrayCopy;

  arrayCopy = array.slice();
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = arrayCopy[currentIndex];
    arrayCopy[currentIndex] = arrayCopy[randomIndex];
    arrayCopy[randomIndex] = temporaryValue;
  }

  return arrayCopy;
}

export const levelDisplay = (xp: number, coef: number, max?: number) => {
  if (xp === 0) return 0;
  const res = parseInt((coef * Math.log(xp)) + '');
  return max && res > max ? max : res;
};