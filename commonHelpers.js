import{i as u,a as $,S as k}from"./assets/vendor-5401a4b0.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function d(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(e){if(e.ep)return;e.ep=!0;const o=d(e);fetch(e.href,o)}})();document.addEventListener("DOMContentLoaded",function(){const f=document.getElementById("container"),s=document.getElementById("container-loader");let d,l=[],e=1,o;p(s);const c=document.getElementById("formSearching"),a=document.createElement("button"),h=document.getElementById("inputSearch"),y=document.getElementById("gallery");a.textContent="Load more",a.classList.add("load-more-btn"),a.id="load-more";const b="42167626-5dd4d1124df4d491f669cdb42";c.addEventListener("submit",function(r){if(r.preventDefault(),l=[],w(s),l.length&&m(),o=h.value.trim(),!o){u.error({title:"Error",message:"The field is not allowed to be empty ",position:"topRight"}),p(s);return}e=1,g()}),a.addEventListener("click",async()=>{e++,await g();const r=document.querySelectorAll(".gallery-item"),n=r[r.length-1].getBoundingClientRect().height*2;window.scrollBy({top:n,behavior:"smooth"})});async function g(){const r="https://pixabay.com/api/",i={key:b,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:e};document.getElementById("gallery-item");try{const n=await $.get(`${r}?${new URLSearchParams(i)}`);if(n.data.hits.length===0){if(u.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),!l.length){y.innerHTML="";return}m();return}d=n.data.totalHits,L(n.data.hits)}catch{u.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"}),m()}finally{p(s)}}function m(){f.removeChild(a)}function v(){s.before(a)}function p(r){r&&(r.style.display="none")}function w(r){r&&(r.style.display="block")}function L(r){const i=l.concat(r),n=i.map(t=>`
        <div class="gallery-item" id="gallery-item">
      <a href="${t.largeImageURL}" data-lightbox="gallery" data-title="Likes: ${t.likes}, Views: ${t.views}, Comments: ${t.comments}, Downloads: ${t.downloads}">
          <img src="${t.webformatURL}" alt="${t.tags}" data-src="${t.largeImageURL}" data-caption="Likes: ${t.likes}, Views: ${t.views}, Comments: ${t.comments}, Downloads: ${t.downloads}">
        </a>
        <div class="image-block">
      <div class="block-item">
        <p class="block-label">Likes:</p>
        <p class="block-value">${t.likes}</p>
      </div>
      <div class="block-item">
        <p class="block-label">Views:</p>
        <p class="block-value">${t.views}</p>
      </div>
      <div class="block-item">
        <p class="block-label">Comments:</p>
        <p class="block-value">${t.comments}</p>
      </div>
      <div class="block-item">
        <p class="block-label">Downloads:</p>
        <p class="block-value">${t.downloads}</p>
      </div>
    </div>
    </div>
      `);y.innerHTML=n.join(""),l=i,i.length===d?(document.getElementById("load-more")&&m(),u.error({title:"Error",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):v(),new k(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}});
//# sourceMappingURL=commonHelpers.js.map
