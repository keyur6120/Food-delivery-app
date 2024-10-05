import { CircularProgress, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import {
  FavoriteBorder,
  FavoriteBorderOutlined,
  FavoriteRounded,
} from "@mui/icons-material";
import { useNavigate, useParams,useLocation } from "react-router-dom";
import {
  addToCart,
  addToFavourite,
  deleteFromCart,
  deleteFromFavourite,
  getFavourite,
  getProductDetails,
} from "../../api";
import { openSnackbar } from "../../redux/reducers/SnackbarSlice";
import { useDispatch } from "react-redux";

const Container = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  @media (max-width: 768px) {
    padding: 20px 16px;
  }
  background: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  width: 100%;
  flex: 1;
  max-width: 1400px;
  display: flex;
  gap: 40px;
  justify-content: center;
  @media only screen and (max-width: 700px) {
    flex-direction: column;
    gap: 32px;
  }
`;

const ImagesWrapper = styled.div`
  flex: 0.7;
  display: flex;
  justify-content: center;
`;
const Image = styled.img`
  max-width: 500px;
  width: 100%;
  max-height: 500px;
  border-radius: 12px;
  object-fit: cover;
  @media (max-width: 768px) {
    max-width: 400px;
    height: 400px;
  }
`;

const Details = styled.div`
  flex: 1;
  display: flex;
  gap: 18px;
  flex-direction: column;
  padding: 4px 10px;
`;
const Title = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_primary};
`;
const Desc = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
`;
const Price = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 22px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;
const Span = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary + 60};
  text-decoration: line-through;
  text-decoration-color: ${({ theme }) => theme.text_secondary + 50};
`;

const Percent = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: green;
`;

const Ingridents = styled.div`
  font-size: 16px;
  font-weight: 500;
  diaplay: flex;
  flex-direction: column;
  gap: 30px;
`;
const Items = styled.div`
  display: flex;
  margin-top: 12px; 
  flex-wrap: wrap;
  gap: 12px;
`;
const Item = styled.div`
  background: ${({ theme }) => theme.primary + 20};
  color: ${({ theme }) => theme.primary};
  font-size: 14px;
  padding: 4px 12px;
  display: flex;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 16px;
  padding: 32px 0px;
  @media only screen and (max-width: 700px) {
    gap: 12px;
    padding: 12px 0px;
  }
`;

const FoodDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState();
  const location = useLocation();
  const restroId = location.search.split("=")[1];

  const getProduct = async () => {
    try {
      await getProductDetails(id,restroId).then((res) => {
        setProduct(res.data);
        console.log("product", res.data);
      });
    } catch (error) {
      console.log("error", error);
    }
  };
  console.log("product", product);
  // const removeFavourite = async () => {
  //   setFavoriteLoading(true);
  //   const Id = localStorage.getItem("user_Id");
  //   await deleteFromFavourite({ pid: id, uid: Id })
  //     .then((res) => {
  //       setFavorite(false);
  //       setFavoriteLoading(false);
  //     })
  //     .catch((err) => {
  //       setFavoriteLoading(false);
  //       dispatch(
  //         openSnackbar({
  //           message: err.message,
  //           severity: "error",
  //         })
  //       );
  //     });
  // };

  // const addFavourite = async () => {
  //   setFavoriteLoading(true);
  //   const Id = localStorage.getItem("user_Id");
  //   await addToFavourite({ pid: id, uid: Id })
  //     .then((res) => {
  //       setFavorite(true);
  //       setFavoriteLoading(false);
  //     })
  //     .catch((err) => {
  //       setFavoriteLoading(false);
  //       dispatch(
  //         openSnackbar({
  //           message: err.message,
  //           severity: "error",
  //         })
  //       );
  //     });
  // };

  // const checkFavorite = async () => {
  //   setFavoriteLoading(true);
  //   const Id = localStorage.getItem("user_Id");
  //   await getFavourite({ uid: Id })
  //     .then((res) => {
  //       const favourit = res.data.map((item) => {
  //         return item._id;
  //       });
  //       if (favourit.includes(id)) {
  //         setFavorite(true);
  //       } else {
  //         setFavorite(false);
  //       }
  //       setFavoriteLoading(false);
  //     })
  //     .catch((err) => {
  //       setFavoriteLoading(false);
  //       dispatch(
  //         openSnackbar({
  //           message: err.message,
  //           severity: "error",
  //         })
  //       );
  //     });
  // };

  useEffect(() => {
    getProduct();
    // checkFavorite();
  }, [favorite]);

  // // done
  // const addCart = async (condition) => {
  //   setCartLoading(true);
  //   const Id = localStorage.getItem("user_Id");
  //   // token, { productId: id, quantity: 1 }
  //   await addToCart({ pid: id, uid: Id, qun: 1 })
  //     .then((res) => {
  //       setCartLoading(false);
  //       console.log("consoling from add cart in Food Details", res.data);
  //       if (condition) {
  //         navigate("/cart");
  //       }
  //     })
  //     .catch((err) => {
  //       setCartLoading(false);
  //       dispatch(
  //         openSnackbar({
  //           message: err.message,
  //           severity: "error",
  //         })
  //       );
  //     });
  // };

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : (
        <Wrapper>
          <ImagesWrapper>
            <Image src={product?.img || product?.image} />
          </ImagesWrapper>
          <Details>
            <div>
              <Title>{product?.name}</Title>
            </div>
            <Rating value={3.5} />
            <Price>
              ₹{product?.price?.org} <Span>₹{product?.price?.mrp}</Span>{" "}
              <Percent> (₹{product?.price?.off}% Off) </Percent>
            </Price>

            <Desc>{product?.desc}</Desc>

            <Ingridents>
              Ingridents
              <Items>
                {product?.ingredients.map((ingredient,index) => (
                  <Item key={index}> {ingredient} </Item>
                ))}
              </Items>
            </Ingridents>

            <ButtonWrapper>
              <Button
                text="Add to Cart"
                full
                outlined
                isLoading={cartLoading}
                // onClick={() => addCart()}
              />
              <Button
                text="Order Now"
                full
                onClick={() => {
                  // addCart(true);
                }}
              />
              <Button
                leftIcon={
                  favorite ? (
                    <FavoriteRounded sx={{ fontSize: "22px", color: "red" }} />
                  ) : (
                    <FavoriteBorderOutlined sx={{ fontSize: "22px" }} />
                  )
                }
                full
                outlined
                isLoading={favoriteLoading}
                // onClick={() => (favorite ? removeFavourite() : addFavourite())}
              />
            </ButtonWrapper>
          </Details>
        </Wrapper>
      )}
    </Container>
  );
};

export default FoodDetails;
