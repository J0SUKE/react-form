import React from "react";
import { StateContext } from "./StateContext";
import {emailCheck,passwordCheck,nameCheck} from "../Utils/InputCheck.js";

export default class BasicInput extends React.Component
{
    // contexte de App (la variable state de App)
    static contextType = StateContext;

    constructor(props)
    {
        super(props);
        this.state = {
            passwordHidden:true,
        }
    }

    render()
    {
        const{name,placeholder,label,type,fieldStates} = this.props;
        const{selectForm,selectedInput} = this.context;


        return (
            <div className="input-section">
                <div 
                    className={selectedInput!==name ? "input-field basic-input" : "input-field basic-input selected"}
                    onClick={(e)=>{this.selectFormField(e,name,selectForm);}}
                >
                    
                    <label htmlFor={name}>{label}</label>
                    
                    <input 
                        id={name} name={name} placeholder={placeholder}
                        type={type=="password" ? (this.state.passwordHidden ? "password" : "text") : type}
                        onSelect={(e)=>{selectForm(e,name)}}
                        spellCheck="false"
                        value={fieldStates[name].value}
                        onInput={this.handleInput.bind(this)}
                    />
                    
                    {type=="password" ? 
                        (this.state.passwordHidden ? <Eye onClick={this.togglePassword.bind(this)}/> : 
                                                    <EyeSlashed onClick={this.togglePassword.bind(this)}/>
                        ) 
                        : null 
                    }
                </div>
                
                <p className="input-notif">{fieldStates[name].errorMesg}</p>
            
            </div>
        )
    }

    selectFormField(e,name,selectForm) {
        let target;
        if (e.target.className=="input-field" ) {
            target=e.target
        }
        else
        {
            target=e.target.closest(".input-field");
        }
        target.querySelector("input").focus();
        
        selectForm(e,name);

    }

    togglePassword(e)
    {
        e.stopPropagation();
        this.setState((state)=>({
            passwordHidden:!state.passwordHidden
        }))
    }

    handleInput(e)
    {
        const{type,name,setFieldState,fieldStates,step} = this.props;
        
        let value = e.target.value;
        let check=null;


        if(name=="FirstName" || name=="LastName") check = nameCheck(value);

        else if(type=="email") check = emailCheck(value);
        
        else if (name=="password") check = passwordCheck(value);
        
        else if (name=="passwordConfirm") check = this.checkPasswordMatch(fieldStates.password.value,value);

        setFieldState(step,name,(check==null ? true : false),check,value);
    }

    checkPasswordMatch(password,confirmation)
    {
        if (password!==confirmation) {
            return "Passwords does not match";
        }
        return null;
    }
}

/**
 * Other Components
 */


function Eye({onClick}) {
    return (<svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#929292" d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z"/></svg>);
}

function EyeSlashed({onClick})
{
    return (<svg onClick={onClick} xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24"><path fill="#929292" d="M10.94,6.08A6.93,6.93,0,0,1,12,6c3.18,0,6.17,2.29,7.91,6a15.23,15.23,0,0,1-.9,1.64,1,1,0,0,0-.16.55,1,1,0,0,0,1.86.5,15.77,15.77,0,0,0,1.21-2.3,1,1,0,0,0,0-.79C19.9,6.91,16.1,4,12,4a7.77,7.77,0,0,0-1.4.12,1,1,0,1,0,.34,2ZM3.71,2.29A1,1,0,0,0,2.29,3.71L5.39,6.8a14.62,14.62,0,0,0-3.31,4.8,1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20a9.26,9.26,0,0,0,5.05-1.54l3.24,3.25a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Zm6.36,9.19,2.45,2.45A1.81,1.81,0,0,1,12,14a2,2,0,0,1-2-2A1.81,1.81,0,0,1,10.07,11.48ZM12,18c-3.18,0-6.17-2.29-7.9-6A12.09,12.09,0,0,1,6.8,8.21L8.57,10A4,4,0,0,0,14,15.43L15.59,17A7.24,7.24,0,0,1,12,18Z"/></svg>)   
}