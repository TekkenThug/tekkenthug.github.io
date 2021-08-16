$(document).ready(function () {
   
	var tabs = $('#tabs');
    $('.tab_content .item_tab', tabs).each(function (i) {
        if (i != 0) $(this).hide(0);
    });
    tabs.on('click', '.nav_tab a', function (e) {
        e.preventDefault();
        var tabId = $(this).attr('href');
        $('.nav_tab a', tabs).removeClass();
        $(this).addClass('active');
        $('.tab_content .item_tab', tabs).hide(0);
        $(tabId).show();
    });

    $('.next_tab').click(function(){
        var active = $('.nav_tab a.active');
        var index = $('.nav_tab a').index(active);
        active.parent().next().find('a').click();
        return false;
    });

    var pf = $(".packing_form li.active").attr("rel");
    $('.type .item, #calculation_tab .item').hide(0);
    $('#' + pf).show();
    $('#calc-' + pf).show();

    var type_box_active = $('#type_tab #box li.active').attr("rel");
    $('#calc-box .type_calc').hide(0);
    $('#' + type_box_active).show();

    var type_barrel_active = $('#type_tab #barrel li.active').attr("rel");
    $('#calc-barrel .type_calc').hide(0);
    $('#' + type_barrel_active).show();


    $('.packing_form li').click(function () {
        $('.packing_form li').removeClass('active');
        $(this).addClass('active');
        var pf_active = $(this).attr("rel");
        $('.type .item, #calculation_tab .item').hide(0);
        $('#' + pf_active).show();
        $('#calc-' + pf_active).show();
    });

    $('#type_tab #box li').click(function () {
        $('#type_tab #box li').removeClass('active');
        $(this).addClass('active');
        var tba = $(this).attr("rel");
        $('#calc-box .type_calc').hide(0);
        $('#' + tba).show();
    });

    $('#type_tab #barrel li').click(function () {
        $('#type_tab #barrel li').removeClass('active');
        $(this).addClass('active');
        var tbaa = $(this).attr("rel");
        $('#calc-barrel .type_calc').hide(0);
        $('#' + tbaa).show();
    });
	
	var boxPripusk = 0.05;
	var barrelPripusk = 0.025;
	
	$('#box-type-1 .length, #box-type-1 .width, #box-type-1 .height, #box-type-1 .pripusk-height, #box-type-1 .pripusk-width').keyup(function() {
		var parentId = '#box-type-1';    			
	    var length = Number($(parentId + ' .length').val());
	    var width = Number($(parentId+ ' .width').val());
	    var height = Number($(parentId + ' .height').val());
	    var pripuskHeight = Number($(parentId + ' .pripusk-height').val());
	    var pripuskWidth = Number($(parentId + ' .pripusk-width').val());
	    console.log('ляял' + width);
	    if (($(this).attr('class') == 'height') && height) {
	    	$(parentId + ' .pripusk-height').val(Math.round(height * boxPripusk * 100) / 100);
	    }
	    if (($(this).attr('class') == 'width') && width) {
	    	$(parentId + ' .pripusk-width').val(Math.round(width * boxPripusk * 100) / 100);
	    }
	    
	    if (length
		        && width
		        && height
		        && pripuskHeight
		        && pripuskWidth) {
	        /*
	    	Р”Р»СЏ РєР°СЂС‚РёРЅРєРё 111:
			Р”Р»РёРЅР° РІРєР»Р°РґС‹С€Р° = (РќР°РёР±РѕР»СЊС€РµРµ РёР· Р·РЅР°С‡РµРЅРёР№ С€РёСЂРёРЅР° РёР»Рё РґР»РёРЅР°) + РїСЂРёРїСѓСЃРє РїРѕ С€РёСЂРёРЅРµ.
			Р’С‹СЃРѕС‚Р° РІРєР»Р°РґС‹С€Р° = РІС‹СЃРѕС‚Р°+(РЅР°РёРјРµРЅСЊС€РµРµ РёР· Р·РЅР°С‡РµРЅРёР№ С€РёСЂРёРЅР° РёР»Рё РґР»РёРЅР°)/2 + РїСЂРёРїСѓСЃРє РїРѕ РІС‹СЃРѕС‚Рµ.
			Р”Р»РёРЅР° С„Р°Р»СЊС†Р° = (РќР°РёРјРµРЅСЊС€РµРµ РёР· Р·РЅР°С‡РµРЅРёР№ С€РёСЂРёРЅР° РёР»Рё РґР»РёРЅР°)/2
			*/
	    	var resultLength = Math.max(length, width) + pripuskWidth;
	    	$(parentId + ' .result-length').val(resultLength);
	    	var resultHeight = height + Math.min(length, width)/2 + pripuskHeight;
	    	$(parentId + ' .result-height').val(resultHeight);			        
	    	var resultFalzLength = Math.min(length, width)/2;
	    	$(parentId + ' .result-falz-length').val(resultFalzLength);
	    }
	});
	
	$('#box-type-2 .length, #box-type-2 .width, #box-type-2 .height, #box-type-2 .pripusk-height, #box-type-2 .pripusk-width').keyup(function() {
		var parentId = '#box-type-2';    			
	    var length = Number($(parentId + ' .length').val());
	    var width = Number($(parentId+ ' .width').val());
	    var height = Number($(parentId + ' .height').val());
	    var pripuskHeight = Number($(parentId + ' .pripusk-height').val());
	    var pripuskWidth = Number($(parentId + ' .pripusk-width').val());
	
	    if (($(this).attr('class') == 'height') && height) {
	    	$(parentId + ' .pripusk-height').val(Math.round(height * boxPripusk * 100) / 100);
	    }
	    if (($(this).attr('class') == 'width') && width) {
	    	$(parentId + ' .pripusk-width').val(Math.round(width * boxPripusk * 100) / 100);
	    }
	    
	    if (length
		        && width
		        && height
		        && pripuskHeight
		        && pripuskWidth) {
	        /*
	    	Р”Р»СЏ РєР°СЂС‚РёРЅРєРё 112:
	    	Р”Р»РёРЅР° РІРєР»Р°РґС‹С€Р° = (РќР°РёР±РѕР»СЊС€РµРµ РёР· Р·РЅР°С‡РµРЅРёР№ С€РёСЂРёРЅР° РёР»Рё РґР»РёРЅР°) + РїСЂРёРїСѓСЃРє РїРѕ С€РёСЂРёРЅРµ.
	    	Р’С‹СЃРѕС‚Р° РІРєР»Р°РґС‹С€Р° = РІС‹СЃРѕС‚Р°+(РЅР°РёРјРµРЅСЊС€РµРµ РёР· Р·РЅР°С‡РµРЅРёР№ С€РёСЂРёРЅР° РёР»Рё РґР»РёРЅР°) + РїСЂРёРїСѓСЃРє РїРѕ РІС‹СЃРѕС‚Рµ.
	    	Р”Р»РёРЅР° С„Р°Р»СЊС†Р° = (РќР°РёРјРµРЅСЊС€РµРµ РёР· Р·РЅР°С‡РµРЅРёР№ С€РёСЂРёРЅР° РёР»Рё РґР»РёРЅР°)/2
			*/
	    	var resultLength = Math.max(length, width) + pripuskWidth;
	    	$(parentId + ' .result-length').val(resultLength);
	    	var resultHeight = height + Math.min(length, width) + pripuskHeight;
	    	$(parentId + ' .result-height').val(resultHeight);			        
	    	var resultFalzLength = Math.min(length, width)/2;
	    	$(parentId + ' .result-falz-length').val(resultFalzLength);
	    }
	});
	
	$('#box-type-3 .length, #box-type-3 .width, #box-type-3 .height, #box-type-3 .pripusk-height, #box-type-3 .pripusk-width, #box-type-3 .zavjazka-length-1').keyup(function() {
		var parentId = '#box-type-3';
	    var length = Number($(parentId + ' .length').val());
	    var width = Number($(parentId+ ' .width').val());
	    var height = Number($(parentId + ' .height').val());
	    var pripuskHeight = Number($(parentId + ' .pripusk-height').val());
	    var pripuskWidth = Number($(parentId + ' .pripusk-width').val());
	    var zavjazka1 = Number($(parentId + ' .zavjazka-length-1').val());
	
	    if (($(this).attr('class') == 'height') && height) {
	    	$(parentId + ' .pripusk-height').val(Math.round(height * boxPripusk * 100) / 100);
	    }
	    if (($(this).attr('class') == 'width') && width) {
	    	$(parentId + ' .pripusk-width').val(Math.round(width * boxPripusk * 100) / 100);
	    }
	    
	    if (length
		        && width
		        && height
		        && pripuskHeight
		        && pripuskWidth
		        && zavjazka1) {
	        /*
	    	Р”Р»СЏ РєР°СЂС‚РёРЅРєРё 113:
	    	Р”Р»РёРЅР° РІРєР»Р°РґС‹С€Р° = (РќР°РёР±РѕР»СЊС€РµРµ РёР· Р·РЅР°С‡РµРЅРёР№ С€РёСЂРёРЅР° РёР»Рё РґР»РёРЅР°) + РїСЂРёРїСѓСЃРє РїРѕ С€РёСЂРёРЅРµ.
	    	Р’С‹СЃРѕС‚Р° РІРєР»Р°РґС‹С€Р° = РІС‹СЃРѕС‚Р°+(РЅР°РёРјРµРЅСЊС€РµРµ РёР· Р·РЅР°С‡РµРЅРёР№ С€РёСЂРёРЅР° РёР»Рё РґР»РёРЅР°) + РїСЂРёРїСѓСЃРє РїРѕ С€РёСЂРёРЅРµ + Р”Р»РёРЅР° Р·Р°РІСЏР·РєРё
	    	Р”Р»РёРЅР° С„Р°Р»СЊС†Р° = (РќР°РёРјРµРЅСЊС€РµРµ РёР· Р·РЅР°С‡РµРЅРёР№ С€РёСЂРёРЅР° РёР»Рё РґР»РёРЅР°)/2
			*/
	    	var resultLength = Math.max(length, width) + pripuskWidth;
	    	$(parentId + ' .result-length').val(resultLength);
	    	var resultHeight = height + Math.min(length, width) + pripuskWidth + zavjazka1;
	    	$(parentId + ' .result-height').val(resultHeight);			        
	    	var resultFalzLength = Math.min(length, width)/2;
	    	$(parentId + ' .result-falz-length').val(resultFalzLength);
	    }
	});
	
	$('#box-type-4 .length, #box-type4 .width, #box-type-4 .height, #box-type-4 .pripusk-height, #box-type-4 .pripusk-width, #box-type-4 .zavjazka-length-1, #box-type-4 .zavjazka-length-2').keyup(function() {
		var parentId = '#box-type-4';    			
	    var length = Number($(parentId + ' .length').val());
	    var width = Number($(parentId+ ' .width').val());
	    var height = Number($(parentId + ' .height').val());
	    var pripuskHeight = Number($(parentId + ' .pripusk-height').val());
	    var pripuskWidth = Number($(parentId + ' .pripusk-width').val());
	    var zavjazka1 = Number($(parentId + ' .zavjazka-length-1').val());
	    var zavjazka2 = Number($(parentId + ' .zavjazka-length-2').val());
	
	    if (($(this).attr('class') == 'height') && height) {
	    	$(parentId + ' .pripusk-height').val(Math.round(height * boxPripusk * 100) / 100);
	    }
	    if (($(this).attr('class') == 'width') && width) {
	    	$(parentId + ' .pripusk-width').val(Math.round(width * boxPripusk * 100) / 100);
	    }
	    
	    if (length
		        && width
		        && height
		        && pripuskHeight
		        && pripuskWidth
		        && zavjazka1
		        && zavjazka2) {
	        /*
	    	Р”Р»СЏ РєР°СЂС‚РёРЅРєРё 114:
	    	Р”Р»РёРЅР° РІРєР»Р°РґС‹С€Р° = (РќР°РёР±РѕР»СЊС€РµРµ РёР· Р·РЅР°С‡РµРЅРёР№ С€РёСЂРёРЅР° РёР»Рё РґР»РёРЅР°) + РїСЂРёРїСѓСЃРє РїРѕ С€РёСЂРёРЅРµ.
	    	Р’С‹СЃРѕС‚Р° РІРєР»Р°РґС‹С€Р° = РІС‹СЃРѕС‚Р°+(РЅР°РёРјРµРЅСЊС€РµРµ РёР· Р·РЅР°С‡РµРЅРёР№ С€РёСЂРёРЅР° РёР»Рё РґР»РёРЅР°) + РїСЂРёРїСѓСЃРє РїРѕ С€РёСЂРёРЅРµ + Р”Р»РёРЅР° Р·Р°РІСЏР·РєРё РЅРёР· + РґР»РёРЅР° Р·Р°РІСЏР·РєРё РІРµСЂС…
	    	Р”Р»РёРЅР° С„Р°Р»СЊС†Р° = (РќР°РёРјРµРЅСЊС€РµРµ РёР· Р·РЅР°С‡РµРЅРёР№ С€РёСЂРёРЅР° РёР»Рё РґР»РёРЅР°)/2    		            
			*/
	    	var resultLength = Math.max(length, width) + pripuskWidth;
	    	$(parentId + ' .result-length').val(resultLength);
	    	var resultHeight = height + Math.min(length, width) + pripuskWidth + zavjazka1 + zavjazka2;
	    	$(parentId + ' .result-height').val(resultHeight);			        
	    	var resultFalzLength = Math.min(length, width)/2;
	    	$(parentId + ' .result-falz-length').val(resultFalzLength);
	    }
	});
	
	$('#box-type-5 .length, #box-type-5 .width, #box-type-5 .height, #box-type-5 .pripusk-height, #box-type-5 .pripusk-width, #box-type-5 .zavjazka-length-1').keyup(function() {
		var parentId = '#box-type-5';    			
	    var length = Number($(parentId + ' .length').val());
	    var width = Number($(parentId+ ' .width').val());
	    var height = Number($(parentId + ' .height').val());
	    var pripuskHeight = Number($(parentId + ' .pripusk-height').val());
	    var pripuskWidth = Number($(parentId + ' .pripusk-width').val());
	    var zavjazka1 = Number($(parentId + ' .zavjazka-length-1').val());
	
	    if (($(this).attr('class') == 'height') && height) {
	    	$(parentId + ' .pripusk-height').val(Math.round(height * boxPripusk * 100) / 100);
	    }
	    if (($(this).attr('class') == 'width') && width) {
	    	$(parentId + ' .pripusk-width').val(Math.round(width * boxPripusk * 100) / 100);
	    }
	    
	    if (length
		        && width
		        && height
		        && pripuskHeight
		        && pripuskWidth
		        && zavjazka1) {
	        /*
	    	Р”Р»СЏ РєР°СЂС‚РёРЅРєРё 115: (РЅР° РєР°СЂС‚РёРЅРєРµ РѕС‡РµРїСЏС‚РєР° - РІРјРµСЃС‚Рѕ РґР»РёРЅРЅС‹ Р·Р°РІСЏР·РєРё РЅР°РїРёСЃР°РЅРѕ Р”Р»РёРЅР° РІРєР»Р°РґС‹С€Р°, РЅР°Рґ СЂРµР·СѓР»СЊС‚Р°С‚РѕРј РµС‰Рµ, РёСЃРїСЂР°РІРёС‚СЊ РЅР° "РІРєР»Р°РґС‹С€Р°")
	    	Р”Р»РёРЅР° РІРєР»Р°РґС‹С€Р° = (РќР°РёР±РѕР»СЊС€РµРµ РёР· Р·РЅР°С‡РµРЅРёР№ С€РёСЂРёРЅР° РёР»Рё РґР»РёРЅР°) + РїСЂРёРїСѓСЃРє РїРѕ С€РёСЂРёРЅРµ.
	    	Р’С‹СЃРѕС‚Р° РІРєР»Р°РґС‹С€Р° = РІС‹СЃРѕС‚Р°+(РЅР°РёРјРµРЅСЊС€РµРµ РёР· Р·РЅР°С‡РµРЅРёР№ С€РёСЂРёРЅР° РёР»Рё РґР»РёРЅР°)/2 + РїСЂРёРїСѓСЃРє РїРѕ С€РёСЂРёРЅРµ + Р”Р»РёРЅР° Р·Р°РІСЏР·РєРё
	    	Р”Р»РёРЅР° С„Р°Р»СЊС†Р° = (РќР°РёРјРµРЅСЊС€РµРµ РёР· Р·РЅР°С‡РµРЅРёР№ С€РёСЂРёРЅР° РёР»Рё РґР»РёРЅР°)/2 		            
			*/
	    	var resultLength = Math.max(length, width) + pripuskWidth;
	    	$(parentId + ' .result-length').val(resultLength);
	    	var resultHeight = height + Math.min(length, width)/2 + pripuskWidth + zavjazka1;
	    	$(parentId + ' .result-height').val(resultHeight);			        
	    	var resultFalzLength = Math.min(length, width)/2;
	    	$(parentId + ' .result-falz-length').val(resultFalzLength);
	    }
	});
	
	$('#box-type-6 .length, #box-type-6 .width, #box-type-6 .height, #box-type-6 .pripusk-height, #box-type-6 .pripusk-width, #box-type-6 .zavjazka-length-1').keyup(function() {
		var parentId = '#box-type-6';    			
	    var length = Number($(parentId + ' .length').val());
	    var width = Number($(parentId+ ' .width').val());
	    var height = Number($(parentId + ' .height').val());
	    var pripuskHeight = Number($(parentId + ' .pripusk-height').val());
	    var pripuskWidth = Number($(parentId + ' .pripusk-width').val());
	    var zavjazka1 = Number($(parentId + ' .zavjazka-length-1').val());
	
	    if (($(this).attr('class') == 'height') && height) {
	    	$(parentId + ' .pripusk-height').val(Math.round(height * boxPripusk * 100) / 100);
	    }
	    if (($(this).attr('class') == 'width') && width) {
	    	$(parentId + ' .pripusk-width').val(Math.round(width * boxPripusk * 100) / 100);
	    }
	    
	    if (length
		        && width
		        && height
		        && pripuskHeight
		        && pripuskWidth
		        && zavjazka1) {
	        /*
	    	Р”Р»СЏ РєР°СЂС‚РёРЅРєРё 116: (РЅР° РєР°СЂС‚РёРЅРєРµ РѕС‡РµРїСЏС‚РєР° - РІРјРµСЃС‚Рѕ РґР»РёРЅРЅС‹ Р·Р°РІСЏР·РєРё РЅР°РїРёСЃР°РЅРѕ Р”Р»РёРЅР° РІРєР»Р°РґС‹С€Р°, РЅР°Рґ СЂРµР·СѓР»СЊС‚Р°С‚РѕРј РµС‰Рµ, РёСЃРїСЂР°РІРёС‚СЊ РЅР° "РІРєР»Р°РґС‹С€Р°")
	    	Р”Р»РёРЅР° РІРєР»Р°РґС‹С€Р° = (РќР°РёР±РѕР»СЊС€РµРµ РёР· Р·РЅР°С‡РµРЅРёР№ С€РёСЂРёРЅР° РёР»Рё РґР»РёРЅР°) + РїСЂРёРїСѓСЃРє РїРѕ С€РёСЂРёРЅРµ.
	    	Р’С‹СЃРѕС‚Р° РІРєР»Р°РґС‹С€Р° = РІС‹СЃРѕС‚Р°+(РЅР°РёРјРµРЅСЊС€РµРµ РёР· Р·РЅР°С‡РµРЅРёР№ С€РёСЂРёРЅР° РёР»Рё РґР»РёРЅР°) + РїСЂРёРїСѓСЃРє РїРѕ С€РёСЂРёРЅРµ + Р”Р»РёРЅР° Р·Р°РІСЏР·РєРё
	    	Р”Р»РёРЅР° С„Р°Р»СЊС†Р° = (РќР°РёРјРµРЅСЊС€РµРµ РёР· Р·РЅР°С‡РµРЅРёР№ С€РёСЂРёРЅР° РёР»Рё РґР»РёРЅР°)/2	            
			*/
	    	var resultLength = Math.max(length, width) + pripuskWidth;
	    	$(parentId + ' .result-length').val(resultLength);
	    	var resultHeight = height + Math.min(length, width) + pripuskWidth + zavjazka1;
	    	$(parentId + ' .result-height').val(resultHeight);			        
	    	var resultFalzLength = Math.min(length, width)/2;
	    	$(parentId + ' .result-falz-length').val(resultFalzLength);
	    }
	});
	
	$('#barrel-type-1 .radius, #barrel-type-1 .round, #barrel-type-1 .height, #barrel-type-1 .pripusk-width').keyup(function() {
		var parentId = '#barrel-type-1';    			
	    var radius = Number($(parentId + ' .radius').val());
	    var round = Number($(parentId+ ' .round').val());
	    var height = Number($(parentId + ' .height').val());
	    var pripuskWidth = Number($(parentId + ' .pripusk-width').val());
	
	    if (($(this).attr('class') == 'radius') && radius) {
	    	$(parentId + ' .round').val(Math.round(2 * Math.PI * radius  * 100) / 100);
	    	$(parentId + ' .pripusk-width').val(Math.round(radius * barrelPripusk * 100) / 100);
	    }
	    if (($(this).attr('class') == 'round') && round) {
	    	$(parentId + ' .radius').val(Math.round(round / 2 * Math.PI * 100) / 100);
	    }
	 
	    if (radius
		        && round
		        && height
		        && pripuskWidth) {
	        /*
	    	Р”Р»СЏ РєР°СЂС‚РёРЅРєРё 121:
	    	Р”Р»РёРЅР° РІРєР»Р°РґС‹С€Р° = (Р”Р»РёРЅРЅР° РѕРєСЂСѓР¶РЅРѕСЃС‚Рё / 2) + РїСЂРёРїСѓСЃРє РїРѕ РґР»РёРЅРЅРµ
	    	Р’С‹СЃРѕС‚Р° РІРєР»Р°РґС‹С€Р° = Р’С‹СЃРѕС‚Р° + Р Р°РґРёСѓСЃ            
			*/
	    	var resultLength = round / 2 + pripuskWidth;
	    	$(parentId + ' .result-length').val(resultLength);
	    	var resultHeight = height + radius;
	    	$(parentId + ' .result-height').val(resultHeight);
	    }
	});
	
	$('#barrel-type-2 .radius, #barrel-type-2 .round, #barrel-type-2 .height, #barrel-type-2 .pripusk-width').keyup(function() {
		var parentId = '#barrel-type-2';    			
	    var radius = Number($(parentId + ' .radius').val());
	    var round = Number($(parentId+ ' .round').val());
	    var height = Number($(parentId + ' .height').val());
	    var pripuskWidth = Number($(parentId + ' .pripusk-width').val());
	
	    if (($(this).attr('class') == 'radius') && radius) {
	    	$(parentId + ' .round').val(Math.round(2 * Math.PI * radius  * 100) / 100);
	    	$(parentId + ' .pripusk-width').val(Math.round(radius * barrelPripusk * 100) / 100);
	    }
	    if (($(this).attr('class') == 'round') && round) {
	    	$(parentId + ' .radius').val(Math.round(round / 2 * Math.PI * 100) / 100);
	    }
	 
	    if (radius
		        && round
		        && height
		        && pripuskWidth) {
	        /*
	    	Р”Р»СЏ РєР°СЂС‚РёРЅРєРё 122:
	    	Р”Р»РёРЅР° РІРєР»Р°РґС‹С€Р° = (Р”Р»РёРЅРЅР° РѕРєСЂСѓР¶РЅРѕСЃС‚Рё / 2) + РїСЂРёРїСѓСЃРє РїРѕ РґР»РёРЅРЅРµ
	    	Р’С‹СЃРѕС‚Р° РІРєР»Р°РґС‹С€Р° = Р’С‹СЃРѕС‚Р° + Р Р°РґРёСѓСЃ*2        
			*/		        		
	    	var resultLength = round / 2 + pripuskWidth;
	    	$(parentId + ' .result-length').val(resultLength);
	    	var resultHeight = height + radius * 2;
	    	$(parentId + ' .result-height').val(resultHeight);
	    }
	});
	
	$('#barrel-type-3 .radius, #barrel-type-3 .round, #barrel-type-3 .height, #barrel-type-3 .pripusk-width, #barrel-type-3 .zavjazka-length-1').keyup(function() {
		var parentId = '#barrel-type-3';    			
	    var radius = Number($(parentId + ' .radius').val());
	    var round = Number($(parentId+ ' .round').val());
	    var height = Number($(parentId + ' .height').val());
	    var pripuskWidth = Number($(parentId + ' .pripusk-width').val());
	    var zavjazka1 = Number($(parentId + ' .zavjazka-length-1').val());
	
	    if (($(this).attr('class') == 'radius') && radius) {
	    	$(parentId + ' .round').val(Math.round(2 * Math.PI * radius  * 100) / 100);
	    	$(parentId + ' .pripusk-width').val(Math.round(radius * barrelPripusk * 100) / 100);
	    }
	    if (($(this).attr('class') == 'round') && round) {
	    	$(parentId + ' .radius').val(Math.round(round / 2 * Math.PI * 100) / 100);
	    }
	 
	    if (radius
		        && round
		        && height
		        && pripuskWidth
		        && zavjazka1) {
	        /*
	    	Р”Р»СЏ РєР°СЂС‚РёРЅРєРё 123:
	    	Р”Р»РёРЅР° РІРєР»Р°РґС‹С€Р° = (Р”Р»РёРЅРЅР° РѕРєСЂСѓР¶РЅРѕСЃС‚Рё / 2) + РїСЂРёРїСѓСЃРє РїРѕ РґР»РёРЅРЅРµ
	    	Р’С‹СЃРѕС‚Р° РІРєР»Р°РґС‹С€Р° = Р’С‹СЃРѕС‚Р° + Р Р°РґРёСѓСЃ*2 + РґР»РёРЅРЅР° Р·Р°РІСЏР·РєРё    
			*/		        		
	    	var resultLength = round / 2 + pripuskWidth;
	    	$(parentId + ' .result-length').val(resultLength);
	    	var resultHeight = height + radius * 2 + zavjazka1;
	    	$(parentId + ' .result-height').val(resultHeight);
	    }
	});
	
	$('#barrel-type-4 .radius, #barrel-type-4 .round, #barrel-type-4 .height, #barrel-type-4 .pripusk-width, #barrel-type-4 .zavjazka-length-1, #barrel-type-4 .zavjazka-length-2').keyup(function() {
		var parentId = '#barrel-type-4';    			
	    var radius = Number($(parentId + ' .radius').val());
	    var round = Number($(parentId+ ' .round').val());
	    var height = Number($(parentId + ' .height').val());
	    var pripuskWidth = Number($(parentId + ' .pripusk-width').val());
	    var zavjazka1 = Number($(parentId + ' .zavjazka-length-1').val());
	    var zavjazka2 = Number($(parentId + ' .zavjazka-length-2').val());
	
	    if (($(this).attr('class') == 'radius') && radius) {
	    	$(parentId + ' .round').val(Math.round(2 * Math.PI * radius  * 100) / 100);
	    	$(parentId + ' .pripusk-width').val(Math.round(radius * barrelPripusk * 100) / 100);
	    }
	    if (($(this).attr('class') == 'round') && round) {
	    	$(parentId + ' .radius').val(Math.round(round / 2 * Math.PI * 100) / 100);
	    }
	 
	    if (radius
		        && round
		        && height
		        && pripuskWidth
		        && zavjazka1
		        && zavjazka2) {
	        /*
	    	Р”Р»СЏ РєР°СЂС‚РёРЅРєРё 124:
	    	Р”Р»РёРЅР° РІРєР»Р°РґС‹С€Р° = (Р”Р»РёРЅРЅР° РѕРєСЂСѓР¶РЅРѕСЃС‚Рё / 2) + РїСЂРёРїСѓСЃРє РїРѕ РґР»РёРЅРЅРµ
	    	Р’С‹СЃРѕС‚Р° РІРєР»Р°РґС‹С€Р° = Р’С‹СЃРѕС‚Р° + Р Р°РґРёСѓСЃ*2 + РґР»РёРЅРЅР° Р·Р°РІСЏР·РєРё РІРµСЂС… + РґР»РёРЅРЅР° Р·Р°РІСЏР·РєРё РЅРёР·  
			*/		        		
	    	var resultLength = round / 2 + pripuskWidth;
	    	$(parentId + ' .result-length').val(resultLength);
	    	var resultHeight = height + radius * 2 + zavjazka1 + zavjazka2;
	    	$(parentId + ' .result-height').val(resultHeight);
	    }
	});
	
	$('#barrel-type-5 .radius, #barrel-type-5 .round, #barrel-type-5 .height, #barrel-type-5 .pripusk-width, #barrel-type-5 .zavjazka-length-1').keyup(function() {
		var parentId = '#barrel-type-5';    			
	    var radius = Number($(parentId + ' .radius').val());
	    var round = Number($(parentId+ ' .round').val());
	    var height = Number($(parentId + ' .height').val());
	    var pripuskWidth = Number($(parentId + ' .pripusk-width').val());
	    var zavjazka1 = Number($(parentId + ' .zavjazka-length-1').val());
	
	    if (($(this).attr('class') == 'radius') && radius) {
	    	$(parentId + ' .round').val(Math.round(2 * Math.PI * radius  * 100) / 100);
	    	$(parentId + ' .pripusk-width').val(Math.round(radius * barrelPripusk * 100) / 100);
	    }
	    if (($(this).attr('class') == 'round') && round) {
	    	$(parentId + ' .radius').val(Math.round(round / 2 * Math.PI * 100) / 100);
	    }
	 
	    if (radius
		        && round
		        && height
		        && pripuskWidth
		        && zavjazka1) {
	        /*
	    	Р”Р»СЏ РєР°СЂС‚РёРЅРєРё 125:
	    	Р”Р»РёРЅР° РІРєР»Р°РґС‹С€Р° = (Р”Р»РёРЅРЅР° РѕРєСЂСѓР¶РЅРѕСЃС‚Рё / 2) + РїСЂРёРїСѓСЃРє РїРѕ РґР»РёРЅРЅРµ
	    	Р’С‹СЃРѕС‚Р° РІРєР»Р°РґС‹С€Р° = Р’С‹СЃРѕС‚Р° + Р Р°РґРёСѓСЃ + РґР»РёРЅРЅР° Р·Р°РІСЏР·РєРё
			*/		        		
	    	var resultLength = round / 2 + pripuskWidth;
	    	$(parentId + ' .result-length').val(resultLength);
	    	var resultHeight = height + radius + zavjazka1;
	    	$(parentId + ' .result-height').val(resultHeight);
	    }
	});
	
	$('#barrel-type-6 .radius, #barrel-type-6 .round, #barrel-type-6 .height, #barrel-type-6 .pripusk-width, #barrel-type-6 .zavjazka-length-1').keyup(function() {
		var parentId = '#barrel-type-6';    			
	    var radius = Number($(parentId + ' .radius').val());
	    var round = Number($(parentId+ ' .round').val());
	    var height = Number($(parentId + ' .height').val());
	    var pripuskWidth = Number($(parentId + ' .pripusk-width').val());
	    var zavjazka1 = Number($(parentId + ' .zavjazka-length-1').val());
	
	    if (($(this).attr('class') == 'radius') && radius) {
	    	$(parentId + ' .round').val(Math.round(2 * Math.PI * radius  * 100) / 100);
	    	$(parentId + ' .pripusk-width').val(Math.round(radius * barrelPripusk * 100) / 100);
	    }
	    if (($(this).attr('class') == 'round') && round) {
	    	$(parentId + ' .radius').val(Math.round(round / 2 * Math.PI * 100) / 100);
	    }
	 
	    if (radius
		        && round
		        && height
		        && pripuskWidth
		        && zavjazka1) {
	        /*
	    	Р”Р»СЏ РєР°СЂС‚РёРЅРєРё 126:
	    	Р”Р»РёРЅР° РІРєР»Р°РґС‹С€Р° = (Р”Р»РёРЅРЅР° РѕРєСЂСѓР¶РЅРѕСЃС‚Рё / 2) + РїСЂРёРїСѓСЃРє РїРѕ РґР»РёРЅРЅРµ
	    	Р’С‹СЃРѕС‚Р° РІРєР»Р°РґС‹С€Р° = Р’С‹СЃРѕС‚Р° + Р Р°РґРёСѓСЃ*2 + РґР»РёРЅРЅР° Р·Р°РІСЏР·РєРё
			*/		        		
	    	var resultLength = round / 2 + pripuskWidth;
	    	$(parentId + ' .result-length').val(resultLength);
	    	var resultHeight = height + radius * 2 + zavjazka1;
	    	$(parentId + ' .result-height').val(resultHeight);
	    }
	});


	var prodForm = 'barrel';
    $('.av_form_box').click(function(){
    	$('.av_form_box').removeClass('av_active');
    	$(this).addClass('av_active');
    	prodForm = $(this).attr('id');
	});

    var prodType = 'type11';
    $('.av_type_box').click(function() {
    	$('.av_type_box').removeClass('av_active');
    	$(this).addClass('av_active');
    	prodType = $(this).attr('id');
	});
	
    var nav = 'form';
    $('#av_calc_nav li a').click(function() {
    	$('#av_calc_nav li a').removeClass('av_active');
    	$(this).addClass('av_active');
    	nav = $(this).attr('id');	    	
    	switchTab(nav);
    	return false;
	});

	$('#av_prev_button').click(function() {
		var curTab = $('#av_calc_nav li a.av_active').attr('id');
		switch (curTab) {
	      case 'nav-form':	    		 
    	      break;
    	  case 'nav-type':
    		  switchTab('nav-form');
    		  break
    	  case 'nav-calc':
    		  switchTab('nav-type');
    	      break
    	  default:	    		
    	}	     
	    return false;
	});

	$('#av_next_button').click(function() {
		var curTab = $('#av_calc_nav li a.av_active').attr('id');
		switch (curTab) {
	      case 'nav-form':
	    	  switchTab('nav-type');	    		 
    	      break;
    	  case 'nav-type':
    		  switchTab('nav-calc');
    		  break
    	  case 'nav-calc':
    	      break
    	  default:	    		
    	}	     
	    return false;
	});

	function switchTab(nav) {
		$('.av_calc_form').removeClass('av_active');
		$('#av_calc_nav li a').removeClass('av_active');
    	$('#'+nav).addClass('av_active');
		switch (nav) {
    	  case 'nav-form':
    	    $('#form-form').addClass('av_active');
    	    break;
    	  case 'nav-type':
	    	if (prodForm == 'box') {
	    	    $('#form-type-box').addClass('av_active');
	    	} else {
	    	    $('#form-type-barrel').addClass('av_active');
	    	}
    	    break;
    	  case 'nav-calc':
    	    var formCalc = '#' + prodForm + '-' + prodType;
    	    $(formCalc).addClass('av_active');
    	    break;
    	  default:
    		$('#box-type1').addClass('av_active');
    	}	    				    	
    	return false;
	}		
});