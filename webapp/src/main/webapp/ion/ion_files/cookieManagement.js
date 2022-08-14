var gOrgId;
var gAppId;
var gLangId;
var categoryCount;
var gcallback;
var gSourceOrgId;
var gapplArr;
var gUserPrefLangID;
var propertiesFileName;
var cookieDetailsList;
var cookiePolicyList;
var isLinkPolicy;
var appVersion="03.01.00.03";
function showCookieNotice(orgId,appId,langId,callback,sourceOrgId,applArr)
{
	if(applArr==""){
		applArr = new Array();
	}
	gUserPrefLangID=langId;
	gAppId=appId;
	gOrgId=orgId;
	gLangId=langId;	
	gcallback=callback;
	gSourceOrgId=sourceOrgId;
	gapplArr=applArr;
	var cookieConsentDetailsArr =new Array();
	cookieConsentDetailsArr = getCookieConsentDetails(appId,sourceOrgId,applArr);
	for(var i=0; i<cookieConsentDetailsArr.length;i++)
	{
		var cookieObj = cookieConsentDetailsArr[i];
		var categoryName = cookieObj.categoryName;
		var consentGiven = cookieObj.consentGiven;

		if(categoryName=="Over All Consent" && consentGiven=="false")
		{
			if(langId==null || langId==undefined || langId=="")
			{
				langId = "1";
			}
			jQuery("<link/>", {rel: "stylesheet",type: "text/css",href: "/ConsentManagement/css/tablesaw.css?"+appVersion}).appendTo("head");
			jQuery("<link/>", {rel: "stylesheet",type: "text/css",href: "/ConsentManagement/css/cookieManagement.css?"+appVersion}).appendTo("head");

			/** Loading js in parallel */
			jQuery.when(
					jQuery.get('/iONjsLib/js/jquery.blockUI.js'),
					jQuery.get('/ConsentManagement/js/CMAjaxInteraction.js?'+appVersion),
					jQuery.get('/ConsentManagement/js/tablesaw.js?'+appVersion),
					jQuery.get('/ConsentManagement/js/jquery.slimscroll.js?'+appVersion),						
					jQuery.get('/ConsentManagement/js/multiLanguageSupport.js?'+appVersion),
					jQuery.get('/bin/pub/ConsentManagement/CookieManagement/'+appId+'_cookieDetails.js?'+appVersion)
			).done(function(succesResponse){
				formCookieTextDiv(orgId,appId,langId,callback,sourceOrgId,applArr);
			}).fail(function(failedResponse){});				
		}
		else if(categoryName=="Over All Consent" && consentGiven=="true")
		{			
			if(typeof callback == "function")
			{
				callback(cookieConsentDetailsArr);
			}
			jQuery("#cookiesModal_CM").remove();
		}
	}	
	if(cookieConsentDetailsArr.length==0)
	{
		if(langId==null || langId==undefined || langId=="")
		{
			langId = "1";
		}		
		jQuery("<link/>", {rel: "stylesheet",type: "text/css",href: "/ConsentManagement/css/tablesaw.css?"+appVersion}).appendTo("head");
		jQuery("<link/>", {rel: "stylesheet",type: "text/css",href: "/ConsentManagement/css/cookieManagement.css?"+appVersion}).appendTo("head");		

		jQuery.when(
				jQuery.get('/iONjsLib/js/jquery.blockUI.js'),
				jQuery.get('/ConsentManagement/js/CMAjaxInteraction.js?'+appVersion),
				jQuery.get('/ConsentManagement/js/tablesaw.js?'+appVersion),
				jQuery.get('/ConsentManagement/js/jquery.slimscroll.js?'+appVersion),						
				jQuery.get('/ConsentManagement/js/multiLanguageSupport.js?'+appVersion),
				jQuery.get('/bin/pub/ConsentManagement/CookieManagement/'+appId+'_cookieDetails.js?'+appVersion)
		).done(function(succesResponse){
			formCookieTextDiv(orgId,appId,langId,callback,sourceOrgId,applArr);
		}).fail(function(failedResponse){});		
	}
} 


