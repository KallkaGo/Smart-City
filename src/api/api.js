import axios from 'axios'

export function getSmartCityInfo(){
  return axios.get('https://mock.apifox.cn/m1/2333320-0-default/api/smartcity/info')
}

export function getSmartCityList(){
  return axios.get('https://mock.apifox.cn/m1/2333320-0-default/api/smartcity/list')
}