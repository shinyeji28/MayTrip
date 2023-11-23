<script setup>
import { ref, onMounted } from "vue";
import { getCrewListApi } from "@/api/crew";

onMounted(() => {
  getCrewList();
});
const crewlist = ref([]);

const getCrewList = async () => {
  const { data } = await getCrewListApi();
  crewlist.value = data;
  console.log(crewlist.value);
};
</script>

<template>
  <v-btn
    v-if="crewlist.length == 0"
    variant="plain"
    @click="router.push({ name: 'board-list' })"
  >
    크루에 참여하여 메이트들과 함께 여행을 만들어보세요!
  </v-btn>
  <v-card width="800">
    <v-data-iterator :items="crewlist" >
      <template v-slot:default="{ items }">
        <v-container class="pa-2" fluid>
          <v-row dense>
            <v-col v-for="crew in items" :key="crew.id" cols="auto" md="4">
              <v-card class="pb-3" border flat >
                <img 
                  :src="crew.raw.board.thumbnailInfo? crew.raw.board.thumbnailInfo.url : '/src/assets/banner.png'"
                  alt="thumbnail"
                />

                <v-list-item
                  class="mb-2"
                  :subtitle="
                    crew.raw.board.sidoName + ' ' + crew.raw.board.gugunName
                  "
                >
                  <template v-slot:title>
                    <strong class="text-h6 mb-2">{{
                      crew.raw.crewName
                    }}</strong>
                  </template>
                </v-list-item>

                <div class="d-flex justify-space-between px-4">
                  <div
                    class="d-flex align-center text-caption text-medium-emphasis me-1"
                  >
                    <div class="text-truncate">
                      {{ crew.raw.board.startDate }} ~
                      {{ crew.raw.board.endDate }}
                    </div>
                  </div>

                  <router-link
                    :to="{
                      name: 'crew-detail',
                      params: { crewId: crew.raw.id },
                    }"
                    ><v-btn
                      border
                      flat
                      size="small"
                      class="text-none"
                      text="Read"
                    >
                    </v-btn
                  ></router-link>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </v-data-iterator>
  </v-card>
</template>

<style scoped></style>
