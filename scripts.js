document.addEventListener('DOMContentLoaded', () => {
    // Lazy load эффект для секций
    const sections = document.querySelectorAll('section');
    if (sections.length > 0) {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        sections.forEach(section => observer.observe(section));
    }

    // Плавный переход по якорям
    document.querySelectorAll('.scroll-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Анимации для элементов ScrollReveal (только на страницах с элементом #about)
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        ScrollReveal().reveal('#about', {
            delay: 500,
            duration: 1000,
            origin: 'bottom',
            distance: '50px',
        });
    }

    // Фильтр карточек новостей
    const filterButtons = document.querySelectorAll('.filter-btn');
    const newsCards = document.querySelectorAll('.news-card');
    if (filterButtons.length > 0 && newsCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const category = button.getAttribute('data-category');

                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                newsCards.forEach(card => {
                    card.style.display =
                        category === 'all' || card.getAttribute('data-category') === category
                            ? 'block'
                            : 'none';
                });
            });
        });
    }

    // Создание анимации кружков только на странице index.html
    const floatingCirclesContainer = document.querySelector('.floating-circles');
    if (floatingCirclesContainer) {
        const circles = 25;
        for (let i = 0; i < circles; i++) {
            const circle = document.createElement('div');
            circle.classList.add('circle');

            circle.style.left = `${Math.random() * 100}%`;
            circle.style.animationDuration = `${10 + Math.random() * 10}s`;
            circle.style.animationDelay = `${-Math.random() * 20}s`;
            floatingCirclesContainer.appendChild(circle);

            circle.addEventListener('mouseover', () => {
                circle.style.opacity = '0.8';
                circle.style.transform = `scale(${1 + Math.random() * 2})`;
            });

            circle.addEventListener('mouseleave', () => {
                circle.style.opacity = '0.4';
                circle.style.transform = 'scale(1)';
            });
        }
    }

    // Обработка формы обратной связи
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            const response = await fetch('process_form.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&message=${encodeURIComponent(message)}`,
            });

            const result = await response.text();
            const formMessage = document.getElementById('formMessage');

            if (formMessage) {
                formMessage.style.display = 'block';
                formMessage.textContent = result === 'success' ? 'Сообщение успешно отправлено!' : 'Ошибка отправки. Попробуйте позже.';
                formMessage.style.color = result === 'success' ? '#00ff00' : '#ff0000';
            }

            contactForm.reset();
        });
    }

    // Плавное исчезновение прелоадера
    document.body.classList.remove('loading');

    // Lazy load для элементов fade-in
    const fadeInElements = document.querySelectorAll('.fade-in');
    fadeInElements.forEach(element => element.classList.add('show'));

    // Инициализация слайдера на странице myworks.html
    const sliderContainer = document.querySelector('.slider-container');
    const sliderImages = document.querySelector('.slider-images');
    if (sliderContainer && sliderImages) {
        const totalImages = document.querySelectorAll('.slider-images img').length;
        let currentIndex = 0;
        let startPos = 0;
        let isDragging = false;
        let currentTranslate = 0;
        let prevTranslate = 0;

        function showSlide(index) {
            currentIndex = index >= totalImages ? 0 : index < 0 ? totalImages - 1 : index;
            currentTranslate = -currentIndex * 100;
            sliderImages.style.transform = `translateX(${currentTranslate}%)`;
        }

        function startDrag(event) {
            isDragging = true;
            startPos = event.clientX || event.touches[0].clientX;
            prevTranslate = currentTranslate;
        }

        function drag(event) {
            if (!isDragging) return;
            const currentPos = event.clientX || event.touches[0].clientX;
            currentTranslate = prevTranslate + ((currentPos - startPos) / window.innerWidth) * 100;
            sliderImages.style.transform = `translateX(${currentTranslate}%)`;
        }

        function endDrag(event) {
            if (!isDragging) return;
            isDragging = false;

            const endPos = event.clientX || event.changedTouches[0].clientX;
            const distance = endPos - startPos;

            if (distance < -100) {
                showSlide(currentIndex + 1);
            } else if (distance > 100) {
                showSlide(currentIndex - 1);
            } else {
                showSlide(currentIndex);
            }
        }

        sliderContainer.addEventListener('mousedown', startDrag);
        sliderContainer.addEventListener('mousemove', drag);
        sliderContainer.addEventListener('mouseup', endDrag);
        sliderContainer.addEventListener('touchstart', startDrag);
        sliderContainer.addEventListener('touchmove', drag);
        sliderContainer.addEventListener('touchend', endDrag);

        showSlide(currentIndex);
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const options = { root: null, rootMargin: '0px', threshold: 0.1 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => observer.observe(section));

    // Add ScrollReveal effect
    ScrollReveal().reveal('.server-card', { 
        delay: 200, 
        distance: '30px', 
        origin: 'bottom', 
        duration: 800 
    });
});
