<template>
  <base-view/>
</template>

<script>
import BaseView from "./components/BaseView";
import {mapActions} from "vuex";
import axios from "axios";

export default {
  name: 'app',
  components: {
    BaseView,
  },
  async mounted() {
    await axios.get("/api/voters/all").then(response => {
      this.setVoters(response.data.map(el => ({id: el.id, name: el.name, parameter: el.hasVoted ? 'V':'X'})))
    })
    await axios.get("/api/candidates/all").then(response => {
      this.setCandidates(response.data.map(el => ({id: el.id, name: el.name, parameter: el.numberOfVotes})))
    })
  },
  methods: {
    ...mapActions(['setCandidates', 'setVoters']),
  }
}
</script>

<style>
</style>
