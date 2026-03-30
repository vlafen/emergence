'use client'
import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'

const COMPANIES=[
  {n:'Formation Bio',s:'Drug Development AI',sec:'Health',sc:'#16a34a',st:'Series C',r:248,v:1100,e:320,y:2018,date:'Mar 2026',hq:'San Francisco',pf:false,tags:['Drug Discovery','AI-Native','B2B'],inv:['a16z Bio','Sequoia','Google Ventures'],rounds:[{d:'Mar 2026',round:'Series C',amt:248,inv:['a16z Bio','Sequoia','Google Ventures']},{d:'Jan 2024',round:'Series B',amt:120,inv:['Sequoia','GV']},{d:'Jun 2022',round:'Series A',amt:52,inv:['a16z Bio','Y Combinator']}]},
  {n:'EvenUp',s:'Personal Injury Law',sec:'Legal',sc:'#7c3aed',st:'Series C',r:135,v:600,e:290,y:2019,date:'Feb 2026',hq:'San Francisco',pf:false,tags:['Legal AI','Personal Injury','B2B'],inv:['SignalFire','Bessemer','Accel'],rounds:[{d:'Feb 2026',round:'Series C',amt:135,inv:['SignalFire','Bessemer','Accel']},{d:'Mar 2024',round:'Series B',amt:65,inv:['Bessemer','Accel']},{d:'Jan 2023',round:'Series A',amt:35,inv:['SignalFire']}]},
  {n:'Prosper',s:'RCM Platform',sec:'Health',sc:'#16a34a',st:'Series B',r:127,v:480,e:210,y:2020,date:'Feb 2026',hq:'New York',pf:true,tags:['RCM','Health AI','Revenue Cycle'],inv:['Emergence Capital','a16z','GV'],rounds:[{d:'Feb 2026',round:'Series B',amt:127,inv:['Emergence Capital','a16z','GV']},{d:'Sep 2023',round:'Series A',amt:45,inv:['Emergence Capital']}]},
  {n:'Harper',s:'Commercial Insurance',sec:'Financial',sc:'#2563eb',st:'Series B',r:110,v:450,e:230,y:2019,date:'Jan 2026',hq:'New York',pf:true,tags:['Insurance AI','Commercial Lines','B2B'],inv:['Emergence Capital','Ribbit Capital','QED'],rounds:[{d:'Jan 2026',round:'Series B',amt:110,inv:['Emergence Capital','Ribbit Capital','QED']},{d:'Jun 2023',round:'Series A',amt:40,inv:['Emergence Capital','QED']}]},
  {n:'Crosby',s:'Contract Lifecycle',sec:'Legal',sc:'#7c3aed',st:'Series B',r:95,v:380,e:180,y:2019,date:'Jan 2026',hq:'Chicago',pf:true,tags:['CLM','Legal AI','Enterprise'],inv:['Emergence Capital','Tiger Global','Salesforce Ventures'],rounds:[{d:'Jan 2026',round:'Series B',amt:95,inv:['Emergence Capital','Tiger Global','Salesforce Ventures']},{d:'Apr 2023',round:'Series A',amt:38,inv:['Emergence Capital']}]},
  {n:'Scale Medicine',s:'Precision Medicine',sec:'Health',sc:'#16a34a',st:'Series B',r:89,v:360,e:145,y:2020,date:'Dec 2025',hq:'Boston',pf:true,tags:['Precision Medicine','Genomics','AI-Native'],inv:['Emergence Capital','Flagship Pioneering'],rounds:[{d:'Dec 2025',round:'Series B',amt:89,inv:['Emergence Capital','Flagship Pioneering']},{d:'Mar 2023',round:'Series A',amt:30,inv:['Flagship Pioneering']}]},
  {n:'Mechanical Orchard',s:'Legacy Modernization',sec:'Software',sc:'#d97706',st:'Series B',r:75,v:310,e:190,y:2020,date:'Dec 2025',hq:'San Francisco',pf:true,tags:['Legacy Modernization','Enterprise'],inv:['Emergence Capital','Salesforce Ventures'],rounds:[{d:'Dec 2025',round:'Series B',amt:75,inv:['Emergence Capital','Salesforce Ventures']},{d:'May 2023',round:'Series A',amt:28,inv:['Emergence Capital']}]},
  {n:'Irving',s:'M&A Diligence',sec:'Legal',sc:'#7c3aed',st:'Series A',r:45,v:190,e:95,y:2021,date:'Nov 2025',hq:'New York',pf:true,tags:['M&A','Legal AI'],inv:['Emergence Capital','Index Ventures'],rounds:[{d:'Nov 2025',round:'Series A',amt:45,inv:['Emergence Capital','Index Ventures']}]},
  {n:'LightTable',s:'Construction AI',sec:'Industrial',sc:'#b45309',st:'Series A',r:42,v:170,e:88,y:2021,date:'Nov 2025',hq:'Austin',pf:false,tags:['Construction','Industrial AI'],inv:['Lux Capital','Founders Fund'],rounds:[{d:'Nov 2025',round:'Series A',amt:42,inv:['Lux Capital','Founders Fund']}]},
  {n:'Tessera',s:'API Integration',sec:'Software',sc:'#d97706',st:'Series A',r:41,v:165,e:90,y:2021,date:'Oct 2025',hq:'San Francisco',pf:false,tags:['API','Integration'],inv:['Sequoia','NEA'],rounds:[{d:'Oct 2025',round:'Series A',amt:41,inv:['Sequoia','NEA']}]},
  {n:'AirOps',s:'GTM Automation',sec:'GTM',sc:'#0891b2',st:'Series A',r:38,v:155,e:80,y:2021,date:'Oct 2025',hq:'New York',pf:false,tags:['GTM','Sales AI'],inv:['Gradient Ventures','Boldstart'],rounds:[{d:'Oct 2025',round:'Series A',amt:38,inv:['Gradient Ventures','Boldstart']}]},
  {n:'XBOW',s:'Autonomous Pentesting',sec:'Security',sc:'#dc2626',st:'Series A',r:35,v:150,e:75,y:2022,date:'Sep 2025',hq:'San Francisco',pf:false,tags:['Security','Pentesting'],inv:['Sequoia','Khosla Ventures'],rounds:[{d:'Sep 2025',round:'Series A',amt:35,inv:['Sequoia','Khosla Ventures']}]},
  {n:'Outbound AI',s:'Voice AI',sec:'Health',sc:'#16a34a',st:'Series A',r:34,v:140,e:85,y:2021,date:'Sep 2025',hq:'Seattle',pf:false,tags:['Voice AI','Health'],inv:['General Catalyst','Bessemer'],rounds:[{d:'Sep 2025',round:'Series A',amt:34,inv:['General Catalyst','Bessemer']}]},
  {n:'Tribe AI',s:'AI Consulting',sec:'AI Impl.',sc:'#15803d',st:'Series A',r:33,v:130,e:120,y:2019,date:'Aug 2025',hq:'San Francisco',pf:true,tags:['AI Implementation','Consulting'],inv:['Emergence Capital','Homebrew'],rounds:[{d:'Aug 2025',round:'Series A',amt:33,inv:['Emergence Capital','Homebrew']}]},
  {n:'Rivet',s:'Accounting AI',sec:'Financial',sc:'#2563eb',st:'Series A',r:31,v:120,e:70,y:2021,date:'Aug 2025',hq:'New York',pf:true,tags:['Accounting','Financial AI'],inv:['Emergence Capital','Accel'],rounds:[{d:'Aug 2025',round:'Series A',amt:31,inv:['Emergence Capital','Accel']}]},
  {n:'Rubie',s:'QA Automation',sec:'Software',sc:'#d97706',st:'Series A',r:28,v:110,e:65,y:2022,date:'Jul 2025',hq:'Remote',pf:true,tags:['QA','Testing'],inv:['Emergence Capital','Boldstart'],rounds:[{d:'Jul 2025',round:'Series A',amt:28,inv:['Emergence Capital','Boldstart']}]},
  {n:'Norm AI',s:'Regulatory Compliance',sec:'Legal',sc:'#7c3aed',st:'Series A',r:27,v:110,e:60,y:2022,date:'Jul 2025',hq:'Washington DC',pf:false,tags:['Compliance','RegTech'],inv:['Coatue','Index Ventures'],rounds:[{d:'Jul 2025',round:'Series A',amt:27,inv:['Coatue','Index Ventures']}]},
  {n:'Docshield',s:'Document Automation',sec:'Financial',sc:'#2563eb',st:'Series A',r:22,v:90,e:48,y:2022,date:'Jun 2025',hq:'New York',pf:false,tags:['Document AI','Financial'],inv:['Gradient Ventures','Fin Capital'],rounds:[{d:'Jun 2025',round:'Series A',amt:22,inv:['Gradient Ventures','Fin Capital']}]},
  {n:'RunSybil',s:'AI Red Teaming',sec:'Security',sc:'#dc2626',st:'Seed',r:12,v:55,e:28,y:2023,date:'May 2025',hq:'San Francisco',pf:true,tags:['Red Teaming','Security'],inv:['Emergence Capital','Y Combinator'],rounds:[{d:'May 2025',round:'Seed',amt:12,inv:['Emergence Capital','Y Combinator']}]},
  {n:'Evidenza',s:'Market Research AI',sec:'GTM',sc:'#0891b2',st:'Seed',r:8,v:38,e:22,y:2023,date:'Apr 2025',hq:'Remote',pf:false,tags:['Market Research','GTM'],inv:['Y Combinator','Pear VC'],rounds:[{d:'Apr 2025',round:'Seed',amt:8,inv:['Y Combinator','Pear VC']}]},
]

