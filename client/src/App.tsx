import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ShoppingListPage from "./pages/ShoppingListPage";
import ShoppingListsPage from "./pages/ShoppingListsPage";
import ProductsPage from "./pages/ProductsPage";
import ComparisonPage from "./pages/ComparisonPage";
import ComparisonsPage from "./pages/ComparisonsPage";

import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/AppLayout";

function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={<Navigate to="/login" replace />}
            />

            <Route
                path="/login"
                element={<LoginPage />}
            />

            <Route
                element={
                    <ProtectedRoute>
                        <AppLayout />
                    </ProtectedRoute>
                }
            >
                <Route
                    path="/dashboard"
                    element={<DashboardPage />}
                />

                <Route
                    path="/products"
                    element={<ProductsPage />}
                />

                <Route
                    path="/shopping-lists"
                    element={<ShoppingListsPage />}
                />

                <Route
                    path="/shopping-lists/:id"
                    element={<ShoppingListPage />}
                />

                <Route
                    path="/comparison"
                    element={<ComparisonPage />}
                />

                <Route
                    path="/comparisons"
                    element={<ComparisonsPage />}
                />
            </Route>
        </Routes>
    );
}

export default App;