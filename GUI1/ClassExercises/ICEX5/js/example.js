// Chhun Kim

// ADD NEW ITEM TO END OF LIST
// get all the existing elements in the ul tag
var lst = document.getElementsByTagName('ul')[0];
// create a new end item
var newEndItem = document.createElement('li');
// assign the last item name at the end of the list
var endItemName = document.createTextNode('cream');
// append the text to li as a child
newEndItem.appendChild(endItemName);
// append newEndItem to ul
lst.appendChild(newEndItem);

// ADD NEW ITEM START OF LIST
// create a new start item
var newStartItem = document.createElement('li');
// assign the first item name at the start of the list
var startItemName = document.createTextNode("kale");
// append the text to li as a child
newStartItem.appendChild(startItemName);
// append newStartItem to ul
lst.insertBefore(newStartItem, lst.firstChild);

// ADD A CLASS OF COOL TO ALL LIST ITEMS
// get the list li
var lstItem = document.querySelectorAll('li');
// replace all the existing li with 'cool' class and add the new two
for (var i = 0; i < lstItem.length; i++){
  lstItem[i].className = 'cool';
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
// get the h2 tag for HEADING
var heading = document.querySelector('h2');
// console.log(heading); // using for debug
// get the text for heading
var headingText = heading.firstChild.nodeValue;
// get the numbers of the list
var string = headingText + "<span>" + lstItem.length + "</spen>";
// assign sting to HTML
heading.innerHTML = string;
