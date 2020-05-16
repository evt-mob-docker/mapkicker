import React, { useState, useEffect } from 'react';
import { Header } from 'semantic-ui-react';
import './App.css';
import Mapkick from './components/MapKick';
import NamePanel from './components/NamePanel';
import Log from './components/Log';

const App = () => {
  const url = "ws://localhost:8080/join";
  const s = new WebSocket(url);
  useEffect(() => {
    // websocket connection (1 connection for 1 App instance)
    s.onclose = () => {
      console.log(`Webs connection to ${url} has been closed.`);
    };
    s.onmessage = e => {
      console.log("received broadcast");
      console.table(e.data);
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
  const mappool = [
    { id: 0, name: "Eternal Empire LE", kicked: true },
    { id: 1, name: "Ever Dream LE" },
    { id: 2, name: "Golden Wall LE " },
    { id: 3, name: "Nightshade LE" },
    { id: 4, name: "Purity and Industry LE" },
    { id: 5, name: "Simulacrum LE", kicked: true },
    { id: 6, name: "Zen LE" },
  ];
  const onKick = (mapIDs: number[]) => {
    console.log(`submit ${mapIDs} to the judge`);
    s.send(JSON.stringify(kickAction(0, 0, mapIDs)));
  }
  return (
    <div className="App container">
      <Header as="h1">Mapkicker</Header>
      <NamePanel></NamePanel>
      <Mapkick sc2maps={mappool} onKick={onKick}></Mapkick>
      <Log></Log>
    </div>
  )
}

interface Action {
  mode: string;
  seq: number;
  actionerID: number;
  kind: string;
  mapIDs?: number[];
  sentence?: string;
}

interface Validation {
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