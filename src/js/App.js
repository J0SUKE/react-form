import React from "react";

import FormHeader from "./components/FormHeader";
import { StateContext } from "./components/StateContext.js";
import BasicInput from "./components/BasicInput";
import FormFooter from "./components/FormFooter";


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
            passwordValue:"",
            setPassword:this.setPassword.bind(this),
            firstStepStates : 
                            {
                                FirstName:false,
                                LastName:false,
                                email:false,
                                password:false,
                                passwordConfirm:false,
                            },
            setProgression:this.setProgression.bind(this)
        }
    }
    render()
    {
        return (
            <main className="main-container" onClick={(e)=>{e.stopPropagation();this.selectField(e,null)}}>
                <StateContext.Provider value={this.state}>
                    <FormHeader/>
                    <form>
                        <BasicInput type="text" name="FirstName" placeholder="Alexandra" label="First Name"/>
                        <BasicInput type="text" name="LastName" placeholder="Pedro" label="Last Name"/>
                        <BasicInput type="email" name="email" placeholder="example@email.com" label="email"/>
                        <BasicInput type="password" name="password" placeholder="password" label="password"/>
                        <BasicInput type="password" name="passwordConfirm" placeholder="password" label="confirm the password"/>
                    </form>
                    <FormFooter/>
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

    // met a jour l'etat de passwordValue (pour pouvoir la comparer avec le champ de confirmation du mdp )
    setPassword(value)
    {
        this.setState({
            passwordValue:value
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
