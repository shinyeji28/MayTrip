<script setup></script>

<template>
  <div class="main">
    <img src="@/assets/main.png" alt="" id="img-main" />
    <div class="list-container">
      <h2>이런 여행은 어때?</h2>
      <div>
        <ul>
          <li><img src="@/assets/main.png" alt="" class="img-commended" /></li>
          <li><img src="@/assets/main.png" alt="" class="img-commended" /></li>
          <li><img src="@/assets/main.png" alt="" class="img-commended" /></li>
        </ul>
        <div class="next-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 384 512"
          >
            <path
              d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="list-container">
      <h2>지금 모집 중인 크루원</h2>
      <div></div>
    </div>
  </div>
</template>

<style>
.main {
  display: flex;
  flex-direction: column;
}
#img-main {
  height: 1090.25px;
}
.list-container {
  height: 1000px;
  padding: 200px;
}
.list-container > div {
  display: flex;
  flex-direction: row;
  margin-top: 100px;
}

ul {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.img-commended {
  width: 400px;
  height: 400px;
  opacity: 70%;
  border-radius: 20px;
}
svg {
  fill: #ffffff;
}
.next-btn {
  width: 50px;
  background-color: lightgray;
  text-align: center;
  align-items: center;
}
</style>
