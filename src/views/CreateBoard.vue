<template>
  <div>
    <div>
      <div class="flex border-y">
        <div class="bg-gray-100 w-2/12 py-1 pl-2">카테고리</div>
        <div class="py-1 w-9/12">
          <select name="category" class="border ml-3 w-44" id="category">
            <option value="null">카테고리 선택</option>
            <!-- 카테고리 목록 가져와야 됨 -->
          </select>
        </div>
      </div>

      <!-- 작성자 -->
      <div class="flex border-b">
        <div class="bg-gray-100 w-2/12 py-1 pl-2">작성자</div>
        <div class="py-1 w-9/12">
          <input type="text" name="writer" class="border pl-1 ml-3 w-44" id="writer" />
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
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          class="border pl-1 ml-3 w-44"
          id="passwordVerify"
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
            onchange="onFileChange(1)"
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
            onchange="onFileChange(2)"
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
            onchange="onFileChange(3)"
          />
        </div>
      </div>
    </div>
  </div>
  <br />
  <div class="flex justify-between">
    <button class="px-5 rounded-sm border">취소</button>
    <button type="button" class="px-5 rounded-sm border bg-gray-100 hover:cursor-pointer">
      저장
    </button>
  </div>
</template>

<script></script>
