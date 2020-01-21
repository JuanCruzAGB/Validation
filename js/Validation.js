let Validation = {
    /** @var {HTMLElements[]} - Array of Forms. */
    forms: [],
    /** Validation loader. */
    load(){
        this.getElements();
    },
    /** Get all the Forms. */
    getElements(){
        let forms = document.querySelectorAll('.form-validate');
        for(let i = 0; i < forms.length; i++){
            this.forms[i] = new Form(forms[i], i);
        }
    },
    /**
     * Execute the validation.
     * @param {string} className - The Form className.
     * @param {Input} input - The Input.
     */
    validate(className, input = null){
        let valid = true;
        let form = Form.get(this.forms, className);
        for(let rule of form.rules){
            let aux = {
                form: form,
                required: true,
                valid: true,
                requirements: rule.requirements,
            };
            if(rule.array){
                aux.array = rule.array;
            }
            if(input !== null && rule.target == input.name){
                aux.inputs = form.getInput(rule.target);
                aux = this.callRequirement(aux);
            }else if(input === null){
                aux.inputs = form.getInput(rule.target);
                aux = this.callRequirement(aux);
            }
            if(!aux.valid){
                valid = false;
            }
        }
        if(valid && input === null){
            // console.log('enviado');
            form.HTML.submit();
        } 
    },
    /**
     * Execute the Requirement and valide, or not, the input.
     * @param {object} aux - An auxiliar of validation.
     */
    callRequirement(aux){
        let requirements = Rule.attach(aux);
        for(let requirement of requirements){
            if(aux.valid && aux.required){
                aux = Requirement[requirement.name](aux, requirement.params);
                if(aux.valid){
                    Validator.set(aux.inputs);
                }else{
                    for(let message of aux.form.messages){
                        for(let error of aux.errors){
                            if(message.target == error.target){
                                Invalidator.set(error, message.getOne(error));
                            }
                        }
                    }
                }
            }
        }
        return aux;
    },
    /**
     * Update a Form.
     * @param {string} className - The Form class name.
     */
    update(className){
        let forms = document.querySelectorAll('.form-validate');
        for(let i = 0; i < forms.length; i++){
            if(forms[i].classList.contains(className)){
                forms[i].classList.add('form-validation-' + i);
                this.forms[i] = new Form(forms[i], i);
            }
        }
    },
};

document.addEventListener('DOMContentLoaded', function(){
    Validation.load();
});