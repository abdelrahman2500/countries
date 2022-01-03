import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { BsArrowLeft } from "react-icons/bs"
import { ImSpinner9 } from "react-icons/im"
import { useDispatch, useSelector } from "react-redux"
import { fetchOneCountry, getCountryByName, loadingCountry, removeCountryDetails } from "../../redux/features/country/countrySlice"
import NotFound from "../404"

function CountryName(props) {
    const theme = useSelector(state => state.theme.value)
    const router = useRouter()
    
    const dispatch = useDispatch()
    
    const countryDetails = useSelector(getCountryByName)
    const loaded = useSelector(loadingCountry)

    useEffect(()=>{
        dispatch(fetchOneCountry(props.param)) 
        return () => {
            dispatch(removeCountryDetails())
        }
    }, [dispatch, props.param])
    

    return (
        <div className="country-name m-5">
            <button className={`${theme == "dark" ? "dark-component" : "light-component"} flex justify-center items-center px-4 py-2 mb-4`}
                    onClick={()=> router.push("/countries")}
                    >
                <BsArrowLeft className="mx-1" /> back
            </button>
                {loaded == false ? 
            <div className="sm:grid md:grid-cols-2">
                    <Image 
                        src={countryDetails[0].flags.png}
                        alt={countryDetails[0].name.common}
                        width={300}
                        height={150}
                        layout="responsive"
                        className=""
                    />
                    <div className="details p-5 md:p-10">
                        <h4 className="font-bold text-2xl mb-5">{countryDetails[0].name.common ? countryDetails[0].name.common : "unknown"}</h4>
                        <div className="sm:grid md:grid-cols-2">
                            <div className="p-2">
                                <p className="text-sm mb-1">native name: <span className="font-thin light-text-color">{countryDetails[0].name.nativeName ?  Object.keys(countryDetails[0].name.nativeName).join(", ") : "unknown"}</span></p>
                                <p className="text-sm mb-1">population: <span className="font-thin light-text-color">{countryDetails[0].population? countryDetails[0].population: "unknown"}</span></p>
                                <p className="text-sm mb-1">region: <span className="font-thin light-text-color">{countryDetails[0].region ? countryDetails[0].region: "unknown"}</span></p>
                                <p className="text-sm mb-1">sub region: <span className="font-thin light-text-color">{countryDetails[0].subregion ? countryDetails[0].subregion: "unknown"}</span></p>
                                <p className="text-sm mb-1">capital: <span className="font-thin light-text-color">{countryDetails[0].capital ? countryDetails[0].capital: "unknown"}</span></p>
                            </div>
                            <div className="p-2">
                                <p className="text-sm mb-1">top level domain: <span className="font-thin light-text-color">{countryDetails[0].tld ? countryDetails[0].tld[0]: "unknown"}</span></p>
                                <p className="text-sm mb-1">currencies: <span className="font-thin light-text-color">{countryDetails[0].currencies? (Object.values(countryDetails[0].currencies))[0].name : "unknown"}</span></p>
                                <p className="text-sm mb-1">languages: <span className="font-thin light-text-color">{countryDetails[0].languages ? Object.values(countryDetails[0].languages).join(", "): "unknown"}</span></p>
                            </div>
                        </div>
                        <div className="m-3 text-center text-sm">
                            <p className=" mb-1">border countries: </p>
                            <p className="flex flex-row flex-wrap justify-center">
                                {countryDetails[0].borders ? countryDetails[0].borders.map((el, i) => <span key={i} className={`${theme == "dark" ? "dark-component shadow-[#fafafa]" : "light-component  shadow-[#2b3945]"} shadow font-thin text-xs px-4 py-2 m-1 light-text-color`}>{el}</span>) : "unknown"}
                            </p>
                        </div>
                    </div>
                
            </div>
                : loaded == "error" ? <NotFound /> : <ImSpinner9 className="text-4xl animate-spin absolute top-1/2 left-1/2" />}
        </div>
    )
}

export function getServerSideProps(context){
    const param = context.query.CountryName
    return{
        props: {param: param}
    }
}


export default CountryName
