// ==UserScript==
// @name         Append to google search
// @namespace    https://github.com/adelta66/
// @version      2025-03-29
// @description  try to take over the world!
// @author       adelta66
// @match        https://www.google.com/search?q=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict'
    //https://www.google.com/search?q=co+zrobi%C4%87+jak+nie+domyka+si%C4%99+okno+-bambary%C5%82%C4%85&sourceid=chrome&ie=UTF-8
    document.onreadystatechange = function (e) {
        if (document.readyState === 'complete') {

            let phrazeToAppend = "+-bambary%C5%82%C4%85"
            let url = new URL(window.location.href)
            if (window.location.href.includes(phrazeToAppend)) return

            let beginQuery = false
            let endQuery = false
            let question = ""
            let rest1 = ""
            let rest2 = ""
            for (let i = 0; i < url.search.length; i++) {
                let currentChar = url.search[i]
                if (currentChar == 'q') beginQuery = true
                if (currentChar == '&') endQuery = true
                if (beginQuery && !endQuery) question += currentChar
                if (!beginQuery) rest1 += currentChar
                if (beginQuery && endQuery) rest2 += currentChar
            }
            //console.log("rest1",rest1)
            //console.log("question",question)
            //console.log("rest2",rest2)

            let newUrl = url.origin + "/search" + rest1 + question + phrazeToAppend + rest2
            //console.log("newUrl",newUrl)
            window.location.replace(newUrl)
        }
    }

})()