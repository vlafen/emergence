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
  {n:'All',c:'#2563eb',sl:'',cnt:20},
  {n:'Health',c:'#16a34a',sl:'Health',cnt:4},
  {n:'Software',c:'#d97706',sl:'Software',cnt:3},
  {n:'Financial',c:'#2563eb',sl:'Financial',cnt:3},
  {n:'Legal',c:'#7c3aed',sl:'Legal',cnt:4},
  {n:'Security',c:'#dc2626',sl:'Security',cnt:2},
  {n:'GTM',c:'#0891b2',sl:'GTM',cnt:2},
  {n:'Industrial',c:'#b45309',sl:'Industrial',cnt:1},
  {n:'AI Impl.',c:'#15803d',sl:'AI Impl.',cnt:1},
]

const STAGES=['Seed','Series A','Series B','Series C']

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
  const [stage,setStage]=useState('')
  const [q,setQ]=useState('')
  const [srt,setSrt]=useState('r')
  const [view,setView]=useState<'t'|'g'>('t')
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
    if(stage) d=d.filter(c=>c.st===stage)
    if(q) d=d.filter(c=>c.n.toLowerCase().includes(q.toLowerCase())||c.s.toLowerCase().includes(q.toLowerCase())||c.inv.some((i:string)=>i.toLowerCase().includes(q.toLowerCase())))
    d.sort((a,b)=>srt==='n'?a.n.localeCompare(b.n):srt==='v'?b.v-a.v:srt==='e'?b.e-a.e:srt==='y'?b.y-a.y:b.r-a.r)
    return d
  },[sec,stage,q,srt])

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
    function onKey(e:KeyboardEvent){
      if((e.metaKey||e.ctrlKey)&&e.key==='k'){e.preventDefault();openCmd()}
      if(e.key==='Escape'&&cmdOpen) closeCmd()
    }
    window.addEventListener('keydown',onKey)
    return()=>window.removeEventListener('keydown',onKey)
  },[cmdOpen])

  const roundColor=(st:string)=>{
    if(st==='Series C') return{bg:'rgba(124,58,237,.12)',c:'#a78bfa',b:'rgba(124,58,237,.25)'}
    if(st==='Series B') return{bg:'rgba(37,99,235,.1)',c:'#7aaff7',b:'rgba(37,99,235,.22)'}
    if(st==='Series A') return{bg:'rgba(16,185,129,.1)',c:'#6ee7b7',b:'rgba(16,185,129,.22)'}
    return{bg:'rgba(245,158,11,.1)',c:'#fcd34d',b:'rgba(245,158,11,.22)'}
  }

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        :root{
          --bg:#0a0a0f;
          --bg2:#111118;
          --bg3:#1a1a24;
          --border:rgba(255,255,255,.07);
          --border2:rgba(255,255,255,.13);
          --text:#f0f4fa;
          --t2:#c8d4e8;
          --t3:rgba(200,212,232,.45);
          --ac:#2563EB;
          --ac-bg:rgba(37,99,235,.1);
          --ac-b:rgba(37,99,235,.25);
          --ac-text:#7aaff7;
        }
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'DM Sans',sans-serif;margin:0;padding:0;background:var(--bg);color:var(--text)}
        .nav-item:hover{background:rgba(255,255,255,.04);color:var(--t2)}
        .nav-item.active{background:var(--ac-bg);color:var(--ac-text);border-left:2px solid var(--ac)}
        .pill:hover{border-color:rgba(37,99,235,.35);color:var(--t2)}
        .pill.active{background:var(--ac-bg);border-color:var(--ac-b);color:var(--ac-text)}
        .stage-pill:hover{border-color:rgba(255,255,255,.2);color:var(--t2)}
        .stage-pill.active{background:var(--ac-bg);border-color:var(--ac-b);color:var(--ac-text)}
        tbody tr:hover{background:rgba(37,99,235,.04)}
        .ich:hover{border-color:var(--border2);color:var(--text)}
        .wl-star:hover{color:var(--ac-text)!important;border-color:var(--ac-b)!important}
        .view-btn.active{background:var(--ac-bg);color:var(--ac-text)}
        input[type=checkbox]{accent-color:var(--ac);width:14px;height:14px;cursor:pointer}
        input[type=text]{outline:none}input::placeholder{color:var(--t3)}
        button:focus{outline:none}select:focus{outline:none}
        ::-webkit-scrollbar{width:4px;height:4px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:var(--border2);border-radius:2px}
      `}</style>

      {toast&&<div style={{position:'fixed',bottom:24,right:24,zIndex:2000,padding:'10px 18px',borderRadius:8,background:'var(--bg2)',border:'1px solid var(--ac-b)',fontSize:13,fontWeight:500,color:'var(--ac-text)',boxShadow:'0 4px 20px rgba(0,0,0,.3)'}}>{toast}</div>}

      <div style={{height:'100vh',display:'flex',overflow:'hidden',background:'var(--bg)',color:'var(--text)'}}>

        {/* LEFT SIDEBAR */}
        <aside style={{width:220,flexShrink:0,background:'var(--bg2)',borderRight:'1px solid var(--border)',display:'flex',flexDirection:'column',height:'100vh'}}>
          {/* Logo */}
          <div style={{display:'flex',alignItems:'center',gap:10,padding:'14px 16px 12px',borderBottom:'1px solid var(--border)'}}>
            <div onClick={()=>router.push('/')} style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer'}}>
              <div style={{width:28,height:28,borderRadius:6,background:'var(--ac)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:800,color:'#fff',flexShrink:0}}>EM</div>
              <div>
                <div style={{fontSize:12,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--text)'}}>EmergentMap</div>
                <div style={{fontSize:9,color:'var(--t3)',letterSpacing:'.03em'}}>AI-Native Services</div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div style={{padding:'10px 12px',borderBottom:'1px solid var(--border)'}}>
            <div onClick={openCmd} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 10px',background:'rgba(255,255,255,.04)',border:'1px solid var(--border)',borderRadius:7,cursor:'pointer'}}>
              <span style={{fontSize:13,color:'var(--t3)'}}>⌕</span>
              <span style={{fontSize:12,color:'var(--t3)',flex:1}}>Search…</span>
              <span style={{fontSize:9,background:'rgba(255,255,255,.05)',border:'1px solid var(--border)',borderRadius:3,padding:'1px 5px',color:'var(--t3)'}}>⌘K</span>
            </div>
          </div>

          {/* Nav */}
          <div style={{padding:'12px 12px 4px'}}>
            <div style={{fontSize:9,fontWeight:700,letterSpacing:'.12em',textTransform:'uppercase',color:'rgba(200,212,232,.2)',padding:'0 6px',marginBottom:4}}>Platform</div>
            {[
              {icon:'⊞',label:'Dashboard',href:'/dashboard',badge:String(D.length),active:true},
              {icon:'◈',label:'Funds',href:'/funds',badge:String(FUNDS.length),active:false},
              {icon:'☆',label:'Watchlist',href:'/watchlist',badge:wl.size>0?String(wl.size):'',active:false},
              {icon:'◎',label:'Market Map',href:'/dashboard',badge:'New',active:false},
            ].map(item=>(
              <div key={item.label} className={`nav-item${item.active?' active':''}`}
                onClick={()=>router.push(item.href)}
                style={{display:'flex',alignItems:'center',gap:9,padding:'7px 8px',borderRadius:6,cursor:'pointer',color:'var(--t3)',transition:'all .12s',fontSize:13,borderLeft:'2px solid transparent',marginBottom:1}}>
                <span style={{fontSize:13,width:16,textAlign:'center',flexShrink:0}}>{item.icon}</span>
                <span style={{flex:1}}>{item.label}</span>
                {item.badge&&<span style={{fontSize:9,fontFamily:"'DM Mono',monospace",background:item.badge==='New'?'rgba(37,99,235,.15)':'rgba(255,255,255,.06)',padding:'2px 6px',borderRadius:10,color:item.badge==='New'?'var(--ac-text)':'rgba(200,212,232,.4)'}}>{item.badge}</span>}
              </div>
            ))}
          </div>

          <div style={{padding:'12px 12px 4px',marginTop:4}}>
            <div style={{fontSize:9,fontWeight:700,letterSpacing:'.12em',textTransform:'uppercase',color:'rgba(200,212,232,.2)',padding:'0 6px',marginBottom:4}}>Analysis</div>
            {[
              {icon:'↑',label:'Funding Rounds',href:'/dashboard'},
              {icon:'◷',label:'Recent Deals',href:'/dashboard',badge:'New'},
              {icon:'⚡',label:'Portfolio Co.',href:'/dashboard'},
            ].map(item=>(
              <div key={item.label} className="nav-item"
                onClick={()=>router.push(item.href)}
                style={{display:'flex',alignItems:'center',gap:9,padding:'7px 8px',borderRadius:6,cursor:'pointer',color:'var(--t3)',transition:'all .12s',fontSize:13,borderLeft:'2px solid transparent',marginBottom:1}}>
                <span style={{fontSize:13,width:16,textAlign:'center',flexShrink:0}}>{item.icon}</span>
                <span style={{flex:1}}>{item.label}</span>
                {item.badge&&<span style={{fontSize:9,background:'rgba(37,99,235,.15)',padding:'2px 6px',borderRadius:10,color:'var(--ac-text)'}}>{item.badge}</span>}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={{marginTop:'auto',padding:12,borderTop:'1px solid var(--border)'}}>
            <div style={{display:'flex',alignItems:'center',gap:9,padding:'6px 8px',borderRadius:7,marginBottom:8}}>
              <div style={{width:28,height:28,borderRadius:'50%',background:'var(--ac-bg)',border:'1px solid var(--ac-b)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,color:'var(--ac-text)'}}>VF</div>
              <div>
                <div style={{fontSize:12,fontWeight:500,color:'var(--text)'}}>vlafen</div>
                <div style={{fontSize:10,color:'var(--t3)'}}>Free plan</div>
              </div>
            </div>
            <button onClick={()=>router.push('/auth?mode=signup')} style={{width:'100%',padding:8,borderRadius:6,background:'var(--ac)',color:'#fff',border:'none',fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:700,cursor:'pointer'}}>Upgrade to Pro →</button>
          </div>
        </aside>

        {/* MAIN */}
        <div style={{flex:1,display:'flex',flexDirection:'column',minWidth:0,overflow:'hidden'}}>

          {/* TOP BAR */}
          <div style={{height:48,display:'flex',alignItems:'center',padding:'0 20px',background:'var(--bg2)',borderBottom:'1px solid var(--border)',flexShrink:0}}>
            <div style={{fontSize:14,fontWeight:600,color:'var(--text)'}}>AI-Native Services Dashboard</div>
            <div style={{display:'flex',alignItems:'center',gap:8,marginLeft:'auto'}}>
              {someSelected&&<button onClick={()=>exportToCSV(data.filter(c=>selected.has(c.n)))} style={{padding:'6px 14px',borderRadius:6,border:'1px solid var(--ac-b)',background:'var(--ac-bg)',color:'var(--ac-text)',fontSize:12,cursor:'pointer',fontFamily:"'DM Sans',sans-serif"}}>↓ Export {selected.size}</button>}
              <button style={{padding:'6px 14px',border:'1px solid var(--border)',borderRadius:6,background:'transparent',color:'var(--t3)',fontFamily:"'DM Sans',sans-serif",fontSize:12,cursor:'pointer'}}>Request Update</button>
              <button style={{padding:'6px 14px',border:'none',borderRadius:6,background:'var(--ac)',color:'#fff',fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:700,cursor:'pointer'}}>+ Add Company</button>
            </div>
          </div>

          <div style={{flex:1,padding:'18px 20px',overflow:'auto'}}>

            {/* STATS */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:18}}>
              {[
                {l:'Companies',v:'20+',s:'tracked & verified'},
                {l:'Total Raised',v:'$1.4B',s:'across all rounds'},
                {l:'Sectors',v:'8',s:'service verticals'},
                {l:'Top Investors',v:'27',s:'funds mapped'},
              ].map(({l,v,s})=>(
                <div key={l} style={{padding:'14px 16px',background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:10,position:'relative',overflow:'hidden'}}>
                  <div style={{position:'absolute',top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,var(--ac),transparent)`}}/>
                  <div style={{fontSize:9,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--t3)',marginBottom:6}}>{l}</div>
                  <div style={{fontSize:22,fontWeight:600,color:'var(--ac-text)',fontFamily:"'DM Mono',monospace",letterSpacing:'-.02em'}}>{v}</div>
                  <div style={{fontSize:10,color:'var(--t3)',marginTop:2}}>{s}</div>
                </div>
              ))}
            </div>

            {/* FILTER BAR */}
            <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:14,flexWrap:'wrap'}}>
              <div style={{display:'flex',alignItems:'center',gap:6,flex:1,flexWrap:'wrap'}}>
                <span style={{fontSize:9,color:'var(--t3)',fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',marginRight:2}}>Sector</span>
                {SECTS.map(s=>(
                  <div key={s.n} className={`pill${sec===s.sl?' active':''}`}
                    onClick={()=>setSec(sec===s.sl?'':s.sl)}
                    style={{padding:'5px 12px',borderRadius:20,fontSize:11,fontWeight:500,border:'1px solid var(--border)',background:'transparent',color:'var(--t3)',cursor:'pointer',transition:'all .12s',whiteSpace:'nowrap',display:'flex',alignItems:'center',gap:5}}>
                    {s.n!=='All'&&<span style={{display:'inline-block',width:5,height:5,borderRadius:'50%',background:s.c,flexShrink:0}}/>}
                    {s.n}
                  </div>
                ))}
                <div style={{width:1,height:20,background:'var(--border)',margin:'0 4px',flexShrink:0}}/>
                <span style={{fontSize:9,color:'var(--t3)',fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',marginRight:2}}>Stage</span>
                {STAGES.map(st=>(
                  <div key={st} className={`stage-pill${stage===st?' active':''}`}
                    onClick={()=>setStage(stage===st?'':st)}
                    style={{padding:'5px 12px',borderRadius:20,fontSize:11,fontWeight:500,border:'1px solid var(--border)',background:'transparent',color:'var(--t3)',cursor:'pointer',transition:'all .12s',whiteSpace:'nowrap'}}>
                    {st}
                  </div>
                ))}
              </div>
              <div style={{display:'flex',alignItems:'center',gap:6,marginLeft:'auto'}}>
                <div style={{position:'relative'}}>
                  <span style={{position:'absolute',left:8,top:'50%',transform:'translateY(-50%)',fontSize:13,color:'var(--t3)',pointerEvents:'none'}}>⌕</span>
                  <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search…" style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:7,padding:'6px 10px 6px 26px',fontSize:12,color:'var(--text)',fontFamily:"'DM Sans',sans-serif",width:160}}/>
                </div>
                <select value={srt} onChange={e=>setSrt(e.target.value)} style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:7,padding:'6px 8px',fontSize:12,fontWeight:500,color:'var(--t2)',cursor:'pointer',fontFamily:"'DM Sans',sans-serif"}}>
                  <option value="r">↓ Raised</option>
                  <option value="v">↓ Valuation</option>
                  <option value="e">↓ Employees</option>
                  <option value="n">A→Z</option>
                </select>
                <div style={{display:'flex',background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:7,overflow:'hidden'}}>
                  {(['t','g'] as const).map(v=>(
                    <button key={v} className={`view-btn${view===v?' active':''}`} onClick={()=>setView(v)} style={{padding:'6px 10px',fontSize:13,cursor:'pointer',color:view===v?'var(--ac-text)':'var(--t3)',background:view===v?'var(--ac-bg)':'transparent',border:'none',transition:'all .12s'}}>
                      {v==='t'?'☰':'⊞'}
                    </button>
                  ))}
                </div>
                <span style={{fontSize:12,color:'var(--t3)',fontFamily:"'DM Mono',monospace"}}>{data.length}</span>
              </div>
            </div>

            {/* TABLE */}
            {view==='t'&&(
              <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:10,overflow:'hidden'}}>
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead style={{position:'sticky',top:0,zIndex:5,background:'var(--bg3)'}}>
                    <tr style={{borderBottom:'1px solid var(--border)'}}>
                      <th style={{padding:'9px 12px',width:36}}><input type="checkbox" checked={allSelected} onChange={toggleAll}/></th>
                      <th style={{padding:'9px 12px',textAlign:'left',fontSize:9,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--t3)',width:28}}>#</th>
                      <th style={{padding:'9px 12px',textAlign:'left',fontSize:9,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--t3)'}}>Company</th>
                      <th style={{padding:'9px 12px',textAlign:'left',fontSize:9,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--t3)'}}>Sector</th>
                      <th style={{padding:'9px 12px',textAlign:'left',fontSize:9,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--t3)'}}>Investors</th>
                      <th style={{padding:'9px 12px',textAlign:'left',fontSize:9,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--ac-text)'}}>Raised ↓</th>
                      <th style={{padding:'9px 12px',textAlign:'left',fontSize:9,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--t3)'}}>Valuation</th>
                      <th style={{padding:'9px 12px',textAlign:'left',fontSize:9,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--t3)'}}>Emp.</th>
                      <th style={{padding:'9px 12px',textAlign:'left',fontSize:9,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--t3)'}}>Round</th>
                      <th style={{padding:'9px 12px',textAlign:'left',fontSize:9,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--t3)'}}>Date</th>
                      <th style={{padding:'9px 12px',width:40}}/>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((co,i)=>{
                      const isSel=selected.has(co.n)
                      const isWL=wl.has(co.n)
                      const coUrl='/company/'+toSlug(co.n)
                      const rc=roundColor(co.st)
                      return(
                        <tr key={co.n} onClick={()=>router.push(coUrl)} style={{borderBottom:'1px solid var(--border)',cursor:'pointer',transition:'background .1s',background:isSel?'rgba(37,99,235,.05)':'transparent'}}>
                          <td style={{padding:'10px 12px',width:36}} onClick={e=>e.stopPropagation()}><input type="checkbox" checked={isSel} onChange={()=>toggleSelect(co.n)}/></td>
                          <td style={{padding:'10px 12px',fontSize:13,color:'var(--t3)',fontFamily:"'DM Mono',monospace"}}>{i+1}</td>
                          <td style={{padding:'10px 12px'}}>
                            <div style={{display:'flex',alignItems:'center',gap:8}}>
                              <div style={{width:28,height:28,borderRadius:7,background:co.sc,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,color:'#fff',flexShrink:0}}>{ini(co.n)}</div>
                              <div>
                                <div style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>
                                  {co.n}{co.pf&&<span style={{display:'inline-flex',padding:'1px 5px',borderRadius:4,fontSize:9,fontWeight:700,border:'1px solid var(--ac-b)',marginLeft:4,verticalAlign:'middle',background:'var(--ac-bg)',color:'var(--ac-text)'}}>★</span>}
                                </div>
                                <div style={{fontSize:11,color:'var(--t3)',marginTop:1}}>{co.s}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{padding:'10px 12px',fontSize:12,color:'var(--t2)'}}>
                            <span style={{display:'inline-block',width:5,height:5,borderRadius:'50%',background:co.sc,marginRight:5,verticalAlign:'middle'}}/>
                            {co.sec}
                          </td>
                          <td style={{padding:'10px 12px'}} onClick={e=>e.stopPropagation()}>
                            <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
                              {co.inv.slice(0,2).map((inv:string)=>(
                                <a key={inv} href={'/fund/'+toSlug(inv)} target="_blank" rel="noreferrer" className="ich" onClick={e=>e.stopPropagation()}
                                  style={{padding:'2px 7px',borderRadius:4,fontSize:11,fontWeight:500,background:'var(--bg3)',border:'1px solid var(--border)',color:'var(--t2)',whiteSpace:'nowrap',cursor:'pointer',transition:'all .12s',textDecoration:'none'}}>{inv}</a>
                              ))}
                              {co.inv.length>2&&<span style={{padding:'2px 7px',borderRadius:4,fontSize:11,background:'var(--bg3)',border:'1px solid var(--border)',color:'var(--t3)'}}>+{co.inv.length-2}</span>}
                            </div>
                          </td>
                          <td style={{padding:'10px 12px',fontSize:13,fontFamily:"'DM Mono',monospace",color:'var(--ac-text)',fontWeight:600}}>{fmt(co.r)}</td>
                          <td style={{padding:'10px 12px',fontSize:13,fontFamily:"'DM Mono',monospace",color:'var(--t2)'}}>{fmt(co.v)}</td>
                          <td style={{padding:'10px 12px',fontSize:13,fontFamily:"'DM Mono',monospace",color:'var(--t2)'}}>{co.e}</td>
                          <td style={{padding:'10px 12px'}}>
                            <span style={{padding:'3px 8px',borderRadius:5,fontSize:10,fontWeight:600,background:rc.bg,color:rc.c,border:`1px solid ${rc.b}`,whiteSpace:'nowrap'}}>{co.st}</span>
                          </td>
                          <td style={{padding:'10px 12px',fontSize:12,fontFamily:"'DM Mono',monospace",color:'var(--t3)',whiteSpace:'nowrap'}}>{co.date}</td>
                          <td style={{padding:'10px 12px',width:40}} onClick={e=>toggleWL(co.n,e)}>
                            <button className="wl-star" style={{width:28,height:28,borderRadius:6,border:`1px solid ${isWL?'var(--ac-b)':'var(--border)'}`,background:isWL?'var(--ac-bg)':'transparent',fontSize:14,color:isWL?'var(--ac-text)':'var(--t3)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}>
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
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:8}}>
                {data.map(co=>{
                  const isSel=selected.has(co.n)
                  const isWL=wl.has(co.n)
                  const rc=roundColor(co.st)
                  return(
                    <div key={co.n} style={{background:isSel?'rgba(37,99,235,.06)':'var(--bg2)',border:`1px solid ${isSel?'var(--ac-b)':'var(--border)'}`,borderRadius:10,padding:13,cursor:'pointer',transition:'all .15s',position:'relative'}} onClick={()=>router.push('/company/'+toSlug(co.n))}>
                      <div style={{position:'absolute',top:10,right:10}}>
                        <button className="wl-star" onClick={e=>toggleWL(co.n,e)} style={{width:24,height:24,borderRadius:5,border:`1px solid ${isWL?'var(--ac-b)':'var(--border)'}`,background:isWL?'var(--ac-bg)':'transparent',fontSize:12,color:isWL?'var(--ac-text)':'var(--t3)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'}}>
                          {isWL?'★':'☆'}
                        </button>
                      </div>
                      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10}}>
                        <div style={{width:28,height:28,borderRadius:7,background:co.sc,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,color:'#fff',flexShrink:0}}>{ini(co.n)}</div>
                        <div style={{flex:1,minWidth:0,paddingRight:28}}>
                          <div style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>{co.n}{co.pf&&<span style={{display:'inline-flex',padding:'1px 5px',borderRadius:4,fontSize:9,fontWeight:700,border:'1px solid var(--ac-b)',marginLeft:4,background:'var(--ac-bg)',color:'var(--ac-text)'}}>★</span>}</div>
                          <div style={{fontSize:11,color:'var(--t3)',marginTop:1}}>{co.s}</div>
                        </div>
                      </div>
                      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:4}}>
                        {[['Raised',fmt(co.r),true],['Val.',fmt(co.v),false],['Emp.',String(co.e),false]].map(([l,v,g])=>(
                          <div key={String(l)} style={{background:'var(--bg3)',borderRadius:5,padding:'6px 8px'}}>
                            <div style={{fontFamily:"'DM Mono',monospace",fontSize:13,fontWeight:500,color:g?'var(--ac-text)':'var(--text)'}}>{v}</div>
                            <div style={{fontSize:10,textTransform:'uppercase',letterSpacing:'.05em',color:'var(--t3)',marginTop:1}}>{l}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{marginTop:8}}>
                        <span style={{padding:'3px 8px',borderRadius:5,fontSize:10,fontWeight:600,background:rc.bg,color:rc.c,border:`1px solid ${rc.b}`}}>{co.st}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CMD+K */}
      {cmdOpen&&(
        <div style={{position:'fixed',inset:0,zIndex:1000,background:'rgba(0,0,0,0.65)',backdropFilter:'blur(6px)',display:'flex',alignItems:'flex-start',justifyContent:'center',paddingTop:'15vh'}} onClick={closeCmd}>
          <div style={{width:560,background:'var(--bg2)',border:'1px solid var(--border2)',borderRadius:14,overflow:'hidden',boxShadow:'0 24px 80px rgba(0,0,0,0.5)'}} onClick={e=>e.stopPropagation()}>
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
                style={{flex:1,background:'transparent',border:'none',outline:'none',fontSize:15,color:'var(--text)',fontFamily:"'DM Sans',sans-serif"}}
              />
              <kbd style={{fontSize:10,color:'var(--t3)',background:'var(--bg3)',padding:'2px 6px',borderRadius:4,border:'1px solid var(--border)'}}>ESC</kbd>
            </div>
            <div style={{maxHeight:380,overflowY:'auto'}}>
              {!cmdQ&&<div style={{padding:'10px 16px 4px',fontSize:10,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--t3)'}}>Recent</div>}
              {cmdResults.length===0
                ?<div style={{padding:'24px 16px',textAlign:'center',color:'var(--t3)',fontSize:13}}>No results</div>
                :cmdResults.map((r:any,i:number)=>(
                  <div key={r.name+i} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 16px',background:i===cmdSel?'var(--ac-bg)':'transparent',borderLeft:i===cmdSel?'2px solid var(--ac)':'2px solid transparent',cursor:'pointer'}}
                    onMouseEnter={()=>setCmdSel(i)} onClick={()=>selectCmd(i)}>
                    {r.type==='company'
                      ?<div style={{width:32,height:32,borderRadius:8,background:r.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,color:'#fff',flexShrink:0}}>{ini(r.name)}</div>
                      :<div style={{width:32,height:32,borderRadius:8,background:'var(--bg3)',border:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,flexShrink:0}}>🏦</div>
                    }
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontSize:13,fontWeight:500,color:'var(--text)',marginBottom:2}}>{r.name}</div>
                      <div style={{fontSize:11,color:'var(--t3)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{r.sub}</div>
                    </div>
                    {r.raised
                      ?<div style={{fontFamily:"'DM Mono',monospace",fontSize:12,fontWeight:500,color:'var(--ac-text)',flexShrink:0}}>{r.raised}</div>
                      :<div style={{fontSize:10,color:'var(--t3)',background:'var(--bg3)',padding:'2px 7px',borderRadius:4,flexShrink:0}}>Fund</div>
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
    </>
  )
}
