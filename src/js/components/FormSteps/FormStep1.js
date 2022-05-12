import React from "react";
import BasicInput from "../BasicInput";

export const FormStep1 = (props)=>{
    const{setFieldState,fieldStates,FirstStepFields} = props;

    let items = [...FirstStepFields];

    items = items.map(element =>(
        <BasicInput 
                    setFieldState={setFieldState}
                    fieldStates={fieldStates}
                    name={element.name}
                    type={element.type}
                    placeholder={element.placeholder}
                    label={element.label}
                    key={element.name}/>                     
    ));

    return (
        <form>    
            {items}
        </form>
    )
}