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
  {n:'All',c:'#2563eb',sl:''},
  {n:'Health',c:'#16a34a',sl:'Health'},
  {n:'Software',c:'#d97706',sl:'Software'},
  {n:'Financial',c:'#2563eb',sl:'Financial'},
  {n:'Legal',c:'#7c3aed',sl:'Legal'},
  {n:'Security',c:'#dc2626',sl:'Security'},
  {n:'GTM',c:'#0891b2',sl:'GTM'},
  {n:'Industrial',c:'#b45309',sl:'Industrial'},
  {n:'AI Impl.',c:'#15803d',sl:'AI Impl.'},
]
const STAGES=['Seed','Series A','Series B','Series C']
const NAV=[
  {key:'dashboard',icon:'⊞',label:'Dashboard',href:'/dashboard'},
  {key:'funds',icon:'◈',label:'Funds',href:'/funds'},
  {key:'watchlist',icon:'☆',label:'Watchlist',href:'/watchlist'},
  {key:'map',icon:'◎',label:'Market Map',href:'/dashboard',badge:'New'},
]
const NAV2=[
  {key:'rounds',icon:'↑',label:'Funding Rounds',href:'/dashboard'},
  {key:'deals',icon:'◷',label:'Recent Deals',href:'/dashboard',badge:'New'},
  {key:'portfolio',icon:'⚡',label:'Portfolio Co.',href:'/dashboard'},
]

