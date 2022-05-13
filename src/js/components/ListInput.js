import React from "react";
import { StateContext } from "./StateContext";

export default class ListInput extends React.Component
{
    static contextType = StateContext;
    
    constructor(props)
    {
        super(props);

        //on doit stocker une liste des propositions 
        this.state = {
            propositions:[],
        }
        this.getData();
        this.data;
    }

    render()
    {
        const{name,placeholder,label,type,fieldStates} = this.props;
        const{selectForm,selectedInput} = this.context;

        return(
            <div className="input-section">
                <div 
                    className={selectedInput!==name ? "input-field basic-input" : "input-field basic-input selected"}
                    onClick={(e)=>{this.selectFormField(e,name,selectForm);}}
                >
                    <label htmlFor={name}>{label}</label>   
                    <input 
                        type={type} name={name} placeholder={placeholder} id={name}
                        spellCheck="false"
                        onSelect={(e)=>{selectForm(e,name)}}
                        onInput={this.handleInput.bind(this)}
                        value={fieldStates[name].value}
                    />
                    <ArrowDown/>
                    {selectedInput==name ? <Menu 
                                                apiCall={GetCountries} 
                                                proposition={this.state.propositions}
                                                value={fieldStates[name].value}
                                                input={fieldStates[name].value}/> : null}
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

    handleInput(e)
    {
        const{name,setFieldState,fieldStates,step} = this.props;
        
        let value = e.target.value;
        let check=null;

        this.setState({
            propositions:[...FilterData(value,this.data,4)]
        })

        // le setField doit se faire uniquement si l'utilisateur choisit une proposition du menu
        setFieldState(step,name,(check==null ? true : false),check,value);
    }

    getData()
    {
        const{apiCall} = this.props;

        apiCall().then((data)=>{
            this.data = data;
            return this.data
        })
    }


}

/**
 * Autres composants
 */

function ArrowDown() {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#929292" d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z"/></svg>
    )
}

function GPSicon() {
    return  (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#929292" d="M18,4.48a8.45,8.45,0,0,0-12,12l5.27,5.28a1,1,0,0,0,1.42,0L18,16.43A8.45,8.45,0,0,0,18,4.48ZM16.57,15,12,19.59,7.43,15a6.46,6.46,0,1,1,9.14,0ZM9,7.41a4.32,4.32,0,0,0,0,6.1,4.31,4.31,0,0,0,7.36-3,4.24,4.24,0,0,0-1.26-3.05A4.3,4.3,0,0,0,9,7.41Zm4.69,4.68a2.33,2.33,0,1,1,.67-1.63A2.33,2.33,0,0,1,13.64,12.09Z"/></svg>
    )
}



class Menu extends React.Component 
{    
    constructor(props)
    {
        super(props);
    }
    
    render()
    {
        const{input,proposition} = this.props;

        let items;
        if (proposition.length==0) {
            items = (<div className="noResults">No results</div>)    
        }
        else
        {
            items = proposition.map((element)=>(
                <li key={element}><GPSicon/> <p>{element}</p></li>
            ))
        }
        

        let menuContent = (<menu>
                            <ul>
                                {items}
                            </ul>
                        </menu>)

        return (
            (input=="" ? null : menuContent) 
        )
    }
}


function FilterData(input,data,max) 
{
    //data : les données traitées 
    //max le nombre max de propositions renvoyées
    let proposition = [];
    input = input.toLowerCase();
    for (let i = 0; i < data.length; i++) 
    {
        if (proposition.length==max) break;
        
        if (data[i].toLowerCase().startsWith(input)) 
        {
            proposition.push(data[i]);
        }   
    }

    return proposition;

    //renvoie un tableau de chaines de caracteres
    
}