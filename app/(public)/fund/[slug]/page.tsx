'use client'
import { useState, useEffect, use, useMemo, useRef } from 'react'
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

const FM: Record<string,{type:string,tier:number,focus:string[],aum:string,hq:string}>={
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
  'Tiger Global':{type:'Hedge Fund',tier:1,focus:['SaaS','Consumer','FinTech'],aum:'$50B',hq:'New York'},
  'Salesforce Ventures':{type:'CVC',tier:1,focus:['Enterprise SaaS','AI'],aum:'$3B',hq:'San Francisco'},
  'Flagship Pioneering':{type:'VC',tier:1,focus:['Bio','Life Sciences'],aum:'$4B',hq:'Cambridge'},
  'Index Ventures':{type:'VC',tier:1,focus:['Enterprise','Consumer'],aum:'$10B',hq:'San Francisco'},
  'Lux Capital':{type:'VC',tier:2,focus:['Deep Tech','Frontier'],aum:'$4.5B',hq:'New York'},
  'Founders Fund':{type:'VC',tier:1,focus:['Deep Tech','AI','Defense'],aum:'$11B',hq:'San Francisco'},
  'NEA':{type:'VC',tier:1,focus:['Enterprise','Healthcare'],aum:'$25B',hq:'Chevy Chase'},
  'Gradient Ventures':{type:'CVC',tier:2,focus:['AI-first Startups'],aum:'$1B',hq:'Mountain View'},
  'Boldstart':{type:'VC',tier:2,focus:['Dev Tools','Enterprise'],aum:'$0.4B',hq:'New York'},
  'Khosla Ventures':{type:'VC',tier:1,focus:['Deep Tech','AI','Climate'],aum:'$15B',hq:'Menlo Park'},
  'General Catalyst':{type:'VC',tier:1,focus:['Health','Enterprise','Consumer'],aum:'$20B',hq:'Cambridge'},
  'Homebrew':{type:'VC',tier:2,focus:['Enterprise','Consumer'],aum:'$0.3B',hq:'San Francisco'},
  'Coatue':{type:'Hedge Fund',tier:1,focus:['Tech','AI','Consumer'],aum:'$50B',hq:'New York'},
  'Fin Capital':{type:'VC',tier:2,focus:['Fintech','Financial Services'],aum:'$0.7B',hq:'San Francisco'},
  'Y Combinator':{type:'Accelerator',tier:1,focus:['All Sectors'],aum:'N/A',hq:'Mountain View'},
  'Pear VC':{type:'VC',tier:2,focus:['Enterprise','Consumer'],aum:'$0.5B',hq:'Palo Alto'},
}

