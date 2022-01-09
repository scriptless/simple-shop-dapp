import AppLayout from "../AppLayout"
import Navbar from "../components/Navbar"
import ProductItem from "../components/ProductItem"

export default function CreateProductPage() {
    return (
        <AppLayout>
            <Navbar />
            <div className="w-full text-left border border-gray-300 shadow rounded-md py-6 px-4 flex flex-col items-center justify-center">
                    <div className="w-full">
                        <div className="w-full inline-flex space-x-5">
                            <div className="w-2/4">
                                <label>Produkt Titel</label>
                                <input placeholder="Banane" className="w-full bg-gray-50 rounded-md shadow px-4 py-2 mt-2" />
                            </div>
                            <div className="w-1/4">
                                <label>Preis</label>
                                <div class="mt-2 relative">
                                    <input
                                    type="number"
                                    class="font-mono w-full bg-gray-50 rounded-md shadow py-2 pl-4 pr-12" 
                                    placeholder="0.00" 
                                    aria-describedby="price-currency"/>
                                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <span class="text-gray-500 font-mono" id="price-currency">
                                            ETH
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/4">
                                <label>Stückzahl</label>
                                <input type="number" placeholder="10" className="w-full bg-gray-50 rounded-md shadow px-4 py-2 mt-2" />
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-5">
                        <label>Produkt Beschreibung</label>
                        <textarea placeholder="Eine Beschreibung für die Banane" className="w-full bg-gray-50 rounded-md shadow px-4 py-2 mt-2"></textarea>
                    </div>
                    <button className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow">
                        Produkt erstellen
                    </button>
            </div>
        </AppLayout>
    )
}