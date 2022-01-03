import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { ImSpinner9 } from "react-icons/im";
import { useDispatch, useSelector } from 'react-redux';
import Country from "../../components/Country";
import { fetchAllCountries, getAllCountries, loadingCountries, removeCountriesDispatch } from "../../redux/features/country/countrySlice";

function Countries() {
    const theme = useSelector(state => state.theme.value)
    const dispatch = useDispatch()
    const router = useRouter()
    const [search, setSearch] = useState("")

    const allCountries = useSelector(getAllCountries)
    const loaded = useSelector(loadingCountries)

    useEffect(()=>{
        dispatch(fetchAllCountries({allCountries : true}))
        return () => {
            dispatch(removeCountriesDispatch())
        }
    }, [dispatch])

    // console.log(loaded)
    function handleSearch(e){
        e.preventDefault()
        search.trim() == "" ? dispatch(fetchAllCountries({allCountries : true})) :
        dispatch(fetchAllCountries({getCountry : search}))
    }

    function handleFilter(e){
        e.target.value == "all" ? dispatch(fetchAllCountries({allCountries : true})) : dispatch(fetchAllCountries({getRegion : e.target.value}))
    }


    return (
        <div className={`${theme == "dark" ? "dark" : "light"}`}>
            <div className="grid md:grid-cols-2 p-5">
                <form className="m-1 flex" onSubmit={(e) => handleSearch(e)}>
                    <span onClick={(e) => handleSearch(e)} className={`${theme == "dark" ? "dark-component" : "light-component"} cursor-pointer outline-none px-2 py-3 flex items-center`}><BsSearch /></span>
                    <input type="text" className={`${theme == "dark" ? "dark-component" : "light-component"} outline-none px-2 py-3`} placeholder="Search for country" value={search} onChange={(e) => setSearch(e.target.value)} required />
                </form>
                <form className="m-1 flex justify-start md:justify-end">
                    <select className={`${theme == "dark" ? "dark-component" : "light-component"} outline-none px-2 py-3`}
                            onChange={(e) => handleFilter(e)}        
                    >
                        <option className="text-sm" value="all">All Countries</option>
                        <option className="" value="Africa">Africa</option>
                        <option className="" value="America">America</option>
                        <option className="" value="Asia">Asia</option>
                        <option className="" value="Europe">Europe</option>
                        <option className="" value="Oceania">Oceania</option>
                    </select>
                </form>
            </div>
            
                {loaded ? <ImSpinner9 className="text-4xl animate-spin absolute top-1/2 left-1/2" />
                :  
                <div className="sm:grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                    {allCountries.map((country) =>
                        <Country key={country.name.common} country={country} />
                    )}
                </div>}
        </div>
    )
}

export default Countries
