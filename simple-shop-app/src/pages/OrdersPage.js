import AppLayout from "../AppLayout"
import Navbar from "../components/Navbar"
import Order from "../components/Order"
import ProductItem from "../components/ProductItem"

export default function OrdersPage() {
    return (
        <AppLayout>
            <Navbar />
            <div className="w-full space-y-5">
                <Order />
            </div>
        </AppLayout>
    )
}