package usecase

import (
	"mapkicker/domain"

	"github.com/gorilla/websocket"
)

// AddParticipantToJudge は、与えられたWebSocket接続により新たなParticipantを生成してJudgeに追加する。
func AddParticipantToJudge(j *domain.Judge, s *websocket.Conn) {
	ms := NewMessageSocket(s)
	j.AddParticipant(
		domain.NewParticipant(ms, j),
	)
}
