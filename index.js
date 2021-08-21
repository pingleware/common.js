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
    loadScript
}