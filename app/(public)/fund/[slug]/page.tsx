'use client'
import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'

const D=[
  {n:'Formation Bio',s:'Drug Development AI',sec:'Health',sc:'#16a34a',st:'Series C',r:248,v:1100,e:320,y:2018,date:'Mar 2026',pf:false,inv:['a16z Bio','Sequoia','Google Ventures']},
  {n:'EvenUp',s:'Personal Injury Law',sec:'Legal',sc:'#7c3aed',st:'Series C',r:135,v:600,e:290,y:2019,date:'Feb 2026',pf:false,inv:['SignalFire','Bessemer','Accel']},
  {n:'Prosper',s:'RCM Platform',sec:'Health',sc:'#16a34a',st:'Series B',r:127,v:480,e:210,y:2020,date:'Feb 2026',pf:true,inv:['Emergence Capital','a16z','GV']},
  {n:'Harper',s:'Commercial Insurance',sec:'Financial',sc:'#2563eb',st:'Series B',r:110,v:450,e:230,y:2019,date:'Jan 2026',pf:true,inv:['Emergence Capital','Ribbit Capital','QED']},
  {n:'Crosby',s:'Contract Lifecycle',sec:'Legal',sc:'#7c3aed',st:'Series B',r:95,v:380,e:180,y:2019,date:'Jan 2026',pf:true,inv:['Emergence Capital','Tiger Global','Salesforce Ventures']},
  {n:'Scale Medicine',s:'Precision Medicine',sec:'Health',sc:'#16a34a',st:'Series B',r:89,v:360,e:145,y:2020,date:'Dec 2025',pf:true,inv:['Emergence Capital','Flagship Pioneering']},
  {n:'Mechanical Orchard',s:'Legacy Modernization',sec:'Software',sc:'#d97706',st:'Series B',r:75,v:310,e:190,y:2020,date:'Dec 2025',pf:true,inv:['Emergence Capital','Salesforce Ventures']},
  {n:'Irving',s:'M&A Diligence',sec:'Legal',sc:'#7c3aed',st:'Series A',r:45,v:190,e:95,y:2021,date:'Nov 2025',pf:true,inv:['Emergence Capital','Index Ventures']},
  {n:'LightTable',s:'Construction AI',sec:'Industrial',sc:'#b45309',st:'Series A',r:42,v:170,e:88,y:2021,date:'Nov 2025',pf:false,inv:['Lux Capital','Founders Fund']},
  {n:'Tessera',s:'API Integration',sec:'Software',sc:'#d97706',st:'Series A',r:41,v:165,e:90,y:2021,date:'Oct 2025',pf:false,inv:['Sequoia','NEA']},
  {n:'AirOps',s:'GTM Automation',sec:'GTM',sc:'#0891b2',st:'Series A',r:38,v:155,e:80,y:2021,date:'Oct 2025',pf:false,inv:['Gradient Ventures','Boldstart']},
  {n:'XBOW',s:'Autonomous Pentesting',sec:'Security',sc:'#dc2626',st:'Series A',r:35,v:150,e:75,y:2022,date:'Sep 2025',pf:false,inv:['Sequoia','Khosla Ventures']},
  {n:'Outbound AI',s:'Voice AI',sec:'Health',sc:'#16a34a',st:'Series A',r:34,v:140,e:85,y:2021,date:'Sep 2025',pf:false,inv:['General Catalyst','Bessemer']},
  {n:'Tribe AI',s:'AI Consulting',sec:'AI Impl.',sc:'#15803d',st:'Series A',r:33,v:130,e:120,y:2019,date:'Aug 2025',pf:true,inv:['Emergence Capital','Homebrew']},
  {n:'Rivet',s:'Accounting AI',sec:'Financial',sc:'#2563eb',st:'Series A',r:31,v:120,e:70,y:2021,date:'Aug 2025',pf:true,inv:['Emergence Capital','Accel']},
  {n:'Rubie',s:'QA Automation',sec:'Software',sc:'#d97706',st:'Series A',r:28,v:110,e:65,y:2022,date:'Jul 2025',pf:true,inv:['Emergence Capital','Boldstart']},
  {n:'Norm AI',s:'Regulatory Compliance',sec:'Legal',sc:'#7c3aed',st:'Series A',r:27,v:110,e:60,y:2022,date:'Jul 2025',pf:false,inv:['Coatue','Index Ventures']},
  {n:'Docshield',s:'Document Automation',sec:'Financial',sc:'#2563eb',st:'Series A',r:22,v:90,e:48,y:2022,date:'Jun 2025',pf:false,inv:['Gradient Ventures','Fin Capital']},
  {n:'RunSybil',s:'AI Red Teaming',sec:'Security',sc:'#dc2626',st:'Seed',r:12,v:55,e:28,y:2023,date:'May 2025',pf:true,inv:['Emergence Capital','Y Combinator']},
  {n:'Evidenza',s:'Market Research AI',sec:'GTM',sc:'#0891b2',st:'Seed',r:8,v:38,e:22,y:2023,date:'Apr 2025',pf:false,inv:['Y Combinator','Pear VC']},
]
const FM:Record<string,{type:string,tier:number,focus:string[],aum:string,hq:string}>={
  'Emergence Capital':{type:'VC',tier:1,focus:['Health AI','Legal AI','Financial AI','Enterprise SaaS'],aum:'$2.8B',hq:'San Francisco'},
  'a16z Bio':{type:'CVC',tier:1,focus:['Bio','Health AI'],aum:'$3B',hq:'Menlo Park'},
  'a16z':{type:'VC',tier:1,focus:['AI/ML','Enterprise','Crypto'],aum:'$35B',hq:'Menlo Park'},
  'Sequoia':{type:'VC',tier:1,focus:['Enterprise','AI','Consumer'],aum:'$85B',hq:'Menlo Park'},
  'Google Ventures':{type:'CVC',tier:1,focus:['AI','Life Sciences','Enterprise'],aum:'$8B',hq:'Mountain View'},
  'GV':{type:'CVC',tier:1,focus:['AI','Life Sciences'],aum:'$8B',hq:'Mountain View'},
  'SignalFire':{type:'VC',tier:2,focus:['Data','AI','Developer Tools'],aum:'$1.5B',hq:'San Francisco'},
  'Bessemer':{type:'VC',tier:1,focus:['Cloud','Security','Consumer'],aum:'$20B',hq:'Redwood City'},
  'Accel':{type:'VC',tier:1,focus:['Enterprise SaaS','Security'],aum:'$14B',hq:'Palo Alto'},
  'Ribbit Capital':{type:'VC',tier:2,focus:['Fintech','Financial Services'],aum:'$2.4B',hq:'Palo Alto'},
  'QED':{type:'VC',tier:2,focus:['Fintech','Insurtech'],aum:'$1.8B',hq:'Alexandria'},
  'Tiger Global':{type:'Hedge Fund',tier:1,focus:['SaaS','Consumer'],aum:'$50B',hq:'New York'},
  'Salesforce Ventures':{type:'CVC',tier:1,focus:['Enterprise SaaS','AI'],aum:'$3B',hq:'San Francisco'},
  'Flagship Pioneering':{type:'VC',tier:1,focus:['Bio','Life Sciences'],aum:'$4B',hq:'Cambridge'},
  'Index Ventures':{type:'VC',tier:1,focus:['Enterprise','Consumer'],aum:'$10B',hq:'San Francisco'},
  'Lux Capital':{type:'VC',tier:2,focus:['Deep Tech','Frontier'],aum:'$4.5B',hq:'New York'},
  'Founders Fund':{type:'VC',tier:1,focus:['Deep Tech','AI'],aum:'$11B',hq:'San Francisco'},
  'NEA':{type:'VC',tier:1,focus:['Enterprise','Healthcare'],aum:'$25B',hq:'Chevy Chase'},
  'Gradient Ventures':{type:'CVC',tier:2,focus:['AI-first Startups'],aum:'$1B',hq:'Mountain View'},
  'Boldstart':{type:'VC',tier:2,focus:['Dev Tools','Enterprise'],aum:'$0.4B',hq:'New York'},
  'Khosla Ventures':{type:'VC',tier:1,focus:['Deep Tech','AI','Climate'],aum:'$15B',hq:'Menlo Park'},
  'General Catalyst':{type:'VC',tier:1,focus:['Health','Enterprise'],aum:'$20B',hq:'Cambridge'},
  'Homebrew':{type:'VC',tier:2,focus:['Enterprise'],aum:'$0.3B',hq:'San Francisco'},
  'Coatue':{type:'Hedge Fund',tier:1,focus:['Tech','AI'],aum:'$50B',hq:'New York'},
  'Fin Capital':{type:'VC',tier:2,focus:['Fintech'],aum:'$0.7B',hq:'San Francisco'},
  'Y Combinator':{type:'Accelerator',tier:1,focus:['All Sectors'],aum:'N/A',hq:'Mountain View'},
  'Pear VC':{type:'VC',tier:2,focus:['Enterprise'],aum:'$0.5B',hq:'Palo Alto'},
}

