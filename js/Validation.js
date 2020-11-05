// * ValidationJS repository.
import { Form } from "./Form.js";

/**
 * * Validation makes an excellent Front-end validation.
 * @export
 * @class Validation
 */
export class Validation{
    /**
     * * Creates an instance of Validation.
     * @param {Object} properties Validation properties.
     * @param {String} properties.id Validation ID.
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
     * @param {Object} properties Validation properties.
     * @param {String} properties.id Validation ID.
     * @memberof Validation
     */
    setProperties(properties = {
        id: 'validation-1'
    }){
        this.properties = {};
        this.setId(properties);
    }

    /**
     * * Returns the Validation properties.
     * @returns {Object} The Validation properties.
     * @memberof Validation
     */
    getProperties(){
        return this.properties;
    }

    /**
     * * Set the Validation ID.
     * @param {Object} properties Validation properties.
     * @param {String} properties.id Validation ID.
     * @memberof Validation
     */
    setId(properties = {
        id: 'validation-1'
    }){
        if (properties.hasOwnProperty('id')) {
            this.properties.id = properties.id;
        } else {
            this.properties.id = 'validation-1';
        }
    }

    /**
     * * Returns the Validation ID.
     * @returns {Object} The Validation ID.
     * @memberof Validation
     */
    getId(){
        return this.properties.id;
    }

    /**
     * * Set the Validation HTML Element.
     * @memberof Validation
     */
    setForm(){
        this.form = new Form({
            id: this.getId(),
        });
    }

    /**
     * * Returns the Validation Form.
     * @returns {Form} The Validation Form.
     * @memberof Validation
     */
    getForm(){
        return this.properties.id;
    }

    /**
     * * Returns the Form valid state.
     * @returns {Boolean} The Form valid state.
     * @memberof Validation
     */
    getValid(){
        return this.form.getValid();
    }

    /**
     * * Validate a Form or an Input.
     * @static
     * @param {Form} form Form to validate.
     * @param {Input} input Input to validate.
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
        form.setValid({valid: valid});
        if(valid && input === null){
            form.getHTML().submit();
        }
    }

    /**
     * * Validate a Form.
     * @static
     * @param {Form} form Form to validate.
     * @param {Rule} rule Rule to check.
     * @param {Object} status Validation status.
     * @param {Boolean} status.required Validation required status.
     * @param {Boolean} status.valid Validation valid status.
     * @param {Object} status.errors Validation error status.
     * @returns {Object} The status.
     * @memberof Validation
     */
    static validateForm(form = null, rule = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }){
        for (const requirement of rule.getRequirements()) {
            if(status.valid && status.required){
                status = requirement.execute(form.getInput(rule.getTarget()), status);
                if(status.valid){
                    Validation.valid(form.getInput(rule.getTarget()));
                }else{
                    for(let message of form.getMessages()){
                        for(let error of status.errors){
                            if(message.getTarget() == error.target){
                                Validation.invalid(form.getInput(message.getTarget()), message.getOne(error));
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
     * @param {Form} form Form to validate.
     * @param {Input} input Input to validate.
     * @param {Rule} rule Rule to check.
     * @param {Object} status Validation status.
     * @param {Boolean} status.required Validation required status.
     * @param {Boolean} status.valid Validation valid status.
     * @param {Object} status.errors Validation error status.
     * @returns {Object} The status.
     * @memberof Validation
     */
    static validateInput(form = null, input = null, rule = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
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
                            if(message.getTarget() == error.target){
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
     * @param {Input} inputs Input.
     */
    static valid(input = undefined){
        for (const html of input.getHTMLs()) {
            html.classList.remove('invalid');
            html.classList.add('valid');
        }
        if(input.hasSupport()){
            input.getSupport().removeError();
        }
    }

    /**
     * * Invelid an Input.
     * @param {Input} inputs Input.
     * @param {String} message The error message.
     */
    static invalid(input = undefined, message = ''){
        for (const html of input.getHTMLs()) {
            html.classList.remove('valid');
            html.classList.add('invalid');
        }
        if(input.hasSupport()){
            input.getSupport().addError(message);
        }
    }
};