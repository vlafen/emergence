'use client'
import { useState, useMemo, useEffect, useRef } from 'react'
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

const SECTS=[
  {n:'All',c:'var(--text)',sl:'',cnt:20},
  {n:'Health',c:'#16a34a',sl:'Health',cnt:4},
  {n:'Software Impl.',c:'#d97706',sl:'Software',cnt:3},
  {n:'Financial',c:'#2563eb',sl:'Financial',cnt:3},
  {n:'Legal',c:'#7c3aed',sl:'Legal',cnt:4},
  {n:'Security',c:'#dc2626',sl:'Security',cnt:2},
  {n:'GTM',c:'#0891b2',sl:'GTM',cnt:2},
  {n:'Industrial',c:'#b45309',sl:'Industrial',cnt:1},
  {n:'AI Impl.',c:'#15803d',sl:'AI Impl.',cnt:1},
]

function fmt(n:number){if(!n)return'—';if(n>=1000)return`$${(n/1000).toFixed(1)}B`;return`$${n}M`}
function ini(n:string){return n.split(' ').map((w:string)=>w[0]).join('').slice(0,2).toUpperCase()}
function toSlug(n:string){return n.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}

function buildFunds(){
  const m:Record<string,any>={}
  D.forEach(co=>{co.inv.forEach(inv=>{
    if(!m[inv]) m[inv]={n:inv,cos:[],raised:0}
    m[inv].cos.push(co);m[inv].raised+=co.r
  })})
  return Object.values(m).sort((a:any,b:any)=>b.cos.length-a.cos.length)
}
const FUNDS=buildFunds()
const CMD_DATA=[
  ...D.map(co=>({type:'company',name:co.n,sub:co.s+' · '+co.sec+' · '+co.st,raised:fmt(co.r),color:co.sc})),
  ...FUNDS.map((f:any)=>({type:'fund',name:f.n,sub:'Fund · '+f.cos.length+' cos · '+fmt(f.raised),raised:null,color:null})),
]

function exportToCSV(companies:typeof D){
  const headers=['Name','Description','Sector','Stage','Raised','Valuation','Employees','Founded','Portfolio','Investors']
  const rows=companies.map(co=>[co.n,co.s,co.sec,co.st,fmt(co.r),fmt(co.v),co.e,co.y,co.pf?'Yes':'No',co.inv.join('; ')])
  const csv=[headers,...rows].map(r=>r.map(v=>`"${v}"`).join(',')).join('\n')
  const blob=new Blob([csv],{type:'text/csv;charset=utf-8;'})
  const url=URL.createObjectURL(blob)
  const a=document.createElement('a');a.href=url;a.download='companies.csv';a.click()
  URL.revokeObjectURL(url)
}

