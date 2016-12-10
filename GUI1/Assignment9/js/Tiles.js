/******
	File: /~ckim/GUI1/Assignment9/js/Tiles.js
  COMP4610 GUI Programming I Assignment: Implementing a Bit of Scrabble with Drag-and-Drop
  Chhun Kim, UMASS Lowell Computer Science, chhun_kim@student.uml.edu
  Copyright (c) 2016 by Chhun Kim. All rights reserved.
  
	This Assignment is buldling up from Assginment 6 and 7;
		Created by CK on 11/14/2016 
		Updated by CK on 11/16/2016
		Updated by CK on 11/22/2016
		Updated by CK on 12/04/2016
		Updated by CK on 12/08/2016
		Updated by CK on 12/09/2016
		
	Note that: I work with Chong Vu, and we are agreed to let me use most of his code.
	*****/

var Rack = [];
var letters = "_ABCDEFGHIJKLMNOPQRSTUVWXYZ";	
	
// Tiles function is to give the 7 letterss on the rack for playing the scrabble game
function Tiles(){
	Rack = [];
	var tile = "";
	tile += '<table id="TilesRack"><tr>';
	for (var i=0; i < 7; i++){
		// http://stackoverflow.com/questions/5915096/get-random-item-from-javascript-array
		// generate random letters from the letters
		var index = Math.floor(Math.random() * letters.length);
		
		// loop the letters array to see if there is anything letters left
		while(ScrabbleTiles[letters[index]].numberRemaining === 0 ){
			index = Math.floor(Math.random() * letters.length);
		}
		// Get letterss link
		var urlletters = "images/Scrabble_Tile_" + letters[index] + ".jpg";
		tile += "<td><img id='tile_drag_" + i + "' class='board_piece_" + letters[index] + "' src='" + urlletters + "'></img></td>";
		
		ScrabbleTiles[letters[index]].numberRemaining = ScrabbleTiles[letters[index]].numberRemaining - 1;
		
		Rack.push({"letters": letters[index], "id" : "dragTile_" + i, "value" : ScrabbleTiles[letters[index]].value})
	}
	tile += '</tr></table>';
	$("#scoreID").html(word_score);
	$("#Tiles").html(tile);
	// call UpdateRemainWord that we know how many tiles we have 
	// at the start
	UpdateRemainWord();
}

// shuffle tiles function is generated after the user hits the shuffle button
// to get different tiels on the rack 
function shuffleTiles(){
	// initialized the rack tiles ID
	var rackID = $("#scrabbleBoard").find('td');
	rackID.each(function() {
		if($(this)[0].id == "dropped"){
			$(this)[0].innerHTML = "";
			removeDragID();
		}
	});
	console.log(Rack);
	for (var i = 0; i < Rack.length; i++){
    var letter = Rack[i].letters;
		console.log(letter);
    ScrabbleTiles[letter].numberRemaining += 1;
  }
	
	// Rack = [];
	UpdateRemainWord();
	Tiles();
	DragAndDrop();	
}

function returnTilesToRack(){
	var  rackID = $("#scrabbleBoard").find('td');
	rackID.each(function() {
		if (String($(this)[0].id) === "dropped"){
			$(this).removeAttr('id');
			$(this)[0].firstChild.outerHTML = "";
		}
	});
	
	//console.log(Rack);
	var tile = "";
	tile += '<table id="TilesRack"><tr>';
	var j = 0;
	rackID = $("#Tiles").find('td');
	// console.log(rackID.length);
	for ( var i = 0; i < rackID.length; i++){
		if (i < rackID.length) {
			var index = Rack[j].letters;
			console.log(i, index);
			var urlletters = "images/Scrabble_Tile_" + index + ".jpg";
			tile += "<td><img id='tile_drag_" + i + "' class='board_piece_" + index + "' src='" + urlletters + "'></img></td>";
			j++;
		} else {
		// console.log(i);
			tile += "<td></td>";
		}
	}    
	tile += '</tr></table>';
	$("#Tiles").html(tile);
	// console.log("im done");
}