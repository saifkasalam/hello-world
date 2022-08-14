var jwtTokenString;
var agentOnlineStatus = false;
var isJwtToken = false;
var lcIfrmHeight = "500px";
var lcIfrmWidth = "400px";
var clientInfoData;
var isClientInfo = false;

function readLiveChatHelpdeskJson(obj){
	var helpdesk, lang, helpdeskDisName, populate_dept, form_id, jwt_token, authenticate_bypass_prechat_form , chat_launch_url, disable_dept,  deptList;

		if(obj!=null)
		{
			if(obj["Helpdesk"]!=undefined)
				{
				helpdesk=obj["Helpdesk"];
				}
			if(obj["Lang"]!=undefined)
				{
				lang=obj["Lang"];
			}else{
					lang=null;	
			}
			 if(obj["Helpdesk_Display_Name"]!=undefined)
				{
				 helpdeskDisName=obj["Helpdesk_Display_Name"];
			}else{
					helpdeskDisName=null;	
				}
			 if(obj["Populate_Dept"]!=undefined && obj["Populate_Dept"]!=="")
				{ 
				 populate_dept=obj["Populate_Dept"];
				}
			else
				{
				populate_dept = null;
				}	 
			 if(obj["Form_Id"]!==undefined && obj["Form_Id"]!=="")
				{
				 form_id=obj["Form_Id"];
				}
			else
				{
				form_id = '0';
				}
			 if(obj["Jwt_Token"]!==undefined && obj["Jwt_Token"]!=="")
				{
				 isJwtToken = true;
				 jwtTokenString=obj["Jwt_Token"];
				 jwt_token=obj["Jwt_Token"];
				}
			else
				{
			     jwt_token = null;
				}
			 if(obj["Authenticate_Bypass_Prechat_Form"]!=undefined && obj["Authenticate_Bypass_Prechat_Form"]!=="")
				{
				 authenticate_bypass_prechat_form=obj["Authenticate_Bypass_Prechat_Form"];
				}
			else
				{
				authenticate_bypass_prechat_form = 'N';
				}
			 if(obj["Chat_Launch_Url"]!=undefined && obj["Chat_Launch_Url"]!=="")
				{
				 chat_launch_url=obj["Chat_Launch_Url"];
				}
			else
				{
				chat_launch_url = location.href;
				}
			 if(obj["Disable_Dept"]!=undefined && obj["Disable_Dept"]!=="")
				{
				 disable_dept=obj["Disable_Dept"];
				}
			else
				{
				disable_dept = 'n';
				}
			 if(obj["Dept_List"]!=undefined && obj["Dept_List"]!=="")
				{
				 deptList=obj["Dept_List"];
				}
			else
				{
				deptList = null;
				}
		//prepareLiveChatHelpeskFrame(obj["Helpdesk"], obj["Lang"], obj["Helpdesk_Display_Name"], obj["Populate_Dept"], obj["Form_Id"], obj["Jwt_Token"], obj["Authenticate_Bypass_Prechat_Form"], obj["Chat_Launch_Url"], obj["Disable_Dept"], obj["Dept_List"]);
	prepareLiveChatHelpeskFrame(helpdesk, lang, helpdeskDisName, populate_dept, form_id, jwt_token, authenticate_bypass_prechat_form, chat_launch_url,disable_dept,deptList)
		}}


