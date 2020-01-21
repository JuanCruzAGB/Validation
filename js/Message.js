class Message{
    /**
     * Message constructor.
     * @param {string} target - The target of the Message.
     * @param {string} text - The text of the Message.
     */
    constructor(target, text){
        this.target = target[0];
        this.addRequirement(target[1], text);
        // this.addParam();
    }
    /**
     * Get one message.
     * @param {object} error - The error.
     */
    getOne(error){
        for(let text in this.texts){
            if(text == error.requirement.name){
                if(this.texts[text].search(/\:/) > 0){
                    let re =  new RegExp(":" + error.requirement.name);
                    return this.texts[text].replace(re, error.requirement.params);
                }else{
                    return this.texts[text];
                }
            }
        }
    }
    /**
     * Add a Requirement.
     * @param {string} requirement - The Message Requirement.
     * @param {string} text - The Message text.
     */
    addRequirement(requirement, text){
        if(!this.texts){
            this.texts = {};
        }
        this.texts[requirement] = text;
    }
    /**
     * Find all the Rules in the Form.
     * @param {string} className - The Form class name.
     * @return {array}
     */
    static getAll(className){
        let validation = JSON.parse(document.querySelector(className).dataset.validation);
        return validation.messages;
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
     * Push a Message into an array.
     * @param {Message[]} messages - The Messages created.
     * @param {string} target - The Message target.
     * @param {string} text - The Message text.
     */
    static push(messages, target, text){
        let found = false;
        target = target.split(".");
        for(let message of messages){
            if(message.target == target[0]){
                message.addRequirement(target[1], text);
                found = true;
            }
        }
        if(!found){
            messages.push(new Message(target, text));
        }
    }
};