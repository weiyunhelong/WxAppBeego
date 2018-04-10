package utils

import (
	"encoding/xml"
	"bytes"
	"time"
	"io/ioutil"
	"strings"
	"fmt"
	"net/http"
	"crypto/md5"
	"errors"
	"sort"
	model "WeChatApp/models"
)

//微信小程序的信息
const  APPID = "wx6bdd07d1ec46993c";//应用ID来至开发者中心
const  APPSECRET = "bb9b487dbb59724a7a30cfb9399514d3";//应用密钥来至开发者中心
const  DOMAIN="https://78192844.qcloud.la";//域名

const  MchID = "1461725902";//商户号mch_id
const  PARTNER_KEY = "K9AYRN1F5HELBNHI8J5AMGVI1E8PC3GR";//KEY值
const  OAUTH2 = "https://open.weixin.qq.com/connect/oauth2/authorize";  //该地址用于获取code参数(回调中querystring参数)参考http://mp.weixin.qq.com/wiki/17/c0f37d5704f0b64713d5d2c37b468d75.html
const  OAUTH2_ACCESS_TOKEN = "https://api.weixin.qq.com/sns/oauth2/access_token";//该地址用于获取access_token和OpenId(返回的是json)参考http://mp.weixin.qq.com/wiki/17/c0f37d5704f0b64713d5d2c37b468d75.html
const  NOTIFY_URL_Page = DOMAIN+"/PayResult/Index";//微信异步通知页面
const  PayUrl = "https://api.mch.weixin.qq.com/pay/unifiedorder";
const  sContentType = "application/x-www-form-urlencoded";
const  WXAPPID = "wxb7b8ccffae1c528e";//应用ID来至开发者中心
const  WXAPPSECRET = "d4624c36b6795d1d99dcf0547af5443d";//应用密钥来至开发者中心
const  WXTOKEN = "wx17xiawucha";//应用密钥来至开发者中心

//得到Token的值
func GetToken() string{
	result:="";
	//创建请求，得到返回的结果
	resp, err := http.Post("https://api.weixin.qq.com/cgi-bin/token",
        "application/x-www-form-urlencoded",
		strings.NewReader("grant_type=client_credential&appid="+APPID+"&secret="+APPSECRET));
	//判断是否有错误	
    if err != nil {
        fmt.Println(err)
    }
    //关闭请求
	defer resp.Body.Close();
	//判断是否有错误
    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
       panic(err);
    }
	fmt.Println(string(body))
	result=string(body);
	return result
}

//得到OpenID的值
func GetOpenID(code string) string{
	result:="";
	//创建请求，得到返回的结果
	resp, err := http.Post("https://api.weixin.qq.com/sns/jscode2session",
        "application/x-www-form-urlencoded",
		strings.NewReader("appid="+APPID+"&secret="+APPSECRET+"&grant_type=authorization_code&js_code="+code));
	//判断是否有错误	
    if err != nil {
        fmt.Println(err)
    }
    //关闭请求
	defer resp.Body.Close();
	//判断是否有错误
    body, err := ioutil.ReadAll(resp.Body)
    if err != nil {
       panic(err);
    }
	fmt.Println(string(body))
	result=string(body);
	return result
}

//微信签名
func WechatGenSign(key string, m map[string]string) (string, error) {
	var signData []string
	for k, v := range m {
		if v != "" && k != "sign" && k != "key" {
			signData = append(signData, fmt.Sprintf("%s=%s", k, v))
		}
	}

	sort.Strings(signData)
	signStr := strings.Join(signData, "&")
	signStr = signStr + "&key=" + key

	c := md5.New()
	_, err := c.Write([]byte(signStr))
	if err != nil {
		return "", errors.New("WechatGenSign md5.Write: " + err.Error())
	}
	signByte := c.Sum(nil)
	if err != nil {
		return "", errors.New("WechatGenSign md5.Sum: " + err.Error())
	}
	return strings.ToUpper(fmt.Sprintf("%x", signByte)), nil
}

//对微信下订单或者查订单
func PostWechat(url string, data map[string]string) (model.WeChatQueryResult, error) {
	var xmlRe model.WeChatQueryResult
	buf := bytes.NewBufferString("")

	for k, v := range data {
		buf.WriteString(fmt.Sprintf("<%s><![CDATA[%s]]></%s>", k, v, k))
	}
	xmlStr := fmt.Sprintf("<xml>%s</xml>", buf.String())

	re, err := HTTPSC.PostData(url, "text/xml:charset=UTF-8", xmlStr)
	if err != nil {
		return xmlRe, errors.New("HTTPSC.PostData: " + err.Error())
	}

	err = xml.Unmarshal(re, &xmlRe)
	if err != nil {
		return xmlRe, errors.New("xml.Unmarshal: " + err.Error())
	}

	if xmlRe.ReturnCode != "SUCCESS" {
		// 通信失败
		return xmlRe, errors.New("xmlRe.ReturnMsg: " + xmlRe.ReturnMsg)
	}

	if xmlRe.ResultCode != "SUCCESS" {
		// 业务结果失败
		return xmlRe, errors.New("xmlRe.ErrCodeDes: " + xmlRe.ErrCodeDes)
	}
	return xmlRe, nil
}

//支付功能
func Pay(orderno string,nonce_str string,Body string,money string,openid string) (map[string]string, error) {
	var m = make(map[string]string)
	m["appid"] = APPID
	m["mch_id"] = MchID
	m["nonce_str"] = nonce_str
	m["body"] = Body
	m["out_trade_no"] = orderno
	m["total_fee"] = money
	m["spbill_create_ip"] = DOMAIN
	m["notify_url"] = NOTIFY_URL_Page
	m["trade_type"] = "JSAPI"
	m["openid"] = openid
	m["sign_type"] = "MD5"

	sign, err := WechatGenSign(PARTNER_KEY, m)
	if err != nil {
		return map[string]string{}, err
	}
	m["sign"] = sign

	// 转出xml结构
	xmlRe, err := PostWechat(PayUrl, m)
	if err != nil {
		return map[string]string{}, err
	}

	var c = make(map[string]string)
	c["appId"] = APPID
	c["timeStamp"] = fmt.Sprintf("%d", time.Now().Unix())
	c["nonceStr"] =nonce_str
	c["package"] = fmt.Sprintf("prepay_id=%s", xmlRe.PrepayID)
	c["signType"] = "MD5"
	sign2, err := WechatGenSign(PARTNER_KEY, c)
	if err != nil {
		return map[string]string{}, errors.New("WechatWeb: " + err.Error())
	}
	c["paySign"] = sign2
	return c, nil
}