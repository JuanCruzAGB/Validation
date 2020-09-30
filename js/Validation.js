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
     * @param {object} rules - Validation Rules.
     * @param {object} messages - Validation Messages.
     * @memberof Validation
     */
    constructor(properties = {
        id: 'validation-1',
    }, rules = [], messages = []){
        this.setProperties(properties);
        this.setForm(rules, messages);
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

    // TODO
    /**
     * * Set the Validation properties.
     * @param {object} conditional - Validation conditional.
     * @memberof Validation
     */
    setConditional(conditional = {
        target: undefined,
        comparator: '=',
        value: undefined
    }){
        this.conditional = {};
        if(conditional.target){
            this.conditional.target = conditional.target;
        }
        if(conditional.comparator){
            this.conditional.comparator = conditional.comparator;
        }
        if(conditional.value){
            this.conditional.value = conditional.value;
        }
    }

    /**
     * * Set the Validation HTML Element.
     * @param {object} rules - Validation Rules.
     * @param {object} messages - Validation Messages.
     * @memberof Validation
     */
    setForm(rules = [], messages = []){
        this.form = new Form({
            id: this.properties.id,
        }, rules, messages);
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
        }
        if(input.support){
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
        }
        if(input.support){
            input.support.addError(message);
        }
    }
};