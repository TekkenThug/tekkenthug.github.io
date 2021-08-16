function check_price_item() {
    if (document.querySelector(".full_page .prices .new")) {
        var item = document.querySelector(".full_page .quantity").childNodes[3];
        var min_count = item.getAttribute("data-order");

        if (min_count > 1) {
            var price = document.querySelector(".full_page .prices .new");

            var res = Number(min_count) * Number(price.innerText);
            price.innerText = res.toFixed(2);
        }
    }

    if (document.querySelector(".products.clrfix")) {
        var items = document.querySelectorAll(".product_item");
        for (i = 0; i < items.length; i++) {
            var price = items[i].querySelector(".new");

            var count = items[i].querySelector(".quantity input");
            if (count) var count = items[i].querySelector(".quantity input").getAttribute("data-order");

            if (price && count) {
                var res = Number(count) * Number(price.innerText);
                //console.log(count, price.innerText);
                //if (count >=0) price.innerText = res.toFixed(2);
            }
        }
    }
}

$(window).on("load", function () {
    check_price_item();

    $("body").addClass("visible");

    $("#filter-drop input").focus(function (el) {
        console.log((el.target.value = ""));
    });
    
	let tmpSortFilter = JSON.parse(get_cookie("Filter_sort"));
	if(tmpSortFilter) {
		$('.amount_materials .selecter.selecter-element').val(tmpSortFilter.page);
		$('#sort-item').val(tmpSortFilter.sort_by); 
	}
	
	if($("[price_type]").length > 0){
		console.log($("[price_type]").val());
		var ed = declination($("[price_type]").val(), $("[price_type]").attr('price_type').split(','));
		let v = parseInt($("[price_type]").val().replace(/\D+/g, ""));
		$("[price_type]").closest('div').find('.quantity__units').html(ed);
	}
	
	

	$("#field_from").keyup(function () {
        var val = parseInt($("#field_from").val().replace(/\D+/g, ""));
        if (!val) val = 1;
        $("#field_from").val("");
        $("#field_from").val("от " + val);
    });

    $("#field_before").keyup(function () {
        var val = parseInt($("#field_before").val().replace(/\D+/g, ""));
        if (!val) val = 1;
        $("#field_before").val("");
        $("#field_before").val("до " + val);
    });

    $("input[name='phone']").mask("+7(999)999-99-99");

    $('form input[name="is_robot"]').val(-1); //устанавливаем что не робот
});

$(window).scroll(function () {
    if (window.location.pathname == "/spec/") {
        /*
            $('[q-scroll]').each(function(id, el) {
                  window[el.getAttribute('q-scroll')](el);
                  
            });
            */

        var wrapper = $("table.price-all-happy tr.shapka");
        var navbar = $("table.price-all-happy tr th"); // элемент скрола (что скролить)
        var nsc = $(document).scrollTop(); //общий скрол (от верха страницы)
        var bp1 = wrapper.offset().top; //позиция элемента ля начало срола
        if (nsc > bp1) {
            var sc = nsc - bp1;
            navbar.css("position", "relative");
            navbar.css("top", sc);
        } else {
            navbar.css("top", 0);
        }
    }
});

$(window).bind("load resize", function () {
    var WH = $(window).height();
    $(".header .menu").height(WH);
    $(".container").css("min-height", WH + "px");

    var breadsW = $(".breads").width();
    $(".filter_drop").outerWidth(breadsW);
    $(".header .drop_cart").outerWidth(breadsW);

    var d_width = $(document).width();
    if (d_width >= 320 && d_width <= 767) {
        $("body").addClass("mobile");
    } else {
        $("body").removeClass("mobile");
    }
});

var gets = (function () {
    var a = window.location.search;
    var b = new Object();
    a = a.substring(1).split("&");
    for (var i = 0; i < a.length; i++) {
        c = a[i].split("=");
        b[c[0]] = c[1];
    }
    return b;
})();

function customPage(page) {
    var gets = (function () {
        var a = window.location.search;
        var b = new Object();
        a = a.substring(1).split("&");
        for (var i = 0; i < a.length; i++) {
            c = a[i].split("=");
            b[c[0]] = c[1];
        }
        return b;
    })();

    var url = window.location.href.split("?")[0];
    var url_filter = "";

    if (gets["page"]) url_filter += "&page=" + gets["page"];
    if (gets["sort"]) url_filter += "&sort=" + gets["sort"];
    url_filter += "&page_by=" + $(page).val();

    xhr("get", url + "?" + url_filter, function (e) {
        $(".content").html(e);

        $(".navigation li").each(function (i, el) {
            var link = $(el).find("a").attr("href");
            $(el)
                .find("a")
                .attr("href", link + "&page_by=" + $(page).val());
        });
    });
}

