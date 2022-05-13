export function getCountries() 
{
    return (
        fetch("https://restcountries.com/v3.1/all")    
        .then((data)=>data.json())
        .then((data)=>data.map((element)=>(element.name.common)))
    )
}

