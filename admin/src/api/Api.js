import axios from "axios";

export const Myserver = axios.create({
  baseURL: "http://localhost:8080",
});

// add food
export const addFood = async (data) => await Myserver.post("/food/add", data,{
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

//get orders
export const getOrder = async (data) =>
  await Myserver.get(`/user/userOrder`,{
    params: { userId: data },
  });

  export const orderChanges=async( orderId, status, time )=>await Myserver.post('/Restro/modifyOrder',{
    orderId: orderId,
    status: status,
    time: time
  })