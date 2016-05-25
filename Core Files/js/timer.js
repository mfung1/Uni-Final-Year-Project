/*
Student Number: 13051622
Student Name: Matthew Fung
Module Code: 6COM0284
Module Title: Web Based Systems Project
*/
var i = 0;
		x = 0;
	clicked = false;
	times = [];
function startcounter(){
	if(clicked === false){
	interval = setInterval( increment, 1000);
		clicked == true;
	}
	else if (clicked === true){
	}
};
function increment(){
	i++;
	document.getElementsByClassName('timer')[0].textContent = i;

	};

function stopcounter(){
	console.log(times);
	window.clearInterval(interval);
	i = 0;
	document.getElementsByClassName('timer')[0].textContent= i;
	clicked = false;
};
