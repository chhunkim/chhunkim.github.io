$(function() {
	// select the item contains the word "pine"
	$('li:contains("pine")').text('almonds');
	// select the items with class attribute "hot"
	$('li.hot').html(function(){
		// update the content
		return '<em>' + $(this).text() + '</em>';
		});
		// remove the element with an id attribute "one"
		$('li#one').remove();
});