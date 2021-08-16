$(document).ready(function(){
	/**
	 * При прокрутке страницы, показываем или срываем кнопку
	 */
	$(window).scroll(function () {
		// Если отступ сверху больше 50px то показываем кнопку "Наверх"
		if ($(this).scrollTop() > 50) {
			$('#button-up').fadeIn();
		} else {
			$('#button-up').fadeOut();
		}
	});
	
	/** При нажатии на кнопку мы перемещаемся к началу страницы */
	$('#button-up').click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 500);
		return false;
	});
	
});
