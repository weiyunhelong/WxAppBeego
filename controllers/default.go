package controllers

import (
	"github.com/astaxie/beego"
)

//布局页面
type LayoutController struct {
	beego.Controller
}
//布局页面
func (c *LayoutController) Get() {
	//布局页面
	c.Layout = "shared/layout.html"
	//内容页面
	c.TplName = "shared/content.html"
	//其他的部分
	c.LayoutSections = make(map[string]string)
	//页面使用的css部分
	c.LayoutSections["HtmlHead"] = "shared/head.tpl"
	//页面使用的js部分
	c.LayoutSections["Scripts"] = "shared/scripts.tpl"
	//页面的补充部分，可做为底部的版权部分时候
    c.LayoutSections["SideBar"] = "shared/sidebar.tpl"
}