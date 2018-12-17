// ==UserScript==
// @name         Travis-CI Raw Log Links
// @namespace    https://nick.vrvilo.me/
// @version      1.0
// @description  Add direct links to raw logs on build summary pages
// @author       Nick Vrvilo
// @include      https://travis-ci.org/*
// @require      https://cdn.jsdelivr.net/gh/DaoWen/toggletools@f3d56fb5fe57bde600aa55eedcbebd000c2f8f2e/toggletools.js
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/DaoWen/togglescripts/master/travis-ci.org/raw-logs.user.js
// ==/UserScript==

doOnLocationChange('ul.jobs-list a.ember-view', function ($buildLinks) {
    'use strict';

    if ($('.raw-log-link').length > 0) {
        throw new Error("Raw log links already added!");
    }

    $buildLinks.each(function(i) {
        const anchor = $buildLinks[i];
        const buildURL = anchor.getAttribute('href');
        const jobID = buildURL.replace(/.*\//, "");
        const rawLogURL = `https://api.travis-ci.org/jobs/${jobID}/log`;
        $(anchor).after(`<div class="ember-view raw-log-link"><a href="${rawLogURL}">&#x1f4d3;</a></div>`);
    });

    return true;
}, notForURL(/\/(branches|builds|pull_requests)$/));
