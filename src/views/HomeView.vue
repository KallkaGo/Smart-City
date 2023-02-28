<template>
  <Scene :eventList="eventList" />
  <Screen :dataInfo="dataInfo" :eventList="eventList" />
</template>

<script setup >
import gsap from 'gsap'
import { getSmartCityInfo, getSmartCityList } from '@/api/api'
import Scene from '@/components/Scene.vue'
import Screen from '@/components/Screen.vue'
const dataInfo = reactive({
  iot: { number: 0 },
  event: { number: 0 },
  power: { number: 0 },
  test: { number: 0 }
})

const eventList = ref([])

onMounted(() => {
  InitLeftDataInfo()
  InitRightDataInfo()
  setInterval(() => {
    InitLeftDataInfo()
    InitRightDataInfo()
  }, 10000)
})

const InitLeftDataInfo = async () => {
  const res = await getSmartCityInfo()
  // dataInfo.iot = res.data.data.iot
  // dataInfo.event = res.data.data.event
  // dataInfo.power = res.data.data.power
  // dataInfo.test = res.data.data.test
  for (let key in dataInfo) {
    dataInfo[key].name = res.data.data[key].name
    dataInfo[key].unit = res.data.data[key].unit
    gsap.to(dataInfo[key], {
      number: res.data.data[key].number,
      duration: 1,

    })
  }

}

const InitRightDataInfo = async () => {
  const res = await getSmartCityList()
  eventList.value = res.data.list
}


</script>

<style scoped></style>
