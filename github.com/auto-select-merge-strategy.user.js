// ==UserScript==
// @name         GitHub Rebase/Squash selector
// @namespace    https://nick.vrvilo.me/
// @version      1.0
// @description  Auto-select rebase or squashing commits based on the PR name
// @author       Nick Vrvilo
// @include      https://github.com/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js
// @require      https://cdn.jsdelivr.net/gh/DaoWen/toggletools@f3d56fb5fe57bde600aa55eedcbebd000c2f8f2e/toggletools.js
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/DaoWen/togglescripts/master/github.com/auto-select-merge-strategy.user.js
// ==/UserScript==

doOnLocationChange('div.State', function ($state) {
    'use strict';
    if (/Open/.test($state.text())) {
        waitUntil(() => $(".alt-merge-options").length).then(() => {
            const titleText = $(".gh-header-title").text();
            const isRelease = /^\s*(([Rr]elease|[Vv]ersion)\s+)+v?\d+\.\d+/.test(titleText);
            // Rebase & Merge for release commits, but Squash & Merge for all other commits
            const $target = isRelease ? $('#do_rebase') : $('#do_squash');
            console.log($target.id);
            setTimeout(() => $target.click(), 700);
        });
    }

    return true;
}, onlyForURL(/github\.com\/\w+\/\w+\/pull\/\d+/));
