import { post, get } from './request' //导入封装的post请求方式
export const getTbDate=(data)=>post('/sug?code=utf-8&q=vivo',data);
export const getLocalShops=(data)=>get(`/th/Shops/SelectShopList?LatBegin=${data.lat}&LngBegin=${data.lng}&Province=湖北省&city=武汉市&district=${data.dis}&pageIndex=${data.pageIndex}&serviceType=${data.shop}&shopClassification=${data.serviceType}&sort=${data.sort}&vehicleId=VE-LHG-AVANCIER&isMatchRegion=0&isOpenLive=false&pageSize=10&pids=`)
export const getProvince=(data)=>post('th//Addresses/SelectAreas',data);
export const getRegion=(data)=>get(`/th/Shops/SelectShopListArea?cityId=&isOpenLive=false&city=${data.city}&province=%E5%8C%97%E4%BA%AC%E5%B8%82&serviceType=0&pids=&vehicleId=VE-LHG-AVANCIER&shopClassification=`);
export const getService=(data)=>get('/th/Shops/SelectShopPropertyV2?channel=ios');