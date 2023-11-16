<script setup>
import { ref, computed, defineProps, defineEmits } from "vue";
const props = defineProps({
  items: Array,
  page: Number,
  perPage: Number,
});

const emit = defineEmits(["pageChange"]);
const page = ref(props.page);
const items = ref(props.items);
const perPage = ref(props.perPage);

function onPageChange(pg) {
  emit("pageChange", pg);
}

const paginatedItems = computed(() => {
  const startIndex = (page.value - 1) * perPage.value;
  const endIndex = startIndex + perPage.value;
  return items.value.slice(startIndex, endIndex);
});

const totalPages = computed(() => {
  return Math.ceil(items.value.length / perPage.value);
});

function updatePage(newPage) {
  page.value = newPage;
}
</script>

<template>
  <div>
    <v-container>
      <v-row>
        <v-col
          v-for="(item, index) in paginatedItems"
          :key="index"
          cols="12"
          sm="6"
          md="4"
          lg="4"
        >
          <v-card class="card" width="310" height="300" title="모집 글 제목">
            <v-img :src="item.src"></v-img>

            <template v-slot:subtitle>{{ item.subtitle }}</template>

            <template v-slot:text> 간략 설명 </template>
          </v-card>
        </v-col>
      </v-row>

      <!-- 페이지네이션 -->
      <v-pagination
        v-model="page"
        :length="totalPages"
        @input="updatePage"
        rounded="circle"
      ></v-pagination>
    </v-container>
  </div>
</template>

<style scoped>
.card {
  /* width: calc(33.3% - 10px); */
  margin-bottom: 30px;
  margin-right: 35px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-sizing: border-box;
  transition: transform 0.3s ease;
}
.card:hover {
  transform: translateY(15px);
  opacity: 0.3;
}
</style>
