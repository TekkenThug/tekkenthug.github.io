$(function () {
    // Слайдер для сертификатов
    $('.sertificats__slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        prevArrow: '<button class="sertificats__slider-btn prev-btn"></button>',
        nextArrow: '<button class="sertificats__slider-btn next-btn"></button>',
        dots: true,
        dotsClass: "sertificats__slider-dots",
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 2,
                }
            },
        ]
    });


    // Добавление последнего элемента в слайдер если кол-во нечетно
    var firstPhoto = $('.prize__slider .prize__slider-column:first .prize__slider-item:first').clone();
    var lastColumn = $('.prize__slider .prize__slider-column:last');
    var lastColumnCount = $('.prize__slider .prize__slider-column:last .prize__slider-item').length;

    if (lastColumnCount == 1) {
        lastColumn.append(firstPhoto);
    }


    // Слайдер для премий и благодарностей
    $('.prize__slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        prevArrow: '<button class="prize__slider-btn prev-btn"></button>',
        nextArrow: '<button class="prize__slider-btn next-btn"></button>',
        dots: true,
        dotsClass: "sertificats__slider-dots",
        responsive: [
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    });


    // Табы в форме обратной связи
    $('.form__tabs-link').on('click', function () {
        $('.form__tabs-link').removeClass('current');
        $(this).addClass('current');

        var tab_id = $(this).attr('data-tab');

        $('.tab').removeClass('current');
        $("#" + tab_id).addClass('current');
    });


    // Чекбоксы
    $('input[type=radio], input[type=checkbox]').iCheck();


    // Слайдер с видео
    $('.video__slider').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        prevArrow: '<button class="video__slider-btn prev-btn"></button>',
        nextArrow: '<button class="video__slider-btn next-btn"></button>',
        dots: true,
        dotsClass: "sertificats__slider-dots",
        draggable: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    });

})