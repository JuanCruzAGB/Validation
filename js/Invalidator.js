let Invalidator = {
    /**
     * Make an input invalid.
     * @param {html} input - The input.
     * @param {html} tooltip - The tooltip.
     * @param {string} message - The error message.
     */
    set(input, tooltip, message){
        input.classList.add('invalid');
        tooltip.innerHTML = message;
        tooltip.classList.add('showed');
        input.classList.remove('valid');
    },
};