function fmt(n:number){if(!n)return'—';if(n>=1000)return`$${(n/1000).toFixed(1)}B`;return`$${n}M`}
function ini(n:string){return n.split(' ').map((w:string)=>w[0]).join('').slice(0,2).toUpperCase()}
function toSlug(n:string){return n.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function buildFunds(){
  const m:Record<string,any>={}
  D.forEach(co=>{co.inv.forEach(inv=>{if(!m[inv])m[inv]={n:inv,cos:[],raised:0};m[inv].cos.push(co);m[inv].raised+=co.r})})
  return Object.values(m).sort((a:any,b:any)=>b.cos.length-a.cos.length)
}
const FUNDS=buildFunds()
const CMD_DATA=[
  ...D.map(co=>({type:'company',name:co.n,sub:co.s+' · '+co.sec,raised:fmt(co.r),color:co.sc})),
  ...FUNDS.map((f:any)=>({type:'fund',name:f.n,sub:'Fund · '+f.cos.length+' cos',raised:null,color:null})),
]
function exportCSV(companies:typeof D){
  const h=['Name','Sector','Stage','Raised','Valuation','Employees','Founded','Investors']
  const r=companies.map(co=>[co.n,co.sec,co.st,fmt(co.r),fmt(co.v),co.e,co.y,co.inv.join('; ')])
  const csv=[h,...r].map(row=>row.map(v=>`"${v}"`).join(',')).join('\n')
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='companies.csv';a.click()
}
function rc(st:string){
  if(st==='Series C')return{bg:'rgba(124,58,237,.12)',c:'#a78bfa',b:'rgba(124,58,237,.25)'}
  if(st==='Series B')return{bg:'rgba(37,99,235,.1)',c:'#7aaff7',b:'rgba(37,99,235,.22)'}
  if(st==='Series A')return{bg:'rgba(16,185,129,.1)',c:'#6ee7b7',b:'rgba(16,185,129,.22)'}
  return{bg:'rgba(245,158,11,.1)',c:'#fcd34d',b:'rgba(245,158,11,.22)'}
}

export default function DashboardPage(){
  const [sec,setSec]=useState('')
  const [stage,setStage]=useState('')
  const [q,setQ]=useState('')
  const [srt,setSrt]=useState('r')
  const [view,setView]=useState<'t'|'g'>('t')
  const [selected,setSelected]=useState<Set<string>>(new Set())
  const [wl,setWl]=useState<Set<string>>(new Set())
  const [toast,setToast]=useState('')
  const [theme,setTheme]=useState<'dark'|'light'>('dark')
  const [pinned,setPinned]=useState(false)
  const [hovered,setHovered]=useState(false)
  const [menuOpen,setMenuOpen]=useState(false)
  const [secOpen,setSecOpen]=useState(false)
  const [stgOpen,setStgOpen]=useState(false)
  const [cmdOpen,setCmdOpen]=useState(false)
  const [cmdQ,setCmdQ]=useState('')
  const [cmdSel,setCmdSel]=useState(0)
  const cmdRef=useRef<HTMLInputElement>(null)
  const router=useRouter()
  const expanded=pinned||hovered

  useEffect(()=>{
    try{setWl(new Set(JSON.parse(localStorage.getItem('wl_companies')||'[]')))}catch{}
    const t=localStorage.getItem('theme') as 'dark'|'light'|null
    const th=t||'dark';setTheme(th);document.documentElement.setAttribute('data-theme',th)
    setPinned(localStorage.getItem('sb_pinned')==='1')
  },[])

  function toggleTheme(){const n=theme==='dark'?'light':'dark';setTheme(n);document.documentElement.setAttribute('data-theme',n);localStorage.setItem('theme',n)}
  function togglePin(){const n=!pinned;setPinned(n);localStorage.setItem('sb_pinned',n?'1':'0')}
  function toggleWL(name:string,e:React.MouseEvent){
    e.stopPropagation()
    try{
      const s:string[]=JSON.parse(localStorage.getItem('wl_companies')||'[]')
      const isIn=wl.has(name)
      const next=isIn?s.filter(n=>n!==name):[...s,name]
      localStorage.setItem('wl_companies',JSON.stringify(next))
      const nw=new Set(wl);isIn?nw.delete(name):nw.add(name);setWl(nw)
      setToast(isIn?'Removed':'★ Added to Watchlist');setTimeout(()=>setToast(''),2000)
    }catch{}
  }
  function openCmd(){setCmdOpen(true);setCmdQ('');setCmdSel(0);setTimeout(()=>cmdRef.current?.focus(),50)}
  function closeCmd(){setCmdOpen(false)}
  function selectCmd(i:number){const r=cmdResults[i];if(!r)return;closeCmd();r.type==='company'?router.push('/company/'+toSlug(r.name)):router.push('/fund/'+toSlug(r.name))}
  useEffect(()=>{
    function k(e:KeyboardEvent){if((e.metaKey||e.ctrlKey)&&e.key==='k'){e.preventDefault();openCmd()}if(e.key==='Escape'){closeCmd();setMenuOpen(false)}}
    window.addEventListener('keydown',k);return()=>window.removeEventListener('keydown',k)
  },[])

  const data=useMemo(()=>{
    let d=[...D]
    if(sec)d=d.filter(c=>c.sec===sec)
    if(stage)d=d.filter(c=>c.st===stage)
    if(q)d=d.filter(c=>c.n.toLowerCase().includes(q.toLowerCase())||c.s.toLowerCase().includes(q.toLowerCase())||c.inv.some((i:string)=>i.toLowerCase().includes(q.toLowerCase())))
    d.sort((a,b)=>srt==='n'?a.n.localeCompare(b.n):srt==='v'?b.v-a.v:srt==='e'?b.e-a.e:b.r-a.r)
    return d
  },[sec,stage,q,srt])

  const cmdResults=useMemo(()=>{
    if(!cmdQ)return CMD_DATA.slice(0,6)
    return CMD_DATA.filter((r:any)=>r.name.toLowerCase().includes(cmdQ.toLowerCase())).slice(0,8)
  },[cmdQ])

  const allSel=data.length>0&&data.every(co=>selected.has(co.n))
  function toggleSelect(n:string){setSelected(s=>{const ns=new Set(s);ns.has(n)?ns.delete(n):ns.add(n);return ns})}
  function toggleAll(){if(allSel)setSelected(s=>{const ns=new Set(s);data.forEach(co=>ns.delete(co.n));return ns});else setSelected(s=>{const ns=new Set(s);data.forEach(co=>ns.add(co.n));return ns})}

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}body{font-family:'DM Sans',sans-serif}
        html[data-theme=dark]{--bg:#0a0a0f;--bg2:#111118;--bg3:#1a1a24;--border:rgba(255,255,255,.08);--border2:rgba(255,255,255,.15);--text:#ffffff;--t2:#e8edf5;--t3:rgba(255,255,255,.45);--ac:#2563EB;--ac-bg:rgba(37,99,235,.1);--ac-b:rgba(37,99,235,.26);--ac-t:#7aaff7;--sb:#0c0c14;--top:#0e0e18}
        html[data-theme=light]{--bg:#f4f5f7;--bg2:#ffffff;--bg3:#eef0f3;--border:rgba(0,0,0,.09);--border2:rgba(0,0,0,.18);--text:#111111;--t2:#1a1a1a;--t3:rgba(0,0,0,.45);--ac:#2563EB;--ac-bg:rgba(37,99,235,.08);--ac-b:rgba(37,99,235,.22);--ac-t:#1d4ed8;--sb:#ffffff;--top:#ffffff}
        .ni{display:flex;align-items:center;gap:9px;padding:7px 8px;border-radius:6px;cursor:pointer;color:var(--t3);transition:all .12s;font-size:13px;border-left:2px solid transparent;margin-bottom:1px;white-space:nowrap;overflow:hidden}
        .ni:hover{background:rgba(37,99,235,.07);color:var(--t2)}
        .ni.on{background:var(--ac-bg);color:var(--ac-t);border-left-color:var(--ac);font-weight:500}
        .pill{padding:5px 11px;border-radius:20px;font-size:11px;font-weight:500;border:1px solid var(--border);background:transparent;color:var(--t3);cursor:pointer;transition:all .12s;white-space:nowrap;display:inline-flex;align-items:center;gap:5px;flex-shrink:0}
        .pill:hover{border-color:rgba(37,99,235,.3);color:var(--t2)}
        .pill.on{background:var(--ac-bg);border-color:var(--ac-b);color:var(--ac-t)}
        .vbtn{padding:5px 9px;cursor:pointer;color:var(--t3);border:none;background:transparent;font-size:13px;transition:all .12s}
        .vbtn.on{background:var(--ac-bg);color:var(--ac-t)}
        .ich:hover{border-color:var(--border2)!important;color:var(--text)!important}
        .wls:hover{color:var(--ac-t)!important;border-color:var(--ac-b)!important}
        tbody tr:hover{background:rgba(37,99,235,.04)}
        .gc:hover{border-color:var(--border2)!important}
        input[type=checkbox]{accent-color:var(--ac);width:14px;height:14px;cursor:pointer}
        input::placeholder{color:var(--t3)}button:focus,select:focus{outline:none}
        .fscroll{scrollbar-width:none;-ms-overflow-style:none}.fscroll::-webkit-scrollbar{display:none}
        ::-webkit-scrollbar{width:4px;height:4px}::-webkit-scrollbar-thumb{background:var(--border2);border-radius:2px}::-webkit-scrollbar-track{background:transparent}
      `}</style>

      {toast&&<div style={{position:'fixed',bottom:24,right:24,zIndex:2000,padding:'10px 18px',borderRadius:8,background:'var(--bg2)',border:'1px solid var(--ac-b)',fontSize:13,fontWeight:500,color:'var(--ac-t)',boxShadow:'0 4px 20px rgba(0,0,0,.25)'}}>{toast}</div>}

      <div data-theme={theme} style={{height:'100vh',display:'flex',overflow:'hidden',background:'var(--bg)',color:'var(--text)'}}>

        {/* SIDEBAR */}
        <aside onMouseEnter={()=>{if(!pinned)setHovered(true)}} onMouseLeave={()=>setHovered(false)}
          style={{width:expanded?220:52,flexShrink:0,background:'var(--sb)',borderRight:'1px solid var(--border)',display:'flex',flexDirection:'column',height:'100vh',overflow:'hidden',position:pinned?'relative':'absolute',zIndex:60,transition:'width .18s ease',boxShadow:hovered&&!pinned?'6px 0 24px rgba(0,0,0,.15)':'none'}}>
          {/* Logo */}
          <div style={{display:'flex',alignItems:'center',gap:8,padding:'10px',borderBottom:'1px solid var(--border)',flexShrink:0,minHeight:48}}>
            <div onClick={()=>router.push('/')} style={{width:28,height:28,borderRadius:6,background:'var(--ac)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:800,color:'#fff',flexShrink:0,cursor:'pointer'}}>EM</div>
            {expanded&&(
              <>
                <div style={{flex:1,minWidth:0,cursor:'pointer'}} onClick={()=>router.push('/')}>
                  <div style={{fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--text)'}}>EmergentMap</div>
                  <div style={{fontSize:9,color:'var(--t3)'}}>AI-Native Services</div>
                </div>
                <button onClick={togglePin} title={pinned?'Unpin':'Pin'} style={{width:26,height:26,borderRadius:6,border:'1px solid var(--border)',background:pinned?'var(--ac-bg)':'transparent',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:pinned?'var(--ac-t)':'var(--t3)',flexShrink:0,transition:'all .15s'}}>
                  {pinned?
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>:
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                  }
                </button>
              </>
            )}
          </div>
          {/* Nav sections */}
          <div style={{padding:'10px 8px 4px',overflow:'hidden'}}>
            {expanded&&<div style={{fontSize:9,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--t3)',opacity:.5,padding:'0 6px',marginBottom:4}}>Platform</div>}
            {NAV.map(item=>(
              <div key={item.key} className={`ni${item.key==='dashboard'?' on':''}`} onClick={()=>router.push(item.href)} title={!expanded?item.label:''}>
                <span style={{fontSize:14,width:16,textAlign:'center',flexShrink:0}}>{item.icon}</span>
                {expanded&&<span style={{flex:1}}>{item.label}</span>}
                {expanded&&item.badge&&<span style={{fontSize:9,background:'rgba(37,99,235,.15)',padding:'2px 6px',borderRadius:10,color:'var(--ac-t)'}}>{item.badge}</span>}
                {expanded&&item.key==='watchlist'&&wl.size>0&&<span style={{fontSize:9,background:'var(--ac-bg)',padding:'2px 6px',borderRadius:10,color:'var(--ac-t)'}}>{wl.size}</span>}
              </div>
            ))}
          </div>
          <div style={{padding:'8px 8px 4px',overflow:'hidden'}}>
            {expanded&&<div style={{fontSize:9,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--t3)',opacity:.5,padding:'0 6px',marginBottom:4}}>Analysis</div>}
            {NAV2.map(item=>(
              <div key={item.key} className="ni" onClick={()=>router.push(item.href)} title={!expanded?item.label:''}>
                <span style={{fontSize:14,width:16,textAlign:'center',flexShrink:0}}>{item.icon}</span>
                {expanded&&<span style={{flex:1}}>{item.label}</span>}
                {expanded&&item.badge&&<span style={{fontSize:9,background:'rgba(37,99,235,.15)',padding:'2px 6px',borderRadius:10,color:'var(--ac-t)'}}>{item.badge}</span>}
              </div>
            ))}
          </div>
          {/* User */}
          <div style={{marginTop:'auto',padding:'10px 8px',borderTop:'1px solid var(--border)',flexShrink:0}}>
            {expanded?(
              <div style={{display:'flex',alignItems:'center',gap:8,padding:'5px 6px'}}>
                <div style={{width:26,height:26,borderRadius:'50%',background:'var(--ac-bg)',border:'1px solid var(--ac-b)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:700,color:'var(--ac-t)',flexShrink:0}}>VF</div>
                <div><div style={{fontSize:12,fontWeight:500,color:'var(--text)'}}>vlafen</div><div style={{fontSize:10,color:'var(--t3)'}}>Free plan</div></div>
              </div>
            ):(
              <div style={{width:28,height:28,borderRadius:'50%',background:'var(--ac-bg)',border:'1px solid var(--ac-b)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:700,color:'var(--ac-t)',margin:'0 auto',cursor:'pointer'}}>VF</div>
            )}
          </div>
        </aside>

        {/* MAIN */}
        <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden',marginLeft:pinned?0:52}}>

          {/* TOPBAR */}
          <div style={{height:48,display:'flex',alignItems:'center',padding:'0 12px',background:'var(--top)',borderBottom:'1px solid var(--border)',flexShrink:0,gap:8}}>
            <div onClick={openCmd} style={{flex:1,display:'flex',alignItems:'center',gap:8,padding:'6px 12px',background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:7,cursor:'pointer',maxWidth:480,height:34}} onMouseOver={e=>e.currentTarget.style.borderColor='var(--border2)'} onMouseOut={e=>e.currentTarget.style.borderColor='var(--border)'}>
              <span style={{fontSize:13,color:'var(--t3)'}}>⌕</span>
              <span style={{fontSize:13,color:'var(--t3)',flex:1}}>Search companies, funds…</span>
              <kbd style={{fontSize:10,color:'var(--t3)',background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:4,padding:'1px 6px'}}>/</kbd>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:5,marginLeft:'auto'}}>
              {selected.size>0&&<button onClick={()=>exportCSV(data.filter(c=>selected.has(c.n)))} style={{padding:'6px 12px',borderRadius:6,border:'1px solid var(--ac-b)',background:'var(--ac-bg)',color:'var(--ac-t)',fontSize:12,cursor:'pointer',fontFamily:"'DM Sans',sans-serif"}}>↓ Export {selected.size}</button>}
              <button style={{padding:'6px 12px',border:'1px solid var(--border)',borderRadius:6,background:'transparent',color:'var(--t3)',fontFamily:"'DM Sans',sans-serif",fontSize:12,cursor:'pointer'}}>Request Update ▾</button>
              <button onClick={()=>router.push('/auth')} style={{padding:'6px 14px',border:'1px solid var(--border)',borderRadius:6,background:'transparent',color:'var(--t2)',fontFamily:"'DM Sans',sans-serif",fontSize:12,cursor:'pointer'}}>Log in</button>
              <button onClick={()=>router.push('/auth?mode=signup')} style={{padding:'6px 14px',border:'none',borderRadius:6,background:'var(--ac)',color:'#fff',fontFamily:"'DM Sans',sans-serif",fontSize:12,fontWeight:700,cursor:'pointer'}}>♛ Get Pro</button>
              <div style={{position:'relative'}}>
                <button onClick={()=>setMenuOpen(o=>!o)} style={{width:34,height:34,borderRadius:7,border:'1px solid var(--border)',background:'transparent',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',color:'var(--t2)',fontSize:15}}>☰</button>
                {menuOpen&&(
                  <>
                    <div style={{position:'fixed',inset:0,zIndex:100}} onClick={()=>setMenuOpen(false)}/>
                    <div style={{position:'absolute',top:40,right:0,width:180,background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:10,boxShadow:'0 8px 32px rgba(0,0,0,.2)',padding:'10px',zIndex:200}}>
                      <div style={{fontSize:10,color:'var(--t3)',marginBottom:8,textTransform:'uppercase',letterSpacing:'.08em',fontWeight:700}}>Appearance</div>
                      <div style={{display:'flex',gap:3,background:'var(--bg3)',borderRadius:8,padding:3}}>
                        <button onClick={()=>{if(theme!=='light')toggleTheme()}} title="Light" style={{flex:1,height:28,borderRadius:6,border:'none',background:theme==='light'?'var(--bg2)':'transparent',cursor:'pointer',color:theme==='light'?'var(--ac-t)':'var(--t3)',transition:'all .12s',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:theme==='light'?'0 1px 3px rgba(0,0,0,.1)':'none'}}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                        </button>
                        <button onClick={()=>{if(theme!=='dark')toggleTheme()}} title="Dark" style={{flex:1,height:28,borderRadius:6,border:'none',background:theme==='dark'?'var(--bg2)':'transparent',cursor:'pointer',color:theme==='dark'?'var(--ac-t)':'var(--t3)',transition:'all .12s',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:theme==='dark'?'0 1px 3px rgba(0,0,0,.1)':'none'}}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                        </button>
                        <button onClick={()=>{const m=window.matchMedia('(prefers-color-scheme:dark)').matches;const sys=m?'dark':'light';if(theme!==sys)toggleTheme()}} title="System" style={{flex:1,height:28,borderRadius:6,border:'none',background:'transparent',cursor:'pointer',color:'var(--t3)',transition:'all .12s',display:'flex',alignItems:'center',justifyContent:'center'}}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div style={{flex:1,padding:'14px 16px',overflow:'auto'}}>
            {/* STATS */}
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:14}}>
              {[{l:'Companies',v:'20+',s:'tracked'},{l:'Total Raised',v:'$1.4B',s:'all rounds'},{l:'Sectors',v:'8',s:'verticals'},{l:'Investors',v:'27',s:'top funds'}].map(({l,v,s})=>(
                <div key={l} style={{padding:'12px 14px',background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:10,position:'relative',overflow:'hidden'}}>
                  <div style={{position:'absolute',top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,var(--ac),transparent)`}}/>
                  <div style={{fontSize:9,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--t3)',marginBottom:5}}>{l}</div>
                  <div style={{fontSize:20,fontWeight:600,color:'var(--ac-t)',fontFamily:"'DM Mono',monospace"}}>{v}</div>
                  <div style={{fontSize:10,color:'var(--t3)',marginTop:2}}>{s}</div>
                </div>
              ))}
            </div>

            {/* FILTER BAR */}
            <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:12}}>
              {/* Sector dropdown */}
              <div style={{position:'relative'}}>
                <button onClick={()=>{setSecOpen(o=>!o);setStgOpen(false)}} style={{display:'flex',alignItems:'center',gap:6,padding:'6px 12px',border:`1px solid ${sec?'var(--ac-b)':'var(--border)'}`,borderRadius:7,background:sec?'var(--ac-bg)':'var(--bg2)',color:sec?'var(--ac-t)':'var(--t2)',fontSize:12,fontWeight:500,cursor:'pointer',fontFamily:"'DM Sans',sans-serif",height:32,transition:'all .12s'}}>
                  {sec?<><span style={{width:5,height:5,borderRadius:'50%',background:SECTS.find(s=>s.sl===sec)?.c,display:'inline-block'}}/>{sec}</>:'Sector'}
                  <span style={{fontSize:9,color:'var(--t3)',marginLeft:2}}>▾</span>
                </button>
                {secOpen&&(
                  <>
                    <div style={{position:'fixed',inset:0,zIndex:90}} onClick={()=>setSecOpen(false)}/>
                    <div style={{position:'absolute',top:36,left:0,background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:9,boxShadow:'0 6px 24px rgba(0,0,0,.15)',padding:6,zIndex:200,minWidth:160}}>
                      {SECTS.map(s=>(
                        <div key={s.n} onClick={()=>{setSec(s.sl);setSecOpen(false)}} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 10px',borderRadius:6,cursor:'pointer',fontSize:12,color:sec===s.sl?'var(--ac-t)':'var(--t2)',background:sec===s.sl?'var(--ac-bg)':'transparent',transition:'background .1s'}} onMouseOver={e=>{if(sec!==s.sl)(e.currentTarget as HTMLDivElement).style.background='var(--bg3)'}} onMouseOut={e=>{if(sec!==s.sl)(e.currentTarget as HTMLDivElement).style.background='transparent'}}>
                          {s.n!=='All'&&<span style={{width:7,height:7,borderRadius:'50%',background:s.c,display:'inline-block',flexShrink:0}}/>}
                          {s.n==='All'&&<span style={{width:7,height:7,flexShrink:0}}/>}
                          <span style={{flex:1}}>{s.n}</span>
                          {sec===s.sl&&<span style={{fontSize:10}}>✓</span>}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Stage dropdown */}
              <div style={{position:'relative'}}>
                <button onClick={()=>{setStgOpen(o=>!o);setSecOpen(false)}} style={{display:'flex',alignItems:'center',gap:6,padding:'6px 12px',border:`1px solid ${stage?'var(--ac-b)':'var(--border)'}`,borderRadius:7,background:stage?'var(--ac-bg)':'var(--bg2)',color:stage?'var(--ac-t)':'var(--t2)',fontSize:12,fontWeight:500,cursor:'pointer',fontFamily:"'DM Sans',sans-serif",height:32,transition:'all .12s'}}>
                  {stage||'Stage'}<span style={{fontSize:9,color:'var(--t3)',marginLeft:2}}>▾</span>
                </button>
                {stgOpen&&(
                  <>
                    <div style={{position:'fixed',inset:0,zIndex:90}} onClick={()=>setStgOpen(false)}/>
                    <div style={{position:'absolute',top:36,left:0,background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:9,boxShadow:'0 6px 24px rgba(0,0,0,.15)',padding:6,zIndex:200,minWidth:130}}>
                      <div onClick={()=>{setStage('');setStgOpen(false)}} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 10px',borderRadius:6,cursor:'pointer',fontSize:12,color:!stage?'var(--ac-t)':'var(--t2)',background:!stage?'var(--ac-bg)':'transparent'}} onMouseOver={e=>{if(stage)(e.currentTarget as HTMLDivElement).style.background='var(--bg3)'}} onMouseOut={e=>{if(stage)(e.currentTarget as HTMLDivElement).style.background='transparent'}}>
                        <span style={{flex:1}}>All stages</span>{!stage&&<span style={{fontSize:10}}>✓</span>}
                      </div>
                      {STAGES.map(st=>(
                        <div key={st} onClick={()=>{setStage(st);setStgOpen(false)}} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 10px',borderRadius:6,cursor:'pointer',fontSize:12,color:stage===st?'var(--ac-t)':'var(--t2)',background:stage===st?'var(--ac-bg)':'transparent',transition:'background .1s'}} onMouseOver={e=>{if(stage!==st)(e.currentTarget as HTMLDivElement).style.background='var(--bg3)'}} onMouseOut={e=>{if(stage!==st)(e.currentTarget as HTMLDivElement).style.background='transparent'}}>
                          <span style={{flex:1}}>{st}</span>{stage===st&&<span style={{fontSize:10}}>✓</span>}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {sec&&<button onClick={()=>setSec('')} style={{padding:'4px 8px',border:'1px solid var(--border)',borderRadius:6,background:'transparent',color:'var(--t3)',fontSize:11,cursor:'pointer',fontFamily:"'DM Sans',sans-serif"}}>✕ Clear</button>}

              <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:5}}>
                <div style={{position:'relative'}}>
                  <span style={{position:'absolute',left:7,top:'50%',transform:'translateY(-50%)',fontSize:12,color:'var(--t3)',pointerEvents:'none'}}>⌕</span>
                  <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search…" style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:7,padding:'6px 8px 6px 24px',fontSize:12,color:'var(--text)',fontFamily:"'DM Sans',sans-serif",width:130,outline:'none'}}/>
                </div>
                <select value={srt} onChange={e=>setSrt(e.target.value)} style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:7,padding:'6px 8px',fontSize:12,color:'var(--t2)',cursor:'pointer',fontFamily:"'DM Sans',sans-serif"}}>
                  <option value="r">↓ Raised</option>
                  <option value="v">↓ Valuation</option>
                  <option value="e">↓ Employees</option>
                  <option value="n">A→Z</option>
                </select>
                <div style={{display:'flex',background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:7,overflow:'hidden'}}>
                  {(['t','g'] as const).map(v=>(
                    <button key={v} className={`vbtn${view===v?' on':''}`} onClick={()=>setView(v)}>{v==='t'?'☰':'⊞'}</button>
                  ))}
                </div>
                <span style={{fontSize:11,color:'var(--t3)',fontFamily:"'DM Mono',monospace"}}>{data.length}</span>
              </div>
            </div>

            {/* TABLE */}
            {view==='t'&&(
              <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:10,overflow:'hidden'}}>
                <table style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead style={{position:'sticky',top:0,zIndex:5,background:'var(--bg3)'}}>
                    <tr style={{borderBottom:'1px solid var(--border)'}}>
                      <th style={{padding:'8px 10px',width:34}}><input type="checkbox" checked={allSel} onChange={toggleAll}/></th>
                      <th style={{padding:'8px 8px',textAlign:'left',fontSize:9,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--t3)',width:24}}>#</th>
                      <th style={{padding:'8px 8px',textAlign:'left',fontSize:9,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--t3)',letterSpacing:'.1em'}}>Company</th>
                      <th style={{padding:'8px 8px',textAlign:'left',fontSize:9,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--t3)'}}>Sector</th>
                      <th style={{padding:'8px 8px',textAlign:'left',fontSize:9,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--t3)'}}>Investors</th>
                      <th style={{padding:'8px 8px',textAlign:'left',fontSize:9,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--ac-t)'}}>Raised ↓</th>
                      <th style={{padding:'8px 8px',textAlign:'left',fontSize:9,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--t3)'}}>Valuation</th>
                      <th style={{padding:'8px 8px',textAlign:'left',fontSize:9,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--t3)'}}>Emp.</th>
                      <th style={{padding:'8px 8px',textAlign:'left',fontSize:9,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--t3)'}}>Round</th>
                      <th style={{padding:'8px 8px',textAlign:'left',fontSize:9,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--t3)'}}>Date</th>
                      <th style={{padding:'8px 8px',width:36}}/>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((co,i)=>{
                      const isSel=selected.has(co.n),isWL=wl.has(co.n),rcc=rc(co.st)
                      return(
                        <tr key={co.n} onClick={()=>router.push('/company/'+toSlug(co.n))} style={{borderBottom:'1px solid var(--border)',cursor:'pointer',background:isSel?'rgba(37,99,235,.05)':'transparent',transition:'background .1s'}}>
                          <td style={{padding:'9px 10px',width:34}} onClick={e=>e.stopPropagation()}><input type="checkbox" checked={isSel} onChange={()=>toggleSelect(co.n)}/></td>
                          <td style={{padding:'9px 8px',fontSize:12,color:'var(--t2)',fontFamily:"'DM Mono',monospace"}}>{i+1}</td>
                          <td style={{padding:'9px 8px'}}>
                            <div style={{display:'flex',alignItems:'center',gap:8}}>
                              <div style={{width:26,height:26,borderRadius:6,background:co.sc,display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:700,color:'#fff',flexShrink:0}}>{ini(co.n)}</div>
                              <div>
                                <div style={{fontSize:12,fontWeight:500,color:'var(--text)',letterSpacing:'-.01em'}}>{co.n}{co.pf&&<span style={{marginLeft:4,fontSize:9,padding:'1px 5px',borderRadius:4,background:'var(--ac-bg)',color:'var(--ac-t)',border:'1px solid var(--ac-b)'}}>★</span>}</div>
                                <div style={{fontSize:11,color:'var(--t3)',marginTop:1}}>{co.s}</div>
                              </div>
                            </div>
                          </td>
                          <td style={{padding:'9px 8px',fontSize:12,color:'var(--text)'}}><span style={{display:'inline-block',width:5,height:5,borderRadius:'50%',background:co.sc,marginRight:5,verticalAlign:'middle'}}/>{co.sec}</td>
                          <td style={{padding:'9px 8px'}} onClick={e=>e.stopPropagation()}>
                            <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
                              {co.inv.slice(0,2).map((inv:string)=>(
                                <a key={inv} href={'/fund/'+toSlug(inv)} className="ich" onClick={e=>e.stopPropagation()} style={{padding:'2px 7px',borderRadius:4,fontSize:11,background:'var(--bg3)',border:'1px solid var(--border)',color:'var(--t2)',whiteSpace:'nowrap',cursor:'pointer',transition:'all .12s',textDecoration:'none'}}>{inv}</a>
                              ))}
                              {co.inv.length>2&&<span style={{padding:'2px 7px',borderRadius:4,fontSize:11,background:'var(--bg3)',border:'1px solid var(--border)',color:'var(--t3)'}}>+{co.inv.length-2}</span>}
                            </div>
                          </td>
                          <td style={{padding:'9px 8px',fontSize:13,fontFamily:"'DM Mono',monospace",color:'var(--ac-t)',fontWeight:600}}>{fmt(co.r)}</td>
                          <td style={{padding:'9px 8px',fontSize:12,fontFamily:"'DM Mono',monospace",color:'var(--text)'}}>{fmt(co.v)}</td>
                          <td style={{padding:'9px 8px',fontSize:12,fontFamily:"'DM Mono',monospace",color:'var(--text)'}}>{co.e}</td>
                          <td style={{padding:'9px 8px'}}><span style={{padding:'3px 8px',borderRadius:5,fontSize:10,fontWeight:600,background:rcc.bg,color:rcc.c,border:`1px solid ${rcc.b}`,whiteSpace:'nowrap'}}>{co.st}</span></td>
                          <td style={{padding:'9px 8px',fontSize:11,fontFamily:"'DM Mono',monospace",color:'var(--t2)',whiteSpace:'nowrap'}}>{co.date}</td>
                          <td style={{padding:'9px 8px',width:36}} onClick={e=>toggleWL(co.n,e)}>
                            <button className="wls" style={{width:26,height:26,borderRadius:5,border:`1px solid ${isWL?'var(--ac-b)':'var(--border)'}`,background:isWL?'var(--ac-bg)':'transparent',fontSize:13,color:isWL?'var(--ac-t)':'var(--t3)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}>{isWL?'★':'☆'}</button>
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
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(230px,1fr))',gap:8}}>
                {data.map(co=>{
                  const isWL=wl.has(co.n),rcc=rc(co.st)
                  return(
                    <div key={co.n} className="gc" onClick={()=>router.push('/company/'+toSlug(co.n))} style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:10,padding:12,cursor:'pointer',transition:'border-color .15s',position:'relative'}}>
                      <button className="wls" onClick={e=>toggleWL(co.n,e)} style={{position:'absolute',top:10,right:10,width:24,height:24,borderRadius:5,border:`1px solid ${isWL?'var(--ac-b)':'var(--border)'}`,background:isWL?'var(--ac-bg)':'transparent',fontSize:12,color:isWL?'var(--ac-t)':'var(--t3)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',transition:'all .15s'}}>{isWL?'★':'☆'}</button>
                      <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:10,paddingRight:28}}>
                        <div style={{width:26,height:26,borderRadius:6,background:co.sc,display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:700,color:'#fff',flexShrink:0}}>{ini(co.n)}</div>
                        <div style={{minWidth:0}}>
                          <div style={{fontSize:12,fontWeight:500,color:'var(--text)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{co.n}{co.pf&&<span style={{marginLeft:4,fontSize:9,padding:'1px 5px',borderRadius:4,background:'var(--ac-bg)',color:'var(--ac-t)',border:'1px solid var(--ac-b)'}}>★</span>}</div>
                          <div style={{fontSize:11,color:'var(--t3)',marginTop:1,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{co.s}</div>
                        </div>
                      </div>
                      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:4,marginBottom:8}}>
                        {[['Raised',fmt(co.r),true],['Val.',fmt(co.v),false],['Emp.',String(co.e),false]].map(([l,v,hl])=>(
                          <div key={String(l)} style={{background:'var(--bg3)',borderRadius:5,padding:'5px 7px'}}>
                            <div style={{fontSize:12,fontWeight:500,color:hl?'var(--ac-t)':'var(--text)',fontFamily:"'DM Mono',monospace"}}>{v}</div>
                            <div style={{fontSize:9,textTransform:'uppercase',letterSpacing:'.05em',color:'var(--t3)',marginTop:1}}>{l}</div>
                          </div>
                        ))}
                      </div>
                      <span style={{padding:'3px 8px',borderRadius:5,fontSize:10,fontWeight:600,background:rcc.bg,color:rcc.c,border:`1px solid ${rcc.b}`}}>{co.st}</span>
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
        <div style={{position:'fixed',inset:0,zIndex:1000,background:'rgba(0,0,0,.6)',backdropFilter:'blur(6px)',display:'flex',alignItems:'flex-start',justifyContent:'center',paddingTop:'15vh'}} onClick={closeCmd}>
          <div style={{width:540,background:'var(--bg2)',border:'1px solid var(--border2)',borderRadius:12,overflow:'hidden',boxShadow:'0 24px 80px rgba(0,0,0,.4)'}} onClick={e=>e.stopPropagation()}>
            <div style={{display:'flex',alignItems:'center',gap:10,padding:'13px 16px',borderBottom:'1px solid var(--border)'}}>
              <span style={{fontSize:15,color:'var(--t3)'}}>⌕</span>
              <input ref={cmdRef} value={cmdQ} onChange={e=>{setCmdQ(e.target.value);setCmdSel(0)}}
                onKeyDown={e=>{if(e.key==='Escape')closeCmd();else if(e.key==='ArrowDown')setCmdSel(s=>Math.min(s+1,cmdResults.length-1));else if(e.key==='ArrowUp')setCmdSel(s=>Math.max(s-1,0));else if(e.key==='Enter')selectCmd(cmdSel)}}
                placeholder="Search companies, funds…"
                style={{flex:1,background:'transparent',border:'none',outline:'none',fontSize:14,color:'var(--text)',fontFamily:"'DM Sans',sans-serif"}}
              />
              <kbd style={{fontSize:10,color:'var(--t3)',background:'var(--bg3)',padding:'2px 6px',borderRadius:4,border:'1px solid var(--border)'}}>ESC</kbd>
            </div>
            <div style={{maxHeight:360,overflowY:'auto'}}>
              {!cmdQ&&<div style={{padding:'9px 16px 4px',fontSize:10,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--t3)'}}>Recent</div>}
              {cmdResults.map((r:any,i:number)=>(
                <div key={r.name+i} style={{display:'flex',alignItems:'center',gap:12,padding:'9px 16px',background:i===cmdSel?'var(--ac-bg)':'transparent',borderLeft:i===cmdSel?'2px solid var(--ac)':'2px solid transparent',cursor:'pointer'}}
                  onMouseEnter={()=>setCmdSel(i)} onClick={()=>selectCmd(i)}>
                  {r.type==='company'?<div style={{width:30,height:30,borderRadius:7,background:r.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,color:'#fff',flexShrink:0}}>{ini(r.name)}</div>:<div style={{width:30,height:30,borderRadius:7,background:'var(--bg3)',border:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,flexShrink:0}}>🏦</div>}
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13,fontWeight:500,color:'var(--text)',marginBottom:1}}>{r.name}</div>
                    <div style={{fontSize:11,color:'var(--t3)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{r.sub}</div>
                  </div>
                  {r.raised?<div style={{fontFamily:"'DM Mono',monospace",fontSize:12,fontWeight:500,color:'var(--ac-t)',flexShrink:0}}>{r.raised}</div>:<div style={{fontSize:10,color:'var(--t3)',background:'var(--bg3)',padding:'2px 7px',borderRadius:4,flexShrink:0}}>Fund</div>}
                </div>
              ))}
            </div>
            <div style={{padding:'7px 16px',borderTop:'1px solid var(--border)',display:'flex',gap:12,fontSize:10,color:'var(--t3)'}}>
              <span>↑↓ navigate</span><span>↵ select</span><span>ESC close</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
