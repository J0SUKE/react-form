import React from "react"
import BasicInput from "./BasicInput"
import FormFooter from "./FormFooter"


export default class FormStep1 extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            fieldStates : {
                FirstName:{checked:false,errorMesg:null},
                LastName:{checked:false,errorMesg:null},
                email:{checked:false,errorMesg:null},
                password:{checked:false,errorMesg:null},
                passwordConfirm:{checked:false,errorMesg:null},
            },
        }
    }
    
    
    
    render()
    {
        return (<>
            <form>
                <BasicInput 
                    setErrorMesg={this.setErrorMesg.bind(this)}
                    fieldStates={this.state.fieldStates}
                    type="text" name="FirstName" placeholder="Alexandra" label="First Name"/>
                <BasicInput 
                    setErrorMesg={this.setErrorMesg.bind(this)}
                    fieldStates={this.state.fieldStates}
                    type="text" name="LastName" placeholder="Pedro" label="Last Name"/>
                <BasicInput 
                    setErrorMesg={this.setErrorMesg.bind(this)}
                    fieldStates={this.state.fieldStates}
                    type="email" name="email" placeholder="example@email.com" label="email"/>
                <BasicInput 
                    setErrorMesg={this.setErrorMesg.bind(this)}
                    fieldStates={this.state.fieldStates}
                    type="password" name="password" placeholder="password" label="password"/>
                <BasicInput 
                    setErrorMesg={this.setErrorMesg.bind(this)}
                    fieldStates={this.state.fieldStates}
                    type="password" name="passwordConfirm" placeholder="password" label="confirm the password"/>
            </form>
            <FormFooter 
                fieldStates={this.state.fieldStates}
                setErrorMesg={this.setErrorMesg.bind(this)}/>
        </>)
    }

    setErrorMesg(name,chechState,mesg)
    {
        this.setState((state)=>({
            fieldStates:{
                ...state.fieldStates,
                [name]:{
                    checked:chechState,
                    errorMesg:mesg
                }
            }
            
        }))
    }

}