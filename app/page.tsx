'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const SECTORS=[
  {n:'Health AI',c:'#16a34a',companies:['Formation Bio','Prosper','Scale Medicine','Outbound AI'],desc:'Drug discovery, RCM, precision medicine, voice AI'},
  {n:'Legal AI',c:'#7c3aed',companies:['EvenUp','Crosby','Irving','Norm AI'],desc:'Personal injury, contract lifecycle, M&A diligence'},
  {n:'Financial AI',c:'#2563eb',companies:['Harper','Rivet','Docshield'],desc:'Commercial insurance, accounting, document processing'},
  {n:'Software Impl.',c:'#d97706',companies:['Mechanical Orchard','Tessera','Rubie'],desc:'Legacy modernization, API integration, QA automation'},
  {n:'Security AI',c:'#dc2626',companies:['XBOW','RunSybil'],desc:'Autonomous pentesting, AI red teaming'},
  {n:'GTM AI',c:'#0891b2',companies:['AirOps','Evidenza'],desc:'GTM automation, market research, sales intelligence'},
]

const ROUNDS=[
  {co:'Formation Bio',ticker:'FB',color:'#16a34a',round:'Series C',date:'Mar 2026',raised:'$248M',inv:['a16z Bio','Sequoia']},
  {co:'EvenUp',ticker:'EU',color:'#7c3aed',round:'Series C',date:'Feb 2026',raised:'$135M',inv:['SignalFire','Bessemer']},
  {co:'Harper',ticker:'H',color:'#2563eb',round:'Series B',date:'Feb 2026',raised:'$110M',inv:['Emergence Capital','Ribbit Capital']},
  {co:'Crosby',ticker:'CR',color:'#7c3aed',round:'Series B',date:'Jan 2026',raised:'$95M',inv:['Emergence Capital','Tiger Global']},
  {co:'Scale Medicine',ticker:'SM',color:'#16a34a',round:'Series B',date:'Jan 2026',raised:'$89M',inv:['Emergence Capital','Flagship']},
]

function toSlug(n:string){return n.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}

