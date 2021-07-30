// ? JuanCruzAGB repository
import Class from "../../JuanCruzAGB/js/Class.js";

// ? ValidationJS repository.
import Support from "./Support.js";

/**
 * * Input controls the <input> created.
 * @export
 * @class Input
 * @extends Class
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export default class Input extends Class {
    /**
     * * Creates an instance of Input.
     * @param {object} [props] Input properties:
     * @param {string} [props.id="input-1"] Input primary key.
     * @param {string} [props.type="text"] Input type.
     * @param {string} [props.name="input"] Input name.
     * @param {Rule} [props.rule="input"] Input Rule.
     * @param {Message} [props.message="input"] Input Message.
     * @param {HTMLElement[]} [htmls] Input HTML Elements.
     * @param {Form} [Form] Parent Form.
     * @memberof Input
     */
    constructor (props = {
        id: "input-1",
        type: "text",
        name: "input",
        rule: undefined,
        message: undefined,
    }, htmls = [], Form) {
        super({ ...Input.props, ...props });
        this.setHTMLs(htmls, Form);
        this.setSupport(Form);
    }

    /**
     * * Set the confirmation Input.
     * @param {Form} Form Parent Form.
     * @param {string} name Input name.
     * @memberof Input
     */
    setConfirmationInput (Form, name = undefined) {
        if (!this.confirmation) {
            this.confirmation = [];
        }
        let input = document.querySelector(`.${ Form.props.id }.form-input[name="${ name }_confirmation"]`);
        if (input) {
            this.confirmation.push(input);
            this.setEvent(input, Form);
        }
    }

    /**
     * * Set the Input event.
     * @param {HTMLElement} html Input HTML Element.
     * @param {Form} Form Parent Form.
     * @memberof Input
     */
    setEvent (html, Form) {
        let instance = this;
        switch (this.props.type.toUpperCase()) {
            case "DATE":
                html.addEventListener("focusout", function (e) {
                    e.preventDefault();
                    Form.validate(instance.props.name);
                });
            case "CHECKBOX":
            case "FILE":
            case "RADIO":
            case "SELECT":
                html.addEventListener("change", function (e) {
                    e.preventDefault();
                    Form.validate(instance.props.name);
                });
                break;
            case "HIDDEN":
                for (const btn of document.querySelectorAll(`.${ this.props.name }-trigger`)) {
                    btn.addEventListener("click", function (e) {
                        e.preventDefault();
                        Form.validate(instance.props.name);
                    });
                }
                break;
            case "NUMBER":
                html.addEventListener("change", function (e) {
                    e.preventDefault();
                    Form.validate(instance.props.name);
                });
            case "PASSWORD":
            case "TEXT":
            case "URL":
                if (html.nodeName === "TEXTAREA") {
                    if (html.classList.contains("ckeditor")) {
                        let input = html;
                        CKEDITOR.instances[html.name].on("change", function (e) {
                            CKEDITOR.instances[input.name].updateElement();
                            Form.validate(instance.props.name);
                        });
                    }
                    if (!html.classList.contains("ckeditor")) {
                        html.addEventListener("focusout", function (e) {
                            e.preventDefault();
                            Form.validate(instance.props.name);
                        });
                    }
                }
                if (html.nodeName === "INPUT") {
                    html.addEventListener("focusout", function (e) {
                        e.preventDefault();
                        Form.validate(instance.props.name);
                    });
                }
                break;
            default:
                console.error(`Input type: ${ this.props.type } does not have event`);
                break;
        }
    }

    /**
     * * Set the Input HTML Element.
     * @param {HTMLElement[]} [html]s Input HTML Elements.
     * @param {Form} [Form] Parent Form.
     * @memberof Input
     */
    setHTMLs (htmls = undefined, Form) {
        if (!this.htmls) {
            this.htmls = [];
        }
        if (htmls) {
            for (const html of htmls) {
                this.htmls.push(html);
                if (html.classList.contains("confirmation")) {
                    this.setConfirmationInput(Form, html.name);
                }
                this.setEvent(html, Form);
            }
        }
    }

    /**
     * * Set the Input Support.
     * @memberof Input
     */
    setSupport (Form) {
        this.support = Support.getDomHTML(Form, this);
    }

    /**
     * * Reloads the Input.
     * @param {Form} Form
     * @memberof Form
     */
    reload (Form) {
        if (this.htmls.length) {
            for (const key in [...this.htmls]) {
                if (Object.hasOwnProperty.call([...this.htmls], key)) {
                    const html = [...this.htmls][key];
                    if (!document.body.contains(html)) {
                        this.htmls.splice(key, 1);
                    }
                }
            }
        }
        let htmls = [];
        Htmls: for (const html of Input.querySelector(Form.props.id)) {
            for (const oldHtml of this.htmls) {
                if (html === oldHtml) {
                    continue Htmls;
                }
            }
            let name = html.name;
            if (/\[/.exec(name)) {
                name = name.split("[").shift();
            }
            if (name === this.props.name) {
                htmls.push(html);
            }
        }
        this.setHTMLs(htmls, Form);
    }

    /**
     * * Invalid the Input.
     * @param {object|false} error The error message.
     * @memberof Input
     */
    invalid (error = false) {
        for (const html of this.htmls) {
            html.classList.remove("valid");
            html.classList.add("invalid");
        }
        if (this.support && error) {
            this.support.addError(this.props.message.getOne(error));
        }
    }

    /**
     * * Valid the Input.
     * @memberof Input
     */
    valid () {
        for (const html of this.htmls) {
            html.classList.remove("invalid");
            html.classList.add("valid");
        }
        if (this.support) {
            this.support.removeError();
        }
    }

    /**
     * * Validate the Input.
     * @returns {boolean}
     * @memberof Input
     */
    validate () {
        let required = true;
        let valid = true;
        let errors = [];
        let array = false;
        for (const req of this.props.rule.reqs) {
            let error = false;
            if (req.props.name === "array") {
                array = true;
            }
            if (valid && required) {
                [ valid, error, required ] = req.execute(this, array);
                if (valid) {
                    this.valid();
                }
                if (!valid) {
                    errors.push({
                        Input: this,
                        req: error.name,
                        message: this.props.message.getOne(error),
                    });
                    this.invalid(error);
                }
            }
        }
        return [ valid, required, errors ];
    }
    
    /**
     * * Generates all the Form <input> HTML Element.
     * @static
     * @param {Form} Form Parent Form.
     * @returns {Input[]}
     * @memberof Input
     */
    static generate (Form) {
        let inputs = [];
        for (const rule of Form.props.rules) {
            let message;
            for (message of Form.props.messages) {
                if (message.props.target === rule.props.target) {
                    break;
                }
            }
            let htmls = [];
            let type = "text";
            for (const html of Input.querySelector(Form.props.id)) {
                let name = html.name;
                if (/\[/.exec(name)) {
                    name = name.split("[").shift();
                }
                if (name === rule.props.target) {
                    switch (html.nodeName) {
                        case "INPUT":
                            if (type !== html.type) {
                                type = html.type;
                            }
                            break;
                        case "SELECT":
                            if (type !== "select") {
                                type = "select";
                            }
                            break;
                    }
                    htmls.push(html);
                }
            }
            inputs.push(new this({
                id: `${ Form.props.id }-${ rule.props.target }`,
                name: rule.props.target,
                type: type,
                rule: rule,
                message: message,
            }, htmls, Form));
        }
        return inputs;
    }

    /**
     * * Input HTML Element query selector.
     * @static
     * @param {string} id_form
     * @returns {HTMLElement[]}
     * @memberof Input
     */
    static querySelector (id_form) {
        return document.querySelectorAll(`.${ id_form }.form-input`);
    }

    /**
     * @static
     * @var {object} props Default properties.
     */
    static props = {
        id: "input-1",
        type: "text",
        name: "input",
        rule: undefined,
        message: undefined,
    }
};