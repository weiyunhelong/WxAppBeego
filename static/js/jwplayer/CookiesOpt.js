
/**********Cookie的操作***************/

/*******1-得到Cookie的值************/
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

/***********2-检查是否存在Cookie的值*******************/
function checkCookie(name) {
    username = getCookie(name)
    if (username != null && username != "")
    { return true;}
    else
    {return false;}
}

/*************3-设置Cookie的值***********************/
function setCookie(name, value,time) {  
    var exp = new Date();
    exp.setTime(exp.getTime() + time);  //有效时间
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

/**************4-删除Coolie的值************************/
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
    {
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
        setCookie(name,"",exp);
    }
   
}

/*********************得到浏览器的类型******************************/
function OsType()
{
    var agent = navigator.userAgent.toLowerCase();

    var regStr_ie = /msie [\d.]+;/gi;
    var regStr_ff = /firefox\/[\d.]+/gi
    var regStr_chrome = /chrome\/[\d.]+/gi;
    var regStr_saf = /safari\/[\d.]+/gi;
    //IE
    if (agent.indexOf("msie") > 0) {
        //return agent.match(regStr_ie); //返回浏览器和版本号
        return "IE";
    }

    //firefox
    if (agent.indexOf("firefox") > 0) {
        //return agent.match(regStr_ff);  //返回浏览器和版本号
        return "Firefox";
    }

    //Chrome
    if (agent.indexOf("chrome") > 0) {
        //return agent.match(regStr_chrome); //返回浏览器和版本号
        return "Chrome";
    }

    //Safari
    if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0)
    {
        //return agent.match(regStr_saf); //返回浏览器和版本号
        return "Safari";
    }
}