<template>
  <div>
    <div class="chatbox">
      <div class="content">
        <li v-for="msg in messages" v-bind:key="msg.id">
          <b>{{msg.content}}</b>
        </li>
      </div>
      <form id="chat_form">
        <input type="text" id="chat_text" class="input" />
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Chat",
  data() {
    return {
      messages: [],
      mappool: []
    };
  },
  mounted() {
    const url = "ws://localhost:8080/join";
    const socket = new WebSocket(url);
    
    axios.get(`${process.env.VUE_APP_API_URL}/api/mappool`).then(response => {
      return (this.mappool = response.data);
    });

    socket.onclose = () => {
      console.log(`Websocket connection to ${url} has been closed.`);
    };
    socket.onmessage = e => {
      console.table(e.data);
      const broadcast = JSON.parse(e.data);
      const actions = broadcast.Actions;
      if (actions.length > 0) {
        switch (actions[actions.length-1].Kind){
          case "chat":
            this.messages.push({
              id: this.messages.length,
              content: actions[actions.length - 1].Msg
            });
            break;
          case "kick":
              this.messages.push({
              id: this.messages.length,
              content: actions[actions.length - 1].MapIDs.map(i => this.mappool[i])
            });
            break;
        }
      }
    };
    socket.onopen = () => {
      console.log(`Websocket connection to ${url} has opened.`);
    };
    socket.onerror = () => {
      console.error(`Websocket connection to ${url} has an error.`);
    };
    const form = document.getElementById("chat_form");
    form.addEventListener("submit", e => {
      e.preventDefault();
      const textInput = document.getElementById("chat_text");
      if (!textInput.value) return false;
      if (!socket) {
        console.error("Error: no websocket connection");
        return false;
      }
      const action = {
        seq: 0,
        participantID: 19,
        kind: "chat",
        msg: textInput.value
      };
      socket.send(JSON.stringify(action));
      textInput.value = "";
      return false;
    });
  }
};
</script>

<style scoped>
.chatbox {
  height: 200px;
  display: flex;
  flex-direction: column;
}

.chatbox .content {
  font-family: arial, sans-serif;
  font-size: 13px;
  color: #333333;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: auto;
  padding: 7px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  line-height: 1.3em;
}

.chatbox .input {
  padding: 5px;
  background-color: #ffffff;
  border-left: 1px solid #cccccc;
  border-right: 1px solid #cccccc;
  border-bottom: 1px solid #cccccc;
  width: 100%;
}
</style>

