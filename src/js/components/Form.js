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

    
        this.state = {
            fieldStates : {...fieldsObject},
        }

        
    }
    
    render()
    {
        const{fields,step} = this.props;
        const{progression} = this.context;
        let form;

        //!!!! j'ai inversé les steps , l'ordre correct est dans Sublime TExt

        
        if (progression==1) {
            form = <FormStep1 
                step={1}
                setFieldState={this.setFieldState.bind(this)}
                fieldStates={this.state.fieldStates.firstStepField}
                fields={fields.firstStepField}
                />
        }

        
        else if(progression==2)
        {
            form = <FormStep2
                    step={2}
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

    setFieldState(step,name,chechState,mesg,value)
    {
        //let stepFieldName = (step==1 ? "firstStepField":"SecondStepField" );
        let stepFieldName;

        switch (step) {
            case 1:
                stepFieldName="firstStepField";
                break;
            case 2:
                stepFieldName="SecondStepField";
                break;
            case 3:
                stepFieldName="ThirdStepField";
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