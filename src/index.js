import './sass/main.scss';
import $ from 'jquery';
import 'owl.carousel';


// FULLPAGE
$(function () {

	$('.maincontent').fullpage({
		verticalCentered : false
	});

	$('.down-arrow').on('click', function (e) {
		e.preventDefault();

		$.fn.fullpage.moveSectionDown();

	});

	$('.fixed-menu__link, .nav__link, .order-link, .burgers-slider__buy').on('click', function(e){
		e.preventDefault();
	
		var $this = $(this),
			href = parseInt($this.attr('href')) + 1;

		$.fn.fullpage.moveTo(href);

		/*$this.closest('li').addClass('active')
			.siblings()
			.removeClass('active');*/
	});

});

// FANCYBOX 
$(function(){
	$('.popup__link').on('click', function(e){
		e.preventDefault();
	
		$.fancybox.close();
	});
});

// SLIDER
$(function(){
	var burgerCarousel = $('.burgers-slider').owlCarousel({
		items: 1,
		loop : true,
		smartSpeed : 1000, // скорость пролистывания слайдера
		// mouseDrag : false, // перетаскивание мышью
		// touchDrag : false, //  перетаскивание через тач
		// freeDrag : true,
		// nav : true,
		// autoplay : true, // автопроигрывание
		// autoplayTimeout  : 1100, //  тай-аут интервала автовоспроизведения
		// autoplayHoverPause : true, // пауза при наведении мыши
		// info : true
	});

	$('.burger-slider__btn_next').on('click', function(e){
		e.preventDefault();
		burgerCarousel.trigger('next.owl.carousel');
	});

	$('.burger-slider__btn_prev').on('click', function(e){
		e.preventDefault();
		burgerCarousel.trigger('prev.owl.carousel');
	});
});


// VERTICAL ACCO
$(function(){
	$('.team-acco__trigger').on('click', function(e){
		e.preventDefault();
	
		var $this = $(this),
			item = $this.closest('.team-acco__item'),
			container = $this.closest('.team-acco'),
			items = container.find('.team-acco__item'),
			content = item.find('.team-acco__content'),
			otherContent = container.find('.team-acco__content');

		if(!item.hasClass('active')) {
			items.removeClass('active');
			item.addClass('active');
			otherContent.slideUp();
			content.slideDown();
		} else {
			item.removeClass('active');
			content.slideUp();
		}
  
	});
});


// HORIZONTAL ACCO
$(function(){
	$('.menu-acco__trigger').on('click', function(e){
		e.preventDefault();
	
		var $this = $(this),
			container = $this.closest('.menu-acco'),
			item = $this.closest('.menu-acco__item'),
			items = container.find('.menu-acco__item'),
			activeItem = items.filter('.active'),
			content = item.find('.menu-acco__content'),
			activeContent = activeItem.find('.menu-acco__content');

		if(!item.hasClass('active')) {
			items.removeClass('active');
			item.addClass('active');


			activeContent.animate({
				'width' : '0px'
			});

			content.animate({
				'width' : '550px'
			});
		} else {
			item.removeClass('active');
			content.animate({
				'width' : '0px'
			});
		}
		
	});

	$(document).on('click', function(e){
		var $this = $(e.target);

		if(!$this.closest('.menu-acco').length) {
			$('.menu-acco__content').animate({
				'width' : '0px'
			})

			$('.menu-acco__item').removeClass('active');
		}
		
	});
});


// INPUT MASK
$(function(){
	$('.phone-mask').inputmask('+375 (99) 999 99 99');
});




// YANDEX MAP
$(function(){
	ymaps.ready(init);
    var myMap;

    function init(){     
        myMap = new ymaps.Map("map", {
            center: [52.091087, 23.691610], // Координаты Бреста
            zoom: 13, // zoom на карте
            controls : [] // отключение дополнительных переключателей
        });

        var myPlacemark = new ymaps.GeoObject({
        	geometry: {
        		type: "Point",
        		coordinates: [52.091087, 23.691610]
        	}
        });

        myMap.geoObjects.add(myPlacemark);
        myMap.behaviors.disable('scrollZoom'); // отключение скролла карты
    }
});


// FORM SUBMIT
$(function(){
	$('#order-form').on('submit', function(e){
		e.preventDefault();
	
		var form = $(this),
			formData = form.serialize();

		$.ajax({
			url: '../mail.php',
			type: 'POST',
			data: formData,
			success: function (data) {
				(data.status) ? alert('Сообщение отправлено') : alert('Произошла ошибка!');
			}
		})
	});
});