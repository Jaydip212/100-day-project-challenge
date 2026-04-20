document.addEventListener('DOMContentLoaded', () => {

    // 1. Initialize the Background Particle Animation
    tsParticles.load("particles-js", {
        background: {
            color: {
                value: "#fff9c4" // A light yellow background color
            },
            image: "linear-gradient(to bottom right, #fffde7, #ffecb3)" // Gradient behind particles
        },
        fpsLimit: 60,
        particles: {
            number: {
                value: 20, // किती अक्षरं दिसायला हवीत (कमी-जास्त करू शकता)
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: ["#f57c00", "#ffb300", "#e65100"] // केशरी आणि सोनेरी रंगाची अक्षरं
            },
            shape: {
                type: "text", // आपल्याला अक्षरं हवी आहेत
                options: {
                    text: {
                        value: ["ॐ", "श्री", "∗"], // ही अक्षरं दिसतील
                        font: "Noto Sans Marathi",
                        weight: "700"
                    }
                }
            },
            opacity: {
                value: { min: 0.2, max: 0.6 }, // अक्षरं कमी-जास्त दिसतील
                animation: {
                    enable: true,
                    speed: 1,
                    minimumValue: 0.1,
                    sync: false
                }
            },
            size: {
                value: { min: 16, max: 32 } // अक्षरांचा आकार
            },
            move: {
                enable: true,
                speed: 1, // तरंगण्याचा वेग
                direction: "top", // वरच्या दिशेने तरंगतील
                straight: false, // थोडेसे इकडे-तिकडे हलतील
                outModes: {
                    default: "out" // स्क्रीनच्या बाहेर गेल्यावर नाहीसे होतील
                }
            }
        },
        interactivity: {
            events: {
                onHover: {
                    enable: false // माउस नेल्यावर काही होणार नाही (साधेपणासाठी)
                },
                onClick: {
                    enable: false
                }
            }
        },
        detectRetina: true
    });


    // 2. Initialize the On-Scroll Animation (AOS)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

});