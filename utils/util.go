package utils

import (
	"encoding/json"
	"fmt"
	"net"
	"time"
	"math"
)

//RandomStr 获取一个随机字符串
func RandomStr() string {
	return fmt.Sprintf("%d", time.Now().UnixNano())
}

// LocalIP 获取机器的IP
func LocalIP() string {
	info, _ := net.InterfaceAddrs()
	for _, addr := range info {
		ipNet, ok := addr.(*net.IPNet)
		if !ok {
			continue
		}
		if !ipNet.IP.IsLoopback() && ipNet.IP.To4() != nil {
			return ipNet.IP.String()
		}
	}
	return ""
}
// 字符串转结构
func MapStringToStruct(m map[string]string, i interface{}) error {
	bin, err := json.Marshal(m)
	if err != nil {
		return err
	}
	err = json.Unmarshal(bin, i)
	if err != nil {
		return err
	}
	return nil
}

//根据经纬度计算距离
const  EARTH_RADIUS = 6378.137;//地球半径
func GetDistance(jingdu float64,weidu float64,targetjingdu float64, targetweidu float64) float64 {
   //经度差
    lng := (jingdu * math.Pi / 180) - (targetjingdu * math.Pi / 180);
   //纬度差
    lat := (weidu * math.Pi / 180) - (targetweidu * math.Pi / 180);

    dis:= 2 * math.Asin(math.Sqrt(math.Pow(math.Sin(lat / 2), 2)+ math.Cos(jingdu * math.Pi / 180) * math.Cos(targetweidu * math.Pi / 180)* math.Pow(math.Sin(lng / 2), 2)));
   dis = dis * EARTH_RADIUS;
   dis = math.Floor(dis * 1e4) / 1e4;

   //计算出来的原本是 公里
   return dis;
}


//生成订单号
func GeneratorOrderNO(goodid string) string{
	result := "";
	//得到当前的时间
	timestamp := time.Now().Unix();
    tm := time.Unix(timestamp, 0);
    //时间转字符串
	dt:=tm.Format("20060102031405");
	//拼接成为订单号
	result+=goodid+dt+"1";
	return result;
}