$(document).ready(function () {
    var xhr = new XMLHttpRequest();
    //xhr.open('GET', '/static/css/style.css');
    xhr.open("GET", "/static/temp/dunamic/calculate.txt");

    xhr.addEventListener("load", function () {
        var div = document.createElement("noindex");
        div.innerHTML = this.responseText;
        //div.classList.add("calculator");
        const el = document.querySelector("#calc-html");
        el.insertAdjacentElement("afterbegin", div);
        console.log("div loaded");
    });
    xhr.addEventListener("error", function (e) {
        console.error("style load failed");
    });
    //xhr.send();

    $("img[data-image]").each(function (i, el) {
        $(el).attr("src", $(el).attr("data-image"));
        //console.log($(el).attr('data-image'));
    });

    if (document.querySelector(".tabs_nav")) {
        if (navigator.plugins.length > 0 || window.screen.availWidth <= 768) var csrf = $('input[name="csrfmiddlewaretoken"]').val();
        $.ajax({
            url: window.location.href,
            method: "GET",
            data: { csrfmiddlewaretoken: csrf },

            success: function (request) {
                //console.log('OK');
            },

            error: function () {},
        });
    }

    var div = document.querySelector(".breads");
    if (!document.querySelector(".cont-section")) var newHTML = div.innerHTML.replace("скотч", "скотчъ");

    $(".breads").html(newHTML);
    if (document.querySelector("#filter-drop")) var counCol = document.querySelector("#filter-drop").children.length - 2;

    $("#filter-drop .color").each(function (i, el) {
        if (i == 0) {
            var color_block = $(el).parent().parent().parent();
            counCol = 5 - counCol;
            var width = 19.7 * counCol;

            color_block.css({ width: width + "%" });
            color_block.append('<span id="add-color-text"></span>');
        }

        var name = $(el).html();
        var colors = '{"синие":"#F5F5F5","на выбор":"#F5F5F5","коричневый": "#964b00", "прозрачный": "#ffffff,Прозрачный", "голубой": "#42aaff", "null": "#000", "оранжевый": "#ffa500", "фиолетово-голубой": "#8b00ff, #42aaff", "стекло": "#ffffff,стекло", "красный": "#ff0000", "зеленый": "#008000", "темно-синий": "#00008b", "сиреневый": "#c8a2c8", "не вскрывать": "#ffffff,не вскрывать", "бежевый": "#f2e8c9", "синий": "#0000ff", "серебро":"#c0c0c0", "темно синий": "#002137", "болотный": "#acb78e", "фиолетовый": "#8b00ff", "Биологическая опасность": "#ffffff, Био.опасность", "темно-серый": "#49423d", "желтый": "#ffff00", "светло-голубой": "#87cefa", "черный": "#000000", "натуральный": "#ffffff,натуральный", "розовый": "#ffc0cb", "не кантовать": "#ffffff, не кантовать", "черно-белый": "#000000,#ffffff", "белый": "#ffffff", "салатовый": "#99ff99", "серый": "#808080"}';
        //		console.log(el);
        //return false;
        var colors = JSON.parse(colors);
        var variants = colors[name].split(",");
        var color = variants[0];
        var color2 = color;
        var title = "";
        if (variants.length > 1) {
            var color2 = variants[1];
            if (color2.indexOf("#") < 0) {
                title = color2;
                color2 = color;
            }
        }
        $(el).html("");

        $(el).parent().parent().css({ display: "inline-block" });
        $(el).next().html(title);
        $(el).css({ background: "linear-gradient(to right, " + color + " 50%, " + color2 + " 50%)" });
        if ($(el).next().html()) {
            var text_block = $(el).parent().parent();
            $("#add-color-text").append(text_block);
            //text_block.remove();
        }
    });

    var url_filter = "";

    //if (gets['page']) url_filter += '&page='+gets['page'];
    if (gets["page_by"]) url_filter += "&page_by=" + gets["page_by"];
    if (gets["sort"]) url_filter += "&sort=" + gets["sort"];

    if (gets["page"] || gets["page_by"] || gets["sort"]) {
        //  $('.navigation li').each(function (i, el) {
        //     var link = $(el).find('a').attr('href')
        //     $(el).find('a').attr('href', link+'&page_by='+$(page).val());
        //   });

        $(".navigation li").each(function (i, el) {
            var url = window.location.href.split("?")[0];
            // console.log(i);
            //$(el).find('a').attr('href', url+'?page='+i+'&'+url_filter);
        });
    }

    $(".data_menu ul.open-child").parent().css({ display: "block" });

    $(".ask_question a").click(function (e) {
        $('form[name="manager"]').find("input[name=email_manager]").val(e.target.getAttribute("mail-manager"));
        $('form[name="manager"]').find("input[name=addres_to]").val(e.target.getAttribute("mail-manager"));
        
        console.log(e.target.getAttribute("mail-manager"));
    });

    // mob menu

    $(".mob_menu_btn").click(function () {
        if ($(this).hasClass("open")) {
            $(this).removeClass("open");
            $(".menu-overlay").removeClass("open");
            $(".header .menu").animate(
                {
                    right: "-210px",
                },
                400
            );
            $("body").animate(
                {
                    right: "0px",
                },
                400
            );
        } else {
            $(this).addClass("open");
            $(".menu-overlay").addClass("open");
            $(".header .menu").animate(
                {
                    right: "0",
                },
                400
            );
            $("body").animate(
                {
                    /*left: '285px'*/
                },
                400
            );
        }
    });

    $(".menu-overlay").click(function () {
        $(this).removeClass("open");
        $(".header .menu").animate(
            {
                right: "-210px",
            },
            200
        );
        $(".mob_menu_btn").removeClass("open");
    });

    $(".breads a.sub_link").hover(function () {
        $(this).parents("li").find(".sub_menu").toggleClass("visible");
        $(this).toggleClass("active");
    });

    $(".breads .sub_menu").hover(function () {
        $(this).toggleClass("visible");
        $(this).parents("li").find("a.sub_link").toggleClass("active");
    });

    $(".filter_btn").click(function () {
        if ($(this).hasClass("open")) {
            $(this).removeClass("open");
            $(".filter_drop").slideUp("fast");
        } else {
            $(this).addClass("open");
            $(".filter_drop").slideDown("fast");
        }
    });

    $(".show_all_manager").click(function () {
        $(this).parents(".manager").addClass("show");
        $(this).hide();
        $(".manager li:hidden").show();
        return false;
    });

    // fancybox

    $("[data-fancybox]").fancybox({
        loop: true,
        buttons: ["close"],
    });

    // selecter
    $(".amount_materials select").val(gets["page_by"]);
    $("#sort-item").val(gets["sort"]);

    $(".amount_materials .selecter-options .selecter-item").each(function (i, el) {
        if ($(el).attr("data-value") == gets["page_by"]) {
            $(el).attr("class", "selecter-item selected");
            $(".amount_materials .selecter-selected").text(gets["page_by"]);
        } else {
            $(el).attr("class", "selecter-item");
        }
    });

    $(".sort_by .selecter-options .selecter-item").each(function (i, el) {
        if ($(el).attr("data-value") == gets["sort"]) {
            $(el).attr("class", "selecter-item selected");
            $(".sort_by .selecter-selected").text($(el).text());
        } else {
            $(el).attr("class", "selecter-item");
        }
    });

    $(".selector.links").removeClass(".selector").addClass(".selecter").selecter({
        /*label: 'EN'*/
        links: true,
    });

    var allAccordions = $(".side_menu .data_menu");
    var allAccordionItems = $(".side_menu .title_menu");
    $(".side_menu > .title_menu > span").click(function () {
        console.log($(this));
        if ($(this).parent().hasClass("open")) {
            $(this).parent().removeClass("open");
            $(this).parent().next().slideUp("fast");
        } else {
            allAccordions.slideUp("fast");
            allAccordionItems.removeClass("open");
            $(this).parent().addClass("open");
            $(this).parent().next().slideDown("fast");
            return false;
        }
    });

    $(".side_menu .show_all").click(function () {
        $(".side_menu .title_menu").removeClass("none");
        $(this).addClass("none");
    });

    $(".show_catalog").click(function () {
        $(this).toggleClass("open");
        if ($(this).hasClass("open")) {
            $(this).html("Свернуть каталог");
            $(".side_menu").slideDown("fast");
        } else {
            $(this).html("Показать каталог");
            $(".side_menu").slideUp("fast");
        }
    });

    $(".product .wrap")
        .hover(function () {
            $(".product").removeClass("visible");
            $(this).closest(".product").addClass("visible");
        })
        .mouseout(function () {
            $(this).closest(".product").removeClass("visible");
        });

    $(".quantity input").on("click", function (e) {});

    $(".quantity input,.quantity-new input,.header-quantity input").blur(function (e) {
        // задаем функцию при потери фокуса элементом <input>
        if (parseInt(e.target.value) < parseInt(e.target.getAttribute("data-order"))) {
            let c = Math.round(Number(parseInt(e.target.value)) / Number(parseInt(e.target.getAttribute("data-order")))) * Number(parseInt(e.target.getAttribute("data-order")));
            if (c == 0 ){
                c = Number(parseInt(e.target.getAttribute("data-order")));
            }
            e.target.value = c;
            return false;
        }else {
            let c = Math.round(Number(parseInt(e.target.value)) / Number(parseInt(e.target.getAttribute("data-order")))) * Number(parseInt(e.target.getAttribute("data-order")));
            if (c == 0 ){
                c = Number(parseInt(e.target.getAttribute("data-order")));
            }
            console.log(c);
            e.target.value = c;
        }
    });

    $(".quantity input").keyup(function (e) {
        var $this = $(this);
        var value = parseInt(e.currentTarget.value);
        var wraps = $this.parent().parent().parent();
        var val_price = $this.parent().parent().parent().find(".add_cart a").attr("item-price");
        var qyt = value;
        var res = val_price * qyt;
        var itog = res.toFixed(2);
        if (qyt >= 1) $(wraps).find(".price .new").text(itog);
        if ($(wraps).find(".price .new").length == 0) {
            var wraps = $this.parent().parent().parent().parent();
            if (qyt >= 1) $(wraps).find(".price .new").text(itog);
        }
    });

    // quantity

    //$('.minus_btn').on('click', function (e) {
    $(".products.clrfix, .full_page .quantity").on("click", ".minus_btn", function (e) {
   // $(".content, .full_page, .products.clrfix").on("click", ".minus_btn", function (e) {
        e.preventDefault();
        var $this = $(this);
        var $input = $this.closest("div.quantity").find("input");
		var value = parseInt($input.val());
		let price_type = declination(value, $input.attr('price_type').split(','));
		$input.val().split(' ')[1];
       
        var step = parseInt($input[0].getAttribute("data-step"));

        //if (value == parseInt($input.attr('data-order'))) return false;

        var wraps = $this.parent().parent().parent();
        var val_price = $this.parent().parent().parent().find(".add_cart a").attr("item-price");

        if (step > 0) {
            var qyt = value - step;
            console.log(qyt);
            var value = qyt;
            var tmp = value - step;
            //console.log(value  + ' - ' + step + ' = ' + tmp);
            // qyt = tmp;
            console.log(qyt);
        } else {
            var qyt = value - 1;
        }

        var res = val_price * qyt;
        var itog = res.toFixed(2);

        //$(wraps).find('.price .new').text(val_price);

        if (qyt >= 1) $(wraps).find(".price .new").text(itog);
        if (qyt <= 0) {
            itog = value * Number(val_price);
            console.log(itog,val_price, 'qyt',qyt);
            $(wraps).find(".price .new").text(Number(val_price).toFixed(2));
        }

        if ($(wraps).find(".price .new").length == 0) {
            var wraps = $this.parent().parent().parent().parent();
            if (itog <= 0) itog = Number(val_price);

            console.log(itog,val_price);
			$(wraps).find(".price .new").text(itog);
            if (qyt <= 0) $(wraps).find(".price .new").text(itog.toFixed(2));
        }

        if (step == 0) {
            if (value > 1) {
                value = value - 1 + " "+ price_type;
            } else {
                value = 1 + " "+price_type;
            }
        } else {
            if (value > 1) {
                value = value + " "+price_type;
            } else {
                value = 1 + " "+price_type;
            }
        }

        //if($input.attr('data-order') && parseInt(value) <= $input.attr('data-order')) {
        //	$(".minus_btn").addClass("disabled");
        //	$(".minus_btn").attr("disabled",true);
        //}
        console.log(value, price_type);
        $input.val(value);
    });
    $(".products.clrfix, .full_page .quantity-new").on("click", ".minus_btn", function (e) {
        e.preventDefault();
        var $this = $(this);
        var $input = $this.closest("div.quantity-new").find("input");
		var value = parseInt($input.val());
		let price_type = declination(value, $input.attr('price_type').split(','));
		$input.val().split(' ')[1];

        var step = parseInt($input[0].getAttribute("data-step"));
        
        //if (value == parseInt($input.attr('data-order'))) return false;

        var wraps = $this.parent().parent().parent();
        var val_price = $this.parent().parent().parent().find(".add_cart a").attr("item-price");

        if (step > 0) {
            var qyt = value - step;
            console.log(qyt);
            var value = qyt;
            var tmp = value - step;
            //console.log(value  + ' - ' + step + ' = ' + tmp);
            // qyt = tmp;
            console.log(qyt);
        } else {
            var qyt = value - 1;
        }

        var res = val_price * qyt;
        var itog = res.toFixed(2);

        //$(wraps).find('.price .new').text(val_price);

        if (qyt >= 1) $(wraps).find(".price .new").text(itog);
        if (qyt <= 0) {
            itog = value * Number(val_price);
            console.log(itog,val_price, 'qyt',qyt);
            $(wraps).find(".price .new").text(Number(val_price).toFixed(2));
        }

        if ($(wraps).find(".price .new").length == 0) {
            var wraps = $this.parent().parent().parent().parent();
            if (itog <= 0) itog = Number(val_price);

            console.log(itog,val_price);
			$(wraps).find(".price .new").text(itog);
            if (qyt <= 0) $(wraps).find(".price .new").text(itog.toFixed(2));
        }

        if (step == 0) {
            if (value > 1) {
                value = value - 1; // + " "+ price_type;
            } else {
                value = 1; //+ " "+price_type;
            }
        } else {
            if (value > 1) {
                value = value; // + " "+price_type;
            } else {
                value = step; //+ " "+price_type;
            }
        }

        //if($input.attr('data-order') && parseInt(value) <= $input.attr('data-order')) {
        //	$(".minus_btn").addClass("disabled");
        //	$(".minus_btn").attr("disabled",true);
        //}
        console.log(value, price_type);
        $input.val(value);
    });

    //$('.plus_btn').on('click', function (e) {
    $(".products.clrfix, .full_page .quantity").on("click", ".plus_btn", function (e) {
        e.preventDefault();
        var $this = $(this);
        //$(".minus_btn").attr("disabled",false);
        //$(".minus_btn.disabled").removeClass("disabled");
		
        var $input = $this.closest("div.quantity").find("input");
		//let price_type = $input.val().split(' ')[1];
        var value = parseInt($input.val());
		let price_type = declination(value, $input.attr('price_type').split(','));
		
        var step = parseInt($input[0].getAttribute("data-step"));

        var wraps = $this.parent().parent().parent();
        var val_price = $this.parent().parent().parent().find(".add_cart a").attr("item-price");

        if (step > 0) {
            var qyt = value + step;
            if (value == 1) qyt = qyt - 1;
            var value = qyt;
        } else {
            var qyt = value + 1;
        }

        var res = val_price * qyt;
        var itog = res.toFixed(2);
        $(wraps).find(".price .new").text(itog);

        if ($(wraps).find(".price .new").length == 0) {
            var wraps = $this.parent().parent().parent().parent();
            $(wraps).find(".price .new").text(itog);
        }

        if (step == 0) {
            if (value < 1000000) {
                value = value + 1 + " "+price_type;
            } else {
                value = 1000000 + " "+price_type;
            }
        } else {
            if (value < 1000000) {
                value = value + " "+price_type;
            } else {
                value = 1000000 + " "+price_type;
            }
        }
        console.log(value);
        $input.val(value);
		return 0;
    });
    $(".products.clrfix, .full_page .quantity-new").on("click", ".plus_btn", function (e) {
        e.preventDefault();
        var $this = $(this);
        //$(".minus_btn").attr("disabled",false);
        //$(".minus_btn.disabled").removeClass("disabled");

        var $input = $this.closest("div.quantity-new").find("input");
		//let price_type = $input.val().split(' ')[1];
        var value = parseInt($input.val());
		let price_type = declination(value, $input.attr('price_type').split(','));

        var step = parseInt($input[0].getAttribute("data-step"));

        var wraps = $this.parent().parent().parent();
        var val_price = $this.parent().parent().parent().find(".add_cart a").attr("item-price");

        if (step > 0) {
            var qyt = value + step;
            if (value == 1) qyt = qyt - 1;
            var value = qyt;
        } else {
            var qyt = value + 1;
        }

        var res = val_price * qyt;
        var itog = res.toFixed(2);
        $(wraps).find(".price .new").text(itog);

        if ($(wraps).find(".price .new").length == 0) {
            var wraps = $this.parent().parent().parent().parent();
            $(wraps).find(".price .new").text(itog);
        }

        if (step == 0) {
            if (value < 1000000) {
                value = value + 1;
            } else {
                value = 1000000;
            }
        } else {
            if (value < 1000000) {
                value = value;
            } else {
                value = 1000000;
            }
        }
        console.log(value);
        $input.val(value);
		return 0;
    });

    var list_length = $(".full_page .info_col .list li").length;
    if (list_length > 9) {
        $(".full_page .all_features").show();
    } else {
        $(".full_page .all_features").hide();
    }

    $(".full_page .all_features a").click(function () {
        $(".full_page .info_col .list li").show();
        $(".full_page .all_features").hide();
        return false;
    });

    $(".tabs_full .btn_select a").html($(".tabs_full .tabs_nav a.active").html());

    var tabs_full = $("#tabs_full");
    $(".tabs_content .item_tab", tabs_full).each(function (i) {
        if (i != 0) $(this).hide(0);
    });
    tabs_full.on("click", ".tabs_nav li a", function (e) {
        e.preventDefault();
        var tabFullId = $(this).attr("href");
        $(".tabs_nav li a", tabs_full).removeClass();
        $(this).addClass("active");
        $(".tabs_full .btn_select a").html($(".tabs_full .tabs_nav a.active").html());
        $(".tabs_content .item_tab", tabs_full).hide(0);
        $(tabFullId).show();
    });

    $(".tabs_full .btn_select a").click(function () {
        $(this).toggleClass("open");
        $(".tabs_full .tabs_nav").slideToggle("fast");
        return false;
    });

    $(".tabs_full .tabs_nav li a").click(function () {
        $(".mobile .tabs_full .tabs_nav").slideToggle("fast");
        $(".mobile .tabs_full .btn_select a").removeClass();
    });

    // slick slider

    $(".same_slider2").slick({
        dots: false,
        arrows: false,
        infinite: false,
        speed: 300,
        slidesToShow: 2,
        slidesToScroll: 1,
        mobileFirst: true,
        responsive: [
            {
                breakpoint: 319,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 479,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 999,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                },
            },
        ],
    });

    $(".vc_slider").slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 300,
        fade: false,
        cssEase: "linear",
        appendDots: $(".video_calls .dots_nav"),
        mobileFirst: true,
        responsive: [
            {
                breakpoint: 319,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    fade: false,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 1280,
                settings: {
                    fade: false,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
        ],
    });

    $(".certificates_slider").slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 300,
        fade: false,
        cssEase: "linear",
        appendDots: $(".certificates .dots_nav"),
        mobileFirst: true,
        responsive: [
            {
                breakpoint: 319,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 999,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                },
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                },
            },
        ],
    });

    var pv_tabs = $("#pv_tabs");
    $(".tabs_content .item_tab", pv_tabs).each(function (i) {
        if (i != 0) $(this).removeClass("active");
    });
    pv_tabs.on("click", ".title_tab li a", function (e) {
        e.preventDefault();
        var pvTabId = $(this).attr("href");
        $(".title_tab li a", pv_tabs).removeClass();
        $(this).addClass("active");
        $(".tabs_content .item_tab", pv_tabs).removeClass("active");
        $(pvTabId).addClass("active");
    });

    $("#c-tab-body").click();
    var $photo_slider = $("#photo_slider");
    var $photo_slide_count = $("#photo_tab .slide_count");
    $photo_slider.on("init reInit afterChange", function (event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $photo_slide_count.html('<span class="current">' + i + "</span>" + "/" + '<span class="total">' + slick.slideCount + "</span>");
    });

    $photo_slider.slick({
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: "linear",
        responsive: [{
            breakpoint: 768,
            settings: {
                draggable: true,
            }
        }]
    });

    var $video_slider = $("#video_slider");
    var $video_slide_count = $("#video_tab .slide_count");
    $video_slider.on("init reInit afterChange", function (event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $video_slide_count.html('<span class="current">' + i + "</span>" + "/" + '<span class="total">' + slick.slideCount + "</span>");
    });

    $video_slider.slick({
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: "linear",
    });

    // bPopup

    $('[data-modal-iframe="true"]').click(function () {
        var dlu = $(this).attr("data-load-url");
        $("#iframe_modal").bPopup({
            modalColor: "#000",
            opacity: 0.77,
            content: "iframe",
            positionStyle: "fixed",
            scrollBar: false,
            contentContainer: ".content_iframe",
            loadUrl: dlu,
        });
        return false;
    });

    $('[data-modal="true"]').click(function () {
        var e = $(this).attr("data-modal-id");
        $("#" + e).bPopup({
            modalClose: true,
            speed: 300,
            opacity: 0.7,
            modalColor: "#000",
            positionStyle: "absolute",
            amsl: 0,
            onOpen: function () {
                // $(this).bPopup().reposition(350);
                jQuery("#youtube").each(function () {
                    jQuery(this)[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
                });
                // document.getElementById("videoFrame").src = "https://www.youtube.com/embed/AUCXMxxIfX8";
            },
            onClose: function () {
                console.log(777);
                // document.getElementById("videoFrame").src = "0";

                jQuery("#youtube").each(function () {
                    jQuery(this)[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', "*");
                });
            },
        });
        console.log($(this).attr("data-modal-id"));
        $("#" + $(this).attr("data-modal-id")).show();
        console.log(document.getElementById("videoFrame"));
        console.log($("#videoFrame"));
        if(e == 'image-popup') {
            let img = $(this).find('img').attr('src');
            console.log(e, img)
            $('#image-popup .image__wrapper img').attr('src',img);
        }
        return false;
    });


    $(".close_popup").click(function () {
        document.getElementById("videoFrame").src = "0";
    });

    $(".close_popup a").click(function () {
        $("#thank_you").bPopup().close();
        return false;
    });
    
    $("#product-video.popup_modal  .close_popup a").click(function () {
        $("#product-video").bPopup().close();
        return false;
    });

    filter_visual();

    // raty

    $(".list .rate").raty({
        readOnly: true,
        path: "/static/images",
        scoreName: "rating",
        hints: ["Очень плохо", "Плохо", "Нормально", "Хорошо", "Очень хорошо"],
        score: function () {
            return $(this).attr("data-score");
        },
    });

    $(".reviews_list .star_rate").raty({
        readOnly: true,
        path: "/static/images",
        scoreName: "rating",
        hints: ["Очень плохо", "Плохо", "Нормально", "Хорошо", "Очень хорошо"],
        number: function () {
            return $(this).attr("data-number");
        },
        score: function () {
            return $(this).attr("data-score");
        },
    });

    $("#rating").raty({
        path: "/static/images",
        scoreName: "rating",
        target: "#rating_hint",
        targetKeep: true,
        hints: ["Очень плохо", "Плохо", "Нормально", "Хорошо", "Очень хорошо"],
    });

    var el = document.getElementById("auto-open-menu");
    if (el) {
        $(".title_menu#" + el.getAttribute("data-id")).click();
    }

    $(".search form").submit(function (event) {
        var string = $("#query").val();
        if (!string) {
            alert("Введите запрос!");
            event.preventDefault();
        }
        console.log(string);
    });

    $("[call-me-maybe]").submit(function (event) {
        //shopids
        event.preventDefault();

        var $form = $(this),
            name = $form.find("input[name='name']").val(),
            phone = $form.find('input[name="phone"]').val(),
            is_robot = $form.find('input[name="is_robot"]').val(),
            email = $form.find('input[name="email"]').val(),
            another_contact = $form.find('input[name="another_contact"]').val(),
            _long = $form.find('input[name="long"]').val(),
            width = $form.find('input[name="width"]').val(),
            addres_to = $form.find('input[name="addres_to"]').val(),
            button = $form.find("button"),
            email_manager = $form.find('input[name="email_manager"]').val(),
            message = $form.find('textarea[name="message"]').val(),
            url = $form.attr("action"),
            id_form = $form.attr("id"),
            shopids = 0;

        let name_form = $form.attr("name");

        var values = {};
        var value_form = {};

        if ($form.attr("name") == "const") {
            $.each($form.serializeArray(), function (i, field) {
                var label = $form.find('input[name="' + field.name + '"]').attr("label");
                if (!field.value) field.value = "Не знаю";
                values[field.name] = [field.value, label];
            });
        }

        if ($form.attr("name") == "vacance-call") {
            $.each($form.serializeArray(), function (i, field) {
                var label = $form.find('[name="' + field.name + '"]').attr("label");
                var necessarily = $form.find('[name="' + field.name + '"]').attr("necessarily");
                if (necessarily && !field.value) {
                    alert("Заполните поле " + label);
                    return 0;
                }

                if (!field.value) field.value = "Не знаю";
                value_form[field.name] = [field.value, label];
            });
            console.log(value_form);
            //return 0;
        }

        if (id_form == "const" && !$("#const").find('input[label="Как с Вами связаться?"]').val()) {
            alert("укажите контакты");
            return false;
        }

        if (!phone && id_form != "const") {
            alert("укажите телефон");
            return false;
        }

        button[0].innerText = "Ожидайте....";
        //console.log(values);
        //return false;
        var data = { is_robot: is_robot, width: width, _long: _long, another_contact: another_contact, name_form: name_form, value_form: JSON.stringify(value_form), name: name, phone: phone, email: email, email_manager: email_manager, const: JSON.stringify(values), message: message, csrfmiddlewaretoken: document.getElementsByName("csrfmiddlewaretoken")[0].value,addres_to : addres_to };
        //console.log(values['items']);
        if ($form.attr("name") == "cart") {
            console.log("it's a shop!");
            aaa = [];
            //shopids = JSON.parse($form.serializeArray()[9]['value']);
            for (var i = 0; i < Cart.objects.length; i++) aaa.push({ id: Cart.objects[i].id, count: Cart.objects[i].quantity });
            data["shopids"] = JSON.stringify(aaa);

            $.each($form.serializeArray(), function (i, field) {
                var label = $form.find('input[name="' + field.name + '"]').attr("label");
                //data[field.name] = field.value
            });
        }

        if (values["const"]) {
            $.each(values, function (i, field) {
                var name = field[1];
                var value = field[0];
                //if(name) console.log(name +' - '+ value);
            });
        }

        // console.log(data)
        // return false;
        var posting = $.post(url, data);
        posting.done(function (data) {
            if (data.success) {
                $("#thank_you").bPopup();

                $form[0].reset();
                if (shopids.length) {
                    Cart.clear();
                }
                $(".b-close").click();
                button[0].innerText = "Заявка принята, ожидайте";
                $(".popup_modal.video_slide,#video_slide").hide();
            } else alert(data.error);
        });
    });

    Cart.load();
    Favorite.load();

    /*$('.header .cart .yes a').hover(
        function () {
            $(this).parents('.cart').find('.drop_cart').toggleClass('visible');
            $(this).toggleClass('active');
        }
    );
    $('.header .drop_cart').hover(
        function () {
            $(this).toggleClass('visible');
            $(this).parents('li').find('a.sub_link').toggleClass('active');
        }
    );*/

    /* search */

    /*$('#search-catalog').click(function (e) {
        var string = $('input[name="search"]');
        window.location.replace('/shop/search/'+string.val() + '/');
        return false;
    });*/

    /* search end */

    /*$(".cart_info .quantity button").on("click", function (e) {
        let price = $(this).closest(".product").find('[itemprop="price"]').attr("content");
        let count = $(this).closest(".product").find('input[name="quantity"]').attr("data-step");
        if (count <= 0) {
            count = 1;
        }

        console.log($(this), price, count);
    });*/

    /*
        min_zakaz = $(el).prev().attr("data-order");
        if (!min_zakaz) min_zakaz = el.previousSibling.getAttribute("data-order");
        count = el.value;

        if (Number(count.replace("шт", "")) < Number(min_zakaz.replace("шт", ""))) {
            alert("Минимальынй заказ " + min_zakaz + " единиц товара");
            el.value = min_zakaz + " шт";
        }
    */



        $(".feedback-form__open,.feedback-form__top").on("click", function() {
            if ($(this).hasClass("active")) {
                $(this).parents(".feedback-form").find(".popup_modal").fadeOut();
                $(this).removeClass("active")
            } else {
                $(this).parents(".feedback-form").find(".popup_modal").fadeIn();
                $(this).addClass("active")
            }
            
        })
        if($( window ).width() >= 768 && $('.item.product.slick-slide img').length > 0) {
            console.log($( window ).width() >= 768 , $('.item.product.slick-slide img').length > 0)
            $('.item.product.slick-slide img').blowup({scale: 1.5});
            $('.photo_video.item button').on('click', function() {
                $('.item.product.slick-slide.slick-active img').blowup({scale: 1.5});
            });
        }

    $(".breads a.sub_link").on("click",function(e){
        if (e.target.classList.contains("sub_link")) return false;
    });
    $(".actevated-rating").on("click",function(e){
        $('[href="#reviews_tab"]').click();
    });
    $(".actevated-rating").on("click",function(e){
        $('#tabs_full .btn_select').next().css({'display':'none'})
    });

    if ($(".manager.contact").length){
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            $('.manager.contact .item .name').each(function(i,elem) {
                var tmp = elem.innerText.split(' ').filter(n => n);
                //console.log(tmp);
                elem.innerText = tmp[0] + ' ' + tmp[1];
            });
        }
    }
});

