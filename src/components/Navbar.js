import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Web3Client from "../Web3Client";
import NotLoggedIn from "./NotLoggedIn";

export default function Navbar() {

    const [userAddress, setUserAddress] = useState("")
    const [owner, setOwner] = useState(false);

    const navigate = useNavigate();

    useEffect(async () => {
        const user = await Web3Client.getUser();
        if(!user) {
            setUserAddress("");
            navigate("/login");
            return;
        }
        setUserAddress(user);
        const owner = await Web3Client.isOwner(user);
        console.log("is user " + user + " owner? " + owner);
        setOwner(owner);
    }, []);

    return (
        <>
        { !userAddress && (<NotLoggedIn/>) }
        <div className="mb-10">
            <p className="text-2xl font-semibold">Simple Shop dApp</p>
            <p className="font-normal">Willkommen,  
                <span className="pl-1 font-mono">{ userAddress ? userAddress : "Unbekannter"}</span>!
                <Link to="/login"
                className="pl-2 text-blue-600 hover:text-blue-700 hover:underline font-semibold cursor-pointer">
                Ausloggen
                </Link>
            </p>
            {owner && (<span className="mt-5 relative z-0 inline-flex shadow-sm rounded-md">
                <Link to="/" type="button" className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                    Shop-Startseite
                </Link>
                <Link to="/orders" type="button" className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                    Bestellungen anzeigen
                </Link>
                <Link to="/create-product" type="button" className="-ml-px relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                    Neues Produkt erstellen
                 </Link>
            </span>)}
        </div>
        </>
    )
}