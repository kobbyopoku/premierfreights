// Index of jQuery Active Code

(function ($) {
    'use strict';

    var $window = $(window);
    var zero = 0;

    // :: 1.0 PRELOADER ACTIVE CODE
    $(window).on("load", function () {
        $("#transio-preloader").addClass("loaded");
        $(this).fadeOut('slow');

        if ($("#transio-preloader").hasClass("loaded")) {
            $("#preloader").delay(900).queue(function () {
                $(this).remove();
            });
        }
    });
    
    // :: 2.0 SCROLL LINK ACTIVE CODE
    var scrollLink = $('.scroll');

    scrollLink.on('click', function (e) {
        e.preventDefault();
        $('body,html').animate({
            scrollTop: $(this.hash).offset().top
        }, 1000);
        $(".navbar-collapse").removeClass("show");
        $("body").removeClass("offcanvas-active");
    });

    // :: 3.0 SCROLL TO TOP ACTIVE CODE
    var offset = 300;
    var duration = 500;

    $window.on('scroll', function () {
        if ($(this).scrollTop() > offset) {
            $("#scrollUp").fadeIn(duration);
        } else {
            $("#scrollUp").fadeOut(duration);
        }
    });

    $("#scrollUp").on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, duration);
    });

    // :: 4.0 HEADER ACTIVE CODE
    $(".header-search-wrapper .btn-search").on("click", function() {
        $(this).parent('.header-search-wrapper').toggleClass('open-search');
    });
    $(".header-area .toggle-btn").on("click", function() {
        $(".header-area").toggleClass('active-sidenav');
    });
    $(".sidenav_wrapper .side_navbar .nav-item").each(function(index) {
        $(this).css('--nav-index', index);
    });

    $('.side_navbar .dropdown-link').on("click", function(j) {
        var dropDown = $(this).closest('li').find('.submenu');

        $(this).closest('.side_navbar').find('.submenu').not(dropDown).slideUp();

        if ($(this).hasClass('active-dropdown')) {
            $(this).removeClass('active-dropdown');
        } else {
            $(this).closest('.side_navbar').find('.dropdown-link.active-dropdown').removeClass('active-dropdown');
            $(this).addClass('active-dropdown');
        }

        dropDown.stop(false, true).slideToggle();

        j.preventDefault();
    });

    $(".header-area").append('<span class="header-space">');

     var HeaderHeight = $(".header-area").innerHeight();

    $(".header-area .header-space").css({
        "height": HeaderHeight,
    });

    $(window).on('scroll', HeaderSticky);

    function HeaderSticky() {
        var ScrollTop = $(window).scrollTop();
        if (ScrollTop > 150) {   
            $(".header-area").addClass('sticky');
        } else {
            $(".header-area").removeClass('sticky');
        }
    }
    HeaderSticky();

    // :: 5.0 REVIEWS ACTIVE CODE
    $('.reviews.owl-carousel').owlCarousel({
        items: 1,
        margin: 20,
        nav: false,
        dots: true,
        smartSpeed: 400,
        autoplay: true,
        loop: true,
        mouseDrag: true,
        touchDrag: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            }
        }
    });

    // :: 6.0 HERO SLIDER ACTIVE CODE
    var interleaveOffset = 0.5;
    var HeroSlideImages = new Swiper('.hero-slider-container', {
        loop: false,
        speed: 1200,
        grabCursor: true,
        watchSlidesProgress: true,
        mousewheelControl: true,
        keyboardControl: true,
        parallax: true,
        navigation: {
            nextEl: ".hero-slider-wrapper .next",
            prevEl: ".hero-slider-wrapper .prev"
        },
        pagination: {
            el: '.hero-slider-wrapper .slide-pagination',
            clickable: true,
            renderBullet: function(index, className) {
                return (`<div class="${className}"> 
                    <svg viewBox="0 0 20 20"><circle class="path" cx="10" cy="10" r="5.5" fill="none" transform="rotate(-90 10 10)" stroke-opacity="1" stroke-width="2px"></circle><circle class="solid-fill" cx="10" cy="10" r="3"></circle></svg>
                </div>`);
            }
        },
        on: {
            progress: function() {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    var slideProgress = swiper.slides[i].progress;
                    var innerOffset = swiper.width * interleaveOffset;
                    var innerTranslate = slideProgress * innerOffset;
                    swiper.slides[i].querySelector(".slide-bg").style.transform =
                        "translate3d(" + innerTranslate + "px, 0, 0)";
                }
            },
            touchStart: function() {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = "";
                }
            },
            setTransition: function(speed) {
                var swiper = this;
                for (var i = 0; i < swiper.slides.length; i++) {
                    swiper.slides[i].style.transition = speed + "ms";
                    swiper.slides[i].querySelector(".slide-bg").style.transition =
                        speed + "ms";
                }
            }
        }
    });

    // :: 7.0 PREVENT DEFAULT ACTIVE CODE
    $("a[href='#']").on('click', function ($) {
        $.preventDefault();
    });

    // :: 8.0 COUNTERUP ACTIVE CODE
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });

}(jQuery));