/* Q-framework-trimmed */

function getCookie(name) {
    var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
    var result = matches ? decodeURIComponent(matches[1]) : undefined;

    if (navigator.userAgent.indexOf("Opera") || (window.opera && opera.toString() == "[object Opera]")) {
        if (name == "csrftoken") {
            // return Q("input[name='csrfmiddlewaretoken']:last-child").value;
            var e = document.querySelector("input[name='csrfmiddlewaretoken']");
            if (e) return e.value;
        }
    }
    return result;
}

var Modal = {
    can_close: true,
    opened: false,
    open: function (url, params, callback) {
        var params = params || 0;
        var data = new FormData();
        var callback = callback || 0;

        data.append("modal", 1);

        this.hide();

        if (params) {
            var keys = Object.keys(params);
            keys.forEach(function (key) {
                data.append(key, params[key]);
            });
        }

        var xhr = new XMLHttpRequest();
        xhr.open("post", url, true);
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
        $("#black-box").toggleClass("active");
        $(".wrapper").addClass("modal");
        this.loading();
        xhr.onload = function (data) {
            data = JSON.parse(data.target.responseText);

            if (data.error) {
                //Modal.loading();
                //Modal.show('Ошибка', data.error);
                modal("Ошибка", data.error);
                return;
            }
            Modal.loading();
            Modal.show();
            Modal.render(data.title, data.body);
            if (callback) callback(data);
        };
        xhr.onerror = function (e) {
            //if (files) files.removeAttr('disabled');
            console.log(e);
            // alert(e);
            modal("Ошибка", e);
        };
        xhr.send(data);
    },
    loading: function () {
        $("#modal-box").toggleClass("active");
        $("#modal-loading").toggleClass("active");
    },
    render: function (title, data) {
        this.opened = true;
        $("#modal-title").html(title);
        $("#modal-body").html(data);
        $("#modal-body-wrapper").toggleClass("active");
    },
    show: function () {
        $("body").addClass("modal-active");
        $("#modal-box").toggleClass("active");
    },
    hide: function (force) {
        var force = force || false;
        if (!force && !this.can_close) {
            return false;
        }
        this.opened = false;
        $("body").removeClass("modal-active");
        $("#modal-box").removeClass("active");
        $("#black-box").removeClass("active");
        $("#modal-body-wrapper").removeClass("active");
        $("#modal-loading").removeClass("active");
        $(".wrapper").removeClass("modal");
    },
};

