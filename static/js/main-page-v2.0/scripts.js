//document.querySelector('body').setAttribute('class','main');


function detectMob() {
    const toMatch = [
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
		/Firefox/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}




// header menu
jQuery(document).ready(function() {
    jQuery('.menu-link').click(function(e) {
        jQuery('.header-menu').toggleClass('show');

        e.preventDefault();
    });
	
	if(detectMob()){
		$('body').find('[data-image]').each(function(i,el){
			$(el).attr('src', $(el).attr('data-image'));
		});
		
		$('.product-list-section').css('background-image', 'url(/static/images/main-page-2.0/product-list-section-bg.jpg)');
		$('.callback-section .inner-block').css('background-image', 'url(/static/images/main-page-2.0/callback-bg.jpg)');
		$('.advantages-section').css('background-image', 'url(static/images/main-page-2.0/advantages-bg-2.jpg)');
		
	}
	
	
	var firstPhoto = $('.product__slider-wrapper .flex-column:first .product-box:first').clone();
    var lastFlexColumn = $('.product__slider-wrapper .flex-column:last');

    if ($('.product__slider-wrapper .flex-column:last .product-box').length == 1) {
        firstPhoto.appendTo(lastFlexColumn);
    }
    //

    // РЎР»Р°Р№РґРµСЂ РґР»СЏ РїСЂРѕРґСѓРєС†РёРё
    $('.product__slider-wrapper').owlCarousel({
        items: 3,
        itemsDesktop: [1024,3],
        itemsTablet: [1023,3],
        itemsMobile : [767,1],
        singleItem : false,
        autoPlay: 7000,
        navigation: true,
        pagination: false,
        responsive: true,
        navigationText: false,
        stopOnHover: true
    });
	
	
	
	
	
	
	
	
	
	
});
// end header menu

// carousel
jQuery(function($){

    $('.carousel').owlCarousel({
        items: 2,
        itemsDesktop: [1024,2],
        itemsTablet: [1023,1],
        itemsMobile : [767,1],
        singleItem : false,
        autoPlay: 7000,
        paginationSpeed: 1600,
        navigation: true,
        pagination: true,
        responsive: true,
        paginationNumbers: false,
        navigationText: false,
        stopOnHover: true
    });

    $('.top-slider').owlCarousel({
        items: 1,
        itemsDesktop: [1024,1],
        itemsTablet: [1023,1],
        itemsMobile : [767,1],
        singleItem : false,
        autoPlay: 7000,
        paginationSpeed: 1600,
        navigation: true,
        pagination: true,
        responsive: true,
        paginationNumbers: false,
        navigationText: false,
        stopOnHover: true
    });

    $('.partners-carousel').owlCarousel({
        items: 4,
        itemsDesktop: [1024,4],
        itemsTablet: [1023,3],
        itemsTabletSmall : [767,2],
        itemsMobile : [459,1],
        singleItem : false,
        autoPlay: 7000,
        paginationSpeed: 1600,
        navigation: true,
        pagination: true,
        responsive: true,
        paginationNumbers: false,
        navigationText: false,
        stopOnHover: true
    });

    $('.certificates-carousel').owlCarousel({
        items: 4,
        itemsDesktop: [1024,4],
        itemsTablet: [1023,3],
        itemsMobile : [767,2],
        singleItem : false,
        autoPlay: 7000,
        paginationSpeed: 1600,
        navigation: true,
        pagination: true,
        responsive: true,
        paginationNumbers: false,
        navigationText: false,
        stopOnHover: true
    });
	

});
// end carousel

// tabs
$(document).ready(function(){
    // Табы в форме в слайдере (Правка)
    $('.tab-form-block .tab-link').click(function(){
        var tab_id = $(this).attr('data-tab');

        $('.tab-form-block .tab-link').removeClass('current');
        $('.tab-form-block .tab').removeClass('current');

        var parent = $(this).parents('.tab-form-block');

        if ($(this).hasClass('height')) {
            $(parent).addClass('over');
            console.log('true');
        } else {
            $(parent).removeClass('over');
        }
        $(this).addClass('current');
        $("#"+tab_id).addClass('current');
    })
    //
    // Табы в продукции (Правка)
    $('.product-info-section .tab-link').click(function(){
        var tab_id = $(this).attr('data-tab');

        $('.product-info-section .tab-link').removeClass('current');
        $('.product-info-section .tab').removeClass('current');

        $(this).addClass('current');
        $("#"+tab_id).addClass('current');
    })
	//
	
	
	$('.tab-link.form').click(function(e){
        var tab_id = $(this).attr('data-tab');
		console.log(tab_id);
    });
	
    // if($('.section-video').length > 0) {
    //     $('.b-modal .__b-popup1__').show();
    // }
});
// end tabs

// checkbox  and radio
jQuery(function($){
    $('input[type=radio], input[type=checkbox]').iCheck();
});
// end checkbox and radio
