class Requirement{
    /**
     * Requirement constructor.
     * @param {string} target - The target of the Rule.
     * @param {string} requirements - The Requirements of the Rule.
     */
    constructor(requirement){
        if(requirement.search(/:/) > 0){
            requirement = requirement.split(":");
            this.name = requirement[0];
            if(requirement[1].search(/,/) > 0){
                this.params = requirement[1].split(',');
            }else{
                this.params = requirement[1];
            }
        }else{
            this.name = requirement;
        }
    }
    /**
     * Make an input required.
     * @param {object} aux - An auxiliar.
     * @return {object}
     */
    static required(aux){
        let valid = false;
        for(let input of aux.inputs){
            if(input.HTML.value){
                valid = true;
            }else if(!valid){
                valid = false;
                aux = this.getError('required', aux);
            }
        }
        aux.required = true;
        aux.valid = valid;
        return aux
    };
    /**
     * Make an input nullable.
     * @param {object} aux - An auxiliar.
     * @return {object}
     */
    static nullable(aux){
        let required = true;
        for(let input of aux.inputs){
            if(!input.HTML.value){
                required = false;
            }
        }
        aux.required = required;
        aux.valid = true;
        return aux
    }
    /**
     * Make an input numeric.
     * @param {object} aux - An auxiliar.
     * @return {object}
     */
    static numeric(aux){
        let valid = true;
        for(let input of aux.inputs){
            if(!isNaN(input.HTML.value)){
                valid = true;
            }else{
                valid = false;
                aux = this.getError('numeric', aux);
            }
        }
        aux.valid = valid;
        return aux
    }
    /**
     * Make an input string.
     * @param {object} aux - An auxiliar.
     * @return {object}
     */
    static string(aux){
        let valid = true;
        for(let input of aux.inputs){
            if(typeof input.HTML.value == 'string'){
                valid = true;
            }else{
                valid = false;
                aux = this.getError('string', aux);
            }
        }
        aux.valid = valid;
        return aux
    }
    /**
     * Make an input an email.
     * @param {object} aux - An auxiliar.
     * @return {object}
     */
    static email(aux){
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let valid = true;
        for(let input of aux.inputs){
            if(re.test(input.HTML.value)){
                valid = true;
            }else{
                valid = false;
                aux = this.getError('email', aux);
            }
        }
        aux.valid = valid;
        return aux
    }
    /**
     * Make an input a date.
     * @param {object} aux - An auxiliar.
     * @return {object}
     */
    static date(aux){
        let valid = true;
        for(let input of aux.inputs){
            if(Date.parse(input.HTML.value)){
                valid = true;
            }else{
                valid = false;
                aux = this.getError('date', aux);
            }
        }
        aux.valid = valid;
        return aux
    }
    /**
     * Make an input an array.
     * @param {object} aux - An auxiliar.
     * @return {object}
     */
    static array(aux){
        let valid = true;
        for(let input of aux.inputs){
            if(input.array){
                valid = true;
            }else{
                valid = false;
                aux = this.getError('array', aux);
            }
        }
        aux.valid = valid;
        return aux
    }
    /**
     * Make an input an url.
     * @param {object} aux - An auxiliar.
     * @return {object}
     */
    static url(aux){
        let valid = true;
        for(let input of aux.inputs){
            if(input.HTML.value.search(/https:\/\//) == 0 && input.HTML.value.search(/\./) >= 0){
                valid = true;
            }else if(input.HTML.value.search(/http:\/\//) == 0 && input.HTML.value.search(/\./) >= 0){
                valid = true;
            }else{
                valid = false;
                aux = this.getError('url', aux);
            }
        }
        aux.valid = valid;
        return aux
    }
    /**
     * Put a min length on an input.
     * @param {object} aux - An auxiliar.
     * @return {object}
     */
    static min(aux, params){
        let valid = true;
        for(let input of aux.inputs){
            if(input.HTML.value.length >= parseInt(params)){
                valid = true;
            }else{
                valid = false;
                aux = this.getError('min', aux);
            }
        }
        aux.valid = valid;
        return aux
    }
    /**
     * Put a max length on an input.
     * @param {object} aux - An auxiliar.
     * @return {object}
     */
    static max(aux, params){
        let valid = true;
        for(let input of aux.inputs){
            if(input.HTML.value.length <= parseInt(params)){
                valid = true;
            }else{
                valid = false;
                aux = this.getError('max', aux);
            }
        }
        aux.valid = valid;
        return aux
    }
    /**
     * Put mimetypes on an input.
     * @param {object} aux - An auxiliar.
     * @return {object}
     */
    static mimetypes(aux, params){
        let valid = true;
        for(let input of aux.inputs){
            if(input.HTML.files && input.HTML.files.length){
                let found = false;
                for(let file of input.HTML.files){
                    for(let param of params){
                        if(file.type == param){
                            found = true;
                        }
                    }
                }
                if(found){
                    valid = true;
                }else{
                    valid = false;
                    aux = this.getError('mimetypes', aux);
                }
            }else{
                valid = false;
                aux = this.getError('mimetypes', aux);
            }
        }
        aux.valid = valid;
        return aux
    }
    static exists(aux, params){
        //
    }
    static unique(aux, params){
        //
    }
    /**
     * Make an error property in the auxiliary array.
     * @param {string} name - The Requirement name.
     * @param {object} aux - An auxiliar object.
     * @return {object}
     */
    static getError(name, aux){
        let req;
        for(let requirement of aux.requirements){
            if(requirement.name == name){
                req = requirement;
            }
        }
        aux.error = {
            target: aux.inputs[0].name,
            requirement: req,
        };
        return aux;
    }
};