function q_form(target) {
    target = target || "[q-form]";
    //Q('[q-form]').on('submit', function(e) {
    $(target).on("submit", function (e) {
        e.preventDefault();
        e.returnValue = false;
        var callback = $(this).attr("q-form");
        if (!callback.length || callback == "this" || callback == "self") {
            callback = function (r) {};
        }

        var data = this;

        q_image(this, data);

        //setTimeout(function(method, action, callback, data) {
        //    xhr(method, action, callback, data);
        //}, 250, this.attr('method'), this.attr('action'), callback, data);
        xhr($(this).attr("method"), $(this).attr("action"), callback, data);

        return false;
    });
}
function q_image(that, data) {
    if ($(that).attr("image-action")) {
        var dont_ignore = that.attr("image-accept");
        data = {};
        that.find("input").each(function (el) {
            var el_type = el.attr("type");
            var el_name = el.attr("name");

            if (el_type == "file") {
                //if (el.attr('name') == 'file') {alert('debug');el.resetVal();}

                if (dont_ignore == el_name) {
                    data[el_name] = el.files[0];
                }
                return;
            }
            if (el_type == "radio") {
                data[el_name] = el.parentNode.find('input[name="' + el_name + '"]:checked').val();
                return;
            }
            data[el_name] = el.val();
        });
        that.find("textarea").each(function (el) {
            data[el.attr("name")] = el.val();
        });
        that.find("select").each(function (el) {
            data[el.attr("name")] = el.value;
        });
        // for (var key of new FormData(this).keys()) {
        //    console.log(key);
        //    if (good) data[key] = ;
        // }
        // console.log(data);
    }

    return data;
}

