
//院系下拉列表
function SchoolList() {
    $.ajax({
        async: false,
        dataType: "xml",
        type: "post",
        url: "/DropDownList/SchoolList",
        success: function (data) {
            if (data != null) {
                var html = $(data).find("html").text();
                $("#txtSchool").html(html);
            }
        }
    });
}
//院系下拉带全部
function SchoolAll() {
    $.ajax({
        async: false,
        dataType: "xml",
        type: "post",
        url: "/DropDownList/SchoolAll",
        success: function (data) {
            if (data != null) {
                var html = $(data).find("html").text();
                $("#txtSchool").html(html);
            }
        }
    });
}

//专业下拉列表
function ProfessionalList() {
    $.ajax({
        async: false,
        dataType: "xml",
        type: "post",
        url: "/DropDownList/ProfessionalList",
        success: function (data) {
            if (data != null) {
                var html = $(data).find("html").text();
                $("#txtProfessional").html(html);
            }
        }
    });
}

//年级下拉列表
function GradeList() {
    $.ajax({
        async: false,
        dataType: "xml",
        type: "post",
        url: "/DropDownList/GradeList",
        success: function (data) {
            if (data != null) {
                var html = $(data).find("html").text();
                $("#txtGrade").html(html);
            }
        }
    });
}



//班级下拉列表
function ClassList() {
    $.ajax({
        async: false,
        dataType: "xml",
        type: "post",
        url: "/DropDownList/ClassList",
        success: function (data) {
            if (data != null) {
                var html = $(data).find("html").text();
                $("#txtClass").html(html);
            }
        }
    });
}
//班级下拉列表带全部
function ClassAll() {
    $.ajax({
        async: false,
        dataType: "xml",
        type: "post",
        url: "/DropDownList/ClassAll",
        success: function (data) {
            if (data != null) {
                var html = $(data).find("html").text();
                $("#txtClass").html(html);
            }
        }
    });
}


//院系改变--联动--专业课程
function SchoolChange() {
    $("#txtSchool").on("change", function () {
        var ID = $("#txtSchool").val();
        $("#txtProfessional").html("");
        ProfessionalListBy(ID);

    });
}
//院系--专业联动
function ProfessionalListBy(ID) {
    $.ajax({
        async: false,
        dataType: "xml",
        type: "post",
        url: "/DropDownList/ProfessionalListBy?id=" + ID,
        success: function (data) {
            if (data != null) {
                var html = $(data).find("html").text();
                $("#txtProfessional").html(html);
            }
        }
    });
}

//搜索院系--专业
function SchoolAllChange() {
    $("#txtSchool").on("change", function () {
        var ID = $("#txtSchool").val();
        $("#txtProfessional").html("");
        ProfessionalAllBy(ID);
    });
}
//搜索院系--专业联动
function ProfessionalAllBy(ID) {
    $.ajax({
        async: false,
        dataType: "xml",
        type: "post",
        url: "/DropDownList/ProfessionalAllBy?id=" + ID,
        success: function (data) {
            if (data != null) {
                var html = $(data).find("html").text();
                $("#txtProfessional").html(html);
            }
        }
    });
}
//等级下拉
function LevelList() {
    $.ajax({
        async: false,
        dataType: "xml",
        type: "post",
        url: "/DropDownList/LevelList",
        success: function (data) {
            if (data != null) {
                var html = $(data).find("html").text();
                $("#txtLevelName").html(html);
            }
        }
    });
}

//等级下拉
function LevelListBy(obj) {
    $.ajax({
        async: false,
        dataType: "xml",
        type: "post",
        url: "/DropDownList/LevelList",
        success: function (data) {
            if (data != null) {
                var html = $(data).find("html").text();
                $("#txtLevelName" + obj).html(html);
            }
        }
    });
}

//三大模块
function QmoduleChange() {
    $("#Qmodule").on("change", function () {
        var ID = $("#Qmodule").val();
        $("#Qeng").html("");
        QengAllBy(ID);
    });
}
//三大模块--细分模块联动
function QengAllBy(ID) {
    $.ajax({
        async: false,
        dataType: "xml",
        type: "post",
        url: "/DropDownList/QengAllBy?id=" + ID,
        success: function (data) {
            if (data != null) {
                var html = $(data).find("html").text();
                $("#Qeng").html(html);
            }
        }
    });
}

function RoleList(id, type) {
    $.ajax({
        async: false,
        dataType: "xml",
        type: "post",
        url: "/DropDownList/RoleList",
        data: {
            type: type
        },
        success: function (data) {
            if (data != null) {
                var html = $(data).find("html").text();
                $("#" + id).html(html);
            }
        }
    });
}

//院系、专业--班级联动
function ClassesListBy(SchoolID, ProfessionalID) {
    $.ajax({
        async: false,
        dataType: "xml",
        type: "post",
        url: "/DropDownList/ClassesListBy?SchoolID=" + SchoolID + "&ProfessionalID=" + ProfessionalID,
        success: function (data) {
            if (data != null) {
                var html = $(data).find("html").text();
                $("#txt_ClassId").html(html);
            }
        }
    });
}

//院系、专业--班级联动
function SchoolClassChange() {
    $("#txtSchool").on("change", function () {
        ClassesListBy($("#txtSchool").val(), $("#txtProfessional").val());  //院系，专业==查班级
    });

    $("#txtProfessional").on("change", function () {
        ClassesListBy($("#txtSchool").val(), $("#txtProfessional").val());  //院系，专业==查班级
    });
}