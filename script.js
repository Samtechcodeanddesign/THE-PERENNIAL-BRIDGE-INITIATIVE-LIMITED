/* =========================================================
   THE PERENNIAL BRIDGE INITIATIVE
   MAIN WEBSITE JAVASCRIPT
   ========================================================= */

"use strict";


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const preloader = document.getElementById("preloader");
    const siteHeader = document.getElementById("siteHeader");

    const mobileMenuButton =
        document.getElementById("mobileMenuButton");

    const mainNavigation =
        document.getElementById("mainNavigation");

    const informationForm =
        document.getElementById("informationForm");

    const formMessage =
        document.getElementById("formMessage");

    const shareButton =
        document.getElementById("shareButton");

    const currentYear =
        document.getElementById("currentYear");

    const backToTop =
        document.getElementById("backToTop");


    /* =====================================================
       PRELOADER
       ===================================================== */

    const hidePreloader = () => {

        if (!preloader) {
            return;
        }

        preloader.classList.add("hidden");

        setTimeout(() => {
            preloader.style.display = "none";
        }, 750);
    };

    window.addEventListener("load", hidePreloader);

    /* Fallback in case the load event has already fired */
    setTimeout(hidePreloader, 2500);


    /* =====================================================
       HEADER SCROLL EFFECT
       ===================================================== */

    const handleHeaderScroll = () => {

        if (!siteHeader) {
            return;
        }

        if (window.scrollY > 40) {
            siteHeader.classList.add("scrolled");
        } else {
            siteHeader.classList.remove("scrolled");
        }
    };

    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );

    handleHeaderScroll();


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const closeMobileMenu = () => {

        if (!mobileMenuButton || !mainNavigation) {
            return;
        }

        mobileMenuButton.classList.remove("active");
        mainNavigation.classList.remove("active");

        document.body.classList.remove("menu-open");

        mobileMenuButton.setAttribute(
            "aria-expanded",
            "false"
        );
    };


    const openMobileMenu = () => {

        if (!mobileMenuButton || !mainNavigation) {
            return;
        }

        mobileMenuButton.classList.add("active");
        mainNavigation.classList.add("active");

        document.body.classList.add("menu-open");

        mobileMenuButton.setAttribute(
            "aria-expanded",
            "true"
        );
    };


    if (mobileMenuButton && mainNavigation) {

        mobileMenuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        mobileMenuButton.addEventListener(
            "click",
            () => {

                const isOpen =
                    mainNavigation.classList.contains("active");

                if (isOpen) {
                    closeMobileMenu();
                } else {
                    openMobileMenu();
                }
            }
        );


        /* Close menu when clicking navigation links */

        const navigationLinks =
            mainNavigation.querySelectorAll("a");

        navigationLinks.forEach((link) => {

            link.addEventListener(
                "click",
                () => {
                    closeMobileMenu();
                }
            );

        });


        /* Close menu with Escape key */

        document.addEventListener(
            "keydown",
            (event) => {

                if (event.key === "Escape") {
                    closeMobileMenu();
                }

            }
        );

    }


    /* =====================================================
       SCROLL REVEAL ANIMATION
       ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });

    } else {

        /* Fallback for older browsers */

        revealElements.forEach((element) => {
            element.classList.add("visible");
        });

    }


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    if (currentYear) {
        currentYear.textContent =
            new Date().getFullYear();
    }


    /* =====================================================
       BACK TO TOP
       ===================================================== */

    const handleBackToTop = () => {

        if (!backToTop) {
            return;
        }

        if (window.scrollY > 600) {
            backToTop.classList.add("visible");
        } else {
            backToTop.classList.remove("visible");
        }
    };

    window.addEventListener(
        "scroll",
        handleBackToTop,
        { passive: true }
    );

    handleBackToTop();


    if (backToTop) {

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       INFORMATION PACKAGE FORM
       ===================================================== */

    if (informationForm) {

        informationForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                const emailInput =
                    informationForm.querySelector(
                        'input[type="email"]'
                    );

                if (!emailInput) {
                    return;
                }

                const email =
                    emailInput.value.trim();

                if (!email) {

                    if (formMessage) {
                        formMessage.textContent =
                            "Please enter your email address.";
                    }

                    emailInput.focus();

                    return;
                }


                /* Basic email validation */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailPattern.test(email)) {

                    if (formMessage) {
                        formMessage.textContent =
                            "Please enter a valid email address.";
                    }

                    emailInput.focus();

                    return;
                }


                /*
                 * Front-end confirmation.
                 *
                 * No email service/backend has been connected yet,
                 * so this does not pretend to send an actual email.
                 */

                if (formMessage) {

                    formMessage.textContent =
                        "Thank you. Your request has been received. The information package delivery service will be connected here.";

                }


                emailInput.value = "";


                /*
                 * Store the request locally so the site can
                 * remember that the visitor submitted the form.
                 */

                try {

                    localStorage.setItem(
                        "perennialBridgeInformationRequest",
                        JSON.stringify({
                            email: email,
                            submittedAt:
                                new Date().toISOString()
                        })
                    );

                } catch (error) {

                    /* Ignore localStorage errors */

                }

            }
        );

    }


    /* =====================================================
       SHARE BUTTON
       ===================================================== */

    if (shareButton) {

        shareButton.addEventListener(
            "click",
            async () => {

                const shareData = {
                    title:
                        "The Perennial Bridge Initiative",

                    text:
                        "Explore The Perennial Bridge Initiative — an interfaith ordination programme focused on spiritual formation, the Mature Gospel, and ministry.",

                    url:
                        window.location.href
                };


                /* -----------------------------------------
                   NATIVE SHARE
                   ----------------------------------------- */

                if (
                    navigator.share &&
                    typeof navigator.share === "function"
                ) {

                    try {

                        await navigator.share(
                            shareData
                        );

                        return;

                    } catch (error) {

                        /*
                         * User may simply have cancelled
                         * the native share window.
                         */

                        if (
                            error &&
                            error.name ===
                            "AbortError"
                        ) {
                            return;
                        }

                    }

                }


                /* -----------------------------------------
                   CLIPBOARD FALLBACK
                   ----------------------------------------- */

                try {

                    if (
                        navigator.clipboard &&
                        typeof navigator.clipboard.writeText ===
                        "function"
                    ) {

                        await navigator.clipboard.writeText(
                            window.location.href
                        );

                        showTemporaryShareMessage(
                            "Link copied"
                        );

                        return;
                    }

                } catch (error) {

                    /* Continue to fallback */

                }


                /* -----------------------------------------
                   OLD BROWSER FALLBACK
                   ----------------------------------------- */

                const temporaryInput =
                    document.createElement("input");

                temporaryInput.value =
                    window.location.href;

                temporaryInput.style.position =
                    "fixed";

                temporaryInput.style.opacity =
                    "0";

                document.body.appendChild(
                    temporaryInput
                );

                temporaryInput.select();

                try {

                    document.execCommand("copy");

                    showTemporaryShareMessage(
                        "Link copied"
                    );

                } catch (error) {

                    showTemporaryShareMessage(
                        "Copy the page link from your browser"
                    );

                }

                document.body.removeChild(
                    temporaryInput
                );

            }
        );

    }


    /* =====================================================
       SHARE BUTTON MESSAGE
       ===================================================== */

    function showTemporaryShareMessage(message) {

        if (!shareButton) {
            return;
        }

        const originalHTML =
            shareButton.innerHTML;

        shareButton.innerHTML =
            `<i class="fa-solid fa-check"></i> ${message}`;

        shareButton.disabled = true;

        setTimeout(() => {

            shareButton.innerHTML =
                originalHTML;

            shareButton.disabled = false;

        }, 2200);

    }


    /* =====================================================
       SMOOTH INTERNAL NAVIGATION
       ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    internalLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetID =
                    link.getAttribute("href");

                if (
                    !targetID ||
                    targetID === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetID);

                if (!target) {
                    return;
                }

                event.preventDefault();

                const headerHeight =
                    siteHeader
                        ? siteHeader.offsetHeight
                        : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            }
        );

    });


    /* =====================================================
       RESIZE HANDLING
       ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            /*
             * If the screen becomes large again,
             * make sure the mobile menu is reset.
             */

            if (
                window.innerWidth > 850
            ) {
                closeMobileMenu();
            }

        }
    );


    /* =====================================================
       FORM INPUT CLEANUP
       ===================================================== */

    if (informationForm) {

        const emailInput =
            informationForm.querySelector(
                'input[type="email"]'
            );

        if (emailInput && formMessage) {

            emailInput.addEventListener(
                "input",
                () => {

                    if (
                        formMessage.textContent
                    ) {
                        formMessage.textContent =
                            "";
                    }

                }
            );

        }

    }

});