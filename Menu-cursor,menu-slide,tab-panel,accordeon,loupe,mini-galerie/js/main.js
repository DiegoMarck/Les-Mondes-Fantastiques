
//gestion du scroll animé de la page

function scrolling(){
    let links = $('#menu a');// on récupère les liens
    var doc = $('html, body');//on recupère les 2 elements
    links.on('click', function(event){
        event.preventDefault();
        let ancor = $($(this).attr('href'));//this dont l'attribu est href. On récupère la chaine de caractère qui correspond à notre ancre //recup l'attribut 'href' de l'objet cliqué => $(this).attr('href')
        // et y ajoute les fonction jquery => $(...)

        let = pos = $(ancor).offset().top;//récupère la position en top
        console.log(ancor,$(ancor).offset().top);//offset permet la récupération en numérique de la positon dans le document
        doc.animate({
            scrollTop:pos
        }, 700);
    })
}

// gestion du tab
function tabsPlugin(){
    let onglets = $('#tabs .onglets a')
    let panels = $('#tabs .panel');
    // console.log(panels, onglets);

    function openPanel(index){
        // console.log(index);
        panels.css({'display':'none'});//panels , vous allez tous disparaître
        panels.eq(index).css({'display':'block'});//sauf celui de l'index du lien affiche toi
    }

    function setCssClass(onglet){
        onglets.removeClass('actif');
        onglet.addClass('actif');
    }

    function setSize(){
        let h = 0;
        panels.each(function(){
            if(h<$(this).innerHeight()){
                h=$(this).innerHeight();
            }
            // console.log($(this).innerHeight(), h)
        });
        panels.css({'height':h});
    }

    onglets.on('click', function(ev){
        ev.preventDefault();
        openPanel($(this).index());
        setCssClass($(this));
    });

    function init(){
        openPanel(0);
        setSize();
    }
    init();
}

function accordeonPlugin(){
    let accBtn = $('#accordeon .btn');
    let accPanels = $('#accordeon .panel');


    function openPanel(currentPanel){
        // console.log(currentPanel)
        accPanels.not(currentPanel).slideUp();
        if(currentPanel.is(':hidden')){
            currentPanel.slideDown();
        }else{
            currentPanel.slideUp();
        }
    }

    function setCssClass(btn){
        accBtn.not(btn).removeClass('actif');
        btn.addClass('actif')
    }
    

    accBtn.on('click', function(ev){
        ev.preventDefault();
        openPanel($(this).next());
        setCssClass($(this));
        
    });

    function init(){
        accPanels.css({'display':'none'});

    }
    init();

}

//gestion mini galerie

function miniGaleriePlugin(){
    let imgs = $('.content-article img');
    let miniGaleriePlugin = $('#mini-galerie');
    let miniImg = miniGaleriePlugin.children('img');
    let legend = miniGaleriePlugin.children('figcaption');

    function setNewImage(currentImg){// on va changer le src des images lors du click
        // console.log(currentImg.attr('src'))
        miniImg.attr('src', currentImg.attr('src'))//on reécupère la chaine de caractère ds le src et la remplace dans l'autre
    }
    function setNewLegend(currentImg){
        // console.log(currentImg)
        legend.text(currentImg.next().text());
    }

    imgs.on('click', function(){
        setNewImage($(this))
        setNewLegend($(this))
    });

    function init(){//affiche première image et première legende de l'article
        setNewLegend(imgs.eq(0));
        setNewImage(imgs.eq(0));
    }
    init();

}

function loupePlugin(){
    let miniGalerie = $('#mini-galerie');//conteneur de la vignette galerie
    let zone = miniGalerie.children('img');// zone détection
    let loupeContainer = $('#loupe');//pour agir sur la loupe
    let imgLoupe;


    // function openLoup(){
    //     loupeContainer.fadeIn(300);
    // }

    function addImgLoupe(){
        imgLoupe = zone.clone().appendTo(loupeContainer);//clone image et met la dans la conteneur//stockage du clone
        loupeContainer.fadeIn(300);
    }

    function removeImgLoupe(){
        loupeContainer.fadeOut(300,function(){
            imgLoupe.remove();
            loupeContainer.children().remove();
        })

    }

    function moveInLoupe(event){
        let left = (Math.floor(event.offsetX/zone.width()*100))*-1;//coordonnée de x en % arrondi * -1 car par dans l'autre sens
        let top = (Math.floor(event.offsetY/zone.height()*100))*-1;
        imgLoupe.css({'top':top+'%','left':left+'%'});
        // console.log(event.offsetX,event.offsetY)
    }

    

    miniGalerie.hover(function(){//quand on passe par dessus, mouseenter
        
        addImgLoupe();
        zone.on('mousemove',moveInLoupe);//fct de recupèration des coordonnée de a souris

    },function(){//=mouseLive
        removeImgLoupe();
        zone.off('mousemove',moveInLoupe)
    })

}

function animateCursor(){
    //récupération du menu
    //récupération du curseur
    //stocker dans une variable la taille d'un link
    //mettre un écouteur d'event sur les liens
    //dans l'écouteur déplacer le curseur avec une animation sur la position du lien cliqué
    //faire une fonction init pour dimentionner le curseur à la taille d'un lien
    let menu = $('#menu');
    // let curseur = $('#menu .cursor');
    let curseur = menu.children('div');
    // let tailleLink;
    let links = menu.find('a');
    let linkWidth = links.width();
    console.log(menu,curseur)
    // menu.on('click', function{      
    //     link.css( "text-decoration", "underline" )
    // });

    links.on('click',function(){
        console.log('ici')
        curseur.stop().animate({
            'left':$(this).position().left
        },300)
    });
    function init(){
        curseur.css({'width':linkWidth});
    }
    init();
}

$(document).ready(function(){
    // gestion du scroll animé de la page
    scrolling();
    //gestion des tabs
    tabsPlugin();
    //gestion du modul accordeon
    accordeonPlugin();
    //mini galerie
    miniGaleriePlugin();
    //appel loupePlugin
    loupePlugin();
    //
    animateCursor();

});