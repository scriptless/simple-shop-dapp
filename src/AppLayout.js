import Navbar from "./components/Navbar";

export default function AppLayout(props) {
    return (
        <div className="h-screen flex items-center justify-center font-sans text-gray-700">
            <div className="py-16 font-medium text-center h-full w-full max-w-2xl">
                {props.children}
            </div>
        </div>
    )
}