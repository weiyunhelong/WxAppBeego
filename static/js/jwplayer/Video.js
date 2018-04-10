

//播放Mediaplayer格式的视频，包括.avi .mpg .mpeg .wmv .wma .asf .mid .mp3等    
function pv_m(u, w, h) {
    var pv = '';
    pv += '<object width="' + w + '" height="' + h + '" id="iask_v" classid="CLSID:22d6f312-b0f6-11d0-94ab-0080c74c7e95" codebase="http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=6,4,5,715" standby="Loading Microsoft Windows Media Player components..." type="application/x-oleobject">';
    pv += '<param name="FileName" value="' + u + '">';
    pv += '<param name="AutoStart" value="1">';
    pv += '<param name="AutoSize" value="1">';
    pv += '<param name="ShowControls" value="1">';
    pv += '<param name="ShowPositionControls" value="0">';
    pv += '<param name="ShowAudioControls" value="1">';
    pv += '<param name="ShowTracker" value="1">';
    pv += '<param name="ShowDisplay" value="0">';
    pv += '<param name="ShowStatusBar" value="1">';
    pv += '<param name="ShowGotoBar" value="0">';
    pv += '<param name="ShowCaptioning" value="0">';
    pv += '<param name="PlayCount" value="1">';
    pv += '<param name="AnimationAtStart" value="0">';
    pv += '<param name="TransparentAtStart" value="0">';
    pv += '<param name="AllowScan" value="0">';
    pv += '<param name="EnableContextMenu" value="0">';
    pv += '<param name="ClickToPlay" value="0">';
    pv += '<param name="InvokeURLs" value="1">';
    pv += '<param name="DefaultFrame" value="">';
    pv += '<embed src="' + u + '" width="' + w + '" height="' + h + '" type="application/x-mplayer2" pluginspage="http://www.microsoft.com/isapi/redir.dll?prd=windows&;sbp=mediaplayer&ar=media&sba=plugin&" name="MediaPlayer" showcontrols="1" showpositioncontrols="0" showaudiocontrols="1" showtracker="1" showdisplay="0" showstatusbar="1" autosize="0" showgotobar="0" showcaptioning="0" autostart="1" autorewind="0" animationatstart="0" transparentatstart="0" allowscan="1" enablecontextmenu="1" clicktoplay="0" invokeurls="1" defaultframe=""></embed>';
    pv += '</object>';
    document.write(pv);
}

//播放Realplay格式的视频，包括.rm .ram .rmvb等
function pv_r(u, w, h) {
    var pv = '';
    pv += '<object width="' + w + '" height="' + h + '" id="iask_v" classid="clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA">';
    pv += '<param name="SRC" value="' + u + '">';
    pv += '<param name="AUTOSTART" value="1">';
    pv += '<param name="CONTROLS" value="Imagewindow,StatusBar,ControlPanel">';
    pv += '<param name="_ExtentX" value="18415">';
    pv += '<param name="_ExtentY" value="9102">';
    pv += '<param name="SHUFFLE" value="0">';
    pv += '<param name="PREFETCH" value="0">';
    pv += '<param name="NOLABELS" value="0">';
    pv += '<param name="CONSOLE" value="Clip1">';
    pv += '<param name="LOOP" value="0">';
    pv += '<param name="NUMLOOP" value="0">';
    pv += '<param name="CENTER" value="0">';
    pv += '<param name="MAINTAINASPECT" value="0">';
    pv += '<param name="BACKGROUNDCOLOR" value="#000000">';
    pv += '<embed src="' + u + '" width="' + w + '" height="' + h + '" type="audio/x-pn-realaudio-plugin" console="Clip1" controls="Imagewindow,StatusBar,ControlPanel" autostart="true">';
    pv += '</object>';
    document.write(pv);
}