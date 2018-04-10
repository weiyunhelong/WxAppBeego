var popMessage = function (message, speed, mWidth, mColor, bkGround, mLeft, mOpacity) {
    this.m_message = message;
    this.m_speed = speed;
    this.m_height = 60;
    this.m_width = mWidth == undefined ? 150 : mWidth;
    this.m_background = bkGround == undefined ? 'black' : bkGround;
    this.m_color = mColor == undefined ? 'white' : mColor;
    this.m_left = mLeft == undefined ? ((document.body.clientWidth) / 2 - this.m_width / 2 + "px") : mLeft + "px";
    this.m_opacity = mOpacity == undefined ? 0.5 : mOpacity;
}

popMessage.prototype.createDialog = function () {
    var dialog = document.createElement("div");
    document.body.appendChild(dialog);
    dialog.style.height = this.m_height + "px";
    dialog.style.lineHeight = this.m_height + "px";
    dialog.style.width = this.m_width + "px";
    dialog.style.position = "absolute";
    dialog.style.zIndex = 1000;

    //dialog.style.backgroundColor = "black";
    dialog.style.backgroundColor = this.m_background;
    dialog.style.textAlign = "center";
    dialog.style.lineHeight = "60px";
    dialog.style.verticalAlign = 'middle';
    dialog.style.fontSize = "18px";
    dialog.style.fontWeight = "550";
    dialog.style.borderBottomLeftRadius = "5px";
    dialog.style.borderBottomRightRadius = "5px";
    dialog.style.borderTopLeftRadius = "5px";
    dialog.style.borderTopRightRadius = "5px";
    //dialog.style.color = "white";
    dialog.style.color = this.m_color;
    dialog.style.opacity = this.m_opacity;
    dialog.style.display = "block";
    dialog.style.top = (document.body.clientHeight) / 2 - this.m_height / 2 + "px";
    //dialog.style.left = (document.body.clientWidth) / 2 - this.m_width / 2  + "px";
    dialog.style.left = this.m_left;
    //dialog.innerText = this.m_message;
    dialog.innerHTML = this.m_message;
    setTimeout(function () {
        dialog.style.display = 'none';
        $(dialog).remove();
        //document.body.removeChild(dialog);
    }, this.m_speed, 20);
}

/*文件上传*/
var uploadify_onSelectError = function (file, errorCode, errorMsg) {
    var msgText = "上传失败\n";
    switch (errorCode) {
        case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
            msgText += "每次最多上传 " + this.settings.queueSizeLimit + "个文件";
            break;
        case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
            msgText += "文件大小超过限制( " + this.settings.fileSizeLimit + " )";
            break;
        case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
            msgText += "文件大小为0";
            break;
        case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
            msgText += "文件格式不正确，仅限 " + this.settings.fileTypeExts;
            break;
        default:
            msgText += "错误代码：" + errorCode + "\n" + errorMsg;
    }
    alert(msgText);
}

var uploadify_onUploadError = function (file, errorCode, errorMsg, errorString) {
    var msgText = "上传失败\n";
    switch (errorCode) {
        case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:
            msgText += "HTTP 错误\n" + errorMsg;
            break;
        case SWFUpload.UPLOAD_ERROR.MISSING_UPLOAD_URL:
            msgText += "上传文件丢失，请重新上传";
            break;
        case SWFUpload.UPLOAD_ERROR.IO_ERROR:
            msgText += "IO错误";
            break;
        case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:
            msgText += "安全性错误\n" + errorMsg;
            break;
        case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
            msgText += "每次最多上传 " + this.settings.uploadLimit + "个";
            break;
        case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:
            msgText += errorMsg;
            break;
        case SWFUpload.UPLOAD_ERROR.SPECIFIED_FILE_ID_NOT_FOUND:
            msgText += "找不到指定文件，请重新操作";
            break;
        case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:
            msgText += "参数错误";
            break;
        default:
            msgText += "文件:" + file.name + "\n错误码:" + errorCode + "\n"
                    + errorMsg + "\n" + errorString;
    }
}




