import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppLayout from "../AppLayout"
import Navbar from "../components/Navbar"
import ProductItem from "../components/ProductItem"
import Web3Client from "../Web3Client";
import Web3 from "web3";
import Alert from "../components/Alert";

export default function EditProductPage() {

    const navigate = useNavigate();

    useEffect(async () => {
        const user = await Web3Client.getUser();
        if(user) {
            const owner = await Web3Client.isOwner(user);
            if(!owner) {
                navigate("/");
            }
        }
    }, []);
    
    const { state } = useLocation();
    const [inputField, setInputField] = useState({
        title: state[0],
        description: state[1],
        cost: Web3.utils.fromWei(state[2]),
        inventory: state[3]
    });
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [alertMessage, setAlertMessage] = useState({success: false, message: ""});
    const { itemId } = state;

    const submitButton = () =>{
        alert(JSON.stringify(inputField))
    }

    const inputsHandler = (e) =>{
        setInputField({...inputField, [e.target.name]: e.target.value})
    }

    async function updateProduct() {
        setAlertMessage({ success: true, message: ""})
        setDisableSubmit(true);
        if(await Web3Client.editShopItem(itemId, {...inputField})) {
            setAlertMessage({ success: true, message: "Produkt wurde erfolgreich geupdated!"});
        } else {
            setAlertMessage({ success: false, message: "Beim Updaten des Produktes ist ein Fehler aufgetreten!"});
        }
        setDisableSubmit(false);
    }

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
                                <input onChange={inputsHandler} name="title" value={inputField.title} placeholder="Banane" className="w-full bg-gray-50 rounded-md shadow px-4 py-2 mt-2" />
                            </div>
                            <div className="w-1/4">
                                <label>Preis</label>
                                <div className="mt-2 relative">
                                    <input
                                    type="number"
                                    className="font-mono w-full bg-gray-50 rounded-md shadow py-2 pl-4 pr-12" 
                                    placeholder="0.00" 
                                    onChange={inputsHandler}
                                    name="cost"
                                    value={inputField.cost}
                                    aria-describedby="price-currency"/>
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <span className="text-gray-500 font-mono" id="price-currency">
                                            ETH
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/4">
                                <label>Max. Stückzahl</label>
                                <input onChange={inputsHandler} name="inventory" value={inputField.inventory} type="number" placeholder="10" className="w-full bg-gray-50 rounded-md shadow px-4 py-2 mt-2" />
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-5">
                        <label>Produkt Beschreibung</label>
                        <textarea onChange={inputsHandler} name="description" value={inputField.description} placeholder="Eine Beschreibung für die Banane" className="w-full bg-gray-50 rounded-md shadow px-4 py-2 mt-2"></textarea>
                    </div>
                    {disableSubmit ? 
                    <button disabled className="cursor-not-allowed w-full mt-6 bg-blue-200 text-white font-semibold py-2 px-4 rounded-md shadow">
                        Änderungen speichern
                    </button> : 
                    <button onClick={() => updateProduct()} className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow">
                        Änderungen speichern
                    </button>}
            </div>
        </AppLayout>
    )
}