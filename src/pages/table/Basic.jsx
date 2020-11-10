import React, { useEffect,useState,useCallback } from 'react';
import { Space, Table,Card,Divider ,Modal,Button } from 'antd';
import {getPrimaryTableList,delPrimaryTableList} from '@/utils/api.js'
import { ExclamationCircleOutlined } from '@ant-design/icons';

// delPrimaryTableList

  const dataSource= [
            {
              id: '0',
              name: 'jack',
              state:'咸鱼一条',
              likes:'游泳',
              birthday:'2000-01-01',
              time:'09:00',
              address: '西湖区湖底公园1号',
              key:'1'
            },
            {
                id: '1',
                name: 'Tom',
                state:'咸鱼一条',
                likes:'游泳',
                birthday:'2000-01-01',
                time:'09:00',
                address: '西湖区湖底公园1号',
                key:'2'
            },
            {
                id: '2',
                name: 'Lily',
                state:'咸鱼一条',
                likes:'游泳',
                birthday:'2000-01-01',
                time:'09:00',
                address: '西湖区湖底公园1号',
                // 必须带key不然会报错
                key:'3'
            },
          ]

          const columns = [
            {
              title: 'id',
              dataIndex: 'id',
               //有唯一的dataIndex 的话，可以不要key
              key:'id'
            },
            {
              title: '名字',
              dataIndex: 'name',
              key:'name'
            },
            {
              title: '状态',
                 //dataIndex必须和上面的数据源，
              dataIndex: 'state',
              key:'name'
            },
            {
                title: '喜好',
                dataIndex: 'likes',
                key:'name'
              },
              {
                title: '生日',
                dataIndex: 'birthday',
                key:'name'
              },
              {
                title: '早起时间',
                dataIndex: 'time',
                key:'name'
              },
              {
                title: '地址',
                dataIndex: 'address',
                key:'name'
              },
          ];


  const Basic = () => {
    // const tableList=useSelector(state=>state.result);
    // const dispatch=useDispatch();

    const [content,setContent]=useState({
      dataSource1:[],
      columns1:[
        {
          title: 'id',
          dataIndex: 'id',
          key:'id'
        },
        {
          title: '用户名',
          dataIndex: 'userName',
          key:'userName'
        },
        {
          title: '性别',
          dataIndex: 'sex',
          key:'sex',
          // 写一个组件来判断，男女
          render:value =>value === 1 ? '男' : '女'
        },
        {
          title: '状态',
          dataIndex: 'state',
          key:'state',
          // 写一个组件来判断多个不同的情况，获取不同的数据
          render:value =>{
               let obj={
                1: '咸鱼一条',	
                2: '风华浪子',	 
                3: '北大才子', 
                4: '百度FE', 
                5: '创业者'
               }
            return obj[value]
          }
        },
    ],
    // 每条数据都得有个key值，react规定的
    keys:[],
    keys2:[],
    names:[],
    // 分页数据
    pagination:{}
    })

    // useCallback存一个记忆函数，如果依赖的数据没改变的话，则不会重新渲染
  //  请求数据函数
  // 设置默认条数
    const  getAsyncTableList=useCallback(async (page=1)=> {

      const res = await  getPrimaryTableList({page:page});
        console.log(res);

        if(res.status===0){
          const list=res.result;
          const total=res.total
          list.forEach(item=>{
            // 为数据的每一个元素都加上一个key值，
            return  item.key=item._id
          })
          setContent(content => {
            return {
              ...content,
              dataSource1:list,
              // pagination属性用来做分页。
              pagination:{
                total:total,
                // 显示总条数
                showTotal:(total)=> `总共${total}条数据`,
                // 开启跳转
                showQuickJumper:true,
                // onChange
                onChange(page,pageSize){
                  getAsyncTableList(page);
                }

              }
            }}
          )
        }
      
    },[])


    // 删除数据函数
    const delList=()=>{ 
      let arr=[];
      content.keys2.forEach(item=>{
        // 给后端传递 删除项的 id
        arr.push(delPrimaryTableList({id:item}));
      })

       // 多选时，要保证所选的数据都删除了，才重新渲染
      Promise.all(arr).then(()=>{
        // 重新渲染
        getAsyncTableList()
      })
    }

    // 点击删除按钮，删除数据
    function delData(){
      console.log(content.names.join())
      Modal.confirm({
        title: '你确定删除这些信息吗？',
        icon: <ExclamationCircleOutlined />,
        content: content.names.join(),
        okText: '确认',
        cancelText: '取消',
        onOk(){
          delList();
        },
        onCancel(){
             console.log('cancel')
        }

      });

    }
      // 在useEffect  Hooks 中执行请求数据的函数，用来请求数据
    useEffect(()=>{
      getAsyncTableList(); 
    },[getAsyncTableList])

    


      return (
       <Space direction="vertical" style={{width: '100%'}}>
         <Card title="基础表格">
         <Table 
          bordered
          dataSource={dataSource} 
          columns={columns} 
          pagination={false}
        />
         </Card>

         <Card title="动态数据渲染表格">
         <Table 
          bordered
          dataSource={content.dataSource1} 
          columns={content.columns1} 
          pagination={false}
        />
         </Card>

      <Card title="Mock-单选">
      <Divider />
      <Table
        bordered
        pagination={false}
        dataSource={content.dataSource1} 
        columns={content.columns1} 
        // 表格行是否可选择
        rowSelection={{
          type: 'radio',
          // 指定选中项的 key 数组，需要和 onChange （这里是onRow）进行配合
          selectedRowKeys:content.keys,
          onChange(selectedRowKeys, selectedRows){
                console.log(selectedRowKeys,selectedRows);
          },

        }}
      //  设置行属性,直接点击行就可以选中了，但点击前面的圆点就选不了了
        onRow={record => {
          return {
            onClick: () => {
              console.log(record)
              setContent(()=>{
                return {
                  ...content,
                  // keys 为数组，所以要用[]括起来
                  keys:[record.key]
                }
              })
              Modal.info({
                title: '查看信息',
                content: (
                  <div>
                    <p>{record.userName}</p>
                  </div>  
                )
              })
            }
          };
         }}
      />
         </Card>



         <Card title="Mock-多选删除"> 
         <Button type="primary" onClick={delData}>多选删除</Button>
              <Table
                bordered
                pagination={false}
                dataSource={content.dataSource1} 
                columns={content.columns1} 
                // 表格行是否可选择
                rowSelection={{
                  type: 'checkbox',
                  // 指定选中项的 key 数组，需要和 onChange （这里是onRow）进行配合
                  selectedRowKeys:content.keys2,
                  // 选中项的信息。
                  onChange(selectedRowKeys, selectedRows){

                    const newArr=[];
                    selectedRows.map(item=>{
                     return newArr.push(item.userName)
                    })
                        // console.log(selectedRowKeys,selectedRows);
                        setContent(content=>{
                          return {
                            ...content,
                            keys2:selectedRowKeys,
                            names:newArr
                          }
                        })
                  },

                }}
              />
        </Card>
        
        
        <Card title="Mock-表格分页"> 
         <Button type="primary" onClick={delData}>多选删除</Button>
              <Table
                bordered
                dataSource={content.dataSource1} 
                columns={content.columns1} 
                pagination={content.pagination}
              />
        </Card>
       </Space>
      );
  }
  
  export default Basic;
  
 
  