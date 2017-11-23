// ==UserScript==
// @name         GitHub No WIP PRs
// @namespace    https://nick.vrvilo.me/
// @version      1.0
// @description  Add button to hide WIP PRs via a negative label filter
// @author       Nick Vrvilo
// @include      https://github.com/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js
// @require      https://raw.githubusercontent.com/DaoWen/toggletools/master/toggletools.js
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/DaoWen/togglescripts/master/github.com/no-wip-prs.user.js
// ==/UserScript==

doOnLocationChange('div.table-list-filters div.states', function ($parent) {
    'use strict';

    const doLinkAdd = function(href, classes, count) {
        if ($('#noWipLink').length >$('#noWipLink').length > 0) {
            console.error("X WIP link already exists! How did this happen?");
        }
        else {
            const labelText = count !== undefined ? `${count} WIP` : 'WIP';
            const linkHTML = `<a href="${href}" id="noWipLink" class="${classes}">&#x1f5d9; ${labelText}</a>`;
            $parent.append(linkHTML);
        }
    };

    const currentLocation = window.location.href;
    const noWipFilter = '+-label%3Awip';

    if (currentLocation.indexOf(noWipFilter) >= 0) {
        // active
        doLinkAdd(currentLocation.replace(noWipFilter, ''), 'btn-link selected');
    }
    else {
        // inactive
        const wipCount = $('a[title="Label: wip"]').length;
        const openPRsLocation = $parent.find('a')[0].href;
        const hasFilterQuery = /\?(|.*&)q=[^&]*$/.test(currentLocation);
        const baseLocation = hasFilterQuery ? currentLocation : openPRsLocation;
        doLinkAdd(baseLocation + noWipFilter, 'btn-link', wipCount);
    }

    return true;
}, onlyForURL(/github\.com\/\w+\/\w+\/pulls([?#].*)?$/));