function formCookieTextDiv(orgId,appId,langId,callback,sourceOrgId,applArr)
{	
	var responseText=extractCookieJsonContent(orgId,appId,langId,applArr);
	if(responseText!="ERROR"){
		var resultArr=responseText;
		var cookieNoticesDetailsList=resultArr.cookieNoticesDetails;
		var cookieCategoryDetailsList=resultArr.cookieCategoryDetails;
		categoryCount=resultArr.categoryCount;
		var langDir=resultArr.languageDirection;
		propertiesFileName=resultArr.CM_propertiesFileBasepath;

		var cookieNoticesDetailsObj =cookieNoticesDetailsList[langId];
		var policyType = cookieNoticesDetailsObj.policyType;
		var cookieText=cookieNoticesDetailsObj.policyText;
		if(policyType==3)
		{
			policyTypeText="Cookie Notice";
		}		
		jQuery('body').css("overflow","hidden");
		var cookieDiv = "";	
		cookieDiv+= "<div class=\"modal-content\">";
		cookieDiv+=	"<div class=\"sceneOne\">";
		cookieDiv+=	"<div class=\"cookieHead\">";
		cookieDiv+=	"<h2 class=\"mlLabel\" labelpropertyid=\"CM_SL_Cookie_Notice\">"+policyTypeText+"</h2>";
		cookieDiv+=	"<button class=\"customizeCookie\"><span class=\"mlButton\" labelpropertyid=\"CM_SB_Customize_Cookies\">Customize Cookies</span></button>";
		cookieDiv+=	"<div class=\"clearfix\"></div>";		
		cookieDiv+=	"</div>";
		cookieDiv+= "<div class=\"cookieBody\">";
		cookieDiv+=	"<p>"+cookieText+"</p>";
		cookieDiv+=	"</div>";		
		cookieDiv+= "<div class=\"cookieFooter\">";
		cookieDiv+= "<button class=\"declineBtn\" onclick=\"declineCookiesBtn()\"><span class=\"declineIco\"></span><span class=\"mlButton\" labelpropertyid=\"CM_SB_Decline_Optional_Cookies\">Decline Optional Cookies</span></button>";
		cookieDiv+= "<button class=\"acceptBtn\" onclick=\"acceptBtn()\"><span class=\"tickIco\"></span><span class=\"mlButton\" labelpropertyid=\"CM_SB_Accept_all_Cookies\">Accept All Cookies</span></button>";
		cookieDiv+= "</div>";		
		cookieDiv+=	"</div>";
		cookieDiv+=	"<div class=\"sceneTwo\">";
		cookieDiv+=	"<div class=\"banner\">";
		cookieDiv+=	"<img src=\"/ConsentManagement/images/Top-banner.png\" class=\"desktopBanner\" alt=\"Banner Image\" />";
		cookieDiv+=	"<img src=\"/ConsentManagement/images/Ipad.png\" class=\"tabBanner\" alt=\"Banner Image\" />";
		cookieDiv+=	"<img src=\"/ConsentManagement/images/Top-banner_mobile.png\" class=\"mobBanner\" alt=\"Banner Image\" />";
		cookieDiv+=	"<div class=\"bannerHead\">";
		cookieDiv+=	"<span class=\"cpcIco\"></span>";
		cookieDiv+=	"<h2 class=\"mlLabel\" labelpropertyid=\"CM_SL_Cookies_Preference_Center\">Cookies Preference Center</h2>";
		cookieDiv+=	"</div>";
		cookieDiv+=	"</div>";
		cookieDiv+=	"<div class=\"sceneBody\">";
		cookieDiv+=	"<section id=\"vertical_tab_nav\">";
		var tabDiv= "<ul class=\"tabs_CM\">";
		var tabContainerDiv= "<div class=\"tab_container\">";
		var cookieCategoryDetailsArr = new Array();
		for(var key in cookieCategoryDetailsList){			
			var CategoryDetailsArr=	cookieCategoryDetailsList[key];
			cookieCategoryDetailsArr.push(CategoryDetailsArr);
		}
		cookieCategoryDetailsArr=cookieCategoryDetailsArr.reverse();

		jQuery(cookieCategoryDetailsArr).each(function(i)
				{
			var cookieDescription=cookieCategoryDetailsArr[i].Purpose;
			var cookiesList=cookieCategoryDetailsArr[i].Cookies;

			var cookieCategory="";
			var cookieCategoryName;
			var consentFlag=false;
			var masterIdArray = new Array();
			var descriptionArray = new Array();
			var categoryType;
			var consentRequired=1;
			var labelpropertyid="";
			jQuery(cookieDescription).each(function(i){
				langId=gLangId;
				cookieCategory=cookieDescription[i].cookiecategory;
				categoryType= cookieDescription[i].categorytype;
				consentRequired= cookieDescription[i].consentRequired;
				labelpropertyid= cookieDescription[i].labelpropertyid;
				if(consentRequired==1)
				{
					consentFlag=true;
				}
				if(categoryType==1)
				{
					cookieCategory="Strictly Necessary Cookies";
					cookieCategoryName="ifc";
				}
				else if(categoryType==2)
				{
					cookieCategoryName="iac";
				}
				else if(categoryType==3)
				{
					cookieCategoryName="imac";
				}
				if(cookieDescription[i][langId]== undefined)/** If the given language is not there*/
				{
					langId=1;
				}
				var metadatadetailsObj= cookieDescription[i][langId];
				var description=metadatadetailsObj.description;
				var masterId=metadatadetailsObj.masterId;

				if(masterIdArray.indexOf(masterId) == -1)
				{
					masterIdArray.push(masterId);
					descriptionArray.push(description);
				}
			});
			tabDiv+= "<li><a rel=\"tab"+categoryType+"\" href=\"javascript:void(0)\" class=\"mlLabel\" labelpropertyid="+labelpropertyid+">"+cookieCategory+"</a></li>";
			tabContainerDiv+= "<h3 class=\"tab_drawer_heading\" rel=\"tab"+categoryType+"\"><span class=\"mlLabel\" labelpropertyid="+labelpropertyid+">"+cookieCategory+"</span></h3>";
			
			if(categoryType==1 || consentRequired==0)/** Strictly Necessary Cookie */
			{
				if(gapplArr=="" || gapplArr== undefined)	
				{
					tabContainerDiv+= "<article id=\"tab"+categoryType+"\" value=\""+cookieCategoryName+"@#@"+gOrgId+"_"+gAppId+"\">";
					tabContainerDiv+= "<h2><span class=\"mobHid mlLabel\" labelpropertyid="+labelpropertyid+" >"+cookieCategory+"</span>";
					tabContainerDiv+= "<span class=\"categoryStatus alwaysAct mlLabel\" labelpropertyid=\"CM_SL_Always_Active\" id=\"cookiecategory_"+categoryType+"\" value=\""+cookieCategoryName+"@#@"+gOrgId+"_"+gAppId+"\">Always Active</span>";
				}
				else
				{
					var attrvalue;
					for(var j=0;j<gapplArr.length;j++)
					{
						attrvalue = gapplArr[j].attrValue;					
					}
					tabContainerDiv+= "<article id=\"tab"+categoryType+"\" value=\""+cookieCategoryName+"@#@"+gOrgId+"_"+gAppId+"@@"+attrvalue+"\">";
					tabContainerDiv+= "<h2><span class=\"mobHid mlLabel\" labelpropertyid="+labelpropertyid+">"+cookieCategory+"</span>";
					tabContainerDiv+= "<span class=\"categoryStatus alwaysAct mlLabel\" labelpropertyid=\"CM_SL_Always_Active\" id=\"cookiecategory_"+categoryType+"\" value=\""+cookieCategoryName+"@#@"+gOrgId+"_"+gAppId+"@@"+attrvalue+"\">Always Active</span>";
				}
			}
			else
			{
				if(gapplArr=="" || gapplArr== undefined)	
				{
					tabContainerDiv+= "<article id=\"tab"+categoryType+"\" value=\""+cookieCategoryName+"@#@"+gOrgId+"_"+gAppId+"\">";
					tabContainerDiv+= "<h2><span class=\"mobHid mlLabel\" labelpropertyid="+labelpropertyid+">"+cookieCategory+"</span>";
					tabContainerDiv+= "<span class=\"toggleSwitchContainer tickBehave\">";
					tabContainerDiv+= "<span class=\"categoryStatus conditionTxt inactive mlLabel\" labelpropertyid=\"CM_SL_Inactive\" id=\"cookiecategory_"+categoryType+"\" value="+cookieCategoryName+"@#@"+gOrgId+"_"+gAppId+">Inactive</span>";
					tabContainerDiv+= "<label class=\"switch\"><input type=\"checkbox\" value="+cookieCategoryName+"@#@"+gOrgId+"_"+gAppId+" checked /><span class=\"slider_CM round\"></span></label></span>"
				}
				else
				{
					var attrvalue;
					for(var j=0;j<gapplArr.length;j++)
					{
						attrvalue = gapplArr[j].attrValue;					
					}
					tabContainerDiv+= "<article id=\"tab"+categoryType+"\" value=\""+cookieCategoryName+"@#@"+gOrgId+"_"+gAppId+"@@"+attrvalue+"\">";
					tabContainerDiv+= "<h2><span class=\"mobHid mlLabel\" labelpropertyid="+labelpropertyid+">"+cookieCategory+"</span>";
					tabContainerDiv+= "<span class=\"toggleSwitchContainer tickBehave\">";
					tabContainerDiv+= "<span class=\"categoryStatus conditionTxt inactive mlLabel\" labelpropertyid=\"CM_SL_Inactive\" id=\"cookiecategory_"+categoryType+"\" value="+cookieCategoryName+"@#@"+gOrgId+"_"+gAppId+"@@"+attrvalue+">Inactive</span>";
					tabContainerDiv+= "<label class=\"switch\"><input type=\"checkbox\" value="+cookieCategoryName+"@#@"+gOrgId+"_"+gAppId+"@@"+attrvalue+" checked /><span class=\"slider_CM round\"></span></label></span>";
				}
			}
			tabContainerDiv+= "<div class=\"clearfix\"></div></h2><div class=\"scrollableContent\">";

			/** Adding Purpose description in Container*/

			jQuery(descriptionArray).each(function(i)
					{
				tabContainerDiv+= "<p>"+descriptionArray[i]+"</p>";
					});
			tabContainerDiv+= "<a href=\"javascript:void(0);\" class=\"cookieDetails mlLabel\" labelpropertyid=\"CM_SL_Cookies_Details\">Cookies Details</a>";
			tabContainerDiv+= "<div class=\"accordion_container\">";

			/** Pushing each cookie into container*/
			langId=gLangId;
			jQuery(cookiesList).each(function(i)
					{
				langId=gLangId;
				if(cookiesList[i][langId]===undefined)/** If the given language is not there*/
				{
					langId=1;
				}
				var cookieName=cookiesList[i][langId].name;
				var cookieDescription=cookiesList[i][langId].description;
				var cookieDuration=cookiesList[i][langId].cookieretentiontime;
				var cookieCategoryType=cookiesList[i][langId].cookieType;
				var cookieType="";
				if(cookieCategoryType=="CM_SL_First_Party")
				{
					cookieType="First Party";				    
				}
				if(cookieCategoryType=="CM_SL_Third_Party")
				{
					cookieType="Third Party";					
				}

				if(categoryType==1 || consentRequired==0)/** Strict Cookies - Active and disabled all buttons or Consent Not Required*/
				{
					tabContainerDiv+= "<div class=\"accordion_head\">"+cookieName;
					tabContainerDiv+= "<span class=\"plusminus\">+</span>";
					tabContainerDiv+= "<span class=\"toggleSwitchContainer2\">";

					if(gapplArr=="" || gapplArr== undefined)	
					{
						tabContainerDiv+= "<span class=\"cookieStatus conditionTxt active mlLabel\" labelpropertyid=\"CM_SL_Active\" value=\""+cookieName+"@#@"+gOrgId+"_"+gAppId+"\" >Active</span>";
						tabContainerDiv+= "<label class=\"switch\"><input type=\"checkbox\" value=\""+cookieName+"@#@"+gOrgId+"_"+gAppId+"\" disabled /><span class=\"slider_CM round\">";
					}
					else
					{
						var attrvalue;
						for(var j=0;j<gapplArr.length;j++)
						{
							attrvalue = gapplArr[j].attrValue;					
						}
						tabContainerDiv+= "<span class=\"cookieStatus conditionTxt active mlLabel\" labelpropertyid=\"CM_SL_Active\" value=\""+cookieName+"@#@"+gOrgId+"_"+gAppId+"@@"+attrvalue+"\" >Active</span>";
						tabContainerDiv+= "<label class=\"switch\"><input type=\"checkbox\" value=\""+cookieName+"@#@"+gOrgId+"_"+gAppId+"@@"+attrvalue+"\" disabled /><span class=\"slider_CM round\">";
					}
					tabContainerDiv+= "</span></label></span></div>";
					tabContainerDiv+= "<div class=\"accordion_body\" style=\"display:none\">";
					tabContainerDiv+= "<table class=\"tablesaw tablesaw-stack striped\">";
					tabContainerDiv+= "<thead><tr>";
					tabContainerDiv+= "<th scope=\"col\" data-tablesaw-sortable-col=\"\" class=\"mlTableHead\" labelpropertyid=\"CM_SL_Name\">Name</th>";
					tabContainerDiv+= "<th scope=\"col\" data-tablesaw-sortable-col=\"\" class=\"mlTableHead\" labelpropertyid=\"CM_SL_Description\">Description</th>";
					tabContainerDiv+= "<th scope=\"col\" data-tablesaw-sortable-col=\"\" class=\"mlTableHead\" labelpropertyid=\"CM_SL_Duration\">Duration</th>";
					tabContainerDiv+= "<th scope=\"col\" data-tablesaw-sortable-col=\"\" class=\"mlTableHead\" labelpropertyid=\"CM_SL_Type\">Type</th>";
					tabContainerDiv+= "</tr></thead>";
					tabContainerDiv+= "<tbody><tr>";
					tabContainerDiv+= "<td><b class=\"tablesaw-cell-label mlTableHead\" labelpropertyid=\"CM_SL_Name\">Name</b><span class=\"tablesaw-cell-content\">"+cookieName+"</span></td>";
					tabContainerDiv+= "<td><b class=\"tablesaw-cell-label mlTableHead\" labelpropertyid=\"CM_SL_Description\">Description</b><span class=\"tablesaw-cell-content\">"+cookieDescription+"</span></td>";
					tabContainerDiv+= "<td><b class=\"tablesaw-cell-label mlTableHead\" labelpropertyid=\"CM_SL_Duration\">Duration</b><span class=\"tablesaw-cell-content\">"+cookieDuration+"</span></td>";
					tabContainerDiv+= "<td><b class=\"tablesaw-cell-label mlTableHead\" labelpropertyid=\"CM_SL_Type\">Type</b><span class=\"tablesaw-cell-content mlLabel\" labelpropertyid="+cookieCategoryType+">"+cookieType+"</span></td>";
					tabContainerDiv+= "</tr></tbody></table>";
					tabContainerDiv+= "</div>";
				}
				else
				{
					tabContainerDiv+= "<div class=\"accordion_head\">"+cookieName;
					tabContainerDiv+= "<span class=\"plusminus\">+</span>";
					tabContainerDiv+= "<span class=\"toggleSwitchContainer2\">";
					if(gapplArr=="" || gapplArr== undefined)	
					{
						tabContainerDiv+= "<span class=\"cookieStatus conditionTxt inactive mlLabel\" labelpropertyid=\"CM_SL_Inactive\" value=\""+cookieName+"@#@"+gOrgId+"_"+gAppId+"\" >Inactive</span>";
						tabContainerDiv+= "<label class=\"switch\"><input type=\"checkbox\" value=\""+cookieName+"@#@"+gOrgId+"_"+gAppId+"\" checked /><span class=\"slider_CM round\">";
					}
					else
					{
						var attrvalue;
						for(var j=0;j<gapplArr.length;j++)
						{
							attrvalue = gapplArr[j].attrValue;					
						}
						tabContainerDiv+= "<span class=\"cookieStatus conditionTxt inactive mlLabel\" labelpropertyid=\"CM_SL_Inactive\" value=\""+cookieName+"@#@"+gOrgId+"_"+gAppId+"@@"+attrvalue+"\" >Inactive</span>";
						tabContainerDiv+= "<label class=\"switch\"><input type=\"checkbox\" value=\""+cookieName+"@#@"+gOrgId+"_"+gAppId+"@@"+attrvalue+"\" checked /><span class=\"slider_CM round\">";
					}
					tabContainerDiv+= "</span></label></span></div>";
					tabContainerDiv+= "<div class=\"accordion_body\" style=\"display:none\">";
					tabContainerDiv+= "<table class=\"tablesaw tablesaw-stack striped\">";
					tabContainerDiv+= "<thead><tr>";
					tabContainerDiv+= "<th scope=\"col\" data-tablesaw-sortable-col=\"\" class=\"mlTableHead\" labelpropertyid=\"CM_SL_Name\">Name</th>";
					tabContainerDiv+= "<th scope=\"col\" data-tablesaw-sortable-col=\"\" class=\"mlTableHead\" labelpropertyid=\"CM_SL_Description\">Description</th>";
					tabContainerDiv+= "<th scope=\"col\" data-tablesaw-sortable-col=\"\" class=\"mlTableHead\" labelpropertyid=\"CM_SL_Duration\">Duration</th>";
					tabContainerDiv+= "<th scope=\"col\" data-tablesaw-sortable-col=\"\" class=\"mlTableHead\" labelpropertyid=\"CM_SL_Type\">Type</th>";
					tabContainerDiv+= "</tr></thead>";
					tabContainerDiv+= "<tbody><tr>";
					tabContainerDiv+= "<td><b class=\"tablesaw-cell-label mlTableHead\" labelpropertyid=\"CM_SL_Name\">Name</b><span class=\"tablesaw-cell-content\">"+cookieName+"</span></td>";
					tabContainerDiv+= "<td><b class=\"tablesaw-cell-label mlTableHead\" labelpropertyid=\"CM_SL_Description\">Description</b><span class=\"tablesaw-cell-content\">"+cookieDescription+"</span></td>";
					tabContainerDiv+= "<td><b class=\"tablesaw-cell-label mlTableHead\" labelpropertyid=\"CM_SL_Duration\">Duration</b><span class=\"tablesaw-cell-content\">"+cookieDuration+"</span></td>";
					tabContainerDiv+= "<td><b class=\"tablesaw-cell-label mlTableHead\" labelpropertyid=\"CM_SL_Type\">Type</b><span class=\"tablesaw-cell-content mlLabel\" labelpropertyid="+cookieCategoryType+">"+cookieType+"</span></td>";
					tabContainerDiv+= "</tr></tbody></table>";
					tabContainerDiv+= "</div>";
				}
					});
			tabContainerDiv+= "</article>";
				});

		tabDiv+= "</ul>";
		tabContainerDiv+= "</div>";
		cookieDiv+= tabDiv;
		cookieDiv+= tabContainerDiv;
		cookieDiv+= "</section></div>";

		cookieDiv+= "<div class=\"cookieFooter\">";
		cookieDiv+= "<button class=\"confirmBtn\" onclick=\"confirmBtn()\"><span class=\"mlButton\" labelpropertyid=\"CM_SB_Confirm_My_Choices\">Confirm My Choices</span></button>";
		cookieDiv+= "<button class=\"acceptBtn\" onclick=\"acceptBtn()\"><span class=\"mlButton\" labelpropertyid=\"CM_SB_Allow_All\">Allow All</span></button>";

		cookieDiv+=	"</div>";		
		cookieDiv+=	"</div>";
		cookieDiv+=	"</div>";
		if(langDir=="RTL")
		{
			jQuery('body').append(" <div id=\"cookieModal_CM\" dir=\"RTL\" class=\"modal cookieModal\"></div>");
		}
		else
		{
			jQuery('body').append(" <div id=\"cookieModal_CM\" class=\"modal cookieModal\"></div>");
		}
		jQuery("#cookieModal_CM").append(cookieDiv);
		cookieSettings();
		getPropertiesLabelJSON();
		changeLabelTexts();		
	}
}

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/**-------- Customize Cookie ------------------*/

