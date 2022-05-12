import React from "react"
import BasicInput from "./BasicInput"
import FormFooter from "./FormFooter"
import {FormStep1} from "./FormSteps/FormStep1.js";

export default class Form extends React.Component
{
    constructor(props)
    {
        super(props);

        const{fields} = this.props;


        let fieldsObject = {};
        fields.forEach(element => {
            fieldsObject[element.name] = {checked:false,errorMesg:null,value:""}    
        })


        this.state = {
            fieldStates : fieldsObject,
        }
        
    }
    
    render()
    {
        const{step,fields} = this.props;
        let form;
        if (step==1) {
            form = <FormStep1 
                setFieldState={this.setFieldState.bind(this)}
                fieldStates={this.state.fieldStates}
                FirstStepFields={fields}
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

    setFieldState(name,chechState,mesg,value)
    {
        this.setState((state)=>({
            fieldStates:{
                ...state.fieldStates,
                [name]:{
                    checked:chechState,
                    errorMesg:mesg,
                    value:value
                }
            }
        }))
    }

}