<template>
  <div>
    <div class="mappool">
      <div v-for="map in mappool" v-bind:key="map.id">
        <input v-if="!map.kicked" type="checkbox" :id="map.id" :value="map.id" v-model="checkedMapIDs" />
        <label :for="map.id" v-if="map.kicked">
          <del>{{map.name}}</del>
        </label>
        <label :for="map.id" v-else>
          {{map.name}}
        </label>
      </div>
    </div>
    <!-- <span>Checked Maps: {{ checkedMaps }}</span>
    <br />-->
    <button v-on:click="kickMap">Kick!</button>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";

class SCMap {
  constructor(id, name) {
    return {
      id: id,
      name: name,
      kicked: false,
    }
  }
}

export default Vue.component("Mappool", {
  name: "Mappool",
  data: () => ({
    mappool: [],
    checkedMapIDs: [],
    socket: null,
    url: "ws://localhost:8080/join"
  }),
  mounted: function() {
    this.socket = new WebSocket(this.url);
    axios.get(`${process.env.VUE_APP_API_URL}/api/mappool`).then(response => {
      return (this.mappool = response.data.map((m, i) => new SCMap(i, m)));
    });

    this.socket.onclose = () => {
      console.log(`Websocket connection to ${this.url} has been closed.`);
    };
    this.socket.onopen = () => {
      console.log(`Websocket connection to ${this.url} has opened.`);
    };
    this.socket.onerror = () => {
      console.error(`Websocket connection to ${this.url} has an error.`);
    };
    this.socket.onmessage = e => {
      console.table(this.mappool);
      const broadcast = JSON.parse(e.data);
      const actions = broadcast.Actions;
      if (actions.length > 0 && actions[actions.length-1].Kind === "kick") {
        actions[actions.length - 1].MapIDs.map(i => { this.mappool[i].kicked = true; })
      }
    }
  },
  methods: {
    kickMap: function() {
      const self = this;
      // const checkedMapIDs = self.checkedMaps.map(function(name) {
      //   return self.mappool.map(m => m.id);
      // });
      console.log("LOG",self.checkedMapIDs);
      const action = {
        seq: 0,
        participantID: 19,
        kind: "kick",
        mapIDs: self.checkedMapIDs
      };
      console.table(action);
      const payload = JSON.stringify(action);
      this.socket.send(payload);
    }
  }
});
</script>

<style scoped>
.mappool {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
