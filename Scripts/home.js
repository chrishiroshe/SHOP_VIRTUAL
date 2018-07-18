
$(document).ready(function () {
	/*==================================
	Parallax Effect All
	====================================*/		
		 if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		 }else {
		     var image1 = $(".parallax-image-1");
		     var image2 = $(".parallax-image-2");
		     if (image1 != null && image1 != undefined && image1.offset() != undefined) {
		         var offsetParallax1 = image1.offset().top;
		         image1.parallax("50%", offsetParallax1, 0.1, true);
		     }
		     if (image2 != null && image2 != undefined && image2.offset() != undefined) {
		         var offsetParallax2 = image2.offset().top;
		         image2.parallax("50%", offsetParallax2, 0.1, true);
		     }
		 }

   /*==================================
	Home Page Slider 
	====================================*/
	 $('.slider-v1').cycle({
        //Specify options
        fx: 'scrollHorz', //Name of transition effect 
        slides: '.slider-item',
        timeout: 5000, // set time for nex slide 
        speed: 1200,
        easeIn: 'easeInOutExpo', // easing 
        easeOut: 'easeInOutExpo',
        pager: '#pager2', //Selector for element to use as pager container 
    });


    $('.slider-v2').cycle({
        //Specify options
        fx: 'scrollHorz', //Name of transition effect 
        slides: '.slider-item',
        timeout: 5000, // set time for nex slide 
        speed: 1200,
        easeIn: 'easeInOutExpo', // easing 
        easeOut: 'easeInOutExpo',
        pager: '#pager', //Selector for element to use as pager container 
    });	
	
	 // show loading image
    $('#loader_img').show();

    // main image loaded 
    $('.sliderImg').load(function () {
        // hide/remove the loading image
        $('#loader_img').hide();
    });

}); // end Ready