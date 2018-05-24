
// Implement a super simple (non-standard) version of bind, if not already there.
if (!Function.prototype.bind){
    Function.prototype.bind = function (bind){
        var self = this;
        return function(){
            return self.apply(bind, arguments);
        };
    };
}

// Find out some specific browser stuff
var CSS = {};
(function(){
    
    var styles = document.createElement('div').style;
    
    var test_properties = function(properties){
        return properties.filter(function(prop){
            return (styles[prop] !== undefined);
        })[0];
    };
    
    CSS.transform = test_properties([
        'transform',
        'WebkitTransform',
        'MozTransform',
        'msTransform',
        'OTransform'
    ]);
    
})();


// Credit mr.doob and paul irish.
// http://paulirish.com/2011/requestanimationframe-for-smart-animating
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame   ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback, element){
            window.setTimeout(callback, 1000 / 60);
        };
})();

document.addEventListener('DOMContentLoaded', function(){
    // Color links
    var colors = ['blue', 'orange', 'green', 'red', 'teal', 'purple', 'yellow'];
    Array.prototype.forEach.call(document.querySelectorAll('a'), function(link){
        link.className += ' ' + colors[Math.floor(Math.random() * colors.length)];
    });
    
    // Add more/less functionality to context menu.
    var context = document.querySelector('.context');
    if(context){
        var control = context.querySelector('a.context-control');
        
        control.addEventListener('click', function(){
            var text = control.textContent.toLowerCase();
            
            if (text == 'close'){
                context.className += ' less';
                control.innerHTML = 'wut the wut?';
            } else {
                context.className = context.className.replace('less', '');
                control.innerHTML = 'close';
            }
        }, false);
    }
}, false);


function initMenu ()
{ 
		$("#menu").hide();
		$("#menu ul").hide();
		$("#menu_button").show();
		$("#menu_button span").css({ opacity: 0 }).fadeTo("slow", 0.4);
		//$("#menu_button span").hide().fadeIn("slow");				
		
		$('#menu_button').hover( 
function() 
			{			
				var bg_span = $(this).children("span");
				if (bg_span.hasClass("show"))
					bg_span.animate({ top: "10px", opacity: 1}, 200);
				else
					bg_span.animate({ top: "0px", opacity: 1}, 200);	
			},
			function() 
			{
				var bg_span = $(this).children("span");
				if (bg_span.hasClass("show"))
					bg_span.animate({ top: "0px", opacity: 1}, 200);
				else
					bg_span.animate({ top: "10px", opacity: 1}, 200);
			});
			
		$('#menu_button').toggle(
			function()
			{
				$("#menu_button span").fadeOut("fast", function() {
						$(this).removeClass("show").addClass("hide")
								.css({ top: "0px", opacity: 1})
								.fadeIn("fast");
					});
				$('#menu').fadeIn("fast", function(){ $("#menu ul").fadeIn("fast"); });
			},
			function()
			{
				$("#menu_button span").fadeOut("fast", function() {
						$(this).removeClass("hide").addClass("show")
								.css({ top: "10px", opacity: 1})
								.fadeIn("fast");
					});
				$("#menu").fadeOut("fast", function(){ $("#menu ul").hide(); });
			});
}

function animateBGColor(lastIndex, rand)
{	
	var color_array = [	"#85e1ff",
					    "#beddff",
						"#befff4",
						"#c0ffbe",
						"#e2f8ff",
						"#ffe9f4"									
						];
	
	var length = color_array.length;
	var next_color = "black", nextIndex=0;
	if (rand)
	{
		next_color = color_array[Math.floor(Math.random()*length)];
	} else {
		if (lastIndex >= length-1)
		{ 
			nextIndex = 0;
		} 
		else 
		{
			nextIndex = lastIndex+1;
		}
		next_color = color_array[nextIndex];
	}
	var fadeTime = 3000, pauseTime = 6000;
	$("img.bg").animate({ backgroundColor: next_color }, fadeTime, 
			function(){ 
				setTimeout( function() { animateBGColor(nextIndex, rand); }, pauseTime ); 
			});
}

function animateMenuItems() 
{
		$("#menu ul li").hover(
			function(){
				$(this).animate({ marginLeft: "0px"}, 100 );
			},
			function(){
				$(this).animate({ marginLeft: "35px"}, 100 );
			});
}