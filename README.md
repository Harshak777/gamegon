# Gamegon

You can find the video demo [here](https://youtu.be/8daTnCkPKe0).

You can try it out [here](https://wonderful-spence-c3e061.netlify.app/).

## Project Description

Gamegon allows an individual to play PvP games, where they get a chance to win 2x rewards by staking their desired amount of MATIC tokens.

> To start with, the users can start playing Chess with [Gamegon]().

### Features

- Don't just play. **You play to earn.**
- Stake desired amount of tokens to win 2x rewards (only if the player wins)
- Claim rewards instantaneously after you win the game
- Zero transaction fee charged by Gamegon

## Installation

To run this application locally, clone the GitHub repo using `https://github.com/Harshak777/gamegon.git`. Then, follow the instructions as mentioned below:

### Server

- To redirect to the `/server` folder:

```bash
cd server
```

- Install the packages:

```bash
npm install
```

- To run the server:

```bash
node server.js
```

- Alternatively, you use run `npm install -g nodemon` to keep the server running continously, without having to refresh every time it stops running:

```bash
nodemon server.js
```

### Client
- To redirect to the `/client` folder:

```bash
cd client
```

- Install the packages:

```bash
npm install
```

- To run the client application:

```bash
npm run start
```

## Contract

To interact with Gamegon contracts, you can use the contract address `0x851C0f6078B81E0ec2Da4eCC9ca7F2f5F0296664`.

## Techstack
- [ReactJS](https://github.com/facebook/react)
- [NodeJS](https://github.com/nodejs)
- [Material-UI](material-ui.com)
- [Web3JS](https://www.npmjs.com/package/web3)
- [Socket.io](https://www.npmjs.com/package/socket.io)

## Way forward
- Earn a rare NFT as a badge for winning against another player
- Stake tokens and get rewarded at zero gas fees
- Enable swapping between tokens that are to be staked
- More games to be added to Gamegon. (You can find the list of games to be added [here](#games-to-be-added))
- Enhance the user-interface
- Add chat feature
- Streaming live games
- Enable staking tokens on the players playing live games
- Build a personalized dashboard to keep track of the games played
- A leaderboard displaying the game wins of players

## Games to be added
- Tic-tac-toe
- Rock-paper-scissor
- Snake and ladder

## Team
- [Harshak Krishna](https://github.com/Harshak777)
- [Bala Kumar S](https://github.com/balasbk)
- [Srishilesh P S](https://github.com/srishilesh)

## Credits
The code credits for the Chess game goes to [@Cjk01](https://github.com/Cjk01/multiplayer-chess-react).

## License
[Apache License 2.0](./LICENSE)
