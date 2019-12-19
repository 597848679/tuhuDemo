import {getProvince} from '@/http/api.js';

let Area=[];
let HotCities=[];
let CityList=[];
let CityListSort={};
function checkInArr(cache){
    for(let i=0;i<CityList.length;i++){
        if(CityList[i].CityId==cache.CityId){
            return false
        }
    }
    return true
}
async function getList(){
    let result =await getProvince();
    Area=result.Area;
    HotCities=result.HotCities;
    Object.keys(Area).map((i,n)=>{
        let arr=[]
        Area[i].map((item,index)=>{
            let cache={
                Province:item.Province,
                ProvinceId:item.ProvinceId,
                City:item.City,
                CityId:item.CityId
            }
            if(checkInArr(cache)){
                CityList.push(cache);
                arr.push(cache);
            }
            
        })
        CityListSort[i]=arr;
    })
}
getList();
export {Area,HotCities,CityListSort}