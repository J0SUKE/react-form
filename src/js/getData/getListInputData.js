export function getCountries() 
{
    return (
        fetch("https://countriesnow.space/api/v0.1/countries")    
        .then((data)=>data.json())
        .then((resp)=>resp.data)
        .then((data)=>data.map((element)=>(element.country)))
    )
}

export function getCities(country) {
    const encodedParams = new URLSearchParams();
    encodedParams.append("country", country);

    const options = {
        method: 'POST',
        body: encodedParams
    };

    return (
        fetch('https://countriesnow.space/api/v0.1/countries/cities', options)
        .then(response => response.json())
        .then(response => response.data)
        .catch(err => console.error(err))
    )
}


export function getDialCodes(country) {
    const encodedParams = new URLSearchParams();
    encodedParams.append("country", country);

    const options = {
        method: 'POST',
        body: encodedParams
    };

    return (
        fetch('https://countriesnow.space/api/v0.1/countries/codes', options)
        .then(response => response.json())
        .then(response => response.data.dial_code)
        .catch(err => console.error(err))
    )   
}