function showCustomizeCookieNotice(orgId,appId,langId,callback,sourceOrgId,applArr)
{
	if(applArr==""){
		applArr = new Array();
	}
	
	if(langId==null || langId==undefined || langId=="")
	{
		langId = "1";
	}
	gUserPrefLangID=langId;	
	jQuery("<link/>", {rel: "stylesheet",type: "text/css",href: "/ConsentManagement/css/tablesaw.css?"+appVersion}).appendTo("head");
	jQuery("<link/>", {rel: "stylesheet",type: "text/css",href: "/ConsentManagement/css/cookieManagement.css?"+appVersion}).appendTo("head");
			
	jQuery.when(
		jQuery.get('/iONjsLib/js/jquery.blockUI.js'),
		jQuery.get('/ConsentManagement/js/CMAjaxInteraction.js?'+appVersion),
		jQuery.get('/ConsentManagement/js/tablesaw.js?'+appVersion),
		jQuery.get('/ConsentManagement/js/jquery.slimscroll.js?'+appVersion),						
		jQuery.get('/ConsentManagement/js/multiLanguageSupport.js?'+appVersion),
		jQuery.get('/bin/pub/ConsentManagement/CookieManagement/'+appId+'_cookieDetails.js?'+appVersion)
	).done(function(succesResponse){
		formCustomizeCookieTextDiv(orgId,appId,langId,callback,sourceOrgId,applArr);
	}).fail(function(failedResponse){});
	
}

