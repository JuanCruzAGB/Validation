// ? JuanCruzAGB repository
import Class from "../../JuanCruzAGB/js/Class.js";

// ? ValidationJS repository
import Requirement from "./Requirement.js";

/**
 * * Rule controls the Form Rules.
 * @export
 * @class Rule
 * @extends Class
 * @author Juan Cruz Armentia <juan.cruz.armentia@gmail.com>
 */
export default class Rule extends Class {
    /**
     * * Creates an instance of Rule.
     * @param {object} [props] Rule properties:
     * @param {string} [props.id='rule-1'] Rule primary key.
     * @param {object} [props.target=undefined] Rule target.
     * @param {array} reqs Rule Requirements.
     * @memberof Rule
     */
    constructor (props = {
        id: 'rule-1',
        target: undefined,
    }, reqs) {
        super({ ...Rule.props, ...props });
        this.setReqs(reqs);
    }

    /**
     * * Set the array indexes Requirements.
     * @param {array} [array] Requirements from indexes
     * @memberof Rule
     */
    setArrayReqs (array = []) {
        if (!this.array) {
            this.array = [];
        }
        for (const element of array) {
            if (typeof element.reqs === 'string') {
                element.reqs = element.reqs.split("|");
            }
            let reqs = element.reqs;
            element.reqs = [];
            for (const req of reqs) {
                element.reqs.push(new Requirement({ name: req }));
            }
            this.array.push(element);
        }
    }

    /**
     * * Set the Rule Requirements.
     * @param {array} [reqs] Rule Requirements.
     * @memberof Rule
     */
    setReqs (reqs = []) {
        if (!this.reqs) {
            this.reqs = [];
        }
        if (typeof reqs === 'string') {
            reqs = reqs.split("|");
        }
        for (const req of reqs) {
            this.reqs.push(new Requirement({ name: req }));
        }
    }

    /**
     * * Generate all the Rules.
     * @static
     * @param {array} [rules] Rules.
     * @param {array} [ignore] Rules to ignore.
     * @returns {Rules[]}
     * @memberof Rule
     */
    static generate (rulesToFor = [], ignore = []) {
        let rules = [], key = 0;
        Rule.ignore(rulesToFor, ignore);
        for (const target in rulesToFor) {
            if (Object.hasOwnProperty.call(rulesToFor, target)) {
                const reqs = rulesToFor[target];
                if (/\./.exec(target)) {
                    for (const rule of rules) {
                        if (target.split('.')[0] === rule.props.target) {
                            rule.setArrayReqs([{ index: target.split('.')[1], reqs: reqs }]);
                        }
                    }
                }
                if (!/\.\*/.exec(target)) {
                    rules.push(new this({
                        id: `rule-${ key }`,
                        target: target,
                    }, reqs));
                    key++;
                }
            }
        }
        return rules;
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

    /**
     * @static
     * @var {object} props Default properties.
     */
    static props = {
        id: 'rule-1',
        target: undefined,
    }
};