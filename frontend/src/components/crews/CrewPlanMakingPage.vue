<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { usePlanStore } from "@/stores/plan";
import { storeToRefs } from "pinia";
import { listSido, listGugun } from "@/api/sidoGugun";
import {
  getAllBySidoGugunContentTypeApi,
  getDescriptionByContentIdApi,
  getByKeyWord,
  getByContentId,
} from "@/api/attraction";
import crewPlanMapPage from "@/components/crews/CrewPlanMapPage.vue";

const planStore = usePlanStore();
const { insertDetail, deleteDetail } = planStore;
const { crew, plan } = storeToRefs(planStore);
console.log("plan : ", plan.value);
const selectForm = ref({
  // 시도, 구군, 콘텐츠 타입 선택 정보
  sido: 0,
  gugun: 0,
  contentType: 0,
});
const sido = ref([]); // 시도 리스트
const gugun = ref([]); // 구군 리스트
const searchForm = ref({
  // 검색어 입력 폼 정보
  key: "",
  word: "",
});
const searchSetting = ref({
  // 검색어 입력 관련 설정
  loading: false,
  loaded: false,
});
const list = ref([]); // 검색 목록
const dialog = ref(false); // 상세 보기 토글
const dialogDetail = ref({}); // 상세보기 정보
const location = ref({
  // 선택된 장소 위치
  latitude: 0.0,
  longitude: 0.0,
});
const selectedDay = ref(plan.value.days[0].dayId);
const dayList = ref(plan.value.days[0].details);

/** 검색 조건 관련 */
const getSido = async () => {
  try {
    const { data } = await listSido();
    sido.value = data;
  } catch (error) {
    console.log(error);
  }
};

const getGugun = async () => {
  try {
    const { data } = await listGugun(selectForm.value.sido);
    gugun.value = data;
  } catch (error) {
    console.log(error);
  }
};

const clickSearch = async () => {
  // 키워드 검색
  searchSetting.value.loading = true;
  console.log("조건 검색 : ", searchForm.value);
  const { data } = await getByKeyWord(searchForm.value);
  if (data.length > 300) list.value = data.slice(0, 300);
  else list.value = data;
  searchSetting.value.loading = false;
  searchSetting.value.loaded = true;
};

watch(
  () => selectForm.value.sido,
  () => {
    getGugun();
  }
);

watch(
  () => [
    selectForm.value.sido,
    selectForm.value.gugun,
    selectForm.value.contentType,
  ],
  async () => {
    const { data } = await getAllBySidoGugunContentTypeApi(selectForm.value);
    if (data.length > 300) list.value = data.slice(0, 300);
    else list.value = data;
    console.log("검색됨! - 리스트 길이 : ", list.value.length);
  }
);

/** 클릭 이벤트 */
const clickDetail = async (contentId) => {
  try {
    const response = await getByContentId(contentId);
    dialogDetail.value = response.data;
    const { data } = await getDescriptionByContentIdApi(contentId);
    dialogDetail.value.overview = data.overview;
    dialog.value = true;
  } catch (error) {
    console.log(error);
  }
};

const clickAdd = async (contentId) => {
  const data = {
    contentId,
    dayId: selectedDay.value,
    priority: dayList.value.length + 1,
  };
  console.log("추가 버튼 클릭!!", data);
  await insertDetail(data);
  updateDayList();
};

const clickRemove = async (detailId) => {
  console.log("삭제 버튼 클릭!!");
  await deleteDetail(detailId);
  updateDayList();
};

const clickItem = async (lat, lon) => {
  console.log("아이템 클릭 : ", lat, lon);
  location.value.latitude = lat;
  location.value.longitude = lon;
};

const clickDay = async (dayId) => {
  selectedDay.value = dayId;
  updateDayList();
};

const updateDayList = () => {
  plan.value.days.forEach((day) => {
    if (day.dayId == selectedDay.value) {
      dayList.value = day.details;
      return false;
    }
  });
};

onMounted(() => {
  getSido();
});
</script>

