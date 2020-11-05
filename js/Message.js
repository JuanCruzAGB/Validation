/**
 * * Manage the Messages from the validation.
 * @class Message
 */
export class Message{
    /**
     * * Creates an instance of Message.
     * @param {Object} properties Message properties.
     * @param {Object} properties.target Message target.
     * @param {Object} requirements Message requirements properties.
     * @param {String} requirements.name Message requirements name.
     * @param {String} requirements.text Message requirements message.
     * @memberof Message
     */
    constructor(properties = {
        target: undefined,
    }, requirements = {
        name: undefined,
        text: undefined
    }){
        this.setProperties(properties);
        this.setRequirements(requirements);
    }

    /**
     * * Set the Message properties.
     * @param {Object} properties Message properties.
     * @param {Object} properties.target Message target.
     * @memberof Message
     */
    setProperties(properties = {
        target: undefined,
    }){
        this.properties = {};
        this.setTarget(properties);
    }

    /**
     * * Returns the Message properties.
     * @returns {Object} The Message properties.
     * @memberof Message
     */
    getProperties(){
        return this.properties;
    }

    /**
     * * Set the Message target.
     * @param {Object} properties Message properties.
     * @param {Object} properties.target Message target.
     * @memberof Message
     */
    setTarget(properties = {
        target: undefined,
    }){
        if (properties.hasOwnProperty('target')) {
            this.properties.target = properties.target;
        } else {
            this.properties.target = undefined;
        }
    }

    /**
     * * Returns the Message target.
     * @returns {String} The Message target.
     * @memberof Message
     */
    getTarget(){
        return this.properties.target;
    }

    /**
     * * Set the Message requirements.
     * @param {Object} requirements Message requirements properties.
     * @param {String} requirements.name Message requirements name.
     * @param {String} requirements.text Message requirements message.
     * @memberof Message
     */
    setRequirements(requirements = {
        name: undefined,
        text: undefined
    }){
        this.requirements = {};
        if (properties.hasOwnProperty('target')) {
            this.requirements = {
                [requirements.name]: requirements.text,
            };
        }
    }

    /**
     * * Returns the Message requirements.
     * @returns {Object} The Message requirements.
     * @memberof Message
     */
    getRequirements(){
        return this.Requirements;
    }

    /**
     * * Get one Message.
     * @param {Object} error Auxiliar Error array.
     * @returns {String} Get the requirement Message. 
     * @memberof Message
     */
    getOne(error = undefined){
        let regexp = new RegExp(':');
        if (this.getRequirements().hasOwnProperty(error.requirement.name)) {
            const text = this.getRequirements()[error.requirement.name];
            if(regexp.exec(text)){
                let param_regexp =  new RegExp(":" + error.requirement.name);
                return text.replace(param_regexp, error.requirement.param);
            }else{
                return text;
            }
        }
    }
    
    /**
     * * Push a requirement.
     * @param {Object} requirement Message requirement.
     * @param {String} requirement.name Message requirement name.
     * @param {String} requirement.text Message requirement message.
     * @memberof Message
     */
    push(requirement = {
        name: undefined,
        text: undefined
    }){
        if (requirement.hasOwnProperty('name') && requirement.hasOwnProperty('text')) {
            this.requirements[requirements.name] = requirements.text;
        } else {
            console.error('There is not a new requirement Message.');
        }
    }
    
    /**
     * * Parse all the Messages.
     * @static
     * @param {Object} messagesToFor Messages to parse.
     * @returns {Message[]} All the Messages parsed.
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
                            name: requirement,
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
     * * Check if a target isset in an array of Messages.
     * @static
     * @param {Message[]} messages Array of Messages.
     * @param {String} target Message target.
     * @returns {Boolean} The "A target isset in an array of Messages" boolean.
     * @memberof Message
     */
    static checkExist(messages = [], target = undefined){
        if(messages.length){
            for (const message of messages) {
                if(message.getTarget() == target){
                    return message;
                }
            }
            return false;
        }else{
            return false;
        }
    }
};