	// JavaScript Document
	var windowHeight=0;
	var scrollballTop=0;
	var resclastid;
	var myBgPos, myBgSector;
	var mypagename='';
	timerDown="" ;
	timerUp="" ;
	counter=0; 
	var deviceType='';
	var isiPad = /ipad/i.test(navigator.userAgent.toLowerCase());
	var isiPhone = /iphone/i.test(navigator.userAgent.toLowerCase());
	var isiPod = /ipod/i.test(navigator.userAgent.toLowerCase());
	var isAndroid = /android/i.test(navigator.userAgent.toLowerCase());
	var isBlackBerry = /blackberry/i.test(navigator.userAgent.toLowerCase());
	var isWindowsPhone = /windows phone/i.test(navigator.userAgent.toLowerCase());
	var href=window.location.href;
	var frst=0;
	var interval=null; 
	var banK= 0; 
	var banLen;
	var vid;
	var pageURL=$(location).attr("href");
	
	
	 
	
	
	function Animate(){					
		$("header").animate({top:'0px'},1000,function(){
			$(".home_banner img, .inner_banner img").animate({opacity:1, height:'auto'},100 ,function(){
				$(".lftcont").animate({opacity:1},50);	
				
				BannerContAnimate();
			});
			$(".lftcont").addClass("lftcont_width");
		});
		
		
	}
	
	function BannerContAnimate(){
		
		$(".bann_heading").addClass("banneranim");
		$(".bann_text").addClass("banneranim");
		$(".dvbann_readmore").addClass("banneranim");
		$(".rslides_tabs").addClass("banner_bullet_animate");
		
		$(".btn_bann_scroll").css("top",windowHeight);
		
		 scrollballTop=windowHeight-186;
			$( ".btn_bann_scroll" ).animate({
				top:scrollballTop 
		},900,function(){
			$(".btn_bann_scroll").addClass("bounce");
			
		});
		
		
	}
	
	function getPageName(name){
		
		if(name)
	mypagename=name;
	//alert(name);
	}
	
	
	
	
	function getYoutubeID(url) {   var id = url.match("[\\?&]v=([^&#]*)");
		id = id[1];
		return id;
	};
		
		
	function SetHoverSectorBg(myid){
		var getid=myid;
		
		switch(getid){
			case "campmgmt":
				myBgSector='-87px 0';
				break;
			case "bizapp":
				myBgSector='-255px 0';
				break;
			case "lx":
				myBgSector='-423px 0';
				break;
			case "exammgmt":
				myBgSector='-589px 0';
				break;
			case "incoumgmt":
				myBgSector='-747px 0';
				break;
			case "demat":
				myBgSector='-906px 0';
				break;
			case "digieva":
				myBgSector='-1068px 0';
				break;	
			case "preptest":
				myBgSector='-1394px 0';
				break;	
			case "communi":
				myBgSector='-1228px 0';
				break;		
			case "vocation":
				myBgSector='-237px -84px';
				break;
			case "highedu":
				myBgSector='-81px -84px';
				break;
			case "schools":
				myBgSector='-412px -84px';
				break;	
			case "exambodies":
				myBgSector='-596px -84px';
				break;	
			
		}}
	function GetBgPos(obj){
		
		var getType=$(obj).find("div[class$=prod_imgs] span").attr("class");
		
		switch(getType){
			case "education":
				 myBgPos='-100px 0px';
				break;
			case "manufact":
				 myBgPos ='-301px 0px';
				break;	
			case "hcm":
				 myBgPos ='-100px -101px';
				break;
			case "css":
				 myBgPos ='-301px -101px';
				break;
			case "exboa":
				 myBgPos ='-100px -218px';
				break;
			case "sectors":
				 myBgPos ='-99px 0px';
				 break;
			case "products" :
				 myBgPos ='-320px 0px';
				break;
				case "auto":
				 myBgPos ='-91px 0px';
				 break;
			case "pharma":
				myBgPos ='-264px 0px';
				break;
			case "process" :
				 myBgPos ='-91px -92px';
				break;
			 
				
		}
		}
	function bannerType(){
		
		var winwid=$(window).width();
		
		if(winwid>=300 && winwid<=620)
		deviceType='mobile';
		else if(winwid>=621 && winwid<=1024)
		deviceType='ipad';
		else
		deviceType='desktop';
		
		return deviceType;
		}
	function loadJSONabt_iON() {
		jQuery.ajax({
		   url:'/dotcom/TCSSMB/json/abt_iON.json',
		   dataType:'JSON',
		   async:true,
		   success:function(data){
				
				var str="";
			   for(var p in data){
						
						str=str+"<li><div class='purple_json_content'><span class='sub_heading'>"+data[p].heading+"</span><span class='content'>"+data[p].content+"</span></div></li>";
						
														
				}
				
					
				$(".aboutIonSlider ul").append(str);
				 
				$(".aboutIonSlider .carousel").jCarouselLite({
					btnNext: ".aboutIonSlider .next",
					btnPrev: ".aboutIonSlider .prev",
					visible: 1,
					speed: 500,
					circular: false
					
				});
				
				
		   },
		   error:function(){
			 
			 
			 //alert(" Failed to get data . " );  
		   }
	   });}
	function loadJSONresources() {
	var str="";
	$("#homeresource #resource-demo").remove();
	var mynewstr='<div class="custom-container resourceSlider" id="resource-demo"><a href="#" class="prev"><i class="fa fa-angle-left"></i></a><div class="carousel"><ul></ul></div><a href="#" class="next"><i class="fa fa-angle-right"></i></a><div class="clear"></div></div>';
	$("#homeresource").append(mynewstr);
	
	
	jQuery.ajax({
	url:'/dotcom/TCSSMB/json/resources.json',
	dataType:'JSON',
	async:true,
	success:function(data){
	
	// for(var x in data){
	totalVer=data[mypagename].length;
	str='';
	for(p=0;p<totalVer;p++){
	
	var a= 'data.'+mypagename+'['+p+'].bgClass';
	a=eval('(' + a + ')');
	
	var b= 'data.'+mypagename+'['+p+'].iconClass';
	b=eval('(' + b + ')');
	
	var c= 'data.'+mypagename+'['+p+'].heading';
	c=eval('(' + c + ')');
	
	var d= 'data.'+mypagename+'['+p+'].text';
	d=eval('(' + d + ')');
	
	var e= 'data.'+mypagename+'['+p+'].href';
	e=eval('(' + e + ')');
	
	//str=str+"<li><label>"+c+"</label><div class='eachresc'><div class='imgcont "+a+"' ><i class='fa "+b+"'></i></div><span class='text'>"+d+"</span><div class='dvrescdownload'><a href='"+e+"'><span data-hover='Download'>Download</span></a></div></div></li>";
if(p<3){
	str=str+"<li><label>"+c+"</label><div class='eachresc'><a class='imgcont "+a+"' href="+e+"></a><span class='text'>"+d+"</span></div></li>";
}
	}
	
	//}
	
	//$(".resourceSlider ul").append(str+"<li><label>&nbsp;</label><div class='eachresc'><a class='imgcont rReadMore' href='#'><span>Read More...</span></a><span class='text'>&nbsp;</span></div></li>");
	//$(".resourceSlider ul").append(str);
	
	var winwid=0.882*$(window).width();
	winwid=Math.round(winwid);
	
	
	
	$("#resource-demo").width(winwid).css("margin","0 auto");
	
	//if(counter==0){
	
	if(winwid>1024 && winwid<1600){	
	$(".resourceSlider .carousel").jCarouselLite({
		btnNext: ".resourceSlider .next",
		btnPrev: ".resourceSlider .prev",
		visible: 5,
		speed: 500,
		scroll: 5,
		circular: true
	});
	
	if(totalVer<5){
		$("#resource-demo .carousel").css("margin-left",'calc((100% - '+222*totalVer+'px) /2)');
		$("#resource-demo a.prev, #resource-demo a.next").hide();
	}
	
	
	}
	else if(winwid>1600){	
	
	$(".resourceSlider .carousel").jCarouselLite({
		btnNext: ".resourceSlider .next",
		btnPrev: ".resourceSlider .prev",
		visible: 7,
		speed: 500,
		scroll: 7,
		circular: true
	});
	
	if(totalVer<7){
		$("#resource-demo .carousel").css("margin-left",'calc((100% - '+222*totalVer+'px) /2)');
		$("#resource-demo a.prev, #resource-demo a.next").hide();
	}
	
	}
	//}
	
	},
	error:function(){
	//alert(" Failed to get data . " );  
	}
	});}
	function loadTestimonials() {
	jQuery.ajax({
	url:'/dotcom/TCSSMB/json/testimonials.json',
	dataType:'JSON',
	async:true,
	success:function(data){
	
	var str="";
	var testipgname='';
	/* for(var p in data){
	str=str+"<li><div class='content'><span>"+data[p].content+"<label><span class='uppercase'><b>"+data[p].name+" </b></span> , "+data[p].post+"<br /><div>"+data[p].company+"</div></label></div></li>";
	}*/
	
	testipgname=mypagename;
	
	if(mypagename!='ion' && mypagename!='education' && mypagename!='manufacturing' && mypagename!='cms' && mypagename!='learningexchange' && mypagename!='pharma' && mypagename!='auto' && mypagename!='process' && mypagename!='digitalevaluation' && mypagename!='assessment')
	testipgname='ion';
	
	totalVer=data[testipgname].length;
	//alert(totalVer);
	for(p=0;p<totalVer;p++){
	
	var a= 'data.'+testipgname+'['+p+'].content';
	a=eval('(' + a + ')');
	// alert(a.length);
	if(a.length<250)
	a=a+"<span style='visibility:hidden; display:inline;' class='deldiv'>The quality of evaluation has improved due to reduction in timelines and auto totalling functions in the software The quality of evaluation has improved due to reduction in timelines and auto totalling functions in the software</span>"
	
	var b= 'data.'+testipgname+'['+p+'].name';
	b=eval('(' + b + ')');
	
	var c= 'data.'+testipgname+'['+p+'].post';
	c=eval('(' + c + ')');
	
	var d= 'data.'+testipgname+'['+p+'].company';
	d=eval('(' + d + ')');
	
		
	str=str+"<li><div class='content'><span><div class=test-data>"+a+"</div><label><span class='uppercase'><b>"+b+" </b></span> , "+c+"<br /><div>"+d+"</div></label></div></li>";
	
	}
	 
	
	
	
	if(totalVer==1)
	$("#testimo-demo a.prev, #testimo-demo a.next").hide();
	
	
	$(".testimoSlider ul").append(str);
	

	/*if($(window).width()>=280 && $(window).width()<=1024)			
	$("#testimo-demo .carousel").height(200);*/
	 
	$(".testimoSlider .carousel").jCarouselLite({
	btnNext: ".testimoSlider .next",
	btnPrev: ".testimoSlider .prev",
	visible: 1,
	speed: 500,
	circular: false	,
	afterEnd:function(a){
		
	
						
				 
			 
	 	  
		
		//centerdiv('.content');
		/*if($(window).width()>=280 && $(window).width()<=1024)
		{
			var mylft=$("#testimo-demo ul").css("left");
			mylft=mylft.substring(1,mylft.length-2);
			mylft=parseInt(mylft);
			
							
	
		 	$("#testimo-demo li").each(function(i){		
			//alert($(this).height())				
				if(mylft==Math.round($(this)[0].offsetLeft)){
					$("#testimo-demo li").animate({
							"height":$(this).height()							 
					},500, function(){
						//alert('ooo')
			          //  centerdiv('.content');
						});	
					
				}
			}); 
	}*/
	}
	});
	
	 
	
	
	$(".deldiv").remove();
	
	},
	error:function(){
	//alert(" Failed to get data . " );  
	},
	
	});}
	function loadJSONBanners_inner() {
	
	var dType=bannerType();
	
	
	
	jQuery.ajax({
	url:'json/banners_inner.json',
	dataType:'JSON',
	async:true,
	success:function(data){
	var str="";
	if(dType=='desktop'){				
	var src='data.'+mypagename+'[0].src';
	src=eval('(' + src + ')');
	str=src;
	
	}
	else if(dType=='ipad'){	
	var src='data.'+mypagename+'[1].src';
	src=eval('(' + src + ')');
	str=src;
	
	}
	else if(dType=='mobile'){
	var src='data.'+mypagename+'[2].src';
	src=eval('(' + src + ')');
	str=src;
	
	}
	
	
	$(".inner_banner img").attr("src",str);
	
	Animate();	
	
	if(($(window).width()>=330) && ($(window).width()<=1024)){
	$(".inner_banner img").css("height",Math.round(0.6*$(window).width()));
	$(".inner_banner .imgbanner").css("left",-$(window).width());
	}
	
	$(".Scrolling_content_inner").css("opacity",0);
	/*set margin top for scrolling content starts*/
	setTimeout(function(){									
	$(".Scrolling_content_inner").css("margin-top",parseInt($('header').height()+$(".imgbanner img").height()));	
	$(".Scrolling_content_inner").animate({
			'opacity':1						
	},'slow');
	},500);				
	/*set margin top for scrolling content ends*/
	}
	});}
	function loadJSONBanners() {
		
		var dType=bannerType();
		
		//alert(mypagename);
		
		jQuery.ajax({
		   url:'/dotcom/TCSSMB/json/banners.json',
		   dataType:'JSON',
		   async:true,
		   success:function(data){
				
				var str="";
				var str1='';
	
					var len=data[mypagename].length;				
						
						for(x=0;x<len;x++){
							
							var tgHead='data.'+mypagename+'['+x+'].taglineHead';
							tgHead=eval('(' + tgHead + ')');
							
							var tg='data.'+mypagename+'['+x+'].tagline';
							tg=eval('(' + tg + ')');
							
							var thref='data.'+mypagename+'['+x+'].href';
							thref=eval('(' + thref + ')');
							
							  var str1=str1+"<li><span class='bann_heading'>"+tgHead+"</span> <span class='bann_text'>"+tg+"<blink>|</blink></span></li>"
							
							 var src='data.'+mypagename+'['+x+'].src';
							src=eval('(' + src + ')');
							//str=str+"<li><div class='lftcont'>"+str1+"<br /><div class='dvbann_readmore'><a href=' "+thref+" ' ><span data-hover='READ MORE +'>READ MORE +</span></a></div></div></li>";
							$('.banButtons').append("<a href='javascript:void(0)'></a>");
						}
						
						$(".home_banner .lftcont").html(str1);
						//$(document).find('.banButtons').find('a:eq(0)').addClass('slctBtn1');
						
								
				/*		
				if($(".rslides").length>=1)
				{
				$(".rslides").html(str);
				
				
					
					//$(".home_banner .lftcont").html(str1);
													  
				
				
				 /*$(".rslides").responsiveSlides({
				  auto: true,             // Boolean: Animate automatically, true or false
				  speed: 1200,            // Integer: Speed of the transition, in milliseconds
				  timeout: 5000,          // Integer: Time between slide transitions, in milliseconds
				  pager: true,           // Boolean: Show pager, true or false
				  nav: false,             // Boolean: Show navigation, true or false
				  random: false,          // Boolean: Randomize the order of the slides, true or false
				  pause: true,           // Boolean: Pause on hover, true or false
				  pauseControls: true,    // Boolean: Pause when hovering controls, true or false
				  prevText: "Previous",   // String: Text for the "previous" button
				  nextText: "Next",       // String: Text for the "next" button
				  maxwidth: "",           // Integer: Max-width of the slideshow, in pixels
				  navContainer: "",       // Selector: Where controls should be appended to, default is after the 'ul'
				  manualControls: "",     // Selector: Declare custom pager navigation
				  namespace: "rslides",   // String: Change the default namespace used
				  before: function(){
					  },   // Function: Before callback
				  after: function(){				 
				 }     // Function: After callback
				});
				
				}*/
				Animate();	
				/*
				if(($(window).width()>=300) && ($(window).width()<=1024)){
					$(".home_banner img").css("height",Math.round(0.6*$(window).width()));
					$(".rslides li").css("left",-$(window).width());
					$(".home_banner .lftcont").css("width",$(window).width()-5).css("left",$(window).width());
					
				}
				else{
					$(".rslides li").css("right",0);
				}*/
				/*			
				$(".Scrolling_content").css("opacity",0);
				 //set margin top for scrolling content starts
					setTimeout(function(){									
						$(".Scrolling_content").css("margin-top",parseInt(window.innerHeight)-20);
								
						if(($(window).width()>=300) && ($(window).width()<=1024))	
						
						$("ul.rslides_tabs").hide();
						$(".Scrolling_content").animate({
								'opacity':1						
						},'slow');
					},500);				
				//set margin top for scrolling content ends
				*/
		   },
		   error:function(){
			//  alert(" Failed to get data . " );  
		   }
	   });
	}
	 var shwban=function(){
	
	//alert(banLen);	
	
	if(banK==banLen){banK=0;}
	
	//$('ul.lftcont li').removeAttr('style');
	 
	$('ul.lftcont li').find('.bann_heading').removeClass('type');		
	$('ul.lftcont li').find('.bann_text').removeClass('type2');			
	$('ul.lftcont li').eq(banK).find('.bann_heading').addClass('type');
	$('ul.lftcont li').eq(banK).find('.bann_text').addClass('type2');
	
	$(document).find('.banButtons a').removeClass('slctBtn1');
	$(document).find('.banButtons').find('a:eq('+banK+')').addClass('slctBtn1');
	
	banK=banK+1;
	}
	
	
	$(document).ready(function(){
							   
	/* for resources starts*/							   
							 
	
	
	if($(window).width()>=280 && $(window).width()<=550)
	{
		var getdivlen=$(".ResBlockC div.resCir").length;
		
		if(getdivlen>=2){
			$(".ResBlockC div.resCir").hide();
			$(".ResBlockC div.resCir").eq( getdivlen-2 ).show();
			$(".ResBlockC div.resCir").eq( getdivlen-1 ).show();
		}
		
		
	}
	
	else if($(window).width()>=551 && $(window).width()<=850){
		
		var getdivlen=$(".ResBlockC div.resCir").length;
		
		if(getdivlen>=4){
			$(".ResBlockC div.resCir").hide();
			$(".ResBlockC div.resCir").eq( getdivlen-4 ).show();
			$(".ResBlockC div.resCir").eq( getdivlen-3 ).show();
			$(".ResBlockC div.resCir").eq( getdivlen-2 ).show();
			$(".ResBlockC div.resCir").eq( getdivlen-1 ).show();
		}
		
	}
	
	var reslength=$(".ResBlockC").children("div.resCir:visible").length;						 
	$(".ResBlockC").width(parseInt(reslength*150)+(reslength*30));
							   
	/* for resources ends*/							   
	
		
	$(".resCir a.more_link").attr("href","/dotcom/TCSSMB/resources/resources.html");

	$(".youtubeimage_icon").after("<img src='images/play_icon.png' class='' />");						   
							   
	
	if($(window).width()>=280 && $(window).width()<=420)
	$(".inner_videoshow iframe").css("width",$(window).width()-20);		
	$(".rght_bann_btn").css("left",$(window).width()-40);
	$('.hm_orange_box').addClass('showBox1');
			 
		
	if($(".Scrolling_content_inner").length>=1)
	{
		if(mypagename!='search'){
		//loadJSONBanners_inner();
		}
		else if(mypagename=='search')
		{
			$('header').css('top',0);
			$(".Scrolling_content_inner").css('top','135px');
		}
	}
	else{
	loadJSONBanners	();
	}
	
	
	if((mypagename!='contactus') && (mypagename!='search'))
	{
		
	 //loadJSONabt_iON();
	  //loadJSONresources();
	  
	   $(".testimoSlider").empty().append('<a href="#" class="prev"><i class="fa fa-angle-left"></i></a><div class="carousel"><ul></ul></div><a href="#" class="next"><i class="fa fa-angle-right"></i></a><div class="clear"></div>');
	  
	   
	    setTimeout(function(){ 
		loadTestimonials();  
		},200);
	    setTimeout(function(){ 
		var arowH= ($(".testimonials").outerHeight()/2.5); 
	    $("#testimo-demo a.prev, #testimo-demo a.next").css('margin-top',arowH); 
		  $("#testimo-demo .content").css({
					   "height":$(".testimoSlider .carousel").height(),
					    "width":$(".testimoSlider .carousel").width()								 
					});		
		},600);
		
		
				 	
	
	}
	  
	  
	function RemoveNavClass(){
		//$(".head_rght_cont li a").removeClass('nav_selected');
		 
	}
	  
	/* for parallax effect*/
	if(!(isiPhone || isiPad || isiPod ||  isAndroid || isBlackBerry || isWindowsPhone)){
	
	if($('.prod_info').length>=1){ 
	
	var inview = new Waypoint.Inview({
	  element: $('.prod_info'),
	  enter: function(direction) {
		 
		$(".head_rght_cont li a").removeClass('nav_selected');
		$("a.ipro").addClass('nav_selected');
		$(".prod_info").addClass("common_parallax");
			$(".logo_container div").removeClass('animatesize');
		
	  }
	 });
	}
	
	if($('.common_abtion').length>=1){
	var inview1 = new Waypoint.Inview({
		  element: $('.common_abtion'),
		  enter: function(direction) {
		 
		$(".head_rght_cont li a").removeClass('nav_selected');
		$("a.iabt").addClass('nav_selected');
		$(".common_abtion").addClass("common_parallax");
			$(".logo_container div").removeClass('animatesize');
		  }
		 }); 
	
	}
	
	if($('.testimonials').length>=1){
		
		var inview2 = new Waypoint.Inview({
		  element: $('.testimonials'),
		  enter: function(direction) {
			 
			$(".head_rght_cont li a").removeClass('nav_selected');
			$(".testimonials").addClass("common_parallax");
				//$(".logo_container div").removeClass('animatesize');
		  }
		});
	}
	
	if($('.resources').length>=1){
	var inview3 = new Waypoint.Inview({
	  element: $('.resources'),
	  enter: function(direction) {
		 
		$(".head_rght_cont li a").removeClass('nav_selected');
		$("a.ires").addClass('nav_selected');
		
		$(".resources").addClass("common_parallax");
		 
	   }
	 });
	}
	
	if($('.customer_logos').length>=1){  
	var inview4 = new Waypoint.Inview({
	  element: $('.customer_logos'),
	  enter: function(direction) {
	 
		$(".head_rght_cont li a").removeClass('nav_selected');
		$("a.icus").addClass('nav_selected');
		//$(".customer_logos").addClass("common_parallax");
		$(".logo_container div").addClass('animatesize');
	  }
	 }); 
	}
	
	
	
	}else{$(".logo_container div").addClass('animatesize');}//parallax effect ends
	
	
	  
	  
	 //if((isiPhone || isiPad || isiPod ||  isAndroid || isBlackBerry || isWindowsPhone)){
		 if($(window).width()>=280 && $(window).width()<=1024){
		   $(".prod_info, .common_abtion, .testimonials, .resources, .customer_logos").css("opacity",1);
		   $("body").css("overflow-x","hidden")
	 }
	/* for parallax effect*/
	
	
	
	$(".head_rght_cont li a").on("click",function(i){
	
	
	
	 var getclass=$(this).attr('class');
	
	switch(getclass){
			
			case "ipro":
			$('html,body').animate({scrollTop:$("a[name=nameproinfo]").offset().top-90}, 1000,function(){
				$(".head_rght_cont li a").removeClass('nav_selected');
				$("a.ipro").addClass('nav_selected');});
			return false;
		 
			break;
			
			case "iabt": 
			$('html,body').animate({scrollTop:$("a[name=nameabtion]").offset().top-90}, 1000,function(){
				$(".head_rght_cont li a").removeClass('nav_selected');
				$("a.iabt").addClass('nav_selected');});
			return false;
			break;	
			
			case "ires":
			$('html,body').animate({scrollTop:$("a[name=nameres]").offset().top-90}, 1000,function(){
				$(".head_rght_cont li a").removeClass('nav_selected');
				$("a.ires").addClass('nav_selected');});
			return false;
			break;	
			
			case "icus":
			$('html,body').animate({scrollTop:$("a[name=namecustomers]").offset().top-90}, 1000,function(){
				$(".head_rght_cont li a").removeClass('nav_selected');
				$("a.icus").addClass('nav_selected');});
			return false;
			break;
			
			
		}
			
			
	});
	
	
	
	  
	
	
	$(window).scroll(function(){
		 
			$(".dvsearch").find('input[type=text]').removeClass("txtsearchbox_big");			  
			var scrollerTop = $(window).scrollTop();
			var bottom = $(document).height();
			var divWidth= parseInt(window.innerWidth);	

		//$('.dvlogo').html(divWidth);// check scrollerTop value in logo	

		if(pageURL.indexOf("cloudplus")>=0){
			if(scrollerTop>800){$('.ResBlock1').fadeIn().addClass("animateUp");}else{$('.ResBlock1').fadeOut().removeClass("animateUp");} 

		}
		else{
		 
				
		if(scrollerTop>1500){$('.ResBlock').fadeIn().addClass("animateUp");}else{$('.ResBlock').fadeOut().removeClass("animateUp");} 
		if(scrollerTop>1100){$('.ResBlock1').fadeIn().addClass("animateUp");}else{$('.ResBlock1').fadeOut().removeClass("animateUp");} 
		if(scrollerTop>1100){$('.ResBlock2').fadeIn().addClass("animateUp");}else{$('.ResBlock1').fadeOut().removeClass("animateUp");} 
		
	<!--	if(scrollerTop>700){$('.ResBlock1.ResBlock_temp').fadeIn().addClass("animateUp");}else{$('.ResBlock1.ResBlock_temp').fadeOut().removeClass("animateUp");}-->
		
		}

		

		
		if(scrollerTop==0){
			 
			$(".head_rght_cont li a").each(function(){	$(this).removeClass('nav_selected');});
			$(".read-more-section").hide();
			$(".read-more").show();
		 }
		if(scrollerTop>1900){$(".read-more-section").hide();$(".read-more").show(); }
		if(scrollerTop<860){
			 
			$(".mt1, .mt2, .mt0").css("margin-top","220%");
			}else{
			$(".mt1").css("margin-top","70%");
			$(".mt2").css("margin-top","50%");
			$(".mt0").css("margin-top","0%");
			}
		  
		  
	   if(divWidth>1000){
	 
	   setTimeout(function(){
		if(scrollerTop >= 250)
		{	 
		   // $('.dvlogo').html("<div style='color:#f00;'> Top: "+scrollerTop+"| T height: "+(bottom-1000)+"</div>");
			$(".bookdemo_livechat").removeClass("bookdemo_livechat_parallax_back").addClass("bookdemo_livechat_parallax");
			$('header').addClass('collapse');
			RemoveNavClass()
			$('.mouse').fadeOut();
			if(scrollerTop>(bottom-1000)){$(".bookdemo_livechat").removeClass("bookdemo_livechat_parallax").addClass("bookdemo_livechat_parallax_back"); }  
			//if(frst==0){
			$('.hm_orange_box').addClass('showBox1');
			//window.frst=1
			//}
		
			
		}
		else if(scrollerTop<300)
		{   $(".bookdemo_livechat").removeClass("bookdemo_livechat_parallax").addClass("bookdemo_livechat_parallax_back");
			$('header').removeClass('collapse');
			$('.mouse').fadeIn();
			
			// $('.hm_orange_box').removeClass('showBox1');
			
			
		}
		 
		  },50);
		}	
	   if(divWidth<500){ $('.hm_orange_box').addClass('showBox1');}
			var inview_burmenu = new Waypoint.Inview({
			  element: $('.dvBurCont'),
			  exited: function(direction) {
				if($(".dvBurCont_parallax").css("opacity")==1)
				$(".btn-menu").trigger("click");
				
				
			  }
			 }); 
					
							  
	});
	
	
	windowHeight=document.body.clientHeight;
	
							   
						   
							   
							   
		$(".hm_orange_box_cont").hover(function(){
			if(!(isiPhone || isiPad || isiPod ||  isAndroid || isBlackBerry || isWindowsPhone)){									
				GetBgPos(this);
				$(this).addClass("hm_orange_box_cont_hover");
				$(this).find(".hm_prod_imgs span").css("background-position",myBgPos);
			}
				
		},function(){
			$(this).removeClass("hm_orange_box_cont_hover");
			$(this).find(".hm_prod_imgs span").css("background-position","");
		});
		
		
		$(".edu_orange_box_cont").on("click",function(){
												
				
				if(!($(this).hasClass("edu_orange_box_cont_hover"))){
					GetBgPos(this);
					$(this).addClass("edu_orange_box_cont_hover");
					$(this).find(".edu_prod_imgs span").css("background-position",myBgPos);
					
					var arrid=$(this).next(".arrow-down").attr("id");

					if(arrid=="arr_pro")
					{	
						$("#"+arrid).show();
						$("#arr_sec").hide();
						$("#arr_sec").prev().removeClass("edu_orange_box_cont_hover");
						$("#arr_sec").prev().find(".edu_prod_imgs span").css("background-position","0 0");
						$("#edu_sec_list").slideUp(700);
						$("#edu_pro_list").slideDown(700);
						$(".moreinfo_pro_sec").html('CLICK THE PRODUCTS TO KNOW MORE');
						
					}
					else if(arrid=="arr_sec")
					{	
						$("#"+arrid).show();
						$("#arr_pro").hide();
						$("#arr_pro").prev().removeClass("edu_orange_box_cont_hover");
						$("#arr_pro").prev().find(".edu_prod_imgs span").css("background-position","-212px 0");
						$("#edu_pro_list").slideUp(700);
						$("#edu_sec_list").slideDown(700);
						$(".moreinfo_pro_sec").html('CLICK THE SECTORS TO KNOW MORE');
					}
				}
				
				
				/*if($(this).attr("id")=="lnkproducts")
				{
					
					$("#edu_pro_list .moreproducts").each(function(){									 
						var mylen=$(this).find(".inner_pro_box").length;
						if(mylen>=3)
						$(this).width(320*3);
						
						if($(window).width()>=320 && $(window).width()<=900)
						$(this).width('');
						
					});
					
	
				}*/
				
	
				
		});
		
		
		
		
		$(".manu_orange_box_cont").hover(function(){
												
				GetBgPos(this);
				$(this).addClass("manu_orange_box_cont_hover");
				$(this).find(".manu_prod_imgs span").css("background-position",myBgPos);
				
				
		},function(){
			$(this).removeClass("manu_orange_box_cont_hover");
			$(this).find(".manu_prod_imgs span").css("background-position","");
		});
		
		
		
		
		$(".btn_bann_scroll a").hover(function(){
			$(this).parent().removeClass("bounce");		
				
		},function(){
			$(this).parent().addClass("bounce");		
		});
		
		
		
		
	  $(".footeryear").html((new Date).getFullYear());
	
		$(document).on("click","ul.accord a",function(e){
			
			$("ul.accord ul").slideUp();
			$("ul.accord a").children('i').removeClass("fa-sort-up").addClass("fa-sort-down").css("line-height","inherit");
													  
			if($(this).next('ul').css('display')=='none')	{
				$(this).next('ul').slideDown();
				$(this).children('i').removeClass("fa-sort-down").addClass("fa-sort-up").css("line-height","21px");
				
			}
			else{
				$(this).next('ul').slideUp();
				$(this).children('i').removeClass("fa-sort-up").addClass("fa-sort-down").css("line-height","inherit");
			}
				
		 });	
	  
	
	
	
	  $(document).on("click","#sitesearch",function(e){			
					$(".dvsearch").find('input[type=text]').toggleClass("txtsearchbox_big");								
					$("#keyword").focus();					  
					/*if($(this).find("i").hasClass("fa-search")){
						$(".dvsearch").find('input[type=text]').addClass("txtsearchbox_big");
						//$(this).find("i").removeClass("fa-search-plus").addClass("fa-search-minus");
					}
					else
					{
						$(".dvsearch").find('input[type=text]').removeClass("txtsearchbox_big");
						//$(this).find("i").removeClass("fa-search-minus").addClass("fa-search-plus");
					}*/
	   });
	 $(document).on("click",function(e) {
	
			if ($(e.target).attr('class') != 'x' && (!$('.x').find(e.target).length) && $(e.target).attr('class') != 'txtsearchbox txtsearchbox_big') {
			   $(".dvsearch").find('input[type=text]').removeClass("txtsearchbox_big");
			   
			}
	   });
	
		$(".mainDropDown, .mobile_sel_pro_sec").on("click",function(){
			$(".btmDropdown , .btmDropdownM").show();						   
											   
		});
	 $(document).on("click",function(e) {
	
			if ($(e.target).attr('class') != 'mainDropDown' && (!$('.mainDropDown').find(e.target).length) ) {
			   $(".btmDropdown , .btmDropdownM").hide();		
			   
			}
	   });  
		//alert($(".burMenubuttons .dvheadsignin").outerWidth());
	
	 
	  
	 $(".btn-menu").on("click",function(){
			//$(this).css("position","absolute");
		if(!($(this).hasClass("btn-menu-open")))
		{
			$(this).addClass("btn-menu-open");
			$(window).scrollTop(0);  
			$(".dvBurCont").removeClass("dvBurCont_parallax_back").addClass("dvBurCont_parallax");			
			
		}
		else{
			$(this).removeClass("btn-menu-open");
			$(window).scrollTop(0);    
			$(".dvBurCont").removeClass("dvBurCont_parallax").addClass("dvBurCont_parallax_back");	
			//$(this).css("position","fixed");
		}
	 });
	 
	
	 
	
	if($(".inner_pro_box").children(".inner_pro_box_hover_out").length==0){
		if(!(isiPhone || isiPad || isiPod ||  isAndroid || isBlackBerry || isWindowsPhone)){	
			$('<div/>', {
			class: 'inner_pro_box_hover_out',
			}).appendTo(".inner_pro_box");
		}
	}
	
	$(".inner_pro_box").hover(function(){
		if(!(isiPhone || isiPad || isiPod ||  isAndroid || isBlackBerry || isWindowsPhone)){								   
			$(this).children(".inner_pro_box_hover_out").removeClass("inner_pro_box_hover_out").addClass("inner_pro_box_hover");
			$(this).children("a").css("color",'#ffffff');
			var getId=$(this).children("a").children("div[class=proimg]").attr("id");
			SetHoverSectorBg(getId);
			$("#"+getId).css("background-position",myBgSector);
			$(this).find('a').css("opacity",0.5);		
			$(this).find('a').animate({
				opacity:1				 
			 },1000);
			
		
		}
	},function(){
		$(this).children(".inner_pro_box_hover").addClass("inner_pro_box_hover_out").removeClass("inner_pro_box_hover");
		$(this).children("a").css("color",'');
		var getId=$(this).children("a").children("div[class=proimg]").attr("id");
		$("#"+getId).css("background-position","");
		$(this).find('a').css("opacity",0.5);
		$(this).find('a').animate({
			opacity:1				 
		 },1000);
	});
	
	
	
	
	/*$("#edu_sec_list .moreproducts").each(function(){
			var mylen=$(this).find(".inner_pro_box").length;
			if(mylen>=3)
			$(this).width(320*3);
			else if(mylen==2)
			$(this).width(320*2);
			
			
			if($(window).width()>=320 && $(window).width()<=900)
			$(this).width('');
			
			
	});*/
	
	
	
	$(".res_nav li a").on("click",function(){	
										   
	$("li.res_selected").removeClass("res_selected");
	$(this).parent('li').addClass("res_selected");
		mypagename=$(this).html().toLowerCase();
		mypagename=mypagename.replace(/\s+/g, '');
		counter=counter+1;
		//loadJSONresources();
		
			
	});
	
	
	
	$(".inputbox input[type=text], .inputbox span").on("click",function(){
																		
		
		
		var tagname=$(this).prop("tagName").toLowerCase();
		
			if(tagname=='input'){
				$(this).next().find('label').removeClass('filled_out').addClass('filled');
				$(this).focus();
			}
			else if(tagname=='span'){
				$(this).find('label').removeClass('filled_out').addClass('filled');
				$(this).prev().trigger('focus');
			}
			
		
			
		
	});
	
	$(".inputbox input[type=text]").on("blur",function(){
			if($(this).val()=='')
			$(this).next().find('label').removeClass('filled').addClass('filled_out');														   
	});
	
	/*Video embed  starts*/
	$('div[class$=_videoshow]').on('click', function() {
	
		var myvideoid=$(this).attr('id');
	
		switch(myvideoid){
			case "eduvideo":
				$('#eduvideo').html('<iframe width="480" height="300" src="https:///www.youtube.com/embed/pHjLXeTDmKg?autoplay=1" frameborder="0" allowfullscreen></iframe>');
				break;
	
			case "manuvideo":
				$('#manuvideo').html('<iframe width="480" height="300" src="https://www.youtube.com/embed/gCU_YyxO5HA?autoplay=1" frameborder="0" allowfullscreen></iframe>');
				
			case "homevideo":
				$('#homevideo').html('<iframe width="480" height="300" src="https://www.youtube.com/embed/5VYaf5TJPoc?autoplay=1" frameborder="0" allowfullscreen></iframe>');	
					
			case "auto":
				$('#auto').html('<iframe width="480" height="300" src="https://www.youtube.com/embed/Mp9Wh4aY4lo?autoplay=1" frameborder="0" allowfullscreen></iframe>');
				
				case "pharma":
				$('#pharma').html('<iframe width="480" height="300" src="https://www.youtube.com/embed/mh-UrZ4SQyg?autoplay=1" frameborder="0" allowfullscreen></iframe>');
				
				case "process":
				$('#process').html('<iframe width="480" height="300" src="https://www.youtube.com/embed/F_W0Gt7yL90?autoplay=1" frameborder="0" allowfullscreen></iframe>');
				
				
				
				case "recexambodies":
				$('#recexambodies').html('<iframe width="480" height="300" src="https://www.youtube.com/embed/k40YcSQON-k?autoplay=1" frameborder="0" allowfullscreen></iframe>');
				
				case "schoolboard":
				$('#schoolboard').html('<iframe width="480" height="300" src="https://www.youtube.com/embed/k40YcSQON-k?autoplay=1" frameborder="0" allowfullscreen></iframe>');
				
				case "assessment":
				$('#assessment').html('<iframe width="480" height="300" src="https://www.youtube.com/embed/L99Xeak8Dbk?autoplay=1" frameborder="0" allowfullscreen></iframe>');
				
				case "cms":
				$('#cms').html('<iframe width="480" height="300" src="https://www.youtube.com/embed/L99Xeak8Dbk?autoplay=1" frameborder="0" allowfullscreen></iframe>');
				
				case "demat":
				$('#demat').html('<iframe width="480" height="300" src="https://www.youtube.com/embed/ury9M_WGAY8?autoplay=1" frameborder="0" allowfullscreen></iframe>');
				
				case "digital":
				$('#digital').html('<iframe width="480" height="300" src="https://www.youtube.com/embed/pHjLXeTDmKg?autoplay=1" frameborder="0" allowfullscreen></iframe>');
				
				case "lxpage":
				$('#lxpage').html('<iframe width="480" height="300" src="https://www.youtube.com/embed/-EOXPgfA01Y?autoplay=1" frameborder="0" allowfullscreen></iframe>');
				
				case "higheredu":
				$('#higheredu').html(' <iframe width="480" height="300" src="https://www.youtube.com/embed/UKOSJEmwvQg?autoplay=1" frameborder="0" allowfullscreen></iframe>');
				
		case "preptest":
				$('#preptest').html(' <iframe width="480" height="300" src="https://www.youtube.com/embed/DNjHYQoNNPU?autoplay=1" frameborder="0" allowfullscreen></iframe>');		
				
				break;	
		}
	
	});
	
	$('a.youtube').each(function() {
		//alert(this.href);
		var id = getYoutubeID( this.href );
		this.id = id;
		var thumb_url = "http://img.youtube.com/vi/"+id+"/maxresdefault.jpg";
		$('<img class="youtubeimage_icon" width="96%" src="'+thumb_url+'" />').appendTo($('div[class$=_videoshow]'));});
	
	$( ".hm_videoshow , .edu_videoshow" ).append( "<a class='youtubeicon_image'></a>" );
	$( ".hm_videoshow_no .youtubeicon_image, .edu_videoshow_no .youtubeicon_image" ).remove();
	
	/*Video embed  ends*/ 	
	
	/*$(".head_rght_cont li a").each(function(){// alert(0)
			$(this).removeClass("nav_selected");
	});*/
	
	if(href.indexOf("nameproinfo")>=0)
	$("a.ipro").addClass("nav_selected");
	
	else if(href.indexOf("nameabtion")>=0)
	$("a.iabt").addClass("nav_selected");
	
	else if(href.indexOf("nameres")>=0)
	$("a.ires").addClass("nav_selected");
	
	else if(href.indexOf("namecustomers")>=0)
	$("a.icus").addClass("nav_selected");
	
	$(".btmDropdown").parent().css("position","relative");
	
	
	
	if($(window).width()>=320 && $(window).width()<768 && pageURL.indexOf("resources")==-1 && $(".inner_content").length>0)
	{
		
		var outerselect=$(".inner_content").children(".fltrght")[0].outerHTML;
		$(outerselect).insertBefore(".inner_content");
		$(".inner_content").children(".fltrght").hide();
		$(".inner_content").prev(".fltrght").removeClass("fltrght").addClass("fltleft");
	}
	else
	{
		$(".inner_content").children(".fltrght").show();
		$(".inner_content").prev().hide();
	}
	
	
	
	
	}); //document ready ends

	$(document).ready(function(){
		setTimeout(function(){banLen=$('ul.lftcont li').length; 
		$('.banButtons a:last-child').trigger("click");
		//document.getElementById("vid1").pause();
		//$('.pause').hide();
		//$('.play').show();
		
		},2500);
		
		
		
		if(isiPhone || isiPad || isiPod ||  isAndroid || isBlackBerry || isWindowsPhone){
			
		setTimeout(function(){  
		
				
				$('.pause').trigger("click");
				$('.play').trigger("click");
				$('.pause').trigger("click");
				$('ul.lftcont li').eq(banK-1).find('.bann_text').css('opacity','0');
				
				$('.playPause').click(function(){ 
				$('ul.lftcont li').eq(banK-1).find('.bann_text').css('opacity','0');
				})
		  
		  		//$('.home_banner .lftcont_width li').css({"text-align":"center","width":"100%"})
		  
		},2600);
        		
				
	 
        }
		
		 
		
		 
		interval=setInterval(shwban,8000);
		  
	$(document).on('click','.banButtons a', function(e){
		clearInterval(interval);
		$('ul.lftcont li').find('.bann_heading, .bann_text').removeAttr("style");
		banK=$(this).index(); 
		setTimeout(shwban,0);
		interval=setInterval(shwban,8000);
		 
		$('.pause').show();
		$('.play').hide();
		$('.bann_text').css('opacity','0');
		document.getElementById("vid1").play();
		})
		});
	$(document).ready(function(){
		//document.getElementById("vid1").pause();
		
		
		$('.playPause').click(function(){ 
		
		
			var vid = document.getElementById("vid1"); 
			if($(this).hasClass('pause')){//alert(banK);
				$(this).hide();
				$('.play').show();
				$('ul.lftcont li').find('.bann_heading').removeClass('type');		
				$('ul.lftcont li').find('.bann_text').removeClass('type2');	
	$('ul.lftcont li').eq(banK-1).find('.bann_heading').css('opacity','1').css('width','100%');
	$('ul.lftcont li').eq(banK-1).find('.bann_text').css('opacity','1').css('width','100%');
				vid.pause();
				clearInterval(interval)
				//if(banK==banLen){banK=0;}else{banK=banK-1;}
				}
			if($(this).hasClass('play')){ 
				$(this).hide();
				 
				$('.pause').show();
				//alert(banK); 
				if(banK==4){banK=0;}
				//alert(banK); 
				
				$('ul.lftcont li').find('.bann_heading, .bann_text').removeAttr("style");
				$('ul.lftcont li').eq(banK).find('.bann_heading').addClass('type');
				$('ul.lftcont li').eq(banK).find('.bann_text').addClass('type2');
				$(document).find('.banButtons a').removeClass('slctBtn1');
				$(document).find('.banButtons').find('a:eq('+banK+')').addClass('slctBtn1');
			     interval=setInterval(shwban,8000); 
				 vid.play();
				 banK=banK+1;
				
				 
				//
				
				
				}
			})
		})
	$(document).ready(function(){
		$('.scrollerContainer').each(function(){
			var mainDivCont=$(this);
			var scWidth= mainDivCont.innerWidth();
			var nWidth1=(($(this).children('.navi1').width())*2)-1;
			var arWidth=(scWidth-nWidth1);
			var chLength1=$(this).children('.ScrlArea1').children('.scrlPan').children('.scrlCNT').length;
			var scrlLeft=0;
			var scrollcount=0;
			
			$(this).children('.ScrlArea1').width(arWidth-1);
			$(this).children('.ScrlArea1').children('.scrlPan').width(arWidth*chLength1);
			$(this).children('.ScrlArea1').children('.scrlPan').children('.scrlCNT').width(arWidth);
			
			$(this).children('.rightbt').click(function(){
				if(scrlLeft>(-(arWidth*(chLength1-1)))){
				scrollcount=scrollcount+1;
				scrlLeft= -(scrollcount*arWidth);
				$(this).siblings('.ScrlArea1').children('.scrlPan').animate({'left':scrlLeft});
				if(scrlLeft<=(-(arWidth*(chLength1-1)))){$(this).addClass('dis')}
				$(this).siblings('.navi1').removeClass('dis');
				}
			})
			
			$(this).children('.leftbt').click(function(){
				if(scrlLeft<0){
				scrollcount=scrollcount-1;
				scrlLeft= -(scrollcount*arWidth);
				//scrlLeft=scrlLeft+arWidth;
				$(this).siblings('.ScrlArea1').children('.scrlPan').animate({'left':scrlLeft});
				if(scrlLeft>=0){$(this).addClass('dis');}
				$(this).siblings('.navi1').removeClass('dis');
				}
			})
			
			$(window).resize(function(){alert('0');
			scWidth=mainDivCont.innerWidth();
			nWidth1=(mainDivCont.children('.navi1').width())*2;
			arWidth=(scWidth-nWidth1);
			chLength1=mainDivCont.children('.ScrlArea1').children('.scrlPan').children('.scrlCNT').length;
			
			mainDivCont.children('.ScrlArea1').width(arWidth-1);
			mainDivCont.children('.ScrlArea1').children('.scrlPan').width(arWidth*chLength1);
			mainDivCont.children('.ScrlArea1').children('.scrlPan').children('.scrlCNT').width(arWidth);
			
			scrlLeft= -(scrollcount*arWidth);
			mainDivCont.children('.ScrlArea1').children('.scrlPan').css('left', scrlLeft);
				});
			})
		
		/*$('.imgcont')
    .animate({opacity: 0}, 'slow', function() {
        $(this)
            .css({'background-image': 'url(../images/SVG/download-arrow-new.svg)'})
            .animate({opacity: 1});
    });	*/
	
	$(window).scroll(function(){ 
        if ($(this).scrollTop() > 60) { 
            $('#scroll').fadeIn(); 
			$("a.hme").removeClass('nav_selected');
        } else { 
            $('#scroll').fadeOut(); 
			$("a.hme").addClass('nav_selected');
        } 
    }); 
    $('#scroll').click(function(){ 
        $("html, body").animate({ scrollTop: 0 }, 600); 
        return false; 
    }); 
			
		});
	$(document).ready(function() {
 	 
	
$('.fooAbout').click( function(){
	$('.iabt').trigger("click");
	});
	
 });

    
	$(window).resize(function(){ 
	var divWidth= parseInt(window.innerWidth);
	//if(divWidth>1024){
		//$('.Scrolling_content').css('margin-top',parseInt(window.innerHeight-20));
		//}else{
			//$('.Scrolling_content').css('margin-top','44%');
			//}
	if(divWidth<400){ $('header').addClass('collapse') }
	 
	 $(".testimoSlider").empty().append('<a href="#" class="prev"><i class="fa fa-angle-left"></i></a><div class="carousel"><ul></ul></div><a href="#" class="next"><i class="fa fa-angle-right"></i></a><div class="clear"></div>');
	
	  
	 
	    setTimeout(function(){ 
		loadTestimonials();  
		},200);
	     setTimeout(function(){ 
		var arowH= ($(".testimonials").outerHeight()/2.5); 
	    $("#testimo-demo a.prev, #testimo-demo a.next").css('margin-top',arowH); 
		  $("#testimo-demo .content").css({
					   "height":$(".testimoSlider .carousel").height(),
					    "width":$(".testimoSlider .carousel").width()								 
					});		
		},600);
	 
	 
	});
 
 
 
	var standalone = window.navigator.standalone,
    userAgent = window.navigator.userAgent.toLowerCase(),
    safari = /safari/.test( userAgent ),
    ios = /iphone|ipod|ipad/.test( userAgent );

if( ios ) {
    if ( !standalone && safari ) {
        
	/* alert($(window).height());
		$('#vid1').css('border','5px solid #000');
		$('#vid1').css('min-height', '35% !important'); 
		
		$('#vid1').css('min-width',$(window).height());*/ 
	 
		
    } else if ( standalone && !safari ) {
         alert('safari 2');
    } else if ( !standalone && !safari ) {
          alert('safari 3');
    };
} else {
    //not iOS
	 
		 
	 
};


	
 // JavaScript Document// JavaScript Document