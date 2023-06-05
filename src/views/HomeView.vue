<script></script>
<template>
  <div class="mb-5">
    <!-- 전체 Input 파라미터에서 기본 값 가져와야 됨 -->
    <div class="py-1 text-center">
      등록일
      <input type="date" name="startDate" class="border mx-7" id="startDate" />
      <input type="date" name="endDate" class="border mx-7" id="endDate" />
      <select name="category" class="border p-1" id="category">
        <option value="all">전체 카테고리</option>
        <!-- 카테고리 목록 들어와야 됨 -->
      </select>
      <input
        type="text"
        placeholder="검색어를 입력하세요. (제목 + 작성자 + 내용)"
        name="search"
        class="border pl-2 w-5/12"
        id="search"
      />
      <button
        type="button"
        class="border rounded-sm bg-gray-100 px-5 duration-300 hover:duration-300 hover:bg-gray-200 hover:cursor-pointer"
      >
        검색
      </button>
    </div>
    <div>
      <!-- 몇 건인지 가져와야 됨 -->
      <div class="ml-3 mt-3">총 N건</div>
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
            <!-- 글 목록 가져와야 됨 -->
          </tbody>
        </table>
      </div>
    </div>
    <br />
    <!-- 페이지네이션 섹션 -->
    <div class="flex justify-end">
      <!-- 등록 페이지 이동 구현 -->
      <button
        type="button"
        class="px-5 bg-gray-200 rounded-sm duration-300 hover:duration-300 hover:bg-gray-300"
      >
        등록
      </button>
    </div>
  </div>
</template>
