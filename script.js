// Плавная прокрутка для навигационных ссылок
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            // Проверяем, существует ли целевой элемент на странице
            if (targetSection) {
                e.preventDefault();
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Анимация появления элементов при прокрутке
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const phoneNumberInput = document.getElementById('phone-number');
    const dropdownButton = document.querySelector('.dropdown-button');
    const countryList = document.getElementById('country-list');
    const countryItems = document.querySelectorAll('#country-list li');

    // Открыть/закрыть выпадающий список при нажатии на кнопку
    dropdownButton.addEventListener('click', () => {
        countryList.style.display = countryList.style.display === 'block' ? 'none' : 'block';
    });

    // Обработка выбора страны из выпадающего списка
    countryItems.forEach(item => {
        item.addEventListener('click', () => {
            const countryCode = item.getAttribute('data-country-code');

            // Вставить код страны в начало поля для ввода телефона
            phoneNumberInput.value = countryCode + ' ';

            // Закрыть выпадающий список
            countryList.style.display = 'none';

            // Сбросить фокус на поле ввода номера телефона
            phoneNumberInput.focus();
        });
    });

    // Закрыть список при клике вне его
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.phone-input')) {
            countryList.style.display = 'none';
        }
    });
});


