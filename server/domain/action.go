package domain

type Message struct {
	Mode string `json:"mode"`
}

type Action struct {
	Message
	Seq        int    `json:"seq"`
	ActionerID int    `json:"actionerID"`
	Kind       string `json:"kind"`
	MapIDs     []int  `json:"mapIDs"`
	Sentence   string `json"sentence"`
}

func NewAction(seq, actioner int, kind string, mapIDs []int, sentence string) Action {
	return Action{
		Message:    Message{"ACTION"},
		Seq:        seq,
		ActionerID: actioner,
		Kind:       kind,
		MapIDs:     mapIDs,
		Sentence:   sentence,
	}
}

type Broadcast struct {
	Message
	Seq       int       `json:"seq"`
	GameState GameState `json:"gameState"`
	Actions   []Action  `json:"actions"`
}

func NewBroadcast(seq int, state GameState, actions []Action) Broadcast {
	return Broadcast{
		Message:   Message{"BROADCAST"},
		Seq:       seq,
		GameState: state,
		Actions:   actions,
	}
}

type Validation struct { // Validtionは、単一のParticipantに送信するJudgeからのメッセージ
	Message
	Valid  bool   `json:"valid"`  // errorの場合false
	Error  string `json:"error"`  // errorの場合メッセージ、そうでない場合""
	YourID int    `json:"yourID"` // 送り先のParticipant ID
}

func NewValidation(valid bool, err string, id int) Validation {
	return Validation{
		Message: Message{"VALIDATION"},
		Valid:   valid,
		Error:   err,
		YourID:  id,
	}
}

type GameState struct {
	NextPlayer int     `json:"nextPlayer"`
	SCMaps     []SCMap `json:"sc2maps"` // ID昇順に格納する
}

func NewGameState() *GameState {
	return &GameState{
		SCMaps: scmaps,
	}
}

var scmaps []SCMap = []SCMap{
	SCMap{
		ID:   0,
		Name: "Eternal Empire LE",
	},
	SCMap{
		ID:   1,
		Name: "Ever Dream LE",
	},
	SCMap{
		ID:   2,
		Name: "Golden Wall LE",
	},
	SCMap{
		ID:   3,
		Name: "Nightshade LE",
	},
	SCMap{
		ID:   4,
		Name: "Purity and Industry LE",
	},
	SCMap{
		ID:   5,
		Name: "Simulacrum LE",
	},
	SCMap{
		ID:   6,
		Name: "Zen LE",
	},
}

func (gs *GameState) Kick(ids ...int) {
	for _, id := range ids {
		if id >= len(gs.SCMaps) {
			continue
		}
		gs.SCMaps[id].Kicked = true
	}
}

type SCMap struct {
	ID     int    `json:"id"`
	Name   string `json:"name"`
	Kicked bool   `json:"kicked"`
}
