package domain

type Action struct {
	Seq           int
	ParticipantID int
	Kind          string
	MapIDs        []int
	Msg           string
}

type Broadcast struct {
	Seq     int
	Actions []Action
}

type ValidationError struct {
}

func NewChat(seq, participantID int, msg string) Action {
	return Action{
		Seq:           seq,
		ParticipantID: participantID,
		Msg:           msg,
	}
}
