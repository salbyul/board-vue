<script>
import axios from 'axios'

export default {
  data() {
    return {
      category: '',
      comments: [],
      content: '',
      fileNames: [],
      generationTimestamp: '',
      modificationTimestamp: '-',
      title: '',
      views: 0,
      writer: '',
      passwordForDelete: '',
      passwordForModify: ''
    }
  },
  methods: {
    modifyBoard() {
      const form = new FormData()
      form.append('boardId', this.$route.params.id)
      form.append('password', this.passwordForModify)
      axios
        .post(`/board/modify`, form)
        .then((response) => {
          console.log(response)
          this.$router.push({
            name: 'modify',
            query: {
              startDate: this.$route.query.startDate,
              endDate: this.$route.query.endDate,
              category: this.$route.query.category,
              search: this.$route.query.search,
              page: this.$route.query.page,
              uuid: response.data.uuid
            },
            params: {
              id: this.$route.params.id
            }
          })
        })
        .catch((error) => {
          const data = error.response.data
          if (data.errorCode === 405) {
            alert('비밀번호를 확인해주세요.')
          }
        })
    },
    deleteBoard() {
      axios
        .delete(`/board/delete/${this.$route.params.id}?password=${this.passwordForDelete}`)
        .then(() => {
          alert('삭제 되었습니다.')
          this.$router.push({
            path: '/',
            query: {
              startDate: this.$route.query.startDate,
              endDate: this.$route.query.endDate,
              category: this.$route.query.category,
              search: this.$route.query.search,
              page: this.$route.query.page
            }
          })
        })
        .catch((error) => {
          const data = error.response.data
          if (data.errorCode === 405) {
            alert('비밀번호를 확인해주세요.')
          }
        })
    },
    downloadFile(fileName) {
      axios
        .get(`/file/download?realName=${fileName}&boardId=${this.$route.params.id}`, {
          responseType: 'blob'
        })
        .then((response) => {
          const name = response.headers['content-disposition']
            .split('filename=')[1]
            .replace(/"/g, '')
          const url = window.URL.createObjectURL(new Blob([response.data]))
          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', name)
          link.style.cssText = 'display:none'
          document.body.appendChild(link)
          link.click()
          link.remove()
        })
        .catch(() => [])
    },
    transferToHome() {
      this.$router.push({
        path: '/',
        query: {
          startDate: this.$route.query.startDate,
          endDate: this.$route.query.endDate,
          category: this.$route.query.category,
          search: this.$route.query.search,
          page: this.$route.query.page
        }
      })
    },
    changeVisibilityPopup(btn) {
      const modifyPopup = document.getElementById('modifyPopup')
      const deletePopup = document.getElementById('deletePopup')
      if (btn === 'modify') {
        const visibility = modifyPopup.style.visibility
        if (visibility === 'visible') {
          modifyPopup.style.visibility = 'hidden'
        } else {
          deletePopup.style.visibility = 'hidden'
          modifyPopup.style.visibility = 'visible'
        }
      } else if (btn === 'delete') {
        const visibility = deletePopup.style.visibility
        if (visibility === 'visible') {
          deletePopup.style.visibility = 'hidden'
        } else {
          modifyPopup.style.visibility = 'hidden'
          deletePopup.style.visibility = 'visible'
        }
      }
    }
  },
  beforeMount() {
    axios
      .get(`/board/detail/${this.$route.params.id}`)
      .then((response) => {
        const data = response.data.boardDetail
        this.category = data.category
        this.comments = data.commentDTOs
        this.content = data.content
        this.fileNames = data.fileNames
        this.generationTimestamp =
          data.generationTimestamp.substring(0, 10) +
          ' ' +
          data.generationTimestamp.substring(11, 16)
        if (data.modificationTimestamp !== null) {
          this.modificationTimestamp =
            data.modificationTimestamp.substring(0, 10) +
            ' ' +
            data.modificationTimestamp.substring(11, 16)
        }
        this.title = data.title
        this.views = data.views
        this.writer = data.writer
      })
      .catch(() => {})
  }
}
</script>
<template>
  <div class="h-screen">
    <!-- 제목 -->
    <div class="border-b-2 pb-3 mb-3">
      <div class="flex justify-between text-sm text-gray-600 mb-5">
        <div>{{ writer }}</div>
        <div>등록일시 {{ generationTimestamp }} 수정일시 {{ modificationTimestamp }}</div>
      </div>
      <div class="flex justify-between text-gray-700">
        <div class="flex">
          <div class="mr-4">[{{ category }}]</div>
          <div class="text-gray-900">{{ title }}</div>
        </div>
        <div>조회수: {{ views }}</div>
      </div>
    </div>

    <!-- 내용 -->
    <div class="mb-3">
      <div class="border pl-1 whitespace-pre-wrap mb-4">{{ content }}</div>

      <!-- 파일 -->
      <div v-for="fileName in fileNames" :key="fileName">
        <a href="#" @click="downloadFile(fileName)">{{ fileName }}</a>
      </div>
    </div>

    <!-- 댓글 -->
    <div class="border-b pb-2 bg-gray-50 px-1">
      <div v-for="comment in comments" :key="comment.commentId">
        <div class="border-b-2 pb-2 mb-2">
          <div class="flex justify-between text-gray-600 text-xs">
            <div class="pl-3">{{ comment.writer }}</div>
            <div class="pr-3">{{ comment.generationTimestamp }}</div>
          </div>
          <div class="pl-3">{{ comment.content }}</div>
        </div>
      </div>
      <div>
        <div>
          <div>
            <input
              type="text"
              placeholder="작성자"
              class="border pl-1 mb-1"
              name="writer"
              id="writer"
            />
          </div>
          <div class="flex">
            <textarea
              class="resize-none border h-20 pl-1 w-11/12"
              name="content"
              id="content"
            ></textarea>
            <button class="border w-1/12 h-20 rounded-sm hover:cursor-pointer">등록</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 하단 버튼 섹션 -->
    <div class="text-center mt-2">
      <button class="px-3 py-1 border rounded-sm bg-gray-100" @click="transferToHome">목록</button>
      <button class="px-3 py-1 border rounded-sm" @click="changeVisibilityPopup('modify')">
        수정
      </button>
      <button class="px-3 py-1 border rounded-sm" @click="changeVisibilityPopup('delete')">
        삭제
      </button>
    </div>
  </div>

  <!-- 수정 팝업 -->
  <div
    class="border fixed z-10 w-3/12 text-center top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 shadow-md bg-gray-50 invisible"
    id="modifyPopup"
  >
    <h1 class="my-10">비밀번호 입력</h1>
    <input
      type="password"
      placeholder="비밀번호를 입력해주세요."
      class="pl-1 border w-5/12"
      name="password"
      v-model="passwordForModify"
    />
    <br />
    <div class="flex justify-evenly my-10">
      <button type="button" class="bg-gray-100 px-3 py-1" @click="changeVisibilityPopup('modify')">
        취소
      </button>
      <button type="button" class="bg-gray-100 px-3 py-1" @click="modifyBoard">확인</button>
    </div>
  </div>

  <!-- 삭제 팝업 -->
  <div
    class="border fixed z-10 w-3/12 text-center top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 shadow-md bg-gray-50 invisible"
    id="deletePopup"
  >
    <h1 class="my-10">비밀번호 입력</h1>
    <input
      type="password"
      placeholder="비밀번호를 입력해주세요."
      class="pl-1 border w-5/12"
      v-model="passwordForDelete"
      name="password"
    />
    <br />
    <div class="flex justify-evenly my-10">
      <button type="button" class="bg-gray-100 px-3 py-1" @click="changeVisibilityPopup('delete')">
        취소
      </button>
      <button type="button" class="bg-gray-100 px-3 py-1" @click="deleteBoard">확인</button>
    </div>
  </div>
</template>
