window.onload = function() {
    /* stylization of "select" elements */
    let divWrapSelects, selElmnt, a, b, c;
    /* look for any elements with the class "select_wrap": */
    divWrapSelects = document.getElementsByClassName("select_wrap");
    for (let i = 0; i < divWrapSelects.length; i++) {
        selElmnt = divWrapSelects[i].getElementsByTagName("select")[0];
        /* for each element, create a new DIV that will act as the selected item: */
        a = document.createElement("div");
        a.setAttribute("class", "select-selected");
        a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
        divWrapSelects[i].appendChild(a);
        /* for each element, create a new DIV that will contain the option list: */
        b = document.createElement("div");
        b.setAttribute("class", "select-items select-hide");
        for (let j = 0; j < selElmnt.length; j++) {
            /* for each option in the original select element, create a new DIV that will act as an option item: */
            c = document.createElement("div");
            c.innerHTML = selElmnt.options[j].innerHTML;
            // added a class atribute to hide the first "option" of the "select" element
            if ( j == selElmnt.selectedIndex ) {
                c.setAttribute("class", "select-hide");
            }
            c.addEventListener("click", function() {
                /* when an item is clicked, update the original select box, and the selected item: */
                let y, s, h, tarrifInput;
                s = this.parentElement.parentElement.getElementsByTagName("select")[0];
                // div element with class name "select-selected"
                h = this.parentElement.previousSibling;
                for (let i = 0; i < s.length; i++) {
                    if (s.options[i].innerHTML == this.innerHTML) {
                        s.selectedIndex = i;
                        h.innerHTML = this.innerHTML;
                        y = this.parentElement.getElementsByClassName("select-hide");
                        for (let k = 0; k < y.length; k++) {
                            y[k].removeAttribute("class");
                        }
                        this.setAttribute("class", "same-as-selected select-hide");
                        break;
                    }
                }
                h.click();
            });
            b.appendChild(c);
        }
        divWrapSelects[i].appendChild(b);

        a.addEventListener("click", function(e) {
            /* when the select box is clicked, close any other select boxes, and open/close the current select box: */
            e.stopPropagation();
            closeAllSelect(this);
            this.nextSibling.classList.toggle("select-hide");
            this.classList.toggle("select-arrow-active");
        });
    }

    function closeAllSelect(elmnt) {
        /* a function that will close all select boxes in the document, except the current select box: */
        let x, y, arrNo = [];
        x = document.getElementsByClassName("select-items");
        y = document.getElementsByClassName("select-selected");
        for (let i = 0; i < y.length; i++) {
            if (elmnt == y[i]) {
                arrNo.push(i);
            } else {
                y[i].classList.remove("select-arrow-active");
            }
        }
        for (let i = 0; i < x.length; i++) {
            if (arrNo.indexOf(i)) {
                x[i].classList.add("select-hide");
            }
        }
    }
    /* if the user clicks anywhere outside the select box, then close all select boxes: */
    document.addEventListener("click", closeAllSelect);


// GLOBAL
    // PreventDefault for empty links
    const links = document.querySelectorAll('a[href="#"]');
    for (const link of links) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    }


// HEADER
    // To displays the flag image in the languages switch item (in "header" element)
    let langSelect = document.getElementById('language');
    if (langSelect) {
        let langSelectWrap = langSelect.parentElement,
            selectSelected = langSelectWrap.querySelector('.select-selected'),
            selectItemDivs = langSelectWrap.querySelectorAll('.select-items div')
            langClassNames = ['ua', 'uk', 'ru'];

        selectSelected.classList.add(langClassNames[langSelect.selectedIndex]);
        for (let i = 0; i < selectItemDivs.length; i++) {
            selectItemDivs[i].addEventListener('click', function() {
                selectSelected.classList.remove(selectSelected.classList[1]);
                selectSelected.classList.add(langClassNames[i]);
            });
        }
    }


// MENU, Services Menu
    // Disable scrolling when opening the menu and a screen width <= 1024px
    document.addEventListener('click', function(e) {
        let menuCheckbox    = document.querySelector('#menu_checkbox'),
            consultCheckbox = document.querySelector('#consultation_checkbox');

        if (menuCheckbox.checked && document.documentElement.clientWidth <= 1024 ||
            consultCheckbox.checked && document.documentElement.clientWidth <= 1024) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'visible';
        }
    });


// HOMEPAGE
	// Slick slider settings
    if ($('.banner_slider')) {
        $('.banner_slider').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            fade: true,
            speed: 2000,
        });
    }

    // To display the number of slides of slider (on the homepage)
    const $status = $('.slide_count');
    const $slickElement = $('.responses_slider');
    const slidesTo = 3;

    $slickElement.on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
        
        if(Math.max(document.body.clientWidth, document.documentElement.clientWidth) > 480) {
            let i = currentSlide ? currentSlide : 1;
            $status.text(Math.round(i / slidesTo + 1) + '/' + (slick.$dots[0].children.length))
        } else {
            let i = currentSlide ? (currentSlide + 1) : 1;
            $status.text(i + '/' + slick.slideCount)
        }
    });
    
    if ($('.responses_slider')) {
        $('.responses_slider').slick({
            slide: '.responses_slide',
            infinite: true,
            slidesToShow: slidesTo,
            slidesToScroll: slidesTo,
            dots: true,
            responsive: [
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: false
                    }
                }
            ]
        });
    }


// PRICE page
    var scroll = new SmoothScroll('a[href*="#"]');

    // Sets "aside link" class name "active" (price page)
    let price = document.querySelector('.price');
    if (price) {
        let priceItems = price.querySelectorAll('.price_content_item'),
            asideLinks = price.querySelectorAll('.aside_link');
        document.addEventListener('scroll', function() {
            for (let i = 0; i < priceItems.length; i++) {
                if (priceItems[i].getBoundingClientRect().top.toFixed() < document.documentElement.clientHeight/2 
                    && priceItems[i].getBoundingClientRect().bottom.toFixed() > document.documentElement.clientHeight/2) {
                    asideLinks[i].classList.add('active');
                } else {
                    asideLinks[i].classList.remove('active');
                }
            }
        });
    }


// FAQ page
    let faqDescription          = document.querySelectorAll('.faq__content_description_item'),
        faqDescriptionTitle     = document.querySelectorAll('.faq__content_description_title'),
        faqDescriptionBottom    = document.querySelectorAll('.faq__content_description_bottom'),
        faqDescriptionParagraph = document.querySelectorAll('.faq__content_description_paragraph');

    if (faqDescription) {
        document.addEventListener('click', function(e) {
            for (let i = 0; i < faqDescription.length; i++) {
                if (e.target == faqDescriptionTitle[i]) {
                    faqDescription[i].classList.add('js_description_open');
                    faqDescriptionBottom[i].style.height = `${faqDescriptionParagraph[i].offsetHeight}px`;
                } else {
                    faqDescription[i].classList.remove('js_description_open');
                    faqDescriptionBottom[i].style.height = '0px';
                }
            }
        });
    }


// SEPARATE NEWS
	// Slick slider settings
    if ($('.separate_news__content_comments_list')) {
        $('.separate_news__content_comments_list').slick({
            swipe: true,
            dots: true,
            arrows: false,
            dotsClass: 'separate_news__content_comments_pagination',
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 2,
            cssEase: 'linear',
            adaptiveHeight: true,
            responsive: [
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false,
                        dots: false
                    }
                }
            ]
        });
    }
};