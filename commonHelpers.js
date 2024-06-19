import{a as g,i as f,S as L}from"./assets/vendor-53a1b719.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function o(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(t){if(t.ep)return;t.ep=!0;const s=o(t);fetch(t.href,s)}})();const n={form:document.querySelector("#search-form"),galleryContainer:document.querySelector(".gallery"),btnLoadMore:document.querySelector(".js-load"),guardScroll:document.querySelector(".js-guard")},S="36805938-0e5858f236185e483726e7849";g.defaults.baseURL="https://pixabay.com/api/";const C={key:S,image_type:"photo",orientation:"horizontal",safesearch:!0},h=async(e,r=1,o)=>{if(e){const{data:i}=await g({method:"GET",params:{...C,q:e,per_page:o,page:r}});return i}},u={position:"topRight",timeout:3500},y=e=>f.success({...u,message:e}),I=e=>f.info({...u,message:e}),E=e=>f.error({...u,title:"Opps!",message:e}),v=(e,r)=>{e.insertAdjacentHTML("beforeend",M(r))};function M(e){return e.map(({largeImageURL:r,webformatURL:o,tags:i,likes:t,views:s,comments:c,downloads:w})=>`
    <a class="link" href="${r}">
        <div class="photo-card">
        <div class="img-link">
            <img class="item-img" src="${o}" alt="${i}" loading="lazy" />
        </div>
        <div class="info">
            <div class="info-item-wrap">
                <p class="info-item">
                    <b>Likes</b>
                </p>
                <p>
                ${t}
                </p>
            </div>
            <div class="info-item-wrap">
                <p class="info-item">
                    <b>Views</b>
                </p>

                <p>
                    ${s}
                </p>
            </div>
            <div class="info-item-wrap">
                <p class="info-item">
                    <b>Comments</b>
                </p>
                <p>
                    ${c}
                </p>
            </div>
            <div class="info-item-wrap">
                <p class="info-item">
                    <b>Downloads</b>
                </p>
                <p>
                    ${w}
                </p>
            </div>
        </div>
    </div>
    </a>
`).join("")}const O=()=>{if(n.galleryContainer.firstElementChild){const{height:e}=n.galleryContainer.firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})}else window.scrollTo(0,0)},d=40;let a=1,l="",P={root:null,rootMargin:"300px"};const m=new IntersectionObserver(q,P),b=new L(".gallery a",{captionsData:"alt",captionDelay:350}),$=async e=>{e.preventDefault();const r=e.target.elements[0].value.trim().toLowerCase();try{if(H(r)){p();const{total:o,totalHits:i,hits:t}=await h(r,a,d);if(!o){I("Sorry, there are no images matching your search query. Please try again.");return}v(n.galleryContainer,t),T(i),b.refresh(),y(`Hooray! We found ${i} images.`)}}catch(o){p(),n.form.reset(),E(o.message?o.message:o)}};async function q(e){e.forEach(async r=>{if(r.isIntersecting){a++,O();const o=await h(l,a,d);v(n.galleryContainer,o.hits),b.refresh();const i=Math.ceil(o.totalHits/d);a>=i&&(m.unobserve(n.guardScroll),y("We're sorry, but you've reached the end of search results."))}})}function H(e){if(l&&e&&l===e)return!1;if(e)return l=e,!0;throw new Error("Invalid data")}function T(e){const r=Math.ceil(e/d);a<r&&m.observe(n.guardScroll)}function p(){n.galleryContainer.innerHTML="",m.unobserve(n.guardScroll),a=1}n.form.addEventListener("submit",$);
//# sourceMappingURL=commonHelpers.js.map
