/**
 * Manage the Messages from the validation.
 * @class Message
 */
export class Message{
    /**
     * * Creates an instance of Message.
     * @param {object} properties - Message properties.
     * @param {object} requirements - Message Requirements.
     * @memberof Message
     */
    constructor(properties = {
        target: undefined,
    }, requirements = {
        requirement: undefined,
        text: undefined
    }){
        this.setProperties(properties);
        this.setRequirements(requirements);
    }

    /**
     * * Set the Message properties.
     * @param {object} properties - Message properties.
     * @memberof Message
     */
    setProperties(properties = {
        target: undefined,
    }){
        this.properties = {};
        this.setTarget(properties);
    }

    /**
     * * Set the Message target.
     * @param {object} properties - Message properties.
     * @memberof Message
     */
    setTarget(properties = {
        target: undefined,
    }){
        this.properties.target = properties.target;
    }

    /**
     * * Set the Message Requirements.
     * @param {object} requirements - Message Requirements.
     * @memberof Message
     */
    setRequirements(requirements = {
        requirement: undefined,
        text: undefined
    }){
        this.requirements = {
            [requirements.requirement]: requirements.text,
        };
    }

    /**
     * * Get one Message.
     * @param {object} error - Error.
     * @returns
     * @memberof Message
     */
    getOne(error = undefined){
        let regexp = new RegExp(':');
        if (this.requirements.hasOwnProperty(error.requirement.name)) {
            const text = this.requirements[error.requirement.name];
            if(regexp.exec(text)){
                let param_regexp =  new RegExp(":" + error.requirement.name);
                return text.replace(param_regexp, error.requirement.param);
            }else{
                return text;
            }
        }
    }
    
    /**
     * * Push the requirement.
     * @param {object} requirement - Requirement.
     * @memberof Message
     */
    push(requirement = {
        name: undefined,
        text: undefined
    }){
        this.requirements[requirement.name] = requirement.text;
    }
    
    /**
     * * Parse all the Messages.
     * @static
     * @param {object} messagesToFor - Messages.
     * @returns
     * @memberof Message
     */
    static getAll(messagesToFor = []){
        let messages = [];
        for (const target in messagesToFor) {
            let rule = target.split('.')[0];
            let requirement = target.split('.')[1];
            if (messagesToFor.hasOwnProperty(target)) {
                const message = messagesToFor[target];
                // if(target.search(/\.\*\./) > 0){
                //     Message.addArrayMode(this.messages, target, messages[target]);
                // }else{
                    let message_found = Message.checkExist(messages, rule)
                    if(!message_found){
                        messages.push(new this({
                            target: rule,
                        },{
                            requirement: requirement,
                            text: message,
                        }));
                    }else{
                        message_found.push({
                            name: requirement,
                            text: message,
                        });
                    }
                // }
            }
        }
        return messages;
    }

    /**
     * Add an array to a Message.
     * @param {Message[]} messages - The Messages created.
     * @param {string} target - The Message target.
     * @param {string} text - The Message text.
     */
    static addArrayMode(messages, target, text){
        target = target.split(".*.");
        for(let message of messages){
            if(message.target == target[0]){
                message.texts[target[1]] = text;
            }
        }
    }

    /**
     * * Check if a target isset in an array of Messages.
     * @static
     * @param {object} messages- Messages.
     * @param {string} target- Message target.
     * @param {object} requirements - Message Requirements.
     * @memberof Message
     */
    static checkExist(messages = [], target = undefined){
        if(messages.length){
            for (const message of messages) {
                if(message.properties.target == target){
                    return message;
                }
            }
            return false;
        }else{
            return false;
        }
    }
};