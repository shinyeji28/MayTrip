<script setup>
import { ref, defineProps, onMounted } from "vue";

const props = defineProps({
  plans: Object,
});

const days = ref([]);

onMounted(async () => {
  days.value = props.plans.days;
});
</script>

<template>
  <section>
    <div v-for="(day, d) in days">
      <div class="text-subtitle-2 mt-4 mb-2">{{ d + 1 }}일차</div>
      <v-expansion-panels variant="inset" class="my-4">
        <v-expansion-panel
          v-for="(content, i) in day.details"
          :key="i"
          title="d"
          text="content.attractionInfo.title"
        ></v-expansion-panel>
      </v-expansion-panels>
    </div>
  </section>
</template>

<style scoped>
section {
  padding-top: 20px;
}
</style>
