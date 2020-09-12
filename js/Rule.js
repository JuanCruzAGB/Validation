import { Requirement } from "./Requirement.js";

/**
 * * Controls the Form Rules.
 * @export
 * @class Rule
 */
export class Rule{
    /**
     * * Creates an instance of Rule.
     * @param {object} properties - Rule properties.
     * @param {string} requirements - Rule Requirements.
     * @memberof Rule
     */
    constructor(properties = {
        target: undefined
    }, requirements = undefined){
        this.setProperties(properties);
        this.setRequirements(requirements);
    }

    /**
     * * Set the Rule properties.
     * @param {object} properties - Rule properties.
     * @memberof Rule
     */
    setProperties(properties = {
        target: undefined
    }){
        this.properties = {};
        this.setTarget(properties);
    }

    /**
     * * Set the Rule target.
     * @param {object} properties - Rule properties.
     * @memberof Rule
     */
    setTarget(properties = {
        target: undefined
    }){
        this.properties.target = properties.target;
    }

    /**
     * * Set the Rule Requirements.
     * @param {string} requirements - Rule Requirements.
     * @memberof Rule
     */
    setRequirements(requirements = undefined){
        requirements = requirements.split("|");
        this.requirements = [];
        for (const requirement of requirements) {
            this.requirements.push(new Requirement({name: requirement}));
        }
    }

    /**
     * * Get the Requirements from an Input.
     * @param {Input} input - Input.
     * @returns
     * @memberof Rule
     */
    getRequirementsFromInput(input = undefined){
        let requirements = [];
        for (const requirement of this.requirements) {
            if(this.properties.target == input.properties.name){
                requirements.push(requirement);
            }
        }
        return requirements;
    }

    /**
     * * Parse all the Rules.
     * @static
     * @param {object} rules - Rules.
     * @returns
     * @memberof Rule
     */
    static getAll(rulesToFor = []){
        let rules = []
        for (const target in rulesToFor) {
            if (rulesToFor.hasOwnProperty(target)) {
                const requirements = rulesToFor[target];
                // let regexp = new RegExp('.');
                // if(regexp.exec(target)){
                //     Rule.addArrayMode(this.rules, target, rules[target]);
                // }else{
                    rules.push(new this({target: target}, requirements));
                // }
            }
        }
        return rules;
    }

    /**
     * Add an array to a Rule.
     * @param {Rule[]} messages - The Rules created.
     * @param {string} target - The Rule target.
     * @param {string} requirements - The Rule requirements.
     */
    // static addArrayMode(rules, target, requirements){
    //     target = target.split(".");
    //     for(let i = 0; i < rules.length; i++){
    //         if(rules[i].target == target[0]){
    //             requirements = requirements.split("|");
    //             if(!rules[i].array){
    //                 rules[i].array = [];
    //             }
    //             for(let j = 0; j < requirements.length; j++){
    //                 rules[i].array.push(new Requirement(requirements[j]));
    //             }
    //         }
    //     }
    // }

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