export default function DashboardPage(){
  const [sec,setSec]=useState('')
  const [q,setQ]=useState('')
  const [srt,setSrt]=useState('r')
  const [view,setView]=useState<'t'|'g'>('t')
  const [theme,setTheme]=useState<'dark'|'light'>('light')
  const [cmdOpen,setCmdOpen]=useState(false)
  const [cmdQ,setCmdQ]=useState('')
  const [cmdSel,setCmdSel]=useState(0)
  const [selected,setSelected]=useState<Set<string>>(new Set())
  const [wl,setWl]=useState<Set<string>>(new Set())
  const [toast,setToast]=useState('')
  const cmdRef=useRef<HTMLInputElement>(null)
  const router=useRouter()

  useEffect(()=>{
    try{const s=JSON.parse(localStorage.getItem('wl_companies')||'[]');setWl(new Set(s))}catch{}
  },[])

  function toggleWL(name:string,e:React.MouseEvent){
    e.stopPropagation()
    try{
      const s:string[]=JSON.parse(localStorage.getItem('wl_companies')||'[]')
      const isIn=wl.has(name)
      const next=isIn?s.filter(n=>n!==name):[...s,name]
      localStorage.setItem('wl_companies',JSON.stringify(next))
      const nw=new Set(wl);isIn?nw.delete(name):nw.add(name);setWl(nw)
      setToast(isIn?`Removed from Watchlist`:`★ ${name} added to Watchlist`)
      setTimeout(()=>setToast(''),2000)
    }catch{}
  }

  const data=useMemo(()=>{
    let d=[...D]
    if(sec) d=d.filter(c=>c.sec===sec)
    if(q) d=d.filter(c=>c.n.toLowerCase().includes(q.toLowerCase())||c.s.toLowerCase().includes(q.toLowerCase())||c.inv.some((i:string)=>i.toLowerCase().includes(q.toLowerCase())))
    d.sort((a,b)=>srt==='n'?a.n.localeCompare(b.n):srt==='v'?b.v-a.v:srt==='e'?b.e-a.e:srt==='y'?b.y-a.y:b.r-a.r)
    return d
  },[sec,q,srt])

  const cmdResults=useMemo(()=>{
    if(!cmdQ) return CMD_DATA.slice(0,6)
    return CMD_DATA.filter((r:any)=>r.name.toLowerCase().includes(cmdQ.toLowerCase())||r.sub.toLowerCase().includes(cmdQ.toLowerCase())).slice(0,8)
  },[cmdQ])

  const allSelected=data.length>0&&data.every(co=>selected.has(co.n))
  const someSelected=selected.size>0
  function toggleSelect(name:string){setSelected(s=>{const ns=new Set(s);ns.has(name)?ns.delete(name):ns.add(name);return ns})}
  function toggleAll(){
    if(allSelected) setSelected(s=>{const ns=new Set(s);data.forEach(co=>ns.delete(co.n));return ns})
    else setSelected(s=>{const ns=new Set(s);data.forEach(co=>ns.add(co.n));return ns})
  }

  function openCmd(){setCmdOpen(true);setCmdQ('');setCmdSel(0);setTimeout(()=>cmdRef.current?.focus(),50)}
  function closeCmd(){setCmdOpen(false)}
  function selectCmd(i:number){
    const r=cmdResults[i];if(!r)return
    closeCmd()
    if(r.type==='company') router.push('/company/'+toSlug(r.name))
    else router.push('/fund/'+toSlug(r.name))
  }

  useEffect(()=>{
    const saved=localStorage.getItem('theme') as 'dark'|'light'|null
    if(saved) setTheme(saved)
  },[])

  useEffect(()=>{
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  },[theme])

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
        [data-theme=dark],html[data-theme=dark]{--bg:#08080f;--bg2:#0d0d1a;--bg3:#111124;--border:rgba(255,255,255,.07);--border2:rgba(255,255,255,.14);--text:#ffffff;--t2:rgba(255,255,255,1);--t3:rgba(255,255,255,1);--ac:#5CD2A2;--ac-bg:rgba(92,210,162,.08);--ac-b:rgba(92,210,162,.2)}
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Plus Jakarta Sans',sans-serif;margin:0;padding:0}
        .tab:hover{color:var(--t2)}
        .sb-r:hover{background:var(--bg2)}
        .sb-r.on{background:var(--ac-bg)}
        .sb-r.on .sb-n{color:var(--ac);font-weight:600}
        tbody tr:hover{background:var(--bg2)}
        .gc:hover{border-color:var(--border2)}
        .ich:hover{border-color:var(--border2);color:var(--text)}
        .wl-star:hover{color:#5CD2A2!important;border-color:rgba(92,210,162,.3)!important}
        input[type=checkbox]{accent-color:var(--ac);width:14px;height:14px;cursor:pointer;flex-shrink:0}
        input[type=text]{outline:none}input::placeholder{color:var(--t3)}
        button:focus{outline:none}select:focus{outline:none}
      `}</style>

      {/* Toast */}
      {toast&&<div style={{position:'fixed',bottom:24,right:24,zIndex:2000,padding:'10px 18px',borderRadius:8,background:'var(--bg)',border:'1px solid var(--ac-b)',fontSize:13,fontWeight:500,color:'var(--ac)',boxShadow:'0 4px 20px rgba(0,0,0,.12)'}}>{toast}</div>}

      <div data-theme={theme} style={{height:'100vh',display:'flex',flexDirection:'column',overflow:'hidden',background:'var(--bg)',color:'var(--text)',fontFamily:"'Plus Jakarta Sans',sans-serif",transition:'background .2s,color .2s'}}>

        {/* NAV */}
        <nav style={{height:48,display:'flex',alignItems:'center',padding:'0 20px',background:'var(--bg)',borderBottom:'1px solid var(--border)',flexShrink:0}}>
          <div onClick={()=>router.push('/')} style={{display:'flex',alignItems:'center',gap:7,fontSize:14,fontWeight:700,letterSpacing:'.1em',cursor:'pointer'}}>
            <div style={{width:7,height:7,borderRadius:'50%',background:'var(--ac)'}}/>
            INTELLIGENCE
          </div>
          <div style={{display:'flex',marginLeft:20}}>
            {[['Dashboard','/dashboard'],['Funds','/funds'],['Watchlist','/watchlist']].map(([t,href],i)=>(
              <div key={t} className="tab" onClick={()=>router.push(href)} style={{padding:'0 14px',height:48,display:'flex',alignItems:'center',fontSize:14,fontWeight:500,color:i===0?'var(--text)':'var(--t3)',cursor:'pointer',borderBottom:i===0?'2px solid var(--ac)':'2px solid transparent',transition:'all .15s'}}>
                {t}{t==='Watchlist'&&wl.size>0&&<span style={{marginLeft:5,fontSize:10,fontWeight:700,background:'var(--ac)',color:'#fff',borderRadius:10,padding:'1px 5px'}}>{wl.size}</span>}
              </div>
            ))}
          </div>
          <div style={{display:'flex',alignItems:'center',gap:7,marginLeft:'auto'}}>
            <div onClick={openCmd} onMouseOver={e=>(e.currentTarget.style.borderColor='var(--border2)')} onMouseOut={e=>(e.currentTarget.style.borderColor='var(--border)')}
              style={{display:'flex',alignItems:'center',gap:8,background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:8,padding:'5px 14px',width:220,cursor:'pointer',height:34}}>
              <span style={{fontSize:14,color:'var(--t3)'}}>⌕</span>
              <span style={{fontSize:13,color:'var(--t3)',flex:1}}>Search companies, funds…</span>
            </div>
            <button onClick={()=>setTheme(t=>t==='dark'?'light':'dark')} style={{width:30,height:30,borderRadius:7,border:'1px solid var(--border)',background:'var(--bg2)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,color:'var(--t2)'}}>
              {theme==='dark'?'☀':'☾'}
            </button>
            <button onClick={()=>router.push('/auth')} style={{padding:'7px 20px',border:'1px solid var(--border)',borderRadius:6,fontSize:13,fontWeight:500,color:'var(--t2)',background:'transparent',cursor:'pointer'}}>Log in</button>
            <button onClick={()=>router.push('/auth?mode=signup')} style={{padding:'7px 20px',borderRadius:6,fontSize:13,fontWeight:600,background:'var(--ac)',color:'#fff',border:'none',cursor:'pointer'}}>Sign up →</button>
          </div>
        </nav>

        {/* EXPORT BAR */}
        {someSelected&&(
          <div style={{display:'flex',alignItems:'center',gap:10,padding:'8px 20px',background:'rgba(92,210,162,.06)',borderBottom:'1px solid var(--ac-b)',flexShrink:0}}>
            <span style={{fontSize:13,color:'var(--ac)',fontWeight:600}}>{selected.size} selected</span>
            <span style={{fontSize:13,color:'var(--t3)'}}>—</span>
            <button onClick={()=>exportToCSV(D.filter(co=>selected.has(co.n)))} style={{display:'flex',alignItems:'center',gap:6,padding:'5px 14px',borderRadius:6,fontSize:13,fontWeight:600,background:'var(--ac-bg)',color:'var(--ac)',border:'1px solid var(--ac-b)',cursor:'pointer'}}>
              ↓ Export CSV
            </button>
            {selected.size>=2&&selected.size<=3&&(
              <button onClick={()=>router.push('/compare?cos='+Array.from(selected).map(toSlug).join(','))} style={{display:'flex',alignItems:'center',gap:6,padding:'5px 14px',borderRadius:6,fontSize:13,fontWeight:600,background:'rgba(111,163,239,.08)',color:'#6FA3EF',border:'1px solid rgba(111,163,239,.2)',cursor:'pointer'}}>
                ⚖ Compare {selected.size}
              </button>
            )}
            <button onClick={()=>setSelected(new Set())} style={{padding:'5px 14px',borderRadius:6,fontSize:13,color:'var(--t3)',background:'transparent',border:'1px solid var(--border)',cursor:'pointer'}}>Clear</button>
          </div>
        )}

        {/* MAIN */}
        <div style={{display:'grid',gridTemplateColumns:'180px 1fr',flex:1,overflow:'hidden'}}>

          {/* LEFT SIDEBAR */}
          <div style={{borderRight:'1px solid var(--border)',background:'var(--bg)',overflowY:'auto'}}>
            <div style={{fontSize:12,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--t3)',padding:'14px 14px 6px'}}>Sectors</div>
            {SECTS.map(s=>(
              <div key={s.sl} className={`sb-r${sec===s.sl?' on':''}`} onClick={()=>setSec(s.sl)}
                style={{display:'flex',alignItems:'center',gap:8,padding:'7px 14px',cursor:'pointer',transition:'background .12s'}}>
                <div style={{width:6,height:6,borderRadius:'50%',background:s.c,flexShrink:0}}/>
                <div className="sb-n" style={{fontSize:14,fontWeight:500,flex:1,color:'var(--t2)'}}>{s.n}</div>
                <div style={{fontSize:13,color:'var(--t3)',fontFamily:"'DM Mono',monospace"}}>{s.cnt}</div>
              </div>
            ))}
            <div style={{height:1,background:'var(--border)',margin:'6px 14px'}}/>
            <div style={{fontSize:12,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--t3)',padding:'8px 14px 6px'}}>Stage</div>
            {[['Seed','2'],['Series A','9'],['Series B','7'],['Series C','2']].map(([s,c])=>(
              <div key={s} className="sb-r" style={{display:'flex',alignItems:'center',gap:8,padding:'7px 14px',cursor:'pointer'}}>
                <div style={{width:6,height:6,borderRadius:'50%',background:'var(--t3)',flexShrink:0}}/>
                <div style={{fontSize:14,fontWeight:500,flex:1,color:'var(--t2)'}}>{s}</div>
                <div style={{fontSize:13,color:'var(--t3)',fontFamily:"'DM Mono',monospace"}}>{c}</div>
              </div>
            ))}
            <div style={{height:1,background:'var(--border)',margin:'6px 14px'}}/>
            {/* Watchlist shortcut */}
            <div className="sb-r" onClick={()=>router.push('/watchlist')} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 14px',cursor:'pointer'}}>
              <div style={{width:6,height:6,borderRadius:'50%',background:'var(--ac)',flexShrink:0}}/>
              <div style={{fontSize:14,fontWeight:500,flex:1,color:'var(--t2)'}}>Watchlist</div>
              {wl.size>0&&<div style={{fontSize:13,color:'var(--ac)',fontFamily:"'DM Mono',monospace"}}>{wl.size}</div>}
            </div>
          </div>

          {/* CENTER */}
          <div style={{display:'flex',flexDirection:'column',overflow:'hidden'}}>
            <div style={{display:'flex',alignItems:'center',gap:6,padding:'9px 14px',borderBottom:'1px solid var(--border)',background:'var(--bg)',flexShrink:0}}>
              <div style={{position:'relative',flex:1,maxWidth:200}}>
                <span style={{position:'absolute',left:8,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'var(--t3)',pointerEvents:'none'}}>⌕</span>
                <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search…" style={{width:'100%',background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:6,padding:'6px 10px 6px 28px',fontSize:14,color:'var(--text)',fontFamily:"'Plus Jakarta Sans',sans-serif"}}/>
              </div>
              <select value={srt} onChange={e=>setSrt(e.target.value)} style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:6,padding:'5px 8px',fontSize:13,fontWeight:500,color:'var(--t2)',cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
                <option value="r">↓ Raised</option>
                <option value="v">↓ Valuation</option>
                <option value="e">↓ Employees</option>
                <option value="y">↓ Founded</option>
                <option value="n">A→Z</option>
              </select>
              <div onClick={()=>setSec('')} style={{padding:'4px 10px',borderRadius:20,fontSize:13,fontWeight:600,border:'1px solid var(--border)',color:!sec?'var(--ac)':'var(--t3)',cursor:'pointer',background:!sec?'var(--ac-bg)':'transparent',transition:'all .15s'}}>All</div>
              <div style={{display:'flex',border:'1px solid var(--border)',borderRadius:6,overflow:'hidden',marginLeft:'auto'}}>
                {(['t','g'] as const).map(v=>(
                  <button key={v} onClick={()=>setView(v)} style={{padding:'5px 10px',fontSize:14,cursor:'pointer',color:view===v?'var(--ac)':'var(--t3)',background:view===v?'var(--ac-bg)':'var(--bg2)',border:'none'}}>
                    {v==='t'?'☰':'⊞'}
                  </button>
                ))}
              </div>
              <div style={{fontSize:13,color:'var(--t3)',fontFamily:"'DM Mono',monospace",whiteSpace:'nowrap'}}>{data.length}</div>
            </div>

            {/* TABLE */}
            {view==='t'&&(
              <div style={{flex:1,overflow:'auto'}}>
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead style={{position:'sticky',top:0,zIndex:5,background:'var(--bg2)'}}>
                    <tr style={{borderBottom:'1px solid var(--border)'}}>
                      <th style={{padding:'8px 12px',width:36}}><input type="checkbox" checked={allSelected} onChange={toggleAll}/></th>
                      <th style={{padding:'8px 12px',textAlign:'left',fontSize:12,fontWeight:700,letterSpacing:'.07em',textTransform:'uppercase',color:'var(--t3)',width:28}}>#</th>
                      <th style={{padding:'8px 12px',textAlign:'left',fontSize:12,fontWeight:700,letterSpacing:'.07em',textTransform:'uppercase',color:'var(--t3)'}}>Company</th>
                      <th style={{padding:'8px 12px',textAlign:'left',fontSize:12,fontWeight:700,letterSpacing:'.07em',textTransform:'uppercase',color:'var(--t3)'}}>Sector</th>
                      <th style={{padding:'8px 12px',textAlign:'left',fontSize:12,fontWeight:700,letterSpacing:'.07em',textTransform:'uppercase',color:'var(--t3)'}}>Investors</th>
                      <th style={{padding:'8px 12px',textAlign:'left',fontSize:12,fontWeight:700,letterSpacing:'.07em',textTransform:'uppercase',color:'var(--ac)'}}>Raised ↓</th>
                      <th style={{padding:'8px 12px',textAlign:'left',fontSize:12,fontWeight:700,letterSpacing:'.07em',textTransform:'uppercase',color:'var(--t3)'}}>Valuation</th>
                      <th style={{padding:'8px 12px',textAlign:'left',fontSize:12,fontWeight:700,letterSpacing:'.07em',textTransform:'uppercase',color:'var(--t3)'}}>Emp.</th>
                      <th style={{padding:'8px 12px',textAlign:'left',fontSize:12,fontWeight:700,letterSpacing:'.07em',textTransform:'uppercase',color:'var(--t3)'}}>Round</th>
                      <th style={{padding:'8px 12px',textAlign:'left',fontSize:12,fontWeight:700,letterSpacing:'.07em',textTransform:'uppercase',color:'var(--t3)'}}>Date</th>
                      <th style={{padding:'8px 12px',width:40}}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((co,i)=>{
                      const isSel=selected.has(co.n)
                      const isWL=wl.has(co.n)
                      const coUrl='/company/'+toSlug(co.n)
                      return(
                        <tr key={co.n} onClick={()=>router.push(coUrl)} style={{borderBottom:'1px solid var(--border)',cursor:'pointer',transition:'background .1s',background:isSel?'rgba(92,210,162,.04)':'transparent'}}>
                          <td style={{padding:'10px 12px',width:36}} onClick={e=>e.stopPropagation()}>
                            <input type="checkbox" checked={isSel} onChange={()=>toggleSelect(co.n)}/>
                          </td>
                          <td style={{padding:'10px 12px',fontSize:14,color:'var(--t3)',fontFamily:"'DM Mono',monospace"}}>{i+1}</td>
                          <td style={{padding:'10px 12px'}}>
                            <div style={{display:'flex',alignItems:'center',gap:8}}>
                              <div style={{width:26,height:26,borderRadius:6,background:'var(--bg3)',border:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,color:'var(--t3)',flexShrink:0}}>{ini(co.n)}</div>
                              <div>
                                <a href={coUrl} target="_blank" rel="noreferrer" onClick={e=>e.preventDefault()} style={{fontSize:14,fontWeight:600,color:'var(--text)',textDecoration:'none',display:'block'}}>
                                  {co.n}{co.pf&&<span style={{display:'inline-flex',padding:'2px 5px',borderRadius:4,fontSize:11,fontWeight:600,border:'1px solid',marginLeft:3,verticalAlign:'middle',background:'var(--ac-bg)',color:'var(--ac)',borderColor:'var(--ac-b)'}}>★</span>}
                                </a>
                                <div style={{fontSize:12,color:'var(--t3)',marginTop:1}}>{co.s}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{padding:'10px 12px',fontSize:14,color:'var(--t2)'}}>
                            <span style={{display:'inline-block',width:5,height:5,borderRadius:'50%',background:co.sc,marginRight:4,verticalAlign:'middle'}}/>
                            {co.sec}
                          </td>
                          <td style={{padding:'10px 12px'}} onClick={e=>e.stopPropagation()}>
                            <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
                              {co.inv.slice(0,2).map((inv:string)=>(
                                <a key={inv} href={'/fund/'+toSlug(inv)} target="_blank" rel="noreferrer" className="ich" onClick={e=>e.stopPropagation()}
                                  style={{padding:'2px 7px',borderRadius:5,fontSize:12,fontWeight:500,background:'var(--bg3)',border:'1px solid var(--border)',color:'var(--t2)',whiteSpace:'nowrap',cursor:'pointer',transition:'all .12s',textDecoration:'none'}}>{inv}</a>
                              ))}
                              {co.inv.length>2&&<span style={{padding:'2px 7px',borderRadius:5,fontSize:12,background:'var(--bg3)',border:'1px solid var(--border)',color:'var(--t3)'}}>+{co.inv.length-2}</span>}
                            </div>
                          </td>
                          <td style={{padding:'10px 12px',fontSize:14,fontFamily:"'DM Mono',monospace",color:'var(--ac)',fontWeight:500}}>{fmt(co.r)}</td>
                          <td style={{padding:'10px 12px',fontSize:14,fontFamily:"'DM Mono',monospace",color:'var(--t2)'}}>{fmt(co.v)}</td>
                          <td style={{padding:'10px 12px',fontSize:14,fontFamily:"'DM Mono',monospace",color:'var(--t2)'}}>{co.e}</td>
                          <td style={{padding:'10px 12px'}}>
                            <span style={{padding:'2px 7px',borderRadius:4,fontSize:11,fontWeight:600,background:'rgba(111,163,239,.08)',color:'#6FA3EF',border:'1px solid rgba(111,163,239,.2)',whiteSpace:'nowrap'}}>{co.st}</span>
                          </td>
                          <td style={{padding:'10px 12px',fontSize:13,fontFamily:"'DM Mono',monospace",color:'var(--t3)',whiteSpace:'nowrap'}}>{co.date}</td>
                          <td style={{padding:'10px 12px',width:40}} onClick={e=>toggleWL(co.n,e)}>
                            <button className="wl-star" style={{width:28,height:28,borderRadius:6,border:`1px solid ${isWL?'rgba(92,210,162,.3)':'var(--border)'}`,background:isWL?'rgba(92,210,162,.08)':'transparent',fontSize:14,color:isWL?'#5CD2A2':'var(--t3)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}>
                              {isWL?'★':'☆'}
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* GRID */}
            {view==='g'&&(
              <div style={{flex:1,overflowY:'auto',padding:12}}>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:8}}>
                  {data.map(co=>{
                    const isSel=selected.has(co.n)
                    const isWL=wl.has(co.n)
                    return(
                      <div key={co.n} className="gc" style={{background:isSel?'rgba(92,210,162,.06)':'var(--bg2)',border:`1px solid ${isSel?'var(--ac-b)':'var(--border)'}`,borderRadius:10,padding:13,cursor:'pointer',transition:'all .15s',position:'relative'}}>
                        <div style={{position:'absolute',top:10,right:10,display:'flex',gap:4}}>
                          <button className="wl-star" onClick={e=>toggleWL(co.n,e)} style={{width:24,height:24,borderRadius:5,border:`1px solid ${isWL?'rgba(92,210,162,.3)':'var(--border)'}`,background:isWL?'rgba(92,210,162,.08)':'transparent',fontSize:12,color:isWL?'#5CD2A2':'var(--t3)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}>
                            {isWL?'★':'☆'}
                          </button>
                          <div onClick={e=>{e.stopPropagation();toggleSelect(co.n)}} style={{width:24,height:24,borderRadius:5,border:'1px solid var(--border)',background:'var(--bg3)',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>
                            <input type="checkbox" checked={isSel} onChange={()=>toggleSelect(co.n)} style={{width:12,height:12}}/>
                          </div>
                        </div>
                        <div onClick={()=>router.push('/company/'+toSlug(co.n))}>
                          <div style={{display:'flex',alignItems:'flex-start',gap:8,marginBottom:9}}>
                            <div style={{width:26,height:26,borderRadius:6,background:'var(--bg3)',border:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,color:'var(--t3)',flexShrink:0}}>{ini(co.n)}</div>
                            <div style={{flex:1,minWidth:0,paddingRight:52}}>
                              <div style={{fontSize:14,fontWeight:600,color:'var(--text)'}}>{co.n}{co.pf&&<span style={{display:'inline-flex',padding:'2px 5px',borderRadius:4,fontSize:9,fontWeight:600,border:'1px solid',marginLeft:3,background:'var(--ac-bg)',color:'var(--ac)',borderColor:'var(--ac-b)'}}>★</span>}</div>
                              <div style={{fontSize:12,color:'var(--t3)',marginTop:1}}>{co.s}</div>
                              <span style={{display:'inline-flex',padding:'2px 5px',borderRadius:4,fontSize:11,fontWeight:600,border:'1px solid',marginTop:3,background:'rgba(111,163,239,.08)',color:'#6FA3EF',borderColor:'rgba(111,163,239,.2)'}}>{co.st}</span>
                            </div>
                          </div>
                          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:4}}>
                            {[['Raised',fmt(co.r),true],['Val.',fmt(co.v),false],['Emp.',String(co.e),false]].map(([l,v,g])=>(
                              <div key={String(l)} style={{background:'var(--bg3)',borderRadius:5,padding:'6px 8px'}}>
                                <div style={{fontFamily:"'DM Mono',monospace",fontSize:14,fontWeight:500,color:g?'var(--ac)':'var(--text)'}}>{v}</div>
                                <div style={{fontSize:11,textTransform:'uppercase',letterSpacing:'.05em',color:'var(--t3)',marginTop:1}}>{l}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CMD+K */}
        {cmdOpen&&(
          <div style={{position:'fixed',inset:0,zIndex:1000,background:'rgba(0,0,0,0.6)',backdropFilter:'blur(6px)',display:'flex',alignItems:'flex-start',justifyContent:'center',paddingTop:'15vh'}} onClick={closeCmd}>
            <div style={{width:560,background:'var(--bg)',border:'1px solid var(--border2)',borderRadius:14,overflow:'hidden',boxShadow:'0 24px 80px rgba(0,0,0,0.15)'}} onClick={e=>e.stopPropagation()}>
              <div style={{display:'flex',alignItems:'center',gap:10,padding:'14px 16px',borderBottom:'1px solid var(--border)'}}>
                <span style={{fontSize:16,color:'var(--t3)'}}>⌕</span>
                <input ref={cmdRef} value={cmdQ} onChange={e=>{setCmdQ(e.target.value);setCmdSel(0)}}
                  onKeyDown={e=>{
                    if(e.key==='Escape') closeCmd()
                    else if(e.key==='ArrowDown') setCmdSel(s=>Math.min(s+1,cmdResults.length-1))
                    else if(e.key==='ArrowUp') setCmdSel(s=>Math.max(s-1,0))
                    else if(e.key==='Enter') selectCmd(cmdSel)
                  }}
                  placeholder="Search companies, funds, sectors…"
                  style={{flex:1,background:'transparent',border:'none',outline:'none',fontSize:15,color:'#fff',fontFamily:"'Plus Jakarta Sans',sans-serif"}}
                />
                <kbd style={{fontSize:10,color:'var(--t3)',background:'var(--bg2)',padding:'2px 6px',borderRadius:4,border:'1px solid var(--border)'}}>ESC</kbd>
              </div>
              <div style={{maxHeight:380,overflowY:'auto'}}>
                {!cmdQ&&<div style={{padding:'10px 16px 4px',fontSize:10,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--t3)'}}>Recent</div>}
                {cmdResults.length===0
                  ?<div style={{padding:'24px 16px',textAlign:'center',color:'var(--t3)',fontSize:13}}>No results</div>
                  :cmdResults.map((r:any,i:number)=>(
                    <div key={r.name+i} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 16px',background:i===cmdSel?'var(--ac-bg)':'transparent',borderLeft:i===cmdSel?`2px solid var(--ac)`:'2px solid transparent',cursor:'pointer'}}
                      onMouseEnter={()=>setCmdSel(i)} onClick={()=>selectCmd(i)}>
                      {r.type==='company'
                        ?<div style={{width:32,height:32,borderRadius:8,background:r.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,color:'#fff',flexShrink:0}}>{ini(r.name)}</div>
                        :<div style={{width:32,height:32,borderRadius:8,background:'var(--bg3)',border:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,flexShrink:0}}>🏦</div>
                      }
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{fontSize:13,fontWeight:600,color:'var(--text)',marginBottom:2}}>{r.name}</div>
                        <div style={{fontSize:11,color:'var(--t3)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{r.sub}</div>
                      </div>
                      {r.raised
                        ?<div style={{fontFamily:'DM Mono,monospace',fontSize:12,fontWeight:500,color:'var(--ac)',flexShrink:0}}>{r.raised}</div>
                        :<div style={{fontSize:10,color:'var(--t3)',background:'var(--bg2)',padding:'2px 7px',borderRadius:4,flexShrink:0}}>Fund</div>
                      }
                    </div>
                  ))
                }
              </div>
              <div style={{padding:'8px 16px',borderTop:'1px solid var(--border)',display:'flex',gap:12,fontSize:10,color:'var(--t3)'}}>
                <span>↑↓ navigate</span><span>↵ select</span><span>ESC close</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
