import React, {useState} from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Card, 
  Form, 
  Input, 
  Button, 
  Radio, 
  InputNumber, 
  Select,
  DatePicker,
  Upload,
  message,
  Switch
} from 'antd';
import moment from 'moment';


// 定义左边文字占5，右边输入框占12
const formItemLayout = {
  labelCol: {span: 5},
  wrapperCol: { span: 12 }
};

// 定义一个格式，年/月/日
const dateFormat = 'YYYY/MM/DD';


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

// 对传上来的图片进行处理
function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

const Register = () => {
  const [data, setData] = useState({
    loading: false,
    imageUrl: ''
  })

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setData({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        // this.setState({
        //   imageUrl,
        //   loading: false,
        // }),
        setData({
          imageUrl,
          loading: false,
        })
      );
    }
  };

  // const onFinish = (values) => {
  //   console.log('Finish:', values);
  // };


//   fieldsValue是下面的表单数据，
  const onFinish = (fieldsValue) => {
    console.log(fieldsValue);
    const values = {
      ...fieldsValue,
    //   将fieldsValue下的birthday转化为YYYY-MM-DD格式
      'birthday': fieldsValue['birthday'].format('YYYY-MM-DD'),
    //   将true或false转化为1或0
      'ismerry': fieldsValue['ismerry'] ? '1' : '0'
    };
    console.log('Received values of form: ', values);
  }

  const { loading, imageUrl } = data;
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div>
      <Card title="注册表单">
      <Form 
        {...formItemLayout} 
        name="form" 
        onFinish={onFinish}
        // 初始值
        initialValues={{
          age: 20,
          status: '3',
          likes: ['1', '4'],
          birthday: moment('2015/01/01', dateFormat)
        }}
      >
        <Form.Item
          label="用户名"
          name="username"
          // rules={[{ required: true, message: '用户名不能为空' }]}
        >
          <Input placeholder="清输入用户名"/>
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          // rules={[{ required: true, message: '密码不能为空' }]}
        >
          <Input.Password placeholder="密码" />
        </Form.Item>

        <Form.Item
          label="性别"
          name="sex"
        >
          <Radio.Group>
            <Radio value={1}>男</Radio>
            <Radio value={0}>女</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="年龄"
          name="age"
        >
          <InputNumber min={18} max={100} />
        </Form.Item>

        <Form.Item
          label="当前状态"
          name="status"
        >
          <Select>
            <Select.Option value="1">未婚</Select.Option>
            <Select.Option value="2">已婚</Select.Option>
            <Select.Option value="3" disabled>离异</Select.Option>
            <Select.Option value="4">丧偶</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="爱好"
          name="likes"
        >
          <Select mode="multiple">
            <Select.Option value="1">唱</Select.Option>
            <Select.Option value="2">跳</Select.Option>
            <Select.Option value="3" disabled>rap</Select.Option>
            <Select.Option value="4">🏀</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="birthday" label="生日">
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="生日"
          name="avatar"
        >
          <Upload
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            fileList={[]}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
        </Form.Item>

        <Form.Item
          label="是否已婚"
          name="ismerry"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item
          wrapperCol={{ span: 12, offset: 5 }}
        >
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
      </Card>
    </div>
  );
}

export default Register;