function CommonAjaxPost(url, type, sucessCallBack, errorCallBack) {
    $.ajax({
        url: url,  //后台处理程序  
        type: "post",    //数据发送方式  
        async: false,
        dataType: type,
        success: sucessCallBack,
        error: errorCallBack
    });
}
//验证权限

function ValidationAuthorizeV2(url) {
    var result = false;
    GetAjaxPost("/Main/ValidationAuthorize?actionUrl=" + url + "", "html", function (data) {
        if (data == "True") {
            result = true;
        }     
    })
    return result;
}

//获取url参数值
function getUrlParam(name) {
    //构造一个含有目标参数的正则表达式对象
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    //匹配目标参数
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    }
    return null;
}

function stopBubble(event) {
    var e = event || window.event;
    if (e && e.stopPropagation) {
        e.stopPropagation();
    }
    else {
        e.cancelBubble = true;
    }
}

function stopBubbleX(event) {
    var e = event || window.event;
    if (e.preventDefault) {
        e.preventDefault();
    }
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    else {
        e.returnValue = false;
        e.cancelBubble = true;
    }
}

//数组扩展方法
Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

//统计数组中某一个值的次数
Array.prototype.CountNumber = function (val) {
    var length = this.length;
    var count = 0;
    for (var i = 0; i < length; i++) {
        if (this[i] == val) {
            count++;
        }
    }
    return count;
};

//验证是否是整数
function checkNumerInt(num) {
    var type = "^-?\\d+$";
    var re = new RegExp(type);
    if (num.match(re) == null) {
        return false;
    }
    return true;
}

//验证是否是正整数
function CheckPositiveInteger(num) {
    var type = "^[1-9]*[1-9][0-9]*$";
    var re = new RegExp(type);
    if (num.match(re) == null) {
        return false;
    }
    return true;
}

//验证字符串是否包含特殊字符@/'\"#$%^*
function CheckSpecialStr(str)
{
    //var myReg = /^[^@\/\'\\\"#$%&\^\*]+$/;
    var myReg = /^[^@\\/'"|]+$/gi;
    if (!myReg.test(str))
    {
        return true;
    }
    return false;
}
//验证字符串是否包含特殊字符
function CheckSpecialFullStr(str)
{
    var myReg = /^([^\`\~\!\@\#\$\^\&\*\=\|\{\}\'\:\;\"\,\\\.\<\>\/\?\~\！\@\#\￥\……\&\*\（\）\——\|\{\}\【\】\‘\；\：\”\“\'\。\，\、\？\%\+\_]+)$/gi;
    //var myReg = /^[^@\/\'\\\"#$%&\^\:\;\.\?\~\！\*]+$/;
    if (!myReg.test(str))
    {
        return true;
    }
    return false;
}


/*特殊权限验证*/
function CheckPowers(url) {
    var isSucess = true;
    GetAjaxPost(url, 'json', function (data) {
    }, function (data) {
        isSucess = false;
        GetAjaxResponseText(data);
    });
    return isSucess;
}

//异常处理
function GetAjaxResponseText(data)
{
    var text = data.responseText;
    alert(text);
}
//错误信息
var errorTips = {
    "SERVER_BUSY": "服务器没有返回数据，可能服务器忙，请重试"
}
//创建下拉列表
function createSelect(name, str, value) {
    var _select = document.createElement("select");
    _select.className = "AjaxSelect";
    var firstOption = document.createElement("option");
    for (i = 0; i < str.length; i++) {
        var _option = document.createElement("option");
        if (value == "") {
            _option.value = str[i];
        }
        else {
            _option.value = value[i];
        }

        _option.text = str[i];
        //_option.attributes("", "");

        if (name == str[i]) {
            _option.selected = "true";
        }
        _select.appendChild(_option);
    }
    return _select;
}

//设置项目id session
function setProjectId2Server(projectId) {
    var url = "/Main/SetSession?proid=" + projectId;
    $.ajax({
        url: url,  //后台处理程序  
        type: "post",    //数据发送方式  
        async: false,
        dataType: "text",
        success: function (data) {

        },
        error: function () {
            return false;
        }
    });
}
