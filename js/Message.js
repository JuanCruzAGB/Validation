// ? JuanCruzAGB repository
import Class from "../../JuanCruzAGB/js/Class.js";

/** @var {object} deafultProps Default properties. */
const deafultProps = {
    id: 'message-1',
    target: undefined,
};

/** @var {object} defaultState Default state. */
const defaultState = {
    //
};

/** @var {object} defaultReqs Default requirements properties. */
const defaultReqs = {
    name: undefined,
    text: undefined
};

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
     * @param {object} [requirements] Message requirements properties:
     * @param {string} [requirements.name=undefined] Message requirements name.
     * @param {string} [requirements.text=undefined] Message requirements message.
     * @memberof Message
     */
    constructor (props = {
        id: 'message-1',
        target: undefined,
    }, state = {}, requirements = {
        name: undefined,
        text: undefined
    }) {
        super({ ...deafultProps, ...props }, { ...defaultState, state });
        this.setReqs({ ...defaultReqs, ...requirements });
    }

    /**
     * * Set the Message requirements.
     * @param {object} [requirements] Message requirements properties:
     * @param {string} [requirements.name=undefined] Message requirements name.
     * @param {string} [requirements.text=undefined] Message requirements message.
     * @memberof Message
     */
     setReqs (requirements = {
        name: undefined,
        text: undefined
    }) {
        if (!this.requirements) {
            this.requirements = {};
        }
        this.requirements = {
            [requirements.name]: requirements.text,
        };
    }

    /**
     * * Get one Message.
     * @param {object} error Auxiliar Error array.
     * @returns {string}
     * @memberof Message
     */
    getOne (error) {
        if (this.requirements.hasOwnProperty(error.requirement.name)) {
            const text = this.requirements[error.requirement.name];
            if (/:/.exec(text)) {
                let param_regexp =  new RegExp(":" + error.requirement.name);
                return text.replace(param_regexp, error.requirement.param);
            } else {
                return text;
            }
        }
    }
    
    /**
     * * Push a requirement.
     * @param {object} requirement Message requirement.
     * @param {string} requirement.name Message requirement name.
     * @param {string} requirement.text Message requirement message.
     * @memberof Message
     */
    push (requirement = {
        name: undefined,
        text: undefined
    }) {
        this.requirements[requirement.name] = requirement.text;
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
            let target, requirement;
            if (/\*\./.exec(rule)) {
                target = rule.split('*.')[0];
                requirement = rule.split('*.')[1];
            } else {
                target = rule.split('.')[0];
                requirement = rule.split('.')[1];
            }
            const message = messagesToParse[rule];
            let message_found = Message.checkExist(messages, target);
            if (!message_found) {
                messages.push(new this({
                    id: `message-${ key }`,
                    target: target,
                }, {},{
                    name: requirement,
                    text: message,
                }));
                key++;
            } else {
                message_found.push({
                    name: requirement,
                    text: message,
                });
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
                if (message.props.target == target) {
                    return message;
                }
            }
            return false;
        } else {
            return false;
        }
    }
};

// ? Default export
export default Message;