function prepareLiveChatHelpeskFrame(helpdesk, lang, helpdeskDisName, populate_dept, form_id, jwt_token, authenticate_bypass_prechat_form, chat_launch_url, disable_dept, deptList){
	/*var isJwtToken = true;*/
	if(!lang || lang === ""){
		lang = null;
	}
	if(!helpdeskDisName || helpdeskDisName === ""){
		helpdeskDisName = null;
	}
	if(!form_id || form_id === ""){
		form_id = '0';
	}
	if(!populate_dept || populate_dept === ""){
		populate_dept = null;
	}
	if(!authenticate_bypass_prechat_form || authenticate_bypass_prechat_form === ""){
		authenticate_bypass_prechat_form = 'N';
	}
	if(!jwt_token || jwt_token === ""){
		isJwtToken = false;
		jwt_token = null;
	}else{
		isJwtToken = true;
		jwtTokenString = jwt_token;
	}
	if(!chat_launch_url || chat_launch_url === ""){
		chat_launch_url = location.href;
	}

	if(!disable_dept || disable_dept === ""){
		disable_dept = 'n';
	}
	
	if(!deptList || deptList === ""){
		deptList = null;
	}
	
	var d = new Date();
	var currDate = (d.getDate() < 10 ? '0' : '') + d.getDate() +''+((d.getMonth()+1) < 10 ? '0' : '') + (d.getMonth() + 1) + '' + (d.getFullYear());
	
	if(isMobileDevice()){
		/*var myWindow = */window.open('/Crosstalk/Helpdesk/lcMobileIframe.html?node=tcsion.com&helpdesk='+helpdesk+'&locale='+lang+'&v='+ currDate+'&department='+populate_dept+'&formid='+form_id+'&chatlaunchurl='+encodeURIComponent(chat_launch_url)+'&disabledept='+disable_dept+'&isjwttoken='+isJwtToken+'&authenticatebypassprechatform=' + authenticate_bypass_prechat_form +'&deptlist='+encodeURIComponent(deptList) + '&JWTtoken=' + jwt_token + '&parentorigin=' + encodeURIComponent(location.origin),'targetWindow');
		/*myWindow.addEventListener("load", function(){addToken(myWindow, isJwtToken, jwt_token)}, false);*/
	} else{
		var frame = document.getElementById("livechat_helpdesk");
		if(frame != null){
			   frame.src="about:blank";
	           frame.parentNode.removeChild(frame);
		}
		var ifrm = document.createElement("iframe");
		
		ifrm.setAttribute("src", "/Crosstalk/Helpdesk/helpdesk.html?helpdesk="+helpdesk+"&locale="+lang+"&v="+ currDate+"&helpdeskdisplayname="+encodeURIComponent(helpdeskDisName)+"&parentorigin="+encodeURIComponent(location.origin) + "&populatedept=" + populate_dept + "&formid=" + form_id + "&isjwttoken=" + isJwtToken + "&authenticatebypassprechatform=" + authenticate_bypass_prechat_form + "&chatlaunchurl=" + encodeURIComponent(chat_launch_url) + "&disabledept=" + disable_dept + "&deptlist=" + encodeURIComponent(deptList));
		
	    ifrm.id="livechat_helpdesk";
	    ifrm.style.position = "fixed";
	    ifrm.style.zIndex = "9999999999999";
	    ifrm.style.bottom = "0px";
	    ifrm.style.right = "0px";
	    ifrm.style.border = "none";
	    ifrm.style.width = "445px";
	    ifrm.style.height = "452px";
	    document.body.appendChild(ifrm);
	}
};
function readLiveChatHelpdesknewuIJson(obj){
	var helpdesk, lang, helpdeskDisName, populate_dept, form_id, jwt_token, authenticate_bypass_prechat_form , chat_launch_url, disable_dept,  deptList, themeID, iframheight, iframwidth,client_info, configID;

		if(obj!=null)
		{
			if(obj["Helpdesk"]!=undefined)
				{
				helpdesk=obj["Helpdesk"];
				}
			if(obj["Lang"]!=undefined)
				{
				lang=obj["Lang"];
			}else{
					lang=null;	
				}
			 if(obj["Helpdesk_Display_Name"]!=undefined)
				{
				 helpdeskDisName=obj["Helpdesk_Display_Name"];
			}else{
					helpdeskDisName=null;	
			}
			 if(obj["Populate_Dept"]!=undefined && obj["Populate_Dept"]!=="")
				{ 
				 populate_dept=obj["Populate_Dept"];
				}
			else
				{
				populate_dept = null;
				}	 
			 if(obj["Form_Id"]!==undefined && obj["Form_Id"]!=="")
				{
				 form_id=obj["Form_Id"];
				}
			else
				{
				form_id = '0';
				}
			 if(obj["Jwt_Token"]!==undefined && obj["Jwt_Token"]!=="")
				{
				 isJwtToken = true;
				 jwtTokenString=obj["Jwt_Token"];
				 jwt_token=obj["Jwt_Token"];

				}
			else
				{
			     jwt_token = null;

				}
			 if(obj["Authenticate_Bypass_Prechat_Form"]!=undefined && obj["Authenticate_Bypass_Prechat_Form"]!=="")
				{
				 authenticate_bypass_prechat_form=obj["Authenticate_Bypass_Prechat_Form"];
				}
			else
				{
				authenticate_bypass_prechat_form = 'N';
				}
			 if(obj["Chat_Launch_Url"]!=undefined && obj["Chat_Launch_Url"]!=="")
				{
				 chat_launch_url=obj["Chat_Launch_Url"];
				}
			else
				{
				chat_launch_url = location.href;
				}
			 if(obj["Disable_Dept"]!=undefined && obj["Disable_Dept"]!=="")
				{
				 disable_dept=obj["Disable_Dept"];
				}
			else
				{
				disable_dept = 'n';
				}
			 if(obj["Dept_List"]!=undefined && obj["Dept_List"]!=="")
				{
				 deptList=obj["Dept_List"];
				}
			else
				{
				deptList = null;
				}
			 if(obj["ifram_height"]!=undefined && obj["ifram_height"]!=="")
				{
				 iframheight=obj["ifram_height"];
				}
			else
				{
				iframheight = "";
				}
			 if(obj["ifram_width"]!=undefined && obj["ifram_width"]!=="")
				{
				 iframwidth=obj["ifram_width"];
				}
			else
				{
				iframwidth = "";
				}
			 if(obj["clientInfo"]!==undefined && obj["clientInfo"]!=="")
				{
				 isClientInfo = true;
				 client_info=obj["clientInfo"];
				 clientInfoData = obj["clientInfo"]
				}
			else
				{
				isClientInfo = false;
				}
			 if(obj["themeID"]!==undefined && obj["themeID"]!=="")
				{
				 themeID=obj["themeID"];
				}
			else
				{
				themeID = '0';
				}
			 if(obj["configID"]!==undefined && obj["configID"]!=="")
				{
				 configID=obj["configID"];
				}
			else
				{
				configID = "";
				}
		//prepareLiveChatHelpeskFrame(obj["Helpdesk"], obj["Lang"], obj["Helpdesk_Display_Name"], obj["Populate_Dept"], obj["Form_Id"], obj["Jwt_Token"], obj["Authenticate_Bypass_Prechat_Form"], obj["Chat_Launch_Url"], obj["Disable_Dept"], obj["Dept_List"]);
	prepareLiveChatHelpeskFrameNewUI(helpdesk, lang, helpdeskDisName, populate_dept, form_id, jwt_token, authenticate_bypass_prechat_form, chat_launch_url,disable_dept,deptList, iframheight, iframwidth, themeID, client_info, configID)
		}}

