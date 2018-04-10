
//权限下拉列表
function RoleList() {
    $.ajax({
        async: false,
        dataType: "xml",
        type: "post",
        url: "/DropDownList/RoleList", 
        success: function (data) {
            if (data != null) {
                var html = $(data).find("html").text();
                $("#txtRole").html(html);
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

//机构下拉列表
function OrganizationList() {
    $.ajax({
        async: false,
        dataType: "xml",
        type: "post",
        url: "/DropDownList/OrganizationList", 
        success: function (data) {
            if (data != null) {
                var html = $(data).find("html").text();
                $("#txtOrganization").html(html);
            }
        }
    });
}

//学期下拉列表
function TermList() {
    $.ajax({
        async: false,
        dataType: "xml",
        type: "post",
        url: "/DropDownList/TermList", 
        success: function (data) {
            if (data != null) {
                var html = $(data).find("html").text();
                $("#txtXueqi").html(html);
            }
        }
    });
}

//课程分类下拉列表
function CourseList() {
    $.ajax({
        async: false,
        dataType: "xml",
        type: "post",
        url: "/DropDownList/CourseList", 
        success: function (data) {
            if (data != null) {
                var html = $(data).find("html").text();
                $("#txtCType").html(html);
            }
        }
    });
}

//学期改变--联动--课程
function TermChange()
{
    $("#txtXueqi").on("change", function () {
        var departmentID = $("#txtXueqi").val();
        $("#txtCourse").html("");
        
        CourseListBy(departmentID);
    });
}
function CourseListBy(cid) {
    
    $.ajax({
        async: false,
        dataType: "xml",
        type: "post",
        url: "/DropDownList/CourseListBy?id=" + cid, 
        success: function (data) {
            if (data != null) {
                var html = $(data).find("html").text();
                $("#txtCourse").html(html);
                ChapterListBy($("#txtCourse").val());
            }
        }
    });
}

//课程改变--联动--章节课程
function CourseChange() {
    $("#txtCourse").on("change", function () {
        var departmentID = $("#txtCourse").val();
        $("#txtChapter").html("");
        ChapterListBy(departmentID);
    });
}
function ChapterListBy(cid) {
    $.ajax({
        async: false,
        dataType: "xml",
        type: "post",
        url: "/DropDownList/ChapterListBy?id=" + cid, 
        success: function (data) {
            if (data != null) {
                var html = $(data).find("html").text();
                $("#txtChapter").html(html);
            }
        }
    });
}

//教师下拉列表
function TeacherList() {
    $.ajax({
        async: false,
        dataType: "xml",
        type: "post",
        url: "/DropDownList/TeacherList", 
        success: function (data) {
            if (data != null) {
                var html = $(data).find("html").text();
                $("#txtTeacher").html(html);
            }
        }
    });
}

//课程章节下拉列表
function ChapterList() {
    $.ajax({
        async: false,
        dataType: "xml",
        type: "post",
        url: "/DropDownList/ChapterList", 
        success: function (data) {
            if (data != null) {
                var html = $(data).find("html").text();
                $("#txtChapter").html(html);
            }
        }
    });
}


//教学任务课程下拉列表
function CourseListSelect() {
    $.ajax({
        async: false,
        dataType: "xml",
        type: "post",
        url: "/DropDownList/CourseListSelect", 
        success: function (data) {
            if (data != null) {
                var html = "<option value='0'>全部</option>";
                html += $(data).find("html").text();
                $("#txtCourselist").html(html);
            }
        }
    });
}

//教师带有工号的下拉列表
function TeacherNOList() {
    $.ajax({
        async: false,
        dataType: "xml",
        type: "post",
        url: "/DropDownList/TeacherNOList", 
        success: function (data) {
            if (data != null) {
                var html = $(data).find("html").text();
                $("#txtTeacher").html(html);
            }
        }
    });
}
//教师带有工号的下拉列表
function TeacherNOIDList() {
    $.ajax({
        async: false,
        dataType: "xml",
        type: "post",
        url: "/DropDownList/TeacherNOIDList",
        success: function (data) {
            if (data != null) {
                var html = $(data).find("html").text();
                $("#txtTeacher").html(html);
            }
        }
    });
}

//工程多选列表
function EngineList() {
    $.ajax({
        async: false,
        dataType: "xml",
        type: "post",
        url: "/DropDownList/EngineList", 
        success: function (data) {
            if (data != null) {
                var html = $(data).find("html").text();
                $("#EngineName").html(html);
            }
        }
    });
}

//班级下拉带有筛选字样列表
function ClassSelectList() {
    $.ajax({
        async: false,
        dataType: "xml",
        type: "post",
        url: "/DropDownList/ClassList",
        success: function (data) {
            if (data != null) {
                var html = "<option value='00'>班级筛选</option>";
                   html += $(data).find("html").text();
                $("#txtClass").html(html);
            }
        }
    });
}

//学期下拉带有筛选字样列表
function TermSelectList() {
    $.ajax({
        async: false,
        dataType: "xml",
        type: "post",
        url: "/DropDownList/TermList",
        success: function (data) {
            if (data != null) {
                var html = "<option value='00'>学期筛选</option>";
                html += $(data).find("html").text();
                $("#txtXueqi").html(html);
            }
        }
    });
}

//课程分类带有筛选字样下拉列表
function CourseSelectList() {
    $.ajax({
        async: false,
        dataType: "xml",
        type: "post",
        url: "/DropDownList/CourseListSelect",
        success: function (data) {
            if (data != null) {
                var html = "<option value='00'>课程筛选</option>";
                   html += $(data).find("html").text();
                   $("#txtCourselist").html(html);
            }
        }
    });
}

//教师带有工号的下拉列表
function TeacherNOIDSelectList() {
    $.ajax({
        async: false,
        dataType: "xml",
        type: "post",
        url: "/DropDownList/TeacherNOIDList",
        success: function (data) {
            if (data != null) {
                var html = "<option value='00'>教师筛选</option>";
                 html += $(data).find("html").text();
                $("#txtTeacher").html(html);
            }
        }
    });
}

//教学任务-学期筛选条件
function XueQiList() {
    $.ajax({
        async: false,
        dataType: "xml",
        type: "post",
        url: "/DropDownList/TermList", 
        success: function (data) {
            if (data != null) {
                var html = "<option value='00'>全部学期</option>";
                 html += $(data).find("html").text();
                $("#txtXueqi").html(html);
            }
        }
    });
}
//教学任务-课程筛选条件
function CourseByXueqi(cid) {

    $.ajax({
        async: false,
        dataType: "xml",
        type: "post",
        url: "/DropDownList/CourseListByXueqi?id=" + cid,
        success: function (data) {
            if (data != null) {
                var html = "<option value='00'>全部课程</option>";
                html += $(data).find("html").text();
                $("#txtCourse").html(html);
            }
        }
    });
}