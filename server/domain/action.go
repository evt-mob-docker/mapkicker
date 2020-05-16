package domain

type Message struct {
	Mode string
}

type Action struct {
	Message
	Seq        int
	ActionerID int
	Kind       string
	MapIDs     []int
	Sentence   string
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
	Seq       int
	GameState GameState
	Actions   []Action
}

func NewBroadcast(seq int, state GameState, actions []Action) Broadcast {
	return Broadcast{
		Message:   Message{"BROADCAST"},
		Seq:       seq,
		GameState: state,
		Actions:   actions,
	}
}

// func (b Broadcast) GetSeq() int {
// 	return b.Seq
// }
// b.GetSeq()

type Validation struct { // Validtionは、単一のParticipantに送信するJudgeからのメッセージ
	Message
	Valid  bool   // errorの場合false
	Error  string // errorの場合メッセージ、そうでない場合""
	YourID int    // 送り先のParticipant ID
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
	NextPlayer int
	SCMaps     []SCMap // ID昇順に格納する
}

func NewGameState() *GameState {
	return &GameState{
		SCMaps: scmaps,
	}
}

var scmaps []SCMap = []SCMap{
	SCMap{
		ID:   0,
		Name: "Map0",
	},
	SCMap{
		ID:   1,
		Name: "Map1",
	},
	SCMap{
		ID:   2,
		Name: "Map2",
	},
	SCMap{
		ID:   3,
		Name: "Map3",
	},
	SCMap{
		ID:   4,
		Name: "Map4",
	},
	SCMap{
		ID:   5,
		Name: "Map5",
	},
	SCMap{
		ID:   6,
		Name: "Map6",
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
	ID     int
	Name   string
	Kicked bool
}
