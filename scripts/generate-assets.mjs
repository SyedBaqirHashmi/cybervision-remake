import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
const output = resolve('public/images');
mkdirSync(output,{recursive:true});
const save=(name,body,width=720,height=560)=>writeFileSync(resolve(output,`${name}.svg`),`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${body}</svg>\n`);
const defs='<defs><linearGradient id="surface" x2="1" y2="1"><stop stop-color="#15233d"/><stop offset="1" stop-color="#070d1a"/></linearGradient><linearGradient id="accent" x2="1" y2="1"><stop stop-color="#67e8f9"/><stop offset="1" stop-color="#818cf8"/></linearGradient><radialGradient id="glow"><stop stop-color="#164e63" stop-opacity=".6"/><stop offset="1" stop-color="#030712" stop-opacity="0"/></radialGradient></defs>';
const text=(x,y,value,size=12,color='#cbd5e1',extra='')=>`<text x="${x}" y="${y}" font-family="Arial,sans-serif" font-size="${size}" fill="${color}" ${extra}>${value}</text>`;
const rect=(x,y,w,h,fill='#0f172a',stroke='#26334a',r=8)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}"/>`;
function frame(title,body) {return `${defs}${rect(12,30,696,492,'url(#surface)','#334155',14)}<path d="M12 76H708" stroke="#26334a"/><circle cx="34" cy="54" r="4" fill="#64748b"/><circle cx="49" cy="54" r="4" fill="#475569"/><circle cx="64" cy="54" r="4" fill="#334155"/>${text(92,58,'CYBERVISION / '+title,10,'#94a3b8')}${text(35,111,title,18,'#e2e8f0')}${text(35,132,'EXPERIENCE CONCEPT · ILLUSTRATIVE INTERFACE',8,'#94a3b8','letter-spacing="1.5"')}${body}`;}

let fao='';
for(let i=0;i<3;i++)fao+=rect(35+i*221,155,208,76)+text(50+i*221,178,['Data coverage','Nutrition insights','Regional overview'][i],10,'#94a3b8')+text(50+i*221,213,['Connected','Accessible','In focus'][i],22,'#a5f3fc');
fao+=rect(35,250,393,237)+text(53,277,'Regional information',11)+`<path d="m255 296-27 12-13 25-29 9 1 31-42 14 8 26-37 23 18 20 36-10 24 16 16-25 35-11 15-29 35-10-11-26 19-25-25-22-15 14Z" fill="#164e63" stroke="#67e8f9" stroke-opacity=".45"/>`;
[[232,322],[211,354],[262,382],[186,403],[154,438],[235,430]].forEach(([x,y])=>{fao+=`<circle cx="${x}" cy="${y}" r="10" fill="#22d3ee" fill-opacity=".1"/><circle cx="${x}" cy="${y}" r="3" fill="#a5f3fc"/>`;});
fao+=rect(444,250,239,237)+text(462,277,'Information at a glance',11);
[54,72,41,91,66,108,125].forEach((h,i)=>{fao+=`<rect x="${462+i*29}" y="${450-h}" width="17" height="${h}" rx="3" fill="${i%2?'#818cf8':'#22d3ee'}" opacity=".75"/>`;});
fao+=`<path d="M460 452H668" stroke="#475569"/>`+text(462,470,'VISUAL EXAMPLE / NOT LIVE DATA',7,'#94a3b8');save('fao',frame('Food security &amp; nutrition',fao));

let lums=rect(35,158,648,190,'#132241','#334155')+text(60,187,'LUMS',15,'#a5b4fc','font-weight="bold"')+text(60,234,'Knowledge.',33,'#f8fafc')+text(60,274,'Connected.',33,'#a5f3fc')+text(60,310,'A unified digital campus.',11,'#cbd5e1');
lums+=`<g transform="translate(412 200)"><path d="m0 58 110-61 110 61-110 64Z" fill="#1e3a5f" stroke="#818cf8"/><path d="M25 61V127L110 166V101M195 61V127L110 166" fill="#0f1f3c" stroke="#64748b"/><path d="m25 61 85 40 85-40M110 101v65" stroke="#818cf8" fill="none"/><path d="m67 82 0 63m85-63v63" stroke="#475569"/></g>`;
['Discover programmes','Explore research','Connect with campus'].forEach((label,i)=>{lums+=rect(35+i*220,369,207,117)+text(53+i*220,399,'0'+(i+1),10,'#a5b4fc')+text(53+i*220,442,label,12,'#e2e8f0')+text(53+i*220,468,'EXPLORE →',8,'#a5f3fc');});save('lums',frame('Multi-domain academic portal',lums));

