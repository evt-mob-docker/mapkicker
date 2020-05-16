import React, { useState, useEffect } from 'react';
import { Header } from 'semantic-ui-react';
import './App.css';
import Mapkick from './components/MapKick';
import NamePanel from './components/NamePanel';
import Log from './components/Log';
const initialMapstate = [
  { id: 0, name: "Eternal Empire LE" },
  { id: 1, name: "Ever Dream LE" },
  { id: 2, name: "Golden Wall LE " },
  { id: 3, name: "Nightshade LE" },
  { id: 4, name: "Purity and Industry LE" },
  { id: 5, name: "Simulacrum LE" },
  { id: 6, name: "Zen LE" },
];

const App = () => {
  const url = "ws://localhost:8080/join";
  const s = new WebSocket(url);
  const [mapState, setMapState] = useState(initialMapstate);
  const [seq, setSeq] = useState(0);
  const [participantID, setParticipantID] = useState(-1);
  useEffect(() => {
    // websocket connection (1 connection for 1 App instance)
    s.onclose = () => {
      console.log(`Webs connection to ${url} has been closed.`);
    };
    s.onmessage = e => {
      console.log("received broadcast");
      const message = JSON.parse(e.data);
      console.table(message);
      if (message.mode === "BROADCAST") {
        const newState = message.gameState;
        console.table(newState.sc2maps);
        setMapState(newState.sc2maps);
        setSeq(message.seq);
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
  return (
    <div className="App container">
      <Header as="h1">Mapkicker</Header>
      <NamePanel></NamePanel>
      <Mapkick sc2maps={mapState} onKick={onKick}></Mapkick>
      <Log></Log>
    </div>
  )
}

interface Message {
  mode: string;
}

interface Broadcast extends Message {
  mode: string;
  seq: number;
  gameState: any;
  actions: Action[];
}

// const isBroadcast = (msg: Message is Broadcast): boolean => {

// }

interface Action extends Message {
  mode: string;
  seq: number;
  actionerID: number;
  kind: string;
  mapIDs?: number[];
  sentence?: string;
}

interface Validation extends Message {
  mode: string;
  valid: boolean;
  error: string;
  yourID: number;
}

const kickAction = (seq: number, actioner: number, mapIDs: number[]): Action => ({
  mode: "ACTION",
  seq: seq,
  actionerID: actioner,
  kind: "kick", // TOOD: delete
  mapIDs: mapIDs,
});
export default App;