function prepareLiveChatHelpeskFrameNewUI(helpdesk, lang, helpdeskDisName, populate_dept, form_id, jwt_token, authenticate_bypass_prechat_form, chat_launch_url, disable_dept, deptList, iframheight, iframwidth, themeID, client_info, configID){
	/*var isJwtToken = true;*/
	if(!lang || lang === ""){
		lang = null;
	}
	if(!helpdeskDisName || helpdeskDisName === ""){
		helpdeskDisName = null;
	}
	if(!form_id || form_id === ""){
		form_id = '0';
	}
	if(!populate_dept || populate_dept === ""){
		populate_dept = null;
	}
	if(!authenticate_bypass_prechat_form || authenticate_bypass_prechat_form === ""){
		authenticate_bypass_prechat_form = 'N';
	}
	if(!jwt_token || jwt_token === ""){
		isJwtToken = false;
		jwt_token = null;
	}else{
		isJwtToken = true;
		jwtTokenString = jwt_token;
	}
	if(!chat_launch_url || chat_launch_url === ""){
		chat_launch_url = location.href;
	}
	if(!disable_dept || disable_dept === ""){
		disable_dept = 'n';
	}
	
	if(!deptList || deptList === ""){
		deptList = null;
	}
	
	if(!themeID || themeID === ""){
		themeID = '0';
	}
	
	if(!configID || configID === ""){
		configID = "";
	}
	
	if(!client_info || client_info === ""){
		isClientInfo = false;
		client_info = null;
	}else{
		isClientInfo = true;
		clientInfoData = client_info;
	}
	
	var d = new Date();
	var currDate = (d.getDate() < 10 ? '0' : '') + d.getDate() +''+((d.getMonth()+1) < 10 ? '0' : '') + (d.getMonth() + 1) + '' + (d.getFullYear());
	
	//if(isMobileDevice()){
	//	/*var myWindow = */window.open('/Crosstalk/Helpdesk/lcMobileIframe.html?node=tcsion.com&helpdesk='+helpdesk+'&locale='+lang+'&v='+ currDate+'&department='+populate_dept+'&formid='+form_id+'&chatlaunchurl='+encodeURIComponent(chat_launch_url)+'&disabledept='+disable_dept+'&isjwttoken='+isJwtToken+'&authenticatebypassprechatform=' + authenticate_bypass_prechat_form +'&deptlist='+encodeURIComponent(deptList) + '&JWTtoken=' + jwt_token + '&parentorigin=' + encodeURIComponent(location.origin),'targetWindow');
		/*myWindow.addEventListener("load", function(){addToken(myWindow, isJwtToken, jwt_token)}, false);*/
	//} else{
		var frame = document.getElementById("livechat_helpdesk");
		if(frame != null){
			   frame.src="about:blank";
	           frame.parentNode.removeChild(frame);
		}
		var ifrm = document.createElement("iframe");
		
		ifrm.setAttribute("src", "/LiveChat/#/customer?helpdesk="+helpdesk+"&locale="+lang+"&v="+ currDate+"&helpdeskdisplayname="+encodeURIComponent(helpdeskDisName)+"&parentorigin="+encodeURIComponent(location.origin)+"&populatedept=" + populate_dept + "&formid=" + form_id + "&isjwttoken=" + isJwtToken + "&authenticatebypassprechatform=" + authenticate_bypass_prechat_form + "&chatlaunchurl=" + encodeURIComponent(chat_launch_url) + "&disabledept=" + disable_dept + "&deptlist=" + encodeURIComponent(deptList)+ "&themeID=" + encodeURIComponent(themeID) + "&clientInfo=" + isClientInfo+ "&configID=" + encodeURIComponent(configID));
		
	    ifrm.id="livechat_helpdesk";
	    ifrm.style.position = "fixed";
	    ifrm.style.zIndex = "9999999999999";
	    ifrm.style.bottom = "0px";
	    ifrm.style.right = "0px";
	    ifrm.style.border = "none";
	    if(isMobileDevice()){
	    	ifrm.style.width = "100%";
	    	ifrm.style.height = "100%";
	    }
	    else{
	    	if(!isNaN(iframheight) && iframheight !=""){
	    		lcIfrmHeight = iframheight+"px";
	    	}
	    	if(!isNaN(iframwidth) && iframwidth !=""){
	    		lcIfrmWidth = iframwidth+"px";
	    	}
	    	ifrm.style.width = lcIfrmWidth;
	    	ifrm.style.height = lcIfrmHeight;
	    	ifrm.style.borderRadius ="8px 8px 0px 0px";
		    ifrm.style.boxShadow = "0px 4px 12px rgba(0, 0, 0, .4)";
	    }
	    document.body.appendChild(ifrm);
  };
