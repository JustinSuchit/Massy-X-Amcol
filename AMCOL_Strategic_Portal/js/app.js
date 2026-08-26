(function(){
  "use strict";
  var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var views={},links=[].slice.call(document.querySelectorAll(".navlink"));
  document.querySelectorAll(".view").forEach(function(view){views[view.id.replace("v-","")]=view;});
  function activate(name){
    if(!views[name])return;
    Object.keys(views).forEach(function(key){views[key].classList.toggle("active",key===name);});
    links.forEach(function(link){link.classList.toggle("active",link.dataset.view===name);});
    window.scrollTo({top:0,behavior:reduce?"auto":"smooth"});
    runCounts(views[name]);
  }
  document.addEventListener("click",function(event){
    var target=event.target.closest("[data-view],[data-goto]");
    if(!target)return;
    event.preventDefault();
    activate(target.dataset.view||target.dataset.goto);
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
})();
