'use client'
import { useState, useMemo, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

const D=[
  {n:'Formation Bio',s:'Drug Development AI',sec:'Health',sc:'#16a34a',st:'Series C',r:248,v:1100,e:320,y:2018,pf:false,inv:['a16z Bio','Sequoia','Google Ventures']},
  {n:'EvenUp',s:'Personal Injury Law',sec:'Legal',sc:'#7c3aed',st:'Series C',r:135,v:600,e:290,y:2019,pf:false,inv:['SignalFire','Bessemer','Accel']},
  {n:'Prosper',s:'RCM Platform',sec:'Health',sc:'#16a34a',st:'Series B',r:127,v:480,e:210,y:2020,pf:true,inv:['Emergence Capital','a16z','GV']},
  {n:'Harper',s:'Commercial Insurance',sec:'Financial',sc:'#2563eb',st:'Series B',r:110,v:450,e:230,y:2019,pf:true,inv:['Emergence Capital','Ribbit Capital','QED']},
  {n:'Crosby',s:'Contract Lifecycle',sec:'Legal',sc:'#7c3aed',st:'Series B',r:95,v:380,e:180,y:2019,pf:true,inv:['Emergence Capital','Tiger Global','Salesforce Ventures']},
  {n:'Scale Medicine',s:'Precision Medicine',sec:'Health',sc:'#16a34a',st:'Series B',r:89,v:360,e:145,y:2020,pf:true,inv:['Emergence Capital','Flagship Pioneering']},
  {n:'Mechanical Orchard',s:'Legacy Modernization',sec:'Software',sc:'#d97706',st:'Series B',r:75,v:310,e:190,y:2020,pf:true,inv:['Emergence Capital','Salesforce Ventures']},
  {n:'Irving',s:'M&A Diligence',sec:'Legal',sc:'#7c3aed',st:'Series A',r:45,v:190,e:95,y:2021,pf:true,inv:['Emergence Capital','Index Ventures']},
  {n:'LightTable',s:'Construction AI',sec:'Industrial',sc:'#b45309',st:'Series A',r:42,v:170,e:88,y:2021,pf:false,inv:['Lux Capital','Founders Fund']},
  {n:'Tessera',s:'API Integration',sec:'Software',sc:'#d97706',st:'Series A',r:41,v:165,e:90,y:2021,pf:false,inv:['Sequoia','NEA']},
  {n:'AirOps',s:'GTM Automation',sec:'GTM',sc:'#0891b2',st:'Series A',r:38,v:155,e:80,y:2021,pf:false,inv:['Gradient Ventures','Boldstart']},
  {n:'XBOW',s:'Autonomous Pentesting',sec:'Security',sc:'#dc2626',st:'Series A',r:35,v:150,e:75,y:2022,pf:false,inv:['Sequoia','Khosla Ventures']},
  {n:'Outbound AI',s:'Voice AI',sec:'Health',sc:'#16a34a',st:'Series A',r:34,v:140,e:85,y:2021,pf:false,inv:['General Catalyst','Bessemer']},
  {n:'Tribe AI',s:'AI Consulting',sec:'AI Impl.',sc:'#15803d',st:'Series A',r:33,v:130,e:120,y:2019,pf:true,inv:['Emergence Capital','Homebrew']},
  {n:'Rivet',s:'Accounting AI',sec:'Financial',sc:'#2563eb',st:'Series A',r:31,v:120,e:70,y:2021,pf:true,inv:['Emergence Capital','Accel']},
  {n:'Rubie',s:'QA Automation',sec:'Software',sc:'#d97706',st:'Series A',r:28,v:110,e:65,y:2022,pf:true,inv:['Emergence Capital','Boldstart']},
  {n:'Norm AI',s:'Regulatory Compliance',sec:'Legal',sc:'#7c3aed',st:'Series A',r:27,v:110,e:60,y:2022,pf:false,inv:['Coatue','Index Ventures']},
  {n:'Docshield',s:'Document Automation',sec:'Financial',sc:'#2563eb',st:'Series A',r:22,v:90,e:48,y:2022,pf:false,inv:['Gradient Ventures','Fin Capital']},
  {n:'RunSybil',s:'AI Red Teaming',sec:'Security',sc:'#dc2626',st:'Seed',r:12,v:55,e:28,y:2023,pf:true,inv:['Emergence Capital','Y Combinator']},
  {n:'Evidenza',s:'Market Research AI',sec:'GTM',sc:'#0891b2',st:'Seed',r:8,v:38,e:22,y:2023,pf:false,inv:['Y Combinator','Pear VC']},
]

const FM:Record<string,{type:string,tier:number,focus:string[],aum:string}>={
  'Emergence Capital':{type:'VC',tier:1,focus:['Health AI','Legal AI','Financial AI'],aum:'$2.8B'},
  'a16z Bio':{type:'CVC',tier:1,focus:['Bio','Health AI'],aum:'$3B'},
  'a16z':{type:'VC',tier:1,focus:['AI/ML','Enterprise'],aum:'$35B'},
  'Sequoia':{type:'VC',tier:1,focus:['Enterprise','AI'],aum:'$85B'},
  'Google Ventures':{type:'CVC',tier:1,focus:['AI','Life Sciences'],aum:'$8B'},
  'GV':{type:'CVC',tier:1,focus:['AI'],aum:'$8B'},
  'SignalFire':{type:'VC',tier:2,focus:['Data','AI'],aum:'$1.5B'},
  'Bessemer':{type:'VC',tier:1,focus:['Cloud','Security'],aum:'$20B'},
  'Accel':{type:'VC',tier:1,focus:['Enterprise SaaS'],aum:'$14B'},
  'Ribbit Capital':{type:'VC',tier:2,focus:['Fintech'],aum:'$2.4B'},
  'QED':{type:'VC',tier:2,focus:['Fintech'],aum:'$1.8B'},
  'Tiger Global':{type:'Hedge Fund',tier:1,focus:['SaaS'],aum:'$50B'},
  'Salesforce Ventures':{type:'CVC',tier:1,focus:['Enterprise SaaS'],aum:'$3B'},
  'Flagship Pioneering':{type:'VC',tier:1,focus:['Bio'],aum:'$4B'},
  'Index Ventures':{type:'VC',tier:1,focus:['Enterprise'],aum:'$10B'},
  'Lux Capital':{type:'VC',tier:2,focus:['Deep Tech'],aum:'$4.5B'},
  'Founders Fund':{type:'VC',tier:1,focus:['Deep Tech'],aum:'$11B'},
  'NEA':{type:'VC',tier:1,focus:['Enterprise'],aum:'$25B'},
  'Gradient Ventures':{type:'CVC',tier:2,focus:['AI-first'],aum:'$1B'},
  'Boldstart':{type:'VC',tier:2,focus:['Dev Tools'],aum:'$0.4B'},
  'Khosla Ventures':{type:'VC',tier:1,focus:['Deep Tech','AI'],aum:'$15B'},
  'General Catalyst':{type:'VC',tier:1,focus:['Health','Enterprise'],aum:'$20B'},
  'Homebrew':{type:'VC',tier:2,focus:['Enterprise'],aum:'$0.3B'},
  'Coatue':{type:'Hedge Fund',tier:1,focus:['Tech','AI'],aum:'$50B'},
  'Fin Capital':{type:'VC',tier:2,focus:['Fintech'],aum:'$0.7B'},
  'Y Combinator':{type:'Accelerator',tier:1,focus:['All sectors'],aum:'N/A'},
  'Pear VC':{type:'VC',tier:2,focus:['Enterprise'],aum:'$0.5B'},
}

function fmt(n:number){if(!n)return'—';if(n>=1000)return`$${(n/1000).toFixed(1)}B`;return`$${n}M`}
function ini(n:string){return n.split(' ').map((w:string)=>w[0]).join('').slice(0,2).toUpperCase()}
function toSlug(n:string){return n.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}

function buildFunds(){
  const m:Record<string,any>={}
  D.forEach(co=>{co.inv.forEach(inv=>{
    if(!m[inv]) m[inv]={n:inv,cos:[],raised:0,...(FM[inv]||{type:'VC',tier:2,focus:[],aum:'N/A'})}
    m[inv].cos.push(co);m[inv].raised+=co.r
  })})
  return Object.values(m).sort((a:any,b:any)=>b.cos.length-a.cos.length)
}
const FUNDS=buildFunds()

const CSS=`
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}body{font-family:'DM Sans',sans-serif}
  html[data-theme=dark],html:not([data-theme]){--bg:#0a0a0f;--bg2:#111118;--bg3:#1a1a24;--border:rgba(255,255,255,.07);--border2:rgba(255,255,255,.13);--text:#f0f4fa;--t2:#c8d4e8;--t3:rgba(200,212,232,.42);--ac:#2563EB;--ac-bg:rgba(37,99,235,.1);--ac-b:rgba(37,99,235,.25);--ac-t:#7aaff7}
  html[data-theme=light]{--bg:#f4f2ed;--bg2:#ffffff;--bg3:#f0ede6;--border:rgba(0,0,0,.08);--border2:rgba(0,0,0,.16);--text:#0d0d0d;--t2:#2a2a2a;--t3:rgba(10,10,10,.42);--ac:#2563EB;--ac-bg:rgba(37,99,235,.08);--ac-b:rgba(37,99,235,.22);--ac-t:#1d4ed8}
  .nav-item{display:flex;align-items:center;gap:9px;padding:7px 8px;border-radius:6px;cursor:pointer;color:var(--t3);transition:all .12s;font-size:13px;border-left:2px solid transparent;margin-bottom:1px}
  .nav-item:hover{background:rgba(37,99,235,.06);color:var(--t2)}
  .nav-item.active{background:var(--ac-bg);color:var(--ac-t);border-left-color:var(--ac);font-weight:500}
  .fund-card:hover{border-color:var(--border2)!important}
  tbody tr:hover{background:rgba(37,99,235,.04)}
  .ich:hover{border-color:var(--border2)!important;color:var(--text)!important}
  input::placeholder{color:var(--t3)}button:focus{outline:none}
  ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:var(--border2);border-radius:2px}::-webkit-scrollbar-track{background:transparent}
`

export default function FundsPage(){
  const router=useRouter()
  const [q,setQ]=useState('')
  const [view,setView]=useState<'g'|'t'>('g')
  const [theme,setTheme]=useState<'dark'|'light'>('dark')
  const [wlSize,setWlSize]=useState(0)

  useEffect(()=>{
    const s=localStorage.getItem('theme') as 'dark'|'light'|null
    const t=s||'dark';setTheme(t);document.documentElement.setAttribute('data-theme',t)
    try{setWlSize(JSON.parse(localStorage.getItem('wl_companies')||'[]').length)}catch{}
  },[])

  function toggleTheme(){
    const next=theme==='dark'?'light':'dark'
    setTheme(next);document.documentElement.setAttribute('data-theme',next);localStorage.setItem('theme',next)
  }

  const funds=useMemo(()=>{
    if(!q) return FUNDS
    const lq=q.toLowerCase()
    return FUNDS.filter((f:any)=>f.n.toLowerCase().includes(lq)||f.type.toLowerCase().includes(lq)||(f.focus||[]).some((x:string)=>x.toLowerCase().includes(lq)))
  },[q])

  return(
    <>
      <style>{CSS}</style>
      <div data-theme={theme} style={{height:'100vh',display:'flex',overflow:'hidden',background:'var(--bg)',color:'var(--text)'}}>

        {/* SIDEBAR */}
        <aside style={{width:220,flexShrink:0,background:'var(--bg2)',borderRight:'1px solid var(--border)',display:'flex',flexDirection:'column',height:'100vh'}}>
          <div style={{display:'flex',alignItems:'center',gap:8,padding:'14px 16px 12px',borderBottom:'1px solid var(--border)',cursor:'pointer'}} onClick={()=>router.push('/')}>
            <div style={{width:28,height:28,borderRadius:6,background:'var(--ac)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:800,color:'#fff',flexShrink:0}}>EM</div>
            <div><div style={{fontSize:12,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--text)'}}>EmergentMap</div><div style={{fontSize:9,color:'var(--t3)'}}>AI-Native Services</div></div>
          </div>
          <div style={{padding:'12px 12px 4px'}}>
            <div style={{fontSize:9,fontWeight:700,letterSpacing:'.12em',textTransform:'uppercase',color:'rgba(200,212,232,.2)',padding:'0 6px',marginBottom:4}}>Platform</div>
            {[['⊞','Dashboard','/dashboard',false],['◈','Funds','/funds',true],['☆','Watchlist','/watchlist',false]].map(([icon,label,href,active])=>(
              <div key={String(label)} className={`nav-item${active?' active':''}`} onClick={()=>router.push(String(href))}>
                <span style={{fontSize:13,width:16,textAlign:'center',flexShrink:0}}>{icon}</span>
                <span style={{flex:1}}>{label}</span>
                {label==='Watchlist'&&wlSize>0&&<span style={{fontSize:9,background:'var(--ac-bg)',padding:'2px 6px',borderRadius:10,color:'var(--ac-t)'}}>{wlSize}</span>}
              </div>
            ))}
          </div>
          <div style={{marginTop:'auto',padding:12,borderTop:'1px solid var(--border)',display:'flex',flexDirection:'column',gap:8}}>
            <button onClick={toggleTheme} style={{width:'100%',padding:'7px',borderRadius:6,border:'1px solid var(--border)',background:'var(--bg3)',color:'var(--t2)',fontSize:12,cursor:'pointer',fontFamily:"'DM Sans',sans-serif",display:'flex',alignItems:'center',justifyContent:'center',gap:6}}>
              {theme==='dark'?'☀ Light mode':'☾ Dark mode'}
            </button>
            <button onClick={()=>router.push('/auth?mode=signup')} style={{width:'100%',padding:8,borderRadius:6,background:'var(--ac)',color:'#fff',border:'none',fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:700,cursor:'pointer'}}>Upgrade to Pro →</button>
          </div>
        </aside>

        {/* MAIN */}
        <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden'}}>
          <div style={{height:48,display:'flex',alignItems:'center',padding:'0 20px',background:'var(--bg2)',borderBottom:'1px solid var(--border)',flexShrink:0}}>
            <div style={{fontSize:14,fontWeight:600,color:'var(--text)'}}>Funds & Investors</div>
            <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:8}}>
              <div style={{position:'relative'}}>
                <span style={{position:'absolute',left:8,top:'50%',transform:'translateY(-50%)',fontSize:13,color:'var(--t3)'}}>⌕</span>
                <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search funds…" style={{padding:'6px 10px 6px 26px',border:'1px solid var(--border)',borderRadius:7,background:'var(--bg3)',color:'var(--text)',fontSize:12,fontFamily:"'DM Sans',sans-serif",width:180}}/>
              </div>
              <div style={{display:'flex',background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:7,overflow:'hidden'}}>
                {(['g','t'] as const).map(v=>(
                  <button key={v} onClick={()=>setView(v)} style={{padding:'6px 10px',fontSize:13,cursor:'pointer',color:view===v?'var(--ac-t)':'var(--t3)',background:view===v?'var(--ac-bg)':'transparent',border:'none',transition:'all .12s'}}>{v==='g'?'⊞':'☰'}</button>
                ))}
              </div>
              <span style={{fontSize:12,color:'var(--t3)',fontFamily:"'DM Mono',monospace"}}>{funds.length}</span>
            </div>
          </div>

          <div style={{flex:1,padding:'18px 20px',overflow:'auto'}}>

            {/* GRID VIEW */}
            {view==='g'&&(
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:10}}>
                {funds.map((f:any)=>(
                  <div key={f.n} className="fund-card" onClick={()=>router.push('/fund/'+toSlug(f.n))} style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:10,padding:'16px 18px',cursor:'pointer',transition:'border-color .15s'}}>
                    <div style={{display:'flex',alignItems:'flex-start',gap:10,marginBottom:12}}>
                      <div style={{width:36,height:36,borderRadius:8,background:'var(--ac-bg)',border:'1px solid var(--ac-b)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,color:'var(--ac-t)',flexShrink:0}}>{ini(f.n)}</div>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:13,fontWeight:600,color:'var(--text)',marginBottom:2}}>{f.n}</div>
                        <div style={{display:'flex',gap:5}}>
                          <span style={{fontSize:10,padding:'2px 7px',borderRadius:4,background:'var(--bg3)',border:'1px solid var(--border)',color:'var(--t3)'}}>{f.type}</span>
                          <span style={{fontSize:10,padding:'2px 7px',borderRadius:4,background:'var(--bg3)',border:'1px solid var(--border)',color:'var(--t3)'}}>Tier {f.tier}</span>
                        </div>
                      </div>
                      <div style={{fontSize:13,fontWeight:700,color:'var(--ac-t)',fontFamily:"'DM Mono',monospace"}}>{fmt(f.raised)}</div>
                    </div>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,marginBottom:12}}>
                      <div style={{background:'var(--bg3)',borderRadius:6,padding:'8px 10px'}}>
                        <div style={{fontSize:15,fontWeight:600,color:'var(--text)',fontFamily:"'DM Mono',monospace"}}>{f.cos.length}</div>
                        <div style={{fontSize:10,color:'var(--t3)',textTransform:'uppercase',letterSpacing:'.06em',marginTop:1}}>AI Companies</div>
                      </div>
                      <div style={{background:'var(--bg3)',borderRadius:6,padding:'8px 10px'}}>
                        <div style={{fontSize:15,fontWeight:600,color:'var(--text)',fontFamily:"'DM Mono',monospace"}}>{f.aum}</div>
                        <div style={{fontSize:10,color:'var(--t3)',textTransform:'uppercase',letterSpacing:'.06em',marginTop:1}}>AUM</div>
                      </div>
                    </div>
                    <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
                      {f.cos.slice(0,3).map((c:any)=>(
                        <span key={c.n} style={{padding:'2px 7px',borderRadius:4,fontSize:10,background:'var(--bg3)',border:'1px solid var(--border)',color:'var(--t3)'}}>{c.n}</span>
                      ))}
                      {f.cos.length>3&&<span style={{padding:'2px 7px',borderRadius:4,fontSize:10,background:'var(--bg3)',border:'1px solid var(--border)',color:'var(--t3)'}}>+{f.cos.length-3}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TABLE VIEW */}
            {view==='t'&&(
              <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:10,overflow:'hidden'}}>
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead style={{position:'sticky',top:0,zIndex:5,background:'var(--bg3)'}}>
                    <tr style={{borderBottom:'1px solid var(--border)'}}>
                      {['Fund','Type','Tier','AI Companies','Deployed','AUM','Focus'].map(h=>(
                        <th key={h} style={{padding:'9px 14px',textAlign:'left',fontSize:9,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--t3)',whiteSpace:'nowrap'}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {funds.map((f:any)=>(
                      <tr key={f.n} onClick={()=>router.push('/fund/'+toSlug(f.n))} style={{borderBottom:'1px solid var(--border)',cursor:'pointer',transition:'background .1s'}}>
                        <td style={{padding:'11px 14px'}}>
                          <div style={{display:'flex',alignItems:'center',gap:8}}>
                            <div style={{width:28,height:28,borderRadius:7,background:'var(--ac-bg)',border:'1px solid var(--ac-b)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:700,color:'var(--ac-t)',flexShrink:0}}>{ini(f.n)}</div>
                            <div style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>{f.n}</div>
                          </div>
                        </td>
                        <td style={{padding:'11px 14px',fontSize:12,color:'var(--t2)'}}>{f.type}</td>
                        <td style={{padding:'11px 14px'}}><span style={{padding:'2px 7px',borderRadius:4,fontSize:10,fontWeight:600,background:'var(--ac-bg)',color:'var(--ac-t)',border:'1px solid var(--ac-b)'}}>Tier {f.tier}</span></td>
                        <td style={{padding:'11px 14px',fontSize:13,fontWeight:600,color:'var(--text)',fontFamily:"'DM Mono',monospace"}}>{f.cos.length}</td>
                        <td style={{padding:'11px 14px',fontSize:13,fontWeight:600,color:'var(--ac-t)',fontFamily:"'DM Mono',monospace"}}>{fmt(f.raised)}</td>
                        <td style={{padding:'11px 14px',fontSize:12,color:'var(--t2)',fontFamily:"'DM Mono',monospace"}}>{f.aum}</td>
                        <td style={{padding:'11px 14px'}}>
                          <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
                            {(f.focus||[]).slice(0,2).map((x:string)=>(
                              <span key={x} style={{padding:'2px 7px',borderRadius:4,fontSize:10,background:'var(--bg3)',border:'1px solid var(--border)',color:'var(--t3)'}}>{x}</span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
