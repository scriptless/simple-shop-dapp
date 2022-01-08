import AppLayout from "../AppLayout"
import ProductItem from "../components/ProductItem"

export default function LoginPage() {
    return (
        <AppLayout>
            <div className="mb-5">
                <p className="text-2xl font-semibold">Simple Shop dApp</p>
                <p className="font-normal">Willkommen, bitte einloggen oder registrieren!</p>
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="w-full max-w-md">
                    <button className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow">
                        Mit web3 einloggen
                    </button>
                    <div className="my-10 border-b border-gray-100"></div>
                    <div className="text-left">
                        <div className="w-full">
                            <label>Vollständiger Name</label>
                            <input placeholder="Max Mustermann" className="w-full bg-gray-50 rounded-md shadow px-4 py-2 mt-2" />
                        </div>
                        <div className="w-full mt-5">
                            <label>Straße, Haus Nr.</label>
                            <div className="w-full inline-flex space-x-5">
                                <div className="w-2/3">
                                    <input placeholder="Berliner Allee" className="w-full bg-gray-50 rounded-md shadow px-4 py-2 mt-2" />
                                </div>
                                <div className="w-1/3">
                                    <input placeholder="1" className="w-full bg-gray-50 rounded-md shadow px-4 py-2 mt-2" />
                                </div>
                            </div>
                        </div>
                        <div className="w-full mt-5">
                            <label>Postleitzahl, Stadt</label>
                            <div className="w-full inline-flex space-x-5">
                                <div className="w-1/3">
                                    <input placeholder="12345" className="w-full bg-gray-50 rounded-md shadow px-4 py-2 mt-2" />
                                </div>
                                <div className="w-2/3">
                                    <input placeholder="Musterstadt" className="w-full bg-gray-50 rounded-md shadow px-4 py-2 mt-2" />
                                </div>
                            </div>
                        </div>
                        <button className="w-full border border-gray-300 mt-8 hover:bg-gray-50 text-gray-800 font-semibold py-2 px-4 rounded-md shadow">
                            Mit web3 registrieren
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}