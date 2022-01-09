import AppLayout from "../AppLayout"
import Navbar from "../components/Navbar"
import ProductItem from "../components/ProductItem"

export default function ListPage() {
    return (
        <AppLayout>
            <Navbar />
            <div className="w-full space-y-5">
                <ProductItem />
                <ProductItem />
                <ProductItem />
            </div>
        </AppLayout>
    )
}