let agri=rect(35,155,430,331,'#071b1e','#23423c')+rect(485,155,198,331);
for(let row=0;row<5;row++)for(let col=0;col<5;col++)agri+=`<path d="M${70+col*65} ${183+row*56}l56 12-16 40-56-12Z" fill="${(row+col)%2?'#143e37':'#1d5040'}" stroke="#428269" stroke-width=".6"/>`;
[[147,232],[329,273],[216,362]].forEach(([x,y],i)=>{agri+=`<circle cx="${x}" cy="${y}" r="24" fill="#67e8f9" fill-opacity=".08"/><circle cx="${x}" cy="${y}" r="10" fill="#0e2930" stroke="#67e8f9"/><circle cx="${x}" cy="${y}" r="3" fill="#a5f3fc"/>`+text(x-15,y+40,'NODE 0'+(i+1),7,'#a5f3fc');});agri+=`<path d="m147 232 182 41-113 89" stroke="#67e8f9" stroke-dasharray="4 6" fill="none"/>`;
agri+=text(503,186,'CONNECTED OPERATIONS',8,'#a5f3fc');['Machinery','Field insights','Shared resources'].forEach((label,i)=>{agri+=rect(500,205+i*80,167,64,'#101e2e','#263a4d')+text(514,230+i*80,label,11)+text(514,250+i*80,'Explore system',9,'#94a3b8');});save('agri',frame('Agri Smart / connected agriculture',agri));

let warehouse=rect(35,155,648,95)+text(57,183,'OPERATIONS WORKSPACE',9,'#a5f3fc')+text(57,217,'A clearer view of your warehouse.',23,'#f8fafc');
for(let i=0;i<3;i++){warehouse+=rect(35+i*221,270,208,216)+text(53+i*221,299,['Receiving','Storage','Dispatch'][i],12,'#cbd5e1');for(let row=0;row<3;row++)warehouse+=rect(53+i*221,317+row*49,171,37,'#152139','#334155',5)+`<rect x="${65+i*221}" y="${329+row*49}" width="12" height="12" rx="2" fill="${i===1?'#818cf8':'#22d3ee'}" opacity=".6"/>`+text(87+i*221,339+row*49,['Workflow','Coordination','Visibility'][row],10,'#94a3b8');}save('warehouse',frame('Warehouse management',warehouse));

let map=`<rect width="600" height="300" fill="#0c1725"/><path d="M0 20 600 210M0 110 530 300M90 0 0 300M240 0 140 300M400 0 290 300M560 0 440 300" stroke="#25384a" stroke-width="12"/><path d="M0 20 600 210M0 110 530 300M90 0 0 300M240 0 140 300M400 0 290 300M560 0 440 300" stroke="#33495c" stroke-width="2"/>`;
map+=`<path d="M415 0h185v91l-43 32-55-50Z" fill="#0f302c" opacity=".8"/><circle cx="300" cy="132" r="50" fill="#06b6d4" fill-opacity=".06"/><circle cx="300" cy="132" r="28" fill="#06b6d4" fill-opacity=".1"/><path d="M300 109c-13 0-22 10-22 22 0 17 22 34 22 34s22-17 22-34c0-12-9-22-22-22Z" fill="#a5f3fc"/><circle cx="300" cy="131" r="7" fill="#0c1725"/>`+text(35,35,'ISLAMABAD',10,'#cbd5e1','letter-spacing="2"')+text(342,120,'E-11/2',14,'#f8fafc')+text(342,141,'CyberVision International',9,'#94a3b8')+text(35,198,'LOCATION ILLUSTRATION / NOT TO SCALE',7,'#94a3b8','letter-spacing="1"');save('islamabad-map',map,600,300);

const nodes=[];for(let i=0;i<74;i++){const y=1-2*i/73;const r=Math.sqrt(1-y*y);const a=i*Math.PI*(3-Math.sqrt(5));nodes.push([Math.cos(a)*r*192,y*192,Math.sin(a)*r*192]);}
let neural=defs+'<circle cx="300" cy="300" r="290" fill="url(#glow)"/>';
for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){const a=nodes[i],b=nodes[j];if(Math.hypot(a[0]-b[0],a[1]-b[1],a[2]-b[2])<81)neural+=`<path d="M${(300+a[0]).toFixed(1)} ${(300+a[1]).toFixed(1)}L${(300+b[0]).toFixed(1)} ${(300+b[1]).toFixed(1)}" stroke="#38bdf8" stroke-opacity="${a[2]>0?'.4':'.12'}"/>`;}
neural+='<ellipse cx="300" cy="300" rx="246" ry="117" stroke="#818cf8" stroke-opacity=".6" fill="none" transform="rotate(-35 300 300)"/><ellipse cx="300" cy="300" rx="254" ry="127" stroke="#67e8f9" stroke-opacity=".3" fill="none" transform="rotate(60 300 300)"/>';
nodes.forEach(([x,y,z])=>{neural+=`<circle cx="${(300+x).toFixed(1)}" cy="${(300+y).toFixed(1)}" r="${z>0?2.5:1.5}" fill="#a5f3fc" opacity="${z>0?'.95':'.35'}"/>`;});save('neural-network',neural,600,600);
console.log('Generated 6 original SVG assets.');
