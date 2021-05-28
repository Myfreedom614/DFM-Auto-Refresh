// ==UserScript==
// @name         DFM Auto Refresh
// @namespace    https://msftbot.com
// @version      1.1
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
            }
            return;
        }
        var btn = document.querySelector('button[aria-label="Refresh"]');
        if (btn) {
            localStorage.setItem("dfm_auto_fresh", 'true');
            console.log('Start Auto Refresh');
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
                liElement.innerHTML='<button id="btnAutoRefresh" type="button" style="background-color: greenyellow;"><span aria-hidden="true" class="pa-bh pa-al pa-a pa-cj "><span class="pa-az pa-k pa-al pa-cd "><img src="/uclient/resources/images/Refresh.svg?v=1.4.2625-2104.3" alt="Auto Refresh" class="pa-hc pa-gf pa-hb pa-gg pa-az " style="width: 24px; margin-top: 12px;"></span></button>';
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