/*var Filter = {
    hover_triggers: false,
    mouse_over: false,
    objects: {},

    set: function (field, val) {
        if (JSON.parse(get_cookie("filter")))
        this.objects = JSON.parse(get_cookie("filter"));
        switch (field) {
        case "page":
            this.objects["page-sort"] = val;
            break;
        case "sort":
            this.objects["sort"] = val;
            break;
        case "tags":
            this.objects["tags"] = val.filter(
            (it, index) => index === val.indexOf((it = it.trim()))
            );
            if (this.objects["tags"].length < 1) delete this.objects["tags"];
            break;
    }

    console.log(this.objects, JSON.stringify(this.objects));
    set_cookie("filter", JSON.stringify(this.objects));
    //localStorage.setItem('filter', JSON.stringify(this.objects));
    location.href = window.location.pathname;

    //location.reload();
    },
    change: function (field) {
        this.objects = JSON.parse(get_cookie("filter"));

        switch (field) {
        case "page":
            this.objects["page"] = val;
            break;
        case "sort":
            this.objects["sort"] = val;
            break;
        case "tags":
            this.objects["tags"] = Array.form(new Set(val));
            break;
        }
    },
    render: function () {
        //let filter = JSON.parse(localStorage.getItem('filter'));
        let filter = JSON.parse(get_cookie("filter"));

        if (filter) {
        if (filter["tags"]) {
            $.each(filter["tags"], function (i, item) {
            if (item) {
                $("a[href='id-" + item + "']").each(function (indx, element) {
                element.classList.add("active-tag");
                });
            }
            });
        }
        if (filter["page"]) {
            Array.from($(".products-on-page li")).forEach((item) => {
            item.classList.remove("active");
            });
            $(".products-on-page li a[href='#" + filter["page"] + "']")
            .parent()
            .attr("class", "active");
        }
        if (filter["sort"]) {
            $("select#sort-select").val(filter["sort"]);
        }
        }
    },
};*/







// Переменная с куками

function setSortFilter() {
    
    sortFilter = {
        sort_by: 'popular',
        page: '24'
    }

    tmp = JSON.stringify(sortFilter);
    set_cookie('Filter_sort', tmp);
    $(document).ready(function () {
        $('.amount_materials .selecter-element').val(24);
    });
}


$(document).ready(function () {

    if(!get_cookie("Filter_sort")){
        console.log('ставим по умолчанию куку ',get_cookie("Filter_sort"));
        setSortFilter();
    } 

    
	
	$('.sort .sort_by select option').removeAttr('selected');
    $('.sort .amount_materials select option').removeAttr('selected');
    let tmpSortFilter = JSON.parse(get_cookie("Filter_sort"));
    $('.amount_materials .selecter.selecter-element').val(tmpSortFilter.page);
	$('.sort .sort_by select').val(tmpSortFilter.sort_by);
    $('.sort .amount_materials select').val(tmpSortFilter.sort_by);

    $('.sort .sort_by select option[value="'+tmpSortFilter.sort_by+'"]').attr('selected', true);
    $('.sort .amount_materials select option[value="'+tmpSortFilter.page+'"]').attr('selected',true);

    $('.selecter').selecter();



	$("select#sort-item").change(function (e) {
		let tmp = JSON.parse(get_cookie("Filter_sort"));
		tmp.sort_by = e.target.value;
		tmp = JSON.stringify(tmp);
		set_cookie('Filter_sort', tmp);
		console.log('chan')
		window.location.reload();
	});

	$(".amount_materials select").change(function (e) {
		let tmp = JSON.parse(get_cookie("Filter_sort"));
		tmp.page = e.target.value;
        $('.amount_materials .selecter-element').val(tmp.page)
		tmp = JSON.stringify(tmp);
		set_cookie('Filter_sort', tmp);
		console.log('chan 2')
		window.location.reload();
	});
});

/*
$(document).on("click", ".tags-list li a", function (event) {
    var tags = [];
    event.preventDefault();
    classes = $(event.target).attr("class");
    if (classes === undefined || classes == "") {
        $(event.target).addClass("active-tag");
    } else $(event.target).removeClass("active-tag");

    $(".tags-list a.active-tag").each(function (indx, element) {
        tags.push(element.getAttribute("href").split("-")[1]);
    });
    tags = tags.slice(0, 5);
    Filter.set("tags", tags);
});

$(document).on("click", ".products-on-page a", function (event) {
    event.preventDefault();
    $(".products-on-page li").each(function (indx, element) {
        $(element).removeClass("active");
    });
    $(event.target).parent().addClass("active");
    Filter.set("page", event.target.getAttribute("href").split("#")[1]);
});

$(document).on("change", "select#sort-select", function (event) {
    console.log($(event.target).val());
    Filter.set("sort", $(event.target).val());
});

$(document).click(function (e) {
    if (
        $(e.target).closest(".product-title").length ||
        $(e.target).closest(".page-navigation").length ||
        $(e.target).closest(".catalog-bar").length ||
        $(e.target).closest(".tags-list").length ||
        $(e.target).closest(".product-quant").length ||
        $(e.target).closest(".main-btn").length
    ) {
        return;
    }
    delete_cookie("filter");
});*/


// if(!get_cookie('is_active')) set_cookie('is_active', 0);
// $('.filter').on('change', 'input[type=checkbox]', function() {
// if(this.checked) set_cookie('is_active', 1);
// else  			set_cookie('is_active', 0);
// location.reload();
// console.log('change', this.checked, this.value);
// });
// if(get_cookie('is_active') == 1) $('.filter input[type=checkbox]').attr('checked','checked');



function get_cookie(cookie_name) {
    var results = document.cookie.match(
        "(^|;) ?" + cookie_name + "=([^;]*)(;|$)"
    );
    if (results) return unescape(results[2]);
    else return null;
}

function delete_cookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function set_cookie(name, value) {
    document.cookie = name +'='+ value +'; Path=/;';
}