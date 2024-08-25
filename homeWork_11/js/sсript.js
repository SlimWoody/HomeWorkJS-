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

    const imgProductCard  = document.createElement('img');
    imgProductCard.classList.add('product-card__image');
    imgProductCard.alt = product.alt;
    imgProductCard.src = product.src;



    const divBlackoutCard = document.createElement('div');
    divBlackoutCard.classList.add('product-card__blackout');

    const aAddToCartLink = document.createElement('a');
    aAddToCartLink.setAttribute('href', '"#');
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