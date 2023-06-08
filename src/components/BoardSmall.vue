<script>
export default {
  props: ['board', 'condition'],
  methods: {
    transferToDetail(id) {
      this.$router.push({
        path: `/detail/${id}`,
        query: {
          startDate: this.condition.startDate,
          endDate: this.condition.endDate,
          category: this.condition.category,
          search: this.condition.search,
          page: this.condition.page
        }
      })
    }
  }
}
</script>

<template>
  <tr class="border-b">
    <td class="py-1">{{ board.category }}</td>
    <td v-if="board.fileCounts != null">O</td>
    <td v-else></td>
    <td>
      <a href="#" @click="transferToDetail(board.boardId)">{{ board.title }}</a>
    </td>
    <td>{{ board.writer }}</td>
    <td>{{ board.views }}</td>
    <td>{{ board.generationTimestamp.substring(0, 10) }}</td>
    <td v-if="board.modificationTimestamp != null">
      {{ board.modificationTimestamp.substring(0, 10) }}
    </td>
    <td v-else>-</td>
  </tr>
</template>
