import Image from "next/image"
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

function Country(props) {
    const theme = useSelector(state => state.theme.value)
    const router = useRouter()
    const dispatch = useDispatch()
    
    const[country, setCountry] = useState(props.country)
    function countryDetails(name){
        // dispatch(fetchOneCountry(name))
        console.log(name)
        router.push(`${router.route}/${name} `)
    }


    return (
        <div className={`${theme == "dark" ? "dark-component" : "light-component"} m-8`}>
            <Image src={country.flags.png}
                className="transform hover:scale-110 transition cursor-pointer" 
                alt={country.name.common} 
                width={200} 
                height={150} 
                layout="responsive"
                onClick={()=> countryDetails(country.name.common, true)}
                />
            <div className="details p-5">
                <h4 className="font-bold text-base mb-5">{country.name.common}</h4>
                <p className="text-sm mb-1">population: <span className="font-thin light-text-color">{country.population}</span></p>
                <p className="text-sm mb-1">region: <span className="font-thin light-text-color">{country.region}</span></p>
                <p className="text-sm mb-1">capital: <span className="font-thin light-text-color">{country.capital ? country.capital : country.name.common}</span></p>
            </div>
        </div>
    )
}

export default Country