/*function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};*/

function isMobileDevice() {
	var isMobile = false; //initiate as false
	//device detection
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
	 || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)) 
	 || (navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && navigator.platform && /MacIntel/.test(navigator.platform))) 
		isMobile = true;
	return isMobile;
};

function isMobileDeviceMtop() {
	var isMobile = false; //initiate as false
	var isAndroid = /android/i.test(navigator.userAgent.toLowerCase());
	var isBlackBerry = /blackberry/i.test(navigator.userAgent.toLowerCase());
	var isWindowsPhone = /windows phone/i.test(navigator.userAgent.toLowerCase());
	var isiDevice = /ipad|iphone|ipod/i.test(navigator.userAgent.toLowerCase());
	var isWebOS = /webos/i.test(navigator.userAgent.toLowerCase());

	if( isAndroid || isBlackBerry || isWindowsPhone || isiDevice || isWebOS ){	
		isMobile = true;
	}
	return isMobile;
};

/*function agentOnline(workgroupJID) {
	var	URL = null;
	agentOnlineStatus = false;
    URL= "/Crosstalk/AgentOnlineStatus";
    var html =jQuery.ajax({
    	  url:URL,
    	  data:{ workgroupJID : workgroupJID},
          type: "GET",
          dataType: 'json',
          crossDomain:true,
          success: function(pElement){
        	  agentOnlineStatus= pElement.online;
          },
	     	error: function(xhr, status, error) {
				  console.log(error);
		    }
    	});
};*/

