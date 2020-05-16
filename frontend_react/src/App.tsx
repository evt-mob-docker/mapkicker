import React from 'react';
import { List, Header, Input, Item, Button, Rail, Segment, Grid, Container } from 'semantic-ui-react';
import './App.css';
import Mapkick from './components/MapKick';
import NamePanel from './components/NamePanel';
import Log from './components/Log';

const ButtonExampleButton = () => <Button>{'Kick'}</Button>;



const App = () => {
  const mappool = [
    { id: 0, name: "Eternal Empire LE", kicked: true },
    { id: 1, name: "Ever Dream LE" },
    { id: 2, name: "Golden Wall LE " },
    { id: 3, name: "Nightshade LE" },
    { id: 4, name: "Purity and Industry LE" },
    { id: 5, name: "Simulacrum LE", kicked: true },
    { id: 6, name: "Zen LE" },
  ];
  return (
    <div className="App container">
      <Header as="h1">Mapkicker</Header>
      <NamePanel></NamePanel>
      <Mapkick sc2maps={mappool}></Mapkick>
      <Log></Log>
    </div>
  )
}
export default App;
