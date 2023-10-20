function getUserIP(onNewIP) { 
      //compatibility for firefox and chrome
      var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
      var pc = new myPeerConnection({
         iceServers: []
     }),
     noop = function() {},
     localIPs = {},
     ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
     key;
 
     function iterateIP(ip) {
         if (!localIPs[ip]) onNewIP(ip);
         localIPs[ip] = true;
    }
 
     pc.createDataChannel("");
     pc.createOffer().then(function(sdp) {
         sdp.sdp.split('\n').forEach(function(line) {
             if (line.indexOf('candidate') < 0) return;
             line.match(ipRegex).forEach(iterateIP);
         });
         pc.setLocalDescription(sdp, noop, noop);
     }).catch(function(reason) {
         
     });
     pc.onicecandidate = function(ice) {
         if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
         ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
     };
}
var CLocalIpStr='';
getUserIP(function(ip){
CLocalIpStr = ip;
});
function GetLocalIP(){
return CLocalIpStr;
}
function GetWebIP(){
if("undefined" != typeof returnCitySN){
return returnCitySN["cip"];
}else{
return "0.0.0.0";
}
}