function fmt(n:number){if(!n)return'—';if(n>=1000)return`$${(n/1000).toFixed(1)}B`;return`$${n}M`}
function ini(n:string){return n.split(' ').map((w:string)=>w[0]).join('').slice(0,2).toUpperCase()}
function toSlug(n:string){return n.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}

const CSS=`
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}body{font-family:'DM Sans',sans-serif}
  html[data-theme=dark],html:not([data-theme]){--bg:#0a0a0f;--bg2:#111118;--bg3:#1a1a24;--border:rgba(255,255,255,.07);--border2:rgba(255,255,255,.13);--text:#f0f4fa;--t2:#c8d4e8;--t3:rgba(200,212,232,.42);--ac:#2563EB;--ac-bg:rgba(37,99,235,.1);--ac-b:rgba(37,99,235,.25);--ac-t:#7aaff7}
  html[data-theme=light]{--bg:#f4f2ed;--bg2:#ffffff;--bg3:#f0ede6;--border:rgba(0,0,0,.08);--border2:rgba(0,0,0,.16);--text:#0d0d0d;--t2:#2a2a2a;--t3:rgba(10,10,10,.42);--ac:#2563EB;--ac-bg:rgba(37,99,235,.08);--ac-b:rgba(37,99,235,.22);--ac-t:#1d4ed8}
  .nav-item{display:flex;align-items:center;gap:9px;padding:7px 8px;border-radius:6px;cursor:pointer;color:var(--t3);transition:all .12s;font-size:13px;border-left:2px solid transparent;margin-bottom:1px}
  .nav-item:hover{background:rgba(37,99,235,.06);color:var(--t2)}
  .nav-item.active{background:var(--ac-bg);color:var(--ac-t);border-left-color:var(--ac);font-weight:500}
  .round-row:hover{background:rgba(37,99,235,.04)}
  .inv-link:hover{border-color:var(--border2)!important;color:var(--text)!important}
  ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:var(--border2);border-radius:2px}
`

