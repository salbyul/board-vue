<script>
import axios from 'axios'

export default {
  data() {
    return {
      category: '',
      content: '',
      oldFiles: [],
      oldFileCounts: 0,
      generationTimestamp: '',
      modificationTimestamp: '-',
      title: '',
      views: 0,
      writer: '',
      password: '',
      newFileCounts: 0
    }
  },
  beforeMount() {
    axios
      .get(`/board/modify/${this.$route.params.id}?uuid=${this.$route.query.uuid}`)
      .then((response) => {
        const data = response.data.boardDetail
        this.category = data.category
        this.content = data.content
        let fileCounts = 0
        data.fileNames.forEach((f) => {
          this.oldFiles.push({ index: fileCounts++, fileName: f })
        })
        this.oldFileCounts = this.oldFiles.length
        this.newFileCounts = 4 - fileCounts
        this.generationTimestamp =
          data.generationTimestamp.substring(0, 10) + ' ' + data.generationTimestamp.substring(11)
        if (data.modificationTimestamp !== null) {
          this.modificationTimestamp =
            data.modificationTimestamp.substring(0, 10) +
            ' ' +
            data.modificationTimestamp.substring(11)
        }
        this.title = data.title
        this.views = data.views
        this.writer = data.writer
      })
      .catch((error) => {
        const data = error.response.data
        if (data.errorCode === 405) {
          alert('잘못된 접근입니다.')
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
        }
      })
  },
  methods: {
    verify() {
      if (!this.verifyWriter()) return false
      if (!this.verifyTitle()) return false
      if (!this.verifyContent()) return false
      return true
    },
    verifyWriter() {
      const writer = this.writer
      if (writer.length < 3 || writer.length >= 5) {
        alert('작성자는 3글자 이상, 5글자 미만이어야 합니다.')
        return false
      }
      return true
    },
    verifyTitle() {
      const title = this.title
      if (title.length < 4 || title.length > 99) {
        alert('제목은 4글자 이상, 100글자 미만이어야 합니다.')
        return false
      }
      return true
    },
    verifyContent() {
      const content = this.content
      if (content.length < 4 || content.length > 1999) {
        alert('내용은 4글자 이상, 2000글자 미만이어야 합니다.')
        return false
      }
      return true
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
        .catch((error) => [console.log(error)])
    },
    onFileChange(index) {
      const input = document.getElementById('file' + index)
      const fileInput = document.getElementById('fileInput' + index)
      input.value = fileInput.files[0].name
    },

    deleteFile(index) {
      const div = document.getElementById('fileDiv' + index)
      div.remove()
      this.oldFiles.forEach((f) => {
        if (f.index === index) {
          this.oldFiles.splice(this.oldFiles.indexOf(f), 1)
          return
        }
      })
      this.createFileInput()
    },

    createFileInput() {
      const div = document.createElement('div')
      const nameInput = document.createElement('input')
      const label = document.createElement('label')
      const span = document.createElement('span')
      const fileInput = document.createElement('input')
      const index = this.newFileCounts

      div.className = 'my-1'

      nameInput.className = 'border pl-1 ml-3 w-5/12 bg-white'
      nameInput.disabled = true
      nameInput.type = 'text'
      nameInput.id = 'file' + index

      label.htmlFor = 'fileInput' + index

      span.className = 'border rounded-sm px-2'
      span.innerHTML = '파일 찾기'

      fileInput.className = 'pl-1 ml-3 w-full'
      fileInput.type = 'file'
      fileInput.id = 'fileInput' + index
      fileInput.name = 'file' + index
      fileInput.hidden = true
      fileInput.onchange = () => this.onFileChange(index)

      label.insertBefore(span, null)
      div.insertBefore(nameInput, null)
      div.insertBefore(label, null)
      div.insertBefore(fileInput, null)
      const parentDiv = document.getElementById('parentDiv')
      parentDiv.insertBefore(div, null)
      this.newFileCounts = this.newFileCounts + 1
    },
    submit() {
      if (!this.verify()) return
      const form = new FormData()
      const data = {
        writer: this.writer,
        title: this.title,
        password: this.password,
        content: this.content,
        fileNames: this.oldFiles.map((f) => {
          return f.fileName
        })
      }
      const dataJson = JSON.stringify(data)
      const blob = new Blob([dataJson], { type: 'application/json' })
      form.append('boardModifyDTO', blob)

      const fileOne = document.getElementById('fileInput1')
      const fileTwo = document.getElementById('fileInput2')
      const fileThree = document.getElementById('fileInput3')
      const fileList = [fileOne, fileTwo, fileThree]

      fileList.forEach((file) => {
        if (file !== undefined && file !== null) {
          form.append('files', file.files[0])
        }
      })

      axios
        .put(`/board/modify/${this.$route.params.id}`, form)
        .then(() => {
          alert('수정되었습니다.')
          this.$router.push({
            path: `/detail/${this.$route.params.id}`,
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
    }
  }
}
</script>

<template>
  <div>
    <div>
      <!-- 카테고리 -->
      <div class="flex border-y">
        <div class="bg-gray-100 w-2/12 py-1 pl-2">카테고리</div>
        <div class="py-1 w-9/12 pl-1">{{ category }}</div>
      </div>

      <!-- 등록 일시 -->
      <div class="flex border-y">
        <div class="bg-gray-100 w-2/12 py-1 pl-2">등록 일시</div>
        <div class="py-1 w-9/12 pl-1">{{ generationTimestamp }}</div>
      </div>

      <!-- 수정 일시 -->
      <div class="flex border-y">
        <div class="bg-gray-100 w-2/12 py-1 pl-2">수정 일시</div>
        <div class="py-1 w-9/12 pl-1">{{ modificationTimestamp }}</div>
      </div>

      <!-- 조회 수 -->
      <div class="flex border-y">
        <div class="bg-gray-100 w-2/12 py-1 pl-2">조회 수</div>
        <div class="py-1 w-9/12 pl-1">{{ views }}</div>
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
            v-model="writer"
          />
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
            v-model="password"
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
            v-model="title"
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
            v-model="content"
          ></textarea>
        </div>
      </div>

      <!-- 파일 첨부 -->
      <div class="flex border-b">
        <div class="bg-gray-100 w-2/12 py-1 pl-2">
          <span class="align-middle"> 파일 첨부 </span>
        </div>
        <div class="py-1 w-9/12" id="parentDiv">
          <!-- 기존 파일 예제-->
          <div class="my-1" :id="`fileDiv${file.index}`" v-for="file in oldFiles" :key="file.index">
            <input
              type="text"
              class="border pl-1 ml-3 w-5/12 bg-white"
              disabled
              :id="`oldFile${file.index}`"
              :value="file.fileName"
            />
            <a href="#" class="px-3 py-1 border" @click="downloadFile(file.fileName)">Download</a>
            <button class="px-2 py-1 border" id="fileBtnOne" @click="deleteFile(file.index)">
              X
            </button>
          </div>
          <!-- 새로운 파일 첨부 -->
          <div class="my-1" v-for="n in 3 - oldFileCounts" :key="n">
            <input type="text" class="border pl-1 ml-3 w-5/12 bg-white" disabled :id="`file${n}`" />
            <label :for="`fileInput${n}`">
              <span class="border founded-sm px-2">파일 찾기</span>
            </label>
            <input
              type="file"
              class="pl-1 ml-3 w-full"
              :id="`fileInput${n}`"
              name="file"
              hidden
              @change="onFileChange(n)"
            />
          </div>
        </div>
      </div>
    </div>
    <br />
    <div class="flex justify-between">
      <button
        type="button"
        class="px-5 rounded-sm border"
        @click="
          this.$router.push({
            path: `/detail/${this.$route.params.id}`,
            query: {
              startDate: this.$route.query.startDate,
              endDate: this.$route.query.endDate,
              category: this.$route.query.category,
              search: this.$route.query.search,
              page: this.$route.query.page
            }
          })
        "
      >
        취소
      </button>
      <button
        type="button"
        class="px-5 rounded-sm border bg-gray-100 hover:cursor-pointer"
        @click="submit"
      >
        저장
      </button>
    </div>
  </div>
</template>
