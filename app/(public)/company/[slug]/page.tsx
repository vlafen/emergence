'use client'
import { useState, useEffect, use, useMemo, useRef } from 'react'
import { useRouter } from 'next/navigation'

const COMPANIES = [
  {n:'Formation Bio',s:'Drug Development AI',sec:'Health',sc:'#16a34a',st:'Series C',r:248,v:1100,e:320,y:2018,date:'Mar 2026',hq:'San Francisco',pf:false,tags:['Drug Discovery','AI-Native','B2B','Clinical AI'],inv:['a16z Bio','Sequoia','Google Ventures'],
   rounds:[{d:'Mar 2026',round:'Series C',amt:248,inv:['a16z Bio','Sequoia','Google Ventures']},{d:'Jan 2024',round:'Series B',amt:120,inv:['Sequoia','GV']},{d:'Jun 2022',round:'Series A',amt:52,inv:['a16z Bio','Y Combinator']}]},
  {n:'EvenUp',s:'Personal Injury Law',sec:'Legal',sc:'#7c3aed',st:'Series C',r:135,v:600,e:290,y:2019,date:'Feb 2026',hq:'San Francisco',pf:false,tags:['Legal AI','Personal Injury','B2B'],inv:['SignalFire','Bessemer','Accel'],
   rounds:[{d:'Feb 2026',round:'Series C',amt:135,inv:['SignalFire','Bessemer','Accel']},{d:'Mar 2024',round:'Series B',amt:65,inv:['Bessemer','Accel']},{d:'Jan 2023',round:'Series A',amt:35,inv:['SignalFire']}]},
  {n:'Prosper',s:'RCM Platform',sec:'Health',sc:'#16a34a',st:'Series B',r:127,v:480,e:210,y:2020,date:'Feb 2026',hq:'New York',pf:true,tags:['RCM','Health AI','Revenue Cycle'],inv:['Emergence Capital','a16z','GV'],
   rounds:[{d:'Feb 2026',round:'Series B',amt:127,inv:['Emergence Capital','a16z','GV']},{d:'Sep 2023',round:'Series A',amt:45,inv:['Emergence Capital']}]},
  {n:'Harper',s:'Commercial Insurance',sec:'Financial',sc:'#2563eb',st:'Series B',r:110,v:450,e:230,y:2019,date:'Jan 2026',hq:'New York',pf:true,tags:['Insurance AI','Commercial Lines','B2B'],inv:['Emergence Capital','Ribbit Capital','QED'],
   rounds:[{d:'Jan 2026',round:'Series B',amt:110,inv:['Emergence Capital','Ribbit Capital','QED']},{d:'Jun 2023',round:'Series A',amt:40,inv:['Emergence Capital','QED']}]},
  {n:'Crosby',s:'Contract Lifecycle',sec:'Legal',sc:'#7c3aed',st:'Series B',r:95,v:380,e:180,y:2019,date:'Jan 2026',hq:'Chicago',pf:true,tags:['CLM','Legal AI','Enterprise'],inv:['Emergence Capital','Tiger Global','Salesforce Ventures'],
   rounds:[{d:'Jan 2026',round:'Series B',amt:95,inv:['Emergence Capital','Tiger Global','Salesforce Ventures']},{d:'Apr 2023',round:'Series A',amt:38,inv:['Emergence Capital']}]},
  {n:'Scale Medicine',s:'Precision Medicine',sec:'Health',sc:'#16a34a',st:'Series B',r:89,v:360,e:145,y:2020,date:'Dec 2025',hq:'Boston',pf:true,tags:['Precision Medicine','Genomics','AI-Native'],inv:['Emergence Capital','Flagship Pioneering'],
   rounds:[{d:'Dec 2025',round:'Series B',amt:89,inv:['Emergence Capital','Flagship Pioneering']},{d:'Mar 2023',round:'Series A',amt:30,inv:['Flagship Pioneering']}]},
  {n:'Mechanical Orchard',s:'Legacy Modernization',sec:'Software',sc:'#d97706',st:'Series B',r:75,v:310,e:190,y:2020,date:'Dec 2025',hq:'San Francisco',pf:true,tags:['Legacy Modernization','Enterprise','AI-Native'],inv:['Emergence Capital','Salesforce Ventures'],
   rounds:[{d:'Dec 2025',round:'Series B',amt:75,inv:['Emergence Capital','Salesforce Ventures']},{d:'May 2023',round:'Series A',amt:28,inv:['Emergence Capital']}]},
  {n:'Irving',s:'M&A Diligence',sec:'Legal',sc:'#7c3aed',st:'Series A',r:45,v:190,e:95,y:2021,date:'Nov 2025',hq:'New York',pf:true,tags:['M&A','Legal AI','Diligence'],inv:['Emergence Capital','Index Ventures'],
   rounds:[{d:'Nov 2025',round:'Series A',amt:45,inv:['Emergence Capital','Index Ventures']}]},
  {n:'LightTable',s:'Construction AI',sec:'Industrial',sc:'#b45309',st:'Series A',r:42,v:170,e:88,y:2021,date:'Nov 2025',hq:'Austin',pf:false,tags:['Construction','Industrial AI','B2B'],inv:['Lux Capital','Founders Fund'],
   rounds:[{d:'Nov 2025',round:'Series A',amt:42,inv:['Lux Capital','Founders Fund']}]},
  {n:'Tessera',s:'API Integration',sec:'Software',sc:'#d97706',st:'Series A',r:41,v:165,e:90,y:2021,date:'Oct 2025',hq:'San Francisco',pf:false,tags:['API','Integration','Developer Tools'],inv:['Sequoia','NEA'],
   rounds:[{d:'Oct 2025',round:'Series A',amt:41,inv:['Sequoia','NEA']}]},
  {n:'AirOps',s:'GTM Automation',sec:'GTM',sc:'#0891b2',st:'Series A',r:38,v:155,e:80,y:2021,date:'Oct 2025',hq:'New York',pf:false,tags:['GTM','Sales AI','Automation'],inv:['Gradient Ventures','Boldstart'],
   rounds:[{d:'Oct 2025',round:'Series A',amt:38,inv:['Gradient Ventures','Boldstart']}]},
  {n:'XBOW',s:'Autonomous Pentesting',sec:'Security',sc:'#dc2626',st:'Series A',r:35,v:150,e:75,y:2022,date:'Sep 2025',hq:'San Francisco',pf:false,tags:['Security','Pentesting','AI-Native'],inv:['Sequoia','Khosla Ventures'],
   rounds:[{d:'Sep 2025',round:'Series A',amt:35,inv:['Sequoia','Khosla Ventures']}]},
  {n:'Outbound AI',s:'Voice AI',sec:'Health',sc:'#16a34a',st:'Series A',r:34,v:140,e:85,y:2021,date:'Sep 2025',hq:'Seattle',pf:false,tags:['Voice AI','Health','Automation'],inv:['General Catalyst','Bessemer'],
   rounds:[{d:'Sep 2025',round:'Series A',amt:34,inv:['General Catalyst','Bessemer']}]},
  {n:'Tribe AI',s:'AI Consulting',sec:'AI Impl.',sc:'#15803d',st:'Series A',r:33,v:130,e:120,y:2019,date:'Aug 2025',hq:'San Francisco',pf:true,tags:['AI Implementation','Consulting','Enterprise'],inv:['Emergence Capital','Homebrew'],
   rounds:[{d:'Aug 2025',round:'Series A',amt:33,inv:['Emergence Capital','Homebrew']}]},
  {n:'Rivet',s:'Accounting AI',sec:'Financial',sc:'#2563eb',st:'Series A',r:31,v:120,e:70,y:2021,date:'Aug 2025',hq:'New York',pf:true,tags:['Accounting','Financial AI','B2B'],inv:['Emergence Capital','Accel'],
   rounds:[{d:'Aug 2025',round:'Series A',amt:31,inv:['Emergence Capital','Accel']}]},
  {n:'Rubie',s:'QA Automation',sec:'Software',sc:'#d97706',st:'Series A',r:28,v:110,e:65,y:2022,date:'Jul 2025',hq:'Remote',pf:true,tags:['QA','Testing','Developer Tools'],inv:['Emergence Capital','Boldstart'],
   rounds:[{d:'Jul 2025',round:'Series A',amt:28,inv:['Emergence Capital','Boldstart']}]},
  {n:'Norm AI',s:'Regulatory Compliance',sec:'Legal',sc:'#7c3aed',st:'Series A',r:27,v:110,e:60,y:2022,date:'Jul 2025',hq:'Washington DC',pf:false,tags:['Compliance','RegTech','Legal AI'],inv:['Coatue','Index Ventures'],
   rounds:[{d:'Jul 2025',round:'Series A',amt:27,inv:['Coatue','Index Ventures']}]},
  {n:'Docshield',s:'Document Automation',sec:'Financial',sc:'#2563eb',st:'Series A',r:22,v:90,e:48,y:2022,date:'Jun 2025',hq:'New York',pf:false,tags:['Document AI','Financial','Automation'],inv:['Gradient Ventures','Fin Capital'],
   rounds:[{d:'Jun 2025',round:'Series A',amt:22,inv:['Gradient Ventures','Fin Capital']}]},
  {n:'RunSybil',s:'AI Red Teaming',sec:'Security',sc:'#dc2626',st:'Seed',r:12,v:55,e:28,y:2023,date:'May 2025',hq:'San Francisco',pf:true,tags:['Red Teaming','Security','AI Safety'],inv:['Emergence Capital','Y Combinator'],
   rounds:[{d:'May 2025',round:'Seed',amt:12,inv:['Emergence Capital','Y Combinator']}]},
  {n:'Evidenza',s:'Market Research AI',sec:'GTM',sc:'#0891b2',st:'Seed',r:8,v:38,e:22,y:2023,date:'Apr 2025',hq:'Remote',pf:false,tags:['Market Research','GTM','AI-Native'],inv:['Y Combinator','Pear VC'],
   rounds:[{d:'Apr 2025',round:'Seed',amt:8,inv:['Y Combinator','Pear VC']}]},
]

