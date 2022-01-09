import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../AppLayout"
import BuyModal from "../components/BuyModal";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar"
import ProductItem from "../components/ProductItem"
import Web3Client from "../Web3Client";

export default function ListPage() {

    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [owner, setOwner] = useState(false);
    const [loading, setLoading] = useState(true);
    const [buyModal, setBuyModal] = useState({ open: false, data: null});

    useEffect(async () => {
        const user = await Web3Client.getUser();
        if(user) {
            const isOwner = await Web3Client.isOwner(user);
            setOwner(isOwner);
        }
        loadItems();
    }, [])

    async function loadItems() {
        const shopItems = await Web3Client.getShopItems();
        console.log(shopItems);
        setItems(shopItems.reverse());
        setLoading(false);
    }

    async function deleteItem(itemId) {
        console.log("trying to delete " + itemId);
        if(await Web3Client.deleteShopItem(itemId)) {
            const oldItems = items.filter(i => i.itemId != itemId);
            setItems(oldItems);
        }
    }

    async function editItem(data) {
        navigate("/edit-product/" + data.itemId, { state: data })
    }

    async function buyItem(data, amount) {
        setBuyModal({ open: true, data: {...data, amount } });
    }

    async function closeModal() {
        setBuyModal({ open: false, data: null });
        loadItems();
    }

    return (
        <AppLayout>
            <Navbar />
            {buyModal.open && <BuyModal data={buyModal.data} close={() => closeModal()} />}
            <div className="w-full space-y-5">
                {loading && <Loading/>}
                {!loading && items.length < 1 && <>Keine Produkte verfügbar.</>}
                {items.map((data, index) => (
                    <ProductItem buy={(amount) => buyItem(data, amount)} isOwner={owner} edit={() => editItem(data)} delete={() => deleteItem(data.itemId)} key={index} data={data}/>
                ))}
            </div>
        </AppLayout>
    )
}