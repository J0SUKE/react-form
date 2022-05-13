import React from "react";
import BasicInput from "../BasicInput";
import ListInput from "../ListInput";
import {getCountries} from "../../getData/getListInputData.js";

export const FormStep2 = (props)=>{
    const{setFieldState,fieldStates,fields,step} = props;

    let items = [...fields];

    items = items.map(element =>(
        <ListInput 
                    setFieldState={setFieldState}
                    fieldStates={fieldStates}
                    name={element.name}
                    type={element.type}
                    placeholder={element.placeholder}
                    label={element.label}
                    key={element.name}
                    step={step}
                    apiCall={getCountries}/>                     
    ));

    return (
        <form>    
            {items}
        </form>
    )
}