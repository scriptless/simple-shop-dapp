import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../AppLayout"
import Alert from "../components/Alert";
import Navbar from "../components/Navbar"
import ProductItem from "../components/ProductItem"
import Web3Client from "../Web3Client";

export default function CreateProductPage() {

    const DEFAULT_STATE = {
        title: "",
        description: "",
        cost: -1,
        inventory: -1
    };
    const navigate = useNavigate();
    const [inputField, setInputField] = useState(DEFAULT_STATE);
    const [alertMessage, setAlertMessage] = useState({success: false, message: ""});
    const [disableSubmit, setDisableSubmit] = useState(false);

    const submitButton = () =>{
        alert(JSON.stringify(inputField))
    }

    const inputsHandler = (e) =>{
        setInputField({...inputField, [e.target.name]: e.target.value})
    }

    async function createProduct() {
        setAlertMessage({ success: true, message: ""})
        setDisableSubmit(true);
        if(await Web3Client.addShopItem({...inputField})) {
            setAlertMessage({ success: true, message: "Produkt wurde erfolgreich erstellt!"});
            setInputField(DEFAULT_STATE);
        } else {
            setAlertMessage({ success: false, message: "Beim Erstellen des Produktes ist ein Fehler aufgetreten!"});
        }
        setDisableSubmit(false);
    }

    useEffect(async () => {
        const user = await Web3Client.getUser();
        if(user) {
            const owner = await Web3Client.isOwner(user);
            if(!owner) {
                navigate("/");
            }
        }
    }, []);

    return (
        <AppLayout>
            <Navbar />
            { alertMessage.message && (
            <div className="mb-10 flex flex-col justify-center items-center">
                <div className="w-full">
                    <Alert success={alertMessage.success} message={alertMessage.message}/>
                </div>
            </div>) }
            <div className="w-full text-left border border-gray-300 shadow rounded-md py-6 px-4 flex flex-col items-center justify-center">
                    <div className="w-full">
                        <div className="w-full inline-flex space-x-5">
                            <div className="w-2/4">
                                <label>Produkt Titel</label>
                                <input 
                                name="title"
                                onChange={inputsHandler}
                                value={inputField.title}
                                placeholder="Banane" 
                                className="w-full bg-gray-50 rounded-md shadow px-4 py-2 mt-2" />
                            </div>
                            <div className="w-1/4">
                                <label>Preis</label>
                                <div className="mt-2 relative">
                                    <input
                                    name="cost"
                                    onChange={inputsHandler}
                                    value={inputField.cost}
                                    type="number"
                                    className="font-mono w-full bg-gray-50 rounded-md shadow py-2 pl-4 pr-12" 
                                    placeholder="0.00" 
                                    aria-describedby="price-currency"/>
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 font-mono" id="price-currency">
                                            ETH
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/4">
                                <label>Stückzahl</label>
                                <input 
                                name="inventory"
                                onChange={inputsHandler}
                                value={inputField.inventory}
                                type="number" placeholder="10" className="w-full bg-gray-50 rounded-md shadow px-4 py-2 mt-2" />
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-5">
                        <label>Produkt Beschreibung</label>
                        <textarea 
                        name="description"
                        onChange={inputsHandler}
                        value={inputField.description}
                        placeholder="Eine Beschreibung für die Banane" className="w-full bg-gray-50 rounded-md shadow px-4 py-2 mt-2"></textarea>
                    </div>
                    {disableSubmit ? 
                    <button disabled className="cursor-not-allowed w-full mt-6 bg-blue-200 text-white font-semibold py-2 px-4 rounded-md shadow">
                        Produkt erstellen
                    </button> : 
                    <button onClick={() => createProduct()} className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow">
                        Produkt erstellen
                    </button>}
            </div>
        </AppLayout>
    )
}