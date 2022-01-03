import { useRouter } from "next/router"
import {BiMessageSquareError} from "react-icons/bi"

function NotFound() {
    const router = useRouter()
    return (
        <div className=" h-screen flex justify-center items-center flex-col">
            <BiMessageSquareError className=" text-8xl" />
            <p className="text-2xl my-2">This page was not found </p>
            <button 
                className="border px-4 py-2 transition-all hover:bg-cyan-200 hover:text-cyan-900"
                onClick={() => router.push("/countries")}
                >
                back to home
            </button>
        </div>
    )
}

export default NotFound