function formCustomizeCookieTextDiv(orgId,appId,langId,callback,sourceOrgId,applArr)
{
	gAppId=appId;
	gOrgId=orgId;
	gLangId=langId;	
	gcallback=callback;
	gSourceOrgId=sourceOrgId;
	gapplArr=applArr;

	var responseText=extractCookieJsonContent(orgId,appId,langId,applArr); 
	if(responseText!="ERROR"){
		var resultArr=responseText;
		var cookieCategoryDetailsList=resultArr.cookieCategoryDetails;
		categoryCount=resultArr.categoryCount;
		propertiesFileName=resultArr.CM_propertiesFileBasepath;
		var langDir=resultArr.languageDirection;
		var cookieCategoryDetailsArray= new Array();
		for(var key in cookieCategoryDetailsList)
		{
			var CategoryDetail = cookieCategoryDetailsList[key];
			cookieCategoryDetailsArray.push(CategoryDetail);
		}
		cookieCategoryDetailsArray = cookieCategoryDetailsArray.reverse();
		
		var customizeCookieDiv = "";	
		if(langDir=="RTL")
		{
			customizeCookieDiv+= "<div id=\"cookieModal_CM\" dir=\"RTL\" class=\"modal cookieModal\">";
		}
		else
		{
			customizeCookieDiv+= "<div id=\"cookieModal_CM\" class=\"modal cookieModal\">";
		}
		
		customizeCookieDiv+= "<div class=\"modal-content\">";
		customizeCookieDiv+= "<div class=\"sceneTwo\">";
		customizeCookieDiv+= "<div class=\"banner\">";
		customizeCookieDiv+= "<img src=\"/ConsentManagement/images/Top-banner.png\" class=\"desktopBanner\" alt=\"Banner Image\" />";
		customizeCookieDiv+= "<img src=\"/ConsentManagement/images/Ipad.png\" class=\"tabBanner\" alt=\"Banner Image\" />";
		customizeCookieDiv+= "<img src=\"/ConsentManagement/images/Top-banner_mobile.png\" class=\"mobBanner\" alt=\"Banner Image\" />";
		customizeCookieDiv+= "<div class=\"bannerHead\">";
		customizeCookieDiv+= "<span class=\"cpcIco\"></span>";
		customizeCookieDiv+= "<h2 class=\"mlLabel\" labelpropertyid=\"CM_SL_Cookies_Preference_Center\">Cookies Preference Center</h2>";
		customizeCookieDiv+= "</div></div>";
		customizeCookieDiv+= "<div class=\"sceneBody\">";
		customizeCookieDiv+= "<section id=\"vertical_tab_nav\">";
		var tabs= "<ul class=\"tabs_CM\">";
		var tabContainer="<div class=\"tab_container\">";
		
		/** For Vertical Tab nav bar - Extracting cateogry name */
		jQuery(cookieCategoryDetailsArray).each(function(i)
		{
			var cookieDescription=cookieCategoryDetailsArray[i].Purpose;
			var cookiesList=cookieCategoryDetailsArray[i].Cookies;
			
			var cookieCategory="";
			var cookieCategoryName;
			var consentFlag=false;
			var masterIdArray = new Array();
			var descriptionArray = new Array();
			var categoryType;
			var consentRequired=1;
			var labelpropertyid="";
			jQuery(cookieDescription).each(function(i){
			   langId=gLangId;
			   cookieCategory=cookieDescription[i].cookiecategory;
			   categoryType= cookieDescription[i].categorytype;
			   consentRequired= cookieDescription[i].consentRequired;
			   labelpropertyid= cookieDescription[i].labelpropertyid;
			   if(consentRequired==1)
			   {
				   consentFlag=true;
			   }
			   if(categoryType==1)
			   {
				   	cookieCategory="Strictly Necessary Cookies";
				   	cookieCategoryName="ifc";
			   }
			   else if(categoryType==2)
			   {
				   cookieCategoryName="iac";
			   }
			   else if(categoryType==3)
			   {
				   cookieCategoryName="imac";
			   }
			   if(cookieDescription[i][langId]== undefined)/** If the given language is not there*/
			   {
					langId=1;
			   }
			   var metadatadetailsObj= cookieDescription[i][langId];
			   var description=metadatadetailsObj.description;
			   var masterId=metadatadetailsObj.masterId;
			   
			   if(masterIdArray.indexOf(masterId) == -1)
			   {
				   masterIdArray.push(masterId);
				   descriptionArray.push(description);
			   }
			   
			});
			tabs+= "<li><a rel=\"tab"+categoryType+"\" href=\"javascript:void(0)\" class=\"mlLabel\" labelpropertyid="+labelpropertyid+">"+cookieCategory+"</a></li>";
			tabContainer+= "<h3 class=\"tab_drawer_heading\" rel=\"tab"+categoryType+"\" <span class=\"mlLabel\" labelpropertyid="+labelpropertyid+">"+cookieCategory+"</span></h3>";
			
			if(categoryType==1 || consentRequired==0)/** Strictly Necessary Cookie */
			{
				
				if(gapplArr=="" || gapplArr== undefined)	
				{
					tabContainer+= "<article id=\"tab"+categoryType+"\" value=\""+cookieCategoryName+"@#@"+gOrgId+"_"+gAppId+"\">";
					tabContainer+= "<h2><span class=\"mobHid mlLabel\" labelpropertyid="+labelpropertyid+">"+cookieCategory+"</span>";
					tabContainer+= "<span class=\"categoryStatus alwaysAct mlLabel\" labelpropertyid=\"CM_SL_Always_Active\" id=\"cookiecategory_"+categoryType+"\" value=\""+cookieCategoryName+"@#@"+gOrgId+"_"+gAppId+"\">Always Active</span>";
				}
				else
				{
					var attrvalue;
					for(var j=0;j<gapplArr.length;j++)
					{
						attrvalue = gapplArr[j].attrValue;					
					}
					tabContainer+= "<article id=\"tab"+categoryType+"\" value=\""+cookieCategoryName+"@#@"+gOrgId+"_"+gAppId+"@@"+attrvalue+"\">";
					tabContainer+= "<h2><span class=\"mobHid mlLabel\" labelpropertyid="+labelpropertyid+">"+cookieCategory+"</span>";
					tabContainer+= "<span class=\"categoryStatus alwaysAct mlLabel\" labelpropertyid=\"CM_SL_Always_Active\" id=\"cookiecategory_"+categoryType+"\" value=\""+cookieCategoryName+"@#@"+gOrgId+"_"+gAppId+"@@"+attrvalue+"\">Always Active</span>";
				}
				
			}
			else
			{
				if(gapplArr=="" || gapplArr== undefined)	
				{
					tabContainer+= "<article id=\"tab"+categoryType+"\" value=\""+cookieCategoryName+"@#@"+gOrgId+"_"+gAppId+"\">";
					tabContainer+= "<h2><span class=\"mobHid mlLabel\" labelpropertyid="+labelpropertyid+">"+cookieCategory+"</span>";
					tabContainer+= "<span class=\"toggleSwitchContainer tickBehave\">";
					tabContainer+= "<span class=\"categoryStatus conditionTxt inactive mlLabel\" labelpropertyid=\"CM_SL_Inactive\" id=\"cookiecategory_"+categoryType+"\" value="+cookieCategoryName+"@#@"+gOrgId+"_"+gAppId+">Inactive</span>";
					tabContainer+= "<label class=\"switch\"><input type=\"checkbox\" value="+cookieCategoryName+"@#@"+gOrgId+"_"+gAppId+" checked /><span class=\"slider_CM round\"></span></label></span>"
				}
				else
				{
					var attrvalue;
					for(var j=0;j<gapplArr.length;j++)
					{
						attrvalue = gapplArr[j].attrValue;					
					}
					tabContainer+= "<article id=\"tab"+categoryType+"\" value=\""+cookieCategoryName+"@#@"+gOrgId+"_"+gAppId+"@@"+attrvalue+"\">";
					tabContainer+= "<h2><span class=\"mobHid mlLabel\" labelpropertyid="+labelpropertyid+">"+cookieCategory+"</span>";
					tabContainer+= "<span class=\"toggleSwitchContainer tickBehave\">";
					tabContainer+= "<span class=\"categoryStatus conditionTxt inactive mlLabel\" labelpropertyid=\"CM_SL_Inactive\" id=\"cookiecategory_"+categoryType+"\" value="+cookieCategoryName+"@#@"+gOrgId+"_"+gAppId+"@@"+attrvalue+">Inactive</span>";
					tabContainer+= "<label class=\"switch\"><input type=\"checkbox\" value="+cookieCategoryName+"@#@"+gOrgId+"_"+gAppId+"@@"+attrvalue+" checked /><span class=\"slider_CM round\"></span></label></span>";
				}
			}
			
			tabContainer+= "<div class=\"clearfix\"></div></h2><div class=\"scrollableContent\">";
			
			/** Adding Purpose description in Container*/
			
			jQuery(descriptionArray).each(function(i)
			{
				tabContainer+= "<p>"+descriptionArray[i]+"</p>";
			});
			
			tabContainer+= "<a href=\"javascript:void(0);\" class=\"cookieDetails mlLabel\" labelpropertyid=\"CM_SL_Cookies_Details\">Cookies Details</a>";
			tabContainer+= "<div class=\"accordion_container\">";
			
			/** Pushing each cookie into container*/
			langId=gLangId;
			jQuery(cookiesList).each(function(i)
					{
						langId=gLangId;
						if(cookiesList[i][langId]===undefined)/** If the given language is not there*/
						{
							langId=1;
						}
						var cookieName=cookiesList[i][langId].name;
						var cookieDescription=cookiesList[i][langId].description;
						var cookieDuration=cookiesList[i][langId].cookieretentiontime;
						var cookieCategoryType=cookiesList[i][langId].cookieType;
						var cookieType="";
						if(cookieCategoryType=="CM_SL_First_Party")
						{
							cookieType="First Party";				    
						}
						if(cookieCategoryType=="CM_SL_Third_Party")
						{
							cookieType="Third Party";					
						}
						
						if(categoryType==1 || consentRequired==0)/** Strict Cookies - Active and disabled all buttons or Consent Not Required*/
						{
						tabContainer+= "<div class=\"accordion_head\">"+cookieName;
						tabContainer+= "<span class=\"plusminus\">+</span>";
						tabContainer+= "<span class=\"toggleSwitchContainer2\">";
						
						if(gapplArr=="" || gapplArr== undefined)	
						{
							tabContainer+= "<span class=\"cookieStatus conditionTxt active mlLabel\" labelpropertyid=\"CM_SL_Active\" value=\""+cookieName+"@#@"+gOrgId+"_"+gAppId+"\" >Active</span>";
							tabContainer+= "<label class=\"switch\"><input type=\"checkbox\" value=\""+cookieName+"@#@"+gOrgId+"_"+gAppId+"\" disabled /><span class=\"slider_CM round\">";
						}
						else
						{
							var attrvalue;
							for(var j=0;j<gapplArr.length;j++)
							{
								attrvalue = gapplArr[j].attrValue;					
							}
							tabContainer+= "<span class=\"cookieStatus conditionTxt active mlLabel\" labelpropertyid=\"CM_SL_Active\" value=\""+cookieName+"@#@"+gOrgId+"_"+gAppId+"@@"+attrvalue+"\" >Active</span>";
							tabContainer+= "<label class=\"switch\"><input type=\"checkbox\" value=\""+cookieName+"@#@"+gOrgId+"_"+gAppId+"@@"+attrvalue+"\" disabled /><span class=\"slider_CM round\">";
						}
						
						tabContainer+= "</span></label></span></div>";
						
						tabContainer+= "<div class=\"accordion_body\" style=\"display:none\">";
						tabContainer+= "<table class=\"tablesaw tablesaw-stack striped\">";
						
						tabContainer+= "<thead><tr>";
						tabContainer+= "<th scope=\"col\" data-tablesaw-sortable-col=\"\" class=\"mlTableHead\" labelpropertyid=\"CM_SL_Name\">Name</th>";
						tabContainer+= "<th scope=\"col\" data-tablesaw-sortable-col=\"\" class=\"mlTableHead\" labelpropertyid=\"CM_SL_Description\">Description</th>";
						tabContainer+= "<th scope=\"col\" data-tablesaw-sortable-col=\"\" class=\"mlTableHead\" labelpropertyid=\"CM_SL_Duration\">Duration</th>";
						tabContainer+= "<th scope=\"col\" data-tablesaw-sortable-col=\"\" class=\"mlTableHead\" labelpropertyid=\"CM_SL_Type\">Type</th>";
						tabContainer+= "</tr></thead>";
						
						tabContainer+= "<tbody><tr>";
						tabContainer+= "<td><b class=\"tablesaw-cell-label mlTableHead\" labelpropertyid=\"CM_SL_Name\">Name</b><span class=\"tablesaw-cell-content\">"+cookieName+"</span></td>";
						tabContainer+= "<td><b class=\"tablesaw-cell-label mlTableHead\" labelpropertyid=\"CM_SL_Description\">Description</b><span class=\"tablesaw-cell-content\">"+cookieDescription+"</span></td>";
						tabContainer+= "<td><b class=\"tablesaw-cell-label mlTableHead\" labelpropertyid=\"CM_SL_Duration\">Duration</b><span class=\"tablesaw-cell-content\">"+cookieDuration+"</span></td>";
						tabContainer+= "<td><b class=\"tablesaw-cell-label mlTableHead\" labelpropertyid=\"CM_SL_Type\">Type</b><span class=\"tablesaw-cell-content mlLabel\" labelpropertyid="+cookieCategoryType+">"+cookieType+"</span></td>";
						tabContainer+= "</tr></tbody></table>";
						
						tabContainer+= "</div>";
						}
						else
						{
							tabContainer+= "<div class=\"accordion_head\">"+cookieName;
							tabContainer+= "<span class=\"plusminus\">+</span>";
							tabContainer+= "<span class=\"toggleSwitchContainer2\">";
							
							if(gapplArr=="" || gapplArr== undefined)	
							{
								tabContainer+= "<span class=\"cookieStatus conditionTxt inactive mlLabel\" labelpropertyid=\"CM_SL_Inactive\" value=\""+cookieName+"@#@"+gOrgId+"_"+gAppId+"\" >Inactive</span>";
								tabContainer+= "<label class=\"switch\"><input type=\"checkbox\" value=\""+cookieName+"@#@"+gOrgId+"_"+gAppId+"\" checked /><span class=\"slider_CM round\">";
							}
							else
							{
								var attrvalue;
								for(var j=0;j<gapplArr.length;j++)
								{
									attrvalue = gapplArr[j].attrValue;					
								}
								tabContainer+= "<span class=\"cookieStatus conditionTxt inactive mlLabel\" labelpropertyid=\"CM_SL_Inactive\" value=\""+cookieName+"@#@"+gOrgId+"_"+gAppId+"@@"+attrvalue+"\" >Inactive</span>";
								tabContainer+= "<label class=\"switch\"><input type=\"checkbox\" value=\""+cookieName+"@#@"+gOrgId+"_"+gAppId+"@@"+attrvalue+"\" checked /><span class=\"slider_CM round\">";
							}
							
							tabContainer+= "</span></label></span></div>";
							
							tabContainer+= "<div class=\"accordion_body\" style=\"display:none\">";
							tabContainer+= "<table class=\"tablesaw tablesaw-stack striped\">";
							
							tabContainer+= "<thead><tr>";
							tabContainer+= "<th scope=\"col\" data-tablesaw-sortable-col=\"\" class=\"mlTableHead\" labelpropertyid=\"CM_SL_Name\">Name</th>";
							tabContainer+= "<th scope=\"col\" data-tablesaw-sortable-col=\"\" class=\"mlTableHead\" labelpropertyid=\"CM_SL_Description\">Description</th>";
							tabContainer+= "<th scope=\"col\" data-tablesaw-sortable-col=\"\" class=\"mlTableHead\" labelpropertyid=\"CM_SL_Duration\">Duration</th>";
							tabContainer+= "<th scope=\"col\" data-tablesaw-sortable-col=\"\" class=\"mlTableHead\" labelpropertyid=\"CM_SL_Type\">Type</th>";
							tabContainer+= "</tr></thead>";
							
							tabContainer+= "<tbody><tr>";
							tabContainer+= "<td><b class=\"tablesaw-cell-label mlTableHead\" labelpropertyid=\"CM_SL_Name\">Name</b><span class=\"tablesaw-cell-content\">"+cookieName+"</span></td>";
							tabContainer+= "<td><b class=\"tablesaw-cell-label mlTableHead\" labelpropertyid=\"CM_SL_Description\">Description</b><span class=\"tablesaw-cell-content\">"+cookieDescription+"</span></td>";
							tabContainer+= "<td><b class=\"tablesaw-cell-label mlTableHead\" labelpropertyid=\"CM_SL_Duration\">Duration</b><span class=\"tablesaw-cell-content\">"+cookieDuration+"</span></td>";
							tabContainer+= "<td><b class=\"tablesaw-cell-label mlTableHead\" labelpropertyid=\"CM_SL_Type\">Type</b><span class=\"tablesaw-cell-content mlLabel\" labelpropertyid="+cookieCategoryType+">"+cookieType+"</span></td>";
							tabContainer+= "</tr></tbody></table>";
							
							tabContainer+= "</div>";
						}
						
					});
			tabContainer+= "</article>";
		});
		
		tabs+= "</ul>";
		tabContainer+= "</div>";
		customizeCookieDiv+= tabs;
		customizeCookieDiv+= tabContainer;
		customizeCookieDiv+= "</section></div>";
		
		customizeCookieDiv+= "<div class=\"cookieFooter\">";
		customizeCookieDiv+= "<button class=\"confirmBtn\" onclick=\"confirmBtn()\"><span class=\"mlButton\" labelpropertyid=\"CM_SB_Confirm_My_Choices\">Confirm My Choices</span></button>";
		customizeCookieDiv+= "<button class=\"acceptBtn\" onclick=\"acceptBtn()\"><span class=\"mlButton\" labelpropertyid=\"CM_SB_Allow_All\">Allow All</span></button>";
		
		customizeCookieDiv+= "</div></div></div></div>";
		
		jQuery('body').append(customizeCookieDiv);
		setCookieStatus();
		cookieSettings();
		jQuery('body').css("overflow","hidden");
		jQuery(".cookieModal").show();
		jQuery(".sceneTwo").show();
		getPropertiesLabelJSON();
		changeLabelTexts();	
	}
}

