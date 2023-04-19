/*IMPORTING THE FOOTER*/
import {footer} from "../components/footer.js"
import navbar from "../components/header.js";
let div3 = document.querySelector(".header");
div3.innerHTML = navbar();
document.addEventListener('DOMContentLoaded', () => {
    
    const Big_screen_sreachbar=document.getElementById("search_bar");
    const small_screen_sreachbar=document.querySelector(".input-box");
    Big_screen_sreachbar.style.display="none"
    small_screen_sreachbar.style.display="none"
})
// console.log(footer())

const footerdiv=document.querySelector(".footer");
footerdiv.innerHTML = footer()



// import navbar from "../components/index1.js"
// let div3 = document.getElementById("navbar");
// div3.innerHTML = navbar();

fetch("./json/home.json")
    .then(response => response.json())
    .then(data => {
        musthaveinyourwardrobe(data.musthaveinyourwardrobe);
        budgetbuysappend(data.budgetbuys);
        bestofclothingappend(data.bestofclothing);
        bestofinnerwearappend(data.bestofinnerwear);
        bestoffootwearappend(data.bestoffootwear);
        bestofkidwearappend(data.bestofkidwear);
        bestofbeautyappend(data.bestofbeauty);
        bestofacessoriesappend(data.bestofaccessories);
        bestofhomefurnishingappend(data.bestofhomefurnishing);
        shopbycategoryappend(data.shopbycategory);
    })


function musthaveinyourwardrobe(data){
    let mustdiv = document.getElementById("mustdiv");
    data.forEach(el => {
        let card = document.createElement("div");
        let img = document.createElement("img");
        img.classList.add("fullwidth")
        img.src = el.link
        // img.addEventListener("click",()=>{
        //     window.location.href="product.html"
        // })

        card.append(img);
        mustdiv.append(card);
    });
}

function budgetbuysappend(data){
    let budgetdiv = document.getElementById("budgetdiv");
    data.forEach(el => {
        let card = document.createElement("div");
        let img = document.createElement("img");
        img.classList.add("fullwidth")
        img.src = el.link
        // img.addEventListener("click",()=>{
        //     window.location.href="product.html"
        // })

        card.append(img);
        budgetdiv.append(card); 
    });
}

function bestofclothingappend(data){
    let bestclothing = document.getElementById("bestclothing");
    data.forEach(el => {
        let card = document.createElement("div");
        let img = document.createElement("img");
        img.classList.add("fullwidth")
        img.src = el.link
        // img.addEventListener("click",()=>{
        //     window.location.href="product.html"
        // })

        card.append(img);
        bestclothing.append(card); 
    });
}

function bestofinnerwearappend(data){
    let bestinnerwear = document.getElementById("bestinnerwear");
    data.forEach(el => {
        let card = document.createElement("div");
        let img = document.createElement("img");
        img.classList.add("fullwidth")
        img.src = el.link;
        // img.addEventListener("click",()=>{
        //     window.location.href="product.html"
        // })

        card.append(img);
        bestinnerwear.append(card); 
    });
}

function bestoffootwearappend(data){
    let bestfootwear = document.getElementById("bestfootwear");
    data.forEach(el => {
        let card = document.createElement("div");
        let img = document.createElement("img");
        img.classList.add("fullwidth")
        img.src = el.link
        // img.addEventListener("click",()=>{
        //     window.location.href="product.html"
        // })

        card.append(img);
        bestfootwear.append(card); 
    });
}

function bestofkidwearappend(data){
    let bestkids = document.getElementById("bestkids");
    data.forEach(el => {
        let card = document.createElement("div");
        let img = document.createElement("img");
        img.classList.add("fullwidth")
        img.src = el.link
        // img.addEventListener("click",()=>{
        //     window.location.href="product.html"
        // })

        card.append(img);
        bestkids.append(card); 
    });
}

function bestofbeautyappend(data){
    let bestbeauty = document.getElementById("bestbeauty");
    data.forEach(el => {
        let card = document.createElement("div");
        let img = document.createElement("img");
        img.classList.add("fullwidth")
        img.src = el.link
        // img.addEventListener("click",()=>{
        //     window.location.href="product.html"
        // })

        card.append(img);
        bestbeauty.append(card); 
    });
}

function bestofacessoriesappend(data){
    let bestacessories = document.getElementById("bestacessories");
    data.forEach(el => {
        let card = document.createElement("div");
        let img = document.createElement("img");
        img.classList.add("fullwidth")
        img.src = el.link
        // img.addEventListener("click",()=>{
        //     window.location.href="product.html"
        // })
        card.append(img);
        bestacessories.append(card); 
    });
}

function bestofhomefurnishingappend(data){
    let bestfurnishing = document.getElementById("bestfurnishing");
    data.forEach(el => {
        let card = document.createElement("div");
        let img = document.createElement("img");
        img.classList.add("fullwidth")
        img.src = el.link
        // img.addEventListener("click",()=>{
        //     window.location.href="product.html"
        // })
        card.append(img);
        bestfurnishing.append(card); 
    });
}

function shopbycategoryappend(data){
    let shopbycategory = document.getElementById("shopbycategory");
    data.forEach(el => {
        let card = document.createElement("div");
        let img = document.createElement("img");
        img.classList.add("fullwidth","class")
        img.src = el.link
        // img.addEventListener("click",()=>{
        //     window.location.href="product.html"
        // })

        card.append(img);
        shopbycategory.append(card); 
    });
}

/*  singup part  */