export default function CompanyPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=use(params)
  const router=useRouter()
  const [theme,setTheme]=useState<'dark'|'light'>('dark')
  const [isWL,setIsWL]=useState(false)
  const [toast,setToast]=useState('')

  const co=COMPANIES.find(c=>toSlug(c.n)===slug)

  useEffect(()=>{
    const s=localStorage.getItem('theme') as 'dark'|'light'|null
    const t=s||'dark';setTheme(t);document.documentElement.setAttribute('data-theme',t)
    if(co){
      try{const wl=JSON.parse(localStorage.getItem('wl_companies')||'[]');setIsWL(wl.includes(co.n))}catch{}
    }
  },[co])

  function toggleTheme(){
    const next=theme==='dark'?'light':'dark'
    setTheme(next);document.documentElement.setAttribute('data-theme',next);localStorage.setItem('theme',next)
  }

  function toggleWL(){
    if(!co) return
    try{
      const wl:string[]=JSON.parse(localStorage.getItem('wl_companies')||'[]')
      const next=isWL?wl.filter(n=>n!==co.n):[...wl,co.n]
      localStorage.setItem('wl_companies',JSON.stringify(next));setIsWL(!isWL)
      setToast(isWL?'Removed from Watchlist':'★ Added to Watchlist')
      setTimeout(()=>setToast(''),2000)
    }catch{}
  }

  const roundColor=(st:string)=>{
    if(st==='Series C') return{bg:'rgba(124,58,237,.12)',c:'#a78bfa',b:'rgba(124,58,237,.25)'}
    if(st==='Series B') return{bg:'rgba(37,99,235,.1)',c:'#7aaff7',b:'rgba(37,99,235,.22)'}
    if(st==='Series A') return{bg:'rgba(16,185,129,.1)',c:'#6ee7b7',b:'rgba(16,185,129,.22)'}
    return{bg:'rgba(245,158,11,.1)',c:'#fcd34d',b:'rgba(245,158,11,.22)'}
  }

  if(!co) return(
    <>
      <style>{CSS}</style>
      <div data-theme="dark" style={{height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'var(--bg)',color:'var(--t3)'}}>
        <div style={{textAlign:'center'}}>
          <div style={{fontSize:48,marginBottom:16}}>◎</div>
          <div style={{fontSize:16,fontWeight:500,color:'var(--text)',marginBottom:8}}>Company not found</div>
          <button onClick={()=>router.push('/dashboard')} style={{padding:'8px 20px',borderRadius:7,background:'var(--ac)',color:'#fff',border:'none',fontSize:13,cursor:'pointer',fontFamily:"'DM Sans',sans-serif"}}>← Back to Dashboard</button>
        </div>
      </div>
    </>
  )

  const rc=roundColor(co.st)

  return(
    <>
      <style>{CSS}</style>
      {toast&&<div style={{position:'fixed',bottom:24,right:24,zIndex:2000,padding:'10px 18px',borderRadius:8,background:'var(--bg2)',border:'1px solid var(--ac-b)',fontSize:13,fontWeight:500,color:'var(--ac-t)',boxShadow:'0 4px 20px rgba(0,0,0,.3)'}}>{toast}</div>}

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
          {/* TOP BAR */}
          <div style={{height:48,display:'flex',alignItems:'center',padding:'0 20px',background:'var(--bg2)',borderBottom:'1px solid var(--border)',flexShrink:0,gap:8}}>
            <button onClick={()=>router.back()} style={{padding:'5px 10px',border:'1px solid var(--border)',borderRadius:6,background:'transparent',color:'var(--t3)',fontSize:12,cursor:'pointer',fontFamily:"'DM Sans',sans-serif"}}>← Back</button>
            <div style={{fontSize:14,fontWeight:600,color:'var(--text)'}}>{co.n}</div>
            {co.pf&&<span style={{fontSize:10,padding:'2px 8px',borderRadius:4,background:'var(--ac-bg)',color:'var(--ac-t)',border:'1px solid var(--ac-b)',fontWeight:600}}>★ Portfolio</span>}
            <div style={{marginLeft:'auto',display:'flex',gap:8}}>
              <button onClick={toggleWL} style={{padding:'6px 14px',border:`1px solid ${isWL?'var(--ac-b)':'var(--border)'}`,borderRadius:6,background:isWL?'var(--ac-bg)':'transparent',color:isWL?'var(--ac-t)':'var(--t3)',fontSize:12,cursor:'pointer',fontFamily:"'DM Sans',sans-serif"}}>
                {isWL?'★ Watchlisted':'☆ Add to Watchlist'}
              </button>
            </div>
          </div>

          <div style={{flex:1,overflow:'auto',padding:'24px'}}>
            <div style={{maxWidth:900,margin:'0 auto'}}>

              {/* HEADER */}
              <div style={{display:'flex',alignItems:'flex-start',gap:16,marginBottom:24,padding:'20px 24px',background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:12}}>
                <div style={{width:52,height:52,borderRadius:12,background:co.sc,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,fontWeight:800,color:'#fff',flexShrink:0}}>{ini(co.n)}</div>
                <div style={{flex:1}}>
                  <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:4}}>
                    <h1 style={{fontSize:22,fontWeight:700,color:'var(--text)'}}>{co.n}</h1>
                    <span style={{padding:'3px 9px',borderRadius:5,fontSize:11,fontWeight:600,background:rc.bg,color:rc.c,border:`1px solid ${rc.b}`}}>{co.st}</span>
                  </div>
                  <div style={{fontSize:14,color:'var(--t3)',marginBottom:10}}>{co.s}</div>
                  <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                    {co.tags.map(t=>(
                      <span key={t} style={{fontSize:11,padding:'3px 9px',borderRadius:5,background:'var(--bg3)',border:'1px solid var(--border)',color:'var(--t2)'}}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* STATS */}
              <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:8,marginBottom:20}}>
                {[
                  {l:'Total Raised',v:fmt(co.r),hl:true},
                  {l:'Valuation',v:fmt(co.v),hl:false},
                  {l:'Employees',v:String(co.e),hl:false},
                  {l:'Founded',v:String(co.y),hl:false},
                  {l:'HQ',v:co.hq,hl:false},
                ].map(({l,v,hl})=>(
                  <div key={l} style={{padding:'12px 14px',background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:9}}>
                    <div style={{fontSize:9,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--t3)',marginBottom:5}}>{l}</div>
                    <div style={{fontSize:17,fontWeight:600,color:hl?'var(--ac-t)':'var(--text)',fontFamily:"'DM Mono',monospace"}}>{v}</div>
                  </div>
                ))}
              </div>

              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
                {/* FUNDING ROUNDS */}
                <div>
                  <h2 style={{fontSize:14,fontWeight:600,color:'var(--text)',marginBottom:12}}>Funding History</h2>
                  <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:10,overflow:'hidden'}}>
                    {co.rounds.map((rd,i)=>{
                      const rrc=roundColor(rd.round)
                      return(
                        <div key={i} className="round-row" style={{display:'flex',alignItems:'center',gap:12,padding:'12px 16px',borderBottom:i<co.rounds.length-1?'1px solid var(--border)':'none',transition:'background .1s'}}>
                          <div style={{flex:1}}>
                            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4}}>
                              <span style={{padding:'2px 7px',borderRadius:4,fontSize:10,fontWeight:600,background:rrc.bg,color:rrc.c,border:`1px solid ${rrc.b}`}}>{rd.round}</span>
                              <span style={{fontSize:11,color:'var(--t3)'}}>{rd.d}</span>
                            </div>
                            <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
                              {rd.inv.map((inv:string)=>(
                                <a key={inv} href={'/fund/'+toSlug(inv)} className="inv-link" style={{padding:'2px 7px',borderRadius:4,fontSize:11,background:'var(--bg3)',border:'1px solid var(--border)',color:'var(--t2)',textDecoration:'none',cursor:'pointer',transition:'all .12s'}}>{inv}</a>
                              ))}
                            </div>
                          </div>
                          <div style={{fontSize:16,fontWeight:700,color:'var(--ac-t)',fontFamily:"'DM Mono',monospace",flexShrink:0}}>{fmt(rd.amt)}</div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* INVESTORS */}
                <div>
                  <h2 style={{fontSize:14,fontWeight:600,color:'var(--text)',marginBottom:12}}>All Investors</h2>
                  <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:10,overflow:'hidden'}}>
                    {co.inv.map((inv,i)=>(
                      <div key={inv} onClick={()=>router.push('/fund/'+toSlug(inv))} style={{display:'flex',alignItems:'center',gap:10,padding:'11px 16px',borderBottom:i<co.inv.length-1?'1px solid var(--border)':'none',cursor:'pointer',transition:'background .1s'}} className="round-row">
                        <div style={{width:28,height:28,borderRadius:7,background:'var(--ac-bg)',border:'1px solid var(--ac-b)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:700,color:'var(--ac-t)',flexShrink:0}}>{ini(inv)}</div>
                        <div style={{fontSize:13,fontWeight:500,color:'var(--text)',flex:1}}>{inv}</div>
                        <span style={{fontSize:11,color:'var(--t3)'}}>→</span>
                      </div>
                    ))}
                  </div>

                  {/* SECTOR */}
                  <h2 style={{fontSize:14,fontWeight:600,color:'var(--text)',margin:'16px 0 12px'}}>Sector</h2>
                  <div style={{padding:'14px 16px',background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:10,display:'flex',alignItems:'center',gap:10}}>
                    <div style={{width:8,height:8,borderRadius:'50%',background:co.sc,flexShrink:0}}/>
                    <div style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>{co.sec}</div>
                    <button onClick={()=>router.push('/dashboard')} style={{marginLeft:'auto',padding:'5px 12px',borderRadius:6,border:'1px solid var(--border)',background:'transparent',color:'var(--t3)',fontSize:11,cursor:'pointer',fontFamily:"'DM Sans',sans-serif"}}>View sector →</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
