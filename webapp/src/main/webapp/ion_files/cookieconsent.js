(function() {
 
 var domaintoexcludecookiecall=['.tcsion.com/EForms','learning.tcsionhub.in/EForms','learning.tcsionhub.uk/EForms','apps.tcsionhub.in/EForms','.tcsionhub.uk/EForms','.tcsionhub.uk/EForms','.tcsionhub.in/EForms','.tcsion.com//EForms','learning.tcsionhub.in//EForms','learning.tcsionhub.uk//EForms','apps.tcsionhub.in//EForms','.tcsionhub.uk//EForms','.tcsionhub.uk//EForms','.tcsionhub.in//EForms'];
 window.calledfromexcludeddomain=false;
 var calledfrom=window.location.href;
 jQuery.each(domaintoexcludecookiecall,function(index,val){
if(calledfrom.indexOf(val)!=-1)
{
window.calledfromexcludeddomain=true;
}

})
 
 })();




$( document ).ready(function() {

function removejscssfile(filename, filetype){
    var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none" //determine element type to create nodelist from
    var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none" //determine corresponding attribute to test for
    var allsuspects=document.getElementsByTagName(targetelement)
    for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
    if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(filename)!=-1)
        allsuspects[i].parentNode.removeChild(allsuspects[i]) //remove element by calling parentNode.removeChild()
    }
}

 $(document).on('click','.cookies_footer #acceptBtn', function()
		{	
console.log("inside agree click");
try {
removejscssfile("cookieManagement.css", "css");
}
catch(err) {
console.log("error while unloading css");
}
});
  
});



 
function cookieconsentcallback(response)
{
console.log("Hi consent recieved in callback::::"+JSON.stringify(response))
var overallconsent="0";
$.each(response,function(a,b){


if(b.catergoryName=="Over All Consent")
{

if(b.consentGiven=="false")
{

if (document.referrer != "" && !document.referrer==window.location.href) {
  // var referringURL = document.referrer;
  // var local = referringURL.substring(referringURL.indexOf("?"), referringURL.length);
   //location.href = document.referrer; 
}
else
{
//history.go(-1);
}
}
else
{
overallconsent="1";


}

}



})
if(overallconsent=="1")
{
console.log("check for tcssnb ionhelp and others here"+window.orgid111);
// check for tcssnb ionhelp and others here
if(window.orgid111=="13")
{


$.each(response,function(a,b){


if(b.catergoryName=="Over All Consent")
{
if(b.consentGiven=="true")
{

}
else
{
//disable ga
window['ga-disable-UA-18424184-1'] = true;
}
}


if(b.catergoryName=="Analytical")
{
if(b.consentGiven=="true")
{
document.head.appendChild(document.createElement('script')).innerText="(function(i,s,o,g,r,a,m){i[\'GoogleAnalyticsObject\']=r;i[r]=i[r]||function(){  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m) })(window,document,\'script\',\'\/\/www.google-analytics.com\/analytics.js\',\'ga\'); ga(\'create\', \'UA-18424184-1\', \'auto\'); ga(\'send\', \'pageview\');";
}
else
{
//disable ga
window['ga-disable-UA-18424184-1'] = true;
}
}
if(b.catergoryName=="Marketing & Advertising")
{

//code for marketing cookies
if(b.consentGiven=="false")
{
if (document.referrer != "" && !document.referrer==window.location.href) {
  // var referringURL = document.referrer;
  // var local = referringURL.substring(referringURL.indexOf("?"), referringURL.length);
   //location.href = document.referrer; 
}
else
{
//history.go(-1);
}
}


}
})

}
else if(window.orgid111=="842")
{


$.each(response,function(a,b){

if(b.catergoryName=="Over All Consent")
{
if(b.consentGiven=="true")
{

}
else
{
//disable ga
window['ga-disable-UA-54805661-1'] = true;
}
}


if(b.catergoryName=="Analytical")
{
if(b.consentGiven=="true")
{
document.head.appendChild(document.createElement('script')).innerText="(function(i,s,o,g,r,a,m){i[\'GoogleAnalyticsObject\']=r;i[r]=i[r]||function(){  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m) })(window,document,\'script\',\'\/\/www.google-analytics.com\/analytics.js\',\'ga\'); ga(\'create\', \'UA-54805661-1\', \'auto\'); ga(\'send\', \'pageview\');";
}
else
{
//disable ga
window['ga-disable-UA-54805661-1'] = true;
}
}
if(b.catergoryName=="Marketing & Advertising")
{

//code for marketing cookies
if(b.consentGiven=="false")
{
if (document.referrer != "" && !document.referrer==window.location.href) {
  // var referringURL = document.referrer;
  // var local = referringURL.substring(referringURL.indexOf("?"), referringURL.length);
   //location.href = document.referrer; 
}
else
{
//history.go(-1);
}
}
}
})

}


}


}
