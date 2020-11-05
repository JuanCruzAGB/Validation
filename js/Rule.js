// * ValidationJS repository.
import { Requirement } from "./Requirement.js";

/**
 * * Controls the Form Rules.
 * @export
 * @class Rule
 */
export class Rule{
    /**
     * * Creates an instance of Rule.
     * @param {Object} properties Rule properties.
     * @param {Object} properties.target Rule target.
     * @param {String} requirements Rule Requirements.
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
     * @param {Object} properties Rule properties.
     * @param {Object} properties.target Rule target.
     * @memberof Rule
     */
    setProperties(properties = {
        target: undefined
    }){
        this.properties = {};
        this.setTarget(properties);
    }

    /**
     * * Returns the Rule properties.
     * @returns {Object} The Rule properties.
     * @memberof Rule
     */
    getProperties(){
        return this.properties;
    }

    /**
     * * Set the Rule target.
     * @param {Object} properties Rule properties.
     * @param {Object} properties.target Rule target.
     * @memberof Rule
     */
    setTarget(properties = {
        target: undefined
    }){
        if (properties.hasOwnProperty('target')) {
            this.properties.target = properties.target;
        } else {
            this.properties.target = propundefined;
        }
    }

    /**
     * * Returns the Rule target.
     * @returns {String} The Rule target.
     * @memberof Rule
     */
    getTarget(){
        return this.properties.target;
    }

    /**
     * * Set the Rule Requirements.
     * @param {String} requirements Rule Requirements.
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
     * * Returns the Rule Requirements.
     * @returns {Requirement[]} The Rule Requirements.
     * @memberof Rule
     */
    getRequirements(){
        return this.requirements;
    }

    /**
     * * Get the Requirements from an Input.
     * @param {Input} input Input.
     * @returns {Requirement} A Requirement from an Input.
     * @memberof Rule
     */
    getRequirementsFromInput(input = undefined){
        let requirements = [];
        for (const requirement of this.getRequirements()) {
            if(this.getTarget() == input.getName()){
                requirements.push(requirement);
            }
        }
        return requirements;
    }

    /**
     * * Parse all the Rules.
     * @static
     * @param {Object} rules Rules.
     * @returns {Rules[]} All the Rules from the Validation.
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
     * * Attach an auxiliar Requirements array into a regular Requirements array.
     * @param {Object} An auxiliar Requirements array.
     * @return {Requirement[]}
     */
    // static attach(aux){
    //     if(aux.array){
    //         for(let requirement of aux.array){
    //             let found = false;
    //             for(let req of aux.requirements){
    //                 if(req == requirement){
    //                     found = true;
    //                 }
    //             }
    //             if(!found){
    //                 aux.requirements.push(requirement);
    //             }
    //         }
    //     }
    //     return aux.requirements;
    // }
};