//CONVERT FROM IMG TAG TO SVG
const convertImages = (query, callback) => {
    const images = document.querySelectorAll(query);
    images.forEach(image => {
        fetch(image.src)
            .then(res => res.text())
            .then(data => {
                const parser = new DOMParser();
                const svg = parser.parseFromString(data, 'image/svg+xml').querySelector('svg');

                if (image.id) svg.id = image.id;
                if (image.className) svg.classList = image.classList;

                image.parentNode.replaceChild(svg, image);
            })
            .then(callback)
            .catch(error => console.error(error))
    });
}
convertImages('.svg');
$(document).ready(function () {
    $('.mainSlider').slick({
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        dots: false
    });
    $('.header')
        .mouseenter(function () {
            $(this).addClass('active')
            $('.topBar').css('background', '#F7F7F7')
        })
        .mouseleave(function () {
            $(this).removeClass('active')
            $('.topBar').removeAttr('style')
        })
    $(".search").click(function (e) {
        e.stopPropagation();
        $(this).toggleClass('active')
        const header = $(".header")
        const hasClass = $(this).hasClass('active')
        if (hasClass) {
            header.css('height', 122)
        } else {
            header.css('height', 'inherit')
        }
        $(".header-top__search").toggle(hasClass)
    });
    $(document).on('click',function (e) {
        const el = '.header';
        if ($(e.target).closest(el).length) return;
        $('.search').removeClass('active')
        $('.header').removeClass('active')
        $('.header').removeAttr('style')
        $(".header-top__search").removeAttr('style')
    });

    $('.wrap__item h5').on('click', function() {
        $(this).parent().toggleClass('active')
    });
});