const FM:Record<string,{type:string,tier:number,aum:string}>={
  'Emergence Capital':{type:'VC',tier:1,aum:'$2.8B'},
  'a16z Bio':{type:'CVC',tier:1,aum:'$3B'},
  'a16z':{type:'VC',tier:1,aum:'$35B'},
  'Sequoia':{type:'VC',tier:1,aum:'$85B'},
  'Google Ventures':{type:'CVC',tier:1,aum:'$8B'},
  'GV':{type:'CVC',tier:1,aum:'$8B'},
  'SignalFire':{type:'VC',tier:2,aum:'$1.5B'},
  'Bessemer':{type:'VC',tier:1,aum:'$20B'},
  'Accel':{type:'VC',tier:1,aum:'$14B'},
  'Ribbit Capital':{type:'VC',tier:2,aum:'$2.4B'},
  'QED':{type:'VC',tier:2,aum:'$1.8B'},
  'Tiger Global':{type:'Hedge Fund',tier:1,aum:'$50B'},
  'Salesforce Ventures':{type:'CVC',tier:1,aum:'$3B'},
  'Flagship Pioneering':{type:'VC',tier:1,aum:'$4B'},
  'Index Ventures':{type:'VC',tier:1,aum:'$10B'},
  'Lux Capital':{type:'VC',tier:2,aum:'$4.5B'},
  'Founders Fund':{type:'VC',tier:1,aum:'$11B'},
  'NEA':{type:'VC',tier:1,aum:'$25B'},
  'Gradient Ventures':{type:'CVC',tier:2,aum:'$1B'},
  'Boldstart':{type:'VC',tier:2,aum:'$0.4B'},
  'Khosla Ventures':{type:'VC',tier:1,aum:'$15B'},
  'General Catalyst':{type:'VC',tier:1,aum:'$20B'},
  'Homebrew':{type:'VC',tier:2,aum:'$0.3B'},
  'Coatue':{type:'Hedge Fund',tier:1,aum:'$50B'},
  'Fin Capital':{type:'VC',tier:2,aum:'$0.7B'},
  'Y Combinator':{type:'Accelerator',tier:1,aum:'N/A'},
  'Pear VC':{type:'VC',tier:2,aum:'$0.5B'},
}