export default function LandingPage(){
  const router=useRouter()
  const [theme,setTheme]=useState<'dark'|'light'>('dark')
  const [email,setEmail]=useState('')
  const [submitted,setSubmitted]=useState(false)

  useEffect(()=>{
    const s=localStorage.getItem('theme') as 'dark'|'light'|null
    if(s){setTheme(s);document.documentElement.setAttribute('data-theme',s)}
    else document.documentElement.setAttribute('data-theme','dark')
  },[])

  function toggleTheme(){
    const next=theme==='dark'?'light':'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme',next)
    localStorage.setItem('theme',next)
  }

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'DM Sans',sans-serif;margin:0;padding:0;overflow-y:auto}
        html[data-theme=dark],html:not([data-theme]){--bg:#0a0a0f;--bg2:#111118;--bg3:#1a1a24;--border:rgba(255,255,255,.07);--border2:rgba(255,255,255,.13);--text:#f0f4fa;--t2:#c8d4e8;--t3:rgba(200,212,232,.42);--ac:#2563EB;--ac-bg:rgba(37,99,235,.1);--ac-b:rgba(37,99,235,.25);--ac-t:#7aaff7}
        html[data-theme=light]{--bg:#f4f2ed;--bg2:#ffffff;--bg3:#f0ede6;--border:rgba(0,0,0,.08);--border2:rgba(0,0,0,.16);--text:#0d0d0d;--t2:#2a2a2a;--t3:rgba(10,10,10,.42);--ac:#2563EB;--ac-bg:rgba(37,99,235,.08);--ac-b:rgba(37,99,235,.22);--ac-t:#1d4ed8}
        .nav-link:hover{color:var(--t2)!important}
        .sec-card:hover{border-color:var(--border2)!important;transform:translateY(-1px)}
        .round-row:hover{background:rgba(37,99,235,.04)}
        .hero-btn:hover{opacity:.88}
        .logo-co:hover{background:var(--bg3)!important}
        input::placeholder{color:var(--t3)}
        button:focus{outline:none}
      `}</style>

      <div data-theme={theme} style={{minHeight:'100vh',background:'var(--bg)',color:'var(--text)'}}>

        {/* NAV */}
        <nav style={{height:52,display:'flex',alignItems:'center',padding:'0 32px',background:'var(--bg2)',borderBottom:'1px solid var(--border)',position:'sticky',top:0,zIndex:100}}>
          <div style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer'}} onClick={()=>router.push('/')}>
            <div style={{width:28,height:28,borderRadius:6,background:'var(--ac)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:800,color:'#fff'}}>EM</div>
            <div>
              <div style={{fontSize:13,fontWeight:700,letterSpacing:'.07em',textTransform:'uppercase',color:'var(--text)'}}>EmergentMap</div>
              <div style={{fontSize:9,color:'var(--t3)'}}>AI-Native Services</div>
            </div>
          </div>
          <div style={{display:'flex',gap:4,marginLeft:28}}>
            {[['Dashboard','/dashboard'],['Funds','/funds'],['Watchlist','/watchlist']].map(([l,h])=>(
              <div key={l} className="nav-link" onClick={()=>router.push(h)} style={{padding:'0 12px',height:52,display:'flex',alignItems:'center',fontSize:13,fontWeight:500,color:'var(--t3)',cursor:'pointer',transition:'color .15s'}}>{l}</div>
            ))}
          </div>
          <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:8}}>
            <button onClick={toggleTheme} style={{width:30,height:30,borderRadius:7,border:'1px solid var(--border)',background:'var(--bg3)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,color:'var(--t2)'}}>
              {theme==='dark'?'☀':'☾'}
            </button>
            <button onClick={()=>router.push('/auth')} style={{padding:'7px 16px',border:'1px solid var(--border)',borderRadius:6,background:'transparent',color:'var(--t2)',fontSize:13,cursor:'pointer',fontFamily:"'DM Sans',sans-serif"}}>Log in</button>
            <button onClick={()=>router.push('/auth?mode=signup')} style={{padding:'7px 16px',border:'none',borderRadius:6,background:'var(--ac)',color:'#fff',fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:"'DM Sans',sans-serif"}}>Get access →</button>
          </div>
        </nav>

        {/* HERO */}
        <div style={{textAlign:'center',padding:'72px 32px 56px',maxWidth:760,margin:'0 auto'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:8,padding:'5px 14px',borderRadius:20,border:'1px solid var(--ac-b)',background:'var(--ac-bg)',color:'var(--ac-t)',fontSize:11,fontWeight:600,letterSpacing:'.06em',textTransform:'uppercase',marginBottom:24}}>
            AI-NATIVE SERVICES INTELLIGENCE
          </div>
          <h1 style={{fontSize:52,fontWeight:700,lineHeight:1.1,letterSpacing:'-.02em',color:'var(--text)',marginBottom:20}}>
            The market intelligence<br/>platform for{' '}
            <span style={{color:'var(--ac-t)'}}>AI-native<br/>service companies</span>
          </h1>
          <p style={{fontSize:17,color:'var(--t3)',lineHeight:1.65,marginBottom:36}}>
            Track funding, investors, and competitive landscape across Health, Legal,<br/>Financial, and Software AI companies replacing traditional professional services.
          </p>
          <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
            <button className="hero-btn" onClick={()=>router.push('/dashboard')} style={{padding:'12px 28px',borderRadius:8,background:'var(--ac)',color:'#fff',fontSize:14,fontWeight:600,border:'none',cursor:'pointer',fontFamily:"'DM Sans',sans-serif",transition:'opacity .15s'}}>
              Explore the platform →
            </button>
            <button className="hero-btn" onClick={()=>router.push('/funds')} style={{padding:'12px 28px',borderRadius:8,background:'var(--bg2)',color:'var(--t2)',fontSize:14,fontWeight:500,border:'1px solid var(--border)',cursor:'pointer',fontFamily:"'DM Sans',sans-serif",transition:'opacity .15s'}}>
              View investors
            </button>
          </div>
        </div>

        {/* STATS */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:1,background:'var(--border)',maxWidth:900,margin:'0 auto 64px',borderRadius:12,overflow:'hidden',border:'1px solid var(--border)'}}>
          {[['20+','AI-Native Companies'],['$1.4B','Total Capital Raised'],['8','Service Sectors'],['27','Top Investors Tracked']].map(([v,l])=>(
            <div key={l} style={{padding:'24px 20px',background:'var(--bg2)',textAlign:'center'}}>
              <div style={{fontSize:32,fontWeight:700,color:'var(--ac-t)',fontFamily:"'DM Mono',monospace",letterSpacing:'-.02em'}}>{v}</div>
              <div style={{fontSize:11,color:'var(--t3)',textTransform:'uppercase',letterSpacing:'.08em',marginTop:4}}>{l}</div>
            </div>
          ))}
        </div>

        {/* SECTORS */}
        <div style={{maxWidth:1100,margin:'0 auto 64px',padding:'0 32px'}}>
          <h2 style={{fontSize:26,fontWeight:600,color:'var(--text)',marginBottom:6}}>Service Verticals</h2>
          <p style={{fontSize:14,color:'var(--t3)',marginBottom:28}}>AI companies replacing traditional professional services across 6 core verticals</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12}}>
            {SECTORS.map(s=>(
              <div key={s.n} className="sec-card" onClick={()=>router.push('/dashboard')} style={{padding:'18px 20px',background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:10,cursor:'pointer',transition:'all .15s'}}>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}>
                  <div style={{width:8,height:8,borderRadius:'50%',background:s.c,flexShrink:0}}/>
                  <div style={{fontSize:14,fontWeight:600,color:'var(--text)'}}>{s.n}</div>
                  <div style={{marginLeft:'auto',fontSize:11,color:'var(--t3)',background:'var(--bg3)',padding:'2px 8px',borderRadius:10}}>{s.companies.length}</div>
                </div>
                <p style={{fontSize:12,color:'var(--t3)',lineHeight:1.5,marginBottom:12}}>{s.desc}</p>
                <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
                  {s.companies.slice(0,3).map(c=>(
                    <span key={c} style={{fontSize:10,padding:'2px 7px',borderRadius:4,background:'var(--bg3)',border:'1px solid var(--border)',color:'var(--t3)'}}>{c}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT ROUNDS */}
        <div style={{maxWidth:1100,margin:'0 auto 64px',padding:'0 32px'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
            <div>
              <h2 style={{fontSize:26,fontWeight:600,color:'var(--text)',marginBottom:4}}>Recent Funding Rounds</h2>
              <p style={{fontSize:14,color:'var(--t3)'}}>Latest deals tracked across the AI-native services landscape</p>
            </div>
            <button onClick={()=>router.push('/dashboard')} style={{padding:'8px 16px',border:'1px solid var(--border)',borderRadius:7,background:'transparent',color:'var(--t2)',fontSize:13,cursor:'pointer',fontFamily:"'DM Sans',sans-serif"}}>View all →</button>
          </div>
          <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:10,overflow:'hidden'}}>
            {ROUNDS.map((r,i)=>(
              <div key={r.co} className="round-row" onClick={()=>router.push('/company/'+toSlug(r.co))} style={{display:'flex',alignItems:'center',gap:16,padding:'14px 20px',borderBottom:i<ROUNDS.length-1?'1px solid var(--border)':'none',cursor:'pointer',transition:'background .1s'}}>
                <div style={{width:32,height:32,borderRadius:8,background:r.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,color:'#fff',flexShrink:0}}>{r.ticker}</div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>{r.co}</div>
                  <div style={{fontSize:11,color:'var(--t3)',marginTop:1}}>{r.inv.join(' · ')}</div>
                </div>
                <div style={{padding:'3px 8px',borderRadius:5,fontSize:10,fontWeight:600,background:'var(--ac-bg)',color:'var(--ac-t)',border:'1px solid var(--ac-b)'}}>{r.round}</div>
                <div style={{fontSize:14,fontWeight:700,color:'var(--ac-t)',fontFamily:"'DM Mono',monospace",minWidth:60,textAlign:'right'}}>{r.raised}</div>
                <div style={{fontSize:11,color:'var(--t3)',minWidth:60,textAlign:'right'}}>{r.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{maxWidth:640,margin:'0 auto 80px',padding:'0 32px',textAlign:'center'}}>
          <h2 style={{fontSize:28,fontWeight:600,color:'var(--text)',marginBottom:12}}>Get early access</h2>
          <p style={{fontSize:14,color:'var(--t3)',marginBottom:24}}>Join analysts and investors tracking the AI-native services revolution</p>
          {!submitted?(
            <div style={{display:'flex',gap:8,maxWidth:440,margin:'0 auto'}}>
              <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" style={{flex:1,padding:'10px 14px',border:'1px solid var(--border)',borderRadius:7,background:'var(--bg2)',color:'var(--text)',fontSize:13,fontFamily:"'DM Sans',sans-serif"}}/>
              <button onClick={()=>{if(email.includes('@')){setSubmitted(true);setEmail('')}}} style={{padding:'10px 20px',borderRadius:7,background:'var(--ac)',color:'#fff',border:'none',fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:"'DM Sans',sans-serif"}}>Request access</button>
            </div>
          ):(
            <div style={{padding:'14px 24px',borderRadius:8,background:'var(--ac-bg)',border:'1px solid var(--ac-b)',color:'var(--ac-t)',fontSize:14,fontWeight:500}}>
              ✓ You're on the list — we'll be in touch soon
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div style={{borderTop:'1px solid var(--border)',padding:'20px 32px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{fontSize:12,color:'var(--t3)'}}>© 2026 EmergentMap · AI-Native Services Intelligence</div>
          <div style={{fontSize:12,color:'var(--t3)'}}>by Emergence Capital</div>
        </div>
      </div>
    </>
  )
}
