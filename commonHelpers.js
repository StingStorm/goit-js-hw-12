import{a as v,S,i as c}from"./assets/vendor-c493984e.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();function q(){let t=1;const s=16;async function o(e){const r=new URLSearchParams({key:"44842729-8004d444f82c9829d0058eeb4",q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:s}),n=await v.get(`https://pixabay.com/api/?${r}`);t++;const{hits:g,totalHits:p}=n.data;return{hits:g,totalHits:p,nextPageNumber:t}}function a(){t=1}return{fetchingGalleryPage:o,resetNextPageNum:a,hitsPerPage:s}}function m(t,s){let o="";t.forEach(({webformatURL:a,largeImageURL:e,tags:r,likes:n,views:g,comments:p,downloads:b})=>{o+=`<li class="gallery-item">
  <a class="gallery-item__link" href="${e}">
  <img
  src="${a}"
  alt="${r}"
  /></a>
  <ul class="image-descr">
  <li>
    <span>Likes</span>
    <span>${n}</span>
  </li>
  <li>
    <span>Views</span>
    <span>${g}</span>
  </li>
  <li>
    <span>Comments</span>
    <span>${p}</span>
  </li>
  <li>
    <span>Downloads</span>
    <span>${b}</span>
  </li>
</ul>
</li>`}),s.insertAdjacentHTML("beforeend",o)}const f=document.querySelector(".search-form"),u=document.querySelector(".gallery"),d=document.querySelector("button[data-load]"),{fetchingGalleryPage:h,resetNextPageNum:x,hitsPerPage:M}=q();let l="";const y=new S(".gallery a",{captionsData:"alt",captionDelay:250});f.addEventListener("submit",async t=>{if(t.preventDefault(),l=t.target.elements.requestValue.value.trim(),!!l){x(),N(),L(f),w();try{const{hits:s}=await h(l);if(!s.length){c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),i();return}setTimeout(()=>{m(s,u),y.refresh(),i(),P()},1e3)}catch(s){console.error(s),c.error({message:"Ooops! Something went wrong. Try again later",position:"topRight"}),i()}f.reset()}});d.addEventListener("click",async()=>{L(u),w();try{const{hits:t,totalHits:s,nextPageNumber:o}=await h(l),a=o-1,e=Math.ceil(s/M);if(a>e){c.error({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),i();return}const{height:r}=document.querySelector(".gallery-item").getBoundingClientRect();setTimeout(()=>{i(),m(t,u),y.refresh(),P(),window.scrollBy(0,r*2)},500)}catch(t){console.error(t),c.error({message:"Ooops! Something went wrong. Try again later",position:"topRight"}),i()}});function L(t){t.insertAdjacentHTML("afterend","<span class='loader'></span>")}function i(t=document.querySelector(".loader")){t&&t.remove()}function P(){d.classList.contains("visually-hidden")&&d.classList.remove("visually-hidden")}function w(){d.classList.add("visually-hidden")}function N(){u.innerHTML=""}
//# sourceMappingURL=commonHelpers.js.map
