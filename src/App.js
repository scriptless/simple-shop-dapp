import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CreateProductPage from "./pages/CreateProductPage";
import EditProductPage from "./pages/EditProductPage";
import ListPage from "./pages/ListPage";
import LoginPage from "./pages/LoginPage";
import OrdersPage from "./pages/OrdersPage";
import Web3Client from "./Web3Client";

function App() {

    useEffect(() => {
        //const client = new Web3Client();
    }, []);

    return (
        <Routes>
            <Route path="/" element={<ListPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/create-product" element={<CreateProductPage />} />
            <Route path="/edit-product/:id" element={<EditProductPage />} />
        </Routes>
    );
}

export default App;