function check_count(el, price_type, id) {
    el.onblur = function (el) {
        el = el.target;
        min_zakaz = $(el).prev().attr("data-order");
        if (!min_zakaz) min_zakaz = el.getAttribute("data-order");
        step = $(el).prev().attr("data-step");
        if (!step) step = el.getAttribute("data-step");
        count = el.value;
        let item = $(".drop_cart #cart-item-"+id+' input[name="count"]');
        if (parseInt(count.replace(/\D+/g,"")) < parseInt(min_zakaz.replace(/\D+/g,""))) {
            // alert("Минимальынй заказ " + min_zakaz + " "+price_type);
            // el.value = min_zakaz + " "+price_type;
			//console.log(document.querySelector("#cart-item-"+id).querySelector('input[name="count"]'));
			// document.querySelector("#cart-item-"+id).querySelector('input[name="count"]').value = min_zakaz + " "+price_type;


            let c = Math.round(Number(parseInt(count.replace(/\D+/g,"")) / Number(parseInt(min_zakaz.replace(/\D+/g,""))))) * Number(parseInt(min_zakaz.replace(/\D+/g,"")));
            if (c == 0 || c < min_zakaz){
                c = Number(parseInt(min_zakaz.replace(/\D+/g,"")));
            }
            item.val(c);
            console.log(true,c,item[0]);

            return false;
		} else {
            let c = Math.round(Number(parseInt(count.replace(/\D+/g,"")) / Number(parseInt(min_zakaz.replace(/\D+/g,""))))) * Number(parseInt(min_zakaz.replace(/\D+/g,"")));
            if (c == 0 || c < min_zakaz){
                c = Number(parseInt(min_zakaz.replace(/\D+/g,"")));
            }
            item.val(c);
            console.log(false,c,item[0])
            return false;
        }
		//Cart.load();

        /*
            if (parseInt(e.target.value) < parseInt(e.target.getAttribute("data-order"))) {
                let c = Math.round(Number(parseInt(e.target.value)) / Number(parseInt(e.target.getAttribute("data-order")))) * Number(parseInt(e.target.getAttribute("data-order")));
                if (c == 0 ){
                    c = Number(parseInt(e.target.getAttribute("data-order")));
                }
                e.target.value = c;
                return false;
            }else {
                let c = Math.round(Number(parseInt(e.target.value)) / Number(parseInt(e.target.getAttribute("data-order")))) * Number(parseInt(e.target.getAttribute("data-order")));
                if (c == 0 ){
                    c = Number(parseInt(e.target.getAttribute("data-order")));
                }
                console.log(c);
                e.target.value = c;
            }
        */
    };
}

