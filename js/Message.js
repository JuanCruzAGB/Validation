/**
 * * Messages controls the Valdiation Messages.
 * @class Message
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class Message{
    /**
     * * Creates an instance of Message.
     * @param {Object} [properties] Message properties:
     * @param {String} [properties.id] Message ID.
     * @param {Object} [properties.target] Message target.
     * @param {Object} [states] Message states:
     * @param {Object} [requirements] Message requirements properties:
     * @param {String} [requirements.name] Message requirements name.
     * @param {String} [requirements.text] Message requirements message.
     * @memberof Message
     */
    constructor(properties = {
        id: 'message-1',
        target: undefined,
    }, states = {}, requirements = {
        name: undefined,
        text: undefined
    }){
        this.setProperties(properties);
        this.setStates(states);
        this.setRequirements(requirements);
    }

    /**
     * * Set the Message properties.
     * @param {Object} [properties] Message properties:
     * @param {String} [properties.id] Message ID.
     * @param {String} [properties.target] Message target.
     * @memberof Message
     */
    setProperties(properties = {
        id: 'message-1',
        target: undefined,
    }){
        this.properties = {};
        this.setIDProperty(properties);
        this.setTargetProperty(properties);
    }

    /**
     * * Returns the Message properties or an specific property.
     * @param {String} [property] Property name.
     * @returns {Object|*}
     * @memberof Message
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
     * @memberof Message
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
     * @memberof Message
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
     * * Set the Message ID.
     * @param {Object} [properties] Message properties:
     * @param {String} [properties.id] Message ID.
     * @memberof Message
     */
    setIDProperty(properties = {
        id: 'message-1',
    }){
        if (properties.hasOwnProperty('id')) {
            this.properties.id = properties.id;
        } else {
            this.properties.id = 'message-1';
        }
    }

    /**
     * * Returns the Message ID.
     * @returns {String}
     * @memberof Message
     */
    getIDProperty(){
        return this.properties.id;
    }

    /**
     * * Set the Message target.
     * @param {Object} [properties] Message properties:
     * @param {String} [properties.target] Message target.
     * @memberof Message
     */
    setTargetProperty(properties = {
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
     * @returns {String}
     * @memberof Message
     */
    getTargetProperty(){
        return this.properties.target;
    }

    /**
     * * Set the Message states.
     * @param {Object} [states] Message states:
     * @memberof Message
     */
    setStates(states = {}){
        this.states = {};
    }

    /**
     * * Returns the Link states or an specific states.
     * @param {String} [property] States name.
     * @returns {Object|*}
     * @memberof Message
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
     * @memberof Message
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
     * @memberof Message
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
     * * Set the Message requirements.
     * @param {Object} [requirements] Message requirements properties:
     * @param {String} [requirements.name] Message requirements name.
     * @param {String} [requirements.text] Message requirements message.
     * @memberof Message
     */
    setRequirements(requirements = {
        name: undefined,
        text: undefined
    }){
        this.requirements = {};
        if (requirements.hasOwnProperty('name') && requirements.hasOwnProperty('text')) {
            this.requirements = {
                [requirements.name]: requirements.text,
            };
        }
    }

    /**
     * * Returns the Message requirements.
     * @returns {Object}
     * @memberof Message
     */
    getRequirements(){
        return this.requirements;
    }

    /**
     * * Get one Message.
     * @param {Object} error Auxiliar Error array.
     * @returns {String}
     * @memberof Message
     */
    getOne(error = undefined){
        if (this.getRequirements().hasOwnProperty(error.requirement.name)) {
            const text = this.getRequirements()[error.requirement.name];
            if(/:/.exec(text)){
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
            this.requirements[requirement.name] = requirement.text;
        } else {
            console.error('There is not a new requirement Message.');
        }
    }
    
    /**
     * * Parse all the Messages.
     * @static
     * @param {Object} messagesToFor Messages to parse.
     * @returns {Message[]}
     * @memberof Message
     */
    static generate(messagesToFor = []){
        let messages = [], key = 0;
        for (const rule in messagesToFor) {
            let target = rule.split('.')[0];
            let requirement = rule.split('.')[1];
            const message = messagesToFor[rule];
            let message_found = Message.checkExist(messages, target);
            if(!message_found){
                messages.push(new this({
                    id: `message-${ key }`,
                    target: target,
                }, {},{
                    name: requirement,
                    text: message,
                }));
                key++;
            }else{
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
     * @param {Message[]} messages Array of Messages.
     * @param {String} target Message target.
     * @returns {Boolean}
     * @memberof Message
     */
    static checkExist(messages = [], target = undefined){
        if(messages.length){
            for (const message of messages) {
                if(message.getProperties('target') == target){
                    return message;
                }
            }
            return false;
        }else{
            return false;
        }
    }
};