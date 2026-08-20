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
import ProductDetailPage from "../pages/ProductDetailPage";
import SignInPage from "../pages/SignInPage.tsx";
import AuthSuccessPage from "../pages/AuthSuccessPage";
import SignUpPage from "../pages/SignUpPage.tsx";
import CartPage from "../pages/CartPage";

// Admin Imports
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminProductsPage from "../pages/admin/AdminProductsPage";
import AdminProductFormPage from "../pages/admin/AdminProductFormPage";
import AdminCategoriesPage from "../pages/admin/AdminCategoriesPage";
import AdminBrandsPage from "../pages/admin/AdminBrandsPage";
import AdminBrandFormPage from "../pages/admin/AdminBrandFormPage";
import AdminCategoryFormPage from "../pages/admin/AdminCategoryFormPage";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={<SignInPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/auth/success" element={<AuthSuccessPage />} />
        
        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboardPage />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="products/add" element={<AdminProductFormPage mode="add" />} />
          <Route path="products/edit/:id" element={<AdminProductFormPage mode="edit" />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="categories/add" element={<AdminCategoryFormPage mode="add" />} />
          <Route path="categories/edit/:id" element={<AdminCategoryFormPage mode="edit" />} />
          <Route path="brands" element={<AdminBrandsPage />} />
          <Route path="brands/add" element={<AdminBrandFormPage mode="add" />} />
          <Route path="brands/edit/:id" element={<AdminBrandFormPage mode="edit" />} />
        </Route>

        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default AppRoutes;