var Cart = {
    hover_triggers: false,
    mouse_over: false,
    objects: [],
    save: function () {
        localStorage.setItem("shop-cart", JSON.stringify(this.objects));
        this.render();
    },
    load: function () {
        this.objects = JSON.parse(localStorage.getItem("shop-cart"));
        if (!this.objects) this.objects = [];
        this.render();
        //this.pick();
    },
    clear: function () {
        this.objects = [];
        this.save();
    },
    plus: function (id, num) {
        var item = this.get(id);

        if (num < 1) return;

        if (parseInt(item["step"]) > 0) {
            num = num + parseInt(item["step"]) - 1;
        }

        if (item) {
            item["quantity"] += num;
            this.save();
            return false;
        }
    },

    update: function (id, val) {
        console.log('111111',Cart.objects);
        
		var item = this.get(id);
		var val = parseInt(val.replace(/\D+/g,"")) * 1;
       
		let price_type = declination(item.min_zakaz, item['price_type'].split(','));
		//var stop = false;
        
		// if (val < Number(item.min_zakaz)) {
            //alert('Минимальынй заказ ' + item.min_zakaz + ' единиц товара');
            items = document.querySelectorAll(".cart_item .quantity input");
            for (i = 0; i < items.length; i++) {
                check_count(items[i], price_type, id);
            }
			
            items = document.querySelectorAll(".drop_cart .quantity input");
            for (i = 0; i < items.length; i++) {
                check_count(items[i], price_type, id);
            }

            //item.target.value = parseInt(e.target.getAttribute('data-order'));
			
            // return false;
        // }
        /* тут
        if (parseInt(val) < parseInt(item['min-zakaz'])) {
            let c = Math.round(Number(parseInt(val)) / Number(parseInt(item['min-zakaz']))) * Number(parseInt(item['min-zakaz']));
            if (c == 0 || c == null || c ==  NaN){
                c = Number(parseInt(item['min-zakaz']));
            }
            val = c;
            
        }else {
            let c = Math.round(Number(parseInt(val)) / Number(parseInt(item['min-zakaz']))) * Number(parseInt(item['min-zakaz']));
            if (c == 0 || c == null || c ==  NaN){
                c = Number(parseInt(item['min-zakaz']));
            }
            
            val = c;
        }
        */
        
        if (val < 1) return;

        if (item) {
            item["quantity"] = val;
            this.save();
            console.log(item["quantity"],item);
            return false;
        }
    },
    add: function (id, name, image, price, count) {
        var name = name || null;
        console.log($(this));
	
		
		if (!name) {
            var el = id;
            if (typeof id == "number") el = document.querySelector('[item-id="' + id + '"]');

            id = el.getAttribute("item-id");
            name = el.getAttribute("item-name");
            image = el.getAttribute("item-image");
            min_zakaz = el.getAttribute("data-order");
            step = el.getAttribute("data-step");
            price = el.getAttribute("item-price");
            url = el.getAttribute("item-url");

            if (!document.querySelector("#cart-" + id)) count = "1шт";
            else count = document.querySelector("#cart-" + id).querySelector("#quantity-" + id).value;
			
			
			
			if (min_zakaz && parseInt(count.replace(/\D+/g,"")) < parseInt(min_zakaz.replace(/\D+/g,""))) {
                console.log('----->',min_count)
                alert("Минимальный заказ " + min_zakaz + " единиц товара");
                
                return false;
            }
			//console.log(price_type);
        }
		
        var item = this.get(id);
        if (item) {
            item["quantity"] += parseInt(count.replace(/\D+/g,"")) * 1;
            this.save();
            return false;
        }
       
		this.objects.push({
            id: id,
            name: name,
            image: image,
            price: price * 1,
            quantity: parseInt(count.replace(/\D+/g,"")) * 1,
            url: url,
            min_zakaz: min_zakaz,
            step: step,
			price_type: document.querySelector('#cart-'+id).querySelector('.quantity').querySelector('input').getAttribute("price_type"),
        });
        this.save();

        $(".drop_cart")
            .find("li")
            .find(".quantity")
            .each(function (i, elem) {
                var value = parseInt($(elem).find("input").val());
                var min_zakaz = $(elem).find("button.minus_btn").attr("data-order");
                if (value == 1) {
                    $(elem).find("button.minus_btn").addClass("disabled");
                    $(elem).find("button.minus_btn").attr("disabled", true);
                }
                if (min_zakaz >= 1 && value <= min_zakaz) {
                    $(elem).find("button.minus_btn").addClass("disabled");
                    $(elem).find("button.minus_btn").attr("disabled", true);
                }
            });

        return false;
    },
    get: function (id) {
        for (var i = 0; i < this.objects.length; i++) {
            if (this.objects[i]["id"] == id) return this.objects[i];
        }
        return null;
    },
    remove: function (id, one) {
        var item = this.get(id);
        num = item["quantity"];
        if (parseInt(item["step"]) > 0) {
            num = num - parseInt(item["step"]);
            item["quantity"] = num + 1;
            if (item["quantity"] < item["min_zakaz"]) item["quantity"] = item["min_zakaz"];
            //this.save();
        }

        for (var i = 0; i < this.objects.length; i++) {
            if (this.objects[i].id == id) {
                if (one && this.objects[i]["quantity"] > 1) {
                    this.objects[i]["quantity"] -= 1;
                    this.save();
                    if (this.objects[i]["quantity"] <= 1 && one) {
                        $("li#cart-item-" + id)
                            .find("button.minus_btn")
                            .addClass("disabled");
                        $("li#cart-item-" + id)
                            .find("button.minus_btn")
                            .attr("disabled", true);

                        return false;
                    }
                    if (this.objects[i]["min_zakaz"] >= 1 && this.objects[i]["quantity"] <= this.objects[i]["min_zakaz"] && one) {
                        $("li#cart-item-" + id)
                            .find("button.minus_btn")
                            .addClass("disabled");
                        $("li#cart-item-" + id)
                            .find("button.minus_btn")
                            .attr("disabled", true);
                        return false;
                    }

                    return true;
                } else {
                    this.objects[i] = null;
                    this.objects.splice(i, 1);
                    this.save();
                    return true;
                }
            }
        }
    },
    /*drop: function() {
        $('.header .cart .yes a').parents('.cart').find('.drop_cart').toggleClass('visible');
        $('.header .cart .yes a').toggleClass('active');
    },*/
    /*pick: function() {
        $('.header .drop_cart').toggleClass('visible');
        $('.header .drop_cart').parents('li').find('a.sub_link').toggleClass('active');
    },*/
    show_box: function () {
        $(".header .cart .yes a").parents(".cart").find(".drop_cart").addClass("visible");
        this.mouse_over = true;
    },
    hide_box: function () {
        setTimeout(function () {
            if (!Cart.mouse_over) $(".header .cart .yes a").parents(".cart").find(".drop_cart").removeClass("visible");
        }, 200);
        this.mouse_over = false;
    },
    render_on_page: function () {
        /*
         * 0 = img
         * 1 = url
         * 2 = title
         * 3 = id
         * 4 = price
         * 5 = count
         * 6 = current_price ( price * count )
         */

        let template = '<div class="cart_item"><div class="pic"><img src="{0}" alt=""></div><div class="info"><div class="col"><div class="title"><a href="{1}">{2}</a></div><div class="desc"><ul><li>Код товара: <span>{3}</span></li></ul></div></div><div class="for_piece">{4}</div><div class="quantity quantity-new"><div class="quantity__content"><input type="text" name="count" value="{5}" data-step="{8}" oninput="Cart.update({3}, this.value)" data-order="{7}"><span class="quantity__units">{9}</span></div><div class="quantity__buttons"><button type="button" class="plus_btn" onclick="Cart.plus({3}, 1)">+</button><button data-order="{6}" type="button" class="minus_btn" onclick="Cart.remove({3}, true)">-</button></div></div><div class="price"><div class="col"><div class="new">{7}</div></div></div><div class="del" onclick="Cart.remove({3});"><a href="#"></a></div></div></div>';
        let html = "";
        let full_price = 0;
        let pef = [];

        $("#append-items-here")
            .find("div.cart_item")
            .find(".quantity")
            .each(function (i, elem) {
                var value = parseInt($(elem).find("input").val());
                var min_zakaz = $(elem).find("button.minus_btn").attr("data-order");

                if (value == 1) {
                    $(elem).find("button.minus_btn").addClass("disabled");
                    $(elem).find("button.minus_btn").attr("disabled", true);
                }
                if (min_zakaz >= 1 && value <= min_zakaz) {
                    $(elem).find("button.minus_btn").addClass("disabled");
                    $(elem).find("button.minus_btn").attr("disabled", true);
                }
            });

        for (let i = 0; i < this.objects.length; i++) {
            pef.push({
                id: this.objects[i]["id"] * 1,
                count: this.objects[i]["quantity"] * 1,
            });
            var price_type = declination(this.objects[i]["quantity"] * 1, this.objects[i]["price_type"].split(','));
			
			html += qrender(template, [
                this.objects[i]["image"],
                this.objects[i]["url"],
                this.objects[i]["name"],
                this.objects[i]["id"],
                this.objects[i]["price"].toFixed(2),
                this.objects[i]["quantity"],
                this.objects[i]["min_zakaz"],
                formater(this.objects[i]["price"] * this.objects[i]["quantity"]),
                this.objects[i]["step"],
				price_type,
                // (this.objects[i]['price'] * this.objects[i]['quantity']).toFixed(2)
            ]);
            full_price += this.objects[i]["price"] * this.objects[i]["quantity"];
        }

        //var step = parseInt($input[0].getAttribute('data-step'));

        $(".full_price").html(formater(full_price));

        $("#items-data").val(json.dumps(pef));

        $("#append-items-here").html(html);

        $("#append-items-here")
            .find("div.cart_item")
            .find(".quantity")
            .each(function (i, elem) {
                var value = parseInt($(elem).find("input").val());
                var min_zakaz = $(elem).find("button.minus_btn").attr("data-order");

                if (value == 1) {
                    $(elem).find("button.minus_btn").addClass("disabled");
                    $(elem).find("button.minus_btn").attr("disabled", true);
                }
                if (min_zakaz >= 1 && value <= min_zakaz) {
                    $(elem).find("button.minus_btn").addClass("disabled");
                    $(elem).find("button.minus_btn").attr("disabled", true);
                }
            });
    },

    render: function () {
        if ($("#append-items-here")) this.render_on_page();

        var cart_header = $("#cart-header");
        var count = this.objects.length;

        if (count > 0) {
            var sum = 0;
            var items_count = 0;
            for (var i = 0; i < count; i++) {
                items_count += this.objects[i]["quantity"];
                sum += this.objects[i]["price"] * this.objects[i]["quantity"];
            }
            var word = declOfNum(items_count, ["товар", "товара", "товаров"]);
            cart_header.html('<div class="yes" onmouseenter="Cart.show_box();" onmouseleave="Cart.hide_box();"><a href="#">' + items_count + " " + word + "</a> <span>на сумму " + formater(sum) + "</span></div>");

            $("#small-full-price").html(formater(sum));
            $("#cart-body ul").html(this.bake_html());
        } else {
            cart_header.html('<div class="not"><span>Пусто</span> 0 </div>');
            $("#cart-body ul").html("");
            $("#cart-body").removeClass("visible");
        }

        $("#url-b").click(function () {
            // document.location.href = "http://best-tara.ru";
            window.open("http://best-tara.ru", "_blank");
            //действия
            return false;
        });

        /*
        /*$(".breads a.sub_link, .mobile .header .cart .yes a, .tablet .header .cart .yes a").click(function () {
            //действия
            return false;
        });

        */

        /*if (!this.hover_triggers) {
            $('.header .cart .yes a').hover(
                function () {
                    $(this).parents('.cart').find('.drop_cart').toggleClass('visible');
                    $(this).toggleClass('active');
                }
            );
            $('.header .drop_cart').hover(
                function () {
                    $(this).toggleClass('visible');
                    $(this).parents('li').find('a.sub_link').toggleClass('active');
                }
            );
            console.log('da');
            this.hover_triggers = true;
        }*/
    },
    bake_html: function () {
        // var tpl = ['<li id="cart-item-{0}">', '<div class="pic">', '<img src="{2}" alt="">', "</div>", '<div class="title">', '<a href="{5}">{1}</a>', "</div>", '<div class="quantity">', '<button type="button" class="minus_btn" data-order="{6}" onclick="Cart.remove({0}, true)">-</button>', '<input type="text" name="count" value="{4} {7}" oninput="Cart.update({0}, this.value)">', '<button type="button" class="plus_btn" onclick="Cart.plus({0}, 1)">+</button>', "</div>", '<div class="price">{3}</div>', '<div class="del" onclick="Cart.remove({0});">', '<a href="#"></a>', "</div>", "</li>"].join(" ");
        var tpl = [
            '<li id="cart-item-{0}">',
            '<div class="pic">',
            '<img src="{2}" alt="">',
            "</div>",
            '<div class="title">',
            '<a href="{5}">{1}</a>',
            "</div>",
            '<div class="quantity header-quantity">',
            '<div class="quantity__content">',
            '<input type="text" name="count" value="{4}" oninput="Cart.update({0}, this.value)" data-order="{6}" data-step="{8}">',
            '<span class="quantity__units">{7}</span>',
            '</div>',
            '<div class="quantity__buttons">',
            '<button type="button" class="plus_btn" onclick="Cart.plus({0}, 1)">+</button>',
            '<button type="button" class="minus_btn" data-order="{6}" onclick="Cart.remove({0}, true)">-</button>',
            '</div>',
            "</div>",
            '<div class="price">{3}</div>',
            '<div class="del" onclick="Cart.remove({0});">',
            '<a href="#"></a>', "</div>", "</li>"]
            .join(" ");
        html = "";
        
        for (var i = 0; i < this.objects.length; i++) {
			var price_type = declination(this.objects[i]["quantity"], this.objects[i]["price_type"].split(','));
			html += qrender(tpl, [this.objects[i]["id"], this.objects[i]["name"], this.objects[i]["image"], this.objects[i]["price"].toFixed(2), this.objects[i]["quantity"], this.objects[i]["url"], this.objects[i]["min_zakaz"], price_type, this.objects[i]['step']]);
            // console.log(this.objects[i])
        }
        
        return html;
    },
};



