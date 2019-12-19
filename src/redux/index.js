
import { createStore,applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
function counter(state={}, action) {
    const count = state.count
    switch (action.type) {
        case 'increase':
            return { ...state,count: count + 1 }
        case 'publicup':
            return {
                ...state,
                publicnum:action.list
            }
        case 'changecity':
            return {
                ...state,
                initPlace:action.item,
                showCityAlert:!state.showCityAlert
            }
        case 'toggleshowcityalert':
            return {
                ...state,
                showCityAlert:!state.showCityAlert
            }
        case 'setInitPlace':
            return{
                ...state,
                initPlace:action.obj
            }
        case 'setServiceType':
            return {
                ...state,
                serviceType:action.str
            }
        case 'setSort':
            return {
                ...state,
                sort:action.str
            }
        case 'setShopType':
            return {
                ...state,
                checkShopType:action.obj
            }
        default:
            return state
    }
  }
const store = createStore(counter,{
    count:0,
    publicnum:[0],
    showCityAlert:false,
    initPlace:{
        City:"阿坝藏族羌族自治州",
        CityId:2362,
        Province:"四川省",
        ProvinceId:23
    },
    serviceType:'',
    sort:'HuShi',
    checkShopType:{setShopType:'0',Name:'全部门店'},//默认选择全部门店
},applyMiddleware(thunk));
export default store;
