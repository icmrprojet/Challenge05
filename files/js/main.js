// jQuery
$(document).ready(function(){ // Charge le code à l'intérieur dès que le document est prêt.
	var controlGOk =1;
	var controlBOk =1;


	$(document).keydown(function(e){  //RIGHT
		var posiL=parseInt($('#umbrella').css('left'));
	    if ((e.keyCode == 39) && ( posiL < 420)) { 
	    	console.log(posiL);
	       $( "#umbrella" ).animate({ "left": posiL+20 }, 10, "linear" );
	       return false;
	    }
	});
	$(document).keydown(function(e){  //LEFT
		var posiL=parseInt($('#umbrella').css('left'));
	    if ((e.keyCode == 37) && ( posiL > 0)) { 
	    	console.log(posiL);
	       $( "#umbrella" ).animate({ "left": posiL-20 }, 10, "linear" );
	       return false;
	    }
	});
	function animBg (){
		$( "#playground" ).animate({ 
       	'background-position-y': '+=200'
       }, 1000,'linear',animBg)
	}


	var timer;
	function myTimer(){
		sec = $('#chrono').text();
		console.log('sec1='+sec);

		timer = setInterval(function(){
			$('#chrono').text(sec--);
			$('.chronometer').css('background','black');
			$('.chronometer').css('color','yellow');
			if(sec == -1){
				clearInterval(timer);
				$('#msg').show();							
				if (winGift >= 5){
					$('#msgFinLoser').hide();
					$('#msgFinWinner').show();
					$('#msgFinWinner').text('Gagné !');
					$('#inscription').show();
					$('#msg').css('background-color','#ff1ded');
					$('.chronometer').css('background','yellow');
					$('.chronometer').css('color','black');
					findujeu();
				}else{
					$('#msgFinLoser').text('Temps écoulé !');
					$('#msgFinLoser').show();
					$('#msgFinWinner').hide();
					$('#inscription').hide();
					$('#msg').css('background-color','rgba(1,1,1,0.6)');
					$('.chronometer').css('background','yellow');
					$('.chronometer').css('color','black');
					findujeu();
				}
			}
		} ,1000);
	}

	function findujeu(){
		$('#pause').trigger('click');
		$('#play').hide();
		$('#compt').text(3);// Nombre de départ du compteur central => setTimeOut de 3000
		$('#chrono').text(15);// Nombre de départ du compteur temps
		$('#rg').text($('#g').text());
		$('#rb').text($('#b').text());
		clearInterval(collisionGift);
		clearInterval(collisionBal);
	}

	$('#rejouer').on('click',function(){
		$('#g').text(0);
		$('#b').text(0);
		$('#rg').text(0);
		$('#rb').text(0);
		$('#msg').css('background-color','rgba(1,1,1,0.6)');
		$('#play').trigger('click');
		$('#msgFinWinner').hide();
		$('#inscription').hide();
		$('#msgFinLoser').hide();
		$('#msg').hide();
		setInterval(winnerGift, 20);
		setInterval(loserBal, 20);
	});

	$('#play').on('click', function(){	
	    console.log('LE JEU DEMARRE');
	    $('#play').hide();
	    $('#pause').show();	    
		$('#pause').css('pointer-events','none');
		$('#pause').css('cursor','wait');
		$('#pause').css('color','rgba(1,1,1,0.1)');
		$('#compt').text(3);// Nombre de départ du compteur central => setTimeOut de 3000
		sec = $('#chrono').text();
		$('#chrono').text(sec);// Nombre de départ du compteur temps
		$('#compt').show();
        //on lance le compte à rebours de 3 secondes

        var lancerDecompte = setInterval(function(){
            var valeurEnCours = $('#compt').text();
            valeurEnCours--;
            $('#compt').html(valeurEnCours);
        }, 1000);
        
        //on arrête le compte à rebours au bout de 3 secondes et on fait disparaître la div #countdown
        setTimeout(function(){
            clearInterval(lancerDecompte);
                $('#compt').css('display','none');
                //$('.btn-pause').attr('disabled',false);
                $('#compt').hide();
                $('#pause').css('pointer-events','auto');
				$('#pause').css('cursor','pointer');
				$('#pause').css('color','rgba(1,1,1,1)');
				//ici lancer la fontion qui lance le chrono
			
				myTimer();
				animBg();
				animGift();
				animBall();
        }, 3000);
	});

	$('#pause').on('click', function(){
       console.log('LE JEU STOPPE');
       var sec = $('#chrono').text();
       console.log('secPause='+sec);
       clearInterval(timer);
       $('#play').show();
       $('#pause').hide();
       $('#playground').stop();
       $('#gift').stop();
       $('#ball').stop();
	});
	function animBall (){
		controlBOk = 1;// on le repasse à 1 pour eviter qu'il detecte de multiples coillisions pendant la hauteur parapluie
		$('#ball').css('background-image', 'url("images/redbal.png")');
		$( "#ball" ).animate({ 
       	'top': '+=500px'
       },2800,'linear',function(){
			var posiX=Math.floor((Math.random())*440);
			//console.log('posiXBall=' +posiX);
			$('#ball').css('left', posiX);
			$('#ball').css('top', '-40px');
			animBall();
       })
	}
	function animGift (){
		controlGOk = 1;// on le repasse à 1 pour eviter qu'il detecte de multiples coillisions pendant la hauteur parapluie
		$('#gift').css('background-image', 'url("images/gift.png")');
		$( "#gift" ).animate({ 
       	'top': '+=500px'
       }, 2500,'linear',function(){
			var posiX=Math.floor((Math.random())*430);
			//console.log('posiXGift=' +posiX);
			$('#gift').css('left', posiX);
			$('#gift').css('top', '-60px');
			animGift();
       })
	}


/*//////////////////COLLISION//////////////////////////////////*/
    var winGift;

	var collisionGift = setInterval(winnerGift, 20);	
	function winnerGift() {
		var UmbrX=parseInt($('#umbrella').css('left'));
		var UmbrY=260;
		var giftX=parseInt($('#gift').css('left'));
		var giftY=parseInt($('#gift').css('top'));

		//test collision du Gift
		if (((giftX > UmbrX) && (giftX < (UmbrX + 40)) && (giftY > UmbrY)  && (controlGOk == 1)) ||
    	((UmbrX > giftX) && (UmbrX < (giftX + 40)) && (giftY > UmbrY) && (controlGOk ==1))){
			controlGOk = 0;
			winGift=parseInt($('#g').text());
			$('#gift').css('background-image', 'url("images/gift.gif")');
			winGift= winGift +1;
			$('#g').text(winGift);
		}
	}

	var collisionBal = setInterval(loserBal, 20);
	function loserBal() {
		var lostBal=0;
		var UmbrX=parseInt($('#umbrella').css('left'));
		var UmbrY=260;
		var ballX=parseInt($('#ball').css('left'));
		var ballY=parseInt($('#ball').css('top'));

		//test collision du Ballon
		if (((ballX > UmbrX) && (ballX < (UmbrX + 40)) && (ballY > UmbrY) && (controlBOk == 1)) ||
    	((UmbrX > ballX) && (UmbrX < (ballX + 40)) && (ballY > UmbrY)  && (controlBOk ==1))){
			controlBOk = 0;
			lostBal=parseInt($('#b').text());
			$('#ball').css('background-image', 'url("images/redbal.gif")');
			lostBal= lostBal +1;
			$('#b').text(lostBal);
			if (lostBal == 3){
				clearInterval(timer);
				$('#msg').show();
				$('#msgFinLoser').text('Perdu !');
				$('#msgFinLoser').show();
				$('#msgFinWinner').hide();
				$('#inscription').hide();
				$('#msg').css('background-color','#1d26ff');
				$('.chronometer').css('background','yellow');
				$('.chronometer').css('color','black');
				findujeu();
			}
		}
	}

	function afficher() {
		// si le localstorage est supporté par le navigateur
		if(typeof localStorage!='undefined') {
			// si il y a des scores deja enregistré dans le localstorage
			if(localStorage.getItem("joueurScore") !== null){

				// je recuper le local storage dans une variable
				var TousLesScores = localStorage.getItem('joueurScore');
				// je decoupe la variable sur le separateur ";"
    			var valDecoupe=TousLesScores.split(';');

    			// pour chaque resultat
			    for(var i=0;i<valDecoupe.length;i++){

			    	// je redecoupe maintenant le score et le joueur sur le deuxieme separateur
			        valeurFinale = valDecoupe[i].split(':');
			        // je l'insere dans le tableau en HTML
			        insererScoreDansHtml = "<tr><td>"+valeurFinale[0]+"</td><td>"+valeurFinale[1]+"</td></tr>";
			        $("#tabScore table tr:first-child").after(insererScoreDansHtml);
			        } 

			} else{
				// si il n'y a pas de scores enregistrés je masque le tableau et le bouton resest
				$('#tabScore table, #resetScore').hide();
			}
				
		} else {
		  	alert("localStorage n'est pas supporté");
		}
	}

	// j'appelle afficher au lorsque le document est pret
	afficher();




	$("#valider").on('click', function(){
		 // je masque le formulaire
	    $('#inscription').hide();
		// j'affiche le tableau et le bouton reset
		$('#tabScore table, #resetScore').show();
		// je récupère le nom et le score qui viennent d'etre saisie
		var nomwinner = $('#name').val();
		var points = $('#rg').text();
		// j'ajoute nom et score dans le HTML
		var result= '<tr><td>' + nomwinner + ' </td><td> ' + points + '</td></tr>';
	    $("#tabScore table tr:first-child").after(result);

	    // j'ajoute nom et score dans le localStorage

	    // si il y avait deja des scores enregistrés, je les récupère et y ajoutes les nouveaux
	    if(localStorage.getItem("joueurScore") !== null){
	    	nouvelleValeur = localStorage.getItem('joueurScore') + ";" + nomwinner + ":" + points;
	    	localStorage.setItem('joueurScore',nouvelleValeur);
	    } else{
	    	// sinon j'ajoute uniquement le score du joueur en cour
	    	premiereValeur = nomwinner + ":" + points;
	    	localStorage.setItem('joueurScore',premiereValeur);
	    }	    
	   
	});

	$("#resetScore").on('click', function(){
		$(this).hide();
		$("#tabScore table tr").hide();
		$("#tabScore table tr:first-child").show();
		// On supprime tous les scores contenu dans la Key du local storage nommée "joueurScore"
		localStorage.removeItem("joueurScore");
		// Ci dessous = pour supprimer TOUT le local storage, preferable d'uliser la methode ci dessus si on utilise le local storage pour autre chose
		//localStorage.clear();

	});
});