// import {GET_DEAT_LIST,GET_DATAS_LIST} from './actionType.js'
import {  put, takeEvery,call} from 'redux-saga/effects'
import {getPrimaryTableList} from '../utils/api.js'

function* changeTitle(action) {
  //  put是saga对Redux中dispatch方法的一个封装,用来触发reducer中的数据更新。
  // put是saga对Redux中dispatch方法的一个封装，调用put方法后，saga内部会分发action通知Store更新state。
      yield put({type:'2', title:action.title});

      const tableList = yield call(getPrimaryTableList(), '/tableList');
      console.log(tableList);
      yield put({type:'4', tableList:tableList});
  
}


function* mySaga() {
    //  takeEvery:
    //  用来监听action，每个action都触发一次，如果其对应是异步操作的话，每次都发起异步请求，而不论上次的请求是否返回。
  yield takeEvery('1', changeTitle);
  yield takeEvery('3',changeTitle);
}


export default mySaga;