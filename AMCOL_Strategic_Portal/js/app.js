(function(){
  "use strict";
  var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var views={},links=[].slice.call(document.querySelectorAll(".navlink"));
  var loadedAssets={};
  document.querySelectorAll(".view").forEach(function(view){views[view.id.replace("v-","")]=view;});
  function preloadView(name){
    if(loadedAssets[name])return;
    loadedAssets[name]=true;
    document.querySelectorAll('img[data-preload-view="'+name+'"]').forEach(function(image){
      var preload=new Image(); preload.src=image.currentSrc||image.src;
    });
  }
  function activate(name){
    if(!views[name])return;
    window.scrollTo(0,0);
    Object.keys(views).forEach(function(key){views[key].classList.toggle("active",key===name);});
    links.forEach(function(link){link.classList.toggle("active",link.dataset.view===name);});
    runCounts(views[name]);
    var currentIndex=links.findIndex(function(link){return link.dataset.view===name;});
    var next=links[(currentIndex+1)%links.length];
    if(next)preloadView(next.dataset.view);
  }
  document.addEventListener("click",function(event){
    var accordionHead=event.target.closest("[data-accordion]");
    if(accordionHead){
      var item=accordionHead.closest(".accordion-item"),group=accordionHead.closest(".service-list");
      var wasOpen=item.classList.contains("open");
      if(group)group.querySelectorAll(".accordion-item.open").forEach(function(open){open.classList.remove("open");});
      if(!wasOpen)item.classList.add("open");
      return;
    }
    var target=event.target.closest("[data-view],[data-goto]");
    if(!target)return;
    event.preventDefault();
    activate(target.dataset.view||target.dataset.goto);
    if(target.dataset.scrollTarget){
      var destination=document.getElementById(target.dataset.scrollTarget);
      if(destination)requestAnimationFrame(function(){destination.scrollIntoView({block:"start",behavior:"auto"});});
    }
  });
  function runCounts(scope){
    scope.querySelectorAll("[data-count]").forEach(function(el){
      if(el.dataset.counted)return;
      el.dataset.counted="true";
      var end=Number(el.dataset.count),suffix=el.dataset.suffix||"";
      if(reduce){el.textContent=end+suffix;return;}
      var start, duration=750;
      function frame(time){if(!start)start=time;var p=Math.min((time-start)/duration,1);el.textContent=Math.round(end*(1-Math.pow(1-p,3)))+suffix;if(p<1)requestAnimationFrame(frame);}
      requestAnimationFrame(frame);
    });
  }
  runCounts(views.overview);
  preloadView("products");
  if(!reduce&&"IntersectionObserver" in window){
    var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add("revealed");observer.unobserve(entry.target);}});},{threshold:.12});
    document.querySelectorAll(".reveal").forEach(function(item){observer.observe(item);});
  }else{document.querySelectorAll(".reveal").forEach(function(item){item.classList.add("revealed");});}
})();