function toSlug(n:string){return n.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function fmt(n:number){if(!n)return'—';if(n>=1000)return`$${(n/1000).toFixed(1)}B`;return`$${n}M`}
function ini(n:string){return n.split(' ').map((w:string)=>w[0]).join('').slice(0,2).toUpperCase()}
function getAllFundNames(){const s=new Set<string>();D.forEach(c=>c.inv.forEach(i=>s.add(i)));return Array.from(s)}

export default function FundPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=use(params)
  const router=useRouter()
  const [inWL,setInWL]=useState(false)
  const [toast,setToast]=useState('')
  const [theme,setTheme]=useState<'dark'|'light'>('light')
  const [cmdOpen,setCmdOpen]=useState(false)
  const [cmdQ,setCmdQ]=useState('')
  const [cmdSel,setCmdSel]=useState(0)
  const cmdRef=useRef<HTMLInputElement>(null)

  const fundName=getAllFundNames().find(n=>toSlug(n)===slug)
  const fm=fundName?FM[fundName]:null
  const cos=fundName?D.filter(c=>c.inv.includes(fundName)):[]
  const pf=cos.filter(c=>c.pf)
  const other=cos.filter(c=>!c.pf)
  const raised=cos.reduce((s,c)=>s+c.r,0)
  const avgCheck=cos.length>0?Math.round(raised/cos.length):0

  const stageCounts=useMemo(()=>{const m:Record<string,number>={};cos.forEach(c=>{m[c.st]=(m[c.st]||0)+1});return Object.entries(m).sort((a,b)=>b[1]-a[1])},[cos])
  const sectorCounts=useMemo(()=>{const m:Record<string,number>={};cos.forEach(c=>{m[c.sec]=(m[c.sec]||0)+1});return Object.entries(m).sort((a,b)=>b[1]-a[1])},[cos])
  const coInvestors=useMemo(()=>{
    if(!fundName) return []
    const m:Record<string,number>={}
    cos.forEach(c=>{c.inv.forEach(inv=>{if(inv!==fundName) m[inv]=(m[inv]||0)+1})})
    return Object.entries(m).sort((a,b)=>b[1]-a[1]).slice(0,5)
  },[cos,fundName])

  useEffect(()=>{try{const s=JSON.parse(localStorage.getItem('wl_funds')||'[]');setInWL(s.includes(fundName))}catch{}},[fundName])

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

  const cmdResults=useMemo(()=>{
    const all=[...D.map(co=>({type:'company',name:co.n,sub:co.s+' · '+co.sec,slug:toSlug(co.n),color:co.sc}))]
    if(!cmdQ) return all.slice(0,6)
    return all.filter(r=>r.name.toLowerCase().includes(cmdQ.toLowerCase())).slice(0,8)
  },[cmdQ])

  function toggleWL(){
    if(!fundName)return
    try{
      const s:string[]=JSON.parse(localStorage.getItem('wl_funds')||'[]')
      const next=inWL?s.filter(n=>n!==fundName):[...s,fundName]
      localStorage.setItem('wl_funds',JSON.stringify(next))
      setInWL(!inWL);setToast(inWL?'Removed':'★ Added to Watchlist')
      setTimeout(()=>setToast(''),2000)
    }catch{}
  }

  function exportCSV(){
    const headers=['Fund','Type','Tier','AUM','HQ','AI Companies','Deployed','Avg Check','Focus','Portfolio']
    const row=[fundName,fm?.type,`Tier ${fm?.tier}`,fm?.aum,fm?.hq,cos.length,fmt(raised),fmt(avgCheck),fm?.focus.join('; '),pf.map(c=>c.n).join('; ')]
    const csv=[headers,row].map(r=>r.map(v=>`"${v}"`).join(',')).join('\n')
    const blob=new Blob([csv],{type:'text/csv'})
    const url=URL.createObjectURL(blob)
    const a=document.createElement('a');a.href=url;a.download=(fundName?toSlug(fundName):'fund')+'.csv';a.click()
    URL.revokeObjectURL(url)
  }

  if(!fundName) return(
    <div style={{minHeight:'100vh',background:'var(--bg)',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:12,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
      <div style={{fontSize:14,color:'rgba(255,255,255,.4)'}}>Fund not found</div>
      <button onClick={()=>router.push('/funds')} style={{padding:'8px 18px',borderRadius:7,fontSize:13,fontWeight:600,background:'#5CD2A2',color:'#fff',border:'none',cursor:'pointer'}}>← Funds</button>
    </div>
  )

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        :root,[data-theme=light],html[data-theme=light]{--bg:#ffffff;--bg2:#f4f5f7;--bg3:#e8eaed;--border:rgba(0,0,0,.08);--border2:rgba(0,0,0,.16);--text:#0d0d0d;--t2:#0d0d0d;--t3:#444444;--ac:#1a9e6e;--ac-bg:rgba(26,158,110,.07);--ac-b:rgba(26,158,110,.18)}
        [data-theme=dark],html[data-theme=dark]{--bg:#08080f;--bg2:#0d0d1a;--bg3:#111124;--border:rgba(255,255,255,.07);--border2:rgba(255,255,255,.14);--text:#ffffff;--t2:rgba(255,255,255,1);--t3:rgba(255,255,255,.45);--ac:#5CD2A2;--ac-bg:rgba(92,210,162,.08);--ac-b:rgba(92,210,162,.2)}
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Plus Jakarta Sans',sans-serif;margin:0;padding:0;overflow:auto!important}
        .co-row:hover{border-color:rgba(255,255,255,.14)!important}
        .nav-link:hover{color:var(--t2)!important}
        a{text-decoration:none;color:inherit}
      `}</style>

      {toast&&<div style={{position:'fixed',bottom:24,right:24,zIndex:1000,padding:'10px 18px',borderRadius:8,background:'var(--bg2)',border:'1px solid var(--ac-b)',fontSize:13,fontWeight:500,color:'var(--ac)'}}>{toast}</div>}

      <div style={{minHeight:'100vh',background:'var(--bg)',color:'var(--text)',fontFamily:"'Plus Jakarta Sans',sans-serif",overflowY:'auto'}}>
        <nav style={{height:48,display:'flex',alignItems:'center',padding:'0 24px',borderBottom:'1px solid var(--border)',background:'var(--bg)',position:'sticky',top:0,zIndex:10}}>
          <a href="/" style={{display:'flex',alignItems:'center',gap:7,fontSize:14,fontWeight:700,letterSpacing:'.1em',color:'var(--text)'}}>
            <div style={{width:7,height:7,borderRadius:'50%',background:'var(--ac)'}}/>INTELLIGENCE
          </a>
          <div style={{display:'flex',alignItems:'center',gap:4,marginLeft:16,fontSize:12,color:'var(--t3)'}}>
            <a href="/funds" className="nav-link" style={{color:'var(--t3)',transition:'color .15s'}}>Funds</a>
            <span>/</span>
            <span style={{color:'var(--t2)'}}>{fundName}</span>
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

        <div style={{display:'grid',gridTemplateColumns:'1fr 240px',maxWidth:1100,margin:'0 auto'}}>
          <div style={{padding:'28px 32px',borderRight:'1px solid var(--border)',minWidth:0}}>

            {/* HERO */}
            <div style={{display:'flex',alignItems:'flex-start',gap:16,marginBottom:24,paddingBottom:24,borderBottom:'1px solid var(--border)'}}>
              <div style={{width:52,height:52,borderRadius:13,background:'var(--bg3)',border:'1px solid rgba(255,255,255,.1)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,fontWeight:700,color:'rgba(255,255,255,.6)',flexShrink:0}}>{ini(fundName)}</div>
              <div style={{flex:1}}>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:4,flexWrap:'wrap'}}>
                  <h1 style={{fontSize:22,fontWeight:700}}>{fundName}</h1>
                  {fm&&<span style={{padding:'2px 8px',borderRadius:5,fontSize:11,fontWeight:700,background:fm.tier===1?'rgba(202,138,4,.1)':'var(--bg3)',color:fm.tier===1?'#ca8a04':'var(--t3)',border:`1px solid ${fm.tier===1?'rgba(202,138,4,.25)':'var(--border)'}`}}>Tier {fm.tier}</span>}
                </div>
                <div style={{fontSize:13,color:'var(--t3)',marginBottom:10}}>{fm?.type}{fm?.aum&&fm.aum!=='N/A'?` · AUM: ${fm.aum}`:''}{fm?.hq?` · ${fm.hq}`:''}</div>
                {fm?.focus&&(
                  <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>
                    {fm.focus.map(f=><span key={f} style={{padding:'2px 8px',borderRadius:4,fontSize:11,fontWeight:600,background:'var(--ac-bg)',color:'var(--ac)',border:'1px solid var(--ac-b)'}}>{f}</span>)}
                  </div>
                )}
              </div>
              <button onClick={toggleWL} style={{display:'flex',alignItems:'center',gap:6,padding:'7px 16px',borderRadius:7,fontSize:13,fontWeight:600,background:inWL?'var(--ac-bg)':'rgba(255,255,255,.05)',color:inWL?'var(--ac)':'var(--t3)',border:`1px solid ${inWL?'var(--ac-b)':'var(--border)'}`,cursor:'pointer',flexShrink:0}}>
                {inWL?'★ Saved':'☆ Save'}
              </button>
            </div>

            {/* METRICS */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8,marginBottom:28}}>
              {[{l:'AI Companies',v:String(cos.length),g:true},{l:'Total Deployed',v:fmt(raised),g:false},{l:'Portfolio cos.',v:String(pf.length),g:false},{l:'Avg check',v:fmt(avgCheck),g:false}].map(m=>(
                <div key={m.l} style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:10,padding:'14px 16px'}}>
                  <div style={{fontFamily:"'DM Mono',monospace",fontSize:20,fontWeight:500,color:m.g?'var(--ac)':'var(--text)',marginBottom:4}}>{m.v}</div>
                  <div style={{fontSize:11,textTransform:'uppercase',letterSpacing:'.06em',color:'var(--t3)'}}>{m.l}</div>
                </div>
              ))}
            </div>

            {/* PORTFOLIO */}
            {pf.length>0&&(
              <div style={{marginBottom:28}}>
                <div style={{fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--t3)',marginBottom:14}}>★ Portfolio companies ({pf.length})</div>
                <div style={{display:'flex',flexDirection:'column',gap:6}}>
                  {pf.map(co=>(
                    <a key={co.n} href={'/company/'+toSlug(co.n)} className="co-row" style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',background:'rgba(92,210,162,.04)',border:'1px solid rgba(92,210,162,.12)',borderRadius:8,transition:'border-color .15s'}}>
                      <div style={{width:28,height:28,borderRadius:6,background:co.sc,display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:700,color:'#fff',flexShrink:0}}>{ini(co.n)}</div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:14,fontWeight:600,color:'var(--text)'}}>{co.n}</div>
                        <div style={{fontSize:11,color:'var(--t3)',marginTop:1}}>{co.s} · {co.sec}</div>
                      </div>
                      <span style={{padding:'2px 7px',borderRadius:4,fontSize:11,fontWeight:600,background:'rgba(111,163,239,.08)',color:'#6FA3EF',border:'1px solid rgba(111,163,239,.2)',whiteSpace:'nowrap'}}>{co.st}</span>
                      <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:'var(--ac)',fontWeight:500,minWidth:52,textAlign:'right'}}>{fmt(co.r)}</div>
                      <div style={{fontSize:11,color:'var(--t3)',fontFamily:"'DM Mono',monospace",minWidth:56,textAlign:'right'}}>{co.date}</div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* CO-INVESTMENTS */}
            {other.length>0&&(
              <div style={{marginBottom:28}}>
                <div style={{fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--t3)',marginBottom:14}}>Co-investments ({other.length})</div>
                <div style={{display:'flex',flexDirection:'column',gap:6}}>
                  {other.map(co=>(
                    <a key={co.n} href={'/company/'+toSlug(co.n)} className="co-row" style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:8,transition:'border-color .15s'}}>
                      <div style={{width:28,height:28,borderRadius:6,background:co.sc,display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:700,color:'#fff',flexShrink:0}}>{ini(co.n)}</div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:14,fontWeight:600,color:'var(--text)'}}>{co.n}</div>
                        <div style={{fontSize:11,color:'var(--t3)',marginTop:1}}>{co.s} · {co.sec}</div>
                      </div>
                      <span style={{padding:'2px 7px',borderRadius:4,fontSize:11,fontWeight:600,background:'rgba(111,163,239,.08)',color:'#6FA3EF',border:'1px solid rgba(111,163,239,.2)',whiteSpace:'nowrap'}}>{co.st}</span>
                      <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:'var(--t2)',fontWeight:500,minWidth:52,textAlign:'right'}}>{fmt(co.r)}</div>
                      <div style={{fontSize:11,color:'var(--t3)',fontFamily:"'DM Mono',monospace",minWidth:56,textAlign:'right'}}>{co.date}</div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* CO-INVESTORS */}
            {coInvestors.length>0&&(
              <div>
                <div style={{fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--t3)',marginBottom:14}}>Frequent co-investors</div>
                <div style={{display:'flex',flexDirection:'column',gap:6}}>
                  {coInvestors.map(([inv,count])=>(
                    <a key={inv} href={'/fund/'+toSlug(inv)} className="co-row" style={{display:'flex',alignItems:'center',gap:10,padding:'10px 14px',background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:8,transition:'border-color .15s'}}>
                      <div style={{width:28,height:28,borderRadius:6,background:'var(--bg3)',border:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:700,color:'var(--t3)',flexShrink:0}}>{ini(inv)}</div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:14,fontWeight:600,color:'var(--text)'}}>{inv}</div>
                        {FM[inv]&&<div style={{fontSize:11,color:'var(--t3)',marginTop:1}}>{FM[inv].type} · Tier {FM[inv].tier} · {FM[inv].aum}</div>}
                      </div>
                      <div style={{fontSize:12,color:'var(--ac)',fontFamily:"'DM Mono',monospace"}}>{count} co-inv</div>
                      <div style={{fontSize:12,color:'var(--ac)',marginLeft:8}}>→</div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <div style={{padding:'28px 20px'}}>
            <div style={{marginBottom:24}}>
              <button onClick={exportCSV} style={{width:'100%',padding:'9px',borderRadius:7,fontSize:13,fontWeight:600,background:'var(--bg2)',border:'1px solid var(--border)',color:'var(--t2)',cursor:'pointer',textAlign:'center'}}>↓ Export to CSV</button>
            </div>

            <div style={{marginBottom:20,paddingBottom:20,borderBottom:'1px solid var(--border)'}}>
              <div style={{fontSize:10,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--t3)',marginBottom:10}}>Fund details</div>
              <table style={{width:'100%',fontSize:12,borderCollapse:'collapse'}}>
                <tbody>
                  {[['Type',fm?.type||'—'],['Tier',`Tier ${fm?.tier||'—'}`],['AUM',fm?.aum||'—'],['HQ',fm?.hq||'—'],['AI companies',String(cos.length)],['Deployed',fmt(raised)],['Avg check',fmt(avgCheck)]].map(([l,v])=>(
                    <tr key={l}>
                      <td style={{color:'var(--t3)',padding:'4px 0'}}>{l}</td>
                      <td style={{color:l==='Tier'?(fm?.tier===1?'#ca8a04':'var(--t2)'):['AI companies','Deployed','Avg check'].includes(String(l))?'var(--ac)':'var(--text)',textAlign:'right',padding:'4px 0',fontWeight:500}}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {stageCounts.length>0&&(
              <div style={{marginBottom:20,paddingBottom:20,borderBottom:'1px solid var(--border)'}}>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--t3)',marginBottom:10}}>Stage preference</div>
                {stageCounts.map(([stage,count])=>(
                  <div key={stage} style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:6,alignItems:'center'}}>
                    <span style={{color:'var(--t2)'}}>{stage}</span>
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                      <div style={{width:60,height:4,borderRadius:2,background:'var(--bg3)',overflow:'hidden'}}>
                        <div style={{width:`${(count/cos.length)*100}%`,height:'100%',background:'var(--ac)',borderRadius:2}}/>
                      </div>
                      <span style={{color:'var(--ac)',fontFamily:"'DM Mono',monospace",fontSize:11,minWidth:16,textAlign:'right'}}>{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {sectorCounts.length>0&&(
              <div style={{marginBottom:20,paddingBottom:20,borderBottom:'1px solid var(--border)'}}>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--t3)',marginBottom:10}}>Sector breakdown</div>
                {sectorCounts.map(([sec,count])=>(
                  <div key={sec} style={{display:'flex',justifyContent:'space-between',fontSize:12,marginBottom:6,alignItems:'center'}}>
                    <span style={{color:'var(--t2)'}}>{sec}</span>
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                      <div style={{width:60,height:4,borderRadius:2,background:'var(--bg3)',overflow:'hidden'}}>
                        <div style={{width:`${(count/cos.length)*100}%`,height:'100%',background:'rgba(111,163,239,.7)',borderRadius:2}}/>
                      </div>
                      <span style={{color:'var(--t2)',fontFamily:"'DM Mono',monospace",fontSize:11,minWidth:16,textAlign:'right'}}>{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {fm?.focus&&fm.focus.length>0&&(
              <div>
                <div style={{fontSize:10,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--t3)',marginBottom:10}}>Focus areas</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
                  {fm.focus.map(f=><span key={f} style={{padding:'3px 8px',borderRadius:4,fontSize:11,background:'var(--bg3)',border:'1px solid var(--border)',color:'var(--t3)'}}>{f}</span>)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
