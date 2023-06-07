<script>
import axios from 'axios'

export default {
  data() {
    return {
      categories: [],
      createObject: {
        categoryId: 'null',
        writer: '',
        title: '',
        password: '',
        content: ''
      }
    }
  },
  methods: {
    submit() {
      if (!this.verify()) return

      const data = new FormData()
      const createObjectJson = JSON.stringify(this.createObject)
      const blob = new Blob([createObjectJson], { type: 'application/json' })
      data.append('boardCreateDTO', blob)

      const fileOne = document.getElementById('fileOne')
      const fileTwo = document.getElementById('fileTwo')
      const fileThree = document.getElementById('fileThree')
      const fileList = [fileOne, fileTwo, fileThree]

      fileList.forEach((file) => {
        if (file !== undefined) {
          data.append('files', file.files[0])
        }
      })

      const params = new URLSearchParams(location.search)
      data.append('startDate', params.get('startDate'))
      data.append('endDate', params.get('endDate'))
      data.append('category', params.get('category'))
      data.append('search', params.get('search'))

      axios
        .put('/board/create', data)
        .then((response) => {
          const id = response.data.boardId
          this.$router.push({
            path: `/detail/${id}`,
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
          if (data.errorCode === 612) {
            alert('파일 이름이 존재하지 않습니다.')
          }
        })
    },
    verify() {
      if (!this.verifyCategory()) return false
      if (!this.verifyWriter()) return false
      if (!this.verifyPassowrd()) return false
      if (!this.verifyTitle()) return false
      if (!this.verifyContent()) return false
      return true
    },
    verifyCategory() {
      const category = this.createObject.categoryId
      if (category === 'null') {
        alert('카테고리를 선택해주세요.')
        return false
      }
      return true
    },
    verifyWriter() {
      const writer = this.createObject.writer
      if (writer.length < 3 || writer.length >= 5) {
        alert('작성자는 3글자 이상, 5글자 미만이어야 합니다.')
        return false
      }
      return true
    },
    verifyPassowrd() {
      const password = this.createObject.password
      const passwordVerify = document.getElementById('passwordVerify').value
      if (password.length < 4 || password.length > 15) {
        alert('비밀번호는 4글자 이상, 16글자 미만이어야 합니다.')
        return false
      }
      if (password !== passwordVerify) {
        alert('비밀번호가 같지 않습니다.')
        return false
      }
      return true
    },
    verifyTitle() {
      const title = this.createObject.title
      if (title.length < 4 || title.length > 99) {
        alert('제목은 4글자 이상, 100글자 미만이어야 합니다.')
        return false
      }
      return true
    },
    verifyContent() {
      const content = this.createObject.content
      if (content.length < 4 || content.length > 1999) {
        alert('내용은 4글자 이상, 2000글자 미만이어야 합니다.')
        return false
      }
      return true
    },
    onFileChange(index) {
      if (index === 1) {
        const fileInput = document.getElementById('fileOneName')
        const fileOne = document.getElementById('fileOne')
        fileInput.value = fileOne.files[0].name
      } else if (index === 2) {
        const fileInput = document.getElementById('fileTwoName')
        const fileTwo = document.getElementById('fileTwo')
        fileInput.value = fileTwo.files[0].name
      } else if (index === 3) {
        const fileInput = document.getElementById('fileThreeName')
        const fileThree = document.getElementById('fileThree')
        fileInput.value = fileThree.files[0].name
      }
    }
  },
  beforeMount() {
    axios
      .get('http://localhost:8080/board/create')
      .then((response) => {
        console.log(response)
        this.categories = response.data.categories
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>

<template>
  <div>
    <div>
      <div class="flex border-y">
        <div class="bg-gray-100 w-2/12 py-1 pl-2">카테고리</div>
        <div class="py-1 w-9/12">
          <select
            name="category"
            class="border ml-3 w-44"
            id="category"
            v-model="createObject.categoryId"
          >
            <option value="null">카테고리 선택</option>
            <option
              v-for="category in categories"
              :key="category.categoryId"
              :value="category.categoryId"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
      </div>

      <!-- 작성자 -->
      <div class="flex border-b">
        <div class="bg-gray-100 w-2/12 py-1 pl-2">작성자</div>
        <div class="py-1 w-9/12">
          <input
            type="text"
            name="writer"
            class="border pl-1 ml-3 w-44"
            id="writer"
            v-model="createObject.writer"
          />
        </div>
      </div>
    </div>

    <!-- 비밀번호 -->
    <div class="flex border-b">
      <div class="bg-gray-100 w-2/12 py-1 pl-2">비밀번호</div>
      <div class="py-1 w-9/12">
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          class="border pl-1 ml-3 w-44"
          id="password"
          v-model="createObject.password"
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          class="border pl-1 ml-3 w-44"
          id="passwordVerify"
        />
      </div>
    </div>

    <!-- 제목 -->
    <div class="flex border-b">
      <div class="bg-gray-100 w-2/12 py-1 pl-2">제목</div>
      <div class="py-1 w-9/12">
        <input
          type="text"
          name="title"
          class="border pl-1 ml-3 w-full"
          id="title"
          v-model="createObject.title"
        />
      </div>
    </div>

    <!-- 내용 -->
    <div class="flex border-b">
      <div class="bg-gray-100 w-2/12 py-1 pl-2">
        <span class="align-middle">내용</span>
      </div>
      <div class="py-1 w-9/12">
        <textarea
          class="resize-none w-full border pl-1 ml-3 h-32"
          name="content"
          id="content"
          v-model="createObject.content"
        ></textarea>
      </div>
    </div>

    <!-- 파일 첨부 -->
    <div class="flex border-b">
      <div class="bg-gray-100 w-2/12 py-1 pl-2">
        <span class="align-middle">파일 첨부</span>
      </div>
      <div class="py-1 w-9/12">
        <div class="my-1">
          <input type="text" class="border pl-1 ml-3 w-5/12 bg-white" disabled id="fileOneName" />
          <label for="fileOne">
            <span class="border rounded-sm px-2">파일 찾기</span>
          </label>
          <input
            type="file"
            class="pl-1 ml-3 w-full"
            id="fileOne"
            name="file"
            hidden
            @change="onFileChange(1)"
          />
        </div>
        <div class="my-1">
          <input type="text" class="border pl-1 ml-3 w-5/12 bg-white" disabled id="fileTwoName" />
          <label for="fileTwo">
            <span class="border rounded-sm px-2">파일 찾기</span>
          </label>
          <input
            type="file"
            class="pl-1 ml-3 w-full"
            id="fileTwo"
            name="file"
            hidden
            @change="onFileChange(2)"
          />
        </div>
        <div class="my-1">
          <input type="text" class="border pl-1 ml-3 w-5/12 bg-white" disabled id="fileThreeName" />
          <label for="fileThree">
            <span class="border rounded-sm px-2">파일 찾기</span>
          </label>
          <input
            type="file"
            class="pl-1 ml-3 w-full"
            id="fileThree"
            name="file"
            hidden
            @change="onFileChange(3)"
          />
        </div>
      </div>
    </div>
  </div>
  <br />
  <div class="flex justify-between">
    <button class="px-5 rounded-sm border" @click="() => this.$router.go(-1)">취소</button>
    <button
      type="button"
      class="px-5 rounded-sm border bg-gray-100 hover:cursor-pointer"
      @click="submit"
    >
      저장
    </button>
  </div>
</template>
