import React from 'react';
import { Header, Icon, Item, Button, Rail, Segment, Grid } from 'semantic-ui-react';
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
      <Grid centered columns={3}>
        <Grid.Column>
          <Header as="h2">使い方</Header>
          <p>マップにチェックを入れてKickボタンを押します</p>
        </Grid.Column>
        <Grid.Column>
          <Header as="h2">Mappool</Header>
          <Item.Group as="ul">
            {mappool.map(c => (
              <Item key={c.id}>
                {/* <Icon name="user circle" size="huge" /> */}
                <Item.Content>
                  <Item.Meta>{c.name}</Item.Meta>
                </Item.Content>
              </Item>
            )
            )} </Item.Group>
          <ButtonExampleButton />
        </Grid.Column>
        <Grid.Column>
          <Segment>Right Rail Content</Segment>
        </Grid.Column>
      </Grid>
    </div >)
};

export default App;
