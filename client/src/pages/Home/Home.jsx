import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HeaderImage from "../../utils/Images/Header.png";
import ProductCategoryCard from "../../components/cards/ProductCategoryCard.jsx";
import ProductsCard from "../../components/cards/ProductsCard.jsx";
import { getAllProducts } from "../../api/index.js";
import { CircularProgress } from "@mui/material";
import { getCategory } from "../../api/index.js";
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
    padding: 20px 12px;
  }
  background: ${({ theme }) => theme.bg};
`;
const Section = styled.div`
  max-width: 1400px;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;
const Img = styled.img`
  width: 100%;
  max-width: 1200px;
`;
const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  display: flex;
  justify-content: ${({ center }) => (center ? "center" : "space-between")};
  align-items: center;
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
  @media (max-width: 770px) {
    gap: 18px;
  }
`;

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [category, setcategory] = useState([]);

  const getProducts = async () => {
    setLoading(true);
    await getAllProducts().then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  const getCategories = async () => {
    await getCategory().then((res) => {
      setcategory(res.data);
      console.log(res.data);
    });
  };
  useEffect(() => {
    getProducts();
    getCategories();
  }, [setProducts,setcategory]);

  return (
    <Container>
      <Section>
        <Img src={HeaderImage} />
      </Section>
      <Section>
        <Title>Food Categories</Title>
        <CardWrapper>
          <ProductCategoryCard />
        </CardWrapper>
      </Section>
      <Section>
        <Title>Most Popular</Title>
        {loading ? (
          <CircularProgress />
        ) : (
          <CardWrapper onClick={()=> console.log('click on card')}>
            {products.map((item, index) => (
              <ProductsCard product={item} key={index} />
            ))}
          </CardWrapper>
        )}
      </Section>
    </Container>
  );
};

export default Home;
