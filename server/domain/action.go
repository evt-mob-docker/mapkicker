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
type SCMap struct {
	ID     int
	Name   string
	Kicked bool
}
