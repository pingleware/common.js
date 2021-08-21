
const {contextBridge} = require("electron");

const {$, id, listener, show, hide, showParent, hideParent, showAlert, editable, http_post, wp_ajax, webdevencrypt, loadScript, getRSS} = require("@presspage/common-js");

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
        loadScript: loadScript,
        getRSS: getRSS
    }
);