package domain

import "log"

// Participant は、Mapkickへの参加者を表す。
type Participant struct {
	msgChan MessageChannel
	judge   *Judge
	id      int
}

// NewParticipant は、新しいParticipantを生成し、judgeに紐付けて起動する。
func NewParticipant(msgChan MessageChannel, j *Judge) *Participant {
	p := &Participant{
		msgChan: msgChan,
		judge:   j,
	}
	go p.run()
	return p
}

func (p *Participant) run() {
	for {
		select {
		case action := <-p.msgChan.Action():
			p.judge.action <- action
		case <-p.msgChan.Closed():
			p.leave()
		}
	}
}

// Broadcast take broadcast
func (p *Participant) Broadcast(b Broadcast) {
	log.Printf("Participant.Broadcast: %v\n", b)
	p.msgChan.Broadcast(b)
}

// Validation takes validation message
func (p *Participant) Validation(e Validation) {
	p.msgChan.Validation(e)
}

// Leave は、JudgeをLeaveする
func (p *Participant) leave() {
	p.judge.leave <- p
}
