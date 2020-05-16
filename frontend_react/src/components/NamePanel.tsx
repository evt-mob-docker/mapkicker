import React, { FC } from 'react';
import { Input, Card, Button } from 'semantic-ui-react';
import '../App.css';
import '../index.css'

interface NamePanelProps {
    name: string;
}

const NamePanel: FC = () => {
    return (
        <>
            <Card fluid>
                <Card.Description>はじめに</Card.Description>
                <Input placeholder='あなたの名前を入力してください'></Input>
                <Button color="green" fluid>
                    プレイヤーとして参加
            </Button>
            </Card>
        </>
    );
}

export default NamePanel;