import React, { FC, useState, ChangeEvent } from 'react';
import { Input, Card, Button } from 'semantic-ui-react';
import '../App.css';
import '../index.css'

interface NamePanelProps {
    id: number;
    onClick: (name: string) => void;
}

const NamePanel: FC<NamePanelProps> = (props: NamePanelProps) => {
    const { onClick } = props;
    const [name, setName] = useState("");
    return (
        <>
            <Card fluid>
                <Card.Description>はじめに</Card.Description>
                <Input placeholder='あなたの名前を入力してください' onChange={(e: ChangeEvent, data) => {
                    setName(data.value);
                }}></Input>
                <Button color="green" fluid onClick={() => onClick(name)}>
                    プレイヤーとして参加
            </Button>
            </Card>
        </>
    );
}

export default NamePanel;