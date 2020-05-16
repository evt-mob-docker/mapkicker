import React, { FC } from 'react';
import { List, Header, Input, Item, Button, Rail, Segment, Grid, Container, Form, Checkbox } from 'semantic-ui-react';
import '../index.css'

interface SC2Map {
    id: number;
    name: string;
    kicked?: boolean;
}

const MapPanel: FC<SC2Map> = props => {
    const { id, name, kicked } = props;
    return (
        <Form.Field
            control={Checkbox}
            label={name}
            disabled={kicked}
        >
            ></Form.Field>
    )
}

export default MapPanel;