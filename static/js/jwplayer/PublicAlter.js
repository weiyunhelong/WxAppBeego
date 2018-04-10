//layer.alert提示信息
function alert1(msg)
{
    layer.msg(msg);
    //layer.alert(msg, { skin: 'layui-layer-molv', title: '温馨提示' }); //这时如果你也还想执行yes回调，可以放在第三个参数中
}

function alert2(msg, img) {
    layer.alert(msg, { skin: 'layui-layer-molv', icon: img, title: '温馨提示' }); //这时如果你也还想执行yes回调，可以放在第三个参数中
}

function alert3(msg, img, url) {
    layer.alert(msg, { skin: 'layui-layer-molv', icon: img }, function () {
        window.location.href = url;
    });
}

function alert(msg, img, url) {
    if (arguments.length == 1) {
        alert1(msg);
    } else if (arguments.length == 2) {
        alert2(msg, img);
    } else if (arguments.length == 3) {
        alert3(msg, img, url);
    }
}

//layer.msg 提示信息
function alertmsg1(msg) {
    layer.msg(msg);
}

function alertmsg2(msg, type) {
    layer.msg(msg, {icon: type });
}

function alertmsg3(msg, type, url) {
    layer.msg(msg, { icon: type, time: 2000 }, function () {
        window.location.href = url;
    });
}



function alertmsg(msg, img, url) {
    if (arguments.length == 1) {
        alertmsg1(msg);
    } else if (arguments.length == 2) {
        alertmsg2(msg, img);
    } else if (arguments.length == 3) {
        alertmsg3(msg, img, url);
    }
}

function tips(msg,classOrId)
{
    layer.tips(msg, classOrId, {
        tips: [2, '#008C95'],
        time: 2500
    });
}
