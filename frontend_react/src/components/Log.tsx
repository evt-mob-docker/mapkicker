import React from 'react';
import { List, Card, Input, Item, Button, Rail, Segment, Grid, Container } from 'semantic-ui-react';

interface LogProps {
    actions: string[];
}

const Log = () => {
    return (
        <Card fluid={true}>
            <List>
                <List.Item>log</List.Item>
                <List.Item>log</List.Item>
                <List.Item>log</List.Item>
                <List.Item>log</List.Item>
                <List.Item>log</List.Item>
                <List.Item>log</List.Item>
            </List>
        </Card>
    )
}

export default Log;