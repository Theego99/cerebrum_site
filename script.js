(function(){
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var nEl = document.querySelector('.counter .n');
  var i = 0, n = slides.length;
  function show(idx){
    i = (idx + n) % n;
    slides.forEach(function(s,k){ s.classList.toggle('is-active', k===i); });
    if(nEl) nEl.textContent = i+1;
  }
  var prev = document.querySelector('.prev');
  var next = document.querySelector('.next');
  if(prev) prev.addEventListener('click', function(){ show(i-1); });
  if(next) next.addEventListener('click', function(){ show(i+1); });

  // optional slow auto-advance, paused on hover, disabled if reduced motion
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var slideshow = document.querySelector('.slideshow');
  var timer = null;
  function start(){ if(!reduce) timer = setInterval(function(){ show(i+1); }, 8000); }
  function stop(){ if(timer){ clearInterval(timer); timer=null; } }
  if(slideshow){ slideshow.addEventListener('mouseenter', stop); slideshow.addEventListener('mouseleave', start); }
  show(0); start();
})();
