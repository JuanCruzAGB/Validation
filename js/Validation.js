let Validation = {
    /** @var {HTMLElements[]} - Array of form HTML Element. */
    forms: [],
    /** Validation loader. */
    load(){
        this.getElements();
    },
    /** Get all the form HTML Elements. */
    getElements(){
        let forms = document.querySelectorAll('.form-validate');
        for(let i = 0; i < forms.length; i++){
            forms[i].classList.add('form-validation-' + i);
            this.forms[i] = {};
            this.forms[i].element = forms[i];
            this.getButton(i);
            this.getInputs(i);
            this.forms[i].rules = Rules.get(forms[i]);
            this.forms[i].messages = Messages.get(forms[i]);
        }
    },
    /**
     * Get all the submit buttons.
     * @param {number} number - The number of form.
     */
    getButton(number){
        this.forms[number].button = document.querySelector('.form-validation-' + number + ' .form-submit');
        this.forms[number].button.addEventListener('click', function(e){
            e.preventDefault();
            Validation.validate(number);
        });
    },
    /**
     * Get all the inputs and textareas.
     * @param {number} number - The number of form.
     */
    getInputs(number){
        this.forms[number].inputs = document.querySelectorAll('.form-validation-' + number + ' input, .form-validation-' + number + ' textarea');
        for(let i = 0; i < this.forms[number].inputs.length; i++){
            if(this.forms[number].inputs[i].type == 'text' ||
            this.forms[number].inputs[i].type == 'email' ||
            this.forms[number].inputs[i].type == 'numeric' ||
            this.forms[number].inputs[i].type == 'password' ||
            !this.forms[number].inputs[i].hasAttribute('type')){
                this.forms[number].inputs[i].addEventListener('keyup', function(e){
                    e.preventDefault();
                    Validation.validate(number, this);
                });
            }else{
                this.forms[number].inputs[i].addEventListener('change', function(e){
                    e.preventDefault();
                    Validation.validate(number, this);
                });
            }
        }
    },
    /**
     * Execute the validation.
     * @param {number} number - The number of form.
     * @param {html} input - The input.
     */
    validate(number, input = null){
        let valid = true;
        for(let name in this.forms[number].rules){
            let aux = {
                required: true,
                valid: true,
            };
            for(let requirement in this.forms[number].rules[name]){
                if(input !== null && name == input.name){
                    aux.rules = this.forms[number].rules[name];
                    aux = this.callRequirement(aux, requirement, number, name);
                }else if(input === null){
                    aux.rules = this.forms[number].rules[name];
                    aux = this.callRequirement(aux, requirement, number, name);
                }
            }
            if(!aux.valid){
                valid = false;
            }
        }
        if(valid && input === null){
            this.forms[number].element.submit();
        } 
    },
    /**
     * Execute the Requirement and valide, or not, the input.
     * @param {object} aux - An auxiliar of validation.
     * @param {string} requirement - The Requirement.
     * @param {number} number - The number of form.
     * @param {string} name - The input name.
     */
    callRequirement(aux, requirement, number, name){
        if(aux.valid && aux.required){
            aux = Requirements[requirement].validate(this.getInput(number, name), aux, this.forms[number].rules[name][requirement]);
            if(aux.valid){
                Validator.set(this.getInput(number, name), this.getTooltip(number, name));
            }else{
                Invalidator.set(this.getInput(number, name), this.getTooltip(number, name), Messages.getOne(this.forms[number].messages[name], requirement, this.forms[number].rules[name][requirement]));
            }
        }
        return aux;
    },
    /**
     * Get an input.
     * @param {number} number - The number of form.
     * @param {strinf} name - The input name.
     * @return {html}
     */
    getInput(number, name){
        return document.querySelector('.form-validation-' + number + ' [name=' + name + ']');
    },
    /**
     * Get a tooltip.
     * @param {number} number - The number of form.
     * @param {strinf} name - The input name.
     * @return {html}
     */
    getTooltip(number, name){
        if(document.querySelector('.form-validation-' + number + ' .' + name + '.invalid-tooltip')){
            return document.querySelector('.form-validation-' + number + ' .' + name + '.invalid-tooltip');
        }else{
            return false;
        }
    },
};

document.addEventListener('DOMContentLoaded', function(){
    Validation.load();
});