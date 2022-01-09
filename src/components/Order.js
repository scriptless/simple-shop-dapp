import { useState } from "react"

export default function Order() {

    const [open, setOpen] = useState(false);

    return (
        <div className="w-full text-left border border-gray-300 shadow rounded-md p-4">
            <div className="flex justify-between items-center">
                <div className="text-lg">
                    06.01.2022 16:14
                </div>
                <div className="flex items-center justify-center space-x-5">
                    <p className="text-gray-500 font-mono">5.0 ETH</p>
                    <p className="text-gray-500 font-mono">0x734567236zr4278ztr24</p>
                    <button onClick={() => setOpen(!open)} className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 font-semibold py-2 px-4 rounded-md shadow">
                        {open ? (
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        )}
                    </button>
                    {/*<button className="bg-white hover:bg-gray-50 text-red-600 border font-semibold py-2 px-4 rounded-md shadow">
                        Löschen
                    </button>*/}
                </div>
            </div>
            {open && (<div className="">
                <div className="my-4 border-b border-gray-200"></div> 
                <div className="grid grid-cols-2 gap-4 py-1">
                    <div className="col-span-1">
                        <div className="w-full">
                            <label>Bestellung</label>
                            <p className="font-normal">10x Hausschuhe</p>
                        </div>
                        <div className="w-full mt-5">
                            <label>Smart Contract Tx</label>
                            <p><a 
                            target="_blank"
                            href="https://etherscan.io/address/0x1719b7c0f3b69f84349caa96dcfb6306b88624b1" 
                            className="font-normal break-all text-blue-800 hover:text-blue-700 underline">
                                https://etherscan.io/address/0x1719b7c0f3b69f84349caa96dcfb6306b88624b1
                            </a></p>
                        </div>
                        <button className="float-left mt-5 bg-white hover:bg-gray-50 text-red-600 border border-gray-300 font-semibold py-2 px-4 rounded-md shadow">
                            Löschen
                        </button>
                    </div>
                    <div className="col-span-1">
                        <div className="w-full">
                            <label>Vollständiger Name</label>
                            <p className="font-normal">Alexander Kürfgen</p>
                        </div>
                        <div className="w-full mt-5">
                            <label>Straße, Haus Nr.</label>
                            <p className="font-normal">Berliner Allee 1</p>
                        </div>
                        <div className="w-full mt-5">
                            <label>Postleitzahl, Stadt</label>
                            <p className="font-normal">12345 Musterstadt</p>
                        </div>
                    </div>
                </div>
               
            </div>)}
        </div>
    )
}