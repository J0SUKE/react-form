import React from "react";
import { render } from "react-dom";
import { StateContext } from "./StateContext";

export default class FormFooter extends React.Component
{
    static contextType = StateContext;

    render()
    {
        return (
            <div className="form-footer">
                <button className="prevBtn">Previos</button>
                <button className="nextBtn">Complete this step</button>
            </div>
        )
    }
}