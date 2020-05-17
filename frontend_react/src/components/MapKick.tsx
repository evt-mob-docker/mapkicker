import React, { useState, FC } from 'react';
import { Button, Card, Form } from 'semantic-ui-react';
import '../index.css'
import MapPanel from './MapPanel';
import { SC2Map } from '../domain/models';
export interface MapKickProps {
    sc2maps: SC2Map[];
    onKick: (mapIDs: number[]) => void;
}

const MapKick: FC<MapKickProps> = props => {
    const { sc2maps, onKick } = props;
    const [checked, setChecked] = useState(Array(sc2maps.length).fill(false));
    const checkedMapNames = () => sc2maps.filter(m => checked[m.id]).map(m => m.name);
    const checkedMapIDs = () => sc2maps
        .filter(m => checked[m.id])
        .filter(m => !m.kicked)
        .map(m => m.id);
    // TODO: K個以上チェックできないようにする
    const onCheck = (id: number, b: boolean) => {
        console.log(`${id}: ${sc2maps[id].name} is currently ${b ? '' : 'not '}checked.`);
        setChecked(c => { c[id] = b; return c; });
    };
    const onKickButtonPressed = () => {
        console.log(`KICK! currently ${checkedMapNames()} are checked.`);
        // console.log(checkedMapIDs());
        onKick(checkedMapIDs());
    }
    return (
        <Card fluid>
            <Form>
                {sc2maps.map(sc2map => {
                    return <MapPanel key={sc2map.id} {...{ ...sc2map, onCheck: onCheck }}></MapPanel>;
                })}
                <Button onClick={onKickButtonPressed} color="red" fluid>Kick</Button>
            </Form>
        </Card >
    );
}

export default MapKick;