var Favorite = {
    hover_triggers: false,
    mouse_over: false,
    objects: [],
    save: function () {
        localStorage.setItem("favorite", JSON.stringify(this.objects));
        this.render();
    },
    load: function () {
        this.objects = JSON.parse(localStorage.getItem("favorite"));
        if (!this.objects) this.objects = [];
        if (this.objects.length > 0) document.querySelector("#link-favorite").style.display = "block";
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
        if (item) {
            item["quantity"] += num;
            this.save();
            return false;
        }
    },
    update: function (id, val) {
        /*var item = this.get(id);
        val = val.replace("шт", "") * 1;
        if (val < 1) return;

        if (item) {
            item["quantity"] = val;
            this.save();
            return false;
        }*/
        var item = this.get(id);
		var val = parseInt(val.replace(/\D+/g,"")) * 1;

		let price_type = declination(item.min_zakaz, item['price_type'].split(','));
		//var stop = false;

		if (val < Number(item.min_zakaz)) {
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

            return false;
        }

        if (val < 1) return;

        if (item) {
            item["quantity"] = val;
            this.save();
            return false;
        }
    },
    add: function (id, name, image, price, count) {
        var name = name || null;
        document.querySelector("#link-favorite").style.display = "block";
        set_cookie("favorite", true);
        if (!name) {
            var el = id;
            id = el.getAttribute("item-id");
            name = el.getAttribute("item-name");
            image = el.getAttribute("item-image");
            price = el.getAttribute("item-price");
            url = el.getAttribute("item-url");
            count = document.querySelector("#cart-" + id).querySelector("#quantity-" + id).value;
			step = document.querySelector("#cart-"+ id).querySelector("[data-step]").getAttribute("data-step");
        }
       
        var item = this.get(id);
        if (item) {
            item["quantity"] += parseInt(count.replace(/\D+/g,"")) * 1;
            this.save();
            return false;
        }
        console.log('quantity', parseInt(count.replace(/\D+/g,"")));
		this.objects.push({
            id: id,
            name: name,
            image: image,
            price: price * 1,
            quantity: parseInt(count.replace(/\D+/g,"")) * 1,
            url: url,
			price_type: document.querySelector('#cart-'+id).querySelector('.quantity').querySelector('input').getAttribute("price_type"),
			step: step,
        });
        this.save();

        return false;
    },
    get: function (id) {
        for (var i = 0; i < this.objects.length; i++) {
            if (this.objects[i]["id"] == id) return this.objects[i];
        }
        return null;
    },
    remove: function (id, one) {
        for (var i = 0; i < this.objects.length; i++) {
            if (this.objects[i].id == id) {
                if (one && this.objects[i]["quantity"] > 1) {
                    this.objects[i]["quantity"] -= 1;
                    this.save();
                    //return true;
                } else {
                    this.objects[i] = null;
                    this.objects.splice(i, 1);
                    this.save();
                    //return true;
                }
            }
        }
        if (this.objects.length == 0) {
            delete_cookie("favorite");
            document.querySelector("#link-favorite").style.display = "none";
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
            if (!Favorite.mouse_over) $(".header .cart .yes a").parents(".cart").find(".drop_cart").removeClass("visible");
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

        let template = '<div class="cart_item" id="cart-{3}"><span style="display: none;" class="quantity"><input price_type="{8}" type="hidden" value="{5}"></span><input id="quantity-{3}" type="hidden" value="{5}"><div class="pic"><img src="{0}" alt=""></div><div class="info"><div class="col"><div class="title"><a href="{1}">{2}</a></div><div class="desc"><ul><li>Код товара: <span>{3}</span></li></ul></div></div><div class="for_piece">{4}</div><div class="price"><a href="#" onclick="return Cart.add({3});" data-step="{9}" item-id="{3}" item-name="{2}" item-image="{0}" item-price="{4}" item-url="{1}">В корзину</a></div><div class="del" onclick="Favorite.remove({3});"><a href="#"></a></div></div></div>';
        
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
            html += qrender(template, [
                this.objects[i]["image"],
                this.objects[i]["url"],
                this.objects[i]["name"],
                this.objects[i]["id"],
                this.objects[i]["price"],
                this.objects[i]["quantity"],
                this.objects[i]["min_zakaz"],
                formater(this.objects[i]["price"] * this.objects[i]["quantity"]),
				this.objects[i]["price_type"],
				this.objects[i]["step"], 				
                // (this.objects[i]['price'] * this.objects[i]['quantity']).toFixed(2)
            ]);
            full_price += this.objects[i]["price"] * this.objects[i]["quantity"];
        }

        $(".full_price").html(formater(full_price));

        $("#items-data").val(json.dumps(pef));

        $("#append-items-heres").html(html);
    },

    render: function () {
        if ($("#append-items-heres")) this.render_on_page();

        single_prodict = document.querySelector(".add_cart a.like");
        if (single_prodict) {
            prodict = this.objects.filter(function (itm) {
                return itm.id == single_prodict.getAttribute("item-id");
            });
            if (prodict[0]) {
                single_prodict.innerText = "Убрать";
                single_prodict.setAttribute("onclick", "Favorite.remove(" + single_prodict.getAttribute("item-id") + ");return false;");
            } else {
                single_prodict.innerText = "в избранное";
                single_prodict.setAttribute("onclick", "return Favorite.add(this);");
            }
        }

        var cart_header = $("#cart-header");
        var count = this.objects.length;

        if (count > 0) {
            $("span.favorite-count").text(count);
            var sum = 0;
            var items_count = 0;
            for (var i = 0; i < count; i++) {
                items_count += this.objects[i]["quantity"];
                sum += this.objects[i]["price"] * this.objects[i]["quantity"];
            }
            var word = declOfNum(items_count, ["товар", "товара", "товаров"]);
            //cart_header.html('<div class="yes" onmouseenter="Favorite.show_box();" onmouseleave="Favorite.hide_box();"><a href="#">'+ items_count + ' ' + word +'</a> <span>на сумму '+ formater(sum) +'</span></div>');

            //$('#small-full-price').html(formater(sum));
            //$('#cart-body ul').html(this.bake_html());
        } else {
            $("span.favorite-count").text(0);
            //cart_header.html('<div class="not"><span>В корзине</span> ничего нет :(</div>');
            //$('#cart-body ul').html('');
            //$('#cart-body').removeClass('visible');
        }
    },
    bake_html: function () {
        var tpl = ['<li id="cart-item-{0}">', '<div class="pic">', '<img src="{2}" alt="">', "</div>", '<div class="title">', '<a href="{5}">{1}</a>', "</div>", '<div class="quantity">', '<button type="button" class="minus_btn" onclick="Favorite.remove({0}, true)">-</button>', '<input type="text" name="count" value="{4} шт" oninput="Favorite.update({0}, this.value)">', '<button type="button" class="plus_btn" onclick="Favorite.plus({0}, 1)">+</button>', "</div>", '<div class="price">{3}</div>', '<div class="del" onclick="Favorite.remove({0});">', '<a href="#"></a>', "</div>", "</li>"].join(" ");

        html = "";
        for (var i = 0; i < this.objects.length; i++) {
            html += qrender(tpl, [this.objects[i]["id"], this.objects[i]["name"], this.objects[i]["image"], this.objects[i]["price"].toFixed(2), this.objects[i]["quantity"], this.objects[i]["url"], this.objects[i]["min_zakaz"]]);
        }

        return html;
    },
};