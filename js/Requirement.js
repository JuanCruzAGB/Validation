// ? JuanCruzAGB repository
import Class from "../../JuanCruzAGB/js/Class.js";

/**
 * * Requirement controls the Rule requirements.
 * @export
 * @class Requirement
 * @extends Class
 * @author Juan Cruz Armentia <juan.cruz.armentia@gmail.com>
 */
export default class Requirement extends Class {
    /**
     * * Creates an instance of Requirement.
     * @param {object} [props] Requirement properties:
     * @param {string} [props.id='req-1'] Requirement pimary key.
     * @param {object} [props.name='required'] Requirement name.
     * @param {object} [props.param=false] Requirement param.
     * @memberof Requirement
     */
    constructor (props = {
        id: 'req-1',
        name: 'required',
        param: false,
    }) {
        if (/:/.exec(props.name)) {
            let aux = props.name.split(':');
            props.name = aux[0];
            props.param = aux[1];
        }
        super({ ...Requirement.props, ...props });
    }

    /**
     * * Execute the Requirement.
     * @param {Input} input Input to validate.
     * @returns {array}
     * @memberof Requirement
     */
    execute (input = undefined, array = false) {
        let required = true;
        let valid = true;
        let error = false;
        let response = [];
        if (this.hasProp('param')) {
            response = Requirement[this.props.name](input, this.props.param, array);
        }
        if (!this.hasProp('param')) {
            response = Requirement[this.props.name](input);
        }
        if (response.length) {
            if (response.length === 3) {
                [ valid, error, required ] = response;
            }
            if (response.length === 2) {
                [ valid, error ] = response;
            }
        }
        return [ valid, error, required ];
    }

    /**
     * * Make an Input required.
     * @static
     * @param {Input} input Input to valdiate.
     * @returns {array}
     * @memberof Requirement
     */
    static required (input = undefined) {
        let valid = false;
        let error = false;
        let required = true;
        if (input && input.htmls && input.htmls.length) {
            for (const html of input.htmls) {
                if (input.props.type === 'select') {
                    if (!html.options[html.selectedIndex].disabled && html.options[html.selectedIndex].value) {
                        valid = true;
                    }
                    continue;
                } 
                if (input.props.type === 'checkbox' || input.props.type === 'radio') {
                    if (html.checked) {
                        valid = true;
                    }
                    continue;
                }
                if (html.value) {
                    valid = true;
                }
            }
        }
        if (!valid) {
            error = {
                name: "required",
                target: input.props.name,
            };
        }
        return [ valid, error, required ];
    }

    /**
     * * Make an Input nullable.
     * @static
     * @param {Input} input Input to valdiate.
     * @returns {array}
     * @memberof Requirement
     */
    static nullable (input = undefined) {
        let valid = true;
        let error = false;
        let required = false;
        if (input && input.htmls && input.htmls.length) {
            for (const html of input.htmls) {
                if (input.props.type === 'select') {
                    if (!html.options[html.selectedIndex].disabled && html.options[html.selectedIndex].value) {
                        required = true;
                    }
                    continue;
                } 
                if (input.props.type === 'checkbox') {
                    if (html.checked) {
                        required = true;
                    }
                    continue;
                }
                if (html.value) {
                    required = true;
                }
            }
        }
        return [ valid, error, required ];
    }

    /**
     * * Make an Input numeric.
     * @static
     * @param {Input} input Input to valdiate.
     * @returns {object}
     * @memberof Requirement
     */
    static numeric (input = undefined) {
        let valid = false;
        let error = false;
        if (input && input.htmls && input.htmls.length) {
            for (const html of input.htmls) {
                if (!isNaN(html.value)) {
                    valid = true;
                }
            }
        }
        if (!valid) {
            error = {
                name: "numeric",
                target: input.props.name,
            };
        }
        return [ valid, error ];
    }

