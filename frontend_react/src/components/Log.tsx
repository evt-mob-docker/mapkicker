import React from 'react';
import { List, Card } from 'semantic-ui-react';
import { Action, GameState, isBroadcast } from '../domain/models';
import { SC2Map } from '../domain/models';

interface LogProps {
    actions: Action[];
    state: GameState;
}

const Log = (props: LogProps) => {
    const { actions, state } = props;
    console.log(state);
    const { participants, sc2maps } = state;
    return (
        <Card fluid={true}>
            <List>
                {actions.map(action => {
                    if (action.kind === "kick") {
                        const id = action.actionerID;
                        const maps = action.mapIDs!
                        const mapnames = state.sc2maps.filter(m => maps.includes(m.id)).map(m => m.name);
                        const seq = action.seq;
                        const participant = participants.find(p => p.id === id);
                        const name = participant ? participant.name : "anonymous";
                        const str = `${name}(id: ${id}) kicked map # ${mapnames}`;
                        return <List.Item key={seq}>{str}</List.Item>
                    }
                })
                }
            </List>
        </Card>
    );
}

export default Log;