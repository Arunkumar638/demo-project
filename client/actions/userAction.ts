import axios from "axios";

const baseUrl = 'http://localhost:8000';

export const save = async (data:any) => {
  
  console.log("My Data",data);
  return axios({
    method: "post",
    url: `${baseUrl}/register`,
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    },
    data: data,
    timeout: 5000, 
  })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error);
      if (error.response) {
        alert(error.response.data);
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
      }
    });
};

export const loginUser = async (data: any) => {

  return axios({
    method: "post",
    url: `${baseUrl}/login`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data: data,
    timeout: 5000, // Set a timeout of 5 seconds (adjust as needed)
  })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error);
      if (error.response) {
        alert(error.response.data);
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
      }
    });
};
export const editUser = async (data: any) => {

  return axios({
    method: "put",
    url: `${baseUrl}/update`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data: data,
    timeout: 5000, // Set a timeout of 5 seconds (adjust as needed)
  })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error);
      if (error.response) {
        alert(error.response.data);
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
      }
    });
};

export const reset = async (data:any) => {

  return axios({
    method: "put",
    url: `${baseUrl}/reset`,
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    },
    data: data,
    timeout: 5000, 
  })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error);
      if (error.response) {
        alert(error.response.data);
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
      }
    });
};

export const deleteUser = async (data: { 'id':{ id:String } }) => {

  return axios({
    method: "delete",
    url: `${baseUrl}/delete`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data: data,
    timeout: 5000, // Set a timeout of 5 seconds (adjust as needed)
  })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error);
      if (error.response) {
        alert(error.response.data);
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
      }
    });
};

export const getAllUser = async () => {
  return axios({
    method: "get",
    url: `${baseUrl}/getalluser`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    timeout: 5000, // Set a timeout of 5 seconds (adjust as needed)
  })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error);
      if (error.response) {
        alert(error.response.data);
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
      }
    });
};

export const loginStatus = async (data:{ token:String | null }) => {
  return axios({
    method: "post",
    url: `${baseUrl}/login-status`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data:data,
    timeout: 5000, // Set a timeout of 5 seconds (adjust as needed)
  })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error);
      if (error.response) {
        alert(error.response.data);
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
      }
    });
};

export const logoutUser = (data:{token:String | null}) =>{
  return axios({
    method: "delete",
    url: `${baseUrl}/logout`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data:data,
    timeout: 5000, // Set a timeout of 5 seconds (adjust as needed)
  })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error);
      if (error.response) {
        alert(error.response.data);
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
      }
    });
};
