import { Form } from "./Form.js";

/**
 * * Validation makes an excellent Front-end validation.
 * @export
 * @class Validation
 */
export class Validation{
    /**
     * * Creates an instance of Validation.
     * @param {object} properties - Validation properties.
     * @memberof Validation
     */
    constructor(properties = {
        id: 'validation-1',
    }){
        this.setProperties(properties);
        this.setForm();
    }

    /**
     * * Set the Validation properties.
     * @param {object} properties - Validation properties.
     * @memberof Validation
     */
    setProperties(properties = {
        id: 'validation-1'
    }){
        this.properties = {};
        this.setId(properties);
    }

    /**
     * * Set the Validation ID.
     * @param {object} properties - Validation properties.
     * @memberof Validation
     */
    setId(properties = {
        id: 'validation-1'
    }){
        this.properties.id = properties.id;
    }

    /**
     * * Set the Validation HTML Element.
     * @memberof Validation
     */
    setForm(){
        this.form = new Form({
            id: this.properties.id,
        });
    }

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
    }

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
    }

    /**
     * * Validate a Form or an Input.
     * @static
     * @param {Form} form - Form to validate.
     * @param {Input} input - Input to validate.
     * @memberof Validation
     */
    static validate(form = null, input = null){
        let valid = true;
        for(let rule of form.rules){
            let status = {
                required: true,
                valid: true,
            }
            if(input === null){
                status = Validation.validateForm(form, rule, status);
            }else{
                status = Validation.validateInput(form, input, rule, status);
            }
            if(!status.valid){
                valid = false;
            }
        }
        if(valid && input === null){
            form.html.submit();
        }
    }

    /**
     * * Validate a Form.
     * @static
     * @param {Form} form - Form.
     * @param {Rule} rule - Rule.
     * @param {object} status - Validation status.
     * @returns
     * @memberof Validation
     */
    static validateForm(form = null, rule = undefined, status = {
        required: true,
        valid: true,
    }){
        for (const requirement of rule.requirements) {
            if(status.valid && status.required){
                status = requirement.execute(form.getInput(rule.properties.target), status);
                if(status.valid){
                    Validation.valid(form.getInput(rule.properties.target));
                }else{
                    for(let message of form.messages){
                        for(let error of status.errors){
                            if(message.properties.target == error.target){
                                Validation.invalid(form.getInput(message.properties.target), message.getOne(error));
                            }
                        }
                    }
                }
            }
        }
        return status;
    }

    /**
     * * Validate an Input.
     * @static
     * @param {Form} form - Form.
     * @param {Input} input - Input.
     * @param {Rule} rule - Rule.
     * @param {object} status - Validation status.
     * @returns
     * @memberof Validation
     */
    static validateInput(form = null, input = null, rule = undefined, status = {
        required: true,
        valid: true,
    }){
        let requirements = rule.getRequirementsFromInput(input);
        let messages = form.getMessagesFromInput(input);
        for (const requirement of requirements) {
            if(status.valid && status.required){
                status = requirement.execute(input, status);
                if(status.valid){
                    Validation.valid(input);
                }else{
                    for(let message of messages){
                        for(let error of status.errors){
                            if(message.properties.target == error.target){
                                Validation.invalid(input, message.getOne(error));
                            }
                        }
                    }
                }
            }
        }
        return status;
    }

    /**
     * * Valid an Input.
     * @param {Input} inputs - Input.
     */
    static valid(input = undefined){
        for (const html of input.htmls) {
            html.classList.remove('invalid');
            html.classList.add('valid');
            input.support.removeError();
        }
    }

    /**
     * * Invelid an Input.
     * @param {Input} inputs - Input.
     * @param {string} message - The error message.
     */
    static invalid(input = undefined, message = ''){
        for (const html of input.htmls) {
            html.classList.remove('valid');
            html.classList.add('invalid');
            input.support.addError(message);
        }
    }
};