function removePartialCookies()
{
	var decodedCookie = decodeURIComponent(document.cookie);	
	var cookieconsentArr = decodedCookie.split("; ");
	
	for(var i = 0;i<cookieconsentArr.length; i++)
	{
		var cookieConsentPair = cookieconsentArr[i];
		var cookieConsentName = cookieConsentPair.split("=")[0];
		if(cookieConsentName.indexOf("@#@")!=-1)
		{
			var cookieName = cookieConsentName.split("@#@")[0];
			var cookieOrgId = cookieConsentName.split("@#@")[1].split("_")[0];
			var cookieAppId = cookieConsentName.split("@#@")[1].split("_")[1];
			var cookieForm=null;
			var attrvalue=null;
			if(!gapplArr=="" || !gapplArr== undefined)	
			{
				cookieAppId = cookieAppId.split("@@")[0];
				cookieForm = cookieConsentName.split('@@')[1];
				
				for(var j=0;j<gapplArr.length;j++)
				{
					attrvalue = gapplArr[j].attrValue;					
				}
			} 			
			if(cookieOrgId==gOrgId+'' && cookieAppId==gAppId+'' && cookieForm==attrvalue)
			{
				document.cookie = cookieConsentName+"="+";"+"expires=Thu, 01 Jan 1970 00:00:00 UTC"+";path=/";
			}	
		}
	}	
}

function setCookieStatus()
{
	var decodedCookie = decodeURIComponent(document.cookie);	
	var cookieconsentArr = decodedCookie.split("; ");	
	for(var i = 0;i<cookieconsentArr.length; i++)
	{
		var cookieConsentPair = cookieconsentArr[i];
		var cookieConsentName = cookieConsentPair.split("=")[0];
		var value = cookieConsentPair.split("=")[1];
		if(cookieConsentName.indexOf("@#@")!=-1)
		{
			var cookieName = cookieConsentName.split("@#@")[0];
			var cookieOrgId = cookieConsentName.split("@#@")[1].split("_")[0];
			var cookieAppId = cookieConsentName.split("@#@")[1].split("_")[1];
			var cookieForm=null;
			var attrvalue=null;
			if(!gapplArr=="" || !gapplArr== undefined)	
			{
				cookieAppId = cookieAppId.split("@@")[0];
				cookieForm = cookieConsentName.split('@@')[1];
				
				for(var j=0;j<gapplArr.length;j++)
				{
					attrvalue = gapplArr[j].attrValue;					
				}
			}
			
			if(cookieOrgId==gOrgId && cookieAppId==gAppId && cookieForm==attrvalue && value!='false')
			{
				jQuery("input[type='checkbox'][value='"+cookieConsentName+"']").prop("checked",false);
				jQuery("span[value='"+cookieConsentName+"']").removeClass("inactive");
				jQuery("span[value='"+cookieConsentName+"']").addClass("active");
				jQuery("span[value='"+cookieConsentName+"']").attr("labelpropertyid","CM_SL_Active");
				
				if(cookieName == 'ifc')
				{
					jQuery(".categoryStatus[value='"+cookieConsentName+"']").text("Always Active");
					jQuery(".categoryStatus[value='"+cookieConsentName+"']").attr("labelpropertyid","CM_SL_Always_Active");
				}
				else if(cookieName=='iac' || cookieName=='imac') /** If the Cookie Category has to be changed to Partially active or active */
				{
					if(value=='true')
					{
						jQuery(".categoryStatus[value='"+cookieConsentName+"']").text("Active");
						jQuery(".categoryStatus[value='"+cookieConsentName+"']").attr("labelpropertyid","CM_SL_Active");
						jQuery("article[value='"+cookieConsentName+"'] .accordion_head").each(function(index,value) /** To update all cookies to active */
						{
							jQuery(value).find("input[type='checkbox']").prop("checked",false);
							jQuery(value).find(".cookieStatus").removeClass("inactive");
							jQuery(value).find(".cookieStatus").addClass("active");
							jQuery(value).find(".cookieStatus").text("Active");
							jQuery(value).find(".cookieStatus").attr("labelpropertyid","CM_SL_Active");
				
						});						
					}
					else if(value=='partial')
					{
						jQuery(".categoryStatus[value='"+cookieConsentName+"']").text("Partially Active");
						jQuery(".categoryStatus[value='"+cookieConsentName+"']").attr("labelpropertyid","CM_SL_Partially_Active");
					}
				}
				else
				{
					jQuery(".cookieStatus[value='"+cookieConsentName+"']").text("Active");
					jQuery(".cookieStatus[value='"+cookieConsentName+"']").attr("labelpropertyid","CM_SL_Active");
				}				
			}	
		}
	}
}

