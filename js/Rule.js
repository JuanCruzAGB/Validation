// ? ValidationJS repository.
import { Requirement } from "./Requirement.js";

/**
 * * Rule controls the Form Rules.
 * @export
 * @class Rule
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class Rule{
    /**
     * * Creates an instance of Rule.
     * @param {Object} [properties] Rule properties:
     * @param {String} [properties.id] Rule ID.
     * @param {Object} [properties.target] Rule target.
     * @param {Array} [requirements] Rule Requirements.
     * @memberof Rule
     */
    constructor(properties = {
        id: 'rule-1',
        target: undefined,
    }, states = {}, requirements = undefined){
        this.setProperties(properties);
        this.setStates(states);
        this.setRequirements(requirements);
    }

    /**
     * * Set the Rule properties.
     * @param {Object} [properties] Rule properties:
     * @param {String} [properties.id] Rule ID.
     * @param {Object} [properties.target] Rule target.
     * @memberof Rule
     */
    setProperties(properties = {
        id: 'rule-1',
        target: undefined,
    }){
        this.properties = {};
        this.setIDProperty(properties);
        this.setTargetProperty(properties);
    }

    /**
     * * Returns the Rule properties or an specific property.
     * @param {String} [property] Property name.
     * @returns {Object|*}
     * @memberof Rule
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
     * @memberof Rule
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
     * @memberof Rule
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
     * * Set the Rule ID.
     * @param {Object} [properties] Rule properties:
     * @param {String} [properties.id] Rule ID.
     * @memberof Rule
     */
    setIDProperty(properties = {
        id: 'rule-1',
    }){
        if (properties.hasOwnProperty('id')) {
            this.properties.id = properties.id;
        } else {
            this.properties.id = 'rule-1';
        }
    }

    /**
     * * Returns the Rule ID.
     * @returns {String}
     * @memberof Rule
     */
    getIDProperty(){
        return this.properties.id;
    }

    /**
     * * Set the Rule target.
     * @param {Object} [properties] Rule properties:
     * @param {String} [properties.target] Rule target.
     * @memberof Rule
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
     * * Returns the Rule target.
     * @returns {String}
     * @memberof Rule
     */
    getTargetProperty(){
        return this.properties.target;
    }

    /**
     * * Set the Rule states.
     * @param {Object} [states] Rule states:
     * @memberof Rule
     */
    setStates(states = {}){
        this.states = {};
    }

    /**
     * * Returns the Link states or an specific states.
     * @param {String} [property] States name.
     * @returns {Object|*}
     * @memberof Rule
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
     * @memberof Rule
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
     * @memberof Rule
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
     * * Set the Rule Requirements.
     * @param {Array} [requirements] Rule Requirements.
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
     * @returns {Requirement[]}
     * @memberof Rule
     */
    getRequirements(){
        return this.requirements;
    }

    /**
     * * Get the Requirements from an Input.
     * @param {Input} input Input.
     * @returns {Requirement}
     * @memberof Rule
     */
    getRequirementsFromInput(input = undefined){
        let requirements = [];
        for (const requirement of this.getRequirements()) {
            if(this.getProperties('target') == input.getProperties('name')){
                requirements.push(requirement);
            }
        }
        return requirements;
    }

    /**
     * * Generate all the Rules.
     * @static
     * @param {Object} rules Rules.
     * @returns {Rules[]}
     * @memberof Rule
     */
    static generate(rulesToFor = []){
        let rules = [], key = 0;
        for (let target in rulesToFor) {
            if (/\.\*/.exec(target)) {
                target = target.split('.*').shift();
            }
            if (rulesToFor.hasOwnProperty(target)) {
                const requirements = rulesToFor[target];
                rules.push(new this(this.generateProperties(key, target), {}, requirements));
                key++;
            }
        }
        return rules;
    }

    /**
     * * Generate the Rule properties.
     * @static
     * @param {Number} key
     * @param {String} target Rule target.
     * @returns {Object}
     * @memberof Rule
     */
    static generateProperties(key, target){
        return {
            id: `rule-${ key }`,
            target: target,
        };
    }
};