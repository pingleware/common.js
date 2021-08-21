# Installation
To install,

    npm i @presspage/common-js

# Getting Started
Tested for use with Electron. Create a preload.js and in your electron window definition add the following webPreferences,

    mainWindow = new BrowserWindow({
        width: 1072,
        height: 910,
        webPreferences: {
			nodeIntegration: false,
			contextIsolation: true, // protect against prototype pollution
			enableRemoteModule: false, // turn off remote
  		  	preload: path.join(__dirname, 'preload.js')
        }
    })

Inside the preload.js,

    const {contextBridge} = require("electron");

    const {$, id, listener, show, hide, showParent, hideParent, showAlert, editable, http_post, wp_ajax, webdevencrypt, loadScript, getRSS, replaceText, setValue, replaceHTML, appendHTML, todayAsISO8601, Export2Doc} = require("@presspage/common-js");

    contextBridge.exposeInMainWorld(
        "common", {
            $: $,
            id: id,
            listener: listener,
            show: show,
            hide: hide,
            showParent: showParent,
            hideParent: hideParent,
            showAlert: showAlert,
            editable: editable,
            http_post: http_post,
            wp_ajax: wp_ajax,
            webdevencrypt: webdevencrypt,
            loadScript: loadScript,
            getRSS: getRSS,
            replaceText: replaceText,
            setValue: setValue,
            replaceHTML: replaceHTML,
            appendHTML: appendHTML,
            todayAsISO8601: todayAsISO8301,
            Export2Doc: Export2Doc
        }
    );

Then inside your views/index.html, just invoke the javascript functions on the window object,

    window.common.listener("element_id","click",function(){ alert("It works!"); });

# Common JavaScript Library Functions
## $ - a jQuery-like representation for the object

## id
Obtain the object reference of an element by the ID,

    var button = id("button_id");
    button.setAttribute("disabled","disabled");

## listener
Use to add an action handler to an element,

    listener('element_id','click',function(e){
        // event handling logic
    });

## show
Makes an element visible,

    show('element_id');

## hide
Makes an element invisible,

    hide('element_id');

## showParent
Make the parent of an element visible

    showParent('element_id');

where element_id is the child of the parent to show

## hideParent
Make the parent of an element invisible

    hideParent('element_id');

where element_id is the child of the parent to be hidden

## showAlert
Shows an modal div (see w3schools.com about W3.CSS Modal Dialogs)

    showAlert(page, title, message);

## editable
Makes an element editable,

    editabled('element_id',edit_flag);

when edit_flag is true, the element specified by the element_id is made editable, otherwise it is made read only.

## http_post
Invokes a HTTP POST request,

    http_post(url, params, function(results){
        // handling results returned?
    });

## wp_ajax
Invokes an WordPress AJAX request without using jQuery,

    wp_ajax(url, action, params, function(results){
        // handle return data, if any?
    });

## webdevencrypt
JavaScript encryption and decryption,

    setEncrypt(plaintext, passcode);
    setDecrypt(encrypted, passcode);

## loadScript
Loads additional JavaScript files dynamically,

    loadScript('<full url of the javascript file>');

## getRSS
Retrieves an RSS feed and displays in a list element,

    getRSS('<url of rss feed>','element_id of the list element');

## replaceText
Replaces text in a specified element,

    replaceText(selector, "text");

## setValue
Set the value of a specified element,

    setValue(selector, "new value");

## replaceHTML
Replaces the element HTML content,

    replaceHTML(selector, "<html>");

## appendHTML
Appends additional HTML to an element HTML content,

    appendHTML(selector, "<html>");

## todayAsISO8601
Retrieves current date as ISO 8601 aka YYYY-MM-DD formant,

    var today = todayAsISO8601();

## Export2Doc
Saves a HTML div contents as a DOCX file,

    Export2Doc('div element containing HTML content','filename.docx');

# Contact Us
The best contact method is via email at presspage.entertainment@gmail.com

# License
Creative Commons Attribution 4.0
