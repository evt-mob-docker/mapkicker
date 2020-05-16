package usecase

import (
	"encoding/json"
	"log"
	"mapkicker/domain"

	"github.com/gorilla/websocket"
)

// MessageSocket は、websocket.Connを利用したdomain.MessageChannelの実装です
type MessageSocket struct {
	socket     *websocket.Conn
	action     chan domain.Action
	broadcast  chan domain.Broadcast
	validation chan domain.Validation
	close      chan string
}

// NewMessageSocket は、websocketからMessageChannelを生成して、actionをlistenします
func NewMessageSocket(conn *websocket.Conn) domain.MessageChannel {
	ms := &MessageSocket{
		socket:     conn,
		action:     make(chan domain.Action),
		broadcast:  make(chan domain.Broadcast),
		validation: make(chan domain.Validation),
	}
	go ms.listen()
	go ms.run()
	return ms
}

func (ms *MessageSocket) listen() {
	for {
		select {
		case <-ms.close:
			log.Println("closing...")
			break
		}
	}
}

func (ms *MessageSocket) run() {
	for {
		if _, msg, err := ms.socket.ReadMessage(); err == nil {
			var action domain.Action
			log.Println(string(msg))
			if err := json.Unmarshal(msg, &action); err != nil {
				log.Println(err)
			}
			log.Printf("WebSocket received action %v\n", action)
			ms.action <- action
		} else {
			break
		}
	}
	if err := ms.socket.Close(); err != nil {
		log.Println(err)
	}
}

// Action は、MessageSocketに送られてくるActionの受信チャンネルを返します
func (ms *MessageSocket) Action() <-chan domain.Action {
	return ms.action
}

// Broadcast は、MessageSocketにBroadcastを渡し、websocketに送信します。
func (ms *MessageSocket) Broadcast(b domain.Broadcast) {
	log.Printf("MessageSOcket.Broadcast: %#v\n", b)
	payload, err := json.Marshal(b)
	if err != nil {
		log.Printf("failed to marshal broadcast %#v\n, error %#v", b, err)
	}
	ms.socket.WriteMessage(websocket.TextMessage, payload)

}

// ValidationError は、MessageSocketにValidationErrorを渡し、websocketに送信します。
func (ms *MessageSocket) Validation(e domain.Validation) {
	log.Println(e)
}

const close = "close"

// Close は、websocketをクローズします。
func (ms *MessageSocket) Close() error {
	ms.close <- close
	if err := ms.socket.Close(); err != nil {
		log.Println("error has occured as socket is closing")
		return err
	}
	return nil
}

// Closed は、MessageSocketがクローズされることを通知するチャンネルを返します。
func (ms *MessageSocket) Closed() <-chan string {
	return ms.close
}
