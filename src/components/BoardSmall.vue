<template>
  <tr class="border-b">
    <td class="py-1">{{ board.category }}</td>
    <td v-if="board.fileCounts != null">O</td>
    <td v-else></td>
    <td>
      <a href="#">{{ board.title }}</a>
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
<script>
export default {
  props: ['board']
}
</script>
