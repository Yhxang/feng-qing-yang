import "../scss/main.scss"
import "animate.css"

import "/node_modules/locomotive-scroll/dist/locomotive-scroll.css"

import bgcanvas from './bgcanvas'

import LocomotiveScroll from 'locomotive-scroll';

//
window.onload = function () {
    document.querySelector(".p0-linebg-wrapper").appendChild(bgcanvas.app.view);
    window.scroll1 = new LocomotiveScroll({
        el: document,//.querySelector(".container-fluid"),//.querySelector('[data-scroll-container]'),
        smooth: true,
        //direction: "horizontal"
    });
}