function checkArrayIfEmpty(my_arr){
	var count = 0;
  	for(var i=0;i<my_arr.length;i++){
      	if(my_arr[i] === ""){
    	  count += 1;
      	}
  	}
  	if(count == my_arr.length){
  		return true; //array contains empty strings
  	}else{
  		return false;
  	}
}

function addToken(myWindow, isJwtToken, jwt_token){
	if(isJwtToken){
		var elem = document.createElement('div');
		elem.setAttribute("hidden", true);
		elem.id = "jwtToken";
		elem.innerHTML = jwt_token;
		var getFrame = myWindow.document.getElementById("lcMobileiframeContainer");
		getFrame.append(elem);
	}
};

function agentOnline(workgroupJID, callback, deptList) {
	agentOnlineStatus = false;
	xhr = new XMLHttpRequest();
	xhr.open('POST', '/Crosstalk/AgentOnlineStatus');
	xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onload = function() {
		if (xhr.status === 200) {
			var userInfo = JSON.parse(xhr.responseText);
			agentOnlineStatus= userInfo.online;
			callback(agentOnlineStatus);
		}
		else if (xhr.status !== 200) {
			agentOnlineStatus = false;
			callback(agentOnlineStatus);
		}
	};
	
	if(!deptList || deptList === "" || (deptList !== undefined && deptList !== "" && deptList.length == 0) || (checkArrayIfEmpty(deptList))){
		xhr.send(encodeURI('workgroupJID=' + workgroupJID));
	}else{
		xhr.send(encodeURI('workgroupJID=' + workgroupJID + '&deptList=' + deptList));
	}
};

function test(agentOnlineStatus) {
	alert('agent online status : '+agentOnlineStatus);
};

var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

