'use client';

import React, { useEffect, useState } from 'react';
import { Card, Avatar, Button } from 'antd';
import styles from '../components/profilecard.module.css';
import { useRouter } from 'next/navigation';
import 'core-js-pure/stable/object/assign';
import { logoutUser, loginStatus } from '../actions/userAction';

const Profilecard = ({ isOpen, onClose }: any) => {
  const router = useRouter();
  const [userData, setUserData] = useState('');

  const getloginStatus = async () => {
    const token = localStorage.getItem('token');
    const data =  { token:token }
    loginStatus(data).then((data)=>{
        setUserData(data.email);
        // console.log(data);
    }).catch((error)=>{
        console.error("Error:", error);
        if (error.response) {
          alert(error.response.data);
          console.log("Response data:", error.response.data);
          console.log("Response status:", error.response.status);
        } 
  });
}

  const logout = () => {
    const token = localStorage.getItem('token');
    const data = {token:token}
    logoutUser(data).then((data)=>{
      localStorage.clear();
      router.push('/login');
    console.log(data.message);
      alert(data.message);
    })
  };

  useEffect(() => {
    getloginStatus();
  }, []);
  return (
    <Card className={`${styles.profileCard} ${isOpen ? styles.show : styles.hide}`} style={{ backgroundColor:'aliceblue' }}>
      <Avatar src='./Assets/user.png' size={80} className={styles.avatar} />
      <Avatar src='../Assets/close.png' className={styles.close} size={20} onClick={onClose} />
      {userData ? (
        <div className={styles.cardContent}>
          <h2>{userData}</h2>
        </div>
      ) : null}

      <Button onClick={logout} className={styles.closeButton}>
        Logout
      </Button>
    </Card>
  );
};

export default Profilecard;