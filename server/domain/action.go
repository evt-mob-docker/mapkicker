package domain

type Action struct {
	Seq        int
	ActionerID int
	Kind       string
	MapIDs     []int
	Msg        string
}

type Broadcast struct {
	Seq       int
	GameState GameState
	Actions   []Action
}

type Validation struct {
	Valid  bool
	Error  string
	YourID int
}

// func NewChat(seq, participantID int, msg string) Action {
// 	return Action{
// 		Seq:           seq,
// 		ParticipantID: participantID,
// 		Msg:           msg,
// 	}
// }

type GameState struct {
	NextPlayer int
	SCMaps     []SCMap // ID昇順に格納する
}
type SCMap struct {
	ID     int
	Name   string
	Kicked bool
}
