import React from "react";
import { render } from "react-dom";
import { StateContext } from "./StateContext";

export default class FormFooter extends React.Component
{
    static contextType = StateContext;

    render()
    {
        const{setProgression} = this.context;
        
        return (
            <div className="form-footer">
                <button className="prevBtn" onClick={(e)=>{e.stopPropagation();setProgression("prev")}}>Previos</button>
                <button className="nextBtn" 
                        onClick={(e)=>{e.stopPropagation();this.submitForm("next")}}>
                    Complete this step</button>
            </div>
        )
    }

    submitForm(direction)
    {
        const{fieldStates,setFieldState} = this.props;
        const{setProgression} = this.context;

        if (direction=="prev") {
            setProgression(direction);
            return;    
        }

        let allchecked = true;

        for(let field in fieldStates)
        {
            if (!fieldStates[field].checked) 
            {
                allchecked=false;
                
                let inputField = document.querySelector(`input[name=\"${field}\"]`).closest(".input-field")
                inputField.classList.add("error");
                setFieldState(field,false,
                        (
                            fieldStates[field].errorMesg==null ? 
                                "You have to fill this field" : fieldStates[field].errorMesg
                        ),
                        fieldStates[field].value);
            }
        }

        if (allchecked) setProgression(direction);

        
    }
}