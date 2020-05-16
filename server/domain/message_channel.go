package domain

import "io"

// MessageChannel は、Participantが依存するWebSocketなどの通信インフラを抽象化したもの
// 実装はusecaseかwebにおかれる(多分usecase)
type MessageChannel interface {
	Action() <-chan Action
	Closed() <-chan string
	Broadcast(b Broadcast)
	Validation(e Validation)
	io.Closer
}
