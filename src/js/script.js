"use strict";

const selectElement = el => { return document.querySelector(el); }
const selectElements = el => { return document.querySelectorAll(el); }

/*Our team functional*/

if (window.innerWidth >= 1200) {
    (function choosePerson() {
        const persons = selectElements(".team-person");
        const aboutPerson = selectElements(".team-info-wrapper");

        let arrow = selectElement(".arrow");
        let arrowPos = [7.5, 32.5, 57.5, 83.5];

        for (let i = 0; i < persons.length; i++) {
            persons[i].onclick = () => {
                for (let inform of aboutPerson) {
                    inform.classList.remove("active");
                }
                //Choose correct information for user and move arrow
                aboutPerson[i].classList.add("active");
                arrow.style.left = arrowPos[i] + "%";
            }
        }
    })();
}

//Count effect

(() => {
    const animatedBlock = selectElement(".our-stats");
    const time = 5000;

    let scrolled = true;

    function growNum(elem) {
        let el = selectElement(`#${elem}`);
        let step = +el.getAttribute("data-step");

        let n = 0;
        let num = parseInt(el.innerHTML);

        let t = Math.round(time / (num / step));
        let interval = setInterval(() => {
            n = n + step
            if (n >= num) {
                clearInterval(interval);
            }
            el.innerHTML = `${n}+`;
        }, t);
    }


    /*Start animation when block is show*/

    window.onmousewheel = () => {
        if (window.pageYOffset >= animatedBlock.offsetTop -
            animatedBlock.clientHeight - 200 && scrolled) {
            growNum("compleate");
            growNum("satisfied");
            growNum("feedbacks");
            growNum("released");
            scrolled = false;
        }
    }
})();

//Sliders functional

(() => {
    $('.testimonials-slider').slick({
        dots: true,
        autoplay: false,
        autoplaySpeed: 2000,
        prevArrow: false,
        nextArrow: false
    });


    /*Function to change image in testimonails slider slider*/

    function showImage() {
        const slideImage = selectElements(".slide-image");
        const slickDots = selectElements(".slick-dots li");

        for (let i = 0; i < slickDots.length; i++) {
            if (slickDots[i].classList.contains("slick-active")) {
                for (let j = 0; j < slideImage.length; j++) {
                    slideImage[j].classList.remove("active");
                }
                slideImage[i].classList.add("active");
            }
        }
    }
    setTimeout(function run() {
        showImage();
        setTimeout(run, 200);
    }, 200);
})();

//Change default select if we click get starter

(function changeSelect() {
    let pack = selectElements(".pack");
    let sPack = selectElements(".s-pack");

    for (let i = 0; i < pack.length; i++) {
        pack[i].onclick = () => {
            sPack[i].selected = true;
        }
    }
})();


if (window.innerWidth <= 992) {
    //Portfolio item click service
    (() => {
        let portfolioItem = selectElements(".portfolio-item");

        for (let item of portfolioItem) {
            item.onclick = function () {
                this.classList.add("active");
                setTimeout(() => this.classList.remove("active"), 10000);
            }
        }
    })();

    //Mobile open menu functional

    (() => {
        const navItem = selectElements(".nav-item");
        const openNav = selectElement("#open-nav");
        const nav = selectElement(".nav-panel");

        for (let item of navItem) {
            item.onclick = () => {
                nav.classList.remove("active");
            };
        }
        openNav.onclick = () => nav.classList.toggle("active");
    }
    )();
}

//Change nav panel position when user scroll

window.addEventListener("scroll", () => {
    if (window.innerWidth >= 992) {
        navPosition();
    }
});


function navPosition() {
    const header = selectElement(".header");
    const nav = selectElement(".nav-panel");
    if (window.scrollY >= header.offsetTop + header.clientHeight) {
        nav.classList.add("active");
    }
    else {
        nav.classList.remove("active");
    }
}


//Load more about person functional (for small - large devices)

if (window.innerWidth < 1200) {
    (function loadMore() {
        let moreAboutPerson = selectElements(".more-about-person");
        for (let load of moreAboutPerson) {
            load.onclick = function () {
                this.parentElement.classList.add("active");
                this.remove();
            }
        }
    })();
}

//Scroll show animation

(() => {
    window.sr = ScrollReveal();

    sr.reveal(".animate-left", {
        origin: "left",
        duration: 1000,
        distance: "25rem",
        delay: 400,
    });

    sr.reveal(".animate-right", {
        origin: "",
        duration: 1000,
        distance: "25rem",
        delay: 400,
    });


    sr.reveal(".animate-bottom", {
        origin: "bottom",
        duration: 1000,
        distance: "25rem",
        delay: 400,
    });
}
)();










