<script setup>
import { ref, onMounted, watch, toRefs } from "vue";
const { VITE_KAKAO_API_APP_KEY } = import.meta.env;

const container = ref(null);
const map = toRefs(null);
const point = ref(null);
const props = defineProps(["location"]);

const loadScript = () => {
  const script = document.createElement("script");
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${VITE_KAKAO_API_APP_KEY}&autoload=false`;
  script.onload = () => kakao.maps.load(createMap);

  document.head.appendChild(script);
};

onMounted(() => {
  if (window.kakao && window.kakao.maps) createMap();
  else loadScript();
});

const createMap = () => {
  const options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(35.153190063766246, 129.1246629317903), //지도의 중심좌표.
    level: 3, //지도의 레벨(확대, 축소 정도)
  };
  map.value = new kakao.maps.Map(container.value, options); //지도 생성 및 객체 리턴
};

watch(props.location, () => {
  if (point.value != null) point.value.setMap(null);
  var moveLatLon = new kakao.maps.LatLng(
    props.location.latitude,
    props.location.longitude
  );
  map.value.panTo(moveLatLon);
  point.value = new kakao.maps.Marker({
    position: moveLatLon,
  });
  point.value.setMap(map.value);
});
</script>

<template>
  <div ref="container" id="map"></div>
</template>

<style scoped>
#map {
  width: 100%;
  height: 100%;
}
</style>