function declineCookiesBtn()
{
	
	for(var i=1;i<=categoryCount;i++)
	{		
		if(jQuery("#cookiecategory_"+i+"").hasClass("alwaysAct"))
		{
		var cookiecategoryName =jQuery("#cookiecategory_"+i).attr("value");
		setCookie(cookiecategoryName, "true", 365);
		}
		else
		{
			var cookiecategoryName =jQuery("#cookiecategory_"+i).attr("value");
			setCookie(cookiecategoryName, "false", 365);
		}
	}
	
	if(gapplArr=="" || gapplArr== undefined)	
	{
		setCookie("iocc@#@"+gOrgId+"_"+gAppId, "true", 365);
	}else{	
		var attrvalue="";
		for(var j=0;j<gapplArr.length;j++)
		{
			attrvalue = gapplArr[j].attrValue;					
		}
		setCookie("iocc@#@"+gOrgId+"_"+gAppId+"@@"+attrvalue, "true", 365);
	}

	var cookieConsentDetailsArr =new Array();
	cookieConsentDetailsArr=getCookieConsentDetails(gAppId,gSourceOrgId,gapplArr);
	console.log(cookieConsentDetailsArr);
	if(typeof gcallback == "function")
	{
		gcallback(cookieConsentDetailsArr);
	}
	jQuery("#cookieModal_CM").remove();
	jQuery('body').css("overflow","auto");
}

function acceptBtn()
		{	
	removePartialCookies();
	for(var i=1;i<=categoryCount;i++)
	{		
		var cookiecategoryName =jQuery("#cookiecategory_"+i).attr("value");

		setCookie(cookiecategoryName, "true", 365);
	}
	if(gapplArr=="" || gapplArr== undefined)	
	{
		setCookie("iocc@#@"+gOrgId+"_"+gAppId, "true", 365);
	}else{	
		var attrvalue="";
		for(var j=0;j<gapplArr.length;j++)
		{
			attrvalue = gapplArr[j].attrValue;					
		}
		setCookie("iocc@#@"+gOrgId+"_"+gAppId+"@@"+attrvalue, "true", 365);
	}

	var cookieConsentDetailsArr =new Array();
	cookieConsentDetailsArr=getCookieConsentDetails(gAppId,gSourceOrgId,gapplArr);
	console.log(cookieConsentDetailsArr);
	if(typeof gcallback == "function")
	{
		gcallback(cookieConsentDetailsArr);
	}
	jQuery("#cookieModal_CM").remove();
	jQuery('body').css("overflow","auto");		
};

function confirmBtn()
		{
	removePartialCookies();
	for(var i=1;i<=categoryCount;i++)
	{		
		if(jQuery("#cookiecategory_"+i+"").hasClass("inactive"))
		{
			var cookiecategoryName =jQuery("#cookiecategory_"+i).attr("value");	
			setCookie(cookiecategoryName, "false", 365);
		}
		else if(jQuery("#cookiecategory_"+i+"").hasClass("alwaysAct"))
		{
			var cookiecategoryName =jQuery("#cookiecategory_"+i).attr("value");
			setCookie(cookiecategoryName, "true", 365);
		}
		else
		{
			if(jQuery("#cookiecategory_"+i+"").text()==='Partially Active')
			{
				/** alert('Inside partially active'); */
				var cookiecategoryName =jQuery("#cookiecategory_"+i).attr("value").split("@#@")[0];
				jQuery('#tab'+i).find('.cookieStatus').each(function(e,i)
				{
					var cookieName=jQuery(i).attr("value");
					if(jQuery(i).hasClass("active"))
					{						
						setCookie(cookieName,cookiecategoryName,365);
					}					
				});
				cookiecategoryName =jQuery("#cookiecategory_"+i).attr("value");	
				setCookie(cookiecategoryName, "partial", 365);
			}
			else
			{
				var cookiecategoryName =jQuery("#cookiecategory_"+i).attr("value");		
				setCookie(cookiecategoryName, "true", 365);
			}
		}
	}	

	if(gapplArr=="" || gapplArr== undefined)	
	{
		setCookie("iocc@#@"+gOrgId+"_"+gAppId, "true", 365);
	}
	else
	{
		var attrvalue="";
		for(var j=0;j<gapplArr.length;j++)
		{
			attrvalue = gapplArr[j].attrValue;					
		}
		setCookie("iocc@#@"+gOrgId+"_"+gAppId+"@@"+attrvalue, "true", 365);
	}
	var cookieConsentDetailsArr =new Array();
	cookieConsentDetailsArr=getCookieConsentDetails(gAppId,gSourceOrgId,gapplArr);
	console.log(cookieConsentDetailsArr);
	if(typeof gcallback == "function")
	{
		gcallback(cookieConsentDetailsArr);
	}
	jQuery("#cookieModal_CM").remove();	
	jQuery('body').css("overflow","auto");		
};

function getCookieConsentDetails(appId, orgId, applArr)
{	
	var cookieConsentDetailsArr =new Array();
	var analyticalCookiesArr = new Array();
	var marketingCookiesArr = new Array();
	var decodedCookie = decodeURIComponent(document.cookie);	
	var cookieconsentArr = decodedCookie.split("; ");
	for(var i = 0; i <cookieconsentArr.length; i++) 
	{
		var cookieConsentObj = new Object();
		var cookieConsentPair = cookieconsentArr[i];
		var cookieConsentName = cookieConsentPair.split("=")[0];
		var value = cookieConsentPair.split("=")[1];
		if(cookieConsentName.indexOf("@#@")!=-1)
		{
			var cookieName = cookieConsentName.split("@#@")[0];
			var cookieOrgId = cookieConsentName.split("@#@")[1].split("_")[0];
			var cookieAppId = cookieConsentName.split("@#@")[1].split("_")[1];
			var cookieForm=null;
			var attrvalue=null;
			if(applArr!=undefined && applArr.length>0)	
			{
				cookieAppId = cookieAppId.split("@@")[0];
				cookieForm = cookieConsentName.split('@@')[1];
				var attrvalue;
				for(var j=0;j<applArr.length;j++)
				{
					attrvalue = applArr[j].attrValue;					
				}
			} 
			if(cookieOrgId==gOrgId && cookieAppId==gAppId && cookieForm==attrvalue)
			{
				
				if(cookieName=="ifc")
				{
					cookieName="Strictly Necessary";
					categoryType=1;
					cookieConsentObj["categoryName"]=cookieName;
					cookieConsentObj["consentGiven"]=value;
					cookieConsentObj["categoryType"]=categoryType;
					cookieConsentDetailsArr.push(cookieConsentObj);

				}
				else if(cookieName=="iac")
				{
					cookieName="Analytical";
					categoryType=2;
					cookieConsentObj["categoryName"]=cookieName;
					cookieConsentObj["consentGiven"]=value;
					cookieConsentObj["categoryType"]=categoryType;
					cookieConsentDetailsArr.push(cookieConsentObj);

				}
				else if(cookieName=="imac")
				{
					cookieName="Marketing & Advertising";
					categoryType=3;
					cookieConsentObj["categoryName"]=cookieName;
					cookieConsentObj["consentGiven"]=value;
					cookieConsentObj["categoryType"]=categoryType;
					cookieConsentDetailsArr.push(cookieConsentObj);
				}
				else if(cookieName=="iocc")
				{
					cookieName="Over All Consent";
					categoryType="";
					cookieConsentObj["categoryName"]=cookieName;
					cookieConsentObj["consentGiven"]=value;
					cookieConsentObj["categoryType"]=categoryType;
					cookieConsentDetailsArr.push(cookieConsentObj);
				}
				else /** for cookies */
				{
					if(value==='iac')
					{
						cookieConsentObj["cookieName"]=cookieName;
						cookieConsentObj["consentGiven"]="true";
						cookieConsentObj["categoryType"]=2;
						analyticalCookiesArr.push(cookieConsentObj);
					}
					else if(value==='imac')
					{
						cookieConsentObj["cookieName"]=cookieName;
						cookieConsentObj["consentGiven"]="true";
						cookieConsentObj["categoryType"]=3;
						marketingCookiesArr.push(cookieConsentObj);
					}	
				}
			}
		}
	}
	
	for(var j=0;j<cookieConsentDetailsArr.length;j++)
	{
		if(analyticalCookiesArr.length!=0 && cookieConsentDetailsArr[j]["categoryName"]==='Analytical')
		{	
			cookieConsentDetailsArr[j]["cookies"]=analyticalCookiesArr;
		}
		else if(marketingCookiesArr.length!=0 && cookieConsentDetailsArr[j]["categoryName"]==="Marketing & Advertising")
		{
			cookieConsentDetailsArr[j]["cookies"]=marketingCookiesArr;
		}
	}
	return cookieConsentDetailsArr;
}

