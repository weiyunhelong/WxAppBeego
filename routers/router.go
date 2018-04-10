package routers

import (
	"WeChatApp/controllers"
	"github.com/astaxie/beego"
)

func init() {
	beego.Router("/", &controllers.MainController{})
	/******后台路由部分********/
	/***系统用户管理部分***/
	beego.Router("/Admin/Login", &controllers.LoginController{})
	beego.Router("/Admin/UserInfo", &controllers.UserInfoController{})
	beego.Router("/Admin/Logout", &controllers.LoginOutController{})
	beego.Router("/Admin/UpdateUser", &controllers.UpdateUserController{})
	beego.Router("/Admin/FilesUpLoad", &controllers.UpLoadTxController{})
	beego.Router("/Main/Index", &controllers.MainController{})
	/***微信用户管理部分***/
	beego.Router("/WxUserManage/Index", &controllers.WxUserController{})
	beego.Router("/WxUserManage/PageData", &controllers.WxUserPageController{})
	//api接口部分
	beego.Router("/api/gettoken", &controllers.GetTokenController{})
	beego.Router("/api/getopenid", &controllers.GetOpenIDController{})
}
