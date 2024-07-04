$(document).ready(function() {
    // Arrays de objetos contendo informações sobre profissionais, serviços e produtos
    const professionals = [
        {img: './images/men1.jpeg', speciality: 'Cabeleireiro'},
        {img: './images/woman1.jpeg', speciality: 'Cabeleireira'},
        {img: './images/woman2.jpeg', speciality: 'Manicure'},
        {img: './images/men2.jpeg', speciality: 'Cabeleireiro'},
        {img: './images/woman1.jpeg', speciality: 'Cabeleireira'},
        {img: './images/woman2.jpeg', speciality: 'Manicure'},
    ];

    const services = [
        {img: './images/escova.jpg', name: 'Escova', price: 60},
        {img: './images/corte-feminino.jpeg', name: 'Corte Feminino', price: 60},
        {img: './images/progressiva.jpeg', name: 'Progressiva', price: 180},
        {img: './images/escova.jpg', name: 'Coloração', price: 90},
        {img: './images/corte-feminino.jpeg', name: 'Corte Feminino', price: 60},
        {img: './images/progressiva.jpeg', name: 'Progressiva', price: 180},
    ];

    const products = [
        {img: './images/oleo-sache.webp', name: 'Elixir S. O. S Sachê 80ml', price: 90},
        {img: './images/oleo-sache.webp', name: 'Shampoo Revitalizante 200ml', price: 45},
        {img: './images/oleo-sache.webp', name: 'Condicionador Hidratante 200ml', price: 50},
    ];

    /**
     * Função para popular uma seção com itens dinâmicos
     * @param {string} sectionClass - Classe da seção a ser populada
     * @param {Array} items - Array de itens a serem adicionados
     * @param {string} itemClass - Classe CSS dos itens individuais
     * @param {string} imgClass - Classe CSS das imagens dos itens
     * @param {string} nameClass - Classe CSS do nome ou especialidade dos itens
     * @param {string} priceClass - Classe CSS do preço dos itens (opcional)
     */
    function populateSection(sectionClass, items, itemClass, imgClass, nameClass, priceClass) {
        let container = $(sectionClass + ' .nav-galeria .row');
        container.empty(); // Limpa o conteúdo existente

        items.forEach(item => {
            // Criação do HTML para cada item
            let itemHtml = `<div class="col-md-4 ${itemClass}">
                                <div class="${imgClass}" style="background-image: url('${item.img}');">
                                </div>
                                <h2 class="${nameClass}">${item.speciality || item.name}</h2>`;
            // Adiciona o preço se a classe do preço e o preço estiverem definidos
            if (priceClass && item.price) {
                let price = parseFloat(item.price).toFixed(2).replace('.', ','); // Formata o preço para 2 casas decimais
                itemHtml += `<h3 class="${priceClass}">R$ ${price}</h3>`;
            }
            itemHtml += `</div>`;
            container.append(itemHtml);
        });
    }

    // População das seções com os dados fornecidos
    populateSection('.professionals', professionals, 'professional-single', 'professional__img', 'professional__speciality');
    populateSection('.services', services, 'service-single', 'service__img', 'service__name', 'service__price');
    populateSection('.products', products, 'product-single', 'product__img', 'product__name', 'product__price');

    /**
     * Função para inicializar o slider
     * @param {string} sliderClass - Classe CSS da seção do slider
     */
    function initSlider(sliderClass) {
        var curIndex = 0; // Índice atual do slider
        var elSingle = $(sliderClass + ' .nav-galeria .col-md-4'); // Seleciona os itens individuais do slider

        /**
         * Calcula o índice máximo baseado no número de itens por slide
         * @returns {number} - Índice máximo
         */
        function calculateMaxIndex() {
            var itemsPerSlide = $(window).width() < 768 ? 1 : 3; // Define itens por slide com base na largura da janela
            return Math.ceil(elSingle.length / itemsPerSlide) - 1;
        }

        /**
         * Configura o slider para diferentes tamanhos de janela
         */
        function setupSlider() {
            var itemsPerSlide;

            // Define o número de itens por slide com base na largura da janela
            if ($(window).width() <= 580) {
                itemsPerSlide = 1;
            } else if ($(window).width() <= 768) {
                itemsPerSlide = 2;
            } else {
                itemsPerSlide = 3;
            }

            var amt = elSingle.length * (100 / itemsPerSlide); // Calcula a largura total do slider
            $(sliderClass + ' .nav-galeria .row').css('width', (amt + '%')); // Ajusta a largura do container
            elSingle.css('width', (100 / elSingle.length) + '%'); // Ajusta a largura dos itens individuais

            // Função para ajustar a largura dos cartões individualmente
            function ajustCard() {
                var contentProfessionals = $(sliderClass + ' .nav-galeria');
                var singleCard = $(sliderClass + ' .nav-galeria .col-md-4');

                if(contentProfessionals.width() <= 455) {
                    singleCard.css('width', 'calc(100%)');
                } else if(contentProfessionals.width() <= 768) {
                    singleCard.css('width', 'calc(50% - 25px)');
                } else {
                    singleCard.css('width', 'calc(33.33% - 25px)');
                }
            }
            
            ajustCard();
            $(window).resize(function() {
                ajustCard();
            });
        }

        /**
         * Atualiza a posição do slider baseado no índice atual
         */
        function updateSlider() {
            var itemsPerSlide;
            if ($(window).width() <= 580) {
                itemsPerSlide = 1;
            } else if ($(window).width() <= 768) {
                itemsPerSlide = 2;
            } else {
                itemsPerSlide = 3;
            } 
            
            var elOff = $(sliderClass + ' .nav-galeria .col-md-4').eq(curIndex * itemsPerSlide)
                .offset().left - $(sliderClass + ' .nav-galeria > .row').offset().left; 
            
            $(sliderClass + ' .nav-galeria').animate({ 
                'scrollLeft': elOff + -20 + 'px'
            });
        }

        /**
         * Navega entre os slides
         */
        function navigateSlider() {
            var maxIndex = calculateMaxIndex(); // Calcula o índice máximo

            $(sliderClass + ' .arrow-right-nav').click(function() { 
                if (curIndex < maxIndex) {
                    curIndex++; // Incrementa o índice atual
                    updateSlider(); // Atualiza o slider
                } else {
                    console.log("We reached the end");
                }
            });

            $(sliderClass + ' .arrow-left-nav').click(function() { 
                if (curIndex > 0) {
                    curIndex--; // Decrementa o índice atual
                    updateSlider(); // Atualiza o slider
                } else {
                    console.log("We reached the beginning");
                }
            });
        }

        $(window).resize(function() { 
            curIndex = 0; // Reseta o índice atual
            setupSlider(); // Reconfigura o slider
            updateSlider(); // Atualiza o slider
        });

        setupSlider(); // Configura o slider inicialmente
        navigateSlider(); // Adiciona funcionalidade de navegação
    }

    // Funções para inicializar sliders específicos
    function professionalSlider() {
        initSlider('.professionals');
    }

    function serviceSlider() {
        initSlider('.services');
    }

    function productSlider() {
        initSlider('.products');
    }
    
    // Inicializa todos os sliders
    professionalSlider();
    serviceSlider();
    productSlider();
});
