$(function () {

    /* Social btns in manager card */
    $('.social__btns-open').on('click', function () {
        $(this).parent().find('.social__btns-container').toggleClass('active');
    });

    /* Slider for product card in catalog page */
    var productCardSlider = $('.product_item .product .pic').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        draggable: false,
        dots: true,
        infinite: false,
        speed: 0,
        swipe: false,
        responsive: [
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                draggable: true,
                speed: 300,
                swipe: true,
              }
            }
          ],
    });
    
    /* Helper for slick (move slides for hover) */
    mousemoveSlides();
    
    function mousemoveSlides() {
        if ($(window).width() > 768) {
           $('.product_item .product .pic').on('mousemove', function (event) {
            const parent = $(this);
            const parentWidth = parent.width();
            
            const childrens = parent.find('.slick-slide');
            const areaWidth = Math.floor(parentWidth / childrens.length);
            const mousePointer = event.offsetX;
            
            let currentSlide = 0;
            
            for (let cs = 1; cs <= childrens.length; cs++) {
                let a = areaWidth * cs;
                
                if (mousePointer < a) {
                    currentSlide = cs - 1;
                    break;
                }
            }
            
            parent.slick('slickGoTo', currentSlide);
            
            parent.on('mouseleave', function () {
                $(this).slick('slickGoTo', 0);
            });
         }); 
        }
    }
    
    /* Common slider for main page and catalog */
    $('.row.slide-video').owlCarousel({
        items: 2,
        itemsDesktop: [1024,2],
        itemsTablet: [1023,2],
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
    
    /* Slider of same products in product page */
    setSameSlider();
    
    function setSameSlider() {
        const slider = $(".same_slider");
        if (slider.find(".item").length > 6) {
            slider.slick({
                slidesToShow: 6,
                slidersToScroll: 1,
                autoplay: true,
                autoplaySpeed: 3000,
                arrows: false,
                responsive: [
                    {
                      breakpoint: 1280,
                      settings: {
                        slidesToShow: 5,
                      }
                    },
                    {
                      breakpoint: 1000,
                      settings: {
                        slidesToShow: 4,
                      }
                    },
                    {
                      breakpoint: 1000,
                      settings: {
                        slidesToShow: 4,
                      }
                    },
                    {
                      breakpoint: 768,
                      settings: {
                        slidesToShow: 3,
                      }
                    },
                    {
                      breakpoint: 478,
                      settings: {
                        slidesToShow: 2,
                      }
                    },
                ],
            })
        }
    }
    
    /* Add to favourite */
    $('.top-container .heart').on('click', function (event) {
        event.preventDefault();
   
        const target = $(this);
        const messageContainer = target.parents('.product').find('.heart-msg');
        
        if (target.hasClass('active')) {
            target.removeClass('active')
            showMsg(messageContainer, false)
        } else {
            target.addClass('active')
            showMsg(messageContainer)
        }
        
        /* Show banner with message */
        function showMsg(elem, add = true) {
            elem.html(`${add ? 'Товар добавлен в избранное' : 'Товар убран из избранного'}`);
            elem.addClass('active');

            setTimeout(function () {
                elem.removeClass('active')
            }, 3000)
        }
    });
    
    /* Quick view */
    $('.top-container .eye').on('click', function(event) {
        event.preventDefault();
        $('.qview').bPopup();
    })
    
    /* Slider for quick view */
    $('.qview__slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    })
    
})