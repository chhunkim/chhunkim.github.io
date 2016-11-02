var today = new Date();
var hourNow = today.getHours();
var greeting;

greeting = 'Welcome!';
if(hourNow >= 18 ){
  greeting = 'Good Evening!';
}
else if(hourNow >= 12 && hourNow < 18){
  greeting = 'Good Afternoon';

}
else{
  greeting = 'Good Morning';
}

document.write('<h3>' + greeting + '</h3>');
