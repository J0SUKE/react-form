import React from "react";
import {StateContext} from "./StateContext.js";

export default class FormHeader extends React.Component
{
    static contextType = StateContext

    render()
    {
        const{progression,steps,stepsTitles}  = this.context;

        return (
            <div className="form-header">
                <div className="steper-container">
                    <div 
                        className="steper"
                        style={{transform: `scaleX(${progression/steps})`}}
                    ></div>
                </div>
                <h2>{stepsTitles[progression-1]}</h2>
            </div>
        )
    }
}

