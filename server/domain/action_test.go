package domain_test

import (
	"mapkicker/domain"
	"testing"
)

// func TestNewChat(t *testing.T) {
// 	j := domain.NewJudge(0)
// 	action := domain.NewChat(0, 1, "hello")
// 	ok := j.Send(action)
// 	if !ok {
// 		t.Error("New judge seq should began with 0")
// 	}
// 	ok = j.Send(action)
// 	if ok {
// 		t.Error("judge seq is not correctly incremented")
// 	}
// }

func TestGameState(t *testing.T) {
	gs := domain.NewGameState()
	gs.Kick(3, 0, 100)
	if !gs.SCMaps[0].Kicked {
		t.Fatalf("map 0 should be kicked")
	}
	if !gs.SCMaps[3].Kicked {
		t.Fatalf("map 3 should be kicked")
	}
}