function fmt(n:number){if(!n)return'—';if(n>=1000)return`$${(n/1000).toFixed(1)}B`;return`$${n}M`}
function ini(n:string){return n.split(' ').map((w:string)=>w[0]).join('').slice(0,2).toUpperCase()}
function toSlug(n:string){return n.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function getAllFundNames(){const s=new Set<string>();D.forEach(co=>co.inv.forEach(i=>s.add(i)));return Array.from(s)}

const CSS=`
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}body{font-family:'DM Sans',sans-serif}
  html[data-theme=dark],html:not([data-theme]){--bg:#0a0a0f;--bg2:#111118;--bg3:#1a1a24;--border:rgba(255,255,255,.07);--border2:rgba(255,255,255,.13);--text:#f0f4fa;--t2:#c8d4e8;--t3:rgba(200,212,232,.42);--ac:#2563EB;--ac-bg:rgba(37,99,235,.1);--ac-b:rgba(37,99,235,.25);--ac-t:#7aaff7}
  html[data-theme=light]{--bg:#f4f2ed;--bg2:#ffffff;--bg3:#f0ede6;--border:rgba(0,0,0,.08);--border2:rgba(0,0,0,.16);--text:#0d0d0d;--t2:#2a2a2a;--t3:rgba(10,10,10,.42);--ac:#2563EB;--ac-bg:rgba(37,99,235,.08);--ac-b:rgba(37,99,235,.22);--ac-t:#1d4ed8}
  .nav-item{display:flex;align-items:center;gap:9px;padding:7px 8px;border-radius:6px;cursor:pointer;color:var(--t3);transition:all .12s;font-size:13px;border-left:2px solid transparent;margin-bottom:1px}
  .nav-item:hover{background:rgba(37,99,235,.06);color:var(--t2)}
  .nav-item.active{background:var(--ac-bg);color:var(--ac-t);border-left-color:var(--ac);font-weight:500}
  .co-row:hover{background:rgba(37,99,235,.04)}
  .co-link:hover{border-color:var(--border2)!important;color:var(--text)!important}
  ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:var(--border2);border-radius:2px}
`

export default function FundPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=use(params)
  const router=useRouter()
  const [theme,setTheme]=useState<'dark'|'light'>('dark')

  const allNames=getAllFundNames()
  const fundName=allNames.find(n=>toSlug(n)===slug)
  const meta=fundName?FM[fundName]:null
  const cos=D.filter(co=>co.inv.includes(fundName||''))
  const totalRaised=cos.reduce((s,c)=>s+c.r,0)

  useEffect(()=>{
    const s=localStorage.getItem('theme') as 'dark'|'light'|null
    const t=s||'dark';setTheme(t);document.documentElement.setAttribute('data-theme',t)
  },[])

  function toggleTheme(){
    const next=theme==='dark'?'light':'dark'
    setTheme(next);document.documentElement.setAttribute('data-theme',next);localStorage.setItem('theme',next)
  }

  const roundColor=(st:string)=>{
    if(st==='Series C') return{bg:'rgba(124,58,237,.12)',c:'#a78bfa',b:'rgba(124,58,237,.25)'}
    if(st==='Series B') return{bg:'rgba(37,99,235,.1)',c:'#7aaff7',b:'rgba(37,99,235,.22)'}
    if(st==='Series A') return{bg:'rgba(16,185,129,.1)',c:'#6ee7b7',b:'rgba(16,185,129,.22)'}
    return{bg:'rgba(245,158,11,.1)',c:'#fcd34d',b:'rgba(245,158,11,.22)'}
  }

  if(!fundName) return(
    <>
      <style>{CSS}</style>
      <div data-theme="dark" style={{height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'var(--bg)',color:'var(--t3)'}}>
        <div style={{textAlign:'center'}}>
          <div style={{fontSize:48,marginBottom:16}}>🏦</div>
          <div style={{fontSize:16,fontWeight:500,color:'var(--text)',marginBottom:8}}>Fund not found</div>
          <button onClick={()=>router.push('/funds')} style={{padding:'8px 20px',borderRadius:7,background:'var(--ac)',color:'#fff',border:'none',fontSize:13,cursor:'pointer',fontFamily:"'DM Sans',sans-serif"}}>← Back to Funds</button>
        </div>
      </div>
    </>
  )

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
            {([['⊞','Dashboard','/dashboard'],['◈','Funds','/funds'],['☆','Watchlist','/watchlist']] as [string,string,string][]).map(([icon,label,href])=>(
              <div key={label} className="nav-item" onClick={()=>router.push(href)}>
                <span style={{fontSize:13,width:16,textAlign:'center',flexShrink:0}}>{icon}</span>
                <span style={{flex:1}}>{label}</span>
              </div>
            ))}
          </div>
          <div style={{marginTop:'auto',padding:12,borderTop:'1px solid var(--border)',display:'flex',flexDirection:'column',gap:8}}>
            <button onClick={toggleTheme} style={{width:'100%',padding:'7px',borderRadius:6,border:'1px solid var(--border)',background:'var(--bg3)',color:'var(--t2)',fontSize:12,cursor:'pointer',fontFamily:"'DM Sans',sans-serif",display:'flex',alignItems:'center',justifyContent:'center',gap:6}}>
              {theme==='dark'?'☀ Light mode':'☾ Dark mode'}
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden'}}>
          <div style={{height:48,display:'flex',alignItems:'center',padding:'0 20px',background:'var(--bg2)',borderBottom:'1px solid var(--border)',flexShrink:0,gap:8}}>
            <button onClick={()=>router.back()} style={{padding:'5px 10px',border:'1px solid var(--border)',borderRadius:6,background:'transparent',color:'var(--t3)',fontSize:12,cursor:'pointer',fontFamily:"'DM Sans',sans-serif"}}>← Back</button>
            <div style={{fontSize:14,fontWeight:600,color:'var(--text)'}}>{fundName}</div>
            {meta&&<span style={{padding:'2px 8px',borderRadius:4,fontSize:10,background:'var(--ac-bg)',color:'var(--ac-t)',border:'1px solid var(--ac-b)'}}>{meta.type} · Tier {meta.tier}</span>}
          </div>

          <div style={{flex:1,overflow:'auto',padding:'24px'}}>
            <div style={{maxWidth:900,margin:'0 auto'}}>

              {/* HEADER */}
              <div style={{display:'flex',alignItems:'flex-start',gap:16,marginBottom:20,padding:'20px 24px',background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:12}}>
                <div style={{width:52,height:52,borderRadius:12,background:'var(--ac-bg)',border:'1px solid var(--ac-b)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,fontWeight:800,color:'var(--ac-t)',flexShrink:0}}>{ini(fundName)}</div>
                <div style={{flex:1}}>
                  <h1 style={{fontSize:22,fontWeight:700,color:'var(--text)',marginBottom:6}}>{fundName}</h1>
                  {meta&&<div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                    {[meta.type,`Tier ${meta.tier}`,meta.hq].map(t=>(
                      <span key={t} style={{fontSize:11,padding:'3px 9px',borderRadius:5,background:'var(--bg3)',border:'1px solid var(--border)',color:'var(--t2)'}}>{t}</span>
                    ))}
                  </div>}
                </div>
              </div>

              {/* STATS */}
              <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginBottom:20}}>
                {[
                  {l:'AI Companies',v:String(cos.length),hl:false},
                  {l:'Total Deployed',v:fmt(totalRaised),hl:true},
                  {l:'AUM',v:meta?.aum||'N/A',hl:false},
                  {l:'Focus Areas',v:String(meta?.focus?.length||0),hl:false},
                ].map(({l,v,hl})=>(
                  <div key={l} style={{padding:'12px 14px',background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:9}}>
                    <div style={{fontSize:9,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--t3)',marginBottom:5}}>{l}</div>
                    <div style={{fontSize:17,fontWeight:600,color:hl?'var(--ac-t)':'var(--text)',fontFamily:"'DM Mono',monospace"}}>{v}</div>
                  </div>
                ))}
              </div>

              {/* FOCUS */}
              {meta?.focus&&meta.focus.length>0&&(
                <div style={{marginBottom:20}}>
                  <h2 style={{fontSize:14,fontWeight:600,color:'var(--text)',marginBottom:10}}>Focus Areas</h2>
                  <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                    {meta.focus.map(f=>(
                      <span key={f} style={{padding:'5px 12px',borderRadius:20,fontSize:12,background:'var(--ac-bg)',border:'1px solid var(--ac-b)',color:'var(--ac-t)'}}>{f}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* PORTFOLIO */}
              <h2 style={{fontSize:14,fontWeight:600,color:'var(--text)',marginBottom:12}}>AI-Native Portfolio ({cos.length})</h2>
              <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:10,overflow:'hidden'}}>
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead style={{background:'var(--bg3)'}}>
                    <tr style={{borderBottom:'1px solid var(--border)'}}>
                      {['Company','Sector','Round','Raised','Valuation','Date'].map(h=>(
                        <th key={h} style={{padding:'9px 14px',textAlign:'left',fontSize:9,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--t3)'}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {cos.map(co=>{
                      const rc=roundColor(co.st)
                      return(
                        <tr key={co.n} className="co-row" onClick={()=>router.push('/company/'+toSlug(co.n))} style={{borderBottom:'1px solid var(--border)',cursor:'pointer',transition:'background .1s'}}>
                          <td style={{padding:'11px 14px'}}>
                            <div style={{display:'flex',alignItems:'center',gap:8}}>
                              <div style={{width:28,height:28,borderRadius:7,background:co.sc,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,color:'#fff',flexShrink:0}}>{ini(co.n)}</div>
                              <div>
                                <div style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>{co.n}{co.pf&&<span style={{marginLeft:4,fontSize:9,padding:'1px 5px',borderRadius:4,background:'var(--ac-bg)',color:'var(--ac-t)',border:'1px solid var(--ac-b)'}}>★</span>}</div>
                                <div style={{fontSize:11,color:'var(--t3)'}}>{co.s}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{padding:'11px 14px',fontSize:12,color:'var(--t2)'}}><span style={{display:'inline-block',width:5,height:5,borderRadius:'50%',background:co.sc,marginRight:5,verticalAlign:'middle'}}/>{co.sec}</td>
                          <td style={{padding:'11px 14px'}}><span style={{padding:'3px 8px',borderRadius:5,fontSize:10,fontWeight:600,background:rc.bg,color:rc.c,border:`1px solid ${rc.b}`}}>{co.st}</span></td>
                          <td style={{padding:'11px 14px',fontSize:13,fontWeight:600,color:'var(--ac-t)',fontFamily:"'DM Mono',monospace"}}>{fmt(co.r)}</td>
                          <td style={{padding:'11px 14px',fontSize:13,color:'var(--t2)',fontFamily:"'DM Mono',monospace"}}>{fmt(co.v)}</td>
                          <td style={{padding:'11px 14px',fontSize:12,color:'var(--t3)'}}>{co.date}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
