import React from "react";
import { render } from "react-dom";
import { StateContext } from "./StateContext";

export default class FormFooter extends React.Component
{
    static contextType = StateContext;

    render()
    {
        const{setProgression,steps,progression} = this.context;
        
        return (
            <div className="form-footer">
                <button className="prevBtn" onClick={(e)=>{e.stopPropagation();setProgression("prev")}}>Previos</button>
                <button className="nextBtn" 
                        onClick={(e)=>{e.stopPropagation();this.submitForm("next")}}
                        >
                    {progression==steps ? "Submit" : "Complete this step"}</button>
            </div>
        )
    }

    submitForm(direction)
    {
        const{fieldStates,setFieldState} = this.props;
        const{setProgression,progression} = this.context;

        if (direction=="prev") {
            setProgression(direction);
            return;    
        }


        let allchecked = true;

        let currentStep;

        //!!!!!ne pas oublier de rétablir l'ordre correct des steps (j'ai inversé le 1 et le 2 pour aller + vite)

        switch (progression) {
            case 1:
                currentStep="firstStepField";      
                break;
            case 2:
                currentStep="SecondStepField";      
                break;
        }

        for(let field in fieldStates[currentStep])
        {
            
            if (!fieldStates[currentStep][field].checked || fieldStates[currentStep][field].value=="") 
            {
                allchecked=false;
                
                console.log(fieldStates[currentStep][field].errorMesg);

                let inputField = document.querySelector(`input[name=\"${field}\"]`).closest(".input-field")
                inputField.classList.add("error");
                setFieldState(progression,field,false,
                        (
                            fieldStates[currentStep][field].errorMesg==null ? 
                                "You have to fill this field" : fieldStates[currentStep][field].errorMesg
                        ),
                        fieldStates[currentStep][field].value);
            }
        }

        if (allchecked) setProgression(direction);

        
    }
}