<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { usePlanStore } from "@/stores/plan";
import { storeToRefs } from "pinia";
import { listSido, listGugun } from "@/api/sidoGugun";
import { getAllBySidoGugunContentTypeApi, getDescriptionByContentIdApi, getByKeyWord } from "@/api/attraction";

const route = useRoute();
const planStore = usePlanStore();
const { crew, plan } = storeToRefs(planStore);

const selectForm = ref({
  sido: 0,
  gugun: 0,
  contentType: 0,
});
const sido = ref([]);
const gugun = ref([]);
const searchForm = ref({
  key: "",
  word: "",
});
const searchSetting = ref({
  loading: false,
  loaded: false,
});
const list = ref([]);
const dialog = ref(false);
const dialogDetail = ref({});

const clickSearch = async () => {
  searchSetting.value.loading = true;
  const {data} = await getByKeyWord(searchForm.value);
  if(data.length > 300) list.value = data.slice(0, 300);
  else list.value = data;
  searchSetting.value.loading = false;
  searchSetting.value.loaded = true;
  //setTimeout(() => {
  //}, 2000);
};

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

const clickDetail = async (contentId) => {
  list.value.forEach((info) => {
    if(info.contentId == contentId) {
      dialogDetail.value = info;
      return false;
    }
  });
  const {data} = await getDescriptionByContentIdApi(contentId);
  dialogDetail.value.overview = data.overview;
  dialog.value = true;
  console.log(dialogDetail.value);
}

watch(
  () => selectForm.value.sido,
  () => {
    getGugun();
  }
);


watch(
  () => [selectForm.value.sido, selectForm.value.gugun, selectForm.value.contentType],
  async () => {
    const {data} = await getAllBySidoGugunContentTypeApi(selectForm.value);
    if(data.length > 300) list.value = data.slice(0, 300);
    else list.value = data;
  }
);

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
                @click:append-inner="clickSearch"
              ></v-text-field>
            </v-card-text>
          </v-col>
        </v-row>
      </div>
      <div class="col center">
        <v-virtual-scroll :items="list" width="500" height="500">
          <template v-slot:default="{ item }">
            <v-card
            width="320"
            class="mx-auto mb-2"
          >
              <div class="d-flex flex-no-wrap justify-flex-start">
                <v-avatar
                class="ma-2"
                size="100"
                  rounded="0"
                >
                  <v-img :src="item.firstImage!=''?item.firstImage: item.firstImage2"></v-img>
                </v-avatar>
                <div>
                  <v-card-title class="text-h20">
                    {{item.title}}
                  </v-card-title>
  
                  <v-card-subtitle>{{item.addr1}}</v-card-subtitle>
  
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
          <v-dialog
            v-model="dialog"
            persistent
            width="1024"
          >
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
                        :src="dialogDetail.firstImage!=''?dialogDetail.firstImage:dialogDetail.firstImage2"
                      ></v-img>
                    </v-col>
                    <v-col cols="12">
                      <v-card-title>{{dialogDetail.title}}</v-card-title>
                      <v-card-subtitle>
                        <span class="me-1">{{dialogDetail.addr1}} {{(dialogDetail.addr2)}} - {{ dialogDetail.zipcode }}</span>
                      </v-card-subtitle>
                    </v-col>
                  </v-row>
                  <v-row
                    align="center"
                    class="mx-4"
                  >
                  <v-icon icon="mdi-phone-incoming" color="warning" size="small"></v-icon>
                    <div class="text-grey ms-2">
                      {{ dialogDetail.tel =="" ? "등록된 번호가 없습니다." : dialogDetail.tel }}
                    </div>
                  </v-row>
                  <v-row
                    align="center"
                    class="mx-4"
                  >
                  <v-icon icon="mdi-eye" color="warning" size="small"></v-icon>
                    <div class="text-grey ms-2">
                      {{ dialogDetail.readcount }}
                    </div>
                  </v-row>
                  <v-row class="mx-1">
                    <v-card-text>{{dialogDetail.overview}}</v-card-text>
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
  </div>
</template>

<style scoped>
.container {
  width: 400px;
  border-right: 1px solid lightgray;
  padding: 30px 20px;
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
