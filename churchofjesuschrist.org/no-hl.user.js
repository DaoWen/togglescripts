// ==UserScript==
// @name         Disable LDS Study Tools
// @namespace    https://nick.vrvilo.me/
// @version      1.0
// @description  Remove the study tools highlight functions on churchofjesuschrist.org
// @include      https://www.churchofjesuschrist.org/study/*
// @run-at       document-start
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/DaoWen/togglescripts/master/churchofjesuschrist.org/no-hl.user.js
// ==/UserScript==

(function() {
    const baseFn = document.addEventListener;
    const filteredEvents = ['pointerup', 'pointerdown', 'selectionchange'];
    document.addEventListener = function(type, listener, options) {
        if (filteredEvents.includes(type)) {
            console.log(`DROPPING EVENT LISTENER ${type}`);
        } else {
            baseFn.call(this, type, listener, options)
        }
    };
})();
