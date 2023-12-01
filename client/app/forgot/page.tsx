"use client"

import { Card, Input, Button, Form } from "antd";
import styles from './forgot.module.css';
import { useRouter } from "next/navigation";
import { reset } from '../../actions/userAction';
import {
    MailOutlined,
    ReloadOutlined
  } from "@ant-design/icons";
  import { MdLockOutline } from "react-icons/md";
const forgotPage = () =>{
    const router = useRouter();
    const [form] = Form.useForm();
    const userRoute = () => {
        router.push("/login");
      };

    const onFinish = (values: any) => {
        reset(values).then((data)=>{
        alert(data.message);
        userRoute();
      }).catch((err)=>{
        console.log(err);
      })
      form.resetFields();
    };
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
      console.error('Form submission failed');
    };
    const validatePassword = async (_: any, value: any) => {
        const password = form.getFieldValue('password');
        if (password && value !== password) {
          throw new Error('Passwords do not match');
        }
      };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      password:'${label} is not a valid password!',
      name:'${label} is too long!'
    }
  };

    return(
    <div className={styles.main}>
      <Card className={styles.card}>
        <h3 className={styles.headertext}>Reset</h3>
            <Form
              name="login-form"
              onFinish={onFinish}
              form={form}
              className='mt-8'
              onFinishFailed={onFinishFailed}
              validateMessages={validateMessages}
              encType="multipart/form-data">
        
              <Form.Item name='email' rules={[{ type: 'email', required:true }]}>
                <Input className={styles.input} placeholder='Email' size='large' prefix={<MailOutlined/>}/>
              </Form.Item>
              <Form.Item name="password" rules={[{ required: true}]}>
                <Input.Password className={styles.input} placeholder='Password' size='large' prefix={<MdLockOutline/>}/>
              </Form.Item>
              <Form.Item name="confirmPassword" dependencies={['password']}
                  rules={[{ required: true },{ validator: validatePassword },]}>
                <Input.Password className={styles.input} placeholder='Confirm Password' size='large' prefix={<MdLockOutline/>}/>
              </Form.Item>
                <Form.Item wrapperCol={{ offset: 4 }}>
                <Button className={styles.button} 
                  htmlType="submit"
                  icon={<ReloadOutlined size={30}/>}>
                    Reset
                </Button>
              </Form.Item>
            </Form>
      </Card>
    </div>
)
}

export default forgotPage;