window.addEventListener(
    "storage",
    function () {
        Cart.load();
        Favorite.load();
        if (window.location.href.includes("shop/cart")) Cart.render();
        if (window.location.href.includes("shop/favorite")) Favorite.render();
    },
    false
);

function declOfNum(number, titles) {
    cases = [2, 0, 1, 1, 1, 2];
    return titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
}

var qrender = function (html, variables) {
    for (var i = 0; i < variables.length; i++) {
        html = html.split("{" + i + "}").join(variables[i]);
    }
    return html;
};

var Tag = {
    url: null,
    item_url: null,
    category_id: null,
    edit_item_url: null,

    render: function (url, item_url, edit_item_url, category_id) {
        this.url = url;
        this.item_url = item_url;
        this.category_id = category_id;
        this.edit_item_url = edit_item_url;
        $(".title_menu").append('<div class="admin-shop-catalog-tag" onclick="return Tag.action_category(this.parentNode);"></div>');
        $(".data_menu li a").append('<div class="admin-shop-catalog-tag" onclick="return Tag.action_category(this.parentNode);"></div>');
        $(".product_item .product .title a").append('<div class="admin-shop-item-tag" onclick="return Tag.action_item(this.parentNode);"></div>');
        //.on('hover');
    },
    action_category: function (el) {
        var el_id = el.id || el;
        Modal.open(this.url.replace("0", el_id), {}, function () {
            q_form(".category-modal-tag form");
        });
        return false;
        // var link = el.find('a');
        // var id = el.id;
        // modal('Теги категории: ' + link.html() + ' (0)', '<input type="text" placeholder="Выберите тег"><br>В разработке..');
    },
    action_item: function (el) {
        var el_id = el;
        if ($(el).closest(".product_item").find("[item-id]")) {
            el_id = $(el).closest(".product_item").find("[item-id]").attr("item-id");
        }
        Modal.open(this.item_url.replace("222222222222222222222222", this.category_id).replace("111111111111111111111111", el_id), {}, function () {
            $(".category-tag-checklist input").on("click", Tag.edit_item);
        });
        return false;
    },
    edit_item: function (el) {
        var id = $("#edit-tag-item-id").val();
        var tag = el.target;
        xhr("post", Tag.edit_item_url, on_shop_tag_changed_item, {
            item: id,
            tag: $(tag).val(),
            attach: tag.checked ? 1 : 0,
        });
    },
};

var xhr = (function () {
    var xhr = new XMLHttpRequest();
    return function (method, url, callback, data) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                var msg = "Ошибка";
                var title = "Произошла непредвиденная ошибка. Попробуйте позднее.";
                if (xhr.status === 0) {
                    title = "Проблема доступа";
                    msg = "Отсутствует доступ к интернету. Проверьте соединение.";
                } else if (xhr.status == 404) {
                    title = "Проблема отображения";
                    msg = "Требуемая страница не найдена.";
                } else if (xhr.status == 500) {
                    title = "Технические неполадки";
                    msg = "Сервер перезагружается или ответил неправильно. Попробуйте через 2 минуты.";
                } else {
                    msg = "Необработанная ошибка:<br>" + xhr.responseText;
                }

                if (xhr.status == 200) {
                    if (typeof callback == "function") return callback(xhr.responseText);
                    // if (typeof callback == 'string' && callback.contains('.')) {
                    //     var parts = callback.split('.');
                    //     window[parts[0]][parts[1]]( xhr.responseText );
                    //     return
                    // }
                    window[callback](xhr.responseText);
                } else {
                    modal(title, msg);
                }
            }
        };
        xhr.onerror = function () {
            modal("Ошибка подключения", "Не получилось выполнить запрос. Проверьте интернет-соединение, повторите через пару минут.");
        };
        xhr.open(method, url);
        xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

        if (data) {
            if (is(data, "Object")) {
                var tmp = new FormData();
                var keys = Object.keys(data);
                for (var i = 0; i < keys.length; i++) {
                    tmp.append(keys[i], data[keys[i]]);
                }
                data = tmp;
            } else data = new FormData(data);
        } else data = null;

        if (data) {
            if (navigator.userAgent.indexOf("Opera") || (window.opera && opera.toString() == "[object Opera]")) {
                data.append("csrfmiddlewaretoken", getCookie("csrftoken"));
            }
        }
        xhr.send(data);
    };
})();

var is = function (obj, type) {
    return Object.prototype.toString.call(obj) === "[object " + type + "]";
};
var json = {};
json.dumps = function (data) {
    return JSON.stringify(data);
};
json.loads = function (data) {
    return JSON.parse(data);
};

function on_category_tag(request) {
    // console.log('on_category_tag', request);
    request = json.loads(request);

    if (request.errors) {
        var errors = "";
        var error_obj = json.loads(request.errors);
        var keys = Object.keys(error_obj);
        for (var i = 0; i < keys.length; i++) {
            errors += error_obj[keys[i]][0]["message"] + "<br>";
        }
        // modal('Исправьте ошибки', errors);
        $(".category-modal-tag .input-error:first-child").html(errors);
        return;
    }
    if (request.success) {
        if (request.error) {
            $(".category-modal-tag .input-error:first-child").html(errors); //modal('Ошибка', request.error);
            return;
        }
        $(".category-modal-tag .input-error:first-child").html("");
        document.querySelector('[q-form="on_category_tag"]').reset();

        Modal.hide();

        Tag.action_category(1 * request.category_id);
    }
}

