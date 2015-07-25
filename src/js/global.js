;(function() {
	'use strict';

   	var $showAll = $('#showAll'),
   		$earlierWorks  = $('#earlierWorks'),
   		show = 'show',
   		hide = 'hide',
      open = 'open',
   		isOpen = false,
   		$backToTop = $('#backToTop'),
   		$htmlAndBody = $('html, body'),
   		$window = $(window),
   		$projectsHeader = $('#projectHeader'),
      $h1Link = $('.h1-link'),
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
        $showAll.addClass(open).attr({'aria-expanded': 'true', 'aria-pressed': 'true'});
   			$earlierWorks.addClass(open).attr({'aria-hidden': 'false', 'tabindex': '-1'});
   		}
   		else {
        $showAll.removeClass(open).attr({'aria-expanded': 'false', 'aria-pressed': 'false'});
   			$earlierWorks.removeClass(open).removeAttr('tabindex').attr('aria-hidden', 'true');
   		}
	});

  	$backToTop.on('click', function(event) {
  		var that = this;

  		event.preventDefault();
      $htmlAndBody.animate({scrollTop: 0}, 200, 'swing');
      $backToTop.blur();
      $h1Link.focus();
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
