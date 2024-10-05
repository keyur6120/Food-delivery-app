import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getCategory } from "../../api/index.js";

const SliderWrapper = styled.div`
  width: 100%;
  overflow-x: scroll;
  display: flex;
  padding: 20px 0;
  gap: 10px;
`;

const CategoryItem = styled.div`
  flex: 0 0 auto;
  width: 150px;
  margin: 0 10px;
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  transition: all 0.3s ease-out;
  cursor: pointer;
  &:hover {
    transform: translateY(-10px);
  }
  overfll
  &::-webkit-scrollbar {
    display: none; /* Hide scrollbar in Chrome, Safari, and other WebKit browsers */
  }
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
`;

const CategoryName = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #333;
`;

const CategorySlider = () => {
  const [categories, setCategories] = useState([]);
  const[data, setData] = useState([]);

  const getCategories = async () => {
    await getCategory().then((res) => {
      setCategories(res.data);
      console.log(res.data);
    });
  };
console.log("data", data)
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <SliderWrapper>
      {categories.map((category, index) => (
        <CategoryItem key={index} onClick={()=>setData(category.name)}>
          <Image src={category.image} alt={category.name}  />
          <CategoryName>{category.name}</CategoryName>
        </CategoryItem>
      ))}
    </SliderWrapper>
  );
};

export default CategorySlider;
