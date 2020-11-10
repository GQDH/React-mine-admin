// import {GET_DATAS_LIST} from './actionType.js'
const defaultState={
    pageTitle:sessionStorage.getItem('title')||'首页',
    tableList:[]
}

const reducer=(state=defaultState,action)=>{
    action=action || {type:''}
    switch (action.type){
        case  '2':
          console.log(action)
          return{
            ...state,
            pageTitle:action.title,
          };
        case  '4':
        console.log(action)
        return{
          ...state,
          tableList:action.tableList,
        };
        default:
          return  state
    }
}

export default reducer;