"use client"

import { Card, Input, Col, Button } from "antd";
import styles from './login.module.css';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from '../../actions/userAction';
import {
    EyeInvisibleOutlined,
    EyeTwoTone,
    MailOutlined,
    LoginOutlined
  } from "@ant-design/icons";
  import { MdLockOutline } from "react-icons/md";
const loginPage = () =>{
    const router = useRouter();
    const [details, setDetails] = useState({
        mail: "",
        password: ""

    });
    const [emptyDetails, setEmptyDetails] = useState({
        mail: "",
        password: "",
        
      });
      const [isMail, setIsMail] = useState(false);
      const [isValidPassword, setIsValidPassword] = useState(true);
      const [isValidMail, setIsValidMail] = useState(true);
      const [isPassword, setIsPassword] = useState(false);
    const userRoute = () => {
        router.push("/users");
      };
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setDetails({
          ...details,
          [name]: value,
        });
    };
    const handleLogin = (e: any) => {
        e.preventDefault();
        if(validateForm()){
        loginUser(details).then((data)=>{
        console.log(data);
         alert(data.message);
         localStorage.setItem('token',data.token);
         userRoute();
        })
          clear();
    }
}
    const clear = () => {
        setDetails({      
            mail: "",
            password: "",   
        });
    };
    const validateForm = () => {
        let valid = true;
        const newErrors = { ...emptyDetails };
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isMailValid = emailRegex.test(details.mail);
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const isPasswordValid = passwordRegex.test(details.password);
    
        if (details.mail.trim() === '') {
          setIsMail(true);
          valid = false;
        } 
    
        if (details.password.trim() === '') {
          setIsPassword(true);
          valid = false;
        } 

        if(details.mail != '' && !isMailValid){
          setIsValidMail(false);
          valid = false;
        }
    
        if(details.password != '' && !isPasswordValid){
          setIsValidPassword(false);
          valid = false;
        }
        setEmptyDetails(newErrors);
        console.log(valid);
        return valid;
      };
    return(
    <div className={styles.main}>
      <Card className={styles.card}>
        <h3 className={styles.headertext}>Login</h3>
        <Col className={styles.align}>
            <Input
                placeholder="Mail"
                size="large"
                name="mail"
                onChange={handleChange}
                value={details.mail}
                prefix={<MailOutlined />}
                className={styles.input}
              />
               {isMail && (
                <div className={styles.validationText}>
                  <span>Mail is required</span>
                </div>
              )}
              {!isValidMail && (
                <div className={styles.validationText}>
                  <span>Not a Valid Mail</span>
                </div>
              )}
              <Input.Password
                className={styles.input}
                size="large"
                value={details.password}
                prefix={<MdLockOutline />}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
              {isPassword && (
                <div className={styles.validationText}>
                  <span>Password is required</span>
                </div>
              )}
              {!isValidPassword && (
                <div className={styles.validationText}>
                  <span>Password is weak</span>
                </div>
              )}
              <Button className={styles.button} 
              onClick={handleLogin} 
              icon={<LoginOutlined size={30}/>}>
                Sign In
                </Button>
        </Col>
      </Card>
    </div>
)
}

export default loginPage;