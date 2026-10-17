'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const LS=(k,v)=>{try{if(v===undefined)return JSON.parse(localStorage.getItem(k));localStorage.setItem(k,JSON.stringify(v))}catch(e){return null}};
const esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const S=n=>'S/ '+(+n||0).toLocaleString('es-PE',{minimumFractionDigits:2,maximumFractionDigits:2});
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6),today=()=>new Date().toISOString().slice(0,10);
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('on');setTimeout(()=>t.classList.remove('on'),2200)};
// id|nombre|precio estimado inicial|plan mínimo que ya lo incluye (0=ninguno)|explicación
const FT=`Diseño y contenido
dper|Diseño personalizado|250|2|Diseño único a medida, no plantilla
dtpl|Diseño basado en plantilla|0|1|Plantilla adaptada a la marca
mob|Adaptación a celulares|0|1|Se ve bien en teléfonos
tab|Adaptación a tablets|0|1|Se ve bien en tablets
gal|Galería de imágenes|80|2|Fotos en cuadrícula o carrusel
oimg|Optimización de imágenes|60|0|Reducir peso sin perder calidad
txt|Redacción de textos|120|0|Textos escritos para el cliente
logo|Creación de logotipo|150|0|Logo nuevo para el negocio
anim|Animaciones|100|0|Movimiento suave en secciones
fx|Efectos visuales|80|0|Degradados, sombras, efectos
multi|Diseño de varias páginas|0|2|Páginas extra se cobran aparte
nav|Navegación entre páginas|0|2|Menú y enlaces entre páginas
btn|Botones y enlaces funcionales|0|1|Todos los enlaces funcionan
Funciones para negocios
wa|Botón de WhatsApp|30|1|Abre chat con mensaje inicial
soc|Enlaces a redes sociales|30|1|Íconos con enlaces
map|Mapa de ubicación|40|2|Mapa incrustado del local
form|Formulario de contacto|80|2|Envío de consultas
cat|Catálogo de productos|250|2|Lista de productos con fotos
menu|Carta o menú digital|150|2|Carta con categorías y precios
gplat|Galería de platos|80|0|Fotos de platos destacados
res|Sistema de reservas|400|0|Reservas con fecha y hora
ped|Formulario de pedidos|200|0|Pedidos enviados por correo/WhatsApp
adm|Panel de administración|600|0|Gestión de contenido por el cliente
db|Base de datos|400|0|Almacenamiento de datos
login|Registro e inicio de sesión|350|0|Cuentas de usuario
cart|Carrito de compras|500|4|Carrito y proceso de compra
pay|Pasarela de pagos|450|0|Cobro en línea (según proveedor)
usr|Gestión de usuarios|350|0|Roles y permisos
cust|Funciones personalizadas|300|0|Funciones a medida
SEO y publicación
seo|Títulos y metadatos SEO|80|2|Títulos y descripciones para Google
speed|Optimización de velocidad|100|0|Carga más rápida
dom|Configuración del dominio|60|0|Trabajo de configurar el dominio
host|Configuración del hosting|60|0|Trabajo de configurar el hosting
pub|Publicación de la página|50|1|Subir la web a internet
lnk|Configuración de enlaces|30|1|Revisión de enlaces
test|Pruebas en distintos navegadores|60|2|Chrome, Edge, Firefox, Safari
rev|Revisión de errores|50|1|Revisión final
train|Capacitación al cliente|100|0|Explicar cómo usar la web
sup|Soporte posterior a la entrega|120|0|Ayuda tras la entrega
Extras
qr|Creación de código QR|40|0|Diseño y configuración del QR hacia la web
qrp|Impresión física del QR|20|0|Mano de obra de impresión; la imprenta va como gasto
print|Diseño de material para imprimir|150|0|Flyers, tarjetas, afiches
man|Manual de uso|80|0|Guía sencilla para el cliente
urg|Entrega urgente|200|0|Prioridad y plazo reducido
chg|Rondas adicionales de cambios|60|0|Cambios más allá de los incluidos`;
const FEATS=[];let _c='';FT.split('\n').forEach(l=>{const a=l.split('|');if(a.length<5)_c=l;else FEATS.push({id:a[0],cat:_c,n:a[1],p:+a[2],inc:+a[3],d:a[4]})});
const D={brand:'NaviWeb',c1:'#2f7bff',c2:'#22d3ee',rate:15,extraPage:80,profit:20,minPct:85,maxPct:130,maxDisc:20,hosting:120,domain:60,maint:50,
plans:[{n:'Presencia Digital',base:450,pages:1},{n:'Negocio Profesional',base:900,pages:3},{n:'Web Avanzada',base:1800,pages:5},{n:'Tienda Online',base:2500,pages:8}],
mult:{basico:1,intermedio:1.1,avanzado:1.3,complejo:1.6},fp:{}};
const OPT={type:['restaurante','tienda','barbería','portafolio','empresa','emprendimiento','institución','blog','otro'],status:['idea','en desarrollo','terminado','entregado'],
ptype:{landing:'Landing page',informativa:'Web informativa',empresarial:'Web empresarial',catalogo:'Catálogo digital',tienda:'Tienda online',app:'Aplicación web'},
level:{basico:'Básico',intermedio:'Intermedio',avanzado:'Avanzado',complejo:'Complejo'}};
let CFG,P,PROJ,FIL={q:'',st:'',ty:'',so:'date'};
function loadCfg(){CFG=JSON.parse(JSON.stringify(D));const s=LS('nw_cfg');if(s&&typeof s==='object')Object.assign(CFG,s);
CFG.fp=Object.assign(Object.fromEntries(FEATS.map(f=>[f.id,f.p])),CFG.fp||{});if(!Array.isArray(CFG.plans)||CFG.plans.length!==4)CFG.plans=D.plans;CFG.mult=Object.assign({},D.mult,CFG.mult);theme()}
function theme(){const r=document.documentElement.style;r.setProperty('--a',CFG.c1);r.setProperty('--b',CFG.c2);$('#brand').textContent=CFG.brand||'NaviWeb';document.title=(CFG.brand||'NaviWeb')+' — Cotizador Web'}
const blank=()=>({id:uid(),f:{date:today(),status:'idea',type:'otro',ptype:'landing',level:'basico',plan:'auto',pages:1,sections:3,images:0,hours:'',rate:CFG.rate,exp:'',disc:'',final:'',days:15,rev:2,pay:'50% al iniciar y 50% al entregar',warr:'30 días para corregir errores sin costo',valid:15,notes:'',subTime:true}});
function demo(){const p=blank();Object.assign(p.f,{client:'Cliente de ejemplo',biz:'Restaurante Sabor Criollo',type:'restaurante',name:'Web del restaurante (2 páginas)',desc:'Página principal con información del local y segunda página con la carta y fotos de platos, enlaces de navegación, botón de WhatsApp, diseño para teléfono y computadora, y código QR hacia la web publicada.',status:'terminado',ptype:'informativa',pages:2,sections:6,images:15,hours:18,level:'intermedio',days:10,notes:'El QR digital se entrega como regalo. La impresión física no está incluida.',rHost:true,rDom:true});
p.on={dper:1,mob:1,tab:1,gal:1,multi:1,nav:1,btn:1,wa:1,menu:1,gplat:1,qr:2};return p}
function recPlan(p){const f=p.f,o=p.on,w=[];let n={landing:1,informativa:1,empresarial:2,catalogo:2,tienda:4,app:3}[f.ptype]||1;w.push('el tipo “'+OPT.ptype[f.ptype]+'”');
const up=(m,y)=>{if(m>n)n=m;if(m>=n&&y)w.push(y)};
if(o.menu||o.cat||(+f.pages||1)>1)up(2,'varias páginas o carta/catálogo');if(o.adm||o.db||o.login||o.usr||o.cust||o.res)up(3,'funciones avanzadas (administración, base de datos, usuarios, reservas)');if(o.cart||o.pay)up(4,'carrito o pagos');
return{n,why:'se basa en '+w.join(', ')+'.'}}
function calc(p){const c=CFG,f=p.f,o=p.on,N=k=>+f[k]||0,rp=f.plan&&f.plan!=='auto'?{n:+f.plan,why:'elegido manualmente.'}:recPlan(p),pn=rp.n,pl=c.plans[pn-1];
const xp=Math.max(0,(N('pages')||1)-pl.pages),pc=xp*c.extraPage;let ex=0,gift=0;const fs={},ch=[],gf=[],inc=[];
FEATS.forEach(t=>{const m=o[t.id];if(!m)return;const pr=+c.fp[t.id]||0;if(t.inc&&pn>=t.inc){fs[t.id]='inc';inc.push(t.n)}else if(m==2){fs[t.id]='gift';gift+=pr;gf.push([t.n,pr])}else{fs[t.id]=pr;ex+=pr;ch.push([t.n,pr])}});
const mu=c.mult[f.level]||1,sub=pl.base+pc+ex,core=sub*mu,rate=N('rate')||c.rate,tc=N('hours')*rate,exp=N('exp'),hb=tc*(1+c.profit/100)+exp,pre=Math.max(core,hb);
const dp=Math.min(Math.max(N('disc'),0),c.maxDisc),dis=pre*dp/100,net=pre-dis,min=Math.min(net,Math.max(net*c.minPct/100,tc+exp)),high=Math.max(net,net*c.maxPct/100),fin=N('final')>0?N('final'):net;
const prof=fin-exp-(f.subTime?tc:0),mg=fin?prof/fin*100:0,warn=[],fl=tc+exp;
if(!N('hours'))warn.push('Faltan las horas trabajadas: el precio se calcula solo con el plan.');if(!f.client)warn.push('Falta el nombre del cliente (se necesita para el presupuesto).');
if(N('disc')>c.maxDisc)warn.push('El descuento se limitó al máximo permitido ('+c.maxDisc+'%).');if(fl&&fin<fl)warn.push('Precio bajo: no cubre horas y gastos ('+S(fl)+').');else if(prof<0)warn.push('La ganancia estimada es negativa.');
return{pn,why:rp.why,pl,xp,pc,ex,gift,fs,ch,gf,inc,mu,sub,core,tc,exp,hb,pre,dp,dis,net,min,high,fin,prof,mg,warn,hrs:N('hours'),rec:{h:f.rHost?c.hosting:0,d:f.rDom?c.domain:0,m:f.rMaint?c.maint:0}}}
// ---------- Formulario ----------
const val=k=>esc(P.f[k]??'');
const inp=(k,l,t='text',x='')=>`<label>${l}<input data-k="${k}" type="${t}" value="${val(k)}" ${x}></label>`;
const num=(k,l)=>inp(k,l,'number','min="0" step="any"');
const sel=(k,l,o)=>{const e=Array.isArray(o)?o.map(v=>[v,v]):Object.entries(o);return`<label>${l}<select data-k="${k}">${e.map(([v,t])=>`<option value="${v}"${P.f[k]==v?' selected':''}>${esc(t)}</option>`).join('')}</select></label>`};
const chk=(k,l)=>`<label class="ck"><input data-k="${k}" type="checkbox"${P.f[k]?' checked':''}> ${l}</label>`;
function renderForm(){const c=CFG,pn={auto:'Automático (recomendado)'};c.plans.forEach((p,i)=>pn[i+1]=p.n);
let h=`<div class="top"><h1>Cotizador</h1><div class="btns"><button class="b" id="nw">Nuevo</button><button class="b" id="dm">Cargar ejemplo restaurante</button><button class="b p" id="sv">Guardar proyecto</button></div></div>
<div class="card"><h2>Cliente y proyecto</h2><div class="fg">${inp('client','Cliente')}${inp('biz','Negocio')}${sel('type','Tipo de negocio',OPT.type)}${inp('name','Nombre del proyecto')}${inp('date','Fecha del presupuesto','date')}${sel('status','Estado',OPT.status)}</div><label>Descripción del trabajo<textarea data-k="desc" rows="3">${val('desc')}</textarea></label></div>
<div class="card"><h2>Alcance y trabajo</h2><div class="fg">${sel('ptype','Tipo de proyecto',OPT.ptype)}${sel('plan','Plan',pn)}${sel('level','Dificultad',OPT.level)}${num('pages','Páginas')}${num('sections','Secciones')}${num('images','Imágenes (aprox.)')}${num('hours','Horas reales trabajadas')}${num('rate','Tarifa por hora (S/)')}${num('exp','Gastos directos (S/)')}${num('disc','Descuento (%)')}${num('final','Precio final acordado (S/)')}</div>${chk('subTime','Descontar el coste de mi tiempo al calcular la ganancia')}</div>`;
[...new Set(FEATS.map(f=>f.cat))].forEach(ct=>h+=`<div class="card"><h2>${ct}</h2><div class="feats">${FEATS.filter(f=>f.cat==ct).map(f=>`<div class="ft"><label class="ck"><input type="checkbox" data-o="${f.id}"${P.on[f.id]?' checked':''}><b>${f.n}</b></label><small>${f.d}</small><span class="pr" id="pr-${f.id}"></span><label class="ck g"><input type="checkbox" data-g="${f.id}"${P.on[f.id]==2?' checked':''}>Regalar al cliente</label></div>`).join('')}</div></div>`);
h+=`<div class="card"><h2>Costes recurrentes y condiciones</h2><div class="fg">${chk('rHost','Hosting a cargo del cliente')}${chk('rDom','Dominio a cargo del cliente')}${chk('rMaint','Mantenimiento mensual')}</div><div class="fg">${num('days','Plazo de entrega (días)')}${num('rev','Revisiones incluidas')}${num('valid','Validez del presupuesto (días)')}${inp('pay','Condiciones de pago')}${inp('warr','Garantía / corrección de errores')}</div><label>Observaciones<textarea data-k="notes" rows="2">${val('notes')}</textarea></label></div>`;
$('#formcol').innerHTML=h}
function onForm(e){const t=e.target,d=t.dataset;if(d.k)P.f[d.k]=t.type==='checkbox'?t.checked:t.value;
else if(d.o){const g=$(`[data-g=${d.o}]`);if(t.checked)P.on[d.o]=g.checked?2:1;else{delete P.on[d.o];g.checked=false}}
else if(d.g){const m=$(`[data-o=${d.g}]`);if(t.checked){m.checked=true;P.on[d.g]=2}else if(m.checked)P.on[d.g]=1}else return;
LS('nw_draft',P);renderRes()}
function renderRes(){const r=calc(P),rw=(l,v,c='')=>`<tr><td>${l}</td><td class="${c}">${v}</td></tr>`;
$('#res').innerHTML=`<h2>Precio recomendado</h2><div class="big">${S(r.net)}</div><div class="rng"><span>Mínimo<b>${S(r.min)}</b></span><span>Alto<b>${S(r.high)}</b></span></div>
<p class="note">Plan sugerido: <b>${esc(r.pl.n)}</b>; ${esc(r.why)}</p>${r.warn.map(w=>`<div class="warn">${esc(w)}</div>`).join('')}
<table>${rw('Precio base del plan',S(r.pl.base))}${rw('Páginas adicionales ('+r.xp+')',S(r.pc))}${rw('Importe de extras cobrados',S(r.ex))}${rw('Complejidad ×'+r.mu,S(r.core-r.sub))}${rw('<b>Precio por plan</b>',S(r.core))}${rw('Precio por horas',S(r.hb))}${rw('Descuento ('+r.dp+'%)','-'+S(r.dis),'neg')}${rw('<b>Precio final a cobrar</b>',S(r.fin))}${rw('Coste de mi tiempo ('+r.hrs+' h)',S(r.tc))}${rw('Gastos directos',S(r.exp))}${rw('<b>Ganancia estimada</b>',S(r.prof),r.prof<0?'neg':'pos')}${rw('Margen estimado',r.mg.toFixed(1)+'%')}${rw('Regalos incluidos (valor)',S(r.gift))}${rw('Hosting / dominio (año)',S(r.rec.h+r.rec.d))}${rw('Mantenimiento (mes)',S(r.rec.m))}</table>
<h3>Cómo se calcula</h3><p class="note">Precio por plan = (base + páginas extra + extras no incluidos) × complejidad. Precio por horas = horas × tarifa × (1 + ${CFG.profit}% de ganancia) + gastos. Recomendado = el mayor de los dos, menos el descuento. Lo ya incluido en el plan no se cobra y los regalos no se suman. El mínimo nunca baja de tus horas + gastos. Si escribes un precio final acordado, ese manda.</p>`;
FEATS.forEach(t=>{const e=$('#pr-'+t.id);if(!e)return;const s=r.fs[t.id];e.textContent=s==='inc'?'Incluido en el plan':s==='gift'?'Regalo (valor '+S(CFG.fp[t.id])+')':'Costo: '+S(CFG.fp[t.id])})}
// ---------- Proyectos ----------
const saveP=()=>LS('nw_proj',PROJ);
function saveCur(){const i=PROJ.findIndex(x=>x.id===P.id),c=JSON.parse(JSON.stringify(P));i<0?PROJ.push(c):PROJ[i]=c;saveP();toast('Proyecto guardado')}
function renderList(){const q=FIL.q.toLowerCase();let a=PROJ.filter(p=>(!FIL.st||p.f.status===FIL.st)&&(!FIL.ty||p.f.ptype===FIL.ty)&&(!q||[p.f.client,p.f.biz,p.f.name].join(' ').toLowerCase().includes(q)));
a=a.map(p=>({p,r:calc(p)})).sort((x,y)=>FIL.so==='price'?y.r.net-x.r.net:String(y.p.f.date).localeCompare(String(x.p.f.date)));
$('#list').innerHTML=`<div class="top"><h1>Proyectos</h1><div class="btns"><button class="b" id="ex">Exportar JSON</button><button class="b" id="im">Importar JSON</button><input type="file" id="fi" accept=".json,application/json" hidden></div></div>
<div class="card"><div class="fg"><label>Buscar<input id="fq" value="${esc(FIL.q)}"></label>${sel2('fst','Estado',['',...OPT.status],FIL.st)}${sel2('fty','Tipo',{'':'Todos',...OPT.ptype},FIL.ty)}${sel2('fso','Ordenar por',{date:'Fecha',price:'Precio'},FIL.so)}</div></div>
<div class="pg">${a.map(({p,r})=>`<div class="card"><b>${esc(p.f.name||'Sin nombre')}</b><div class="note">${esc(p.f.client||'Sin cliente')} · ${esc(p.f.date||'')}</div><span class="tag">${esc(p.f.status)}</span>
<table>${[['Recomendado',S(r.net)],['Final acordado',+p.f.final>0?S(p.f.final):'—'],['Ganancia estimada',S(r.prof)]].map(x=>`<tr><td>${x[0]}</td><td>${x[1]}</td></tr>`).join('')}</table>
<div class="btns" style="margin-top:10px"><button class="b" data-a="e" data-id="${p.id}">Editar</button><button class="b" data-a="d" data-id="${p.id}">Duplicar</button><button class="b d" data-a="x" data-id="${p.id}">Eliminar</button></div></div>`).join('')||'<p class="note">No hay proyectos que mostrar. Guarda uno desde el Cotizador.</p>'}</div>`}
function sel2(id,l,o,v){const e=Array.isArray(o)?o.map(x=>[x,x||'Todos']):Object.entries(o);return`<label>${l}<select id="${id}">${e.map(([a,b])=>`<option value="${a}"${a==v?' selected':''}>${esc(b)}</option>`).join('')}</select></label>`}
function onList(e){const t=e.target,id=t.id,a=t.dataset.a;
if(id==='fq')FIL.q=t.value;else if(id==='fst')FIL.st=t.value;else if(id==='fty')FIL.ty=t.value;else if(id==='fso')FIL.so=t.value;
else if(id==='ex'){const b=new Blob([JSON.stringify({app:'NaviWeb',v:1,projects:PROJ},null,1)],{type:'application/json'}),u=document.createElement('a');u.href=URL.createObjectURL(b);u.download='naviweb-respaldo-'+today()+'.json';u.click();return}
else if(id==='im'){$('#fi').click();return}
else if(a){const p=PROJ.find(x=>x.id===t.dataset.id);if(!p)return;
if(a==='e'){P=JSON.parse(JSON.stringify(p));LS('nw_draft',P);go('calc');return}
if(a==='d'){const c=JSON.parse(JSON.stringify(p));c.id=uid();c.f.name=(c.f.name||'')+' (copia)';PROJ.push(c);saveP();toast('Proyecto duplicado')}
if(a==='x'){if(!confirm('¿Eliminar este proyecto? No se puede deshacer.'))return;PROJ=PROJ.filter(x=>x!==p);saveP()}}else return;
const pos=e.target.id==='fq'?t.selectionStart:0;renderList();if(id==='fq'){const q=$('#fq');q.focus();q.setSelectionRange(pos,pos)}}
function imp(file){const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result),a=Array.isArray(d)?d:d.projects;if(!Array.isArray(a))throw 0;
const ok=a.filter(p=>p&&typeof p==='object'&&p.f&&typeof p.f==='object'&&!Array.isArray(p.f)).map(p=>({id:String(p.id||uid()),f:{...blank().f,...p.f},on:Object.fromEntries(Object.entries(p.on&&typeof p.on==='object'?p.on:{}).filter(([k,v])=>FEATS.some(x=>x.id===k)&&(v==1||v==2)))}));
if(!ok.length)throw 0;ok.forEach(p=>{const i=PROJ.findIndex(x=>x.id===p.id);i<0?PROJ.push(p):PROJ[i]=p});saveP();renderList();toast(ok.length+' proyecto(s) importado(s)')}catch(e){alert('El archivo no es una copia de seguridad válida de NaviWeb.')}};r.readAsText(file)}
// ---------- Presupuesto ----------
function renderQuote(){const r=calc(P),f=P.f,L=[];L.push([`Plan ${r.pl.n} (base)`,S(r.pl.base)]);if(r.xp)L.push([`Páginas adicionales (${r.xp})`,S(r.pc)]);r.ch.forEach(([n,v])=>L.push([n,S(v)]));
if(r.mu!==1)L.push(['Ajuste por complejidad ×'+r.mu,S(r.core-r.sub)]);if(r.pre>r.core)L.push(['Ajuste por horas de trabajo',S(r.pre-r.core)]);if(r.dis)L.push(['Descuento ('+r.dp+'%)','-'+S(r.dis)]);if(Math.abs(r.fin-r.net)>.005)L.push(['Ajuste de precio acordado',S(r.fin-r.net)]);
const e=new Date((f.date||today())+'T00:00:00');e.setDate(e.getDate()+(+f.valid||15));const inc=[...new Set([...r.inc,...r.ch.map(x=>x[0]),...r.gf.map(x=>x[0])])];
$('#quote').innerHTML=`<div class="top"><h1>Presupuesto</h1><div class="btns"><button class="b" id="qc">Copiar como texto</button><button class="b p" id="qp">Imprimir / Guardar PDF</button><button class="b" id="qr">Regenerar</button></div></div><p class="note noprint">Puedes hacer clic en cualquier texto del documento para editarlo antes de copiar o imprimir.</p>
<div class="doc" id="qd" contenteditable="true"><h1>${esc(CFG.brand)} — Presupuesto</h1><p>Cliente: <b>${esc(f.client||'—')}</b>${f.biz?' ('+esc(f.biz)+')':''}<br>Proyecto: <b>${esc(f.name||'—')}</b><br>Emisión: ${esc(f.date||'')} · Vence: ${e.toISOString().slice(0,10)}</p>
<h3>Servicios</h3><p>${esc(f.desc||'')}</p><h3>Funcionalidades incluidas</h3><p>${inc.map(esc).join(', ')||'—'}</p>
<h3>Detalle de precios</h3><table>${L.map(x=>`<tr><td>${esc(x[0])}</td><td>${x[1]}</td></tr>`).join('')}<tr><td><b>TOTAL</b></td><td><b>${S(r.fin)}</b></td></tr></table>
${r.gf.length?`<h3>Regalos incluidos sin costo</h3><table>${r.gf.map(([n,v])=>`<tr class="gf"><td>${esc(n)} (valor ${S(v)})</td><td>S/ 0.00</td></tr>`).join('')}</table>`:''}
${r.rec.h+r.rec.d+r.rec.m?`<h3>Costes recurrentes a cargo del cliente</h3><table>${r.rec.h?`<tr><td>Hosting (anual, estimado)</td><td>${S(r.rec.h)}</td></tr>`:''}${r.rec.d?`<tr><td>Dominio (anual, estimado)</td><td>${S(r.rec.d)}</td></tr>`:''}${r.rec.m?`<tr><td>Mantenimiento mensual</td><td>${S(r.rec.m)}</td></tr>`:''}</table>`:''}
<h3>Condiciones</h3><p>Plazo de entrega: ${esc(f.days)} días · Revisiones incluidas: ${esc(f.rev)}<br>Pago: ${esc(f.pay)}<br>Garantía: ${esc(f.warr)}</p>${f.notes?`<h3>Observaciones</h3><p>${esc(f.notes)}</p>`:''}</div>`}
function copyQ(){const t=$('#qd').innerText;if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(t).then(()=>toast('Presupuesto copiado'),fb);else fb();
function fb(){const a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();try{document.execCommand('copy');toast('Presupuesto copiado')}catch(e){alert('No se pudo copiar')}a.remove()}}
// ---------- Configuración ----------
function renderCfg(){const c=CFG,n=(l,p,v)=>`<label>${l}<input type="number" min="0" step="any" data-c="${p}" value="${v}"></label>`;
$('#cfg').innerHTML=`<div class="top"><h1>Configuración</h1><button class="b d" id="rs">Restaurar valores predeterminados</button></div><p class="note">Todos los importes son estimaciones iniciales editables, no tarifas de mercado verificadas.</p>
<div class="card"><h2>Marca y tarifas</h2><div class="fg"><label>Nombre comercial<input data-c="brand" value="${esc(c.brand)}"></label><label>Color principal<input type="color" data-c="c1" value="${c.c1}"></label><label>Color secundario<input type="color" data-c="c2" value="${c.c2}"></label>${n('Tarifa por hora (S/)','rate',c.rate)}${n('Página adicional (S/)','extraPage',c.extraPage)}${n('Ganancia deseada sobre horas (%)','profit',c.profit)}${n('Mínimo recomendado (% del precio)','minPct',c.minPct)}${n('Alto recomendado (% del precio)','maxPct',c.maxPct)}${n('Descuento máximo (%)','maxDisc',c.maxDisc)}${n('Hosting anual (S/)','hosting',c.hosting)}${n('Dominio anual (S/)','domain',c.domain)}${n('Mantenimiento mensual (S/)','maint',c.maint)}</div></div>
<div class="card"><h2>Planes</h2>${c.plans.map((p,i)=>`<div class="fg"><label>Plan ${i+1}<input data-c="plans.${i}.n" value="${esc(p.n)}"></label>${n('Precio base (S/)','plans.'+i+'.base',p.base)}${n('Páginas incluidas','plans.'+i+'.pages',p.pages)}</div>`).join('')}</div>
<div class="card"><h2>Multiplicador por dificultad</h2><div class="fg">${Object.keys(c.mult).map(k=>n(OPT.level[k],'mult.'+k,c.mult[k])).join('')}</div></div>
<div class="card"><h2>Precio de funcionalidades (incluye el QR)</h2><div class="fg">${FEATS.map(t=>n(t.n,'fp.'+t.id,c.fp[t.id])).join('')}</div></div>`}
function onCfg(e){const t=e.target,p=t.dataset.c;if(!p)return;const k=p.split('.');let o=CFG;k.slice(0,-1).forEach(x=>o=o[x]);o[k.at(-1)]=t.type==='number'?Math.max(0,+t.value||0):t.value;LS('nw_cfg',CFG);theme()}
// ---------- Navegación ----------
function go(v){$$('.view').forEach(s=>s.classList.toggle('on',s.id===v));$$('nav button').forEach(b=>b.classList.toggle('on',b.dataset.v===v));
({calc:()=>{renderForm();renderRes()},list:renderList,quote:renderQuote,cfg:renderCfg})[v]();window.scrollTo(0,0)}
function init(){loadCfg();PROJ=LS('nw_proj');if(!Array.isArray(PROJ))PROJ=[];P=LS('nw_draft');if(!P||!P.f||!P.on)P=demo();P.f={...blank().f,...P.f};
$$('nav button').forEach(b=>b.onclick=()=>go(b.dataset.v));
$('#formcol').addEventListener('input',onForm);$('#cfg').addEventListener('input',onCfg);$('#list').addEventListener('input',onList);$('#list').addEventListener('click',onList);
$('#list').addEventListener('change',e=>{if(e.target.id==='fi'&&e.target.files[0]){imp(e.target.files[0]);e.target.value=''}});
$('#formcol').addEventListener('click',e=>{const i=e.target.id;if(i==='sv')saveCur();else if(i==='nw'){if(confirm('¿Empezar un proyecto nuevo? El borrador actual se descarta (guárdalo antes si lo necesitas).')){P=blank();LS('nw_draft',P);go('calc')}}else if(i==='dm'){P=demo();LS('nw_draft',P);go('calc')}});
$('#quote').addEventListener('click',e=>{const i=e.target.id;if(i==='qc')copyQ();else if(i==='qp')window.print();else if(i==='qr')renderQuote()});
$('#cfg').addEventListener('click',e=>{if(e.target.id==='rs'&&confirm('¿Restaurar todos los valores predeterminados? Se perderán tus precios personalizados.')){localStorage.removeItem('nw_cfg');loadCfg();renderCfg();toast('Valores restaurados')}});
go('calc')}
init();
