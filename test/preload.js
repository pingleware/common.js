
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
        todayAsISO8601: todayAsISO8601,
        Export2Doc: Export2Doc
    }
);
