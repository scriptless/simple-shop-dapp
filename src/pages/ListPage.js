import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../AppLayout"
import Navbar from "../components/Navbar"
import ProductItem from "../components/ProductItem"
import Web3Client from "../Web3Client";

export default function ListPage() {

    const navigate = useNavigate();
    const [items, setItems] = useState([]);

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

        const shopItems = await Web3Client.getShopItems();
        console.log(shopItems);
        setItems(shopItems);
    }, [])

    return (
        <AppLayout>
            <Navbar />
            <div className="w-full space-y-5">
                {items.map((data, index) => (<ProductItem key={index} data={data}/>))}
            </div>
        </AppLayout>
    )
}