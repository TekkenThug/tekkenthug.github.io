window.onload = function() {
	

  $('.fpd-item').click(function(e) {
			setTimeout(function() {
				var div = document.querySelectorAll('.fpd-views-selection'); 
				$('.fpd-views-selection').children().each(function(i, item) {
					if(i == 0) {
						$(item).css({'background-image':''}); $(item).text('1 сторона'); 
					}
					if(i == 1) {
						$(item).css({'background-image':''}); $(item).text('2 сторона'); 
					}
				});
			}, 250);
		$('.fpd-icon-close').click();
		$('ul#options').html(render_options(e.target.getAttribute('data-id')));
	}); 

  
  $('ul#options').html(render_options(0));
  var vector_x = document.getElementById('vector-x');
  if(!vector_x) return false;
  var ctx_vector_x = vector_x.getContext('2d');

	ctx_vector_x.strokeStyle="#000";
	ctx_vector_x.lineWidth = 0.2;

	ctx_vector_x.font = "18px Arial";
	//ctx_vector_x.fillText("75см", 130, 35);

	var fromx = 55;
	var fromy = 40; //отступ сверху
	var tox = 285; //длинна
	var toy = 40; //угол относительно отсупа
	var headlen = 10;   // length of head in pixels
	var angle = Math.atan2(toy-fromy,tox-fromx);

	ctx_vector_x.moveTo(fromx, fromy);
    ctx_vector_x.lineTo(tox, toy);
    ctx_vector_x.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
    ctx_vector_x.moveTo(tox, toy);
    ctx_vector_x.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));

	/* ---   ---*/
	var vector_y = document.getElementById('vector-y');
	var ctx_vector_y = vector_y.getContext('2d');

	ctx_vector_y.strokeStyle="#000";
	ctx_vector_y.lineWidth = 0.2;

	//ctx_vector_y.fillText("75см", 0, 0);

	ctx_vector_y.font = "18px Arial";
	ctx_vector_y.save();
	ctx_vector_y.translate(15, 15);
	ctx_vector_y.rotate(-Math.PI/2);
	ctx_vector_y.textAlign = "center";
	//ctx_vector_y.fillText("180см", -180, 0); 
	ctx_vector_y.restore();

	var fromx2 = 20;
	var fromy2 = 40; //отступ сверху
	var tox2 = 20; //длинна
	var toy2 = 360; //угол относительно отсупа
	var headlen2 = 10;   // length of head in pixels
	var angle2 = Math.atan2(toy2-fromx2,tox2-fromy2);

	ctx_vector_y.moveTo(fromx2, fromy2);
    ctx_vector_y.lineTo(tox2, toy2);
    ctx_vector_y.lineTo(tox2-headlen2*Math.cos(angle2-Math.PI/6),toy2-headlen2*Math.sin(angle2-Math.PI/6));
    ctx_vector_y.moveTo(tox2, toy2);
    ctx_vector_y.lineTo(tox2-headlen2*Math.cos(angle2+Math.PI/6),toy2-headlen2*Math.sin(angle2+Math.PI/6));

	ctx_vector_x.stroke();
	ctx_vector_y.stroke();

	jQuery(".fpd-shadow-1.fpd-item.fpd-tooltip.tooltipstered").children().each(function(i, item) {
		if(i == 0) {
			$(item).css({'background-image':''}); $(item).text('1 сторона'); 
		}
		if(i == 1) {
			$(item).css({'background-image':''}); $(item).text('2 сторона'); 
		}
	});

	var makets = jQuery(".fpd-grid.fpd-grid-contain").children();
	if(makets.length == 1) $('.fpd-products-module-hidden div[data-module=products]').css({'display':'none'});
	makets.each(function(i, item) {
		$(item).children().attr('data-id', i);
	});

	
    $('input.field.mask').mask("+7(999)999-99-99");
};


function render_options(id){

	var variants = JSON.parse($('.const-variants').html());
	var html = '';
	if(variants.length > 0) {
	for (var i = 0; i < variants[id].length; i++) {
		  if(variants[id][i]['type'] == 'text'){
			  if(variants[id][i]['key'] == 'Как с Вами связаться?') var mask = 'mask';
			  
			  html += '<li>';
			  html += '<div class="label">'+ variants[id][i]['key'];
			  if(variants[id][i]['necessarily'] > 0 ) html += '<span>*</span>';
			  html += '</div>';
			  html += '<div class="label_field">'+ variants[id][i]['value'] +'</div>';
			  html += '<input label="'+ variants[id][i]['key'] +'" class="field '+ mask +'" type="text" name="text-'+i+'" autocomplete="off" spellcheck="false" placeholder="'+ variants[id][i]['placeholder'] +'">';
			  html += '</li>';
			}

		  if(variants[id][i]['type'] == 'select'){
			  varts = variants[id][i]['vals'].split(',');
			  html += '<li>';
			  html += '<div class="label">'+ variants[id][i]['key'] +'</div>';
			  html +='<select name="material" class="selecter cons">';
			    for (var n = 0; n < varts.length; n++) {
					html += ' <option value="'+varts[n]+'">'+varts[n]+'</option>';
				}
			  html += '</select>';
			  html += '</li>';
		  }

		  if(variants[id][i]['type'] == 'radio'){
				varts = variants[id][i]['vals'].split(',');
				html += '<li>';
				for (var n = 0; n < varts.length; n++) {
					html += '<div class="radio">';
					html += '<div class="label">'+ variants[id][i]['key'] +'</div>';
					html +='<input label="'+ variants[id][i]['key'] +'" type="radio" id="option_'+i+'_'+n+'" name="radio-'+i+'" value="'+ varts[n] +'">';
					html +='<label for="option_'+i+'_'+n+'">'+varts[n]+'</label>';
					html += '</div>';
				}
				html += '</li>';
			}

			if(variants[id][i]['type'] == 'checkbox'){
				varts = variants[id][i]['vals'].split(',');
				html += '<li>';
				for (var n = 0; n < varts.length; n++) {
					html += '<div class="check">';
					html += '<div class="label">'+ variants[id][i]['key'] +'</div>';
					html +='<input type="checkbox" id="option_'+i+'_'+n+'" name="name_'+i+'_'+n+'">';
					html +='<label for="option_'+i+'_'+n+'">'+varts[n]+'</label>';
					html += '</div>';
				}
				html += '</li>';
		  }
    }
    html += '<input type="hidden" name="const" value="1">'; 
  }
	console.log(77);
	
  	//$('ul#options').empty();  
	return html;
}
















