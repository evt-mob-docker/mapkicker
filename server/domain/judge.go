package domain

import (
	"log"
)

// Judge は、1つのマップキックセッションの進行役を表す。
type Judge struct {
	id     int
	cnt    int // これまでに登録したparticipantの総数(すでにleaveしたものも含む)
	join   chan *Participant
	leave  chan *Participant
	action chan Action
	// participants map[*Participant]bool
	participants map[int]*Participant
	history      []Action
	seq          int // Actionの整合性を確保するための、受理ずみActionの最後のsequence番号
}

// NewJudge は、指定したidを持つJudgeインスタンスを生成する。
// このidはchallongeトーナメントの試合IDを用いるので、外部から指定されるべきである。
func NewJudge(id int) *Judge {
	j := &Judge{
		id:     id,
		join:   make(chan *Participant),
		leave:  make(chan *Participant),
		action: make(chan Action),
		// participants: make(map[*Participant]bool),
		participants: make(map[int]*Participant),
		history:      make([]Action, 0),
		seq:          -1,
	}
	j.run()
	return j
}

// AddParticipant は、JudgeにParticipantを追加して、そのParticipantにこれまでJudgeが送信した全てのBroadcastを送信します。
func (j *Judge) AddParticipant(p *Participant) {
	log.Println("trying to join")
	j.join <- p
	log.Printf("Judge has %v participants now!\n", len(j.participants))
	p.Broadcast(j.broadcast())
}

// Process はJudgeに処理すべきActionを送る。validationが成功した場合はtrue、失敗するとfalseを返す。
// また、Judgeに属するParticipantにメッセージを送信する。
func (j *Judge) process(a Action) bool {
	if !j.validateSequence(a) {
		return false
	}
	j.seq++
	log.Printf("Judge.process: Action %v was received", a)
	j.history = append(j.history, a)
	for _, p := range j.participants {
		p.Broadcast(j.broadcast())
	}
	return true
}

func (j *Judge) broadcast() Broadcast {
	return Broadcast{
		Seq:     j.seq,
		Actions: j.history,
	}
}

func (j *Judge) validateSequence(a Action) bool {
	// return a.Seq == j.seq+1
	return true // TODO impl
}

func (j *Judge) run() {
	go func() {
		for {
			select {
			case p := <-j.join:
				log.Println("Judge.run(): new participant are joinning")
				p.id = j.cnt // Participant.idは 0-indexed
				j.participants[j.cnt] = p
				p.Validation(Validation{ // pにvalidationを返す
					Valid:  true,
					YourID: p.id,
				})
				j.cnt++
			case p := <-j.leave:
				delete(j.participants, p.id)
			case a := <-j.action:
				j.process(a)
			}
		}
	}()
	log.Printf("Judge #%v is running\n", j.ID())
}

// func (j *Judge) Broadcast(b Broadcast) {
// 	for p := range j.participants {
// 		p.Broadcast(b)
// 	}
// }

// Participants は、Judgeに属する参加者のスライスを返す。
func (j *Judge) Participants() []Participant {
	return []Participant{}
}

// ID は、Judgeのidを返す。
func (j *Judge) ID() int {
	return j.id
}
