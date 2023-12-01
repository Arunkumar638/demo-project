"use client"

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Avatar from 'react-avatar';
import type { RadioChangeEvent } from "antd";
import DeleteUser from "@/components/deleteUserPopup";
import { getAllUser, deleteUser, editUser } from "@/actions/userAction";
import 'core-js-pure/stable/object/assign';
import Profilecard from '../../components/profilecard';
import { Space, Table, Button, Input, Radio, Cascader } from 'antd';
import EditPopupForm from "@/components/editPopup";
import styles from './users.module.css'
import type { ColumnsType } from 'antd/es/table';
import { Header } from "antd/es/layout/layout";

interface DataType {
    key: string;
    name: string;
    mail: number;
    gender: string;
    qualification: string;
  }
 
interface Option {
  value: string;
  label: string;
}
const users = () =>{
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState({});
  const [userMail, setUserMail] = useState("")
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isProfileCardOpen, setIsProfileCardOpen] = useState(false);
  const [isEditPopupVisible, setIsEditPopupVisible] = useState(false);
  const [gender, setGender] = useState("");
  const [defaultQualification, setDefaultQualification] = useState("");
  const [qualify, setQualify] = useState("");
  const [updatedDetails, setUpdatedDetails] = useState({
    id:"",
    name: "",
    gender: "",
    department: "",
  })
  const back = () =>{
    router.push('/');
  }
  const editUserData = (details: any) =>{
    details.gender = gender;
    details.department = qualify;
    editUser(details).then((data)=>{
      clear();
      setIsEditPopupVisible(false);
      alert(data.message);
      getAllUser().then((data)=>{
        setUsers(data);
      })
    })
    console.log(details);
  }
  const deleteSetup = (data: any) =>{
    setIsPopupVisible(true)
    setUserData(data._id);
  }
  const deleteUserData = (id:any) =>{
    setIsPopupVisible(false);
    const data = {"id":id}
    deleteUser(data).then((data)=>{
      alert(data.message);
      getAllUser().then((data)=>{
        setUsers(data);
      })
    });
  }
  const editSetup = (data: any) =>{
    setIsEditPopupVisible(true);
    const mail = data.email;
    setUserMail(mail);
    updatedDetails.id = data._id;
    updatedDetails.name = data.name;
    setGender(data.gender);
    setDefaultQualification(data.department);
  }
  const radioChange = (e: RadioChangeEvent) => {
    setGender(e.target.value);
  };
  const dropChange = (value: string[]) => {
    console.log(value[0]);
    setQualify(value[0]);
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUpdatedDetails({
      ...updatedDetails,
      [name]: value
    });
  };
  
  const handleToggleProfileCard = () => {
    setIsProfileCardOpen(!isProfileCardOpen);
  };

  const clear = () =>{
    setUpdatedDetails({
      id:'',
      name:'',
      gender:'',
      department:''
    })
  }
  const genderValue = {
    male: "Male",
    female: "Female",
  };

  const data: DataType[] = users;
  const displayRender = (labels: string[]) => labels[labels.length - 1];
  const options: Option[] = [
    {
      value: "B.sc",
      label: "B.sc",
    },
    {
      value: "BCA",
      label: "BCA",
    },
    {
      value: "B.com",
      label: "B.com",
    },
    {
      value: "M.sc",
      label: "M.sc",
    },
    {
      value: "MCA",
      label: "MCA",
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Department',
      key: 'department',
      dataIndex: 'department',
    },
    {
      title: 'Action',
      key: 'action',
      render: (details, record) => (
        <Space size="middle">
          <Button type="primary" onClick={()=>editSetup(details)}>Edit</Button>
          <Button type="primary" danger onClick={()=>deleteSetup(details)}>Delete</Button>
        </Space>
      ),
    },
  ];

  useEffect(()=>{
    getAllUser().then((data)=>{
      setUsers(data);
    }).catch((error)=>{
      console.error("Error:", error);
      if (error.response) {
        alert(error.response.data);
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
      }
    })
  },[])
    return(
        <div>
          <Header className={styles.header}>
            <Avatar src="./Assets/user.png" size="50" className={styles.avatar} onClick={handleToggleProfileCard}/>
            <Profilecard isOpen={isProfileCardOpen} onClose={handleToggleProfileCard} />     
         </Header>
         <Table columns={columns} dataSource={data} className="mt-4 z-0"/>       
         <Button type="primary" onClick={back} className={styles.button}>Back</Button>
         <DeleteUser trigger={isPopupVisible}>
        <h2 className={styles.headertext}>Are you Sure</h2>
        <br />
        <br />
        <Button onClick={()=>deleteUserData(userData)} type='primary' danger className={styles.yes}>
          Yes
        </Button>
        <Button onClick={() => setIsPopupVisible(false)} type='primary' danger className={styles.no}>
          No
        </Button>
      </DeleteUser>
      <EditPopupForm trigger={isEditPopupVisible}>
          <Avatar src='../Assets/savechanges.png' className={styles.save} round size='20' onClick={() => editUserData(updatedDetails)}/>
          <Avatar src='../Assets/clear.png' className={styles.clear} round size='20' onClick={clear}/>
          <Avatar src='../Assets/close.png' className={styles.close} round size='20' onClick={() => setIsEditPopupVisible(false)}/>

        <h2 className={styles.headertext1}>Enter Your Details</h2>
        <br />

        <label>Name</label>

        <div className={styles.input}>
          <Input
            placeholder='Name'
            type='text'
            onChange={handleChange}
            value={updatedDetails.name}
            name='name'
            required
          />
        </div>

        <label>Email</label>
        <div className={styles.input}>
          <Input
            placeholder='Email'
            type='text'
            onChange={handleChange}
            value={userMail}
            name='mail'
            contentEditable='false'
          />
        </div>

        <label>Gender</label>
        <div className={styles.input}>
          <div className={styles.in} />
          <Radio.Group
                onChange={radioChange}
                value={gender}
                name="gender"
                className={styles.radio}
              >
                <Radio value={genderValue.male}>Male</Radio>
                <Radio value={genderValue.female}>Female</Radio>
              </Radio.Group>
        </div>

        <label>Qualification</label>
        <div className={styles.input}>
          <div className={styles.in} />
          <Cascader
                options={options}
                className={styles.dropdown}
                placeholder="Qualification"
                expandTrigger="hover"
                displayRender={displayRender}
                onChange={dropChange}
                defaultValue={defaultQualification}
              />
        </div>
        <br />
      </EditPopupForm>
        </div>
    )
}

export default users;