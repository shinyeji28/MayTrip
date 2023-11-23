<script setup>
import { ref, onMounted, watch, toRefs } from "vue";
const { VITE_KAKAO_API_APP_KEY } = import.meta.env;

const container = ref(null);
const map = toRefs(null);
const point = ref(null);
const details = ref([]);
const props = defineProps(["location", "dayDetails"]);

const loadScript = () => {
  const script = document.createElement("script");
  script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${VITE_KAKAO_API_APP_KEY}&autoload=false`;
  script.onload = () => kakao.maps.load(createMap);

  document.head.appendChild(script);
};

onMounted(() => {
  if (window.kakao && window.kakao.maps) createMap();
  else {
    loadScript();
  }
});

const createMap = () => {
  const options = {
    //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(35.153190063766246, 129.1246629317903), //지도의 중심좌표.
    level: 3, //지도의 레벨(확대, 축소 정도)
  };
  map.value = new kakao.maps.Map(container.value, options); //지도 생성 및 객체 리턴

  changeLocation();
  changeDetails();
};

watch(props.location, () => {
  if (!window.kakao || !window.kakao.maps) return;
  console.log("location  변경");
  changeLocation();
});

const changeLocation = () => {
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
  map.value.setLevel(3);
};

watch(
  () => props.dayDetails,
  () => {
    if (!window.kakao || !window.kakao.maps) return;
    if (point.value != null) point.value.setMap(null);
    console.log("마크 생성하기");
    changeDetails();
    if (props.dayDetails.length > 0) {
      var moveLatLon = new kakao.maps.LatLng(
        props.dayDetails[0].attractionInfo.latitude,
        props.dayDetails[0].attractionInfo.longitude
      );
      map.value.panTo(moveLatLon);
    }
    map.value.setLevel(6);
  }
);

const changeDetails = () => {
  details.value.forEach((p) => {
    p.setMap(null);
  });
  props.dayDetails.forEach((p) => {
    var moveLatLon = new kakao.maps.LatLng(
      p.attractionInfo.latitude,
      p.attractionInfo.longitude
    );
    var marker = new kakao.maps.Marker({
      position: moveLatLon,
    });
    marker.setMap(map.value);
    details.value.push(marker);
  });
};
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
