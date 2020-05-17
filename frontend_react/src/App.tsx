import React, { useState, useEffect } from 'react';
import { Header } from 'semantic-ui-react';
import './App.css';
import Mapkick from './components/MapKick';
import NamePanel from './components/NamePanel';
import Log from './components/Log';
import { SC2Map, InitialGameState, Action, Validation, Broadcast, isBroadcast, isValidation, kickAction, Participant, registerNameAction } from './domain/models';
const emptyActions: Action[] = [];
let emptySocket: WebSocket;

const App = () => {
  const url = "ws://localhost:8080/join";
  // TODO: あとでcustom hookにする
  const [gameState, setGameState] = useState(InitialGameState());
  const [seq, setSeq] = useState(0);
  const [s, setSocket] = useState(emptySocket);

  const [participantID, setParticipantID] = useState(-1);
  const [actions, setActions] = useState(emptyActions);
  useEffect(() => {
    const s = new WebSocket(url);
    setSocket(s);
    // websocket connection (1 connection for 1 App instance)
    s.onclose = () => {
      console.log(`Webs connection to ${url} has been closed.`);
    };
    s.onmessage = e => {
      console.log("received broadcast");
      const message = JSON.parse(e.data);
      console.table(message);
      if (isBroadcast(message)) {
        const newState = message.gameState;
        setGameState(newState);
        setSeq(message.seq);
        setActions(message.actions);
      }
      if (message.mode === "VALIDATION") {
        setParticipantID(message.yourID);
      }

    };
    s.onopen = () => {
      console.log(`Webs connection to ${url} has opened.`);
    };
    s.onerror = () => {
      console.error(`Webs connection to ${url} has an error.`);
    };
    return () => {
      console.log("unmount.");
    }
  }, []);
  const onKick = (mapIDs: number[]) => {
    console.log(`SUBMIT an Action from ${participantID}`);
    const action = kickAction(seq, participantID, mapIDs);
    console.table(action);
    s.send(JSON.stringify(action));
  }
  const onRegisterName = (name: string) => {
    console.log(`id: ${participantID}, name = ${name}`);
    const action = registerNameAction(seq, participantID, name);
    s.send(JSON.stringify(action));
  }
  return (
    <div className="App container">
      <Header as="h1">Mapkicker</Header>
      <NamePanel id={participantID} onClick={onRegisterName}></NamePanel>
      <Mapkick sc2maps={gameState.sc2maps} onKick={onKick}></Mapkick>
      <Log
        actions={actions}
        state={gameState}
      ></Log>
    </div>
  )
}
export default App;

