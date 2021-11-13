function tabsPlugin(){
	var onglets = $('#tabs .onglets a');
	var panels = $('#tabs .panel');

	onglets.on('click',function(ev){
		ev.preventDefault();
		var self = $(this);
		 openPanel(self.index())
		setCssClass(self)
	});

	function setSize(){
		var size = 0;
		var pad = parseInt(panels.css('padding'),10);
		panels.each(function(){
			if(size < $(this).height()){
				size = $(this).height();
			}
		});
		panels.css({'height':size+(pad*2)});
	}

	function setCssClass(onglet){
		onglets.addClass('actif');
		onglets.not(onglet).removeClass('actif');
	}

	function openPanel(index){
		var currentPanel = panels.eq(index);
		currentPanel.css({'display':'block'});
		panels.not(currentPanel).css({'display':'none'});
	}

	function init(){
		setSize();
		openPanel(0);
	}

	init();
}

function accordeonPlugin(){
	var accordeonBtn = $('#accordeon .btn');
	var panels = $('#accordeon .panel');

	accordeonBtn.on('click',function(ev){
		ev.preventDefault();
		var self = $(this);
		setCssClass(self)
		openPanel(self.next());
	});

	function openPanel(currentPanel){
		panels.not(currentPanel).slideUp("slow");
		if(currentPanel.is(':hidden')){
			currentPanel.slideDown("slow");
		}else{
			currentPanel.slideUp("slow");
		}
	}

	function setCssClass(btn){
		btn.addClass('actif');
		accordeonBtn.not(btn).removeClass('actif');
	}

	function init(){
		panels.css({"display":'none'});
	}

	init()
}

function miniGaleriePlugin(){
	var imgs = $('.content-article img');
	var container = $('#mini-galerie');
	var miniImg = container.children('img');
	var legend = container.children('figcaption');


	function setLegend(img){
		legend.text(img.next().text());
	}

	function setNewImage(img){
		miniImg.attr('src',img.attr('src'));
	}

	function cleanGalerie(){
		container.children('figcaption').remove();
	}

	imgs.on('click',function(){
		var self = $(this);
		setLegend(self);
		setNewImage(self);
	});

	function init(){
		setLegend(imgs.eq(0));
		setNewImage(imgs.eq(0));
	}

	init();
}


function loupePlugin(){
	var container = $('#mini-galerie');
	var loupeContainer = $('#loupe');
	var zone = container.children('img');
	var zoneSize = {h:zone.height(),w:zone.width()};
	var	imgLoupe = loupeContainer.children('img');

	function openLoupe(){
		loupeContainer.fadeIn(300);
	}

	function addImgLoupe(){
		imgLoupe = zone.clone().appendTo(loupeContainer);
		loupeContainer.fadeIn(300);
	}
	function removeImgLoupe(){
		loupeContainer.fadeOut(300,function(){
			imgLoupe.remove();
		});
	}

	function moveInLoupe(event){
		var l = (Math.floor(event.offsetX/zoneSize.w*100))*-1;
		var t = (Math.floor((event.offsetY/zoneSize.h)/2*100))*-1;
		imgLoupe.css({'top':t+'%','left':l+'%'});			
	}

	container.hover(function(event){
		addImgLoupe();
		zone.on('mousemove',moveInLoupe);
	},function(){
		removeImgLoupe();
		zone.off('mousemove',moveInLoupe);
	});

	
	
}

function menuPlugin(){
	var menu = $('#menu');
	var links = $('#menu a');
	var size = links.width();
	var cursor = menu.children('div');


	links.on('click',function(event){
		event.preventDefault();
		cursor.stop().animate({'left':$(this).position().left},300);
	});

	function init(){
		cursor.width(links.width());
	}

	init();
}

function ancoreScroll(){
	var links = $('#menu a');
	var doc = $('html,body');


	links.on('click',function(){
		var ancoreTop = $($(this).attr('href'));
		doc.stop().animate({
			scrollTop:ancoreTop.offset().top
		},500);
	});
}


$(document).ready(function(){
	tabsPlugin();
	miniGaleriePlugin();
	accordeonPlugin();
	loupePlugin();
	menuPlugin();
	ancoreScroll();

	$('.tooltype').tooltype(100);
});