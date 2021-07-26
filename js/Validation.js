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
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export default class Validation {
    /**
     * * Creates an instance of Validation.
     * @param {object} [props] Validation properties:
     * @param {string} [props.id='validation-id'] Validation primary key.
     * @param {array} [props.rules] Validation Rules.
     * @param {array} [props.messages] Validation Messages.
     * @param {object} [state] Validation state:
     * @param {boolean} [state.submit=true] Submit the Form.
     * @param {array} [state.ignore] Ignore some rules.
     * @param {boolean} [state.active=true] If the Validation has to be done.
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
        active: true,
    }, callbacks = {
        submit: {
            function: function (params) { /* console.log(params) */ },
            params: {}
        }, valid: {
            function: function (params) { /* console.log("%cEverything is ok :D", "color: lime; font-weight: bold;"); */ },
            params: {}
        }, invalid: {
            function: Form.defaultInvalid,
            params: {}
    }}) {
        return new Form(props, state, callbacks);
    }

    // ? Validation childs
    static Form = Form;
    static Input = Input;
    static Input = Input;
    static Message = Message;
    static Requirement = Requirement;
    static Rule = Rule;
    static Support = Support;
};