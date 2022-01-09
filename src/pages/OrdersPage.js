import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AppLayout from "../AppLayout"
import Navbar from "../components/Navbar"
import Order from "../components/Order"
import ProductItem from "../components/ProductItem"
import Web3Client from "../Web3Client"

export default function OrdersPage() {

    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);

    useEffect(async () => {
        const user = await Web3Client.getUser();
        if(!user) {
            navigate("/login");
            return;
        } else {
            const owner = await Web3Client.isOwner(user);
            if(!owner) {
                navigate("/");
            }
        }

        const orders = await Web3Client.getOrders();
        console.log(orders);
        setOrders(orders);
    }, []);

    return (
        <AppLayout>
            <Navbar />
            <div className="w-full space-y-5">
            {orders.map((data, index) => (<Order key={index} data={data}/>))}
            </div>
        </AppLayout>
    )
}