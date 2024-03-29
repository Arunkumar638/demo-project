"use client"

import { Card, Input, Button, Form } from "antd";
import styles from './login.module.css';
import { useRouter } from "next/navigation";
import { loginUser } from '../../actions/userAction';
import {
    MailOutlined,
    LoginOutlined
  } from "@ant-design/icons";
  import { MdLockOutline } from "react-icons/md";
const loginPage = () =>{
    const router = useRouter();
    const [form] = Form.useForm();
    const userRoute = () => {
        router.push("/users");
      };

    const onFinish = (values: any) => {

      loginUser(values).then((data)=>{
        if(data.status = "Succcess"){
          alert(data.message);
          userRoute();
          return;
        }
        localStorage.setItem('token',data.token);
        form.resetFields();
        userRoute();
      }).catch((err)=>{
        console.log(err);
      })
    };
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
      console.error('Form submission failed');
    };

    const navgot = ()=>{
      router.push('/forgot')
    }
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
        <h3 className={styles.headertext}>Login</h3>
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
              <button onClick={navgot} className={styles.button1}>Forgot Password?</button><br/>
                <Form.Item wrapperCol={{ offset: 4 }}>
                <Button className={styles.button} 
                  htmlType="submit"
                  icon={<LoginOutlined size={30}/>}>
                    Sign In
                </Button>
              </Form.Item>
            </Form>
      </Card>
    </div>
)
}

export default loginPage;