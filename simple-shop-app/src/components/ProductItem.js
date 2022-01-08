import { useState } from "react"
import { Link } from "react-router-dom";

export default function ProductItem() {
    const [amount, setAmount] = useState(0);

    return (
        <div className="w-full text-left border border-gray-300 shadow rounded-md p-4">
            <div className="flex justify-between items-center">
                <div className="text-lg">
                    Hausschuhe
                </div>
                <div className="flex items-center justify-center space-x-4">
                    <p className="text-gray-500 font-mono">0.5 ETH</p>
                    <div class="flex items-center justify-center">
                        <button onClick={() => amount > 0 && setAmount(amount - 1)} class="border border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-800 text-xl font-semibold h-10 w-10 rounded-md shadow">
                            -
                        </button>
                        <span class="w-10 text-center" x-text="count">{amount}</span>
                        <button onClick={() => setAmount(amount + 1)} class="border border-gray-300 bg-gray-50 hover:bg-gray-100 text-gray-800 text-xl font-semibold h-10 w-10 rounded-md shadow">
                            +
                        </button>
                    </div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow">
                        Kaufen
                    </button>
                    {/*<button disabled className="cursor-not-allowed bg-blue-300 text-white font-semibold py-2 px-4 rounded-md shadow">
                        Nicht auf Lager
                    </button>*/}
                </div>
            </div>
            <div className="font-normal py-4">
                Das ist die Beschreibung der Hausschuhe, die sind halt wirklich sehr nice bruder.
                Das ist die Beschreibung der Hausschuhe, die sind halt wirklich sehr nice bruder.
                Das ist die Beschreibung der Hausschuhe, die sind halt wirklich sehr nice bruder.
            </div>
            <div className="flex items-center justify-end space-x-3">
                <Link to="/edit-product/0x8374782647326" className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 font-semibold py-2 px-4 rounded-md shadow">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </Link>
                <button className="bg-white hover:bg-gray-50 text-red-600 border border-gray-300 font-semibold py-2 px-4 rounded-md shadow">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </div>
    )
}