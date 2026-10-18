// 員工入口：解密與內部系統畫面
function renderInternal(){
  var d=SECRET,html='';
  if(d.notices&&d.notices.length)html+='<div class="intsec"><h3>內部公告<small>NOTICES</small></h3><div class="notices">'+d.notices.map(function(n){return '<div class="notice"><em>'+esc(n.date)+' · '+esc(n.from)+'</em><p>'+esc(n.text)+'</p></div>'}).join('')+'</div></div>';
  if(d.dossiers&&d.dossiers.length)html+='<div class="intsec"><h3>人物內部檔案<small>PERSONNEL DOSSIERS</small></h3><div class="dossiers">'+d.dossiers.map(function(x){var ppl=PEOPLE.filter(function(q){return q.id===x.id})[0]||{};
    return '<div class="dossier" style="--fc:'+(ppl.fc||'var(--accent)')+'">'+(ppl.img?'<img src="'+ppl.img+'" alt=""'+(ppl.face?' style="object-position:'+ppl.face+'"':'')+'>':'')+'<div><b>'+esc(x.name)+'</b>'+(x.codename?'<span class="code">'+esc(x.codename)+'</span>':'')+(x.clearance?'<small>授權等級：'+esc(x.clearance)+'</small>':'')+
    '<dl class="kv">'+x.rows.map(function(r){return '<div><dt>'+esc(r[0])+'</dt><dd>'+esc(r[1])+'</dd></div>'}).join('')+'</dl></div></div>'}).join('')+'</div></div>';
  if(d.ops&&d.ops.length)html+='<div class="intsec"><h3>行動紀錄<small>OPERATIONS LOG</small></h3><div class="tablewrap"><table class="ops"><thead><tr><th>日期</th><th>單位</th><th>地點</th><th>任務</th><th>結果</th></tr></thead><tbody>'+d.ops.map(function(o){return '<tr>'+o.map(function(c){return '<td>'+esc(c)+'</td>'}).join('')+'</tr>'}).join('')+'</tbody></table></div></div>';
  if(d.assets&&d.assets.length)html+='<div class="intsec"><h3>資產清冊<small>ASSET REGISTRY</small></h3><div class="assets">'+d.assets.map(function(a){return '<div class="asset"><b>'+esc(a.org)+'</b><ul>'+a.items.map(function(i){return '<li>'+esc(i)+'</li>'}).join('')+'</ul></div>'}).join('')+'</div></div>';
  if(!html)html='<div class="placeholder">內部系統建置中，目前尚無公開文件。</div>';
  document.getElementById('intContent').innerHTML=html;
}

/* ---- vault ---- */
var form=document.getElementById('portalForm'),pwIn=document.getElementById('pw'),msg=document.getElementById('portalMsg');
function b64(s){return Uint8Array.from(atob(s),function(c){return c.charCodeAt(0)})}
async function tryUnlock(pw){
  var sub=window.crypto&&crypto.subtle; if(!sub)throw new Error('nocrypto');
  var base=await sub.importKey('raw',new TextEncoder().encode(pw.normalize('NFKC')),'PBKDF2',false,['deriveKey']);
  var key=await sub.deriveKey({name:'PBKDF2',salt:b64(VAULT.s),iterations:200000,hash:'SHA-256'},base,{name:'AES-GCM',length:256},false,['decrypt']);
  var pt=await sub.decrypt({name:'AES-GCM',iv:b64(VAULT.i)},key,b64(VAULT.c));
  return JSON.parse(new TextDecoder().decode(pt));
}
form.addEventListener('submit',function(e){e.preventDefault();var pw=pwIn.value;if(!pw)return;msg.textContent='驗證中…';msg.classList.remove('err');
  tryUnlock(pw).then(function(d){SECRET=d;try{sessionStorage.setItem('klov-pw',pw)}catch(x){}pwIn.value='';msg.textContent='';renderInternal();show('internal')})
  .catch(function(err){msg.textContent=err.message==='nocrypto'?'此瀏覽器不支援驗證':'授權碼錯誤';msg.classList.add('err')})});
try{var saved=sessionStorage.getItem('klov-pw');if(saved&&VAULT.c)tryUnlock(saved).then(function(d){SECRET=d;renderInternal();show('internal')}).catch(function(){})}catch(e){}
