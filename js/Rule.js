class Rule{
    /**
     * Rule constructor.
     * @param {string} target - The target of the Rule.
     * @param {string} requirements - The Requirements of the Rule.
     */
    constructor(target, requirements){
        this.target = target;
        this.parse(requirements);
    }
    /**
     * Parse and split the requirements.
     * @param {array} requirements - The Requirements of the Rule.
     * @return {array}
     */
    parse(requirements){
        requirements = requirements.split("|");
        this.requirements = [];
        for(let i = 0; i < requirements.length; i++){
            this.requirements.push(new Requirement(requirements[i]));
        }
    }
    /**
     * Find all the Rules in the Form.
     * @param {string} className - The Form class name.
     * @return {array}
     */
    static getAll(className){
        let validation = JSON.parse(document.querySelector(className).dataset.validation);
        return validation.rules;
    }
    /**
     * Add an array to a Rule.
     * @param {Rule[]} messages - The Rules created.
     * @param {string} target - The Rule target.
     * @param {string} requirements - The Rule requirements.
     */
    static addArrayMode(rules, target, requirements){
        target = target.split(".");
        for(let i = 0; i < rules.length; i++){
            if(rules[i].target == target[0]){
                requirements = requirements.split("|");
                if(!rules[i].array){
                    rules[i].array = [];
                }
                for(let j = 0; j < requirements.length; j++){
                    rules[i].array.push(new Requirement(requirements[j]));
                }
            }
        }
    }
    /** 
     * Attack the auxiliar Requirements array into the reguler Requirements array.
     * @param {object} - An auxiliar array.
     * @return {Requirement[]}
     */
    static attach(aux){
        if(aux.array){
            for(let requirement of aux.array){
                let found = false;
                for(let req of aux.requirements){
                    if(req == requirement){
                        found = true;
                    }
                }
                if(!found){
                    aux.requirements.push(requirement);
                }
            }
        }
        return aux.requirements;
    }
};