import "../scss/main.scss"

import "/node_modules/locomotive-scroll/dist/locomotive-scroll.css"

import './bgcanvas'

import LocomotiveScroll from 'locomotive-scroll';

window.scroll1 = new LocomotiveScroll({
    el: document.querySelector(".container-fluid"),//.querySelector('[data-scroll-container]'),
    smooth: true,
    //direction: "horizontal"
});
