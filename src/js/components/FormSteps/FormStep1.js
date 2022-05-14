import React from "react";
import BasicInput from "../BasicInput";

export const FormStep1 = (props)=>{
    const{setFieldState,fieldStates,fields,step} = props;

    let items = [...fields];

    items = items.map(element =>(
        <BasicInput 
            setFieldState={setFieldState}
            fieldStates={fieldStates}
            name={element.name}
            type={element.type}
            placeholder={element.placeholder}
            label={element.label}
            key={element.name}
            step={step}
            enabled={true}
        />                     
    ));

    return (
        <form>    
            {items}
        </form>
    )
}