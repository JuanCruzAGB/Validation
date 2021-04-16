// ? JuanCruzAGB repository
import Class from "../../JuanCruzAGB/js/Class.js";

/** @var {object} deafultProps Default properties. */
const deafultProps = {
    id: 'support-1',
    type: 'box',
};

/** @var {object} defaultState Default state. */
const defaultState = {
    //
};

/**
 * * Support controls the support tooltip.
 * @export
 * @class Support
 * @extends Class
 * @author Juan Cruz Armentia <juancarmentia@gmail.com>
 */
export class Support extends Class {
    /**
     * * Creates an instance of Support.
     * @param {Object} [props] Support properties:
     * @param {String} [props.id='support-1'] Support primary key.
     * @param {String} [props.type='box'] Support type.
     * @param {Object} [state] Support state:
     * @param {HTMLElemet} html Support HTML Element.
     * @memberof Support
     */
    constructor(props = {
        id: 'support-1',
        type: 'box',
    }, state = {}, html){
        super({ ...deafultProps, ...props }, { ...defaultState, ...state })
        this.setHTML(html);
        this.checkTypeProperty();
    }

    /**
     * * Check the Support type property.
     * @memberof Support
     */
    checkTypeProperty () {
        if (!this.props.hasOwnProperty('type')) {
            if (this.html.classList.contains('support-box')) {
                this.setProps('type', 'box');
            } else {
                this.setProps('type', 'tooltip');
            }
        }
    }
    
    /**
     * * Add the message to the Support.
     * @param {String} message Message to add.
     * @memberof Support
     */
    addError (message = '') {
        switch (this.props.type) {
            default:
                this.html.innerHTML = message;
                this.html.classList.remove('hidden');
                break;
        }
    }

    /**
     * * Remove the Support error.
     * @memberof Support
     */
    removeError () {
        switch (this.props.type) {
            default:
                this.html.innerHTML = '';
                this.html.classList.add('hidden');
                break;
        }
    }

    /**
     * * Get the Support HTML Element.
     * @static
     * @param {Input} input Parent Input.
     * @returns {Support}
     * @memberof Support
     */
    static getDomHTML (input) {
        let html;
        if (html = document.querySelector(`form#${ input.props.id.split(`-${ input.props.name }`).shift() } .support-${ input.props.name }`)) {
            return new this({
                id: `${ input.props.id }-support`,
            }, {}, html);
        }
    }
}

// ? Default export
export default Support;