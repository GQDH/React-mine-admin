import React ,{useState,useEffect}from 'react';
import { Space, Table,Card,Form,Select,Button, message } from 'antd';

import {getManageCityList,getCityList,addCities} from '../../utils/api'

function format (shijianchuo) {
    //shijianchuo是整数，否则要parseInt转换
    var time = new Date(+shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return y+'-'+m+'-'+d+' '+h+':'+mm+':'+s;
  }




const Cities = () => {
  

  
 const [data,setData]=useState({
       dataResource:[],
       columns: [
        {
          title: '城市',
          dataIndex: 'city',
          key: 'city',
        },
        {
          title: '用车模式',
          dataIndex: 'useCar',
          key: 'useCar',
          render: value => value === '1' ? '停车点' : '禁停区'
        },
        {
          title: '营运模式',
          dataIndex: 'operating',
          key: 'operating',
          render: value => value === '1' ? '自营' : '加盟'
        },
        {
          title: '城市管理员',
          dataIndex: 'admin',
          key: 'admin',
        },
        {
          title: '城市开通时间',
          dataIndex: 'openTime',
          key: 'openTime',
          render: value => format(value)
        },
        {
          title: '操作时间',
          dataIndex: 'handleTime',
          key: 'handleTime',
          render: value => format(value)
        }
      ],
      citiesList:[]
 });




//  获得城市管理列表
    const  getList=async (obj={})=> { 
        const res = await  getManageCityList(obj);
        console.log(res)
        if(res.status===0){
          let list =res.result;
        // map返回新数组
          list.map(item=>{
            // 给list里添加一项key
            return item.key=item._id
          })
        console.log(list)
          setData((data)=>{
            return {
                ...data,
                dataResource:list
            }
          })
        }

      }

      // 获得城市列表getCityList
         const getCities= async ()=>{
              const res= await getCityList();
              console.log(res)
              setData(()=>{
                return {
                  ...data,
                  citiesList:res.cts
                }
              })

         }

      // 新增城市管理
      const addctList=async  (obj)=>{
        const  res = await addCities(obj);
        if(res.status===0){
          message.success(res.msg);
          form.resetFields();
          setData(data=>{
            return{
              ...data,
            visible:false
            }
          })
        }
        getList();
      }

      // 提交查询
      const onFinish=values=>{
        getList(values)
      }

      // 重置查询

      const onReset=()=>{
        form.resetField();
        getList();
      }

      // 打开模态框
      const openModal=()=>{
        setData(data=>{
          return {
            ...data,
            visible:true
          }
        })
      }

    // 确认的回调
    const handleOk=()=>{
      // 获得form区域内的信息。
      const obj=form.getFieldsValue();
      obj.openTime=new Date(obj.openTime.format('YYYY/MM/DD')).getTime();
      obj.handleTime=new Date().getTime();

      addctList(obj);
    }

    // 关闭模态框
    const handleCancel= e =>{
      form.resetFields();
      setData(data=>{
        return {
          ...data,
          visible:false
        }
      })
    }

    useEffect(()=>{
        getList();
        getCities();
    })

    const [form] = Form.useForm();
    return (
        <Space direction="vertical" style={{width: '100%'}}>
             <Card>
        <Form 
        form={form} 
        name="horizontal_login" 
        layout="inline" 
        // onFinish 和  form  还有button的 htmlType.
        // 提交表单且数据验证成功后回调事件
        onFinish={onFinish}>

          {/* 选择城市 */}
          <Form.Item
            label="城市"
            // name的值要跟数据里的一样
            name="city"
          >
            <Select style={{ width: 120 }} placeholder="全部" allowClear>
              {
                data.citiesList.map(item => <Select.Option key={item.id} value={item.nm}>{item.nm}</Select.Option>)
              }
            </Select>
          </Form.Item>

          {/* 用车模式 */}
          <Form.Item
            label="用车模式"
            // name要跟数据里的 一样。
            name="useCar"
          >
            <Select 
            style={{ width: 120 }} 
            placeholder="全部" 
            // 允许清理全部。
            allowClear>
              {/* vaule值也必填 */}
              <Select.Option value="1">停车点</Select.Option>
              <Select.Option value="2">禁停区</Select.Option>
            </Select>
          </Form.Item>

          {/* 查询按钮 */}
          <Form.Item>
            <Button 
              type="primary" 
              style={{marginRight: '20px'}} 
              // 点击提交，获取到上面填写的信息，并提交。
              htmlType="submit"
            >查询</Button>
            <Button
              htmlType="reset"
              onClick={onReset}
            >重置</Button>
          </Form.Item>
        </Form>
      </Card>

            <Card title="动态数据渲染表格">
                <Table 
                bordered
                dataSource={data.dataResource} 
                columns={data.columns} 
                pagination={false}
                />
           </Card>
        </Space>
    );
}

export default Cities;