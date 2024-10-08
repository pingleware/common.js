"use strict"

// Common functions that make JavaScript easier
var $ = function (selector) {
    return document.querySelector(selector);
};

function id(element_id) {
    return document.getElementById(element_id);
}

function listener(element_id,action,callback) {
    if (id(element_id)) {
        id(element_id).addEventListener(action,callback);
    } else {
        console.log("Element does not exist in the HTML: " + element_id);
    }
}

function show(element_id) {
    id(element_id).style.display = "block";
}

function hide(element_id) {
    id(element_id).style.display = "none";
}

function showParent(element_id) {
    id(element_id).parentNode.style.display = "block";
}

function hideParent(element_id) {
    id(element_id).parentNode.style.display = "none";
}

function showAlert(page, title, message) {
    id(page + "-dialog-title").innerHTML = title;
    id(page + "-dialog-message").innerHTML = message;
    id(page + "-dialog").style.display = "block";
}

function editable(element_id, edit) {
    if (edit) {
        id(element_id).removeAttribute('readonly');
        //id(element_id).classList.value = 'w3-input w3-block w3-pale-yellow';
    } else {
        id(element_id).setAttribute('readonly','readonly');
        //id(element_id).classList.value = 'w3-input w3-block w3-light-grey';
    }
}

function http_post(url, params, callback) {
    
    // request options
    const options = {
        method: 'POST',
        body: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    // send POST request
    fetch(url, options)
        .then(res => res.json())
        .then(res => callback(res));
    
    return false;
}

//
// Implementing an Ajax for WordPress in pure JavaScript
// url: http://{host}/wp-admin/admin-ajax.php
//
function wp_ajax(url, action, params, callback) {
	var args = "";
	for(var key in params) {
		args += "&" + key + "=" + params[key];
	}
	fetch(url,{
		method: 'post',
		headers: {
			"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
		},
		body: 'action='+action+args
	})
	.then((resp)=>resp.json())
	.then(function(data){
		callback(data);
	})
	.catch(function(err){
		throw err;
	});
}

var webdevencrypt = {
    setEncrypt: function(plaintext, passcode) {
        return this.encryptCodes(plaintext, passcode);
    },
    setDecrypt: function(encrypted, passcode) {
        return this.decryptCodes(encrypted, passcode);
    },
    encryptCodes: function(content,passcode) {
        var result = []; var passLen = passcode.length ;
        for(var i = 0  ; i < content.length ; i++) {
            var passOffset = i%passLen ;
            var calAscii = (content.charCodeAt(i)+passcode.charCodeAt(passOffset));
            result.push(calAscii);
        }
        return JSON.stringify(result) ;
    },
    decryptCodes: function(content,passcode) {
        var result = [];var str = '';
        var codesArr = JSON.parse(content);var passLen = passcode.length ;
        for(var i = 0  ; i < codesArr.length ; i++) {
            var passOffset = i%passLen ;
            var calAscii = (codesArr[i]-passcode.charCodeAt(passOffset));
            result.push(calAscii) ;
        }
        for(var i = 0 ; i < result.length ; i++) {
            var ch = String.fromCharCode(result[i]); str += ch ;
        }
        return str ;
    }
};

// The function which loads JavaScript dynamically
function loadScript(scriptLocationAndName) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = scriptLocationAndName;
    head.appendChild(script);
}

function read_feed(url, callback) {
    fetch(url)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(callback);
}

/**
 * @param url rss feed url
 * @param list_element an HTML <ul id="list_element"></ul> element 
 */
function getRSS(url,list_element) {
    read_feed(url, function (data) {
        const items = data.querySelectorAll("item");
        document.getElementById(list_element).innerHTML = '';
        items.forEach(function (entry) {
            var link = entry.querySelector("link").innerHTML;
            var title = entry.querySelector("title").innerHTML;
            title = title.replace("<![CDATA[", ""); //  Needed if title is wrapped around CDATA, otherwise bypass this step
            title = title.replace("]]>", "");
            document.getElementById(list_element).innerHTML += `<li><a href="${link}" title="${title}" target="_blank" class="animate" style="text-decoration: none;">${title}</a></li>`;
        });
    });
}

const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
} 

const setValue = (selector, value) => {
    const element = document.getElementById(selector)
    if (element) element.value = value;
}

const replaceHTML = (selector, html) => {
    const element = document.getElementById(selector);
    if (element) element.innerHTML = html;
}

const appendHTML = (selector, html) => {
    const element = document.getElementById(selector);
    if (element) element.innerHTML += html;
}

function todayAsISO8601() {
    var today = new Date();
    return today.toISOString().slice(0,10);
}

function Export2Doc(element, title='', filename = ''){
    var preHtml = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>${title}</title></head><body>`;
    var footer = `<div style='mso-element:footer' id=f1><p class=MsoFooter>Created using @presspage/common-js from https://www.npmjs.com/package/@presspage/common-js</p></div>`;
    var postHtml = "</body></html>";
    var html = preHtml+document.getElementById(element).innerHTML+footer+postHtml;

    var blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
    });
    
    // Specify link url
    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
    
    // Specify file name
    filename = filename?filename+'.doc':'document.doc';
    
    // Create download link element
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob ){
        navigator.msSaveOrOpenBlob(blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = url;
        
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
    
    document.body.removeChild(downloadLink);
}

const {
    warn,
    error,
    info,
    setLogPath,
    getLogPath,
    getLineNumber,
    backup,
    listLogFiles,
    deleteLogFile,    
} = require('./logger.js');

module.exports = {
    $,
    id,
    listener,
    show, hide,
    showParent, hideParent,
    showAlert,
    editable,
    http_post,
    wp_ajax,
    webdevencrypt,
    loadScript,
    getRSS,
    replaceText,
    setValue,
    replaceHTML,
    appendHTML,
    todayAsISO8601,
    Export2Doc,
    warn,
    error,
    info,
    cat,   
    mail,
    setLogPath,
    getLogPath,
    getLineNumber,
    backup,
    listLogFiles,
    deleteLogFile,
}