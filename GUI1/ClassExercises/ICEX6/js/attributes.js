$(function() {
	// remove class name from the third item
	$('li#three').removeClass('hot');
	// add 'favorite' to give us a heart sign in the first two items
	$('li.hot').addClass('favorite');
	// add an attribute name="groceries"
	$('ul').attr('name', 'groceries');
});