// Listen to message from iframe
eventer(messageEvent,function(e) {
  if(e.data == "remove"){
	  var frame = document.getElementById("livechat_helpdesk");
	  if(frame != null)
	  frame.parentNode.removeChild(frame);
	  if(typeof chatWindowEventCallback != "undefined" && typeof chatWindowEventCallback == "function")
		  chatWindowEventCallback('close');
  } else if(e.data == "removeNewUI"){
	  var frame = document.getElementById("livechat_helpdesk");
	  if(frame != null)
	  frame.parentNode.removeChild(frame);
	  if(typeof chatWindowEventCallback != "undefined" && typeof chatWindowEventCallback == "function")
		  chatWindowEventCallback('close');
  } else if(e.data == "Minimize"){
	  var frame = document.getElementById("livechat_helpdesk");
	  if(frame != null){
		  frame.style.width = "267px";
		  frame.style.height = "33px";  
	  }
	  if(typeof chatWindowEventCallback != "undefined" && typeof chatWindowEventCallback == "function")
		  chatWindowEventCallback('minimize');
  } else if(e.data == "MinimizeNewUIWithBar"){
      var frame = document.getElementById("livechat_helpdesk");
      if(frame != null){
          if(isMobileDevice()){
              frame.style.width = "100%";
          }else{
              frame.style.width = "400px"; 
              frame.style.boxShadow = "none";
          }
          frame.style.height = "90px";  
      }
      if(typeof chatWindowEventCallback != "undefined" && typeof chatWindowEventCallback == "function")
          chatWindowEventCallback('minimize');
  } else if(e.data == "MinimizeNewUIWithBubble"){
      var frame = document.getElementById("livechat_helpdesk");
      if(frame != null){
          if(isMobileDevice()){
              frame.style.width = "100px";
          }else{
              frame.style.width = "150px"; 
              frame.style.boxShadow = "none";
          }
          frame.style.height = "90px";  
      }
      if(typeof chatWindowEventCallback != "undefined" && typeof chatWindowEventCallback == "function")
          chatWindowEventCallback('minimize');
  } else if(e.data == "MinimizeNewUI"){
	  var frame = document.getElementById("livechat_helpdesk");
	  if(frame != null){
		  if(isMobileDevice()){
			  frame.style.width = "100px";
		  }else{
			  frame.style.width = "150px"; 
			  frame.style.boxShadow = "none";
		  }
		  frame.style.height = "90px";  
	  }
	  if(typeof chatWindowEventCallback != "undefined" && typeof chatWindowEventCallback == "function")
		  chatWindowEventCallback('minimize');
  } else if(e.data == "Maximize"){
	  var frame = document.getElementById("livechat_helpdesk");
	  if(frame != null){
		  frame.style.width = "445px";
		  frame.style.height = "452px";		  
	  }
	  if(typeof chatWindowEventCallback != "undefined" && typeof chatWindowEventCallback == "function")
		  chatWindowEventCallback('maximize');
  } else if(e.data == "MaximizeNewUI"){
	  var frame = document.getElementById("livechat_helpdesk");
	  if(frame != null){
		  if(isMobileDevice()){
			  frame.style.width = "100%";
			  frame.style.height = "100%";
		  }else{
			  frame.style.width = lcIfrmWidth;
			  frame.style.height = lcIfrmHeight;
			  frame.style.boxShadow = "0px 4px 12px rgba(0, 0, 0, .4)";
		  }
	  }
	  if(typeof chatWindowEventCallback != "undefined" && typeof chatWindowEventCallback == "function")
		  chatWindowEventCallback('maximize');
  } else if(e.data == "initialization"){
	  if(typeof chatWindowEventCallback != "undefined" && typeof chatWindowEventCallback == "function")
		  chatWindowEventCallback('initialization');
  } else if(e.data == "initializationNewUI"){
	  if(typeof chatWindowEventCallback != "undefined" && typeof chatWindowEventCallback == "function")
		  chatWindowEventCallback('initialization');
  } else if(e.data == "jwttoken"){
	  var frame = document.getElementById("livechat_helpdesk");
	  if(frame != null){
		    var msg = frame.contentDocument.getElementById("jwtToken");
		    if(jwtTokenString !== undefined){
		    	msg.innerHTML = jwtTokenString;
		    }
	  }
  } else if(e.data == "jwttokenNewUI"){
	  var frame = document.getElementById("livechat_helpdesk");
	  if(frame != null){
		    var msg = frame.contentDocument.getElementById("jwtToken");
		    var clientdata = frame.contentDocument.getElementById("clientInfo")
		    if(jwtTokenString !== undefined){
		    	msg.innerHTML = jwtTokenString;
		    }
		    if(clientInfoData !== undefined){
		    	clientdata.innerHTML =  JSON.stringify(clientInfoData);
		    }
	  	}
  }else if(e.data == "chat_started"){
	  if(typeof chatWindowEventCallback != "undefined" && typeof chatWindowEventCallback == "function")
		  chatWindowEventCallback('chat_started');
  } else if(e.data == "chat_ended"){
	  if(typeof chatWindowEventCallback != "undefined" && typeof chatWindowEventCallback == "function")
		  chatWindowEventCallback('chat_ended');
  } else if(e.data == "new_message"){
	  if(typeof chatWindowEventCallback != "undefined" && typeof chatWindowEventCallback == "function")
		  chatWindowEventCallback('new_message');
  }
},false);