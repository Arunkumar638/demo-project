"use client";

import { Button, Card, Col, Input } from "antd";
import { Upload, Radio, notification, Modal, Form, Select } from "antd";
import { useState } from "react";
import { MdLockOutline } from "react-icons/md";
import { MailOutlined, SolutionOutlined, AuditOutlined, PlusOutlined } from "@ant-design/icons";
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { useRouter } from "next/navigation";
import { save } from "../actions/userAction";
import styles from "./styles.module.css";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

// type NotificationType = "success" | "info" | "warning" | "error";
export default function Home() {
  const router = useRouter();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const [form] = Form.useForm();

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };
  const handleImageChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>{
    setFileList(newFileList);
    console.log(fileList);
  }

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
  const onFinish = (values: any) => {
    const uploadedFile = fileList[0];
    values.image =  uploadedFile.originFileObj;
    console.log("values", values);
    save(values).then((data)=>{
      alert(data.message);
      console.log(data);
    }).catch((err)=>{
      console.log(err);
    })
    // form.resetFields();
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      password:'${label} is not a valid password!',
      name:'${label} is too long!'
    }
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <div>
      <main className={styles.main}>
        <Card className={styles.card}>
          <h3 className={styles.headertext}>Register</h3>
          <Form
              name="nest-messages"
              onFinish={onFinish}
              form={form}
              className='mt-8'
              onFinishFailed={onFinishFailed}
              validateMessages={validateMessages}
              encType="multipart/form-data"
            >
              <Form.Item name='name' rules={[{ required: true }]}>
                <Input className={styles.input} placeholder='Name' size='large' prefix={<SolutionOutlined/>}/>
              </Form.Item>
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
              <Form.Item name='gender' label="Gender"  style={{ marginLeft:'1.5rem' }} rules={[{ required: true}]}>
                <Radio.Group className='mr-10'>
                  <Radio value="Male"> Male </Radio>
                  <Radio value="Female"> Female </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="Department" name="department" style={{ marginLeft:'1.5rem' }} rules={[{ required: true}]}>
                <Select style={{ width:120, marginRight:'5rem'}}>
                  <Select.Option value="mca">MCA</Select.Option>
                  <Select.Option value="bca">BCA</Select.Option>
                  <Select.Option value="m.sc">M.sc</Select.Option>
                  <Select.Option value="b.sc">B.sc</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Upload" valuePropName="fileList" style={{ marginLeft:'2rem' }}>
                <div className='mr-20'>
                  <Upload
                  action="https://localhost:3000/uploads"
                  listType="picture-card"
                  fileList={fileList || []} 
                  maxCount={1}                
                  name='uploadImage'
                  accept="image/*"
                  onPreview={handlePreview}
                  onChange={handleImageChange}
                  >
                    {fileList.length == 1 ? null : uploadButton}
                  </Upload>
                  <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                  </Modal>
                  </div>
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 4 }}>
                <Button type="primary" htmlType="submit" icon={<AuditOutlined/>} className={styles.button}>
                  Register
                </Button>
              </Form.Item>
            </Form>
        </Card>
      </main>   
  </div>
  );
}
