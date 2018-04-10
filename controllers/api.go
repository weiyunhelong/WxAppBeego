package controllers

import (	
	"path"
	"strings"
	"fmt"
	"github.com/astaxie/beego"
	utils "WeChatApp/utils"
	model "WeChatApp/models"
)

//得到TOKEN的值
type GetTokenController struct {
	beego.Controller
}

func (c *GetTokenController) Get() {
   //请求wxTool中的方法得到Token的值
   resdata:=utils.GetToken();
	
   fmt.Println("得到TOKEN的结果:");
   fmt.Println(resdata);
   //JSON数据的形式返回
   c.Data["json"] = resdata;
   c.ServeJSON();
}

//得到OPENID的值
type GetOpenIDController struct {
	beego.Controller
}

func (c *GetOpenIDController) Get() {
   //登录授权码
   code:="081ih3Ag2d4IAB0qe3Cg2hXnAg2ih3At";

   //得到OPENID的值
   resdata:=utils.GetOpenID(code);
	
   fmt.Println("得到OPENID的结果:");
   fmt.Println(resdata);
   
   c.Data["json"] = resdata
   c.ServeJSON()
}

//得到用户的信息
type GetWxUserController struct {
	beego.Controller
}

func (c *GetWxUserController) Post() {
	//得到用户的信息
	openid:=c.GetString("openid")
	wxname:=c.GetString("wxname")
	sex:=c.GetString("wxsex")
	touxiang:=c.GetString("wxtx")
	
   //得到参数的值
   fmt.Println(openid+","+wxname+","+sex+","+touxiang);
   wxuser:=	model.Create(openid,wxname,sex,touxiang);

   c.Data["json"] = wxuser
   c.ServeJSON()
}


//上传图片
type FileOptUploadController struct {
    beego.Controller
}
func (this *FileOptUploadController) Post() {
    //image，这是一个key值，对应的是html中input type-‘file’的name属性值
    f, h, _ := this.GetFile("image")
    //得到文件的名称
    fileName := h.Filename 
    arr := strings.Split(fileName, ":")
    if len(arr) > 1 {   
      index := len(arr) - 1
      fileName = arr[index]
    }
    fmt.Println("文件名称:")
    fmt.Println(fileName)
    //关闭上传的文件，不然的话会出现临时文件不能清除的情况
    f.Close()  
    //保存文件到指定的位置
    //static/uploadfile,这个是文件的地址，第一个static前面不要有/
    this.SaveToFile("image", path.Join("static/uploadfile",fileName));
    
    //显示在本页面，不做跳转操作 
    this.Data["json"]="static/uploadfile/"+fileName;
    this.ServeJSON();
}