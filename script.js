var cookieInformation

// проверка наличия значения в куки "true"
if ($.cookie('true')==null){
cookieInformation = false; //ложь о вызове функции
}
else{
cookieInformation = $.cookie('true');
}

//флажок для проверки о вызове функции
if(!cookieInformation){
	//вызываемая функция
	alert("Добро пожаловать! Для вашего удобства, наш сайт использует Сookie файлы.");
	$.cookie('true','true', {expires: 365}); //создание кукиса со значением "true"
	cookieInformation = $.cookie('true'); //функция была вызвана => больше не будет вызываться
}

// проверка наличия значения в куки "количество товаров в корзине"
if (localStorage.getItem('elements')){  
    value = localStorage.getItem('elements');
    value = parseInt(value); // перевод в integer
}
else{
    value = 0;
}

if (localStorage.getItem('elements')){ 
    $('.road_of_basket').html(localStorage.getItem('elements'));
}
else{
    $('.road_of_basket').html(value);
}

$('.inbask').on('click', addToCart);

//function init(){
    //вычитуем файл goods.json
//    $.getJSON(
//    	"json/goods_coffee.json",
//    	"json/goods_author`s_drinks.json",
//    	"json/goods_food.json",
//    	"json/goods_hot_drinks.json", 
//    	goodsOut);
//}

//function goodsOut(data){
    // вывод на страницу
    //console.log(data);
//    var out='';
//    for (var key in data){
//        out +='<div class="it">';
//            out +=`<img class="item" src="img/${data[key].img}" alt="">`;
//            out +=`<div class="inf">`;
//                out +=`<div class="name">${data[key].name}`;
//                    out +=`<div class="postname">${data[key].postname}</div>`;
//                out +=`</div>`;
//                out +=`<p class="op">${data[key].description}</p>`
//                out +=`<div class="low">`;
//                    out +=`<div class="price">${data[key].cost} ₽</div>`;
//                    out +=`<div class="inbask" data-id="${key}">`;
//                        out +=`<strong>Купить</strong>`;
//                    out +=`</div>`;
//                out +=`</div>`;
//            out +=`</div>`;
//        out +='</div>';
//    }
//    $('.roll').html(out);
//    $('.inbask').on('click', addToCart);
//}

function addToCart(){
    scoreBasket();
    //добавляем товар в корзину
    var id = $(this).attr('data-id');
    // console.log(id);
    if (cart[id]==undefined){
        cart[id] = 1; //если в корзине нет товара - делаем равным 1
    }
    else{
        cart[id]++; //если такой товар есть - увеличиваю на единицу
    }
    showMiniCart();
    saveCart();
}

function scoreBasket(){
    // отображение количества товаров в корзине
    value = value + 1;
    $('.road_of_basket').html(value);
    //создание значения в localStorae "количество товаров в корзине"
    localStorage.setItem('elements', escape(value));
}

function saveCart(){
    //сохраняем корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart)); //переводим корзину в строку
}

//$(document).ready(function(){
//	init();
//});
