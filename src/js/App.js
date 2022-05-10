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
            progression:0,
            stepsTitles : ["First Step","Second step","Third step"],
            selectedInput:null,
            selectForm:this.selectField.bind(this)
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
                        <BasicInput type="text" name="email" placeholder="example@email.com" label="email"/>
                        <BasicInput type="password" name="password" placeholder="password" label="password"/>
                        <BasicInput type="password" name="passwordConfirm" placeholder="password" label="confirm the password"/>
                    </form>
                    <FormFooter/>
                </StateContext.Provider>
            </main>)
    }

    selectField(e,name)
    {
        e.stopPropagation();
        this.setState({
            selectedInput:name
        })
    }

}
