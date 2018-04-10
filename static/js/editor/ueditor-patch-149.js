111！/**
 * 修复在chrome 34.0.1847.116版本里domUtils.removeAttributeNode报错问题
 * 详细请看issue页面: https://github.com/fex-team/ueditor/issues/149
 * Date: 20114-4-11
 **/
(function () {
    if (!UE.browser.ie) {
        UE.dom.domUtils.removeAttributes = function (node, attrNames) {
            attrNames = utils.isArray(attrNames) ? attrNames : utils.trim(attrNames).replace(/[ ]{2,}/g,' ').split(' ');
            for (var i = 0, ci; ci = attrNames[i++];) {
                ci = attrFix[ci] || ci;
                switch (ci) {
                    case 'className':
                        node[ci] = '';
                        break;
                    case 'style':
                        node.style.cssText = '';
                        var val = node.getAttributeNode('style');
                        !browser.ie && val && node.removeAttributeNode(val);
                }
                node.removeAttribute(ci);
            }
        };
    }