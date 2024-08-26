const url = './js/product.json';
let productsData;
let idProduct = 0;

async function loadProductData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {  // Проверяем, был ли запрос успешным
            throw new Error(`HTTP ошибка! Статус: ${response.status}`);
        }
        productsData = await response.json();
        console.log('Данные успешно загружены:', productsData);
        return productsData;
    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        document.body.innerHTML = "<p>Не удалось загрузить данные о продуктах.</p>"; // Добавляем сообщение на страницу
    }
}

async function initialize() {
    // Загружаем данные только один раз
    await loadProductData(url);

    // После загрузки данных можем выполнять с ними операции
    console.log('Загруженные данные:', productsData);
    assignIdsToProducts();
    renderProducts();
    addCartProduct();
    removeCartProductElement();
}

function assignIdsToProducts() {
    productsData.forEach(product => {
        product.id = idProduct;
        idProduct++;
    });
    console.log('Данные с назначенными ID:', productsData);
}

// Запускаем процесс при загрузке DOM
document.addEventListener('DOMContentLoaded', initialize);

function renderProducts() {
    const productCardsBlock = document.querySelector('.product-cards-block');
    productsData.forEach(product => {
        const divProductCard = document.createElement('div');
        divProductCard.classList.add('product-card');
        divProductCard.setAttribute('id', `product-${product.id}`);

        const divImageWrapperCard = document.createElement("div");
        divImageWrapperCard.classList.add('product-card__image-wrapper');

        const imgProductCard = document.createElement('img');
        imgProductCard.classList.add('product-card__image');
        imgProductCard.alt = product.alt;
        imgProductCard.src = product.src;



        const divBlackoutCard = document.createElement('div');
        divBlackoutCard.classList.add('product-card__blackout');

        const aAddToCartLink = document.createElement('a');
        aAddToCartLink.setAttribute('href', '#');
        aAddToCartLink.classList.add('product-card__add-to-cart-link');

        const imgAddToCart = document.createElement('img');
        imgAddToCart.src = './img/image__product/icom/add-card.svg';
        imgAddToCart.alt = 'добавить в корзину';

        aAddToCartLink.appendChild(imgAddToCart);
        aAddToCartLink.textContent = 'Add to Cart';

        divImageWrapperCard.appendChild(imgProductCard);
        divImageWrapperCard.appendChild(divBlackoutCard);
        divImageWrapperCard.appendChild(aAddToCartLink);

        const divProductCardInfo = document.createElement('div');
        divProductCardInfo.classList.add('product-card__info');

        const aProductCardTitle = document.createElement('a');
        aProductCardTitle.classList.add('product-card__title');
        aProductCardTitle.href = '#';
        aProductCardTitle.textContent = product.title;

        const pProductCardText = document.createElement('p');
        pProductCardText.classList.add('product-card__text');
        pProductCardText.textContent = product.text;

        const aProductCardPrice = document.createElement('a');
        aProductCardPrice.classList.add('product-card__price');
        aProductCardPrice.href = '#';
        aProductCardPrice.textContent = `${product.price} руб.`;

        divProductCardInfo.appendChild(aProductCardTitle);
        divProductCardInfo.appendChild(pProductCardText);
        divProductCardInfo.appendChild(aProductCardPrice);

        divProductCard.appendChild(divImageWrapperCard);
        divProductCard.appendChild(divProductCardInfo);

        productCardsBlock.appendChild(divProductCard);
    });
}

// function deleteCartProduct() {