<template>
  <div class="row">
    <div class="container col">
      <div class="row">
        <v-row>
          <v-col cols="4">
            <v-select
              label="시도"
              :items="sido"
              item-title="sidoName"
              item-value="sidoCode"
              variant="underlined"
              v-model="selectForm.sido"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-select
              label="구군"
              :items="gugun"
              item-title="gugunName"
              item-value="gugunCode"
              variant="underlined"
              v-model="selectForm.gugun"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-select
              label="유형"
              :items="[
                { title: '관광지', code: 12 },
                { title: '문화시설', code: 14 },
                { title: '축제공연행사', code: 15 },
                { title: '여행코스', code: 25 },
                { title: '레포츠', code: 28 },
                { title: '숙박', code: 32 },
                { title: '쇼핑', code: 38 },
                { title: '음식점', code: 39 },
              ]"
              item-title="title"
              item-value="code"
              variant="underlined"
              v-model="selectForm.contentType"
            ></v-select>
          </v-col>
        </v-row>
      </div>
      <div class="row margin-10">
        <v-row>
          <v-col cols="4">
            <v-select
              label="검색조건"
              :items="[
                { title: '관광지명', key: 'title' },
                { title: '주소', key: 'address' },
              ]"
              item-title="title"
              item-value="key"
              variant="underlined"
              v-model="searchForm.key"
            ></v-select>
          </v-col>
          <v-col cols="8">
            <v-card-text class="mx-auto" max-width="400">
              <v-text-field
                :loading="searchSetting.loading"
                density="compact"
                variant="solo"
                label="Search"
                append-inner-icon="mdi-magnify"
                single-line
                hide-details
                v-model="searchForm.word"
                @click:append-inner="clickSearch"
              ></v-text-field>
            </v-card-text>
          </v-col>
        </v-row>
      </div>
      <div class="col center">
        <!-- <RecycleScroller
          class="scroll"
          :items="list"
          :item-size="30"
          key-field="contentId"
          v-slot="{ item }"
        >
          <div class="user">
            {{ item.title }}
          </div>
        </RecycleScroller> -->
        <v-virtual-scroll :items="list" width="500" height="700" class="scroll">
          <template v-slot:default="{ item }">
            <v-card
              width="350"
              class="mx-1 mb-2 item"
              @click="clickItem(item.latitude, item.longitude)"
            >
              <div class="d-flex flex-no-wrap justify-flex-start">
                <v-avatar class="ma-2" size="100" rounded="0">
                  <v-img
                    :src="
                      item.firstImage != '' ? item.firstImage : item.firstImage2
                    "
                  ></v-img>
                </v-avatar>
                <div>
                  <v-card-title class="text-h20">
                    {{ item.title }}
                  </v-card-title>

                  <v-card-subtitle>{{ item.addr1 }}</v-card-subtitle>

                  <v-card-actions>
                    <v-btn
                      size="small"
                      variant="text"
                      density="comfortable"
                      @click="clickDetail(item.contentId)"
                    >
                      상세보기
                    </v-btn>
                    <v-btn
                      size="small"
                      variant="outlined"
                      density="comfortable"
                      @click="clickAdd(item.contentId)"
                    >
                      add
                    </v-btn>
                  </v-card-actions>
                </div>
              </div>
            </v-card>
          </template>
        </v-virtual-scroll>

        <v-row justify="center">
          <v-dialog v-model="dialog" persistent width="1024">
            <v-card>
              <v-card-title>
                <span class="text-h5">Detail</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-img
                        cover
                        height="250"
                        :src="
                          dialogDetail.attractionInfo.firstImage != ''
                            ? dialogDetail.attractionInfo.firstImage
                            : dialogDetail.attractionInfo.firstImage2
                        "
                      ></v-img>
                    </v-col>
                    <v-col cols="12">
                      <v-card-title>{{
                        dialogDetail.attractionInfo.title
                      }}</v-card-title>
                      <v-card-subtitle>
                        <span class="me-1"
                          >{{ dialogDetail.attractionInfo.addr1 }}
                          {{ dialogDetail.attractionInfo.addr2 }} -
                          {{ dialogDetail.attractionInfo.zipcode }}</span
                        >
                      </v-card-subtitle>
                    </v-col>
                  </v-row>
                  <v-row align="center" class="mx-4">
                    <v-icon
                      icon="mdi-phone-incoming"
                      color="warning"
                      size="small"
                    ></v-icon>
                    <div class="text-grey ms-2">
                      {{
                        dialogDetail.attractionInfo.tel == ""
                          ? "등록된 번호가 없습니다."
                          : dialogDetail.attractionInfo.tel
                      }}
                    </div>
                  </v-row>
                  <v-row align="center" class="mx-4">
                    <v-icon
                      icon="mdi-eye"
                      color="warning"
                      size="small"
                    ></v-icon>
                    <div class="text-grey ms-2">
                      {{ dialogDetail.attractionInfo.readcount }}
                    </div>
                  </v-row>
                  <v-row class="mx-1">
                    <v-card-text>{{ dialogDetail.overview }}</v-card-text>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="dialog = false"
                >
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
    </div>
    <div class="map">
      <crewPlanMapPage :location="location"></crewPlanMapPage>
    </div>
    <div class="day-side">
      <v-list-item title="Days" subtitle="여행일"></v-list-item>
      <v-divider></v-divider>
      <v-list-item
        v-for="day in plan.days"
        :key="day.dayId"
        link
        :title="day.day + '일자'"
        @click="clickDay(day.dayId)"
      ></v-list-item>
    </div>
    <div class="col margin-30">
      <v-virtual-scroll
        :items="dayList"
        width="400"
        height="700"
        class="scroll"
      >
        <template v-slot:default="{ item }">
          <v-card
            width="400"
            class="mx-1 mb-2 item"
            @click="
              clickItem(
                item.attractionInfo.latitude,
                item.attractionInfo.longitude
              )
            "
          >
            <div class="d-flex flex-no-wrap justify-flex-start">
              <v-avatar class="ma-2" size="100" rounded="0">
                <v-img
                  :src="
                    item.attractionInfo.firstImage != ''
                      ? item.attractionInfo.firstImage
                      : item.attractionInfo.firstImage2
                  "
                ></v-img>
              </v-avatar>
              <div>
                <v-card-title class="text-h20">
                  {{ item.attractionInfo.title }}
                </v-card-title>

                <v-card-subtitle>{{
                  item.attractionInfo.addr1
                }}</v-card-subtitle>

                <v-card-actions>
                  <v-btn
                    size="small"
                    variant="text"
                    density="comfortable"
                    @click="clickDetail(item.attractionInfo.contentId)"
                  >
                    상세보기
                  </v-btn>
                  <v-btn
                    size="small"
                    variant="outlined"
                    density="comfortable"
                    @click="clickRemove(item.detailId)"
                  >
                    remove
                  </v-btn>
                </v-card-actions>
              </div>
            </div>
          </v-card>
        </template>
      </v-virtual-scroll>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 400px;
  border-right: 1px solid lightgray;
  padding: 30px 20px;
}
.map {
  width: 50vw;
  border-right: 1px solid lightgray;
}
.scroll {
  height: 100%;
}
.scroll::-webkit-scrollbar {
  display: none;
}
.item {
  height: 30%;
  padding: 0 12px;
  display: flex;
  align-items: center;
}
.day-side {
  width: 100px;
  border-right: 1px solid lightgray;
}

.row {
  display: flex;
  flex-direction: row;
}
.col {
  display: flex;
  flex-direction: column;
}
.right {
  justify-content: flex-end;
  align-items: center;
}
.center {
  justify-content: center;
  align-items: center;
}
.left {
  justify-content: center;
  align-items: flex-start;
}
.scroll {
  overflow: auto;
  height: 700px;
}
.margin-60 {
  margin: 60px 60px;
}

.margin-30 {
  margin: 30px 0px;
}

.mt-30 {
  margin-top: 30px;
}
.mt-60 {
  margin-top: 60px;
}

.margin-10 {
  margin: 10px;
}

.text-2 {
  font-size: xx-large;
  font-weight: 800;
  color: white;
}

.text-3 {
  font-size: large;
  font-weight: 500;
  color: white;
}

.text-4 {
  font-size: small;
  font-weight: 800;
  color: black;
}
</style>