// 公開網站互動：事業體分頁、人物檔案、立體卡、畫面切換
var SECRET=null;

function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function tierHTML(t){return '<div class="tier"><h4>'+esc(t[0])+'<span>'+esc(t[1])+'</span></h4><div class="roles">'+t[2].map(function(r){return '<div class="role"><em>'+esc(r[2]||r[1])+'</em><b>'+esc(r[0])+'</b><p>'+esc(r[3])+'</p></div>'}).join('')+'</div></div>'}

var tabs=document.getElementById('tabs'),panel=document.getElementById('panel'),cur=SUBS[0].id;
function renderTabs(){tabs.innerHTML=SUBS.map(function(s){return '<button class="tab" role="tab" data-id="'+s.id+'" style="--fc:'+s.fc+'" aria-selected="'+(s.id===cur)+'"><i></i>'+esc(s.en)+'</button>'}).join('')}
function renderPanel(){
  var s=SUBS.filter(function(x){return x.id===cur})[0];
  panel.style.setProperty('--fc',s.fc);
  panel.innerHTML='<header><h3>'+esc(s.name)+'<small>'+esc(s.en)+'</small></h3><div class="meta"><span class="f">'+esc(s.family)+'</span><span>'+esc(s.type)+'</span></div></header>'+
  '<div class="inner"><div class="svc"><div><h4>公司簡介</h4><p>'+esc(s.pub)+'</p></div><div><h4>提供的服務</h4><ul>'+s.svcs.map(function(v){return '<li>'+esc(v)+'</li>'}).join('')+'</ul></div></div>'+s.tiers.map(tierHTML).join('')+'</div>';
}
tabs.addEventListener('click',function(e){var b=e.target.closest('.tab');if(!b)return;cur=b.dataset.id;renderTabs();renderPanel()});
var h=location.hash.replace('#','');if(SUBS.some(function(s){return s.id===h}))cur=h;
renderTabs();renderPanel();

var peopleEl=document.getElementById('people'),profileEl=document.getElementById('profile');
peopleEl.innerHTML=PEOPLE.filter(function(c){return c.listed!==false}).map(function(c){return '<button class="person" data-id="'+c.id+'" style="--fc:'+c.fc+'"><img src="'+c.img+'" alt="'+esc(c.name)+'"><span class="pb"><em>'+esc(c.abbr)+'</em><b>'+esc(c.name)+'</b><small>'+esc(c.title)+' · '+esc(c.family)+'</small></span></button>'}).join('');
function showProfile(id){var c=PEOPLE.filter(function(x){return x.id===id})[0];if(!c)return;
  profileEl.style.setProperty('--fc',c.fc);
  profileEl.innerHTML=(c.layers?'<div class="stage" id="stage"><div class="card idle"><img class="layer bg" src="'+c.layers.bg+'" alt=""><div class="shadow"></div><img class="layer fg" src="'+c.layers.fg+'" alt="'+esc(c.name)+'"><div class="glare"></div></div><span class="hint">DRAG / HOVER</span></div>':'<img src="'+c.img+'" alt="">')+'<div class="pd"><div><h3>'+esc(c.name)+'<small>'+esc(c.en)+(c.abbr?' · '+esc(c.abbr):'')+'</small></h3></div>'+
   (c.quote?'<p class="pq">「'+esc(c.quote)+'」</p>':'')+
   '<div><h4>簡介</h4><p>'+esc(c.bio)+'</p></div>'+
   '<div><h4>基本資料</h4><dl class="kv">'+c.facts.map(function(f){return '<div><dt>'+esc(f[0])+'</dt><dd>'+esc(f[1])+'</dd></div>'}).join('')+'</dl></div>'+
   (c.family&&c.family.length?'<div><h4>家族成員</h4><div class="fam">'+c.family.map(function(r){var m=PEOPLE.filter(function(x){return x.id===r[0]})[0];if(!m)return '';return '<button type="button" class="famcard" data-id="'+m.id+'"><img src="'+m.img+'" alt=""'+(m.face?' style="object-position:'+m.face+'"':'')+'><span><b>'+esc(m.name)+'</b><small>'+esc(r[1])+'</small></span></button>'}).join('')+'</div></div>':'')+
   '<button type="button" class="close" id="profileClose">收合</button></div>';
  profileEl.hidden=false;initStage();profileEl.scrollIntoView({behavior:'smooth',block:'nearest'})}
function initStage(){var st=document.getElementById('stage');if(!st)return;var card=st.querySelector('.card'),glare=st.querySelector('.glare'),raf=null,tx=0,ty=0,down=false;
  function apply(){raf=null;card.style.transform='rotateX('+(-ty*14)+'deg) rotateY('+(tx*18)+'deg)';glare.style.background='linear-gradient('+(115+tx*40)+'deg,rgba(255,255,255,0) '+(35+ty*10)+'%,rgba(255,255,255,.55) '+(50+ty*10)+'%,rgba(255,255,255,0) '+(65+ty*10)+'%)'}
  function move(x,y){var r=st.getBoundingClientRect();tx=((x-r.left)/r.width-.5)*2;ty=((y-r.top)/r.height-.5)*2;tx=Math.max(-1,Math.min(1,tx));ty=Math.max(-1,Math.min(1,ty));card.classList.remove('idle');if(!raf)raf=requestAnimationFrame(apply)}
  function reset(){card.classList.add('idle');tx=0;ty=0;apply()}
  st.addEventListener('pointermove',function(e){if(e.pointerType==='mouse'||down)move(e.clientX,e.clientY)});
  st.addEventListener('pointerdown',function(e){down=true;st.setPointerCapture(e.pointerId);move(e.clientX,e.clientY)});
  st.addEventListener('pointerup',function(){down=false;reset()});st.addEventListener('pointercancel',function(){down=false;reset()});
  st.addEventListener('pointerleave',function(){if(!down)reset()});
  if(window.DeviceOrientationEvent&&!('ontouchstart' in window===false)){window.addEventListener('deviceorientation',function(e){if(down||e.gamma==null)return;tx=Math.max(-1,Math.min(1,e.gamma/30));ty=Math.max(-1,Math.min(1,(e.beta-40)/30));card.classList.remove('idle');if(!raf)raf=requestAnimationFrame(apply)})}
}
peopleEl.addEventListener('click',function(e){var b=e.target.closest('.person');if(b)showProfile(b.dataset.id)});
profileEl.addEventListener('click',function(e){if(e.target.id==='profileClose'){profileEl.hidden=true;return}var f=e.target.closest('.famcard');if(f)showProfile(f.dataset.id)});

/* ---- views ---- */
var pub=document.getElementById('public'),portal=document.getElementById('portal'),internal=document.getElementById('internal'),pubnav=document.getElementById('pubnav');
function show(v){pub.hidden=v!=='public';portal.hidden=v!=='portal';internal.hidden=v!=='internal';pubnav.querySelectorAll('a').forEach(function(a){a.hidden=v!=='public'});
  document.getElementById('portalBtn').textContent=v==='internal'?'內部系統':'員工入口';window.scrollTo({top:0})}
document.getElementById('portalBtn').addEventListener('click',function(){show(SECRET?'internal':'portal');if(!SECRET)document.getElementById('pw').focus()});
document.getElementById('portalBack').addEventListener('click',function(){show('public')});
document.getElementById('logoutBtn').addEventListener('click',function(){SECRET=null;try{sessionStorage.removeItem('klov-pw')}catch(e){}show('public')});
