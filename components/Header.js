import { useDispatch, useSelector } from "react-redux"
import { dark, light } from "../redux/features/theme/themeSlice"
import { BsMoon , BsSun } from 'react-icons/bs';
import { useRouter } from "next/router";


function Header(props) {
    const theme = useSelector(state => state.theme.value)
    const dispatch = useDispatch()

    const router = useRouter()

    function changeTheme(){
        dispatch(theme == "dark" ? light() : dark())
        props.setTheme(theme == "dark"? "light" : "dark")
    }
    
    return (
        <div className={`${theme == "dark" ? "dark-component" : "light-component"} flex justify-between  text-base sm:text-2xl p-4`}>
            <h3 className="text-center font-bold cursor-pointer" onClick={()=> router.push("/")}>where in the world?</h3>
            <div className="theme ">
                <button className="flex justify-around items-center mx-auto px-2 capitalize" onClick={()=> changeTheme()}>
                    {theme == "dark" ? <BsMoon /> : <BsSun />} {" "}
                    <span className="mx-2">mode</span>
                </button>
            </div>
        </div>
    )
}

export default Header
