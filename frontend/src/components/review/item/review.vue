<script setup>
import { ref, defineProps, onMounted } from "vue";

const props = defineProps({
  review: Object,
});

const review = ref({});

onMounted(async () => {
  review.value = props.review;
});
</script>

<template>
  <v-container>
    <v-card class="pa-8">
      <v-card-title class="headline mb-6 text">{{ review.title }}</v-card-title>

      <v-card-text class="body-1 text">{{ review.content }}</v-card-text>

      <v-row>
        <v-col
          v-for="(photo, idx) in review.images"
          :key="idx"
          cols="12"
          lg="4"
        >
          <v-hover v-slot:default="{ hover }">
            <v-card :elevation="hover ? 12 : 2" class="pa-2">
              <v-img :src="photo.url" class="transition-img" contain></v-img>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<style scoped>
.transition-img {
  transition: transform 0.3s ease-in-out;
}

.transition-img:hover {
  transform: scale(1.1);
}
.text {
  font-weight: 700;
}
</style>
