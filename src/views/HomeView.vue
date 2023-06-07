<script>
import axios from 'axios'
import BoardSmall from '../components/BoardSmall.vue'
export default {
  components: {
    BoardSmall
  },
  data() {
    return {
      condition: {
        startDate: '',
        endDate: '',
        search: '',
        category: 'all',
        page: 0,
        limit: 10
      },
      boardCounts: 0,
      boards: [],
      categoryNames: []
    }
  },
  methods: {
    transferToCreatePage() {
      this.$router.push({
        path: '/create',
        query: {
          startDate: this.condition.startDate,
          endDate: this.condition.endDate,
          category: this.condition.category,
          search: this.condition.search
        }
      })
    },
    doSearch() {
      const inputStartDate = document.getElementById('startDate')
      const inputEndDate = document.getElementById('endDate')
      const inputCategory = document.getElementById('category')
      const inputSearch = document.getElementById('search')

      const startDate = new Date()
      startDate.setFullYear(startDate.getFullYear() - 1)

      const searchCondition = {
        startDate:
          inputStartDate.value === null || inputStartDate.value === ''
            ? makeDate(startDate)
            : inputStartDate.value,
        endDate:
          inputEndDate.value === null || inputEndDate.value === ''
            ? makeDate(new Date())
            : inputEndDate.value,
        category: inputCategory.value,
        search: inputSearch.value.trim(),
        page: this.condition.page,
        limit: this.condition.limit
      }
      axios
        .get('/board/list', { params: searchCondition })
        .then((response) => {
          const data = response.data
          this.boardCounts = data.boardCounts
          this.boards = data.boardDTOs
          this.condition.startDate = searchCondition.startDate
          this.condition.endDate = searchCondition.endDate
          this.condition.category = searchCondition.category
          this.condition.search = searchCondition.search
          this.condition.page = searchCondition.page
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  beforeMount() {
    const urlParams = new URLSearchParams(location.search)
    if (urlParams.has('startDate')) {
      this.condition.startDate = urlParams.get('startDate')
    } else {
      const startDate = new Date()
      startDate.setFullYear(startDate.getFullYear() - 1)
      this.condition.startDate = makeDate(startDate)
    }
    if (urlParams.has('endDate')) {
      this.condition.endDate = urlParams.get('endDate')
    } else {
      const endDate = new Date()
      endDate.setDate(endDate.getDate() + 1)
      this.condition.endDate = makeDate(endDate)
    }
    if (urlParams.has('search')) {
      this.condition.search = urlParams.get('search')
    }
    if (urlParams.has('category')) {
      this.condition.category = urlParams.get('category')
    }
    if (urlParams.has('offset')) {
      this.condition.offset = urlParams.get('offset')
    }

    axios
      .get('http://localhost:8080/board/list', { params: this.condition })
      .then((response) => {
        const data = response.data
        this.boardCounts = data.boardCounts
        this.boards = data.boardDTOs
        this.categoryNames = data.categoryNames
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
const makeDate = (date) => {
  const yyyy = date.getFullYear()
  const mm = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
  const dd = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
  return yyyy + '-' + mm + '-' + dd
}
</script>
<template>
  <div class="mb-5">
    <div class="py-1 text-center">
      등록일
      <input
        type="date"
        name="startDate"
        class="border mx-7"
        id="startDate"
        v-model="condition.startDate"
      />
      <input
        type="date"
        name="endDate"
        class="border mx-7"
        id="endDate"
        v-model="condition.endDate"
      />
      <select name="category" class="border p-1" id="category">
        <option value="all">전체 카테고리</option>
        <option
          v-for="category in categoryNames"
          :key="category"
          :value="category"
          :selected="category === condition.category"
        >
          {{ category }}
        </option>
      </select>
      <input
        type="text"
        placeholder="검색어를 입력하세요. (제목 + 작성자 + 내용)"
        name="search"
        class="border pl-2 w-5/12"
        id="search"
        v-model="condition.search"
      />
      <button
        type="button"
        class="border rounded-sm bg-gray-100 px-5 duration-300 hover:duration-300 hover:bg-gray-200 hover:cursor-pointer"
        @click="doSearch"
      >
        검색
      </button>
    </div>
    <div>
      <div class="ml-3 mt-3">총 {{ boardCounts }}건</div>
      <br />
      <div>
        <table class="mx-auto text-center w-full">
          <thead>
            <tr class="border-y">
              <th class="py-1">카테고리</th>
              <th></th>
              <th>제목</th>
              <th>작성자</th>
              <th>조회 수</th>
              <th>등록 일시</th>
              <th>수정 일시</th>
            </tr>
          </thead>
          <tbody>
            <BoardSmall
              v-for="board in boards"
              :key="board.id"
              :board="board"
              :condition="this.condition"
            />
          </tbody>
        </table>
      </div>
    </div>
    <br />
    <!-- 페이지네이션 섹션 -->
    <div class="flex justify-end">
      <button
        type="button"
        class="px-5 bg-gray-200 rounded-sm duration-300 hover:duration-300 hover:bg-gray-300"
        @click="transferToCreatePage()"
      >
        등록
      </button>
    </div>
  </div>
</template>
