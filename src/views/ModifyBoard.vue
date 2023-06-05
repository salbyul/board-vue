<template>
  <div>
    <div>
      <!-- 카테고리 -->
      <div class="flex border-y">
        <div class="bg-gray-100 w-2/12 py-1 pl-2">카테고리</div>
        <div class="py-1 w-9/12 pl-1">가져온 카테고리</div>
      </div>

      <!-- 등록 일시 -->
      <div class="flex border-y">
        <div class="bg-gray-100 w-2/12 py-1 pl-2">등록 일시</div>
        <div class="py-1 w-9/12 pl-1">가져온 등록 일시</div>
      </div>

      <!-- 수정 일시 -->
      <div class="flex border-y">
        <div class="bg-gray-100 w-2/12 py-1 pl-2">수정 일시</div>
        <div class="py-1 w-9/12 pl-1">가져온 수정 일시</div>
      </div>

      <!-- 조회 수 -->
      <div class="flex border-y">
        <div class="bg-gray-100 w-2/12 py-1 pl-2">조회 수</div>
        <div class="py-1 w-9/12 pl-1">가져온 조회 수</div>
      </div>

      <!-- 작성자 -->
      <div class="flex border-b">
        <div class="bg-gray-100 w-2/12 py-1 pl-2">작성자</div>
        <div class="py-1 w-9/12">
          <input type="text" name="writer" class="border pl-1 ml-3 w-44" id="writer" />
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
          />
        </div>
      </div>

      <!-- 제목 -->
      <div class="flex border-b">
        <div class="bg-gray-100 w-2/12 py-1 pl-2">제목</div>
        <div class="py-1 w-9/12">
          <input type="text" name="title" class="border pl-1 ml-3 w-full" id="title" />
        </div>
      </div>

      <!-- 내용 -->
      <div class="flex border-b">
        <div class="bg-gray-100 w-2/12 py-1 pl-2">
          <span class="align-middle">내용</span>
        </div>
        <div class="py-1 w-9/12">
          <textarea class="resize-none w-full border pl-1 ml-3 h-32" name="content" id="content">
가져온 내용</textarea
          >
        </div>
      </div>

      <!-- 파일 첨부 -->
      <div class="flex border-b">
        <div class="bg-gray-100 w-2/12 py-1 pl-2">
          <span class="align-middle"> 파일 첨부 </span>
        </div>
        <div class="py-1 w-9/12" id="parentDiv">
          <!-- 기존 파일 예제-->
          <div class="my-1" id="fileDivOne">
            <input
              type="text"
              class="border pl-1 ml-3 w-5/12 bg-white"
              disabled
              id="oldFileOne"
              value="파일 이름"
            />
            <a href="#" class="px-3 py-1 border">Download</a>
            <button class="px-2 py-1 border" id="fileBtnOne" onclick="deleteFile(One)">X</button>
          </div>
          <!-- 새로운 파일 첨부 -->
          <div class="my-1">
            <input type="text" class="border pl-1 ml-3 w-5/12 bg-white" disabled id="fileIndex" />
            <label for="fileInputIndex">
              <span class="border founded-sm px-2">파일 찾기</span>
            </label>
            <input
              type="file"
              class="pl-1 ml-3 w-full"
              id="fileInputIndex"
              name="file"
              hidden
              onchange="onFileChange(Index)"
            />
          </div>
        </div>
      </div>
    </div>
    <br />
    <div class="flex justify-between">
      <button type="button" class="px-5 rounded-sm border">취소</button>
      <button type="button" class="px-5 rounded-sm border bg-gray-100 hover:cursor-pointer">
        저장
      </button>
    </div>
  </div>
</template>
