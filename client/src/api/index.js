import axios from "axios";

export const MYDB = axios.create({
  baseURL: " http://localhost:8080",
});

export const UserSignUp = async (data) => await MYDB.post("/user/signup", data);
export const UserSignIn = async (data) => await MYDB.post("/user/signin", data);

//products
export const getAllProducts = async (filter) =>
  await MYDB.get(`/food?${filter}`);

export const getProductDetails = async (id,restroId) => await MYDB.get(`/food/${id}/${restroId}`);

//Cart

export const getCart = async ({ uid }) =>
  await MYDB.get(`/user/getallcartItem`, {
    params: { userId: uid },
  });

// add to cart
// done
export const addToCart = async ({ pid, uid, qun }) =>
  await MYDB.post(`/user/addcart`, {
    productId: pid,
    userId: uid,
    quantity: qun,
  });

// delete from cart
//done
export const deleteFromCart = async ({ pid, uid, qun }) =>
  await MYDB.patch(`/user/RemovecartItem`, {
    productId: pid,
    quantity: qun,
    Id: uid,
  });

//favorites
export const getFavourite = async ({ uid, pid }) =>
  await MYDB.get(`/user/getfav`, {
    params: { userId: uid },
  });

// add to fav
export const addToFavourite = async ({ uid, pid }) =>
  await MYDB.post(`/user/addfav`, { userId: uid, productId: pid });

//deletefromfav
export const deleteFromFavourite = async ({ pid, uid }) =>
  await MYDB.patch(`/user/removefav`, { productId: pid, userId: uid });

//Orders
export const order = async (data) => await MYDB.post(`/user/order`, data);

//get orders
export const getOrders = async (data) =>
  await MYDB.get(`/user/userOrder?userId=${data}`);

// verify user
export const VerfiUser = async (token) => {
  return await MYDB.post(
    "/user/verify",
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

// get category
export const getCategory = async () =>
  await MYDB.get("/category/getAllcategory");

// Restarant
export const getRestaurants = async () =>
  await MYDB.get("/Restro/GetRestaurant");

export const getRestoById = async (id) =>
  await MYDB.post(`/Restro/RestroById/${id}`);