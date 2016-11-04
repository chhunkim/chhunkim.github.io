// JavaScritp file for Assignment 6
// Chhun Kim

// Define all the variable for inputs
var rMin, rMax, cMin, cMax;

// createTable() function called after the submit button has been hit
// to generate the table corespond to the inputs from user
function createTable(){
	// Get value of the Min Row
	rMin = document.getElementById("minRow").value;
	// Get value of the Max Row
	rMax = document.getElementById("maxRow").value;
	// Get value of the Min Column
	cMin = document.getElementById("minCol").value;
	// Get value of the Max Column
	cMax = document.getElementById("maxCol").value;
	
	// Vertify all the inputs meet the requirement
	// If all inputs meet all the requirements
	// execute the table
	if(validateInputs(rMin, rMax, cMin, cMax)){
		document.getElementById("error").innerHTML ="";
		// convert all inputs to number
		// to make sure they are integers
		rMin = Number(rMin); 
		rMax = Number(rMax);
		cMin = Number(cMin);
		cMax = Number(cMax);
		// for debugging purpose to make sure inputs are token
		//document.getElementById("output1").innerHTML = rMin;
		//document.getElementById("output2").innerHTML = rMax;
		//document.getElementById("output3").innerHTML = cMin;
		//document.getElementById("output4").innerHTML = cMax;
		
		var tableOutput = ""; //define the tableOutput
		var checkColor = 0; // using this variable to check the color of each cell
		tableOutput += "<table id='myTable'>"; // opening tag for table
		
		// create table from column to row with the input provided by user
		// this "for loop" is creating rows 
		for(var row = 0; row <= (rMax - rMin + 1); row++){
			tableOutput += "<tr>"; // opening tag for table
			// this "for loop" is creating columns
			for(var col = 0; col <= (cMax - cMin + 1); col++){
				// all the if and else statements are taking care of the coloring cell
				if(row == 0){
					tableOutput += "<td class='header'>" + ((col == 0)? "" : ( col + cMin - 1)) + "</td>";
				}
				else if( col == 0 ){
					tableOutput += "<td class='header'>" + (row + rMin - 1) + "</td>";
				}
				else{
					tableOutput += ((Number(checkColor) % 2 == 0) ? "<td class='child-blink'>" : "<td class='color'>") + ((row + rMin - 1) * (col + cMin - 1)) + "</td>";  
					checkColor++; // increase this
				}
			}
			row % 2 == 0 ? checkColor = 0 : check = 1;
			tableOutput += "</tr>"; // closing tag for the row
		}
		tableOutput += "</table>";// closing tag for the table
		
		// display the table
		document.getElementById('myTable').innerHTML = tableOutput;
	}
	// otherwise, NULL
	else{
		document.getElementById('myTable').innerHTML = '';
	}
}

// the validateInputs function is to vertify all inputs are correct
function validateInputs(rMin, rMax, cMin, cMax){
	//document.getElementById("error").innerHTML = "";
	// if one of the input is NULL, prompt an error message
	if(rMin == "" || rMax =="" || cMin == "" || cMax ==""){
		document.getElementById("error").innerHTML = "<h3><font color=#FF0000>At least one of boxes is empty.<br>Please enter a positive number in all boxes.</font></h3>";
		return false;
	}
	// if Max is less than Min, prompt an error message
	// Without Number(), it will give the wrong result.
	// and if (rMin >= rMax || cMin >= cMax), 3 >= 12 is true. 
	else if(Number(rMin) >= Number(rMax) || Number(cMin) >= Number(cMax)){
		document.getElementById("error").innerHTML = "<h3><font color=#FF0000>Maximum MUST be greater than Minimum.<br>And MUST be a positive integer.<br>Please try again!</font></h3>";
		return false;
	}
	// if one of the input is less than 0, prompt an error message
	else if(rMin < 0 ||  rMax < 0 || cMin < 0 ||  cMax < 0){
		document.getElementById("error").innerHTML = "<h3><font color=#FF0000>All inputs MUST be a positive integer. Please try again!</font></h3>";
		return false;
	}
	// if one of the input is not an integer, prompt an error message
	else if(rMin % 1 != 0 || rMax % 1 != 0 || cMin % 1 != 0 || cMax % 1 != 0 ){
		document.getElementById("error").innerHTML = "<h3><font color=#FF0000>All inputs MUST be a positive integer. Please try again!</font></h3>";
		return false;
	}
	// otherwise, all inputs are valid.
	else{ 
		return true; 
	}
}
	