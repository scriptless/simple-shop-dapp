import { useState } from "react";
import Web3 from "web3";
import Web3Client from "../Web3Client";
import Alert from "./Alert";

export default function BuyModal(props) {

    let {0: title, 2: cost, itemId, amount } = props.data;
    const totalCost = cost * amount;
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [alertMessage, setAlertMessage] = useState({success: false, message: ""});
    const [inputField, setInputField] = useState({
        name: "",
        street: "",
        number: "",
        postal: "",
        city: ""
    });

    const inputsHandler = (e) =>{
        setInputField({...inputField, [e.target.name]: e.target.value})
    }

    function close(event) {
        event.preventDefault();
        if(event.target === event.currentTarget) {
           props.close();
        }
    }

    async function buyProduct() {
        setAlertMessage({ success: true, message: ""})
        setDisableSubmit(true);
        if(!inputField.name && !inputField.street && !inputField.number && !inputField.postal && !inputField.city) {
            setAlertMessage({ success: false, message: "Bitte fülle alle Felder aus."});
            setDisableSubmit(false);
            return;
        }
        if(await Web3Client.buy(itemId, amount, totalCost, 
            inputField.name, 
            inputField.street, 
            inputField.number, 
            inputField.postal, 
            inputField.city)) {
            setAlertMessage({ success: true, message: "Produkt wurde erfolgreich gekauft!"});
            setTimeout(() => {
                setDisableSubmit(false);
                props.close();
            }, 1000);
        } else {
            setAlertMessage({ success: false, message: "Beim Kaufen des Produktes ist ein Fehler aufgetreten!"});
            setDisableSubmit(false);
        }
    }

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div onClick={close} className="fixed inset-0 bg-white bg-opacity-50 firefox:bg-opacity-50 backdrop-filter backdrop-blur-md transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="border border-gray-200 inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                <div>
                { alertMessage.message && (
                <div className="mb-5 flex flex-col justify-center items-center">
                    <div className="w-full">
                        <Alert success={alertMessage.success} message={alertMessage.message}/>
                    </div>
                </div>) }
                    <div className="mt-3 text-left">
                        <div className="w-full">
                            <label>Kaufdetails</label>
                            <div className="mt-1 flex justify-between">
                                <p className="text-lg text-gray-500 font-normal">{amount}x {title}</p>
                                <p className="mt-1 text-base text-gray-500 font-mono">{Number(Web3.utils.fromWei(cost)).toFixed(6)} ETH</p>
                            </div>
                        </div>
                        <div className="w-full mt-5">
                            <label>Vollständiger Name</label>
                            <input name="name" onChange={inputsHandler} value={inputField.name} placeholder="Max Mustermann" className="w-full bg-gray-50 rounded-md shadow px-4 py-2 mt-2" />
                        </div>
                        <div className="w-full mt-5">
                            <label>Straße, Haus Nr.</label>
                            <div className="w-full inline-flex space-x-5">
                                <div className="w-2/3">
                                    <input name="street" onChange={inputsHandler} value={inputField.street} placeholder="Berliner Allee" className="w-full bg-gray-50 rounded-md shadow px-4 py-2 mt-2" />
                                </div>
                                <div className="w-1/3">
                                    <input name="number" onChange={inputsHandler} value={inputField.number} type="number" placeholder="1" className="w-full bg-gray-50 rounded-md shadow px-4 py-2 mt-2" />
                                </div>
                            </div>
                        </div>
                        <div className="w-full mt-5">
                            <label>Postleitzahl, Stadt</label>
                            <div className="w-full inline-flex space-x-5">
                                <div className="w-1/3">
                                    <input name="postal" onChange={inputsHandler} value={inputField.postal} type="number" placeholder="12345" className="w-full bg-gray-50 rounded-md shadow px-4 py-2 mt-2" />
                                </div>
                                <div className="w-2/3">
                                    <input name="city" onChange={inputsHandler} value={inputField.city} placeholder="Musterstadt" className="w-full bg-gray-50 rounded-md shadow px-4 py-2 mt-2" />
                                </div>
                            </div>
                        </div>
                        {disableSubmit ? 
                        <button disabled className="cursor-not-allowed mt-8 text-lg flex items-center justify-center w-full bg-blue-200 text-white font-semibold py-2 px-4 rounded-md shadow">
                            Kaufen für {Number(Web3.utils.fromWei(""+totalCost))} ETH
                        </button>
                        :
                        <button onClick={() => buyProduct()} className="mt-8 text-lg flex items-center justify-center w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow">
                            Kaufen für {Number(Web3.utils.fromWei(""+totalCost))} ETH
                        </button>}
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}