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
                <button className="prevBtn" onClick={()=>{setProgression("prev")}}>Previos</button>
                <button className="nextBtn" onClick={()=>{this.submitForm("next")}}>Complete this step</button>
            </div>
        )
    }

    submitForm(direction)
    {
        const{firstStepStates,setProgression} = this.context;

        for(var field in firstStepStates)
        {
            if (!firstStepStates[field]) 
            {
                return false;    
            }
        }
        setProgression(direction)
    }
}