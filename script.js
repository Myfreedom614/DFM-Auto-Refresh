// ==UserScript==
// @name         DFM Auto Refresh
// @namespace    https://greasyfork.org/en/scripts/427141-dfm-auto-refresh
// @version      1.4
// @description  DFM Auto Refresh Script
// @author       Franklin Chen
// @icon         https://www.google.com/s2/favicons?domain=dynamics.com
// @include      http*://onesupport.crm.dynamics.com/main.aspx*
// @grant        none
// @run-at       document-idle
// @copyright	 2021, Franklin Chen
// ==/UserScript==

(function() {
    'use strict';
    var autoRefreshTimer = null;
    localStorage.setItem("dfm_auto_fresh", 'false');//Init
    var clicker = function () {
        var isStarted = localStorage.getItem("dfm_auto_fresh");
        if(isStarted !== undefined && isStarted === 'true'){
            localStorage.setItem("dfm_auto_fresh", 'false');
            if(autoRefreshTimer!=null){
                clearInterval(autoRefreshTimer);
                console.log('Stopped auto-refresh');
                alert('Stopped auto-refresh');
            }
            return;
        }
        var btn = document.querySelector('button[aria-label="Refresh"]');
        if (btn) {
            localStorage.setItem("dfm_auto_fresh", 'true');
            console.log('Started auto-refresh');
            alert('Started auto-refresh');
            autoRefreshTimer = setInterval (
                function () {
                    btn.click();
                    console.log('Auto Refresh - '+new Date());
                }
                , 60 * 1000 //1 min
            );
        } else {
            alert("No Button found");
        }
	};

    var pageMenuBarCheckTimer = setInterval (
        function () {
            var matches = document.querySelectorAll("ul[role='menubar']");
            if(matches.length > 0) {
                clearInterval(pageMenuBarCheckTimer);
                var liElement = document.createElement('li');
                liElement.innerHTML='<button id="btnAutoRefresh" type="button" style="background-color: greenyellow;" class="pa-ao pa-ap pa-gw pa-bq pa-gx pa-i pa-ax pa-o pa-gy pa-gz pa-ha flexbox"><span aria-hidden="true" class="pa-bi pa-am pa-a pa-cm "><span class="pa-ba pa-k pa-am pa-cg "><img src="/uclient/resources/images/Refresh.svg?v=1.4.2625-2104.3" alt="Auto Refresh" class="pa-hc pa-gf pa-hb pa-gg pa-az " style="width: 16px;"></span></button>';
                var firstChild = matches[0].querySelectorAll('li')[0];
                matches[0].insertBefore(liElement, firstChild);

                var aRButton = document.getElementById('btnAutoRefresh');

                aRButton.addEventListener("click", function () {
                    clicker();
                }, false);
            }
        }
        , 1000
    );
})();