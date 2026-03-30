'use client'
import { useState, useEffect, useRef, useMemo } from 'react'
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

function buildFunds(){
  const m:Record<string,any>={}
  D.forEach(co=>{co.inv.forEach(inv=>{
    if(!m[inv]) m[inv]={n:inv,cos:[],raised:0}
    m[inv].cos.push(co);m[inv].raised+=co.r
  })})
  return Object.values(m)
}
const FUNDS=buildFunds()

function fmt(n:number){if(!n)return'—';if(n>=1000)return`$${(n/1000).toFixed(1)}B`;return`$${n}M`}
function ini(n:string){return n.split(' ').map((w:string)=>w[0]).join('').slice(0,2).toUpperCase()}
function toSlug(n:string){return n.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}

export default function WatchlistPage(){
  const router=useRouter()
  const [cos,setCos]=useState<string[]>([])
  const [funds,setFunds]=useState<string[]>([])
  const [tab,setTab]=useState<'companies'|'funds'>('companies')
  const [theme,setTheme]=useState<'dark'|'light'>('light')
  const [cmdOpen,setCmdOpen]=useState(false)
  const [cmdQ,setCmdQ]=useState('')
  const [cmdSel,setCmdSel]=useState(0)
  const cmdRef=useRef<HTMLInputElement>(null)
  const wlSize=cos.length+funds.length


  useEffect(()=>{
    const saved=localStorage.getItem('theme') as 'dark'|'light'|null
    if(saved) setTheme(saved)
  },[])

  useEffect(()=>{
    document.documentElement.setAttribute('data-theme',theme)
    localStorage.setItem('theme',theme)
  },[theme])
  useEffect(()=>{
    try{
      setCos(JSON.parse(localStorage.getItem('wl_companies')||'[]'))
      setFunds(JSON.parse(localStorage.getItem('wl_funds')||'[]'))
    }catch{}
  },[])

  function removeCo(name:string){
    const next=cos.filter(n=>n!==name)
    setCos(next);localStorage.setItem('wl_companies',JSON.stringify(next))
  }
  function removeFund(name:string){
    const next=funds.filter(n=>n!==name)
    setFunds(next);localStorage.setItem('wl_funds',JSON.stringify(next))
  }

  const companies=cos.map(n=>D.find(c=>c.n===n)).filter(Boolean) as typeof D
  const savedFunds=funds.map(n=>FUNDS.find((f:any)=>f.n===n)).filter(Boolean) as any[]

  const cmdResults=useMemo(()=>{
    const all=[
      ...D.map(co=>({type:'company',name:co.n,sub:co.s+' · '+co.sec,slug:toSlug(co.n),color:co.sc})),
      ...FUNDS.map((f:any)=>({type:'fund',name:f.n,sub:'Fund · '+f.cos.length+' cos',slug:toSlug(f.n),color:null})),
    ]
    if(!cmdQ) return all.slice(0,6)
    return all.filter(r=>r.name.toLowerCase().includes(cmdQ.toLowerCase())||r.sub.toLowerCase().includes(cmdQ.toLowerCase())).slice(0,8)
  },[cmdQ])

  function openCmd(){setCmdOpen(true);setCmdQ('');setCmdSel(0);setTimeout(()=>cmdRef.current?.focus(),50)}
  function closeCmd(){setCmdOpen(false)}
  function selectCmd(i:number){
    const r=cmdResults[i];if(!r)return
    closeCmd()
    router.push(r.type==='company'?'/company/'+r.slug:'/fund/'+r.slug)
  }

  useEffect(()=>{
    function onKey(e:KeyboardEvent){
      if((e.metaKey||e.ctrlKey)&&e.key==='k'){e.preventDefault();openCmd()}
      if(e.key==='Escape'&&cmdOpen) closeCmd()
    }
    window.addEventListener('keydown',onKey)
    return()=>window.removeEventListener('keydown',onKey)
  },[cmdOpen])

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        :root,[data-theme=light],html[data-theme=light]{--bg:#ffffff;--bg2:#f4f5f7;--bg3:#e8eaed;--border:rgba(0,0,0,.08);--border2:rgba(0,0,0,.16);--text:#0d0d0d;--t2:#0d0d0d;--t3:#444444;--ac:#1a9e6e;--ac-bg:rgba(26,158,110,.07);--ac-b:rgba(26,158,110,.18)}
        [data-theme=dark],html[data-theme=dark]{--bg:#08080f;--bg2:#0d0d1a;--bg3:#111124;--border:rgba(255,255,255,.07);--border2:rgba(255,255,255,.14);--text:#ffffff;--t2:rgba(255,255,255,1);--t3:rgba(255,255,255,.45);--ac:#5CD2A2;--ac-bg:rgba(92,210,162,.08);--ac-b:rgba(92,210,162,.2)}
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Plus Jakarta Sans',sans-serif;margin:0;padding:0}
        .row:hover td{background:var(--bg2)}
        .rm:hover{color:var(--text)!important}
        .tab-btn:hover{color:var(--t2)!important}
        input{outline:none}
      `}</style>

      <div data-theme={theme} style={{minHeight:'100vh',background:'var(--bg)',color:'var(--text)',fontFamily:"'Plus Jakarta Sans',sans-serif",transition:'background .2s,color .2s'}}>

        {/* NAV */}
        <nav style={{height:48,display:'flex',alignItems:'center',padding:'0 20px',background:'var(--bg)',borderBottom:'1px solid var(--border)',position:'sticky',top:0,zIndex:10}}>
          <div onClick={()=>router.push('/')} style={{display:'flex',alignItems:'center',gap:7,fontSize:14,fontWeight:700,letterSpacing:'.1em',cursor:'pointer'}}>
            <div style={{width:7,height:7,borderRadius:'50%',background:'var(--ac)'}}/>
            INTELLIGENCE
          </div>
          <div style={{display:'flex',marginLeft:20}}>
            {[['Dashboard','/dashboard'],['Funds','/funds'],['Watchlist','/watchlist']].map(([t,href],i)=>(
              <a key={t} href={href} style={{padding:'0 14px',height:48,display:'flex',alignItems:'center',fontSize:14,fontWeight:500,color:t==='Watchlist'?'var(--text)':'var(--t3)',textDecoration:'none',borderBottom:t==='Watchlist'?'2px solid var(--ac)':'2px solid transparent',transition:'all .15s'}}>
                {t}{t==='Watchlist'&&wlSize>0&&<span style={{marginLeft:5,fontSize:10,fontWeight:700,background:'var(--ac)',color:'#fff',borderRadius:10,padding:'1px 5px'}}>{wlSize}</span>}
              </a>
            ))}
          </div>
          <div style={{display:'flex',alignItems:'center',gap:7,marginLeft:'auto'}}>
            <div onClick={openCmd} style={{display:'flex',alignItems:'center',gap:8,background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:8,padding:'5px 14px',width:220,cursor:'pointer',height:34}}>
              <span style={{fontSize:14,color:'var(--t3)'}}>⌕</span>
              <span style={{fontSize:13,color:'var(--t3)',flex:1}}>Search companies, funds…</span>
            </div>
            <button onClick={()=>setTheme(t=>t==='dark'?'light':'dark')} style={{width:30,height:30,borderRadius:7,border:'1px solid var(--border)',background:'var(--bg2)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,color:'var(--t2)'}}>
              {theme==='dark'?'☀':'☾'}
            </button>
            <a href="/auth" style={{padding:'7px 20px',border:'1px solid var(--border)',borderRadius:6,fontSize:13,fontWeight:500,color:'var(--t2)',background:'transparent',cursor:'pointer',textDecoration:'none'}}>Log in</a>
            <a href="/auth?mode=signup" style={{padding:'7px 20px',borderRadius:6,fontSize:13,fontWeight:600,background:'var(--ac)',color:'#fff',textDecoration:'none',display:'inline-block'}}>Sign up →</a>
          </div>
        </nav>

        <div style={{maxWidth:900,margin:'0 auto',padding:'40px 24px'}}>
          <div style={{marginBottom:28}}>
            <h1 style={{fontSize:24,fontWeight:700,marginBottom:6,color:'var(--text)'}}>Watchlist</h1>
            <div style={{fontSize:14,color:'var(--t3)'}}>{companies.length} companies · {savedFunds.length} funds saved</div>
          </div>

          {/* Tabs */}
          <div style={{display:'flex',gap:2,marginBottom:20,borderBottom:'1px solid var(--border)'}}>
            {[['companies','Companies',companies.length],['funds','Funds',savedFunds.length]].map(([v,label,cnt])=>(
              <button key={v} className="tab-btn" onClick={()=>setTab(v as any)} style={{padding:'8px 16px',fontSize:13,fontWeight:500,color:tab===v?'var(--text)':'var(--t3)',background:'transparent',border:'none',cursor:'pointer',borderBottom:tab===v?'2px solid var(--ac)':'2px solid transparent',marginBottom:-1,transition:'color .15s'}}>
                {label} {Number(cnt)>0&&<span style={{fontSize:11,color:tab===v?'var(--ac)':'var(--t3)'}}>{cnt}</span>}
              </button>
            ))}
          </div>

          {/* COMPANIES TAB */}
          {tab==='companies'&&(
            companies.length===0?(
              <div style={{textAlign:'center',padding:'80px 24px',background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:12}}>
                <div style={{fontSize:28,opacity:.2,marginBottom:12}}>★</div>
                <div style={{fontSize:15,fontWeight:600,color:'var(--t2)',marginBottom:8}}>No companies saved yet</div>
                <div style={{fontSize:13,color:'var(--t3)',marginBottom:20}}>Click ☆ on any company to add it here</div>
                <a href="/dashboard" style={{padding:'8px 20px',borderRadius:7,fontSize:13,fontWeight:600,background:'var(--ac)',color:'#fff',textDecoration:'none',display:'inline-block'}}>Browse Dashboard →</a>
              </div>
            ):(
              <>
                <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:12,overflow:'hidden',marginBottom:16}}>
                  <table style={{width:'100%',borderCollapse:'collapse'}}>
                    <thead style={{background:'var(--bg3)'}}>
                      <tr style={{borderBottom:'1px solid var(--border)'}}>
                        {['Company','Sector','Stage','Raised','Valuation','Emp.',''].map(h=>(
                          <th key={h} style={{padding:'10px 16px',textAlign:'left',fontSize:11,fontWeight:700,letterSpacing:'.07em',textTransform:'uppercase',color:'var(--t3)'}}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {companies.map(co=>(
                        <tr key={co.n} className="row" style={{borderBottom:'1px solid var(--border)',transition:'background .1s'}}>
                          <td style={{padding:'12px 16px'}}>
                            <a href={'/company/'+toSlug(co.n)} style={{display:'flex',alignItems:'center',gap:10,textDecoration:'none'}}>
                              <div style={{width:30,height:30,borderRadius:7,background:co.sc,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,color:'#fff',flexShrink:0}}>{ini(co.n)}</div>
                              <div>
                                <div style={{fontSize:14,fontWeight:600,color:'var(--text)'}}>{co.n}{co.pf&&<span style={{marginLeft:5,fontSize:10,color:'var(--ac)'}}>★</span>}</div>
                                <div style={{fontSize:11,color:'var(--t3)',marginTop:1}}>{co.s}</div>
                              </div>
                            </a>
                          </td>
                          <td style={{padding:'12px 16px',fontSize:13,color:'var(--t2)'}}>
                            <span style={{display:'inline-flex',alignItems:'center',gap:4}}>
                              <span style={{width:5,height:5,borderRadius:'50%',background:co.sc,display:'inline-block'}}/>
                              {co.sec}
                            </span>
                          </td>
                          <td style={{padding:'12px 16px'}}>
                            <span style={{padding:'2px 7px',borderRadius:4,fontSize:11,fontWeight:600,background:'rgba(111,163,239,.08)',color:'#6FA3EF',border:'1px solid rgba(111,163,239,.2)'}}>{co.st}</span>
                          </td>
                          <td style={{padding:'12px 16px',fontSize:14,fontFamily:"'DM Mono',monospace",color:'var(--ac)',fontWeight:500}}>{fmt(co.r)}</td>
                          <td style={{padding:'12px 16px',fontSize:14,fontFamily:"'DM Mono',monospace",color:'var(--t2)'}}>{fmt(co.v)}</td>
                          <td style={{padding:'12px 16px',fontSize:14,fontFamily:"'DM Mono',monospace",color:'var(--t2)'}}>{co.e}</td>
                          <td style={{padding:'12px 16px'}}>
                            <button className="rm" onClick={()=>removeCo(co.n)} style={{padding:'4px 10px',borderRadius:5,fontSize:12,color:'var(--t3)',background:'transparent',border:'1px solid var(--border)',cursor:'pointer',transition:'color .15s'}}>
                              ✕ Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {companies.length>=2&&(
                  <div style={{display:'flex',justifyContent:'flex-end'}}>
                    <a href={'/compare?cos='+companies.slice(0,3).map(c=>toSlug(c.n)).join(',')} style={{padding:'8px 18px',borderRadius:7,fontSize:13,fontWeight:600,background:'rgba(111,163,239,.08)',color:'#6FA3EF',border:'1px solid rgba(111,163,239,.2)',textDecoration:'none',display:'inline-block'}}>
                      ⚖ Compare first {Math.min(companies.length,3)} →
                    </a>
                  </div>
                )}
              </>
            )
          )}

          {/* FUNDS TAB */}
          {tab==='funds'&&(
            savedFunds.length===0?(
              <div style={{textAlign:'center',padding:'80px 24px',background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:12}}>
                <div style={{fontSize:28,opacity:.2,marginBottom:12}}>🏦</div>
                <div style={{fontSize:15,fontWeight:600,color:'var(--t2)',marginBottom:8}}>No funds saved yet</div>
                <div style={{fontSize:13,color:'var(--t3)',marginBottom:20}}>Click ☆ on any fund to add it here</div>
                <a href="/funds" style={{padding:'8px 20px',borderRadius:7,fontSize:13,fontWeight:600,background:'var(--ac)',color:'#fff',textDecoration:'none',display:'inline-block'}}>Browse Funds →</a>
              </div>
            ):(
              <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:12,overflow:'hidden'}}>
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead style={{background:'var(--bg3)'}}>
                    <tr style={{borderBottom:'1px solid var(--border)'}}>
                      {['Fund','Type','AI Companies','Deployed',''].map(h=>(
                        <th key={h} style={{padding:'10px 16px',textAlign:'left',fontSize:11,fontWeight:700,letterSpacing:'.07em',textTransform:'uppercase',color:'var(--t3)'}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {savedFunds.map((f:any)=>(
                      <tr key={f.n} className="row" style={{borderBottom:'1px solid var(--border)',transition:'background .1s'}}>
                        <td style={{padding:'12px 16px'}}>
                          <a href={'/fund/'+toSlug(f.n)} style={{display:'flex',alignItems:'center',gap:10,textDecoration:'none'}}>
                            <div style={{width:30,height:30,borderRadius:7,background:'var(--bg3)',border:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,color:'var(--t3)',flexShrink:0}}>{ini(f.n)}</div>
                            <div style={{fontSize:14,fontWeight:600,color:'var(--text)'}}>{f.n}</div>
                          </a>
                        </td>
                        <td style={{padding:'12px 16px',fontSize:13,color:'var(--t2)'}}>{f.type||'VC'}</td>
                        <td style={{padding:'12px 16px',fontSize:14,fontFamily:"'DM Mono',monospace",color:'var(--ac)',fontWeight:500}}>{f.cos.length}</td>
                        <td style={{padding:'12px 16px',fontSize:14,fontFamily:"'DM Mono',monospace",color:'var(--t2)'}}>{fmt(f.raised)}</td>
                        <td style={{padding:'12px 16px'}}>
                          <button className="rm" onClick={()=>removeFund(f.n)} style={{padding:'4px 10px',borderRadius:5,fontSize:12,color:'var(--t3)',background:'transparent',border:'1px solid var(--border)',cursor:'pointer',transition:'color .15s'}}>
                            ✕ Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}
        </div>
      </div>

      {/* CMD+K */}
      {cmdOpen&&(
        <div style={{position:'fixed',inset:0,zIndex:1000,background:'rgba(0,0,0,0.6)',backdropFilter:'blur(6px)',display:'flex',alignItems:'flex-start',justifyContent:'center',paddingTop:'15vh'}} onClick={closeCmd}>
          <div style={{width:560,background:'var(--bg)',border:'1px solid var(--border2)',borderRadius:14,overflow:'hidden',boxShadow:'0 24px 60px rgba(0,0,0,0.15)'}} onClick={e=>e.stopPropagation()}>
            <div style={{display:'flex',alignItems:'center',gap:10,padding:'14px 16px',borderBottom:'1px solid var(--border)'}}>
              <span style={{fontSize:16,color:'var(--t3)'}}>⌕</span>
              <input ref={cmdRef} value={cmdQ} onChange={e=>{setCmdQ(e.target.value);setCmdSel(0)}}
                onKeyDown={e=>{
                  if(e.key==='Escape') closeCmd()
                  else if(e.key==='ArrowDown') setCmdSel(s=>Math.min(s+1,cmdResults.length-1))
                  else if(e.key==='ArrowUp') setCmdSel(s=>Math.max(s-1,0))
                  else if(e.key==='Enter') selectCmd(cmdSel)
                }}
                placeholder="Search companies, funds…"
                style={{flex:1,background:'transparent',border:'none',outline:'none',fontSize:15,color:'var(--text)',fontFamily:"'Plus Jakarta Sans',sans-serif"}}
              />
              <kbd style={{fontSize:10,color:'var(--t3)',background:'var(--bg2)',padding:'2px 6px',borderRadius:4,border:'1px solid var(--border)'}}>ESC</kbd>
            </div>
            <div style={{maxHeight:380,overflowY:'auto'}}>
              {cmdResults.map((r:any,i:number)=>(
                <a key={r.name+i} href={r.type==='company'?'/company/'+r.slug:'/fund/'+r.slug}
                  style={{display:'flex',alignItems:'center',gap:12,padding:'10px 16px',background:i===cmdSel?'rgba(92,210,162,0.08)':'transparent',borderLeft:i===cmdSel?'2px solid #5CD2A2':'2px solid transparent',textDecoration:'none'}}
                  onMouseEnter={()=>setCmdSel(i)}>
                  {r.type==='company'
                    ?<div style={{width:32,height:32,borderRadius:8,background:r.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,color:'#fff',flexShrink:0}}>{ini(r.name)}</div>
                    :<div style={{width:32,height:32,borderRadius:8,background:'var(--bg3)',border:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,flexShrink:0}}>🏦</div>
                  }
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:600,color:'var(--text)',marginBottom:2}}>{r.name}</div>
                    <div style={{fontSize:11,color:'var(--t3)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{r.sub}</div>
                  </div>
                </a>
              ))}
            </div>
            <div style={{padding:'8px 16px',borderTop:'1px solid var(--border)',display:'flex',gap:12,fontSize:10,color:'var(--t3)'}}>
              <span>↑↓ navigate</span><span>↵ select</span><span>ESC close</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