function showCookiePolicy(orgId,appId,langId,isLink)
{	
	if(langId==null || langId==undefined || langId=="")
	{
		langId = "1";
	}
	gUserPrefLangID=langId;	
	jQuery("<link/>", {rel: "stylesheet",type: "text/css",href: "/ConsentManagement/css/tablesaw.css?"+appVersion}).appendTo("head");
	jQuery("<link/>", {rel: "stylesheet",type: "text/css",href: "/ConsentManagement/css/cookieManagement.css?"+appVersion}).appendTo("head");
	
	jQuery.when(
		jQuery.get('/iONjsLib/js/jquery.blockUI.js'),
		jQuery.get('/ConsentManagement/js/CMAjaxInteraction.js?'+appVersion),
		jQuery.get('/ConsentManagement/js/tablesaw.js?'+appVersion),
		jQuery.get('/ConsentManagement/js/jquery.slimscroll.js?'+appVersion),						
		jQuery.get('/ConsentManagement/js/multiLanguageSupport.js?'+appVersion)
	).done(function(succesResponse){
		formCookiePolicyTextDiv(orgId,appId,langId,isLink);
	}).fail(function(failedResponse){});	
}

function formCookiePolicyTextDiv(orgId,appId,langId,isLink)
{	
	gOrgId = orgId;
	gAppId = appId;	
	gLangId=langId;	
	gUserPrefLangID=langId;
	isLinkPolicy=isLink;
	var urlString="/ConsentManagement/getCookiePolicyText.do?";
	var reqParamObj={"orgId":orgId,"appId":appId,"langId":langId};
	var lAJAXInteraction = new CMAJAXInteractionforJSON(urlString, null, true);
	var lRequest = lAJAXInteraction.doPost(""+JSON.stringify(reqParamObj));
	var responseText = lRequest.responseText;	
	if(responseText && responseText!="Invalid_Inputs"){
		var resultArr=JSON.parse(responseText);	
		cookieDetailsList=resultArr.cookieDetailsList;
		cookiePolicyList = resultArr.cookiePolicyText;
		propertiesFileName=resultArr.CM_propertiesFileBasepath;
		var langDir=resultArr.languageDirection;
		getPropertiesLabelJSON();
		if(cookiePolicyList.length>0){			
			var policyTypeText="Cookie Policy";			
			selectedLangId=langId;
			jQuery('body').css("overflow","hidden");	
			var cookiePolicyDiv= "<div class=\"sceneThree\">";
			cookiePolicyDiv+= "<div class=\"banner\">";
			cookiePolicyDiv+="<img src=\"/ConsentManagement/images/Top-Banner-main.png\" alt=\"\">";
			cookiePolicyDiv+="<h1 class=\"mlTitle\" labelpropertyid=\"CM_SL_Cookie_Policy\">"+policyTypeText+"</h1>";
			cookiePolicyDiv+="</div>";
			cookiePolicyDiv+="<div class=\"cookieFooter\">";
            cookiePolicyDiv+="<button class=\"closePolicyBtn mlButton\" onclick=\"closeCookiePolicy()\" labelpropertyid=\"CM_SB_Close\">Close</button>";
            cookiePolicyDiv+="</div>";
			cookiePolicyDiv+="</div>";			
			if(isLink!=1)
			{
				if(langDir=="RTL")
				{
					jQuery('body').append(" <div id=\"cookieModal_CM\" dir=\"RTL\" class=\"modal cookieModal\"></div>");
				}
				else
				{
					jQuery('body').append(" <div id=\"cookieModal_CM\" class=\"modal cookieModal\"></div>");
				}
				jQuery('#cookieModal_CM').append("<div class=\"modal-content\"></div>");
				jQuery("#cookieModal_CM .modal-content").append(cookiePolicyDiv);
				
			}
			else
			{
				jQuery('.sceneOne').hide();
				jQuery('.modal-content').append(cookiePolicyDiv);
			}
            cookiePolicyMashupContent();
            cookieSettings();			
		}		
	}	
	else if(responseText=="Invalid_Inputs")
	{
		jAlert("confirm","A technical error occured while displaying the data due to invalid inputs. Please try later.", "Invalid Inputs", function(r)
				{
			if(r == true)
			{
				jQuery(".cookiePolicyModal").remove();
			}
			else{
				jQuery(".cookiePolicyModal").remove();
			}
				});
	}	
	changeLabelTexts();
}
function cookiePolicyMashupContent()
{
	var cookieTable="";	
	cookieTable += "<div class=\"qaContainer\">";
	cookieTable += "<table class=\"tablesaw tablesaw-stack striped\"><thead><tr>";
	cookieTable += "<th scope=\"col\" class=\"mlTableHead\" labelpropertyid=\"CM_SL_Cookie_Name\" data-tablesaw-sortable-col=\"\">Cookie Name</th>";
	cookieTable += "<th scope=\"col\" class=\"mlTableHead\" labelpropertyid=\"CM_SL_Description\" data-tablesaw-sortable-col=\"\">Description</th>";
	cookieTable += "<th scope=\"col\" class=\"mlTableHead\" labelpropertyid=\"CM_SL_Cookie_Category\" data-tablesaw-sortable-col=\"\">Cookie Category</th>";
	cookieTable += "<th scope=\"col\" class=\"mlTableHead\" labelpropertyid=\"CM_SL_Cookie_Type\" data-tablesaw-sortable-col=\"\">Cookie Type</th>";
	cookieTable += "<th scope=\"col\" class=\"mlTableHead\" labelpropertyid=\"CM_SL_Expiry\" data-tablesaw-sortable-col=\"\">Expiry</th>";
	cookieTable += "</tr></thead>";
	cookieTable += "<tbody>";
	cookieTable += formPolicyCookieTable();
	cookieTable += "</tbody></table>";
	
	var policyObj = cookiePolicyList[0];
	var policyText = policyObj.policytext;	
	var policyDiv = "<div class=\"cookiePolicyBody\">";	
	policyDiv += " <p id=\"noticeContent\">"+ policyText;
	if(cookieDetailsList.length>0)
	{
		policyDiv +=cookieTable;
	}

	policyDiv += "</p>";
	policyDiv += "</div>";	
	jQuery("#cookieModal_CM .sceneThree .banner").append(policyDiv);
}

function formPolicyCookieTable()
{	
	var cookieName="",cookieDesc="",cookieRetentionTime="",cookieCategory="",cookieCategoryType="",cookieType="",cookieTable="";
	console.log("cookieDetailsList:"+cookieDetailsList);
	console.log("cookieDetailsList.size:"+cookieDetailsList.length);
	jQuery(cookieDetailsList).each(function(i){				
			var cookieDetailsArr= this;
			jQuery(cookieDetailsArr).each(function(k){
			cookieName = cookieDetailsArr[k].cookieName;
			cookieDesc = cookieDetailsArr[k].cookieDesc;
			cookieCategory = cookieDetailsArr[k].cookiecategory;
			var cookieCategoryLabelProperty="";
			if(cookieCategory=="Functional Cookies")
			{
				cookieCategoryLabelProperty="CM_SL_Functional_Cookies";
			}
			else if(cookieCategory=="Analytical Cookies")
			{
				cookieCategoryLabelProperty="CM_SL_Analytical_Cookies";
			}
			else if(cookieCategory=="Marketing & Advertising Cookies")
			{
				cookieCategoryLabelProperty="CM_SL_Marketing_and_Advertising_Cookies";
			}
			cookieCategoryType = cookieDetailsArr[k].cookieType;
			if(cookieCategoryType=="CM_SL_First_Party")
			{
				cookieType="First Party";			    
			}
			if(cookieCategoryType=="CM_SL_Third_Party")
			{
				cookieType="Third Party";				
			}
			cookieRetentionTime = cookieDetailsArr[k].cookieretentiontime;
			cookieTable += " <tr id=\"cookieTable\">";			
			cookieTable += "<td><b class=\"tablesaw-cell-label mlTableHead\" labelpropertyid=\"CM_SL_Cookie_Name\">Cookie Name</b><span class=\"tablesaw-cell-content\">"+cookieName+"</span></td>";
			cookieTable += "<td><b class=\"tablesaw-cell-label mlTableHead\" labelpropertyid=\"CM_SL_Description\">Description</b><span class=\"tablesaw-cell-content\">"+cookieDesc+"</span></td>";
			cookieTable += "<td><b class=\"tablesaw-cell-label mlTableHead\" labelpropertyid=\"CM_SL_Cookie_Category\">Cookie Category</b><span class=\"tablesaw-cell-content mlLabel\" labelpropertyid="+cookieCategoryLabelProperty+">"+cookieCategory+"</span></td>";
			cookieTable += "<td><b class=\"tablesaw-cell-label mlTableHead\" labelpropertyid=\"CM_SL_Cookie_Type\">Cookie Type</b><span class=\"tablesaw-cell-content mlLabel\" labelpropertyid="+cookieCategoryType+">"+cookieType+"</span></td>";
			cookieTable += "<td><b class=\"tablesaw-cell-label mlTableHead\" labelpropertyid=\"CM_SL_Expiry\">Expiry</b><span class=\"tablesaw-cell-content\">"+cookieRetentionTime+"</span></td>";
			cookieTable += " </tr>";
			});			
		
		});
	return cookieTable;
}	

