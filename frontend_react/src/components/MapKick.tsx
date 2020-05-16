import React, { FC } from 'react';
import { List, Header, Input, Item, Button, Card, Segment, Grid, Container } from 'semantic-ui-react';
// import './App.css';
import '../index.css'
import MapPanel from './MapPanel';

export interface SC2Map {
    id: number;
    name: string;
    kicked?: boolean;
}

export interface MapKickProps {
    sc2maps: SC2Map[];
}

const MapKick: FC<MapKickProps> = props => {
    const { sc2maps } = props;
    return (
        <Card fluid>
            {sc2maps.map(sc2map => {
                return <MapPanel key={sc2map.id} {...sc2map}></MapPanel>;
            })}
        </Card>
    );
}

export default MapKick;