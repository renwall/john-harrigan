;(function() {
	'use strict';

   	var $showAll = $('#showAll'),
   		$earlierWorks  = $('#earlierWorks'),
   		show = 'show',
   		hide = 'hide',
   		isOpen = false,
   		toggleText,
   		$backToTop = $('#backToTop'),
   		$htmlAndBody = $('html, body'),
   		$window = $(window),
   		$projectsHeader = $('#projectHeader'),
   		scrollTop,
   		offsetTop,
   		currentDate,
   		currentYear,
   		$currentYear = $('#currentYear');

   	$showAll.on('click', function(event) {
   		var that = this;

   		event.preventDefault();
   		isOpen = !isOpen;

   		if (isOpen === true) {
   			toggleText = 'Show less works';
   			$earlierWorks.removeClass(hide).addClass(show);
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

    $window.on('scroll', function() {
      	offsetTop = $projectsHeader.offset().top;
      	scrollTop = $window.scrollTop();

      	if (scrollTop > offsetTop) {
            $backToTop.removeClass(hide).addClass(show);
        }
        else {
            $backToTop.removeClass(show).addClass(hide);
        }

        $backToTop.blur();
    });

   	var getCurrentYear = function() {
		currentDate = new Date();
		currentYear = currentDate.getFullYear();

		$currentYear.text(currentYear);

	   	return currentYear;
	};

	getCurrentYear();
})();
