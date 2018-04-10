package models
 
import (
	"strconv"
	"strings"
	"fmt"
	"database/sql"
    _ "github.com/go-sql-driver/mysql"
    "github.com/astaxie/beego"
)
 
// 用户表结构
type systemUser struct{
    ID              int64    `orm:"auto"`
    UserName        string   `orm:"size(50)"`   
    Password        string   `orm:"size(50)"`   
    NickName        string   `orm:"size(50)"`
    Photo           string   `orm:"size(500)"`
    GUID            string   `orm:"size(50)"`
    RoleID          string   `orm:"size(50)"`
}

//数据库信息部分
var dbhost = beego.AppConfig.String("dbhost");
var dbport= beego.AppConfig.String("dbport");
var dbuser= beego.AppConfig.String("dbuser");
var dbpassword= beego.AppConfig.String("dbpassword");
var dbbase= beego.AppConfig.String("db");
var conn = dbuser + ":" + dbpassword + "@tcp(" + dbhost + ":" + dbport + ")/" + dbbase + "?charset=utf8";

//根据用户名和密码判断用户是否存在
func QuerySystemUserByIdName(userName string,pwd string) (systemUser,bool){
  
    var user systemUser
    //连接数据库
    db, err := sql.Open("mysql", conn);
    fmt.Println("数据库的连接:");
    checkErr(err);
    //查询数据
    rows, err := db.Query("select * from systemuser where UserName='"+userName+"' and Password='"+pwd+"'");
    if(err!=nil){
        fmt.Println("查询系统用户错误!");
        fmt.Println(err);
        return user,false
    }
    //给对象赋值
    for rows.Next(){
        var ID int64
        var UserName string
        var Password string
        var NickName string
        var Photo    string  
        var GUID     string  
        var RoleID   string
        rows.Columns()
        err = rows.Scan(&ID, &UserName, &Password, &NickName,&Photo, &GUID, &RoleID)
        checkErr(err)
        user.ID=ID;
        user.UserName=UserName;
        user.Password=Password;
        user.NickName=NickName;
        user.Photo=Photo;
        user.GUID=GUID;
        user.RoleID=RoleID;

        fmt.Println("系统用户的信息:");
        fmt.Println(user);
        return user,true
    } 
    return user,true
}
//打印错误
func checkErr(err error) {
    if err != nil {
        panic(err)
    }
}

//更新用户信息
func UpdateSystemUser(nickname string,pwd string,photo string,id string)bool{
   //连接数据库
   db, err := sql.Open("mysql", conn);
    fmt.Println("数据库的连接:");
    checkErr(err);
   //更新的语句
   stmt, err := db.Prepare(`UPDATE systemuser SET Password=?,Photo=?,Photo=? WHERE ID=?`)
   checkErr(err)
   findid, err := strconv.ParseInt(id, 10, 64)  
   checkErr(err)
   //将参数带入执行更新的语句
   res, err := stmt.Exec(nickname, pwd, photo,findid)
   checkErr(err)
   num, err := res.RowsAffected()
   checkErr(err)
   //更新是否成功
   if(num>0){
     return true
   }else{
     return false
   }
}

//新增用户信息
func AddSystemUser(nickname string,pwd string,photo string,userName string)bool{
    //连接数据库
    db, err := sql.Open("mysql", conn);
    fmt.Println("数据库的连接:");
    checkErr(err);

    //新增的语句
    stmt, err := db.Prepare(`INSERT systemuser (UserName,Password,NickName,Photo) values (?,?,?,?)`);
    checkErr(err);
    //将参数带入，执行插入的方法
    res, err := stmt.Exec(userName, pwd, nickname, photo);
    checkErr(err);
    //插入的结果
    id, err := res.LastInsertId()
    checkErr(err)
    fmt.Println(id)
    //返回结果
    if(id>0){
        return true
    }else{
        return false
    }
 }

 //删除用户信息
func DeleteSystemUser(ids string)bool{
    result:=true;
    //连接数据库
    db, err := sql.Open("mysql", conn);
    fmt.Println("数据库的连接:");
    checkErr(err);
    //用逗号拆分，得到需要删除的列表
    delids:=strings.Split(ids,",");
    //遍历删除
    for i:=0;i<len(delids)-1; i++  {
       //删除的语句
       stmt, err := db.Prepare(`DELETE FROM systemuser WHERE ID=?`)
       checkErr(err)
       //将字符串转为INT64
       delid, err := strconv.ParseInt(delids[i], 10, 64)  
       checkErr(err)
       //带入参数，执行SQL语句
       res, err := stmt.Exec(delid)
       checkErr(err)
       //语句执行的结果
       num, err := res.RowsAffected()
       checkErr(err)
       //返回结果
       if(num>0){
         continue;
      }else{
        result=false;
        break;
      }
    }   
    return result
   //结束标示符号
 }