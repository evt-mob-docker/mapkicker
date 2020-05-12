package domain

import (
	"log"
)

// Judge は、1つのマップキックセッションの進行役を表す。
type Judge struct {
	id           int
	join         chan *Participant
	leave        chan *Participant
	action       chan Action
	participants map[*Participant]bool
	history      []Broadcast
	seq          int // Actionの整合性を確保するための、受理ずみActionの最後のsequence番号
}

// NewJudge は、指定したidを持つJudgeインスタンスを生成する。
// このidはchallongeトーナメントの試合IDを用いるので、外部から指定されるべきである。
func NewJudge(id int) *Judge {
	j := &Judge{
		id:           id,
		join:         make(chan *Participant),
		leave:        make(chan *Participant),
		action:       make(chan Action),
		participants: make(map[*Participant]bool),
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
	for _, msg := range j.history {
		p.Broadcast(msg)
	}
}

// Process はJudgeに処理すべきActionを送る。validationが成功した場合はtrue、失敗するとfalseを返す。
// また、Judgeに属するParticipantにメッセージを送信する。
func (j *Judge) process(a Action) bool {
	if !j.validateSequence(a) {
		return false
	}
	j.seq++
	log.Printf("Action %v was received", a)
	return true
}

func (j *Judge) validateSequence(a Action) bool {
	return a.seq == j.seq+1
}

func (j *Judge) run() {
	go func() {
		for {
			select {
			case p := <-j.join:
				log.Println("Judge.run(): new participant are joinning")
				j.participants[p] = true
			case p := <-j.leave:
				delete(j.participants, p)
			case a := <-j.action:
				j.process(a)
			}
		}
	}()
	log.Printf("Judge #%v is running\n", j.ID())
}

func (j *Judge) Broadcast(b Broadcast) {
	j.history = append(j.history, b)
	for p := range j.participants {
		p.Broadcast(b)
	}
}

// Participants は、Judgeに属する参加者のスライスを返す。
func (j *Judge) Participants() []Participant {
	return []Participant{}
}

// ID は、Judgeのidを返す。
func (j *Judge) ID() int {
	return j.id
}
