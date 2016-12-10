/******
	File: /~ckim/GUI1/Assignment9/js/RemainWord.js
  COMP4610 GUI Programming I Assignment: Implementing a Bit of Scrabble with Drag-and-Drop
  Chhun Kim, UMASS Lowell Computer Science, chhun_kim@student.uml.edu
  Copyright (c) 2016 by Chhun Kim. All rights reserved.
		Created by CK on 12/06/2016
		
		This function use to Generate and Update remaining word from the ScrabbleTiles array
		This simply create a string of tag and push to html using jQuery function
		Totally taken from Chong Vu: http://www.cs.uml.edu/~cvu/HW9/js/RemainWord.js
	*****/
	
function UpdateRemainWord() {
	var remain = "";
	$("#bagtiles").html(remain);
	
	var totalLetter = 0; 
	// var sLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ_";
	for (var i = 0; i < letters.length; i++){
			totalLetter += ScrabbleTiles[letters[i]].numberRemaining;
	}
	
	remain += '<table class="remainword">';
	// first row 
	remain += '<tr><td class="RWord" colspan="9">NUMBERS OF REMAINING LETTER TABLE</td></td>';
	// second row
	remain += '<tr><td class="RWord">' + "A: " + ScrabbleTiles["A"].numberRemaining + '</td>';
	remain += '<td class="RWord">' + "B: " + ScrabbleTiles["B"].numberRemaining + '</td>';
	remain += '<td class="RWord">' + "C: " + ScrabbleTiles["C"].numberRemaining + '</td>';
	remain += '<td class="RWord">' + "D: " + ScrabbleTiles["D"].numberRemaining + '</td>';
	remain += '<td class="RWord">' + "E: " + ScrabbleTiles["E"].numberRemaining + '</td>';
	remain += '<td class="RWord">' + "F: " + ScrabbleTiles["F"].numberRemaining + '</td>';
	remain += '<td class="RWord">' + "G: " + ScrabbleTiles["G"].numberRemaining + '</td>';
	remain += '<td class="RWord">' + "H: " + ScrabbleTiles["H"].numberRemaining + '</td>';
	remain += '<td class="RWord">' + "I: " + ScrabbleTiles["I"].numberRemaining + '</td></td>';

	// third row
	remain += '<tr><td class="RWord">' + "J: " + ScrabbleTiles["J"].numberRemaining + '</td>';
	remain += '<td class="RWord">' + "K: " + ScrabbleTiles["K"].numberRemaining + '</td>';
	remain += '<td class="RWord">' + "L: " + ScrabbleTiles["L"].numberRemaining + '</td>';
	remain += '<td class="RWord">' + "M: " + ScrabbleTiles["M"].numberRemaining + '</td>';
	remain += '<td class="RWord">' + "N: " + ScrabbleTiles["N"].numberRemaining + '</td>';
	remain += '<td class="RWord">' + "O: " + ScrabbleTiles["O"].numberRemaining + '</td>';
	remain += '<td class="RWord">' + "P: " + ScrabbleTiles["P"].numberRemaining + '</td>';
	remain += '<td class="RWord">' + "Q: " + ScrabbleTiles["Q"].numberRemaining + '</td>';
	remain += '<td class="RWord">' + "R: " + ScrabbleTiles["R"].numberRemaining + '</td></td>';
	// forth row
	remain += '<tr><td class="RWord">' + "S: " + ScrabbleTiles["S"].numberRemaining + '</td>';
	remain += '<td class="RWord">' + "T: " + ScrabbleTiles["T"].numberRemaining + '</td>';
	remain += '<td class="RWord">' + "U: " + ScrabbleTiles["U"].numberRemaining + '</td>';
	remain += '<td class="RWord">' + "V: " + ScrabbleTiles["V"].numberRemaining + '</td>';
	remain += '<td class="RWord">' + "W: " + ScrabbleTiles["W"].numberRemaining + '</td>';
	remain += '<td class="RWord">' + "X: " + ScrabbleTiles["X"].numberRemaining + '</td>';
	remain += '<td class="RWord">' + "Y: " + ScrabbleTiles["Y"].numberRemaining + '</td>';
	remain += '<td class="RWord">' + "Z: " + ScrabbleTiles["Z"].numberRemaining + '</td>';
	remain += '<td class="RWord">' + "_: " + ScrabbleTiles["_"].numberRemaining + '</td></td>';

	remain += '</table>';
	
	$("#bagtiles").html(remain);
}
