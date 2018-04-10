//pageIndex 当前页码  url Controller地址
function PageAjaxList(pageIndex, url,type) {

    if (pageIndex == -100) {
        pageIndex = $("#pagelist input").first().val() >= $("#pagelist b").text() ? $("#pagelist b").text() : $("#pagelist input").first().val();
    }
    $.ajax({
        type: "POST",
        async: false,
        url: url,
        data: { pageIndex: pageIndex },
        success: function (data) {
            var html = $(data).find("#tablelist").html();
            $("#tablelist").html(html);

            var htmlpg = $(data).find("#pagelist").html();

            $("#pagelist").html(htmlpg);
            if (type==1)
            {
                if ($(window).height()-80 > $(".box")[0].offsetHeight) {
                    $('#div_body').css('height', $(window).height());
                    $("#bodycontent").css("height", $(window).height() - 138);
                } else {
                    $('#div_body').css('height', $(".box")[0].offsetHeight + 138);
                    $("#bodycontent").css("height", $(".box")[0].offsetHeight);
                }
            }
            
        }
    });
    pageLoad();

}


function QueryListInfor(pageIndex, url) {
    $.ajax({
        type: "POST",
        async: false,
        url: url,
        data: { pageIndex: pageIndex },
        success: function (data) {
            var html = $(data).find("#tablelist").html();
            $("#tablelist").html(html);

            var htmlpg = $(data).find("#pagelist").html();
            $("#pagelist").html(htmlpg);
        }
    });
    pageLoad();
}

//阻止冒泡事件
function stopBubble(event) {
    var e = event || window.event;
    if (e && e.stopPropagation) {
        e.stopPropagation();
    }
    else {
        e.cancelBubble = true;
    }
}