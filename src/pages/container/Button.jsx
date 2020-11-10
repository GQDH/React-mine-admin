import React ,{useState}from 'react';
import { Space, Button,Card,Radio } from 'antd';
import { PlusOutlined ,EditOutlined ,DeleteOutlined,RightOutlined,LeftOutlined,PoweroffOutlined,SearchOutlined,DownloadOutlined  } from '@ant-design/icons';
import './container.less';


const Buttons = () => {
  const [state,setState] =useState(true)

   const handleClick=()=>{
          setState(state=>{
              return !state
          })
   }


const [data,setData ]=useState({
    value:'',
    size:'small',
    val:1
})
 const  onChange = e => {
    if(e.target.value===2){
        setData({
            val: e.target.value,
            size:'middle'
          });
    }
    if(e.target.value===3){
        setData({
            val: e.target.value,
            size:'large'
          });
    }
    if(e.target.value===1){
        setData({
            val: e.target.value,
            size:'small'
          });
    }
  };
    return (
            <Space style={{width:"100%"}} direction="vertical">
                <Card title="基础按钮">
                    <Space>
                    <Button type="primary" >Primary Button</Button>
                    <Button danger>Default</Button>
                    <Button type="dashed" danger>Dashed</Button>
                    <Button type="primary" danger>Primary</Button>
                    <Button type="primary" disabled danger>禁用</Button>
                    </Space>
                </Card>

                <Card title="基础按钮">
                    <Space>
                    <Button icon={<PlusOutlined  />}>创建</Button>
                    <Button icon={<EditOutlined  />}>创建</Button>
                    <Button icon={<DeleteOutlined  />}>创建</Button>
                    <Button shape="circle" icon={<SearchOutlined />} />
                    <Button type="primary" icon={<SearchOutlined />}>搜索</Button>
                    <Button type="primary" icon={<DownloadOutlined />}>下载</Button>
                    </Space>
                </Card>

                <Card title="Loading按钮">
                    <Space>
                    <Button type="primary" loading={state}>确定</Button>
                    <Button type="primary" icon={<PoweroffOutlined />} loading={state} />
                    <Button type="primary" disabled loading={state}>点击加载</Button>
                    <Button type="primary" disabled loading={state}></Button>
                    <Button type="primary" onClick={handleClick}>关闭</Button>
                   
                    </Space>
                </Card>

                <Card title="按钮组">
                    <Space>
                    <Button type="primary" icon={<LeftOutlined />}>返回</Button>
                    <Button type="primary" icon={<RightOutlined />}>前进</Button>
                    </Space>
                </Card>

                <Card title="按钮尺寸">
                    <Space>
                    <Radio.Group onChange={onChange} value={data.val}>
                        <Radio value={1}>小</Radio>
                        <Radio value={2}>中</Radio>
                        <Radio value={3}>大</Radio>
                    </Radio.Group>
                    <Button type="primary" size={data.size}>Primary Button</Button>
                    <Button danger size={data.size}>Default</Button>
                    <Button type="dashed" danger size={data.size}>Dashed</Button>
                    </Space>
                </Card>
            </Space>
    );
}

export default Buttons;