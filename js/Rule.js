// ? JuanCruzAGB repository
import Class from "../../JuanCruzAGB/js/Class.js";

// ? ValidationJS repository
import Requirement from "./Requirement.js";

/** @var {object} deafultProps Default properties. */
const deafultProps = {
    id: 'rule-1',
    target: undefined,
};

/** @var {object} defaultState Default state. */
const defaultState = {
    //
};

/**
 * * Rule controls the Form Rules.
 * @export
 * @class Rule
 * @extends Class
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class Rule extends Class {
    /**
     * * Creates an instance of Rule.
     * @param {object} [props] Rule properties:
     * @param {string} [props.id='rule-1'] Rule primary key.
     * @param {object} [props.target=undefined] Rule target.
     * @param {array} requirements Rule Requirements.
     * @memberof Rule
     */
    constructor (props = {
        id: 'rule-1',
        target: undefined,
    }, state = {}, requirements) {
        super({ ...deafultProps, ...props }, { ...defaultState, ...state });
        this.setRequirements(requirements);
    }

    /**
     * * Set the Rule Requirements.
     * @param {array} requirements Rule Requirements.
     * @memberof Rule
     */
    setRequirements (requirements) {
        if (!this.requirements) {
            this.requirements = [];
        }
        if (typeof requirements == 'string') {
            requirements = requirements.split("|");
        }
        for (const requirement of requirements) {
            this.requirements.push(new Requirement({ name: requirement }));
        }
    }

    /**
     * * Get the Requirements from an Input.
     * @param {Input} input Input.
     * @returns {Requirement}
     * @memberof Rule
     */
    getRequirementsFromInput (input = undefined) {
        let requirements = [];
        for (const requirement of this.requirements) {
            if(this.props.target == input.props.name){
                requirements.push(requirement);
            }
        }
        return requirements;
    }

    /**
     * * Generate all the Rules.
     * @static
     * @param {object} [rules] Rules.
     * @returns {Rules[]}
     * @memberof Rule
     */
    static generate (rulesToFor = []) {
        let rules = [], key = 0;
        for (const target in rulesToFor) {
            if (Object.hasOwnProperty.call(rulesToFor, target)) {
                const requirements = rulesToFor[target];
                if (/\.\*/.exec(target)) {
                    target = target.split('.*').shift();
                }
                rules.push(new this(this.generateProperties(key, target), {}, requirements));
                key++;
            }
        }
        return rules;
    }

    /**
     * * Generate the Rule properties.
     * @static
     * @param {number} key
     * @param {string} target Rule target.
     * @returns {object}
     * @memberof Rule
     */
    static generateProperties (key, target) {
        return {
            id: `rule-${ key }`,
            target: target,
        };
    }

    /**
     * * Removes the ignored rules.
     * @static
     * @param {array} rules Original Rules.
     * @param {array} ignore Ignored Rules.
     * @memberof Rule
     */
    static ignore (rules, ignore) {
        for (const rule of ignore) {
            if (rules.hasOwnProperty(rule)) {
                delete rules[rule];
            }
        }
    }
};

// ? Default export
export default Rule;