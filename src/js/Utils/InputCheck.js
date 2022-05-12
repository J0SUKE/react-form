export function passwordCheck(input) {
    const numbers = ["0","1","2","3","4","5","6","7","8","9"];
    const specials = [" ","#","!","\"","#","$","%","&","'","(",")","*","+",",","-",".","/",":",";","<","=",">","?","@","[","\\","]","^","_","`","{","|","}","~"];

    if (input.length<8) {
        return "Password must contain at least a 8 caracters";        
    }
    
    input = input.split("");

    let containNumbers = false;
    let containSpecials = false;

    input.forEach(element => {
        if (!containNumbers && numbers.includes(element)) {
            containNumbers=true;
        }
    });

    if (!containNumbers) {
        return "Password must contains at least a number";        
    }
    
    input.forEach(element => {
        if (!containSpecials && specials.includes(element)) {
            containSpecials=true;
        }
    });

    if (!containSpecials) {
        return "Password must contains at least a special caracter";        
    }

    return null;

}

export function emailCheck(input) {

    if (!input.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)) 
    {
        return "invalid email format";    
    }

    return null;
}

export function nameCheck(input) {
    
    if(input.length==0)
    {
        return "name must be atleast 1 caracter";
    }
    
    if (input.match(/[0-9]/)) 
    {
        return "name can't contain numbers";    
    }
    
    if (input.match(/[#!"$%&'\(\)*+,./:;<=>?@\[\]^_`\{\|]/)) 
    {
        return "name can't contain a special caracter other than - ";    
    }
    return null;      
}