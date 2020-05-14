import React from 'react';
import { List, Header, Input, Item, Button, Rail, Segment, Grid, Container } from 'semantic-ui-react';
import './App.css';

const ButtonExampleButton = () => <Button>{'Kick'}</Button>;



const App = () => {
  const mappool = [
    { id: 0, name: "Eternal Empire LE" },
    { id: 1, name: "Ever Dream LE" },
    { id: 2, name: "Golden Wall LE " },
    { id: 3, name: "Nightshade LE" },
    { id: 4, name: "Purity and Industry LE" },
    { id: 5, name: "Simulacrum LE" },
    { id: 6, name: "Zen LE" },
  ];
  return (
    <div className="App">
      <Header as="h1">Mapkicker</Header>
      <Input icons='user' placeholder='あなたのIDを入力してください'></Input>
      <Grid centered columns={3}>
        <Grid.Column >
          <Header as='h2'>使い方</Header>
          <p>
            キックしたいマップにチェックを入れてKickボタンをクリックします。
              </p>
        </Grid.Column>
        <Grid.Column>
          <Header as="h2">Mappool</Header>
          <List size={'massive'}>
            {mappool.map(c => (
              <List.Item key={c.id}>
                {c.name}
              </List.Item>
            ))
            }
          </List>
          <ButtonExampleButton />
        </Grid.Column>
        <Grid.Column>
          <Header as="h2">Log</Header>
          <List>
            <List.Item>a</List.Item>
            <List.Item>a</List.Item>
            <List.Item>a</List.Item>
            <List.Item>a</List.Item>
            <List.Item>a</List.Item>
            <List.Item>a</List.Item>
            <List.Item>a</List.Item>
            <List.Item>a</List.Item>
            <List.Item>a</List.Item>
            <List.Item>a</List.Item>
          </List>
        </Grid.Column>
      </Grid>
    </div >)
};

export default App;
