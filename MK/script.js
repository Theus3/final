document.addEventListener('DOMContentLoaded', () => {
    
    // ========================================
    // LÓGICA DO MENU HAMBÚRGUER
    // ========================================
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('header nav');
    const navLinks = document.querySelectorAll('header nav a');

    if (menuToggle && nav && navLinks) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                }
            });
        });
    }

    // ========================================
    // LÓGICA DO FLIP-CARD (SEÇÃO CONSEQUÊNCIAS)
    // ========================================
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        card.addEventListener('click', () => {
            const cardInner = card.querySelector('.flip-card-inner');
            if (cardInner) {
                cardInner.classList.toggle('is-flipped');
            }
        });
    });

    // ========================================
    // LÓGICA DO HEADER COM SOMBRA (SCROLLED)
    // ========================================
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) { 
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ========================================
    // LÓGICA DE SCROLL REVEAL (INTERSECTION OBSERVER)
    // ========================================
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observerInstance) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Adiciona a classe que dispara a animação CSS
                    entry.target.classList.add('is-visible');
                    // Para de observar o elemento (animação acontece só 1 vez)
                    observerInstance.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1 // Dispara quando 10% do elemento está visível
        });

        // Observa cada elemento
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback para navegadores antigos: mostra tudo de uma vez
        animatedElements.forEach(el => {
            el.classList.add('is-visible');
        });
    }

    // ========================================
    // LÓGICA: CARROSSEL INFINITO (SEÇÃO CURIOSIDADES)
    // ========================================
    const sliderWrapper = document.querySelector('.slider-wrapper');
    
    // Verifica se o slider-wrapper existe na página
    if (sliderWrapper) {
        const track = sliderWrapper.querySelector('.slider-track');
        const nextButton = sliderWrapper.querySelector('#nextBtn');
        const prevButton = sliderWrapper.querySelector('#prevBtn');
        
        // Verifica se todos os componentes do slider existem
        if (track && nextButton && prevButton) {
            let slides = Array.from(track.children);
            
            // Só executa se houver slides
            if (slides.length > 0) {
                let slideWidth = slides[0].getBoundingClientRect().width;
                let currentIndex = 1; // Começa no primeiro slide real (após o clone do último)
                let isSliding = false;

                // 1. Clonar slides para o loop infinito
                const firstClone = slides[0].cloneNode(true);
                const lastClone = slides[slides.length - 1].cloneNode(true);
                
                firstClone.classList.add('clone');
                lastClone.classList.add('clone');

                track.appendChild(firstClone);
                track.insertBefore(lastClone, slides[0]);
                
                // Atualiza a lista de slides para incluir os clones
                const allSlides = Array.from(track.children);

                // 2. Funções de Transição
                const enableTransition = () => {
                    track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                };

                const disableTransition = () => {
                    track.style.transition = 'none';
                };

                // 3. Função de Posição
                const setPosition = () => {
                    track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
                };

                // 4. Posição Inicial (sem animação)
                disableTransition();
                setPosition();

                // 5. Event Listeners dos Botões
                nextButton.addEventListener('click', () => {
                    if (isSliding) return;
                    isSliding = true;
                    currentIndex++;
                    enableTransition();
                    setPosition();
                });

                prevButton.addEventListener('click', () => {
                    if (isSliding) return;
                    isSliding = true;
                    currentIndex--;
                    enableTransition();
                    setPosition();
                });

                // 6. Lógica do Loop Infinito
                track.addEventListener('transitionend', () => {
                    isSliding = false;
                    
                    // Se parou em um clone
                    if (allSlides[currentIndex].classList.contains('clone')) {
                        disableTransition();
                        // Se é o clone do primeiro slide (no final da fila)
                        if (currentIndex === allSlides.length - 1) {
                            currentIndex = 1; // Pula para o primeiro slide real
                        }
                        // Se é o clone do último slide (no começo da fila)
                        if (currentIndex === 0) {
                            currentIndex = allSlides.length - 2; // Pula para o último slide real
                        }
                        setPosition();
                    }
                });

                // 7. Lógica de Redimensionamento da Janela
                window.addEventListener('resize', () => {
                    // Recalcula a largura do slide
                    slideWidth = slides[0].getBoundingClientRect().width;
                    // Reposiciona o carrossel sem animação
                    disableTransition();
                    setPosition();
                });
            }
        }
    }

});             