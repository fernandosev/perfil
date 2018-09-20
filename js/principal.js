var menuHamburguer = 0; //Variavel para exibir o benu hamvurguer
var auxLargura = 731; //Variavel global de largura maxima para a navbar

$(document).ready(()=>{
	//Inicia a funcao navbar ao carregar a pagina
	navbar();

	let larguraTela = $(window).width(); //Guarda a largura da tela do usuário

	//Header recebe a altura do documento menos a altura da nav
	$('header').height($(window).height() - 70);

	//inicia a funcao header ao carregar a página
	header();

	//inicia a funcao de animação para os itens da pagina
	animatePage();

	//Inicia a função de rolagem suave para os links ancora
	linksAncora();
});

$(window).resize(()=>{
	let larguraTela = $(window).width(); //Guarda a largura da tela do usuário

	// Inicia a navbar e muda para toggle se a dimensão ficar menor ou igual a 730px de largura se ja estiver em toggle, muda pata nav
	if((larguraTela <= 730) && (auxLargura === 730)){
		navbar();
		auxLargura = 731;

	}else if((larguraTela > 730) && (auxLargura === 731)){
		navbar();
		auxLargura = 730;
	}
	
	//Header recebe a altura do documento menos a altura da nav
	$('header').height($(window).height() - 70);
});

navbar = ()=>{
	let larguraTela = $(window).width(); //Guarda a largura da tela do usuário

	//Se a largura da tela for menor ou igual a 730px muda para a nav-toggle (Parecido com o Bootstrap)
	if(larguraTela <= 730){

		//Se não estiver no modo de visualizaçao do menu-toggle então muda a nava para toggle porque o usuário pode ficar redimensionando a tela.
		if(menuHamburguer == 0){
			$('.logo').remove();
			$('#itens').css('display', 'none');
			$('#nav').removeClass('navegacao');
			$('#itens').removeClass('itens');
			$('#nav').addClass('navegacao-toggle');
			$('.navegacao-toggle').prepend('<div class="menu-hamburguer"><i class="fas fa-bars"></i></div>');
			$('.navegacao-toggle').prepend('<div class="logo"><iframe src="images/logoo.svg"></iframe></div>');
			menuHamburguer = 1;
		}
		
		//Se o usuario pressionar o botão hamburguer abre o menu deslizante
		$('.menu-hamburguer').click(()=>{
				$('.navegacao-toggle ul').slideToggle('slow');
		});

	}else{
		
		//Se a largura da tela for maior que 730 adiciona as classes para a nav normal (não toggle)
		if(menuHamburguer != 0){
			$('.menu-hamburguer').remove();
			$('.logo').remove();
			$('.menu').prepend('<div class="logo"><iframe src="images/logoo.svg"></iframe></div>');
			$('#nav').removeClass('navegacao-toggle');
			$('#nav').addClass('navegacao');
			$('#itens').addClass('itens');
			$('#itens').css('display', 'block');
			menuHamburguer = 0;
		}

	}
}

header = ()=>{
	let numSlide = 0;

	let elemento = $('.slides .image').eq(numSlide).addClass('active').show();
	let controle = $('.slides ul li').eq(numSlide).addClass('active-controls').show();

	//Se o usuario clicar em um dos controles, vai para o slide selecionado
	$('.controles ul li').click((event)=>{
		let num = $(event.currentTarget).attr("data-slide");

		$('.active').fadeOut().removeClass('active');
		$('.slides .image').eq(num-1).fadeIn().addClass('active');

		$('.active-controls').removeClass('active-controls');
        $(event.currentTarget).addClass('active-controls');
	});

	setInterval(slides, 8000);	
	
}

slides = ()=>{
	let elemento = $('.slides .image');
	let controle = $('.controles ul li');

	//se houver uma imagem a frente mostra ela se nao volta para o primeiro elemento
	if($('.active').next('.image').length){
    	$('.active').fadeOut().removeClass('active').next().fadeIn().addClass('active');
    	$('.active-controls').removeClass('active-controls').next().addClass('active-controls');

    }else {
        $('.active').fadeOut().removeClass('active');
        elemento.eq(0).fadeIn().addClass('active');

        $('.active-controls').removeClass('active-controls');
        controle.eq(0).addClass('active-controls');
    }
}

animatePage = ()=>{
	//Adiciona a classe para mostrar o link das paginas ja criadas - Portfólio
	$('.itens-projetos div').hover((event)=>{
		$(event.currentTarget).find('.link').toggleClass('link-active');
	});

	//Animação para os links das redes sociais - imitando uma bola de basquete ao cair no chão
	$('.social-i').mouseover((eventOver)=>{
		$(eventOver.currentTarget).animate({marginTop: '5px'},300);
		$(eventOver.currentTarget).animate({marginTop: '20px'},280);
		$(eventOver.currentTarget).animate({marginTop: '7px'},260);
		$(eventOver.currentTarget).animate({marginTop: '20px'},240);
		$(eventOver.currentTarget).animate({marginTop: '10px'},220);
		$(eventOver.currentTarget).animate({marginTop: '20px'},200);
		$(eventOver.currentTarget).animate({marginTop: '14px'},180);
		$(eventOver.currentTarget).animate({marginTop: '20px'},160);
		$(eventOver.currentTarget).animate({marginTop: '17px'},140);
		$(eventOver.currentTarget).animate({marginTop: '20px'},120);
		$(eventOver.currentTarget).animate({marginTop: '19px'},100);
		$(eventOver.currentTarget).animate({marginTop: '20px'},100);
		$(eventOver.currentTarget).animate({marginTop: '0px'},400);
	}).mouseout((evetnOut)=>{
		$(evetnOut).css('margin-top', '0');
	});
}

//Rolagem suave ao clicar nos links ancora da navbar
linksAncora = ()=>{
	//Links da nav
	$('.navegacao a[href^="#"]').on('click', (e)=>{
		rolagemSuave(e);
	});

	//Links da nav-toggle
	$('.navegacao-toggle a[href^="#"]').on('click', (e)=>{
		rolagemSuave(e);
	});
}

rolagemSuave = (e)=>{
	e.preventDefault();

	//Pega o conteudo do href que é o id da div a ser mostrada
	let id = $(e.currentTarget).attr('href'),

	//Pegas as coordenadas do elemento
	targetOffset = $(id).offset().top;

	//Rola a pagina ate o elemento menos 120px para a nav não sobrepor o conteudo, com 500 milisegundos de duração
	$('html, body').animate({ 
		scrollTop: targetOffset - 120
	}, 500);

	//Fecha a nav-toggle
	$('.navegacao-toggle ul').slideUp('slow');
}
