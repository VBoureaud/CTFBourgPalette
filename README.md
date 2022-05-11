# CTF BourgPalette

A pokemon-like project game where you level up by hacking your neighbor. 

You play as a new hacker. You are not trying to capture all the pokemons but to capture all the flags! CTF is for Capture the Flag, a famous term in cybersecurity where you can try to figure out how to infiltrate and exploit on a simulation ecosystem. It's the same in CTFBourgPalette.

Built during the Secureworks Cybersecurity Literacy Challenge 2022.

## Table of Contents
1. [Dependencies](#dependencies)
3. [Installation and launch](#installation-and-launch)
6. [Demo](#demo)
8. [Update the maps](#update-map)
7. [In the Future](#in-the-future)
8. [Known issues](#known-issues)
8. [Credits](#credits)
9. [Contributing](#contributing)
10. [License](#license)


## Usage

#### Dependencies

Before running CTF BourgPalette the following dependencies need to be installed.

| Dependencies | Version |
| ------------ | ------- |
| npm          | 8+      |


### Installation and launch

```bash
$ git clone https://github.com/VBoureaud/CTFBourgPalette.git
$ cd CTFBourgPalette
$ npm install
$ npm start
```

### Demo

There is a live demo running on vercel.
You can find it [here](https://ctf-bourgpalette.vercel.app)

### Update the maps
To update the maps you will need a software named [Tiled](https://www.mapeditor.org).
Open a map file map.tmx, and locate your tilesets assets/tilesets.png.
Then you can edit your map but be careful, respect the layers.
When you are done save your map.tmx and export as a map.json.

### In the Future
Still a lot of ideas that I would like to implement:

| Ideas        |
|--------------|
| Quests about Phising, Sim Swap, Multi-Auth, OSINT, Rogue Access Point, Cryptographic |
| P5.js game to simulate Bruteforce Attack |
| Click on flag to auto copy |

### Known issues
To be corrected in the next version. 

| Issues       |
|--------------|
| Some events are launched asynchronously with PhaserJS and can cause a pause movement for the player who needs to reload the page.  |

Find an issue ? Contact me at valentin@boureaud.com

## Credits
Some awesome libraries/projects help power this one:

* [PhaserJS](https://github.com/phaserjs/phaser), for the game engine
* [Create-React-Phaser3-App](https://github.com/kevinshen56714/create-react-phaser3-app), for the boilerplate ReactJS + PhaserJS
* [Ariel Roffe](https://arielroffe.quest), for the structure of the phaserJS game
* [NES.css](https://nostalgic-css.github.io/NES.css) for the crazy NES design 
* [Ant Design](https://github.com/ant-design/ant-design) for the reactJs design part 
* [TypeScript](https://www.typescriptlang.org/), write JS with syntax for types
* [Reactjs](https://reactjs.org) - Library for building user interfaces

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)

##
