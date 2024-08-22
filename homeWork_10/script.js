/*
Задание 1
1. Поиск в интернете (бесплатные api примеры). - создал фаил JSon  - product.json
2. Найти любые данные, на произвольную тему.
3. Создать файл data.js. - создал фаил script.js и загрузил в него данные из product.json
4. Создать переменную которая будет хранить данные из публичных api - не понял как это сделать из файла json реализовал в функции загрузки.

Задание 2
1. Создать файл index.html. - Сделал 
2. Подключить data.js. - подключил script.js
3. Сформировать контент из данных (картинка загловок и параграф). - сделал
4. Добавить данный контент в вёрстку. - сделал
5. * Добавить стили при необходимости (по желанию). - сделал
*/


// Загрузка JSon из файла - подсотрел в интернете остальное согласно ДЗ 
let productsData = [];

async function loadProductData() {
    try {
        const response = await fetch('product.json');
        productsData = await response.json();
        console.log('Данные успешно загружены:', productsData);

        productsData.forEach(product => {
            // Создаем элементы 
            const divProductCardEl = document.createElement('div');
            divProductCardEl.classList.add('product__card');
            divProductCardEl.id = product.id;
            
            const divProductImgWrapper = document.createElement('div');
            divProductImgWrapper.classList.add('product__img-wrapper');

            const imgProductImageEl = document.createElement('img');
            imgProductImageEl.classList.add('product__image');
            imgProductImageEl.src = product.src;
            imgProductImageEl.alt = product.alt;

            const divProductInfoEl = document.createElement('div');
            divProductInfoEl.classList.add('product__info');

            const h3ProductNameEl = document.createElement('h3');
            h3ProductNameEl.classList.add('product__name');

            const aProductNameLinkEl = document.createElement('a');
            aProductNameLinkEl.classList.add('product__name-link');
            aProductNameLinkEl.textContent = product.productName;
            aProductNameLinkEl.href = '#';

            const pProductTextEl = document.createElement('p');
            pProductTextEl.classList.add('product__text');
            pProductTextEl.textContent = product.productText;

            const pProductPriceEl = document.createElement('p');
            pProductPriceEl.classList.add('product__price');
            pProductPriceEl.textContent = product.productPrice;

            // Добавляем элементы в блоки 
            h3ProductNameEl.appendChild(aProductNameLinkEl);

            divProductInfoEl.appendChild(h3ProductNameEl);
            divProductInfoEl.appendChild(pProductTextEl);
            divProductInfoEl.appendChild(pProductPriceEl);

            divProductImgWrapper.appendChild(imgProductImageEl);

            divProductCardEl.appendChild(divProductImgWrapper);
            divProductCardEl.appendChild(divProductInfoEl);

            // Находим блок catalog и загрузаем контент на страниц! 
            const catalogCurrentEl = document.querySelector('.catalog');
            catalogCurrentEl.appendChild(divProductCardEl);
        });

    } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
    }
}

loadProductData() 
