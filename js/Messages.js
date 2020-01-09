let Messages = {
    /**
     * Get the validation messages.
     * @param {html} form - The form.
     * @return {array}
     */
    get(form){
        if(form.dataset.validation){
            let validation = JSON.parse(form.dataset.validation);
            return this.parse(validation.messages);
        }else{
            console.log('The form called: "' + form.className + '", doens\'t have validation messages.');
        }
    },
    /**
     * Parse and split the validation message.
     * @param {array} messages - The validation messages.
     * @return {array}
     */
    parse(messages){
        let aux = {};
        for(let rule in messages){
            let helper = this.parseRule(rule);
            for(let name in helper){
                if(typeof aux[name] === "undefined"){
                    aux[name] = {};
                }
                for(let fName in helper[name]){
                    aux[name][fName] = messages[rule];
                }
            }
        }
        return aux;
    },
    /**
     * Parse and split the validation rules.
     * @param {string} rule - The validation rules.
     * @return {array}
     */
    parseRule(rule){
        let aux = {};
        if(rule.search(/\./) >= 0){
            aux[rule.split(".")[0]] = {};
            aux[rule.split(".")[0]][rule.split(".")[1]] = {};
        }else{
            console.log("La regla " + rule + " no contiene separador.");
        }
        return aux;
    },
    /**
     * Get one message.
     * @param {Messages} messages - The Message.
     * @param {string} rule - The rule.
     * @param {string} param - The param.
     */
    getOne(messages, rule, param){
        if(Requirements[rule].replacement !== undefined){
            for(let position = 0; position < Requirements[rule].replacement.length; position++){
                return messages[rule].replace(Requirements[rule].replacement[position], param);
            };
        }else{
            for(let requirement in messages){
                console.log(requirement);
                console.log(rule);
                console.log('---');
                if(requirement == rule){
                    return messages[requirement];
                }
            }
        }
    },
};