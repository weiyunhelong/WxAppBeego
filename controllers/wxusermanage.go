package controllers

import (
	"fmt"
	"github.com/astaxie/beego"
	 model "WeChatApp/models"
)
//微信用户页面
type WxUserController struct {
	beego.Controller
}
func (c *WxUserController) Get(){
	v := c.GetSession("isloginuser");
	fmt.Println("是否登录:");
	fmt.Println(v);

	if(v==true){		
		c.TplName = "wxuser/index.html"
	}else{
		c.TplName = "admin/login.html"
	}	
}

//微信用户列表数据
type WxUserPageController struct {
	beego.Controller
}
func (c *WxUserPageController) Post(){
	//页数
    pageno,err:=c.GetInt("page")
    if err!=nil{
       fmt.Println(err)
    }
    //每页显示的记录数
    pagesize,err:=c.GetInt("rows")
    if err!=nil{
       fmt.Println(err)
    }
    //搜索的条件
	search:=c.GetString("search");
	//调用接口，得到列表数据
    userList,listnum:=model.PageData(pagesize,pageno,search);
    c.Data["json"]=map[string]interface{}{"total":listnum,"rows":userList};
    c.ServeJSON();
}