<template>
  <div id="Screen">
    <div class="header">智慧城市管理平台
      <div class="tips">Tips:按R重置摄像机位置</div>
    </div>

    <div class="main">
      <div class="left">
        <div class="cityEvent" v-for="(item, idnex) in props.dataInfo">
          <h3>
            <span>{{ item.name }}</span>
          </h3>
          <h1>
            <img src="@/assets/bg/bar.svg" alt="" class="icon">
            <span>{{ toFixInit(item.number) }}({{ item.unit }})</span>
          </h1>
          <div class="footerBorder"></div>
        </div>
      </div>
      <div class="right">
        <div class="cityEvent">
          <h3>
            <span>事件列表</span>
          </h3>
          <ul>
            <li v-for="(item, index) in props.eventList" :class="{ active: currentActive === index }"
              @click="toggleEvent(index)">
              <h1>
                <div>
                  <img class="icon" :src="imgs[item.name]" alt="">
                  <span>{{ item.name }}</span>
                </div>
                <span class="time">{{ item.time }}</span>
              </h1>
              <p class="itemType">{{ item.type }}</p>
            </li>
          </ul>
          <div class="footerBorder"></div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup >
import eventBus from '@/utils/eventBus'

const props = defineProps(['dataInfo', 'eventList'])

const currentActive = ref(null)

eventBus.on('spriteClick', (data) => {

  currentActive.value = data.index
})

const imgs = {
  "电力": require('@/assets/bg/dianli.svg'),
  "火警": require('@/assets/bg/fire.svg'),
  "治安": require('@/assets/bg/jingcha.svg')
}


const toFixInit = (number) => {
  return number.toFixed(0)
}

const toggleEvent = (index) => {
  currentActive.value = index
  eventBus.emit('toggle', index)
}

window.addEventListener('keydown', (e) => {
  if (e.code == 'KeyR') {
    eventBus.emit('reset')
  }
})

watch(() => props.eventList, (newVal, oldVal) => {
  currentActive.value = null
})
</script>

<style scoped>
#Screen {
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 100;
}

.header {
  width: 19.2rem;
  height: 1rem;
  background-image: url('@/assets/bg/title.png');
  background-size: cover;
  background-position: center;
  text-align: center;
  color: rgb(226, 226, 255);
  font-size: 0.4rem;
}

.main {
  display: flex;
  flex: 1;
  justify-content: space-between;
}

.left {
  width: 400px;
  background-image: url('@/assets/bg/line_img.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.1rem 0;

}

.right {
  width: 400px;
  background-image: url('@/assets/bg/line_img.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: left center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.1rem 0;
  pointer-events: auto;
  cursor: pointer;
}

.cityEvent {
  width: 350px;
  margin-bottom: 0.1rem;
  background-image: url('@/assets/bg/bg_img03.png');
  position: relative;
}

.cityEvent::before {
  width: 0.4rem;
  height: 0.4rem;
  position: absolute;
  top: 0;
  left: 0;
  border-left: 4px solid rgb(34, 133, 247);
  border-top: 4px solid rgb(34, 133, 247);
  content: '';
}

.cityEvent::after {
  width: 0.4rem;
  height: 0.4rem;
  position: absolute;
  right: 0;
  top: 0;
  border-right: 4px solid rgb(34, 133, 247);
  border-top: 4px solid rgb(34, 133, 247);
  content: '';
}

.footerBorder {
  height: 0.4rem;
}

.footerBorder::before {

  width: 40px;
  height: 40px;
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  border-left: 4px solid rgb(34, 133, 247);
  border-bottom: 4px solid rgb(34, 133, 247);
}

.footerBorder::after {

  width: 40px;
  height: 40px;
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  border-right: 4px solid rgb(34, 133, 247);
  border-bottom: 4px solid rgb(34, 133, 247);
}

.icon {
  width: 40px;
  height: 40px;
}

h1 {
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 0.3rem 0.2rem;
  justify-content: space-between;
  font-size: 0.3rem;
}

h1 span.time {
  font-size: 0.2rem;
  font-weight: normal;
}

h3 {
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0.3rem 0.3rem;
}

h1>div {
  display: flex;
  align-items: center;
}

.itemType {
  color: #fff;
  font-size: 0.2rem;
  padding: 0rem 0.1rem 0.1rem;
  text-align: center;
}

.cityEvent li.active h1 {
  color: red;
}

.cityEvent li.active p {
  color: red;
}

ul,
li {
  list-style: none;
}

.tips {
  text-align: center;
  color: #fff;
  font-size: 0.2rem;
}</style>
