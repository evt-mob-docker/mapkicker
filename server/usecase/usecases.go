package usecase

import (
	"log"
	"mapkicker/domain"

	"github.com/gorilla/websocket"
)

// AddParticipantToJudge は、与えられたWebSocket接続により新たなParticipantを生成してJudgeに追加する。
func AddParticipantToJudge(j *domain.Judge, s *websocket.Conn) {
	log.Println("usecase.AddParticipantToJudge")
	ms := NewMessageSocket(s)
	j.AddParticipant(
		domain.NewParticipant(ms, j),
	)
}
