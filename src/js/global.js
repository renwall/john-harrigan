;(function() {
	'use strict';

   	var $showAll = $('#showAll'),
   		$earlierWorks  = $('#earlierWorks'),
   		show = 'show',
   		hide = 'hide',
   		isOpen = false,
   		toggleText,
   		$backToTop = $('#backToTop'),
   		$htmlAndBody = $('html, body');

   	$showAll.on('click', function(event) {
   		var that = this;

   		event.preventDefault();
   		isOpen = !isOpen;

   		if (isOpen === true) {
   			toggleText = 'Show less works';
   			$earlierWorks.stop(true, true).fadeIn().removeClass(hide).addClass(show);
   		}
   		else {
   			toggleText = 'Show more works';
   			$earlierWorks.removeClass(show).addClass(hide);
   		}

   		$showAll.text(toggleText);
   		that.blur();	
	});

	$backToTop.on('click', function(event) {
		var that = this;

		event.preventDefault();
        $htmlAndBody.animate({scrollTop: 0}, 200, 'swing');
        that.blur();
    });

   	var getCurrentYear = function() {
		var currentDate = new Date(),
			currentYear = currentDate.getFullYear(),
			elem = document.getElementsByClassName('current-year')[0];

		elem.innerHTML = currentYear;
	   	
	   	return currentYear;
	}

	getCurrentYear();
})();
