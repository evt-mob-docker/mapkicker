export interface Message {
    mode: string;
}

export interface Broadcast extends Message {
    mode: string;
    seq: number;
    gameState: any;
    actions: Action[];
}

export const isBroadcast = (msg: Message): msg is Broadcast => msg.mode === "BROADCAST";
export const isValidation = (msg: Message): msg is Broadcast => msg.mode === "VALIDATION";

export interface Action extends Message {
    mode: string;
    seq: number;
    actionerID: number;
    kind: string;
    mapIDs?: number[];
    sentence?: string;
}

export interface Validation extends Message {
    mode: string;
    valid: boolean;
    error: string;
    yourID: number;
}

export const kickAction = (seq: number, actioner: number, mapIDs: number[]): Action => ({
    mode: "ACTION",
    seq: seq,
    actionerID: actioner,
    kind: "kick",
    mapIDs: mapIDs,
});

export interface GameState {
    readonly nextPlayer: number;
    readonly sc2maps: SC2Map[];
    readonly participants: Participant[];
}

const initialMapstate: SC2Map[] = [
    { id: 0, name: "Eternal Empire LE", kicked: false, },
    { id: 1, name: "Ever Dream LE", kicked: false, },
    { id: 2, name: "Golden Wall LE ", kicked: false, },
    { id: 3, name: "Nightshade LE", kicked: false, },
    { id: 4, name: "Purity and Industry LE", kicked: false, },
    { id: 5, name: "Simulacrum LE", kicked: false, },
    { id: 6, name: "Zen LE", kicked: false, },
];

const emptyParticipants: Participant[] = [];

export const InitialGameState = () => {
    return {
        nextPlayer: -1,
        sc2maps: initialMapstate,
        participants: emptyParticipants,
    };
};

export const registerNameAction = (seq: number, id: number, name: string): Action => {
    return {
        mode: "ACTION",
        seq: seq,
        actionerID: id,
        kind: "register",
        sentence: name,
    }
}

export interface Participant {
    readonly id: number;
    readonly name: string;
}

export interface SC2Map {
    id: number;
    name: string;
    kicked: boolean;
}

