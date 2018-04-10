
//邮箱验证
function checkEmail(email) {
    var myreg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    if (!myreg.test(email)) {
        return false;
    }
    else {
        return true;
    }
}