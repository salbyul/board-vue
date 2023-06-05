<template>
  <div class="h-screen">
    <!-- 제목 -->
    <div class="border-b-2 pb-3 mb-3">
      <dlv class="flex justify-between text-sm text-gray-600 mb-5">
        <div>작성자</div>
        <div>등록일시 NNNN-NN-NN 수정일시 NNNN-NN-NN</div>
      </dlv>
      <div class="flex justify-between text-gray-700">
        <div class="flex">
          <div class="mr-4">카테고리</div>
          <div>제목</div>
        </div>
        <div>조회수: N</div>
      </div>
    </div>

    <!-- 내용 -->
    <div class="mb-3">
      <div class="border pl-1 whitespace-pre-wrap">내용</div>

      <!-- 파일 -->
      <div>
        <a href="#">파일이름</a>
      </div>
    </div>

    <!-- 댓글 -->
    <div class="border-b pb-2 bg-gray-50 px-1">
      <div>
        <div class="border-b-2 pb-2 mb-2">
          <div class="flex justify-between text-gray-600 text-xs">
            <div class="pl-3">작성자</div>
            <div class="pr-3">등록 일시</div>
          </div>
          <div class="pl-3">내용</div>
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
      <button class="px-3 py-1 border rounded-sm bg-gray-100">목록</button>
      <button class="px-3 py-1 border rounded-sm">수정</button>
      <button class="px-3 py-1 border rounded-sm">삭제</button>
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
    />
    <br />
    <div class="flex justify-evenly my-10">
      <button type="button" class="bg-gray-100 px-3 py-1">취소</button>
      <button type="button" class="bg-gray-100 px-3 py-1">확인</button>
    </div>
  </div>
  <div
    class="border fixed z-10 w-3/12 text-center top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 shadow-md bg-gray-50 invisible"
    id="deletePopup"
  >
    <h1 class="my-10">비밀번호 입력</h1>
    <input
      type="password"
      placeholder="비밀번호를 입력해주세요."
      class="pl-1 border w-5/12"
      name="password"
    />
    <br />
    <div class="flex justify-evenly my-10">
      <button type="button" class="bg-gray-100 px-3 py-1">취소</button>
      <button type="button" class="bg-gray-100 px-3 py-1">확인</button>
    </div>
  </div>
</template>
