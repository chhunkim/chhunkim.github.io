/*****
	File: /~ckim/GUI1/Assignment9/js/Board.js
  COMP4610 GUI Programming I Assignment: Implementing a Bit of Scrabble with Drag-and-Drop
  Chhun Kim, UMASS Lowell Computer Science, chhun_kim@student.uml.edu
  Copyright (c) 2016 by Chhun Kim. All rights reserved.
	May be freely copied or excerpted for educational purposes with credit to the author.
		Created by CK on 12/04/2016
		Updated by CK on 12/05/2016
	
	Most of code was taken and modified from ~cvu\HW9\js\GeneratedBoard.js
	This  is creditted to Chong Vu
******/

// the board function is to generate the entired board
function Board(){
	var table = ""; // initialized table variable
	$("#scrabbleBoard").html(table);
	table += '<table id="singleLine">';
	
	table += '<tr><td class="wTriple regular">3x<br>Word</td>';
	table += '<td class="regular"></td>';
	table += '<td class="regular"></td>';
	table += '<td class="lDouble regular">2x<br>Letter</td>';
	table += '<td class="regular"></td>';
	table += '<td class="regular"></td>';
	table += '<td class="regular"></td>';
	table += '<td class="start regular">*<br>START</td>';
	table += '<td class="regular"></td>';
	table += '<td class="regular"></td>';
	table += '<td class="regular"></td>';
	table += '<td class="lDouble regular">2x<br>Letter</td>';
	table += '<td class="regular"></td>';
	table += '<td class="regular"></td>';
	table += '<td class="wTriple regular">3x<br>Word</td></tr>';
	/* for the full board
	var c = 1;
	while(c <= 8){
		rowsOfBoard(c);
		c++;
	}
	c=7;
	while(c>0){
		rowsOfBoard(c);
		c--;
	}*/
	table += '</table>';
	$("#scrabbleBoard").html(table);
	table= "";
	
	// var rowID = $("#scrabbleBoard").find('td');
	// var size = rowID.length;
	// var row = 1;
	// var col = 1;
	// rowID.each(function(){
		// var chr = row.toString() + "-" + col.toString();
		// $(this).addClass(chr);
		// if (col == 15){
			// row++;
			// col = 0;
		// }
		// col++;
	// });
}

/* For the full Board
// since the scrabble board must be 15 columns x 14 rows
// the following will generate the row of the board
function rowsOfBoard(row){
	switch(row){
		case 1:
			table += '<tr><td class="wTriple regular">3x<br>Word</td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="lDouble regular">2xLetter</td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="wTriple regular">3xWord</td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="lDouble regular">2xLetter</td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="wTriple regular">3xWord</td>';
			break;
			
		case 2:
			table += '<tr><td class="regular"></td>';
			table += '<td class="wDouble regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="lTriple regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="lTriple regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="wDouble regular"></td>';
			table += '<td class="regular"></td>';
			break;
			
		case 3:
			table += '<tr><td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="wDouble regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="lDouble regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="lDouble regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="wDouble regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			break;
			
		case 4:
			table += '<tr><td class="lDouble regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="wDouble regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="lDouble regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="wDouble regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="lDouble regular"></td>';
			break;
			
		case 5:
			table += '<tr><td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="wDouble regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="wDouble regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			break;
			
		case 6:
			table += '<tr><td class="regular"></td>';
			table += '<td class="lTriple regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="lTriple regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="lTriple regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="lTriple regular"></td>';
			table += '<td class="regular"></td>';
			break;
			
		case 7:
			table += '<tr><td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="lDouble regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="lDouble regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="lDouble regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="lDouble regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			break;
			
		case 8:
			table += '<tr><td class="wTriple regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="lDouble regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="start regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="lDouble regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="regular"></td>';
			table += '<td class="wTriple regular"></td>';
			break;
	}
}
*/