function closeCookiePolicy()
{
	if(isLinkPolicy!=1)
	{
		jQuery("#cookieModal_CM").remove();
		jQuery('body').css("overflow","auto");
	}
	else
	{
		jQuery('.sceneThree').remove();
		jQuery('.sceneOne').show();
	}
}

/**------- New cookie notice Changes -------*/

function cookieSettings() {
    jQuery(".customizeCookie").on("click", function () {
        jQuery(".sceneOne").hide();
        jQuery(".sceneTwo").show();
    });

    jQuery(".toggleSwitchContainer2 label").on("click", function (e) {
        e.stopPropagation();                
        var totalItems = jQuery(this).parents("article").find(".accordion_container .toggleSwitchContainer2").length;
        var checkedItems = jQuery(this).parents(".accordion_container").find(".toggleSwitchContainer2 input:checked").length;
        console.log("checked items: " + checkedItems + "and" + "total items: " + totalItems);
        if(checkedItems > 0 && checkedItems != totalItems){
            jQuery(this).parents("article").find("h2 .conditionTxt").addClass("active");
            jQuery(this).parents("article").find("h2 .conditionTxt").removeClass("inactive");
            jQuery(this).parents("article").find("h2 .conditionTxt").text("Partially Active");
            jQuery(this).parents("article").find("h2 .conditionTxt").attr("labelpropertyid","CM_SL_Partially_Active");
            jQuery(this).parents("article").find("h2 .toggleSwitchContainer input").prop("checked",false);
            changeLabelTexts();
        }
        else if(checkedItems == totalItems) {
            jQuery(this).parents("article").find("h2 .conditionTxt").text("Inactive");
            jQuery(this).parents("article").find("h2 .conditionTxt").removeClass("active");
            jQuery(this).parents("article").find("h2 .conditionTxt").addClass("inactive");
            jQuery(this).parents("article").find("h2 .toggleSwitchContainer input").prop("checked",true);
            jQuery(this).parents("article").find("h2 .conditionTxt").attr("labelpropertyid","CM_SL_Inactive");
            changeLabelTexts();
        }
        else if(checkedItems == 0) {
            jQuery(this).parents("article").find("h2 .conditionTxt").text("Active");
            jQuery(this).parents("article").find("h2 .conditionTxt").addClass("active");
            jQuery(this).parents("article").find("h2 .conditionTxt").removeClass("inactive");
            jQuery(this).parents("article").find("h2 .toggleSwitchContainer input").prop("checked",false);
            jQuery(this).parents("article").find("h2 .conditionTxt").attr("labelpropertyid","CM_SL_Active");
            changeLabelTexts();
        }

        if(jQuery(this).find("input").is(":checked")){
            jQuery(this).parents(".toggleSwitchContainer2").find(".conditionTxt").removeClass("active").addClass("inactive").text("Inactive");
            jQuery(this).parents(".toggleSwitchContainer2").find(".conditionTxt").attr("labelpropertyid","CM_SL_Inactive");
            changeLabelTexts();
        }
        else{
            jQuery(this).parents(".toggleSwitchContainer2").find(".conditionTxt").removeClass("inactive").addClass("active").text("Active");
            jQuery(this).parents(".toggleSwitchContainer2").find(".conditionTxt").attr("labelpropertyid","CM_SL_Active");
            changeLabelTexts();
        }
        
    });

    jQuery(".toggleSwitchContainer label").on("click", function (evt) {
        evt.stopPropagation();
        if (jQuery(this).find("input").is(":checked")) {
            jQuery(this).parents(".toggleSwitchContainer").find(".conditionTxt").removeClass("active").addClass("inactive").text("Inactive");
            jQuery(this).parents(".toggleSwitchContainer").find(".conditionTxt").attr("labelpropertyid","CM_SL_Inactive");
            jQuery(this).parents("article").find(".accordion_container input").prop("checked", true);
            jQuery(this).parents("article").find(".accordion_container .conditionTxt").removeClass("active").addClass("inactive").text("Inactive");
            jQuery(this).parents("article").find(".accordion_container .conditionTxt").attr("labelpropertyid","CM_SL_Inactive");
            var currentVal = jQuery(this).parents("article").attr("id");
            changeLabelTexts();
           
        } else {
            jQuery(this).parents(".toggleSwitchContainer").find(".conditionTxt").removeClass("inactive").addClass("active").text("Active");
            jQuery(this).parents(".toggleSwitchContainer").find(".conditionTxt").attr("labelpropertyid","CM_SL_Active");
            jQuery(this).parents("article").find(".accordion_container input").prop("checked",false);
            jQuery(this).parents("article").find(".accordion_container .conditionTxt").removeClass("inactive").addClass("active").text("Active");
            jQuery(this).parents("article").find(".accordion_container .conditionTxt").attr("labelpropertyid","CM_SL_Active");
            var currentVal = jQuery(this).parents("article").attr("id");
            changeLabelTexts();
   
        }
    });

    if(jQuery(window).width() > 768){
    jQuery(".scrollableContent").slimscroll({
        height: "250px",
    });
}

    jQuery(".cookieDetails").off("click").on("click", function () {
        jQuery(this).parent().find(".accordion_container").slideToggle();
    });

    jQuery(".accordion_head").off("click").on("click",function () {
        if (jQuery(".accordion_body").is(":visible")) {
            jQuery(".accordion_body").slideUp(300);
            jQuery(".plusminus").text("+");
        }
        if (jQuery(this).next(".accordion_body").is(":visible")) {
            jQuery(this).next(".accordion_body").slideUp(300);
            jQuery(this).children(".plusminus").text("+");
        } else {
            jQuery(this).next(".accordion_body").slideDown(300);
            jQuery(this).children(".plusminus").text("-");
        }
    });
    

    /** ----------Select the first tab and div by default */

    jQuery("#vertical_tab_nav > ul > li > a").eq(0).addClass("selected");
    jQuery("#vertical_tab_nav > div > article").eq(0).css("display", "block");

    if(jQuery(window).width() < 768){
        jQuery("#vertical_tab_nav > ul > li > a").eq(0).removeClass("selected");
    jQuery("#vertical_tab_nav > div > article").eq(0).css("display", "none");
    }

    /** ---------- This assigns an onclick event to each tab link("a" tag) and passes a parameter to the showHideTab() function */

    jQuery("#vertical_tab_nav > ul").off("click").on("click",function (e) {
        
		if (jQuery(e.target).is("a")) {
            /** Handle Tab Nav */
            jQuery("#vertical_tab_nav > ul > li > a").removeClass("selected");
            jQuery(e.target).addClass("selected");
            /** Handles Tab Content */
            var clicked_index = jQuery("a", this).index(e.target);
            jQuery("#vertical_tab_nav > div > article").css("display", "none");
            jQuery("#vertical_tab_nav > div > article").eq(clicked_index).fadeIn();
        }
        jQuery(this).blur();
        return false;
    });
    /** end ready */
    
    /** if in drawer mode */
    jQuery(".tab_drawer_heading").off("click").on("click",function () {
        var jQuerythis = jQuery(this).next("article");
        jQuery(".cookieModal article").not(jQuerythis).slideUp();
        var d_activeTab = jQuery(this).attr("rel");
        jQuery("#" + d_activeTab).slideToggle();

        jQuery(".tab_drawer_heading").removeClass("d_active");
        jQuery(this).addClass("d_active");

        jQuery(".cookieModal ul.tabs_CM li a").removeClass("selected");
        jQuery(".cookieModal ul.tabs_CM li a[rel^='" + d_activeTab + "']").addClass("selected");
    });
    
    if (jQuery(window).width() > 767) {
        jQuery(".cookiePolicyBody").slimscroll({
            height: '300px',
            alwaysVisible: false
        });
    } else {
        jQuery(".cookiePolicyBody").slimScroll({ destroy: true });
    }
}

function extractCookieJsonContent(orgId,appId,langId,applArr)
{
	var cookieJSON=cookiejson;
	var returnJSON;
	if((cookieJSON!=null && cookieJSON!=undefined && cookieJSON!="") && (applArr!="" && applArr!= undefined))
	{
	    var attrCode="",value="";
	    for(var i=0;i<applArr.length;i++)
    	{
    		var hMap=applArr[i];
    		attrCode=hMap["attrCode"];
    		value=hMap["attrValue"];
    	}
    	if(cookiejson.hasOwnProperty(appId+"_"+orgId+"_"+langId+"@@"+attrCode+"#@#"+value))
    	{
    		returnJSON=cookiejson[appId+"_"+orgId+"_"+langId+"@@"+attrCode+"#@#"+value];
    	}
    	else
    	{
    		returnJSON="ERROR";
    	}
	}
	else if((cookieJSON!=null && cookieJSON!=undefined && cookieJSON!="") && (cookiejson.hasOwnProperty(appId+"_"+orgId+"_"+langId)))
    {
		returnJSON=cookiejson[appId+"_"+orgId+"_"+langId];	
	}
	else
	{
		returnJSON="ERROR";
	}
	return returnJSON;
}