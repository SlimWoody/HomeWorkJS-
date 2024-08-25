document.addEventListener('DOMContentLoaded', function() {
    var subscribeButton = document.getElementById('subscribe-button');

    subscribeButton.addEventListener('click', function(event) {
        event.preventDefault(); // Предотвращаем стандартное поведение ссылки

        // Получаем значение email из поля ввода
        var emailInput = document.getElementById('email-input');
        var emailValue = emailInput.value.trim();

        // Проверяем валидность email
        if (!isValidEmail(emailValue)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Очищаем поле ввода после успешной валидации, если нужно
        emailInput.value = '';

        // Здесь можно добавить дополнительные действия, если необходимо

        // Уведомляем пользователя об успешной проверке
        alert('Email is valid. Ready for further action (e.g., submit to server).');
    });

    function isValidEmail(email) {
        // Простая проверка формата email с помощью регулярного выражения
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
});