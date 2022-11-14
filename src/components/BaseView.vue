<template>
  <div>
    <h1>Voting app</h1>
    <div class="main">
      <div>
        <div class="newVoter">
          <b-button v-b-modal.modal-1>Add Voter</b-button>
          <b-modal @ok="addVoter" id="modal-1" title="Add Voter">
            <input v-model="voterName" placeholder="Enter the name"/>
          </b-modal>
        </div>
        <table-view title="Voters"
                    param-name="Has voted"
                    :content="voters"
                    key="votersTable"/>
      </div>
      <div>
        <div class="newCandidate">
          <b-button v-b-modal.modal-2>Add Candidate</b-button>
          <b-modal @ok="addCandidate" id="modal-2" title="Add Candidate">
            <input v-model="candidateName" placeholder="Enter the name"/>
          </b-modal>
        </div>
        <table-view title="Candidates"
                    param-name="Votes"
                    :content="candidates"/>
      </div>
    </div>
    <hr class="line">
    <h1>Vote!</h1>
    <div class="vote">
      <select v-model="selectedVoter" class="select">
        <option>I am</option>
        <option v-for="(voter, index) in voters" :key="index">{{ voter.name }}</option>
      </select>
      <select v-model="selectedCandidate" class="select">
        <option>I vote for</option>
        <option v-for="(candidate, index) in candidates" :key="index">{{ candidate.name }}</option>
      </select>
      <button @click="vote"
              class="submit">Submit!
      </button>
    </div>
  </div>
</template>

<script>
import TableView from "./TableView";
import {mapState} from "vuex";
import axios from "axios";

export default {
  name: 'BaseView',
  components: {
    TableView,
  },
  data() {
    return {
      selectedVoter: 'I am',
      selectedCandidate: 'I vote for',
      voterName: null,
      candidateName: null,
    }
  },
  computed: {
    ...mapState(['candidates', 'voters']),
  },
  methods: {
    async vote() {
      if (this.selectedCandidate === 'I vote for' || this.selectedVoter === 'I am') return
      const voter = this.voters.find(voter => voter.name === this.selectedVoter)
      const candidate = this.candidates.find(candidate => candidate.name === this.selectedCandidate)
      voter.parameter = 'V'
      candidate.parameter++
      await this.updateVoting(voter, candidate)
    },
    async addVoter() {
      if (!this.voterName) return
      const voter = {
        name: this.voterName,
        hasVoted: false,
      }
      await axios.post("/api/voters", voter).then(response => {
        this.voters.push({
          id: response.data.id,
          name: response.data.name,
          parameter: response.data.hasVoted ? "V" : "X"
        })
      })
      this.voterName = null
    },
    async addCandidate() {
      if (!this.candidateName) return
      const candidate = {
        name: this.candidateName,
        numberOfVotes: 0,
      }
      await axios.post("/api/candidates", candidate).then(response => {
        this.candidates.push({
          id: response.data.id,
          name: response.data.name,
          parameter: response.data.numberOfVotes
        })
      })
      this.candidateName = null
    },
    async updateVoting(voter, candidate) {
      await axios.put("/api/candidates", {
        id: candidate.id,
        name: candidate.name,
        numberOfVotes: candidate.parameter,
      })
      await axios.put("/api/voters", {
        id: voter.id,
        name: voter.name,
        hasVoted: voter.parameter === 'V',
      })
    }
  }
}
</script>

<style scoped>
.main {
  margin-top: 30px;
  margin-left: 20px;
  display: flex;
  flex-direction: row;
  gap: 100px
}

h1 {
  margin-left: 40px;
  margin-top: 20px;
}

.line {
  border-width: 2px;
  margin-top: 40px;
}

.select {
  margin-left: 40px;
  width: 250px;
}

.submit {
  margin-left: 30px;
}

.newVoter {
  margin-left: 420px;
}

.newCandidate {
  margin-left: 390px;
}

.vote {
  margin-bottom: 80px;
}
</style>
