import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { ReChat } from '@rechat/component';
import { TwitchRenderer } from '@rechat/twitch-render';
import { ReplayServerSource } from '@rechat/replay-server-source';
import { ReactPlayerBridge } from '@rechat/react-player-bridge';
import { BetterTTV } from '@rechat/betterttv';
import { FrankerFacez } from '@rechat/frankerfacez';

import './App.css';
/*


*/

function App() {
  const CLIENTID = 'n0dkyk9hwq7lzc7knflzssp6v9fsbv';
  const source = new ReplayServerSource({
    baseUrl: 'http://88.198.134.191',
    vodid: '793678447',
  });
  const bridge = new ReactPlayerBridge(source);

  const chatNode = React.useRef();
  useEffect(() => {
    TwitchRenderer.create(
      'jinnytty',
      CLIENTID,
      BetterTTV.create,
      FrankerFacez.create
    ).then((r) => {
      new ReChat(chatNode.current, source, r);
    });
    bridge.setPlayer(playerRef.current);
  });

  const playerRef = React.useRef();

  return (
    <React.Fragment>
      <div id="player">
        <ReactPlayer
          ref={playerRef}
          url="https://www.youtube.com/watch?v=EikBRnA9h2c"
          controls="true"
          width="100%"
          height="100%"
          onPlay={bridge.onPlay.bind(bridge)}
          onPause={bridge.onPause.bind(bridge)}
        />
      </div>
      <div id="chat" ref={chatNode}></div>
    </React.Fragment>
  );
}

export default App;
