import "./scss/app.scss";
import { Routes, Route, Outlet } from "react-router-dom";
// import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
// import Cart from "./pages/Cart.tsx";
import React, { Suspense } from "react";

// import PizzaPage from "./pages/PizzaPage.tsx";
import { MainLayout } from "./layots/MainLayout.tsx";

const Cart = React.lazy(
  () => import(/* webpackChunkName: "Cart" */ "./pages/Cart.tsx")
);
const Home = React.lazy(
  () => import(/* webpackChunkName: "Home" */ "./pages/Home.tsx")
);
const PizzaPage = React.lazy(
  () => import(/* webpackChunkName: "PizzaPage" */ "./pages/PizzaPage.tsx")
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          path=""
          element={
            <Suspense fallback={<div>Загрузка хоум</div>}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/cart"
          element={
            <Suspense fallback={<div>Загрузка</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="/pizza/:id"
          element={
            <Suspense fallback={<div>Загрузка пицы</div>}>
              <PizzaPage />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