    /**
     * * Make an Input string.
     * @static
     * @param {Input} input Input to valdiate.
     * @returns {object}
     * @memberof Requirement
     */
    static string (input = undefined) {
        let valid = false;
        let error = false;
        if (input && input.htmls && input.htmls.length) {
            for (const html of input.htmls) {
                if (typeof html.value === 'string') {
                    valid = true;
                }
            }
        }
        if (!valid) {
            error = {
                name: "string",
                target: input.props.name,
            };
        }
        return [ valid, error ];
    }

    /**
     * * Make an Input email.
     * @static
     * @param {Input} input Input to valdiate.
     * @returns {object}
     * @memberof Requirement
     */
    static email (input = undefined) {
        let valid = false;
        let error = false;
        if (input && input.htmls && input.htmls.length) {
            for (const html of input.htmls) {
                if (/(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/.exec(html.value)) {
                    valid = true;
                }
            }
        }
        if (!valid) {
            error = {
                name: "email",
                target: input.props.name,
            };
        }
        return [ valid, error ];
    }

    /**
     * * Make an Input date.
     * @static
     * @param {Input} input Input to valdiate.
     * @returns {object}
     * @memberof Requirement
     */
    static date (input = undefined) {
        let valid = false;
        let error = false;
        if (input && input.htmls && input.htmls.length) {
            for (const html of input.htmls) {
                if (Date.parse(html.value)) {
                    valid = true;
                }
            }
        }
        if (!valid) {
            error = {
                name: "date",
                target: input.props.name,
            };
        }
        return [ valid, error ];
    }

    /**
     * * Make an Input an array.
     * @static
     * @param {Input} input Input to valdiate.
     * @returns {object}
     * @memberof Requirement
     */
    static array (input = undefined) {
        let valid = true;
        let error = false;
        if (input && input.htmls && input.htmls.length) {
            for (const html of input.htmls) {
                if (!/\[/.exec(html.name)) {   
                    valid = false;
                }
            }
        }
        if (!valid) {
            error = {
                name: "array",
                target: input.props.name,
            };
        }
        return [ valid, error ];
    }

    /**
     * * Make an Input an url.
     * @static
     * @param {Input} input Input to valdiate.
     * @returns {object}
     * @memberof Requirement
     */
    static url (input = undefined) {
        let valid = false;
        let error = false;
        if (input && input.htmls && input.htmls.length) {
            for (const html of input.htmls) {
                if (/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.exec(html.value)) {
                    valid = true;
                }
            }
        }
        if (!valid) {
            error = {
                name: "url",
                target: input.props.name,
            };
        }
        return [ valid, error ];
    }

    /**
     * * Put a min length on an Input.
     * @static
     * @param {Input} input Input to valdiate.
     * @param {*} param Requirement param.
     * @returns {object}
     * @memberof Requirement
     */
    static min (input = undefined, param = undefined, array = false) {
        let valid = false;
        let error = false;
        if (input && input.htmls && input.htmls.length) {
            if (array) {
                if (input.htmls.length >= parseInt(param)) {
                    let quantity = 0;
                    for (const html of input.htmls) {
                        if (["checkbox", "radio"].indexOf(input.props.type) >= 0) {
                            if (!html.checked) {
                                break;
                            }
                        } else {
                            if (!html.value) {
                                break;
                            }
                        }
                        quantity++;
                    }
                    if (quantity >= parseInt(param)) {
                        valid = true;
                    }
                }
            }
            if (!array) {
                for (const html of input.htmls) {
                    if (html.value.length >= parseInt(param)) {
                        valid = true;
                    }
                }
            }
        }
        if (!valid) {
            error = {
                name: "min",
                param: param,
                target: input.props.name,
            };
        }
        return [ valid, error ];
    }

    /**
     * * Put a max length on an Input.
     * @static
     * @param {Input} input Input to valdiate.
     * @param {*} param Requirement param.
     * @returns {object}
     * @memberof Requirement
     */
    static max (input = undefined, param = undefined, array = false) {
        let valid = false;
        let error = false;
        if (input && input.htmls && input.htmls.length) {
            if (array) {
                if (input.htmls.length <= parseInt(param)) {
                    let quantity = 0;
                    for (const html of input.htmls) {
                        if (["checkbox", "radio"].indexOf(input.props.type) >= 0) {
                            if (!html.checked) {
                                break;
                            }
                        } else {
                            if (!html.value) {
                                break;
                            }
                        }
                        quantity++;
                    }
                    if (quantity <= parseInt(param)) {
                        valid = true;
                    }
                }
            }
            if (!array) {
                for (const html of input.htmls) {
                    if (html.value.length <= parseInt(param)) {
                        valid = true;
                    }
                }
            }
        }
        if (!valid) {
            error = {
                name: "max",
                param: param,
                target: input.props.name,
            };
        }
        return [ valid, error ];
    }

    /**
     * * Put mimetypes on an Input.
     * @static
     * @param {Input} input Input to valdiate.
     * @param {*} param Requirement param.
     * @returns {object}
     * @memberof Requirement
     */
    static mimetypes (input = undefined, param = undefined) {
        let valid = false;
        let error = false;
        let params = param.split(',');
        if (input && input.htmls && input.htmls.length) {
            for (const html of input.htmls) {
                if (html.files && html.files.length) {
                    let found = false;
                    for(let file of html.files) {
                        for(let param of params) {
                            if (file.type === param) {
                                found = true;
                            }
                        }
                    }
                    if (found) {
                        valid = true;
                    }
                }
            }
        }
        if (!valid) {
            error = {
                name: "mimetypes",
                param: param,
                target: input.props.name,
            };
        }
        return [ valid, error ];
    }

    /**
     * * Check if an Input value match with a RegExp.
     * @static
     * @param {Input} input Input to valdiate.
     * @param {*} param Requirement param.
     * @returns {object}
     * @memberof Requirement
     */
    static regex (input = undefined, param = undefined) {
        let valid = false;
        let error = false;
        if (param[0] === '/') {
            param = param.replace(/^\//, '');
            param = param.replace(/\/g$/, '');
            param = param.replace(/\/i$/, '');
            param = param.replace(/\/gi$/, '');
            param = param.replace(/\/ig$/, '');
            param = param.replace(/\/$/, '');
        }
        if (input && input.htmls && input.htmls.length) {
            for (const html of input.htmls) {
                let regex = new RegExp(param);
                if (regex.exec(html.value)) {
                    valid = true;
                }
            }
        }
        if (!valid) {
            error = {
                name: "regex",
                param: param,
                target: input.props.name,
            };
        }
        return [ valid, error ];
    }

    /**
     * * Check if an Input value exist or not in a data base table.
     * @static
     * @param {Input} input Input to valdiate.
     * @param {*} param Requirement param.
     * @returns {object}
     * @memberof Requirement
     */
    static exists (input = undefined, param = undefined) {
        // TODO Get data from api with FetchServiceProvider.
        let valid = true;
        let error = false;
        console.warn('TODO Check if something exists');
        return [ valid, error ];
    }

    /**
     * * Check if an Input value is unique or not in a data base table.
     * @static
     * @param {Input} input Input to valdiate.
     * @param {*} param Requirement param.
     * @returns {object}
     * @memberof Requirement
     */
    static unique (input = undefined, param = undefined) {
        // TODO Get data from api with FetchServiceProvider.
        let valid = true;
        let error = false;
        console.warn('TODO Check if something is unique');
        return [ valid, error ];
    }

    /**
     * * Check if an Input match with its confirmed Input.
     * @static
     * @param {Input} input Input to valdiate.
     * @returns {object}
     * @memberof Requirement
     */
    static confirmed (input = undefined) {
        let valid = false;
        let error = false;
        if (input && input.htmls && input.htmls.length) {
            for (const html of input.htmls) {
                let input_confirmation = document.querySelector(`[name=${ input.props.name }_confirmation]`);
                if (html.value === input_confirmation.value) {
                    valid = true;
                }
            }
        }
        if (!valid) {
            error = {
                name: "confirmed",
                target: input.props.name,
            };
        }
        return [ valid, error ];
    }

    /**
     * @static
     * @var {object} props Default properties.
     */
    static props = {
        id: 'req-1',
        name: 'required',
        param: false,
    }
};