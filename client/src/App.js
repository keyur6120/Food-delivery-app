import styled, { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lightTheme } from "./utils/Themes";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home.jsx";
import { useState } from "react";
import Authentication from "./pages/Authentication/Authentication.jsx";
import Favourites from "./pages/Favourites/Favourites.jsx";
import Cart from "./pages/cart/Cart.jsx";
import FoodDetails from "./pages/Food/FoodDetails.jsx";
import FoodListing from "./pages/Food/FoodListing.jsx";
import { useSelector } from "react-redux";
import Order from './pages/Order/order.jsx'
import AuthRoutes from './Authentication/AuthRoutes.jsx'
import ProfilePage from "./pages/Profile/profile.jsx";
import Restaurant from './pages/Restaurant/Resturant.jsx'
import Details from './pages/Restaurant/Detailscard/DetailsCard.jsx'
import Test from './Testing/Test.jsx'

const Container = styled.div``;

function App() {
  const { currentUser } = useSelector((state) => state.user);
  const { open, message, severity } = useSelector((state) => state.snackbar);
  const [openAuth, setOpenAuth] = useState(false);
  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Container>
          <Navbar
            setOpenAuth={setOpenAuth}
            openAuth={openAuth}
            currentUser={currentUser}
          />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/dishes/:id" exact element={<FoodDetails />} />
            <Route path="/dishes" exact element={<FoodListing />} />
            <Route path="/testing" exact element={<Test />} />
            <Route element={<AuthRoutes />}>
              <Route path="/orders" exact element={<Order />} />
              <Route path="/Restaurant" exact element={<Restaurant />} />
              <Route path="/Details/:id" exact element={<Details />} />
              <Route path="/favorite" exact element={<Favourites />} />
              <Route path="/cart" exact element={<Cart />} />
              <Route path="/profile" exact element={<ProfilePage />} />
            </Route>
          </Routes>
          {openAuth && (
            <Authentication setOpenAuth={setOpenAuth} openAuth={openAuth} />
          )}
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
