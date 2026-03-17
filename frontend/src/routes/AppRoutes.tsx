import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import NotFoundPage from "../pages/NotFoundPage";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import SignInPage from "../pages/SignInPage.tsx";
import AuthSuccessPage from "../pages/AuthSuccessPage";
import SignUpPage from "../pages/SignUpPage.tsx";

const AppRoutes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<SignInPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/auth/success" element={<AuthSuccessPage />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default AppRoutes;
