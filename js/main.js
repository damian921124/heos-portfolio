(function(){
  var links = Array.prototype.slice.call(document.querySelectorAll('.projnav a'));
  if(!links.length) return;

  function offset(){
    var bar = document.querySelector('.bar');
    var nav = document.querySelector('.projnav');
    return (bar ? bar.offsetHeight : 0) + (nav ? nav.offsetHeight : 0) + 8;
  }
  function targetOf(a){ return document.getElementById(a.getAttribute('data-target')); }

  function go(a){
    var el = targetOf(a);
    if(!el) return;
    var y = el.getBoundingClientRect().top + window.scrollY - offset();
    window.scrollTo({ top: y < 0 ? 0 : y, behavior: 'smooth' });
  }
  links.forEach(function(a){
    a.addEventListener('click', function(e){ e.preventDefault(); go(a); });
    a.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); go(a); }
    });
  });

  var map = {};
  links.forEach(function(a){ var el = targetOf(a); if(el) map[el.id] = a; });
  function setOn(a){ links.forEach(function(l){ l.classList.toggle('on', l === a); }); }

  if(!('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function(entries){
    var best = null;
    entries.forEach(function(e){
      if(e.isIntersecting && (!best || e.boundingClientRect.top < best.boundingClientRect.top)) best = e;
    });
    if(best && map[best.target.id]) setOn(map[best.target.id]);
  }, { rootMargin: '-90px 0px -58% 0px', threshold: 0 });
  Object.keys(map).forEach(function(id){ io.observe(document.getElementById(id)); });
})();

(function(){
  var btn = document.querySelector('.totop');
  if(!btn) return;
  function toggle(){
    btn.classList.toggle('show', window.scrollY > window.innerHeight * 0.8);
  }
  btn.addEventListener('click', function(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  window.addEventListener('scroll', toggle, { passive: true });
  toggle();
})();

(function(){
  var VISIBLE = 6;
  document.querySelectorAll('.clips').forEach(function(wrap){
    var clips = Array.prototype.slice.call(wrap.querySelectorAll('.clip'));
    if (clips.length <= VISIBLE) return;
    clips.slice(VISIBLE).forEach(function(c){ c.classList.add('clip-extra'); });
    var remaining = clips.length - VISIBLE;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'clips-more';
    btn.textContent = '영상 ' + remaining + '개 더보기';
    btn.addEventListener('click', function(){
      clips.forEach(function(c){ c.classList.remove('clip-extra'); });
      btn.remove();
    });
    wrap.insertAdjacentElement('afterend', btn);
  });
})();

(function(){
  var lb=document.querySelector('.lb'), im=lb.querySelector('img'), cap=lb.querySelector('.lb-cap');
  function open(src,title,desc,startNative){
    im.src=src; im.classList.toggle('native',!!startNative);
    cap.innerHTML = title ? ('<b></b>'+(desc?'<span></span>':'')) : '';
    if(title) cap.querySelector('b').textContent = title;
    if(desc) cap.querySelector('span').textContent = desc;
    lb.classList.add('open'); lb.scrollTop=0; document.body.style.overflow='hidden';
  }
  function close(){ lb.classList.remove('open'); document.body.style.overflow=''; }
  document.querySelectorAll('.zoomable').forEach(function(f){
    f.addEventListener('click', function(){
      var i=f.querySelector('img'); if(!i) return;
      var capEl=f.querySelector('figcaption'), titleEl=capEl?capEl.querySelector('b'):null;
      var title = titleEl ? titleEl.textContent : i.alt;
      var desc = '';
      if(capEl){ desc = capEl.textContent.slice(titleEl?titleEl.textContent.length:0).trim(); }
      open(i.src, title, desc, i.hasAttribute('data-zoom-native'));
    });
  });
  im.addEventListener('click', function(e){ e.stopPropagation(); im.classList.toggle('native'); });
  lb.querySelector('.lb-close').addEventListener('click', function(e){ e.stopPropagation(); close(); });
  lb.addEventListener('click', function(e){ if(e.target===lb) close(); });
  document.addEventListener('keydown', function(e){ if(e.key==='Escape') close(); });
  document.querySelectorAll('.gallery').forEach(function(g){
    var t=g.querySelector('.gtrack');
    g.querySelectorAll('.gbtn').forEach(function(b){
      b.addEventListener('click', function(){
        var c=t.querySelector('.gcard'); var w=c?c.getBoundingClientRect().width+26:400;
        t.scrollBy({left: w*parseInt(b.getAttribute('data-dir'),10), behavior:'smooth'});
      });
    });
  });
})();

(function(){
  var root=document.getElementById('lotte-gallery'); if(!root) return;
  var chips=root.querySelectorAll('.lchip'), grps=root.querySelectorAll('.lgrp');
  function openG(g,on){ g.classList.toggle('open',on); g.querySelector('.lhead').setAttribute('aria-expanded',on?'true':'false'); }
  grps.forEach(function(g){ g.querySelector('.lhead').addEventListener('click',function(){ openG(g,!g.classList.contains('open')); }); });
  chips.forEach(function(c){ c.addEventListener('click',function(){
    chips.forEach(function(x){x.classList.toggle('on',x===c);});
    var k=c.getAttribute('data-g');
    grps.forEach(function(g,i){
      var show = k==='all' || g.getAttribute('data-g')===k;
      g.hidden=!show;
      openG(g, k==='all' ? i===0 : show);
    });
  }); });
  var lb=document.querySelector('.lb2'), imgSb=lb.querySelector('.lb2-img-sb'), imgLive=lb.querySelector('.lb2-img-live'), ttl=lb.querySelector('.lb2-title'), cur=null;
  root.querySelectorAll('.lcard').forEach(function(c){ c.addEventListener('click',function(){ cur=c; ttl.textContent=c.getAttribute('data-title'); imgSb.src=c.getAttribute('data-sb'); imgLive.src=c.getAttribute('data-live'); lb.scrollTop=0; lb.classList.add('open'); document.body.style.overflow='hidden'; }); });
  function close(){ lb.classList.remove('open'); document.body.style.overflow=''; }
  lb.querySelector('.lb2-close').addEventListener('click',close);
  document.addEventListener('keydown',function(e){ if(e.key==='Escape' && lb.classList.contains('open')) close(); });
})();

(function(){
  var root=document.getElementById('fabrix-shots'); if(!root) return;
  var chips=root.querySelectorAll('#fx-chips .lchip'), grps=root.querySelectorAll('.fx-group');
  function openG(g,on){ g.classList.toggle('open',on); g.querySelector('.fx-head').setAttribute('aria-expanded',on?'true':'false'); }
  grps.forEach(function(g){ g.querySelector('.fx-head').addEventListener('click',function(){ openG(g,!g.classList.contains('open')); }); });
  chips.forEach(function(c){ c.addEventListener('click',function(){
    chips.forEach(function(x){x.classList.toggle('on',x===c);});
    var k=c.getAttribute('data-fg');
    grps.forEach(function(g,i){
      var show = k==='all' || g.getAttribute('data-fg')===k;
      g.hidden=!show;
      openG(g, k==='all' ? i===0 : show);
    });
  }); });
})();