function scroll_element(element) {
    var scrollElement = element.querySelector("tbody").querySelector("tr");
    $(scrollElement).position();
    //console.log(scrollElement);
}

function on_shop_tag_changed_item(request) {
    console.log(request);
}

function getCoords(elem) {
    // crossbrowser version
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top = box.top + scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
}

function modal(title, body) {
    Modal.hide();
    $("#black-box").toggleClass("active");
    Modal.show();
    Modal.render(title, body);
}

function on_comment_create(request) {
    request = json.loads(request);
    if (request.html) {
        $("#comments").prepend(request.html);
        document.getElementById("comments-form").reset();
        var el = $("#comments .comment:first-child");
        el.addClass("new");
        scrollTo(getCoords(el[0]).top - 60, 1500 * 0.5);
        setTimeout(function () {
            $("#comments .comment:first-child").removeClass("new");
        }, 1500);

        el.find(".star_rate").raty({
            readOnly: true,
            path: "/static/images",
            scoreName: "rating",
            hints: ["Очень плохо", "Плохо", "Нормально", "Хорошо", "Очень хорошо"],
            number: function () {
                return $(this).attr("data-number");
            },
            score: function () {
                return $(this).attr("data-score");
            },
        });
    } else {
        if (request.error) modal("Ошибка", request.error);
        if (request.errors) {
            var errors = "";
            var error_obj = json.loads(request.errors);
            var keys = Object.keys(error_obj);
            for (var i = 0; i < keys.length; i++) {
                // errors += error_obj[keys[i]][0]['message'] + '<br>';
                $(document.querySelector("#comments-form #id_" + keys[i]).parentNode)
                    .find(".input-error:first-child")
                    .html(error_obj[keys[i]][0]["message"]);
                //var ele = document.querySelector('#comments-form');
                //$(ele).find('#id_' + keys[i]).parent().find('.input-error:first-child').html(error_obj[keys[i]][0]['message']);
                //console.log($(ele).find('#id_' + keys[i]));
            }
            // modal('Исправьте ошибки', errors);
            //Q('#truckcreate-form #id_' + keys[i]).parentNode.find('.input-error:first-child').html(errors);
            return;
        }
    }
}

var Filter = {
    update_url: "/shop/filter/",
    category_id: null,
    disableClicks: false,

    // bottom
    width: 0,
    height: 0,
    deep: 0,
    price_min: 0,
    price_max: 0,

    page: 1,

    update: function (el, clicked) {
        if (this.disableClicks) return;

        if (el && clicked) {
            var data_slug = el.getAttribute("data-slug");
            var data_order = el.getAttribute("data-order");
            var data = window.location.pathname.split("/");
            while (data.length > 0) {
                var f = data.pop();
                if (f == "filter") break;
                var selected = f.split("-");
                if (selected[0] == data_order && selected[1] == data_slug) {
                    console.log("already selected");
                    $(el).prop("checked", false);
                }
            }
        }

        var data = {};
        if (this.category_id) data["category"] = this.category_id;

        var _filter = [];
        //$('.filter_drop input[type="radio"]:checked').each(function(i, el) {
        $('.filter_drop input[type="checkbox"]:checked').each(function (i, el) {
            _filter.push(el.getAttribute("data-order") + "-" + el.getAttribute("data-slug").replace("-", "_"));
        });

        if (Filter.width) _filter.push("w-" + Filter.width);
        if (Filter.height) _filter.push("h-" + Filter.height);
        if (Filter.deep) _filter.push("d-" + Filter.deep);

        if (Filter.price_min && !Number.isInteger(Filter.price_min)) _filter.push("pl-" + Filter.price_min.match(/\d+/g)[0]);
        if (Filter.price_max && !Number.isInteger(Filter.price_max)) _filter.push("ph-" + Filter.price_max.match(/\d+/g)[0]);

        if (Filter.price_min && Number.isInteger(Filter.price_min)) _filter.push("pl-" + Filter.price_min);
        if (Filter.price_max && Number.isInteger(Filter.price_max)) _filter.push("ph-" + Filter.price_max);
        //if (Filter.price_min) _filter.push('pl-' + Filter.price_min.match(/\d+/g)[0]);
        //if (Filter.price_max) _filter.push('ph-' + Filter.price_max.match(/\d+/g)[0]);

        data["filter"] = _filter.join("/");
        data["page"] = this.page;

        $("#black-box").toggleClass("active");
        $(".wrapper").addClass("modal");
        Modal.loading();

        if (this.category_id) {
            //xhr('post', this.update_url + this.category_id + '/' + data['filter'], Filter.on_update, data);
            xhr("post", this.update_url + this.category_id + "/", Filter.on_update, data);
        } else {
            //xhr('post', this.update_url + data['filter'], Filter.on_update, data);
            xhr("post", this.update_url, Filter.on_update, data);
        }
    },
    next_page: function () {
        if (this._append) return;

        $("#black-box").toggleClass("active");
        $(".wrapper").addClass("modal");
        Modal.loading();

        this.page += 1;
        this._append = true;
        Filter.update();
    },
    on_update: function (request) {
        Modal.hide();
        var request = json.loads(request);
        // 2. update url
        //window.history.pushState({"html":document.body.innerHTML,"pageTitle":"Фильтрация товаров"},"", request.url);
        //window.history.pushState({"html":request.body,"pageTitle":"Фильтрация товаров"},"", request.url);
        // 3. update items
        if (Filter._append) {
            Filter._append = false;
            $(".show-more-w").remove();
            $(".content").append(request.body);
        } else {
            $(".content").html(request.body);
        }
        // 4. update filter
        //$('#filter-drop').html(request.filter);
        //Filter.markFilters();
        $(".filter_btn.open").click();

        // reforge
        //$('.content').html(request.body);
    },
    bottom_changed: function (el, key) {
        Filter[key] = el.value;
    },
    markFilters: function () {
        var data = window.location.pathname.split("/");

        this.disableClicks = true;

        $("[data-order][data-slug]").prop("checked", false);

        while (data.length > 0) {
            var f = data.pop();
            if (f == "filter") break;
            var selected = f.split("-");
            $('[data-order="' + selected[0] + '"][data-slug="' + selected[1] + '"]').click();
        }

        filter_visual();

        this.disableClicks = false;
    },
};

function filter_visual() {
    $("#width_range").slider({
        range: "min",
        min: 0,
        max: 3000,
        value: Filter.width,
        slide: function (event, ui) {
            if (ui.value <= 0) {
                $("#field_width").val("Любая");
            } else {
                $("#field_width").val(ui.value);
            }
            Filter.width = ui.value;
        },
    });
    $("#width_range").on("change", function () {
        console.log("da", this.value);
    });
    $("#field_width").val($("#width_range").slider("value"));

    $("#length_range").slider({
        range: "min",
        min: 0,
        max: 3800,
        value: Filter.height,
        step: 1,
        slide: function (event, ui) {
            if (ui.value <= 0) {
                $("#field_length").val("Любая");
            } else {
                $("#field_length").val(ui.value);
            }
            Filter.height = ui.value;
        },
    });

    var FL = $("#length_range").slider("value");

    if (FL <= 0) {
        $("#field_length").val("Любая");
    } else {
        $("#field_length").val(FL);
    }

    $("#thickness_range").slider({
        range: "min",
        min: 0,
        max: 250,
        value: Filter.deep,
        step: 1,
        slide: function (event, ui) {
            if (ui.value <= 0) {
                $("#field_thickness").val("Любая");
            } else {
                $("#field_thickness").val(ui.value);
            }
            Filter.deep = ui.value;
        },
    });

    var FT = $("#thickness_range").slider("value");

    if (FT <= 0) {
        $("#field_thickness").val("Любая");
    } else {
        $("#field_thickness").val(FT);
    }

    $("#price_range").slider({
        range: true,
        min: 1, //Filter.price_min,
        max: 99999,
        values: [0, 99999],
        slide: function (event, ui) {
            $("#field_from").val("от " + ui.values[0]);
            $("#field_before").val("до " + ui.values[1]);
            Filter.price_min = ui.values[0];
            Filter.price_max = ui.values[1];
        },
    });
    $("#field_from").val("от " + $("#price_range").slider("values", 0));
    $("#field_before").val("до " + $("#price_range").slider("values", 1));
}

window.onpopstate = function (e) {
    if (e.state) {
        if (Filter && Filter.update_url) {
            //document.body.innerHTML = e.state.html;
            $(".content").html(e.state.html);
            document.title = e.state.pageTitle;
            Filter.markFilters();
        }
    }
};

function formater(int) {
    var formatter = new Intl.NumberFormat("ru");
    return formatter.format(int);
}



function declination(number, words) {  
	return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
}