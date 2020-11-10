import http from './http';
import obj from '../assets/js/admin.js';

// 天气接口
export const getWea = (params) => http.get(`https://v0.yiketianqi.com/api?version=v61&appid=${obj.appId}&appsecret=${obj.appsecret}`, params)

// 照片墙
export const getPicList = (params) => http.get('/pics/list', params)


// 初级列表数据
export const getPrimaryTableList = (params) => http.get('/tables/basic/list', params)


export const delPrimaryTableList = (params) => http.post('/tables/basic/delete', params)

// 城市列表
export const getCityList = (params) => http.get('/cities/list', params)

// 城市管理列表
export const getManageCityList = (params) => http.post('/cities/manage/list', params)

export const addCities = (params) => http.post('/cities/manage/add', params)