function toSlug(n:string){return n.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function fmt(n:number){if(!n)return'—';if(n>=1000)return`$${(n/1000).toFixed(1)}B`;return`$${n}M`}
function ini(n:string){return n.split(' ').map((w:string)=>w[0]).join('').slice(0,2).toUpperCase()}

export default function CompanyPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=use(params)
  const co=COMPANIES.find(c=>toSlug(c.n)===slug)
  const router=useRouter()
  const [inWL,setInWL]=useState(false)
  const [toast,setToast]=useState('')
  const [theme,setTheme]=useState<'dark'|'light'>('light')
  const [cmdOpen,setCmdOpen]=useState(false)
  const [cmdQ,setCmdQ]=useState('')
  const [cmdSel,setCmdSel]=useState(0)
  const cmdRef=useRef<HTMLInputElement>(null)

  useEffect(()=>{
    try{const s=JSON.parse(localStorage.getItem('wl_companies')||'[]');setInWL(s.includes(co?.n))}catch{}
  },[co?.n])

  useEffect(()=>{
    const saved=localStorage.getItem('theme') as 'dark'|'light'|null
    if(saved) setTheme(saved)
  },[])

  useEffect(()=>{
    document.documentElement.setAttribute('data-theme',theme)
    localStorage.setItem('theme',theme)
  },[theme])

  useEffect(()=>{
    function onKey(e:KeyboardEvent){
      if((e.metaKey||e.ctrlKey)&&e.key==='k'){e.preventDefault();setCmdOpen(true);setCmdQ('');setCmdSel(0);setTimeout(()=>cmdRef.current?.focus(),50)}
      if(e.key==='Escape') setCmdOpen(false)
    }
    window.addEventListener('keydown',onKey)
    return()=>window.removeEventListener('keydown',onKey)
  },[])

  function toggleWL(){
    if(!co)return
    try{
      const s:string[]=JSON.parse(localStorage.getItem('wl_companies')||'[]')
      const next=inWL?s.filter(n=>n!==co.n):[...s,co.n]
      localStorage.setItem('wl_companies',JSON.stringify(next))
      setInWL(!inWL);setToast(inWL?'Removed from Watchlist':'★ Added to Watchlist')
      setTimeout(()=>setToast(''),2000)
    }catch{}
  }

  const cmdResults=useMemo(()=>{
    const all=[
      ...COMPANIES.map(co=>({type:'company',name:co.n,sub:co.s+' · '+co.sec,slug:toSlug(co.n),color:co.sc})),
    ]
    if(!cmdQ) return all.slice(0,6)
    return all.filter(r=>r.name.toLowerCase().includes(cmdQ.toLowerCase())||r.sub.toLowerCase().includes(cmdQ.toLowerCase())).slice(0,8)
  },[cmdQ])

  if(!co) return(
    <div style={{minHeight:'100vh',background:'var(--bg)',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:12,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
      <div style={{fontSize:14,color:'rgba(255,255,255,.4)'}}>Company not found</div>
      <button onClick={()=>router.push('/dashboard')} style={{padding:'8px 18px',borderRadius:7,fontSize:13,fontWeight:600,background:'#5CD2A2',color:'#fff',border:'none',cursor:'pointer'}}>← Dashboard</button>
    </div>
  )

  const similar=COMPANIES.filter(c=>c.sec===co.sec&&c.n!==co.n).slice(0,3)
  const ratio=co.v&&co.r?(co.v/co.r).toFixed(1)+'×':'—'

  // Find shared investors with other companies
  const invOverlap=co.inv.map(inv=>{
    const count=COMPANIES.filter(c=>c.n!==co.n&&c.inv.includes(inv)).length
    return{inv,count}
  }).filter(x=>x.count>0)

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        :root,[data-theme=light],html[data-theme=light]{--bg:#ffffff;--bg2:#f4f5f7;--bg3:#e8eaed;--border:rgba(0,0,0,.08);--border2:rgba(0,0,0,.16);--text:#0d0d0d;--t2:#0d0d0d;--t3:#444444;--ac:#1a9e6e;--ac-bg:rgba(26,158,110,.07);--ac-b:rgba(26,158,110,.18)}
        [data-theme=dark],html[data-theme=dark]{--bg:#08080f;--bg2:#0d0d1a;--bg3:#111124;--border:rgba(255,255,255,.07);--border2:rgba(255,255,255,.14);--text:#ffffff;--t2:rgba(255,255,255,1);--t3:rgba(255,255,255,.45);--ac:#5CD2A2;--ac-bg:rgba(92,210,162,.08);--ac-b:rgba(92,210,162,.2)}
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Plus Jakarta Sans',sans-serif;margin:0;padding:0;overflow:auto!important}
        .inv-row:hover{border-color:rgba(255,255,255,.14)!important}
        .sim-row:hover{border-color:rgba(255,255,255,.14)!important;cursor:pointer}
        .nav-link:hover{color:var(--t2)!important}
        a{text-decoration:none}
      `}</style>

      {toast&&<div style={{position:'fixed',bottom:24,right:24,zIndex:1000,padding:'10px 18px',borderRadius:8,background:'var(--bg2)',border:'1px solid var(--ac-b)',fontSize:13,fontWeight:500,color:'var(--ac)'}}>{toast}</div>}

      <div style={{minHeight:'100vh',background:'var(--bg)',color:'var(--text)',fontFamily:"'Plus Jakarta Sans',sans-serif",overflowY:'auto'}}>

        {/* NAV */}
        <nav style={{height:48,display:'flex',alignItems:'center',padding:'0 24px',borderBottom:'1px solid var(--border)',background:'var(--bg)',position:'sticky',top:0,zIndex:10}}>
          <a href="/" style={{display:'flex',alignItems:'center',gap:7,fontSize:14,fontWeight:700,letterSpacing:'.1em',color:'var(--text)'}}>
            <div style={{width:7,height:7,borderRadius:'50%',background:'var(--ac)'}}/>INTELLIGENCE
          </a>
          <div style={{display:'flex',alignItems:'center',gap:4,marginLeft:16,fontSize:12,color:'var(--t3)'}}>
            <a href="/dashboard" className="nav-link" style={{color:'var(--t3)',transition:'color .15s'}}>Companies</a>
            <span>/</span>
            <span style={{color:'var(--t2)'}}>{co.n}</span>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:7,marginLeft:'auto'}}>
            <div onClick={()=>{setCmdOpen(true);setCmdQ('');setCmdSel(0);setTimeout(()=>cmdRef.current?.focus(),50)}} style={{display:'flex',alignItems:'center',gap:8,background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:8,padding:'5px 14px',width:200,cursor:'pointer',height:34}}>
              <span style={{fontSize:14,color:'var(--t3)'}}>⌕</span>
              <span style={{fontSize:13,color:'var(--t3)',flex:1}}>Search…</span>
              <kbd style={{fontSize:10,color:'var(--t3)',background:'var(--bg3)',padding:'1px 5px',borderRadius:3,border:'1px solid var(--border)'}}>⌘K</kbd>
            </div>
            <button onClick={()=>setTheme(t=>t==='dark'?'light':'dark')} style={{width:30,height:30,borderRadius:7,border:'1px solid var(--border)',background:'var(--bg2)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,color:'var(--t2)'}}>
              {theme==='dark'?'☀':'☾'}
            </button>
            <a href="/auth" style={{padding:'6px 16px',border:'1px solid var(--border)',borderRadius:6,fontSize:13,fontWeight:500,color:'var(--t2)'}}>Log in</a>
            <a href="/auth?mode=signup" style={{padding:'6px 16px',borderRadius:6,fontSize:13,fontWeight:600,background:'var(--ac)',color:'#fff'}}>Sign up →</a>
          </div>
        </nav>

        {/* CMD+K */}
        {cmdOpen&&(
          <div style={{position:'fixed',inset:0,zIndex:1000,background:'rgba(0,0,0,0.4)',backdropFilter:'blur(4px)',display:'flex',alignItems:'flex-start',justifyContent:'center',paddingTop:'15vh'}} onClick={()=>setCmdOpen(false)}>
            <div style={{width:520,background:'var(--bg)',border:'1px solid var(--border2)',borderRadius:14,overflow:'hidden',boxShadow:'0 24px 60px rgba(0,0,0,0.15)'}} onClick={e=>e.stopPropagation()}>
              <div style={{display:'flex',alignItems:'center',gap:10,padding:'14px 16px',borderBottom:'1px solid var(--border)'}}>
                <span style={{fontSize:16,color:'var(--t3)'}}>⌕</span>
                <input ref={cmdRef} value={cmdQ} onChange={e=>{setCmdQ(e.target.value);setCmdSel(0)}}
                  onKeyDown={e=>{
                    if(e.key==='Escape') setCmdOpen(false)
                    else if(e.key==='ArrowDown') setCmdSel(s=>Math.min(s+1,cmdResults.length-1))
                    else if(e.key==='ArrowUp') setCmdSel(s=>Math.max(s-1,0))
                    else if(e.key==='Enter'){const r=cmdResults[cmdSel];if(r){setCmdOpen(false);router.push('/company/'+r.slug)}}
                  }}
                  placeholder="Search companies…"
                  style={{flex:1,background:'transparent',border:'none',outline:'none',fontSize:15,color:'var(--text)',fontFamily:"'Plus Jakarta Sans',sans-serif"}}
                />
                <kbd style={{fontSize:10,color:'var(--t3)',background:'var(--bg2)',padding:'2px 6px',borderRadius:4,border:'1px solid var(--border)'}}>ESC</kbd>
              </div>
              <div style={{maxHeight:320,overflowY:'auto'}}>
                {cmdResults.map((r:any,i:number)=>(
                  <a key={r.name} href={'/company/'+r.slug} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 16px',background:i===cmdSel?'var(--ac-bg)':'transparent',borderLeft:i===cmdSel?'2px solid var(--ac)':'2px solid transparent',textDecoration:'none'}} onMouseEnter={()=>setCmdSel(i)}>
                    <div style={{width:30,height:30,borderRadius:7,background:r.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:700,color:'#fff',flexShrink:0}}>{ini(r.name)}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:13,fontWeight:600,color:'var(--text)'}}>{r.name}</div>
                      <div style={{fontSize:11,color:'var(--t3)'}}>{r.sub}</div>
                    </div>
                  </a>
                ))}
              </div>
              <div style={{padding:'8px 16px',borderTop:'1px solid var(--border)',fontSize:10,color:'var(--t3)',display:'flex',gap:12}}>
                <span>↑↓ navigate</span><span>↵ open</span><span>ESC close</span>
              </div>
            </div>
          </div>
        )}

        {/* MAIN LAYOUT */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 240px',maxWidth:1100,margin:'0 auto'}}>

          {/* LEFT CONTENT */}
          <div style={{padding:'28px 32px',borderRight:'1px solid var(--border)',minWidth:0}}>

            {/* HERO */}
            <div style={{display:'flex',alignItems:'flex-start',gap:16,marginBottom:24,paddingBottom:24,borderBottom:'1px solid var(--border)'}}>
              <div style={{width:52,height:52,borderRadius:13,background:co.sc,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,fontWeight:700,color:'#fff',flexShrink:0}}>{ini(co.n)}</div>
              <div style={{flex:1}}>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4,flexWrap:'wrap'}}>
                  <h1 style={{fontSize:22,fontWeight:700,color:'var(--text)'}}>{co.n}</h1>
                  {co.pf&&<span style={{padding:'2px 8px',borderRadius:5,fontSize:11,fontWeight:700,background:'var(--ac-bg)',color:'var(--ac)',border:'1px solid var(--ac-b)'}}>★ Portfolio</span>}
                </div>
                <div style={{fontSize:13,color:'var(--t3)',marginBottom:10}}>{co.s} · {co.sec} · {co.hq}</div>
                <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>
                  <span style={{padding:'2px 8px',borderRadius:4,fontSize:11,fontWeight:600,background:'rgba(111,163,239,.08)',color:'#6FA3EF',border:'1px solid rgba(111,163,239,.2)'}}>{co.st}</span>
                  <span style={{padding:'2px 8px',borderRadius:4,fontSize:11,background:'var(--bg3)',color:'var(--t3)',border:'1px solid var(--border)'}}>Founded {co.y}</span>
                  <span style={{padding:'2px 8px',borderRadius:4,fontSize:11,background:'var(--bg3)',color:'var(--t3)',border:'1px solid var(--border)'}}>{co.e} employees</span>
                  <span style={{padding:'2px 8px',borderRadius:4,fontSize:11,background:'var(--bg3)',color:'var(--t3)',border:'1px solid var(--border)'}}>Last round {co.date}</span>
                </div>
              </div>
              <button onClick={toggleWL} style={{display:'flex',alignItems:'center',gap:6,padding:'7px 16px',borderRadius:7,fontSize:13,fontWeight:600,background:inWL?'var(--ac-bg)':'rgba(255,255,255,.05)',color:inWL?'var(--ac)':'var(--t3)',border:`1px solid ${inWL?'var(--ac-b)':'var(--border)'}`,cursor:'pointer',flexShrink:0}}>
                {inWL?'★ In Watchlist':'☆ Watchlist'}
              </button>
            </div>

            {/* METRICS */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginBottom:28}}>
              {[
                {l:'Total Raised',v:fmt(co.r),green:true},
                {l:'Valuation',v:fmt(co.v),green:false},
                {l:'Employees',v:String(co.e),green:false},
                {l:'Val / Raised',v:ratio,green:false},
              ].map(m=>(
                <div key={m.l} style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:10,padding:'14px 16px'}}>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:20,fontWeight:500,color:m.green?'var(--ac)':'var(--text)',marginBottom:4}}>{m.v}</div>
                  <div style={{fontSize:11,textTransform:'uppercase',letterSpacing:'.06em',color:'var(--t3)'}}>{m.l}</div>
                </div>
              ))}
            </div>

            {/* FUNDING TIMELINE */}
            <div style={{marginBottom:28}}>
              <div style={{fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--t3)',marginBottom:14}}>Funding timeline</div>
              <div style={{display:'flex',flexDirection:'column',gap:0}}>
                {co.rounds.map((rd,i)=>(
                  <div key={i} style={{display:'flex',gap:14,paddingBottom:16,borderBottom:i<co.rounds.length-1?'1px solid rgba(255,255,255,.05)':'none',marginBottom:i<co.rounds.length-1?16:0}}>
                    <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4,flexShrink:0}}>
                      <div style={{width:10,height:10,borderRadius:'50%',background:i===0?'var(--ac)':'rgba(255,255,255,.2)',flexShrink:0}}/>
                      {i<co.rounds.length-1&&<div style={{width:1,height:'100%',background:'rgba(255,255,255,.06)',flex:1}}/>}
                    </div>
                    <div style={{flex:1}}>
                      <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:4}}>
                        <span style={{fontFamily:"'DM Mono',monospace",fontSize:12,color:'var(--t3)',width:68}}>{rd.d}</span>
                        <span style={{fontSize:13,fontWeight:700,color:'var(--text)'}}>{rd.round}</span>
                        <span style={{fontFamily:"'DM Mono',monospace",fontSize:14,fontWeight:600,color:i===0?'var(--ac)':'rgba(255,255,255,.6)',marginLeft:'auto'}}>{fmt(rd.amt)}</span>
                      </div>
                      <div style={{fontSize:12,color:'var(--t3)',marginLeft:78}}>{rd.inv.join(' · ')}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* INVESTORS */}
            <div style={{marginBottom:28}}>
              <div style={{fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--t3)',marginBottom:14}}>Investors ({co.inv.length})</div>
              <div style={{display:'flex',flexDirection:'column',gap:6}}>
                {co.inv.map(inv=>{
                  const fm=FM[inv]
                  return(
                    <a key={inv} href={'/fund/'+toSlug(inv)} className="inv-row" style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:8,transition:'border-color .15s'}}>
                      <div style={{width:28,height:28,borderRadius:6,background:'var(--bg3)',border:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:700,color:'var(--t3)',flexShrink:0}}>{ini(inv)}</div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:14,fontWeight:600,color:'var(--text)'}}>{inv}</div>
                        {fm&&<div style={{fontSize:11,color:'var(--t3)',marginTop:1}}>{fm.type} · Tier {fm.tier} · AUM {fm.aum}</div>}
                      </div>
                      <div style={{fontSize:12,color:'var(--ac)'}}>→ Fund</div>
                    </a>
                  )
                })}
              </div>
            </div>

            {/* SIMILAR COMPANIES */}
            {similar.length>0&&(
              <div>
                <div style={{fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--t3)',marginBottom:14}}>Similar companies in {co.sec}</div>
                <div style={{display:'flex',flexDirection:'column',gap:6}}>
                  {similar.map(c=>(
                    <a key={c.n} href={'/company/'+toSlug(c.n)} className="sim-row" style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:8,transition:'border-color .15s'}}>
                      <div style={{width:28,height:28,borderRadius:6,background:c.sc,display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:700,color:'#fff',flexShrink:0}}>{ini(c.n)}</div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:14,fontWeight:600,color:'var(--text)'}}>{c.n}{c.pf&&<span style={{marginLeft:5,fontSize:10,color:'var(--ac)'}}>★</span>}</div>
                        <div style={{fontSize:11,color:'var(--t3)',marginTop:1}}>{c.s}</div>
                      </div>
                      <span style={{padding:'2px 7px',borderRadius:4,fontSize:11,fontWeight:600,background:'rgba(111,163,239,.08)',color:'#6FA3EF',border:'1px solid rgba(111,163,239,.2)',whiteSpace:'nowrap'}}>{c.st}</span>
                      <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:'var(--ac)',fontWeight:500,minWidth:50,textAlign:'right'}}>{fmt(c.r)}</div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <div style={{padding:'28px 20px',display:'flex',flexDirection:'column',gap:0}}>

            {/* ACTION BUTTONS */}
            <div style={{display:'flex',flexDirection:'column',gap:6,marginBottom:24}}>
              <button onClick={()=>{
                const headers=['Name','Description','Sector','Stage','Raised','Valuation','Employees','Founded','HQ','Investors']
                const row=[co.n,co.s,co.sec,co.st,fmt(co.r),fmt(co.v),co.e,co.y,co.hq,co.inv.join('; ')]
                const csv=[headers,row].map(r=>r.map(v=>`"${v}"`).join(',')).join('\n')
                const blob=new Blob([csv],{type:'text/csv'})
                const url=URL.createObjectURL(blob)
                const a=document.createElement('a');a.href=url;a.download=toSlug(co.n)+'.csv';a.click()
                URL.revokeObjectURL(url)
              }} style={{width:'100%',padding:'9px',borderRadius:7,fontSize:13,fontWeight:600,background:'var(--bg2)',border:'1px solid var(--border)',color:'var(--t2)',cursor:'pointer',textAlign:'center'}}>
                ↓ Export to CSV
              </button>
              <a href={`/compare?cos=${toSlug(co.n)}`} style={{display:'block',width:'100%',padding:'9px',borderRadius:7,fontSize:13,fontWeight:600,background:'rgba(111,163,239,.08)',border:'1px solid rgba(111,163,239,.2)',color:'#6FA3EF',cursor:'pointer',textAlign:'center'}}>
                ⚖ Compare
              </a>
            </div>

            {/* DETAILS */}
            <div style={{marginBottom:20,paddingBottom:20,borderBottom:'1px solid var(--border)'}}>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--t3)',marginBottom:10}}>Company details</div>
              <table style={{width:'100%',fontSize:12,borderCollapse:'collapse'}}>
                <tbody>
                {[
                  ['Sector',co.sec],
                  ['Stage',co.st],
                  ['Founded',String(co.y)],
                  ['Employees',String(co.e)],
                  ['HQ',co.hq],
                  ['Last round',co.date],
                ].map(([l,v])=>(
                  <tr key={l}>
                    <td style={{color:'var(--t3)',padding:'4px 0'}}>{l}</td>
                    <td style={{color:'var(--text)',textAlign:'right',padding:'4px 0',fontWeight:500}}>{v}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>

            {/* TAGS */}
            {co.tags.length>0&&(
              <div style={{marginBottom:20,paddingBottom:20,borderBottom:'1px solid var(--border)'}}>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--t3)',marginBottom:10}}>Tags</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
                  {co.tags.map(t=>(
                    <span key={t} style={{padding:'3px 8px',borderRadius:4,fontSize:11,background:'var(--bg3)',border:'1px solid var(--border)',color:'var(--t3)'}}>{t}</span>
                  ))}
                </div>
              </div>
            )}

            {/* PORTFOLIO STATUS */}
            {co.pf&&(
              <div style={{marginBottom:20,paddingBottom:20,borderBottom:'1px solid var(--border)'}}>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--t3)',marginBottom:10}}>Portfolio status</div>
                <div style={{fontSize:13,color:'var(--ac)',fontWeight:600,marginBottom:3}}>★ Emergence Capital portfolio</div>
                <div style={{fontSize:11,color:'var(--t3)'}}>Tracked investment</div>
              </div>
            )}

            {/* INVESTOR OVERLAP */}
            {invOverlap.length>0&&(
              <div>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--t3)',marginBottom:10}}>Investor overlap</div>
                <div style={{fontSize:11,color:'var(--t3)',marginBottom:8}}>Shared with other companies</div>
                {invOverlap.map(x=>(
                  <div key={x.inv} style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:5}}>
                    <span style={{color:'var(--t2)'}}>{x.inv}</span>
                    <span style={{color:'var(--ac)',fontFamily:"'DM Mono',monospace"}}>{x.count} co-inv</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
