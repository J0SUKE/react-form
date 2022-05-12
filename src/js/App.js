import React from "react";

import FormHeader from "./components/FormHeader";
import { StateContext } from "./components/StateContext.js";
import BasicInput from "./components/BasicInput";
import FormFooter from "./components/FormFooter";
import Form from "./components/Form";

export default class App extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            steps:3,
            progression:1,
            stepsTitles : ["First Step","Second step","Third step"],
            selectedInput:null,
            selectForm:this.selectField.bind(this),
            setProgression:this.setProgression.bind(this),
        }

        this.FirstStepFields = [
            {
                type:"text",
                name:"FirstName",
                placeholder:"Alexandra",
                label:"First Name"
            },
            {
                type:"text",
                name:"LastName",
                placeholder:"Pedro",
                label:"Last Name"
            },
            {
                type:"email",
                name:"email",
                placeholder:"example@email.com",
                label:"email"   
            },
            {
                type:"password",
                name:"password",
                placeholder:"password",
                label:"password"
            },
            {
                type:"password",
                name:"passwordConfirm",
                placeholder:"password",
                label:"confirm the password"
            }
        ]
    }
    
    render()
    {
        let currentStep;
        
        if (this.state.progression==1) {
            currentStep=<Form step={this.state.progression} fields={this.FirstStepFields}/>;
        }
        
        return (
            <main className="main-container" onClick={(e)=>{e.stopPropagation();this.selectField(e,null)}}>
                <StateContext.Provider value={this.state}>
                    <FormHeader/>
                    {currentStep}
                </StateContext.Provider>
            </main>)
    }

    // selctionne un champ (lui applique des bordures bleus) au click et a la selection
    selectField(e,name)
    {
        e.stopPropagation();
        this.setState({
            selectedInput:name
        })
    }


    // fait avancer ou reculer la progression dans le formulaire 
    setProgression(direction)
    {
        if (direction=="next") {
            this.setState((state)=>({
                progression:(state.progression==state.steps ? state.progression : state.progression+1)
            }))    
        }
        else
        {
            this.setState((state)=>({
                progression:(state.progression==1 ? state.progression : state.progression-1)
            }))    
        }
        
    }

}

