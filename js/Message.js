// ? JuanCruzAGB repository
import Class from "../../JuanCruzAGB/js/Class.js";

/**
 * * Messages controls the Valdiation Messages.
 * @class Message
 * @extends Class
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class Message extends Class {
    /**
     * * Creates an instance of Message.
     * @param {object} [props] Message properties:
     * @param {string} [props.id='message-1'] Message primary key.
     * @param {object} [props.target=undefined] Message target.
     * @param {object} [state] Message state:
     * @param {object} [reqs] Message requirements properties:
     * @param {string} [reqs.name=undefined] Message requirements name.
     * @param {string} [reqs.text=undefined] Message requirements message.
     * @memberof Message
     */
    constructor (props = {
        id: 'message-1',
        target: undefined,
    }, state = {}, reqs = {
        name: undefined,
        text: undefined
    }) {
        super({ ...Message.props, ...props }, { ...Message.state, state });
        this.setReqs({ ...Message.reqs, ...reqs });
    }

    /**
     * * Set the Message requirements.
     * @param {object} [reqs] Message requirements properties:
     * @param {string} [reqs.name=undefined] Message requirements name.
     * @param {string} [reqs.text=undefined] Message requirements message.
     * @memberof Message
     */
     setReqs (reqs = {
        name: undefined,
        text: undefined
    }) {
        if (!this.reqs) {
            this.reqs = {};
        }
        this.reqs = {
            [reqs.name]: reqs.text,
        };
    }

    /**
     * * Get one Message.
     * @param {object} error Auxiliar Error array.
     * @returns {string}
     * @memberof Message
     */
    getOne (error) {
        if (this.reqs.hasOwnProperty(error.req.name)) {
            const text = this.reqs[error.req.name];
            if (/:/.exec(text)) {
                let param_regexp =  new RegExp(":" + error.req.name);
                return text.replace(param_regexp, error.req.param);
            }
            if (!/:/.exec(text)) {
                return text;
            }
        }
    }
    
    /**
     * * Push a requirement.
     * @param {object} req Message requirement.
     * @param {string} req.name Message requirement name.
     * @param {string} req.text Message requirement message.
     * @memberof Message
     */
    push (req = {
        name: undefined,
        text: undefined
    }) {
        this.reqs[req.name] = req.text;
    }
    
    /**
     * * Parse Messages.
     * @static
     * @param {object} messagesToParse
     * @returns {Message[]}
     * @memberof Message
     */
    static generate (messagesToParse = []) {
        let messages = [], key = 0;
        for (const rule in messagesToParse) {
            if (Object.hasOwnProperty.call(messagesToParse, rule)) {
                const message = messagesToParse[rule];
                let target, req;
                if (/\*\./.exec(rule)) {
                    target = rule.split('*.')[0];
                    req = rule.split('*.')[1];
                }
                if (!/\*\./.exec(rule)) {
                    target = rule.split('.')[0];
                    req = rule.split('.')[1];
                }
                let message_found = Message.checkExist(messages, target);
                if (message_found) {
                    message_found.push({
                        name: req,
                        text: message,
                    });
                }
                if (!message_found) {
                    messages.push(new this({
                        id: `message-${ key }`,
                        target: target,
                    }, {},{
                        name: req,
                        text: message,
                    }));
                    key++;
                }
            }
        }
        return messages;
    }

    /**
     * * Check if a target isset in an array of Messages.
     * @static
     * @param {Message[]} messages
     * @param {string} target
     * @returns {boolean}
     * @memberof Message
     */
    static checkExist (messages = [], target) {
        if (messages.length) {
            for (const message of messages) {
                if (message.props.target === target) {
                    return message;
                }
            }
            return false;
        }
        if (!messages.length) {
            return false;
        }
    }

    /**
     * @static
     * @var {object} props Default properties.
     */
    static props = {
        id: 'message-1',
        target: undefined,
    }
    
    /**
     * @static
     * @var {object} state Default state.
     */
    static state = {
        //
    }
    
    /**
     * @static
     * @var {object} reqs Default requirements properties.
     */
    static reqs = {
        name: undefined,
        text: undefined
    }
};

// ? Default export
export default Message;