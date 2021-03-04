// ? ValidationJS repository.
import { Form } from "./Form.js";

/**
 * * Validation makes an excellent Front-end validation.
 * @export
 * @class Validation
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class Validation{
    /**
     * * Creates an instance of Validation.
     * @param {Object} [properties] Validation properties:
     * @param {String} [properties.id] Validation ID.
     * @param {Object} [states] Validation states.
     * @param {Boolean} [states.submit] Validation submit boolean status.
     * @param {Array} [rules] Validation rules.
     * @param {Array} [messages] Validation messages.
     * @memberof Validation
     */
    constructor(properties = {
        id: 'validation-1',
    }, states = {
        submit: true,
    }, rules = [], messages = []){
        this.setProperties(properties);
        this.setStates(states);
        this.setForm(rules, messages);
    }

    /**
     * * Set the Validation properties.
     * @param {Object} [properties] Validation properties:
     * @param {String} [properties.id] Validation ID.
     * @memberof Validation
     */
    setProperties(properties = {
        id: 'validation-1',
    }){
        this.properties = {};
        this.setIDProperty(properties);
    }

    /**
     * * Returns the Validation properties or an specific property.
     * @param {String} [property] Property name.
     * @returns {Object|*}
     * @memberof Validation
     */
    getProperties(property = ''){
        if (property && property != '') {
            return this.properties[property];
        } else {
            return this.properties;
        }
    }

    /**
     * * Check if there is a property.
     * @param {String} property Property name.
     * @returns {Boolean}
     * @memberof Validation
     */
    hasProperty(property = ''){
        if (this.properties.hasOwnProperty(property)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * * Change a property value.
     * @param {String} property Property name.
     * @param {*} value Property value.
     * @memberof Validation
     */
    changeProperty(property = '', value = ''){
        if (this.hasProperty(property)) {
            this.properties[property] = value;
        }
        switch (property) {
            default:
                break;
        }
    }

    /**
     * * Set the Validation ID.
     * @param {Object} [properties] Validation properties:
     * @param {String} [properties.id] Validation ID.
     * @memberof Validation
     */
    setIDProperty(properties = {
        id: 'validation-1',
    }){
        if (properties.hasOwnProperty('id')) {
            this.properties.id = properties.id;
        } else {
            this.properties.id = 'validation-1';
        }
    }

    /**
     * * Returns the Validation ID.
     * @returns {String}
     * @memberof Validation
     */
    getIDProperty(){
        return this.properties.id;
    }

    /**
     * * Set the Validation states.
     * @param {Object} [states] Validation states:
     * @param {Boolean} [states.submit] Validation submit boolean status.
     * @memberof Validation
     */
    setStates(states = {
        submit: true,
    }){
        this.states = {};
        this.setSubmitStatus(states);
    }

    /**
     * * Returns the Link states or an specific states.
     * @param {String} [property] States name.
     * @returns {Object|*}
     * @memberof Validation
     */
    getStates(property = ''){
        if (property && property != '') {
            return this.states[property];
        } else {
            return this.states;
        }
    }

    /**
     * * Check if there is a status.
     * @param {String} name Status name.
     * @returns {Boolean}
     * @memberof Validation
     */
    hasStates(name = ''){
        if (this.states.hasOwnProperty(name)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * * Change a status value.
     * @param {String} status Status name.
     * @param {*} value Status value.
     * @memberof Validation
     */
    changeStatus(status = '', value = ''){
        if (this.hasStates(status)) {
            this.states[status] = value;
        }
        switch (status) {
            default:
                break;
        }
    }
    
    /**
     * * Set the Validation submit boolean status.
     * @param {Object} [properties] Validation properties:
     * @param {Boolean} [states.submit] Validation submit boolean status.
     * @memberof Validation
     */
    setSubmitStatus(properties = {
        submit: true,
    }){
        if (properties.hasOwnProperty('submit')) {
            this.properties.submit = properties.submit;
        } else {
            this.properties.submit = true;
        }
    }

    /**
     * * Returns the Validation submit boolean status.
     * @returns {Boolean}
     * @memberof Validation
     */
    getSubmitStatus(){
        return this.properties.submit;
    }

    /**
     * * Set the Validation HTML Element.
     * @param {Array} [rules] Validation Rules.
     * @param {Array} [messages] Validation Messages.
     * @memberof Validation
     */
    setForm(rules = [], messages = []){
        this.form = new Form({
            id: this.getProperties('id'),
        }, {
            submit: this.getStates('submit'),
        }, rules, messages);
    }

    /**
     * * Returns the Validation Form.
     * @returns {Form}
     * @memberof Validation
     */
    getForm(){
        return this.form;
    }

    /**
     * * Returns the Form valid state.
     * @returns {Boolean}
     * @memberof Validation
     */
    getValid(){
        return this.form.getStates('valid');
    }

    /**
     * * Returns the Form rules.
     * @returns {Array}
     * @memberof Validation
     */
    getRules(){
        return this.form.getRules();
    }

    /**
     * * Returns the Form messages.
     * @returns {Array}
     * @memberof Validation
     */
    getMessages(){
        return this.form.getMessages();
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
        for(let rule of form.getRules()){
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
        form.changeStatus('valid', valid);
        if(valid && input === null && form.getStates('submit')){
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
     * @returns {Object}
     * @memberof Validation
     */
    static validateForm(form = null, rule = undefined, status = {
        required: true,
        valid: true,
        errors: undefined,
    }){
        console.log(rule.getRequirements());
        for (const requirement of rule.getRequirements()) {
            if(status.valid && status.required){
                status = requirement.execute(form.getInputs(rule.getProperties('target')), status);
                if(status.valid){
                    Validation.valid(form.getInputs(rule.getProperties('target')));
                }else{
                    for(let message of form.getMessages()){
                        for(let error of status.errors){
                            if(message.getProperties('target') == error.target){
                                Validation.invalid(form.getInputs(message.getProperties('target')), message.getOne(error));
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
     * @returns {Object}
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
                            if(message.getProperties('target') == error.target){
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