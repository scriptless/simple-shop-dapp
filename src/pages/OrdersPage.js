import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AppLayout from "../AppLayout"
import Loading from "../components/Loading"
import Navbar from "../components/Navbar"
import Order from "../components/Order"
import ProductItem from "../components/ProductItem"
import Web3Client from "../Web3Client"

export default function OrdersPage() {

    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(async () => {
        const user = await Web3Client.getUser();
        if(user) {
            const owner = await Web3Client.isOwner(user);
            if(!owner) {
                navigate("/");
            } else {
                const orders = await Web3Client.getOrders();
                console.log(orders);
                setOrders(orders.reverse());
                setLoading(false);
            }
        }
    }, []);

    async function deleteOrder(orderId) {
        console.log("trying to delete " + orderId);
        if(await Web3Client.deleteOrder(orderId)) {
            const oldOders = orders.filter(i => i.orderId != orderId);
            setOrders(oldOders);
        }
    }

    return (
        <AppLayout>
            <Navbar />
            <div className="w-full space-y-5">
                {loading && <Loading/>}
                {!loading && orders.length < 1 && <>Keine Bestellungen verfügbar.</>}
                {orders.map((data, index) => (<Order delete={() => deleteOrder(data.orderId)} key={index} data={data}/>))}
            </div>
        </AppLayout>
    )
}