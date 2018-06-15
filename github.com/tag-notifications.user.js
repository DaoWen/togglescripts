// ==UserScript==
// @name         GitHub Notification Tagger
// @namespace    https://nick.vrvilo.me/
// @version      1.0
// @description  Tag GitHub PR notifications based on PR labels
// @author       Nick Vrvilo
// @include      https://github.com/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js
// @require      https://cdn.rawgit.com/DaoWen/toggletools/f3d56fb5/toggletools.js
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/DaoWen/togglescripts/master/github.com/tag-notifications.user.js
// ==/UserScript==

doOnLocationChange('div.notifications-list, div.blankslate', () => {
    'use strict';
    const linkPattern = /^https:\/\/github.com\/(\w+\/\w+)\/pull\/(\d+)$/;
    const linkRewrite = 'https://api.github.com/repos/$1/issues/$2';
    const labelFilter = x => /^wip$/.test(x);

    $('div.notifications-list li.pull-request-notification a.js-notification-target').each((_, prLink) => {
        const prDataURL = $(prLink).attr('href').replace(linkPattern, linkRewrite);
        $.getJSON(prDataURL, prData => {
            const matchedLabels = prData.labels.map(x => x.name).filter(labelFilter);
            if (matchedLabels.length > 0) {
                $(prLink).prepend(`«${matchedLabels.join(",")}» `);
            }
        });
    });

    return true;
}, onlyForURL(/github\.com\/notifications$/));