// }
function addCartProduct() {
    const addToCartLinkEls = document.querySelectorAll('.product-card__add-to-cart-link');
    const cartBoxEl = document.querySelector('.cart__box');

    addToCartLinkEls.forEach(element => {
        element.addEventListener('click', function (e) {
            e.preventDefault();
            let target = e.target;
            let cardInfo = target.parentNode.parentNode.children[1];

            const divCartProductCard = document.createElement('div');
            divCartProductCard.classList.add('cart__product-card');
            divCartProductCard.id = target.parentNode.parentNode.id;

            const divCartImageWrapper = document.createElement('div');
            divCartImageWrapper.classList.add('cart__image-wrapper');

            const imgCartProductImg = document.createElement('img');
            imgCartProductImg.classList.add('cart__product-img');
            imgCartProductImg.src = target.parentNode.children[0].src;
            imgCartProductImg.alt = target.parentNode.children[0].alt;
            divCartImageWrapper.appendChild(imgCartProductImg);

            const divCartInfo = document.createElement('div');
            divCartInfo.classList.add('cart__info');

            const h2CartNameProduct = document.createElement('h2');
            h2CartNameProduct.classList.add('cart__name');
            h2CartNameProduct.textContent = cardInfo.children[0].textContent;

            const pCartPrice = document.createElement('p');
            pCartPrice.classList.add('cart__price');
            pCartPrice.textContent = 'Price: ';
            const spanPrice = document.createElement('span');
            spanPrice.textContent = cardInfo.children[2].textContent;
            pCartPrice.appendChild(spanPrice);

            const pCartPColor = document.createElement('p');
            pCartPColor.classList.add('cart__color');
            pCartPColor.textContent = 'Color: ';

            const pCartSize = document.createElement('p');
            pCartSize.classList.add('cart__size');
            pCartSize.textContent = 'Size: ';

            const divCartQuantity = document.createElement('div');
            divCartQuantity.classList.add('cart__quantity');
            divCartQuantity.textContent = 'Quantity:';

            const inputQuantity = document.createElement('input');
            inputQuantity.type = 'number';
            inputQuantity.setAttribute('value', 1);
            divCartQuantity.appendChild(inputQuantity);

            const divCartClosureElement = document.createElement('div');
            divCartClosureElement.classList.add('cart__closure-element');
            const imgCartClosureIcon = document.createElement('img');
            const aClosureElement = document.createElement('a');
            aClosureElement.classList.add('closure-element-link');
            aClosureElement.href = '#';
            imgCartClosureIcon.classList.add('closure-element-image')
            imgCartClosureIcon.src = './img/image__product/icom/closure.svg';
            imgCartClosureIcon.alt = 'Кнопка удалить';
            aClosureElement.appendChild(imgCartClosureIcon);
            divCartClosureElement.appendChild(aClosureElement);

            divCartInfo.appendChild(h2CartNameProduct);
            divCartInfo.appendChild(pCartPrice);
            divCartInfo.appendChild(pCartPColor);
            divCartInfo.appendChild(pCartSize);
            divCartInfo.appendChild(divCartQuantity);

            divCartProductCard.appendChild(divCartImageWrapper);
            divCartProductCard.appendChild(divCartInfo);
            divCartProductCard.appendChild(divCartClosureElement);


            const cartsProductsEls = document.querySelectorAll('.cart__product-card');

            // cartBoxEl.appendChild(divCartProductCard);

            let productExists = false;

            cartsProductsEls.forEach(product => {
                if (product.id === divCartProductCard.id) {
                    let inputQuantityEl = product.querySelector('.cart__quantity input');
                    inputQuantityEl.value++;
                    productExists = true;
                }
            });

            if (!productExists) {
                cartBoxEl.appendChild(divCartProductCard);
            }

            const cardBoxEl = document.querySelector('.cart__box');
            if (cardBoxEl.children.length === 0) {
                cardBoxEl.parentNode.style.display = 'none';
            } else {
                cardBoxEl.parentNode.style.display = 'block';
            }
        });
    });
}

function removeCartProductElement() {
    document.addEventListener('click', function (e) {
        const target = e.target;
        if (target.classList.contains('closure-element-image') || target.classList.contains('closure-element-link')) {
            e.preventDefault();
            const removeCartProductEl = target.parentNode.parentNode.parentNode;
            removeCartProductEl.remove();
        }

        const cardBoxEl = document.querySelector('.cart__box');
        if (cardBoxEl.children.length === 0) {
            cardBoxEl.parentNode.style.display = 'none';
        } else {
            cardBoxEl.parentNode.style.display = 'block';
        }
    });
}


const headerMenuLinks = document.querySelector('.header__menu-block');
console.log(headerMenuLinks.lastElementChild);
const divHeaderCountElementMenuCart = document.a

// Проверка пустая ли корзина 
const cardBoxEl = document.querySelector('.cart__box');
if (cardBoxEl.children.length === 0) {
    cardBoxEl.parentNode.style.display = 'none';
} else {
    cardBoxEl.parentNode.style.display = 'block';
}



// console.log(cardBoxEl.children.length);
// console.log(cardBoxEl.parentNode);