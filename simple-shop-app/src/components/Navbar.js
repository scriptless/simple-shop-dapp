import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="mb-10">
            <p className="text-2xl font-semibold">Simple Shop dApp</p>
            <p className="font-normal">Willkommen,  
                <span className="pl-1 font-mono">0x734567236zr4278ztr24</span>!
                <Link to="/login"
                className="pl-2 text-blue-600 hover:text-blue-700 hover:underline font-semibold cursor-pointer">
                Ausloggen
                </Link>
            </p>
            <span class="mt-5 relative z-0 inline-flex shadow-sm rounded-md">
                <Link to="/" type="button" class="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                    Shop-Startseite
                </Link>
                <Link to="/orders" type="button" class="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                    Bestellungen anzeigen
                    <span class="bg-indigo-100 text-indigo-600 hidden ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block">
                        1
                    </span>
                </Link>
                <Link to="/create-product" type="button" class="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                    Neues Produkt erstellen
                 </Link>
            </span>
        </div>
    )
}