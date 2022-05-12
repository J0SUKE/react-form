import React from "react";

import FormHeader from "./components/FormHeader";
import { StateContext } from "./components/StateContext.js";
import BasicInput from "./components/BasicInput";
import FormFooter from "./components/FormFooter";
import FormStep1 from "./components/FormStep1";

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
            setProgression:this.setProgression.bind(this),
        }
    }
    render()
    {
        let currentStep;
        
        if (this.state.progression==1) {
            currentStep=<FormStep1/>;
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

    submitStep()
    {
        // il faut que tout les champ d'une step soient en checked
        // si un champ a mal été rempli il ne sera pas checked ==> le formulaire indiquera le champ a remplir + le msg d'erreur
        // si le champ n'a pas été rempli , le form indiquera un message : you have to fill this field
        
        

    }
}

