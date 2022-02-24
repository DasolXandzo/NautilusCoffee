var cart = {}; //корзина

var value = 0; //две нулевые переменные 
var score = 0;

var totalResult = 0; //итоговая сумма

function scoreBasket(){
	if (localStorage.getItem('elements')){
		if (localStorage.elements==0){
			$('.hide').css("display", "none");
		}
		else{
			$('.basket_null').css("display", "none");
			//отображение количества товаров в корзине по данным куки файла
			$('.basket_score').html(localStorage.getItem('elements'));
		}
	}
	else{
		$('.hide').css("display", "none");
	}
}

function loadCart(){
    //проверяю наличие записи 'cart' в localStorage
    if (localStorage.getItem('cart')){
        // если есть, то расшифровываю и вывожу в переменную 'cart'
        cart = JSON.parse(localStorage.getItem('cart'));
        showCart();
    }
    else{
    }
}

//выгружаем в корзину товары из localStorage
function showCart(){
	$.getJSON('../Products/goods.json', function(data){
		var goods = data;
		var out = '';
		for (var id in cart){
			out +='<div class="it">';
				out +=`<div class="left info">`;
					out +=`<img class="item" src="../Products/img/${goods[id].img}">`;
					out +=`<div class="inf">`;	
						out +=`<div class="name">${goods[id].name}</div>`;
		        		out +=`<div class="postname">${goods[id].postname}</div>`;
		        		out +=`<p class="op">${goods[id].description}</p>`;
	        		out +=`</div>`;
	        	out +=`</div>`;
	        	out +=`<div class="item_score middle">`;
	        		out +=`<div class="little_button minus_item" data-id="${id}">-</div>`;
	        		out +=`<div id="score">${cart[id]}</div>`;
	        		out +=`<div class="little_button plus_item" data-id="${id}">+</div>`;
	        	out +=`</div>`;
	        	//₽(&#8381;) ×(&#215;)
	        	var price = cart[id] * goods[id].cost;
	        	var totalResult = parseInt($.cookie('total_result'));
				totalResult = totalResult + price;
				$.cookie('total_result', escape(totalResult), {expires: 7});
	        	out +=`<div class="price"> ${price} &#8381;</div>`;
	        	out +=`<div class="delete_item" data-id="${id}">&#215;</div>`;
			out +='</div>';
		}			
		$('.cart').html(out);
		$('.delete_item').on('click', delItem);
		$('.plus_item').on('click', plusItem);
		$('.minus_item').on('click', minusItem);	
	});
}

//function resultSumm(){
//	if ($.cookie('total_result')==null){
//		var totalResult = totalResult + price;
//		$.cookie('total_result', escape(totalResult), {expires: 7});
//	}
//	else{
//		totalResult = parseInt($.cookie('total_result'));
//		totalResult = totalResult + price;
//		$.cookie('total_result', escape(totalResult), {expires: 7});
//	}
//}

function delItem(){
	//удаление товара из корзины
	var id = $(this).attr('data-id');
	score = cart[id];
	delete cart[id];
	value = localStorage.getItem('elements');
    value = parseInt(value); // перевод в integer
	value = value - score;
	localStorage.setItem('elements', escape(value));
	$('.basket_score').html(localStorage.getItem('elements'));
	if (localStorage.elements==0){
		location.reload();
	}
	saveCart();
	showCart();
}

function plusItem(){
	//увеличиваем количество товара в корзине
	var id = $(this).attr('data-id');
	cart[id]++;
	plusScoreBasket();
	saveCart();
	showCart();
}

function minusItem(){
	//уменьшаем количество товара в корзине
	var id = $(this).attr('data-id');
	if (cart[id]==1){
		delete cart[id];
		minusScoreBasket();
		if (localStorage.elements==0){
			location.reload();
		}
	}
	else{
		cart[id]--;
		minusScoreBasket();
	}
	saveCart();
	showCart();
}

//уменьшаем количество товаров в корзине
function minusScoreBasket(){
	value = localStorage.getItem('elements');
    value = parseInt(value); // перевод в integer
	value--;
	localStorage.setItem('elements', escape(value));
	$('.basket_score').html(localStorage.getItem('elements'));
}

//увеличиваем количество товаров в корзине
function plusScoreBasket(){
	value = localStorage.getItem('elements');
    value = parseInt(value); // перевод в integer
	value++;
	localStorage.setItem('elements', escape(value));
	$('.basket_score').html(localStorage.getItem('elements'));
}

function saveCart(){
    //сохраняем корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart)); //переводим корзину в строку
}

$('.clear_basket').on('click', clearBasket);

function clearBasket(){
	var Clear = confirm("Вы уверены, что хотите очистить корзину?");
	if(Clear==true){
		//удаление товаров из корзины и переменной 'cart' и количества товаров из переменной 'elements'
		localStorage.clear();
		//возврат отображения количества товаров
		$('.basket_score').html(localStorage.getItem('elements'));
		//обновляем страницу
		location.reload();
	}
	else{
	}
}

$(document).ready(function(){
	scoreBasket();
	loadCart();
	$('.result_summ').html($.cookie('total_result') + '&#8381;');
});