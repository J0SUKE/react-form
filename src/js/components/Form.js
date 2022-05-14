import React from "react"
import FormFooter from "./FormFooter"
import {FormStep1} from "./FormSteps/FormStep1.js";
import { FormStep2 } from "./FormSteps/FormStep2";
import {StateContext} from "./StateContext.js";

export default class Form extends React.Component
{
    static contextType = StateContext;
    
    constructor(props)
    {
        super(props);
        const{fields} = this.props;

        let fieldsObject = {};
        
        for(let step in fields)
        {
            let stepObj = {};

            fields[step].forEach(element => {
                stepObj[element.name] = {checked:false,errorMesg:null,value:""}    
            })


            fieldsObject[step] = {...stepObj}
        }

        /*
            "fieldStates": {
                    "firstStepField": "{FirstName: {…}, LastName: {…}, email: {…}, passwor…}",
                    "SecondStepField": "{city: {…}, country: {…}, phonenumber: {…}}"
                }
        */

        this.state = {
            fieldStates : {...fieldsObject},
        }

        
    }
    
    render()
    {
        const{fields} = this.props;
        const{progression} = this.context;
        let form;
        
        if (progression==1) {
            form = <FormStep1 
                step={progression}
                setFieldState={this.setFieldState.bind(this)}
                fieldStates={this.state.fieldStates.firstStepField}
                fields={fields.firstStepField}
                />
        }

        
        else if(progression==2)
        {
            form = <FormStep2
                    step={progression}
                    setFieldState={this.setFieldState.bind(this)}
                    fieldStates={this.state.fieldStates.SecondStepField}
                    fields={fields.SecondStepField}
            />
        }
        
        return (<>
            {form}
            <FormFooter 
                fieldStates={this.state.fieldStates}
                setFieldState={this.setFieldState.bind(this)}
            />
        </>)

    }

    //pour chaque input field cette fonction gere toutes les infos (value,checked,errorMesg)

    setFieldState(step,name,chechState,mesg,value)
    {
        //step (int) :  l'étape du formulaire
        //name (string) : la valeur de l'attribut name du input
        //chechState (boolean) : booléen renvoyé par la fonction de check du input
        //mesg (string) : valeur du message d'erreur (null si il n'y en a pas)
        //value (string) : valeur du input
        
        let stepFieldName;

        switch (step) {
            case 1:
                stepFieldName="firstStepField";
                break;
            case 2:
                stepFieldName="SecondStepField";
                break;
        }


        this.setState((state)=>({
            fieldStates:{
                ...state.fieldStates,
                [stepFieldName]:{
                    ...state.fieldStates[stepFieldName],
                    [name]:{
                        checked:chechState,
                        errorMesg:mesg,
                        value:value
                    }
                }
            }
        }))
    }

}