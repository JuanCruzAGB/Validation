// ? JuanCruzAGB repository
import Class from "../../JuanCruzAGB/js/Class.js";

// ? ValidationJS repository
import Form from "./Form.js";
import Input from "./Input.js";
import Message from "./Message.js";
import Requirement from "./Requirement.js";
import Rule from "./Rule.js";
import Support from "./Support.js";

/** @var {object} deafultProps Default properties. */
const deafultProps = {
    id: 'validation-1',
};

/** @var {object} defaultState Default state. */
const defaultState = {
    submit: true,
    ignore: [],
};

/**
 * * Validation makes an excellent Front-end validation.
 * @export
 * @class Validation
 * @extends Class
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class Validation extends Class {
    /**
     * * Creates an instance of Validation.
     * @param {object} [props] Validation properties:
     * @param {string} [props.id='validation-id'] Validation primary key.
     * @param {object} [state] Validation state:
     * @param {boolean} [state.submit=true] Submit the Form.
     * @param {array} [state.ignore] Ignore some rules.
     * @param {array} [rules] Validation Rules.
     * @param {array} [messages] Validation Messages.
     * @memberof Validation
     */
    constructor (props = {
        id: 'validation-1',
    }, state = {
        submit: true,
        ignore: [],
    }, rules = [], messages = []) {
        super({ ...deafultProps, ...props }, { ...defaultState, ...state });
        Rule.ignore(rules, this.state.ignore);
        this.setForm(rules, messages);
    }

    /**
     * * Set the Validation HTML Element.
     * @param {array} [rules] Validation Rules.
     * @param {array} [messages] Validation Messages.
     * @memberof Validation
     */
    setForm (rules = [], messages = []) {
        this.form = new Form({
            id: this.props.id,
        }, {
            submit: this.state.submit,
        }, rules, messages);
    }

    /**
     * * Validate a Form or an Input.
     * @static
     * @param {Form} form Form to validate.
     * @param {Input} [input=null] Input to validate.
     * @memberof Validation
     */
    static validate (form, input = null) {
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
        form.changeValidaState(valid);
        if(valid && input === null && form.state.submit){
            form.html.submit();
        }
    }

    /**
     * * Validate a Form.
     * @static
     * @param {Form} form Form to validate.
     * @param {Rule} rule Rule to check.
     * @param {object} status Validation status:
     * @param {boolean} status.required Validation required status.
     * @param {boolean} status.valid Validation valid status.
     * @param {object} status.errors Validation error status.
     * @returns {object}
     * @memberof Validation
     */
    static validateForm (form, rule, status = {
        required: true,
        valid: true,
        errors: undefined,
    }) {
        for (const requirement of rule.requirements) {
            // console.log(status.valid && status.required);
            if (status.valid && status.required) {
                status = requirement.execute(form.getInputByName(rule.props.target), status);
                if (status.valid) {
                    Validation.valid(form.getInputByName(rule.props.target));
                } else {
                    for (let message of form.messages) {
                        for (let error of status.errors) {
                            if (message.props.target == error.target) {
                                Validation.invalid(form.getInputByName(message.props.target), message.getOne(error));
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
     * @param {object} status Validation status:
     * @param {boolean} status.required Validation required status.
     * @param {boolean} status.valid Validation valid status.
     * @param {object} status.errors Validation error status.
     * @returns {object}
     * @memberof Validation
     */
    static validateInput (form, input, rule, status = {
        required: true,
        valid: true,
        errors: undefined,
    }) {
        let requirements = rule.getRequirementsFromInput(input);
        let messages = form.getMessagesFromInput(input);
        for (const requirement of requirements) {
            if (status.valid && status.required) {
                status = requirement.execute(input, status);
                if (status.valid) {
                    Validation.valid(input);
                } else {
                    for (let message of messages) {
                        for (let error of status.errors) {
                            if (message.props.target == error.target) {
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
    static valid (input = undefined) {
        for (const html of input.htmls) {
            html.classList.remove('invalid');
            html.classList.add('valid');
        }
        if (input.hasOwnProperty('support')) {
            input.support.removeError();
        }
    }

    /**
     * * Invelid an Input.
     * @param {Input} inputs Input.
     * @param {string} message The error message.
     */
    static invalid(input = undefined, message = ''){
        for (const html of input.htmls) {
            html.classList.remove('valid');
            html.classList.add('invalid');
        }
        if(input.hasOwnProperty('support')){
            input.support.addError(message);
        }
    }
};

// ? Validation childs
Validation.Form = Form;
Validation.Input = Input;
Validation.Input = Input;
Validation.Message = Message;
Validation.Requirement = Requirement;
Validation.Rule = Rule;
Validation.Support = Support;

// ? Default export
export default Validation;