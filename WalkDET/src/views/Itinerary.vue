<template>
  <div class="itinerary">
    <Header/>
    <div id="itinerary-page">
      <ItineraryTable />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import ItineraryTable from "@/components/ItineraryTable.vue";

export default {
  components: {
    Header,
    ItineraryTable
  }
};
</script>

<style>
#itinerary-page {
  /* background-image: url("assets/detroitMap.jpg"); */
  background-image: url("../assets/detroitMap.jpg");
  background-color: rgba(225, 243, 242, 0.9);
  background-blend-mode: lighten;
  background-attachment: fixed;
  background-position: center center;
  background-repeat: repeat-y;
  background-size: 100%;
  padding-bottom: 300px;
  /* height: 100vh; */
  /* background-color: rgba(255, 255, 255, 0.85); */
}
</style>