import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { ReChat } from '@rechat/component';
import { TwitchRenderer } from '@rechat/twitch-render';
import { TwitchVod } from '@rechat/twitch-vod';
import { ReactPlayerBridge } from '@rechat/react-player-bridge';
import { BetterTTV } from '@rechat/betterttv';
import { FrankerFacez } from '@rechat/frankerfacez';

import './App.css';
/*


*/

function App() {
  const CLIENTID = 'n0dkyk9hwq7lzc7knflzssp6v9fsbv';
  const source = new TwitchVod({
    clientId: CLIENTID,
    vodid: '1155849029',
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
          url="https://api.pogu.live/https://d2nvs31859zcd8.cloudfront.net/4475570031b5be958ef9_jinnytty_39998838683_1632302793/chunked/index-dvr.m3u8"
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
