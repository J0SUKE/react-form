import React from "react";

import FormHeader from "./components/FormHeader";
import { StateContext } from "./components/StateContext.js";
import Form from "./components/Form";

const FirstStepFields = [
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

const SecondStepField = [
    {
        type:"text",
        name:"country",
        placeholder:"France",
        label:"Country"
    },
    {
        type:"text",
        name:"city",
        placeholder:"Paris",
        label:"City"
    },
    {
        type:"text",
        name:"phonenumber",
        placeholder:"+01 02 03 04 05",
        label:"Phone number"
    },
]



export default class App extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state = {
            steps:2,
            progression:1,
            stepsTitles : ["First Step","Second step"],
            selectedInput:null,
            selectForm:this.selectField.bind(this),
            setProgression:this.setProgression.bind(this),
        }


        this.AllFields = {
            firstStepField : FirstStepFields,
            SecondStepField : SecondStepField,
        }
    }

    render()
    {
    
        return (
            <>
                <StateContext.Provider value={this.state}>
                    {this.state.progression<=this.state.steps ? 
                        <main className="main-container" onClick={(e)=>{e.stopPropagation();this.selectField(e,null)}}>
                            <FormHeader/>
                            <Form fields={this.AllFields}/>
                        </main>        
                        : <EndScreen setProgression={this.setProgression.bind(this)}/>
                    }
                </StateContext.Provider>
            </>
            )
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
                progression:(state.progression==(state.steps+1) ? state.progression : state.progression+1)
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

function EndScreen(props) 
{
    const{setProgression} = props;
    
    return (
        <div className="endScreen">
            <h1>You have completed your subscribtion</h1>
            <div>
                <button onClick={()=>{setProgression("prev")}} className="prevBtn">Go back</button>
                <button className="nextBtn">Close</button>
            </div>
        </div>
    )
}
