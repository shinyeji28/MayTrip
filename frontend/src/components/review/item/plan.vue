<script setup>
import { ref, defineProps, onMounted } from "vue";

const props = defineProps({
  plans: Object,
});

const days = ref([]);

const label = {
  '12': {
    name: '관광지',
    color: '#FFB6C1' // 연한 분홍색 (파스텔 톤)
  },
  '14': {
    name: '문화시설',
    color: '#FFD700' // 연한 금색 (파스텔 톤)
  },
  '15': {
    name: '축제공연행사',
    color: '#87CEEB' // 연한 하늘색 (파스텔 톤)
  },
  '25': {
    name: '여행코스',
    color: '#FFA07A' // 연한 주황색 (파스텔 톤)
  },
  '28': {
    name: '레포츠',
    color: '#AFEEEE' // 연한 옥색 (파스텔 톤)
  },
  '32': {
    name: '숙박',
    color: '#B0E0E6' // 연한 파란색 (파스텔 톤)
  },
  '38': {
    name: '쇼핑',
    color: '#FFDAB9' // 연한 주황-분홍색 (파스텔 톤)
  },
  '39': {
    name: '음식점',
    color: '#FFC0CB' // 연한 분홍색 (파스텔 톤)
  }
};

onMounted(async () => {
  days.value = props.plans.days;
});
</script>

<template>
  <section>
    <div v-for="(day, d) in days">
      <div class="day">{{ d+1 }}일차</div>
      <v-expansion-panels variant="inset" class="my-4">
        <v-expansion-panel
          v-for="(content, i) in day.details"
          :key="i"
          :title="content.attractionInfo.title"
          :text="content.attractionInfo.overview"
        >
          <template v-slot:title>
            <span class="label" 
              :style="{
                backgroundColor: label[content.attractionInfo.contentTypeId]?.color || 'transparent'
              }"
               v-if="label[content.attractionInfo.contentTypeId]">
              {{ label[content.attractionInfo.contentTypeId].name }}
            </span>
            {{ content.attractionInfo.title }}
          </template>
          <template v-slot:text>
            <div>
              <img :src="content.attractionInfo.firstImage" alt="content.attractionInfo.title" />
              <p>{{ content.attractionInfo.addr1 }}</p>
              <hr>
              <h3>관광지 설명</h3>
              <p>{{ content.attractionInfo.overview }}</p>
            </div>
          </template>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </section>
</template>

<style scoped>
section {
  padding-top: 20px;
}
img{
  border-radius: 5px;
  margin-bottom: 10px;
}
hr{
  margin: 13px auto;
}
.day{
  font-size: 15px;
  font-weight: 900;
}
.label{
  border-radius: 5px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 10px;
  font-weight: 900;
  margin-right: 10px;
}
</style>
