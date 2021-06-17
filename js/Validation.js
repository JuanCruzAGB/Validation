// ? JuanCruzAGB repository
import Class from "../../JuanCruzAGB/js/Class.js";

// ? ValidationJS repository
import Form from "./Form.js";
import Input from "./Input.js";
import Message from "./Message.js";
import Requirement from "./Requirement.js";
import Rule from "./Rule.js";
import Support from "./Support.js";

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
     * @param {array} [props.rules] Validation Rules.
     * @param {array} [props.messages] Validation Messages.
     * @param {object} [state] Validation state:
     * @param {boolean} [state.submit=true] Submit the Form.
     * @param {array} [state.ignore] Ignore some rules.
     * @param {object} [callbacks] Validation callbacks:
     * @param {object} [callbacks.submit] Validation submit callback:
     * @param {function} [callbacks.submit.function] Validation submit function callback.
     * @param {object} [callbacks.submit.params] Validation submit params.
     * @param {object} [callbacks.valid] Validation valid callback:
     * @param {function} [callbacks.valid.function] Validation valid function callback.
     * @param {object} [callbacks.valid.params] Validation valid params.
     * @param {object} [callbacks.invalid] Validation invalid callback:
     * @param {function} [callbacks.invalid.function] Validation invalid function callback.
     * @param {object} [callbacks.invalid.params] Validation invalid params.
     * @memberof Validation
     */
    constructor (props = {
        id: 'validation-1',
        rules: [],
        messages: [],
    }, state = {
        submit: true,
        ignore: [],
    }, callbacks = {
        submit: {
            function: function (params) { /* console.log(params) */ },
            params: {}
    }, valid: {
            function: function (params) { /* console.log("%cEverything is ok :D", "color: lime; font-weight: bold;"); */ },
            params: {}
    }, invalid: {
            function: function (params) { for (const target in params.errors) {
                if (Object.hasOwnProperty.call(params.errors, target)) {
                    const errors = params.errors[target];
                    if (!document.querySelector(`.support-${ target }`)) {
                        for (const error of errors) {
                            console.error(`${ target }: ${ error }`);
                        }
                    }
                }
            } },
            params: {}
    }}) {
        super({ ...Validation.props, ...props }, { ...Validation.state, ...state });
        this.setCallbacks({ ...Validation.callbacks, ...callbacks });
        Rule.ignore(this.props.rules, this.state.ignore);
        this.setForm();
    }

    /**
     * * Set the Validation HTML Element.
     * @memberof Validation
     */
    setForm () {
        this.form = new Form(this.props, {
            submit: this.state.submit,
        }, this.callbacks);
    }

    /**
     * * Invelid an Input.
     * @param {Form} form
     * @param {Input} inputs
     * @param {string} message The error message.
     */
    static invalid (form, input = undefined, message = '') {
        form.addInvalidErrors(input.props.name, message);
        for (const html of input.htmls) {
            html.classList.remove('valid');
            html.classList.add('invalid');
        }
        if (input.support) {
            input.support.addError(message);
        }
        form.execute('invalid', {
            errors: form.errors,
            ...form.callbacks.invalid.params,
        });
    }

    /**
     * * Valid an Input.
     * @param {Form} form
     * @param {Input} inputs
     */
    static valid (form, input = undefined) {
        form.removeInvalidErrors(input.props.name);
        for (const html of input.htmls) {
            html.classList.remove('invalid');
            html.classList.add('valid');
        }
        if (input.support) {
            input.support.removeError();
        }
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
        form.refreshInputs();
        for(let rule of form.props.rules) {
            let status = {
                required: true,
                valid: true,
            }
            if (input === null) {
                status = Form.validate(form, rule, status);
            }
            if (input !== null) {
                status = Input.validate(form, input, rule, status);
            }
            if (!status.valid) {
                valid = false;
            }
        }
        form.changeValidaState(valid);
        if (valid) {
            form.execute('valid',{
                ...((input === null) ? { form: form } : { form: form, input: input }),
                ...form.callbacks.valid.params,
            });
            if (input === null) {
                form.execute('submit', {
                    ...((input === null) ? { form: form } : { form: form, input: input }),
                    ...form.callbacks.submit.params,
                });
                if (form.state.submit) {
                    form.html.submit();
                }
            }
        }
    }

    /** 
     * @static
     * @var {object} props Default properties.
     */
    static props = {
        id: 'validation-1',
        rules: [],
        messages: [],
    }
    
    /** 
     * @static
     * @var {object} state Default state.
     */
    static state = {
        submit: true,
        ignore: [],
    }
    
    /** 
     * @static
     * @var {object} callbacks Default callbacks.
     */
    static callbacks = {
        submit: {
        function: function (params) { /* console.log(params) */ },
        params: {}
    }, valid: {
        function: function (params) { /* console.log("%cEverything is ok :D", "color: lime; font-weight: bold;"); */ },
        params: {}
    }, invalid: {
        function: function (params) { for (const target in params.errors) {
            if (Object.hasOwnProperty.call(params.errors, target)) {
                const errors = params.errors[target];
                if (!document.querySelector(`.support-${ target }`)) {
                    for (const error of errors) {
                        console.error(`${ target }: ${ error }`);
                    }
                }
            }
        } },
        params: {}
    }}
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