(function($) {
    $(function() {

			//setTimeout(function(){
								
			/* aboution slider starts
			
			
			var mywidth=Math.round(0.87*$(".aboutIonSlider").width());
			
			$(".aboutIonSlider .carousel").width(mywidth);

			setTimeout(function(){$(".aboutIonSlider li").height(auto);
		
				//alert($(".aboutIonSlider li").height());

			},500);*/
			
						
			/* aboution slider ends*/
			
			
							
			/* testimonial slider starts
			
			
			var mywidth=Math.round(0.9*$(".testimonials").width());
			
			$(".testimoSlider .carousel").width(mywidth);
			
			if($(window).width()>=320 && $(window).width()<600)
			{
				var mywidth=Math.round(0.7*$(".testimonials").width());			
				$(".testimoSlider .carousel").width(mywidth);
			}
			
			if($(window).width()>=601 && $(window).width()<767)
			{
				var mywidth=Math.round(0.85*$(".testimonials").width());			
				$(".testimoSlider .carousel").width(mywidth);
			}
			
			if($(window).width()>=321 && $(window).width()<=480)
			{
				
				var mywidth=Math.round(0.75*$(".testimonials").width());			
				$(".testimoSlider .carousel").width(mywidth);
			}
			else if($(window).width()>=768 && $(window).width()<1024)
			{
				var mywidth=Math.round(0.89*$(".testimonials").width());			
				$(".testimoSlider .carousel").width(mywidth);
			}
			
			setTimeout(function(){$(".testimoSlider li").height(auto);},500);
			
			*/
			/* testimonial slider ends*/
			
			
			
			
			
			/* resources slider starts 
		setTimeout(function(){	
			var winwid=0.9*$(window).width();
			winwid=Math.round(winwid);
				//alert(winwid);

			$("#resource-demo").width(winwid).css("margin","0 auto");
			
				if(winwid>=280 && winwid<=550){		
					
					$(".resourceSlider .carousel").jCarouselLite({
						btnNext: ".resourceSlider .next",
						btnPrev: ".resourceSlider .prev",
						visible: 1,
						speed: 500,
						circular: false
					});
					//var mywidth=Math.round(0.8*$("#resource-demo").width());	
					$("#resource-demo").width(265);
					$(".resourceSlider .carousel").width(198);
				}
				else if(winwid>=551 && winwid<=690){	
					
					$(".resourceSlider .carousel").jCarouselLite({
						btnNext: ".resourceSlider .next",
						btnPrev: ".resourceSlider .prev",
						visible: 2,
						scroll:2,
						speed: 500,
						circular: false
					});
					if(winwid<=600)
					{
						var mywidth=Math.round(0.68*$("#resource-demo").width());
					}
					else if(winwid>=601)
					{						
						var mywidth=Math.round(0.65*$("#resource-demo").width());
					}
					
					$(".resourceSlider .carousel").width(mywidth);
					$("#resource-demo").width(488);
				}				
				else if(winwid>=691 && winwid<=770){	
					
					$(".resourceSlider .carousel").jCarouselLite({
						btnNext: ".resourceSlider .next",
						btnPrev: ".resourceSlider .prev",
						visible: 3,
						scroll:3,
						speed: 500,
						circular: false
					});
					$("#resource-demo").width(winwid-6);
					var mywidth=Math.round(0.9*$("#resource-demo").width());			
					$(".resourceSlider .carousel").width(mywidth);
				}
				else if(winwid>=771 && winwid<1024){	
				
					$(".resourceSlider .carousel").jCarouselLite({
						btnNext: ".resourceSlider .next",
						btnPrev: ".resourceSlider .prev",
						visible: 4,
						scroll:4,
						speed: 500,
						circular: false
					});
					var mywidth=Math.round(0.9*$("#resource-demo").width());			
					$(".resourceSlider .carousel").width(mywidth);
				}
			
			
			
			
			
			
			
			
			
			},500);
			/* resources slider ends*/
			

		//
    });
})(jQuery);