<template>
  <div class="main">
    <table>
      <thead>
      <th colspan="3">{{ title }}</th>
      </thead>
      <tr>
        <td class="desc"><b>Name</b></td>
        <td class="desc"><b>{{ paramName }}</b></td>
      </tr>
      <tr v-for="(item, index) in content" :key="index" class="">
        <td class="name">{{ item.name }}</td>
        <td class="parameter">{{ item.parameter }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'TableView',
  props: {
    title: {
      required: true,
      type: String,
    },
    paramName: {
      required: true,
      type: String,
    },
    content: {
      required: true,
      type: Array,
    }
  },
  data() {
    return {
      items: [],
    }
  },
}
</script>

<style scoped>

table, th, td {
  border: 2px solid;
  text-align: center;
}

table {
  width: 500px;
}

thead {
  text-align: center;
  margin-left: 100px;
}

.name {
  padding: 20px;
  width: 300px;
}

.parameter {
  padding: 20px;
  width: 200px;
}
</style>
