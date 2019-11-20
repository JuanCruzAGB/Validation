let Rules = {
    /**
     * Get the validation rules.
     * @param {html} form - The form.
     * @return {array}
     */
    get(form){
        if(form.dataset.validation){
            let validation = JSON.parse(form.dataset.validation);
            return this.parse(validation.rules);
        }else{
            console.log('The form called: "' + form.className + '", doens\'t have validation rules.');
        }
    },
    /**
     * Parse and split the validation message.
     * @param {array} rules - The validation rules.
     * @return {array}
     */
    parse(rules){
        let aux = [];
        for(let name in rules){
            aux[name] = rules[name].split("|");
            aux[name] = this.getParams(aux[name]);
        }
        return aux;
    },
    /**
     * Get valiation rules params.
     * @param {array} rules - The rules.
     * @return {array}
     */
    getParams(rules){
        let aux = [];
        for(let position = 0; position < rules.length; position ++){
            if(rules[position].search(/:/) >= 0){
                let rule = rules[position].split(":");
                if(rules[position].search(/,/) >= 0){
                    let params = rule[1].split(',');
                    aux[rule[0]] = [];
                    for(let i = 0; i < params.length; i++){
                        aux[rule[0]].push(params[i]);
                    }
                }else{
                    aux[rule[0]] = rule[1];
                }
            }else{
                aux[rules[position]] = false;
            }
        }
        return aux;
    },
};