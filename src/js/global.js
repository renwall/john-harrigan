getCurrentYear = function() {
	var currentDate = new Date(),
		currentYear = currentDate.getFullYear(),
		elem = document.getElementsByClassName('current-year')[0];

	elem.innerHTML = currentYear;
   	
   	return currentYear;
}

getCurrentYear();
