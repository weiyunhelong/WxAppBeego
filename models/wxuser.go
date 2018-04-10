package models
 
import (
	"database/sql"
	"time"
	"fmt"
    "github.com/astaxie/beego/orm"
	_ "github.com/go-sql-driver/mysql"
)
 
// 用户表结构
type wxUser struct{
    ID              int64    `orm:"auto"`
    OpenID          string   `orm:"size(100)"`
    WxName          string   `orm:"size(100)"`   
    WxSex           string   `orm:"size(2)"`   
    WxTouxiang      string   `orm:"size(500)"`
    Create          time.Time 
}

//得到用户信息
func Create(openid string,wxname string,sex string,touxiang string)  (user wxUser){
     
    //查询用户是否已存在
    user, err := QueryByIdName(openid,wxname)
    if err == true{
        return user
    }else{ 
        o := orm.NewOrm()
        o.Using("default")
        newuser:=new(wxUser);
        //赋值给模型
        newuser.OpenID = openid
		newuser.WxName=wxname
        newuser.WxSex = sex
		newuser.WxTouxiang = touxiang
        //新增数据
        o.Insert(newuser)
 
        return *newuser
    }
}

//根据OPENID和微信昵称判断用书是否存在
func QueryByIdName(openid string,wxname string) (wxUser,bool){
    var user wxUser

    //连接数据库
    db, err := sql.Open("mysql", conn);
    //查询数据
    rows, err := db.Query("select * from wxuser where OpenID='"+openid+"' and WxName='"+wxname+"'");
    if(err!=nil){
        fmt.Println("查询微信用户不存在!");
        return user,false
    }
    //给对象赋值
    for rows.Next(){
        var ID         int64
        var OpenID     string  
        var WxName     string   
        var WxSex      string   
        var WxTouxiang string  
        rows.Columns()
        err = rows.Scan(&ID,&OpenID,&WxName,&WxSex,&WxTouxiang)
        checkErr(err)
        //给用户赋值
        user.ID=ID;
        user.OpenID=OpenID;
        user.WxName=WxName;
        user.WxSex=WxSex;
        user.WxTouxiang=WxTouxiang;
        fmt.Println("微信用户的信息:");
        fmt.Println(&user);
    } 
    return user,true
}

//根据微信昵称和页数获取分页的数据
func PageData(pageno int,pagesize int,search string)(wxUserlist []wxUser,num int64){
    o := orm.NewOrm()
     
    if(search!=""){
        num, err := o.Raw("SELECT * FROM wxuser WHERE WxName = ? order by Create desc limit ?,?", search,(pageno-1)*pagesize,pagesize).QueryRows(&wxUserlist)
        if err == nil {
          fmt.Println("user nums: ", num)
        }
        return wxUserlist,num
    }else{
       num, err := o.Raw("SELECT * FROM wxuser order by Create desc desc limit ?,?", (pageno-1)*pagesize,pagesize).QueryRows(&wxUserlist)
       if err == nil {
        fmt.Println("user nums: ", num)
       }
       return wxUserlist,num
    }
    
}
