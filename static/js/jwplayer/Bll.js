/*
* Filename: Bll.js
* Description:js通用方法封装操作，
* Created: 2013.06.23
* Author : liangjw
* Company:Copyright (C) 2013 Create Family Wealth Power By Peter
*/
////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
    //当前被选中变色
    $('.alink a').bind('click', function () {
        $('.alink a').css("color", "blue");
        $(this).css("color", "red");
    });

    pageLoad();  //页面加载调用table样式表处理方法
});

function fanhui() {
    window.history.go(-1);
}

function selectTitle(title)
{
    $(".menuA").removeClass("select");
    $("#" + title).addClass("select");
}

function imgUrlChange(url) {
    document.getElementById("backimg").src = url;
}

function checkAllList() {
    //全选和反选方法
    $("#checkAllList").bind("click", function () {
        if ($("#checkAllList").prop("checked"))
            $(":checkbox").attr("checked", true);
        else
            $(":checkbox").attr("checked", false);
    });
}
//页面加载时，对Table表格移动鼠标行变色操作
function pageLoad() {

    $("table[class=msgtable]").each(function () {
        var _this = $(this);
        //设置偶数行和奇数行颜色
        //_this.find("tr:even").css("background-color", "#FFFFFF");
        
        //_this.find("tr:odd").css("background-color", "#f1f1f1");

        //鼠标移动隔行变色
        _this.find("tr").hover(function () {
            //$(this).attr("bColor", $(this).css("background-color")).css("background-color", "#d3d3d4").css("cursor", "pointer");
            $(this).attr("bColor", $(this).css("background-color")).css("background-color", "#d3d3d4");
        }, function () {
            $(this).css("background-color", $(this).attr("bColor"));
        });

    });
}

//////////////////////////////////////////////////////////////////////
//字符串超过指定长度进行处理默认每隔30个字符换取一行
//////////////////////////////////////////////////////////////////////

function tdCutString(length) {
    //第一列超过字符的部分不显示
    $("[class=tdCutString]").each(function () {

        var toopValues = $.trim($(this).text());
        var count = 1; //定义变量
        var valText = ""; //拼接字符串字符串
        for (var i = 0; i < toopValues.length; i++) {
            if (i / 30 == count) {
                count++;
                valText += "<br>";
            }
            valText += toopValues[i];
        }

        if (toopValues.length > length) {
            $(this).showToolTip(valText).text(toopValues.substring(0, length) + "...");
        }
    });
}

function ajaxJson(url, dataType, data, success) {
    $.ajax({
        url: url,  //后台处理程序  
        type: "post",    //数据发送方式  
        async: false,
        dataType: dataType,   //接受数据格式   
        data: data,
        success: success,
        error: function () {
            layer.msg("服务器没有返回数据，可能服务器忙，请重试！");
        }
    });
}
function layerOpen(title, content, width, height) {
    layer.open({
        type: 2,
        title: [title, "background:#008c95;color:#fff;text-align:center;font-size:18px;word-spacing:8px; letter-spacing: 8px;padding:0px;"],
        area: [width, height], //窗体大小
        fix: false, //不固定
        //maxmin: true, //最大最小化按钮
        //offset: '200px', //垂直初始高度
        move: false, //禁止鼠标拖动
        closeBtn: 1,
        scrollbar: false, //不出现滚动条
        //btn: ['保存', '取消'],
        content: content
    });
}

//首页，学期弹窗使用
function layershow(content, width, height, skin, top, left) {
    //页面层-自定义
    layer.open({
        type: 2,
        title: false,
        area: [width, height], //窗体大小
        fix: true, //不固定
        move: false, //禁止鼠标拖动
        closeBtn: 1,//false,有关闭按钮
        scrollbar: false, //不出现滚动条
        content: content,
        skin: skin,
        offset: [top, left] //top,left
    });
}

/*弹窗修改个人信息*/
function layerTab(content, width, height) {
    layer.open({
        type: 2, //iframe弹窗的形式
        title: false,//标题栏不显示
        area: [width, height], //窗体大小
        fix: false, //不固定
        move: false, //禁止鼠标拖动
        closeBtn: 0, //关闭按钮不显示
        scrollbar: false, //不出现滚动条
        content: content //内容，url地址
    });
}

function layerUpload(content) {
    layer.open({
        area: [245, 180],
        type: 1,
        title: ['提示', 'background:#008c95;color:#fff;text-align:center;font-weight:bold;padding:0px;'],
        skin: 'layui-layer-tishi', //样式类名
        closeBtn: 0, //不显示关闭按钮
        move: false, //禁止鼠标拖动
        shift: 2,
        time:2000,
        shadeClose: true, //开启遮罩关闭
        content: content
    });
}

//删除上传文件
function DeleteFile(url) {

    $.ajax({
        type: "POST",
        async: false,
        url: url
    });
}

//全选/取消全选
function chkAll() {
    if ($("#checkAll").attr("checked")) {
        $(":checkbox").attr("checked", true);
    } else {
        $(":checkbox").attr("checked", false);
    }
}

//动态加载工具栏权限按钮
function Tools_bar() {
    $(".tools_bar").html("");
    $.ajax({
        async: false,
        dataType: "html",
        type: "post",
        url: "/Base/LoadButtonPermission", //请求的处理数据
        success: function (data) {
            if (data != null) {//成功
                $(".tools_bar").html(data);
            }
        }
    });
}

var uploadify_onSelectError = function (file, errorCode, errorMsg) {
    var msgText = "上传失败\n";
    switch (errorCode) {
        case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
            //this.queueData.errorMsg = "每次最多上传 " + this.settings.queueSizeLimit + "个文件";  
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
    $("#FileDo").hide();
    layer.msg(msgText);
};

var uploadify_onUploadError = function (file, errorCode, errorMsg, errorString) {
    // 手工取消不弹出提示  
    if (errorCode == SWFUpload.UPLOAD_ERROR.FILE_CANCELLED
            || errorCode == SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED) {
        return;
    }
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
    $("#FileDo").hide();
    layer.msg(msgText);
};
var uploadify_onSelect = function () {
    $("#FileDo").show();

};