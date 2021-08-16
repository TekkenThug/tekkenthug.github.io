ymaps.ready(init);

function init() {
    var coords = $('#loc-map').attr('data-address');
    if(coords) {
		coords = coords.split(',');
		var myMap;
		myMap = new ymaps.Map("map_top", {
			center: [coords[0], coords[1]],
			zoom: 16,
			controls: []
		}, {
			suppressMapOpenBlock: true
		});

		myMap.behaviors.disable('scrollZoom');

		myMap.controls.add("zoomControl", {
			position: {top: 20, right: 20}
		});

		var myPlacemark = new ymaps.Placemark([coords[0], coords[1]], {},
			{
				iconLayout: 'default#image',
				iconImageHref: '/static/img/location-icon.png',
				iconImageSize: [32, 42],
			   // iconImageOffset: [-24, -65]
			});

		myMap.geoObjects.add(myPlacemark);

		if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			//... РѕС‚РєР»СЋС‡Р°РµРј РїРµСЂРµС‚Р°СЃРєРёРІР°РЅРёРµ РєР°СЂС‚С‹
			myMap.behaviors.disable('drag');
        }
	}

}