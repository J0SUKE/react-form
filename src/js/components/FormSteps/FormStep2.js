import React from "react";
import BasicInput from "../BasicInput";
import ListInput from "../ListInput";
import {getCities, getCountries,getDialCodes} from "../../getData/getListInputData.js";


export const FormStep2 = (props)=>{
    const{setFieldState,fieldStates,fields,step} = props;

    let items = [...fields];

    items = items.map(element => {
        let api,available;
        if (element.name=="country") 
        {
            api=getCountries;
            available=true;
        }
        else if(element.name=="city")
        {
            api=getCities;
            available=fieldStates.country.checked;
        }
        else if(element.name=="phonenumber")
        {
            return (
                <BasicInput 
                    setFieldState={setFieldState}
                    fieldStates={fieldStates}
                    name={element.name}
                    type={element.type}
                    placeholder={element.placeholder}
                    label={element.label}
                    key={element.name}
                    step={step}
                    enabled={fieldStates.country.checked}
                    apiCall={getDialCodes}
                    country={fieldStates.country.value}
                    />     
            )
        }

        return (
            <ListInput 
                setFieldState={setFieldState}
                fieldStates={fieldStates}
                name={element.name}
                type={element.type}
                placeholder={element.placeholder}
                label={element.label}
                key={element.name}
                step={step}
                apiCall={api}
                enabled={available}
        />)
    });


    return (
        <form>    
            {items}       
        </form>
    )
}