package controllers

import (
	"fmt"
	"path"
	"strings"
	"github.com/astaxie/beego"
	model "WeChatApp/models"
)
//登录页面
type LoginController struct {
	beego.Controller
}
func (c *LoginController) Get(){
  c.TplName="admin/login.html";
}
//登录的方法
func (c *LoginController) Post(){
   //得到用户名和密码
   UserName:=c.GetString("UserName");
   Pwd:=c.GetString("Pwd");
  
   //根据用户名和密码查询系统用户是否存在
   systemUser,err:=  model.QuerySystemUserByIdName(UserName,Pwd);
  
   //用户存在
   state:="fail";
   if(err){
	 state="success";
     c.SetSession("isloginuser", true);
     c.SetSession("username", systemUser.UserName);
     c.SetSession("nickname", systemUser.NickName);
     c.SetSession("usertx", systemUser.Photo);
     c.SetSession("userID", systemUser.ID);
   } else{
	c.SetSession("isloginuser", false);
   } 
   c.Data["json"]=map[string]interface{}{"state":state};
   c.ServeJSON();     
}
//登出页面
type LoginOutController struct {
	beego.Controller
}
//退出方法
func (c *LoginOutController) Post() {
	v := c.GetSession("isloginuser")
  
    if v == true {
      //删除指定的session   
      c.DelSession("isloginuser");
      //销毁全部的session
      c.DestroySession();
    }
    c.TplName="admin/login.html"
}

//上传头像
type UpLoadTxController struct {
	beego.Controller
}
//上传头像方法
func (c *UpLoadTxController) Post() {
	//得到上传头像的值
	//image，这是一个key值，对应的是html中input type-‘file’的name属性值
    f, h, _ := c.GetFile("image")
    //得到文件的名称
    fileName := h.Filename 
    arr := strings.Split(fileName, ":")
    if len(arr) > 1 {   
      index := len(arr) - 1
      fileName = arr[index]
    }
    //关闭上传的文件，不然的话会出现临时文件不能清除的情况
    f.Close()  
    //保存文件到指定的位置
    //static/uploadfile,这个是文件的地址，第一个static前面不要有/
	c.SaveToFile("image", path.Join("static/uploadfile",fileName));
	
    c.Data["json"]=map[string]interface{}{"data":"/static/uploadfile/"+fileName};
    c.ServeJSON();
}

//用户信息页面
type UserInfoController struct{
    beego.Controller
}
func (c *UserInfoController) Get(){
    v := c.GetSession("isloginuser");
	fmt.Println(v);

	if(v==true){
        //得到用户的信息
        username:=c.GetSession("username");
        nickname:=c.GetSession("nickname");
		usertx:=c.GetSession("usertx");
        userID:=c.GetSession("userID");
        fmt.Println("登录后得到的用户信息:");
        fmt.Println(username)

        //设置默认的头像
        if(usertx==""){
           usertx="/static/images/Template/photo2.png";
        }
        //传递给页面
        c.Data["UserName"]=username;
		c.Data["NickName"]=nickname;
		c.Data["UserPhoto"]=usertx;
		c.Data["ID"]=userID;		
		c.TplName="admin/userinfo.html"
	}else{
        c.TplName = "admin/login.html"
	}  
  
}

//更新用户信息
type UpdateUserController struct{
    beego.Controller
}
func (c *UpdateUserController) Post(){
    //得到用户名和密码
    ID:=c.GetString("Id");
    Pwd:=c.GetString("Pwd");
    NickName:=c.GetString("NickName");
    Photo:=c.GetString("Photo");
    fmt.Println("得到的参数:"+ID+","+Pwd+","+NickName+","+Photo+",");
    //更新的结果
    result:=model.UpdateSystemUser(NickName,Pwd,Photo,ID);
    data:="0";
    if(result){
        data="1";
    }
    c.Data["json"]=map[string]interface{}{"data":data};
    c.ServeJSON();
}