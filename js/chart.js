var chart = {
	width: function(){
		//how many columns the user wants times how big the columns are, obtained by checking how big the symbols are.
		return $('#columns').val()*$('.symbol').css('width').replace(/px/,"");
	},
		
	height: function(){
		return $('#rows').val()*$('.symbol').css('height').replace(/px/,"");
	},
	
	boxNum: function(){
		return $('#rows').val() * $('#columns').val();
	},
	
	boxCreate: function(i){
		$('#chart').append("<div class='box float-left'></div>");
	},
	
	setup: function(){
		var chart_css = {
			width: chart.width(),
			height: chart.height()
		}
		
		//clean up, in case someone changed their mind on how big they wanted the chart.
		$('.box').remove();
		
		//make this scalable eventually
		//right now it just sets the chart to have the right height and width so it forms a nice grid, then fills it with box divs.
		$('#chart').css(chart_css);
		for(i=1;i<=chart.boxNum();i++){
			chart.boxCreate(i);
		};
		$('.main').show();
	}
};
	
//Symbol select. Click on a symbol, changes current, click on a box and get taht background color/image. 
//Logic for picking out if there's a background color or image and behaving accordingly
var symbolSelect = {
	currentSymbol: 0, //keeping these seperate
	//currentLace: 0,
	//test: 0,
	custom: 0,
	
	changeSymbol: function(newSymbol){
	    //get the classes off the symbol, set them in the current color, update
		this.getClass(newSymbol);
		$('.current').addClass(this.currentSymbol);
	},
	
	chartSymbol: function(box){
		$(box).addClass(this.currentSymbol);
	},
	
	//grabs a value from custom, shove it in the right place
	customColor: function(){
		//work out how to let it take full custom hex later
		$('.current').addClass($('#customColor').val());
	},
	
	//so what we do is, we get an array of the classes on the symbol we clicked. Then we iterate over that (two-set) array and set the one we care about (the color) equal to test.
	getClass: function(newSymbol){
		var classList = $(newSymbol).attr('class').split(/\s+/);
		$.each(classList,function(index,item){
		  if(item != 'symbol')
		    symbolSelect.currentSymbol = item;
		 });
	}
};

$(function(){
	$('#tabs a[href="#color"]').click(function (e) {
		e.preventDefault()
		$(this).tab('show')
	});
	
	$('#tabs a[href="#lace"]').click(function (e) {
		e.preventDefault()
		$(this).tab('show')
	});
	
	$('.create').click(function(){
		chart.setup();
	
		//the box color changes. It's here because it's only after the chart is created that the boxes are in the DOM
		$("div[class~='box']").click(function(){
			symbolSelect.chartSymbol(this);
		});
		//on doubleclick, look through the classes to find the class we want to remove, then slice it out of there
		$("div[class~='box']").dblclick(function(){
			$(this).removeClass(function(index,css){
				var test = (css.match(/color-\S+|lace-\S+/g) || []).join(' ');
				return test;
			});
		});
	});

	$('.symbol').click(function(){
		symbolSelect.changeSymbol(this);
	});	
	
	$('.custom').click(function(){
		symbolSelect.customColor();
	});
	
	$('.print').click(function(){
		window.print();
	});
	
	$('.openclose p').click(
	function(){
		if($(this).parent().hasClass('active')){
			$(this).parent().removeClass('active');
		}else{
			$(this).parent().addClass('active');
		}	
	});
});