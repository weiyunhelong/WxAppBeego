package controllers

import (
	"fmt"
	"github.com/astaxie/beego"
)
//登录页面
type MainController struct {
	beego.Controller
}
func (c *MainController) Get() {

	v := c.GetSession("isloginuser");
	fmt.Println("是否登录:");
	fmt.Println(v);

	if(v==true){
		//得到用户的信息
	    nickname:=c.GetSession("nickname");
		usertx:=c.GetSession("usertx");
		userID:=c.GetSession("userID");
		//传递给页面
		c.Data["NickName"]=nickname;
		c.Data["UserPhoto"]=usertx;
		c.Data["ID"]=userID;

		c.TplName = "main/index.html"
	}else{
		c.TplName = "admin/login.html"
	}
}
