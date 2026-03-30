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
  D.forEach(co=>{
    co.inv.forEach(inv=>{
      if(!m[inv]) m[inv]={n:inv,cos:[],raised:0,...(FM[inv]||{type:'VC',tier:2,focus:[],aum:'N/A'})}
      m[inv].cos.push(co);m[inv].raised+=co.r
    })
  })
  return Object.values(m).sort((a:any,b:any)=>b.cos.length-a.cos.length)
}
const FUNDS=buildFunds()

function exportFundsCSV(funds:any[]){
  const headers=['Fund','Type','Tier','AUM','AI Companies','Deployed','Focus Areas','Portfolio Names']
  const rows=funds.map((f:any)=>[f.n,f.type,'Tier '+f.tier,f.aum,f.cos.length,fmt(f.raised),f.focus.join('; '),f.cos.map((c:any)=>c.n).join('; ')])
  const csv=[headers,...rows].map(r=>r.map((v:any)=>`"${v}"`).join(',')).join('\n')
  const blob=new Blob([csv],{type:'text/csv;charset=utf-8;'})
  const url=URL.createObjectURL(blob)
  const a=document.createElement('a');a.href=url;a.download='funds.csv';a.click()
  URL.revokeObjectURL(url)
}

export default function FundsPage(){
  const [ftype,setFtype]=useState('')
  const [ftier,setFtier]=useState(0)
  const [q,setQ]=useState('')
  const [srt,setSrt]=useState('c')
  const [selected,setSelected]=useState<any>(null)
  const [checked,setChecked]=useState<Set<string>>(new Set())
  const [wl,setWl]=useState<Set<string>>(new Set())
  const [toast,setToast]=useState('')
  const [theme,setTheme]=useState<'dark'|'light'>('light')
  const [cmdOpen,setCmdOpen]=useState(false)
  const [cmdQ,setCmdQ]=useState('')
  const [cmdSel,setCmdSel]=useState(0)
  const cmdRef=useRef<HTMLInputElement>(null)
  const router=useRouter()


  useEffect(()=>{
    const saved=localStorage.getItem('theme') as 'dark'|'light'|null
    if(saved) setTheme(saved)
  },[])

  useEffect(()=>{
    document.documentElement.setAttribute('data-theme',theme)
    localStorage.setItem('theme',theme)
  },[theme])
  useEffect(()=>{
    try{const s=JSON.parse(localStorage.getItem('wl_funds')||'[]');setWl(new Set(s))}catch{}
  },[])

  function toggleWL(name:string,e:React.MouseEvent){
    e.stopPropagation()
    try{
      const s:string[]=JSON.parse(localStorage.getItem('wl_funds')||'[]')
      const isIn=wl.has(name)
      const next=isIn?s.filter(n=>n!==name):[...s,name]
      localStorage.setItem('wl_funds',JSON.stringify(next))
      const nw=new Set(wl);isIn?nw.delete(name):nw.add(name);setWl(nw)
      setToast(isIn?'Removed from Watchlist':`★ ${name} added`)
      setTimeout(()=>setToast(''),2000)
    }catch{}
  }

  function toggleCheck(name:string){setChecked(s=>{const ns=new Set(s);ns.has(name)?ns.delete(name):ns.add(name);return ns})}
  function toggleAll(){
    if(data.every((f:any)=>checked.has(f.n))) setChecked(s=>{const ns=new Set(s);data.forEach((f:any)=>ns.delete(f.n));return ns})
    else setChecked(s=>{const ns=new Set(s);data.forEach((f:any)=>ns.add(f.n));return ns})
  }

  const data=useMemo(()=>{
    let d=[...FUNDS]
    if(ftype) d=d.filter((f:any)=>f.type===ftype)
    if(ftier) d=d.filter((f:any)=>f.tier===ftier)
    if(q) d=d.filter((f:any)=>f.n.toLowerCase().includes(q.toLowerCase()))
    d.sort((a:any,b:any)=>srt==='r'?b.raised-a.raised:srt==='n'?a.n.localeCompare(b.n):b.cos.length-a.cos.length)
    return d
  },[ftype,ftier,q,srt])

  const allChecked=data.length>0&&data.every((f:any)=>checked.has(f.n))
  const someChecked=checked.size>0

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
        .sb-r:hover{background:var(--bg2)}.sb-r.on{background:var(--ac-bg)}.sb-r.on .sb-n{color:var(--ac);font-weight:600}
        .frow:hover td{background:var(--bg2)}.fco:hover{border-color:var(--border2)!important}
        .wl-star:hover{color:#5CD2A2!important;border-color:rgba(92,210,162,.3)!important}
        input[type=checkbox]{accent-color:var(--ac);width:14px;height:14px;cursor:pointer}
        input[type=text]{outline:none}input::placeholder{color:var(--t3)}
        button:focus{outline:none}select:focus{outline:none}
      `}</style>

      {toast&&<div style={{position:'fixed',bottom:24,right:24,zIndex:2000,padding:'10px 18px',borderRadius:8,background:'#0d0d1a',border:'1px solid rgba(92,210,162,.3)',fontSize:13,fontWeight:500,color:'#5CD2A2',boxShadow:'0 8px 32px rgba(0,0,0,.4)'}}>{toast}</div>}

      <div data-theme={theme} style={{height:'100vh',display:'flex',flexDirection:'column',overflow:'hidden',background:'var(--bg)',color:'var(--text)',fontFamily:"'Plus Jakarta Sans',sans-serif",transition:'background .2s,color .2s'}}>
        <nav style={{height:48,display:'flex',alignItems:'center',padding:'0 20px',background:'var(--bg)',borderBottom:'1px solid var(--border)',flexShrink:0}}>
          <div onClick={()=>router.push('/')} style={{display:'flex',alignItems:'center',gap:7,fontSize:14,fontWeight:700,letterSpacing:'.1em',cursor:'pointer'}}>
            <div style={{width:7,height:7,borderRadius:'50%',background:'var(--ac)'}}/>INTELLIGENCE
          </div>
          <div style={{display:'flex',marginLeft:20}}>
            {[['Dashboard','/dashboard'],['Funds','/funds'],['Watchlist','/watchlist']].map(([t,href],i)=>(
              <a key={t} href={href} style={{padding:'0 14px',height:48,display:'flex',alignItems:'center',fontSize:14,fontWeight:500,color:i===1?'var(--text)':'var(--t3)',textDecoration:'none',borderBottom:i===1?'2px solid var(--ac)':'2px solid transparent',transition:'all .15s'}}>
                {t}{t==='Watchlist'&&wl.size>0&&<span style={{marginLeft:5,fontSize:10,fontWeight:700,background:'var(--ac)',color:'#fff',borderRadius:10,padding:'1px 5px'}}>{wl.size}</span>}
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

        {someChecked&&(
          <div style={{display:'flex',alignItems:'center',gap:10,padding:'8px 20px',background:'rgba(92,210,162,.06)',borderBottom:'1px solid var(--ac-b)',flexShrink:0}}>
            <span style={{fontSize:13,color:'var(--ac)',fontWeight:600}}>{checked.size} selected</span>
            <span style={{fontSize:13,color:'var(--t3)'}}>—</span>
            <button onClick={()=>exportFundsCSV(FUNDS.filter((f:any)=>checked.has(f.n)))} style={{display:'flex',alignItems:'center',gap:6,padding:'5px 14px',borderRadius:6,fontSize:13,fontWeight:600,background:'var(--ac-bg)',color:'var(--ac)',border:'1px solid var(--ac-b)',cursor:'pointer'}}>↓ Export CSV</button>
            <button onClick={()=>setChecked(new Set())} style={{padding:'5px 14px',borderRadius:6,fontSize:13,color:'var(--t3)',background:'transparent',border:'1px solid var(--border)',cursor:'pointer'}}>Clear</button>
          </div>
        )}

        <div style={{display:'grid',gridTemplateColumns:'180px 1fr 320px',flex:1,overflow:'hidden'}}>
          <div style={{borderRight:'1px solid var(--border)',background:'var(--bg)',overflowY:'auto'}}>
            <div style={{fontSize:12,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--t3)',padding:'14px 14px 6px'}}>Type</div>
            {[['','All funds',FUNDS.length],['VC','VC'],['CVC','CVC'],['Accelerator','Accelerator'],['Hedge Fund','Hedge Fund']].map(([v,label,cnt])=>(
              <div key={String(v)} className={`sb-r${ftype===String(v)?' on':''}`} onClick={()=>setFtype(String(v))}
                style={{display:'flex',alignItems:'center',gap:8,padding:'7px 14px',cursor:'pointer',transition:'background .12s'}}>
                <div style={{width:6,height:6,borderRadius:'50%',background:'var(--t2)',flexShrink:0}}/>
                <div className="sb-n" style={{fontSize:14,fontWeight:500,flex:1,color:'var(--t2)'}}>{label}</div>
                {cnt!==undefined&&<div style={{fontSize:13,color:'var(--t3)',fontFamily:"'DM Mono',monospace"}}>{cnt}</div>}
              </div>
            ))}
            <div style={{height:1,background:'var(--border)',margin:'6px 14px'}}/>
            <div style={{fontSize:12,fontWeight:700,letterSpacing:'.1em',textTransform:'uppercase',color:'var(--t3)',padding:'8px 14px 6px'}}>Tier</div>
            {[[1,'Tier 1'],[2,'Tier 2']].map(([v,label])=>(
              <div key={v} className={`sb-r${ftier===v?' on':''}`} onClick={()=>setFtier(ftier===v?0:Number(v))}
                style={{display:'flex',alignItems:'center',gap:8,padding:'7px 14px',cursor:'pointer',transition:'background .12s'}}>
                <div style={{width:6,height:6,borderRadius:'50%',background:v===1?'#ca8a04':'var(--t3)',flexShrink:0}}/>
                <div className="sb-n" style={{fontSize:14,fontWeight:500,color:'var(--t2)'}}>{label}</div>
              </div>
            ))}
            <div style={{height:1,background:'var(--border)',margin:'6px 14px'}}/>
            <div className="sb-r" onClick={()=>router.push('/watchlist')} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 14px',cursor:'pointer'}}>
              <div style={{width:6,height:6,borderRadius:'50%',background:'var(--ac)',flexShrink:0}}/>
              <div style={{fontSize:14,fontWeight:500,flex:1,color:'var(--t2)'}}>Watchlist</div>
              {wl.size>0&&<div style={{fontSize:13,color:'var(--ac)',fontFamily:"'DM Mono',monospace"}}>{wl.size}</div>}
            </div>
          </div>

          <div style={{display:'flex',flexDirection:'column',overflow:'hidden',borderRight:'1px solid var(--border)'}}>
            <div style={{display:'flex',alignItems:'center',gap:6,padding:'9px 14px',borderBottom:'1px solid var(--border)',background:'var(--bg)',flexShrink:0}}>
              <div style={{position:'relative',flex:1,maxWidth:200}}>
                <span style={{position:'absolute',left:8,top:'50%',transform:'translateY(-50%)',fontSize:15,color:'var(--t3)',pointerEvents:'none'}}>⌕</span>
                <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search fund…" style={{width:'100%',background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:6,padding:'6px 10px 6px 28px',fontSize:14,color:'var(--text)',fontFamily:"'Plus Jakarta Sans',sans-serif",outline:'none'}}/>
              </div>
              <select value={srt} onChange={e=>setSrt(e.target.value)} style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:6,padding:'5px 8px',fontSize:13,fontWeight:500,color:'var(--t2)',cursor:'pointer',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
                <option value="c">↓ Portfolio size</option>
                <option value="r">↓ Deployed</option>
                <option value="n">A→Z</option>
              </select>
              <div style={{fontSize:13,color:'var(--t3)',fontFamily:"'DM Mono',monospace",whiteSpace:'nowrap',marginLeft:'auto'}}>{data.length} funds</div>
            </div>
            <div style={{flex:1,overflowY:'auto'}}>
              <table style={{width:'100%',borderCollapse:'collapse'}}>
                <thead style={{position:'sticky',top:0,zIndex:5,background:'var(--bg2)'}}>
                  <tr style={{borderBottom:'1px solid var(--border)'}}>
                    <th style={{padding:'8px 12px',width:36}}><input type="checkbox" checked={allChecked} onChange={toggleAll}/></th>
                    <th style={{padding:'8px 14px',textAlign:'left',fontSize:12,fontWeight:700,letterSpacing:'.07em',textTransform:'uppercase',color:'var(--t3)'}}>Fund</th>
                    <th style={{padding:'8px 14px',textAlign:'left',fontSize:12,fontWeight:700,letterSpacing:'.07em',textTransform:'uppercase',color:'var(--t3)'}}>Type</th>
                    <th style={{padding:'8px 14px',textAlign:'left',fontSize:12,fontWeight:700,letterSpacing:'.07em',textTransform:'uppercase',color:'var(--t3)'}}>Tier</th>
                    <th style={{padding:'8px 14px',textAlign:'left',fontSize:12,fontWeight:700,letterSpacing:'.07em',textTransform:'uppercase',color:'var(--ac)'}}>Portfolio ↓</th>
                    <th style={{padding:'8px 14px',textAlign:'left',fontSize:12,fontWeight:700,letterSpacing:'.07em',textTransform:'uppercase',color:'var(--t3)'}}>Deployed</th>
                    <th style={{padding:'8px 14px',textAlign:'left',fontSize:12,fontWeight:700,letterSpacing:'.07em',textTransform:'uppercase',color:'var(--t3)'}}>Companies</th>
                    <th style={{padding:'8px 14px',width:40}}></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((f:any,i:number)=>{
                    const pfc=f.cos.filter((c:any)=>c.pf)
                    const isOn=selected?.n===f.n
                    const isChecked=checked.has(f.n)
                    const isWL=wl.has(f.n)
                    return(
                      <tr key={f.n} className="frow" onClick={()=>setSelected(f)}
                        style={{borderBottom:'1px solid var(--border)',cursor:'pointer',background:isOn?'var(--ac-bg)':isChecked?'rgba(92,210,162,.03)':'transparent',transition:'background .1s'}}>
                        <td style={{padding:'10px 12px'}} onClick={e=>e.stopPropagation()}><input type="checkbox" checked={isChecked} onChange={()=>toggleCheck(f.n)}/></td>
                        <td style={{padding:'10px 14px'}}>
                          <div style={{display:'flex',alignItems:'center',gap:9}}>
                            <div style={{width:26,height:26,borderRadius:6,background:'var(--bg3)',border:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:9,fontWeight:700,color:'var(--t3)',flexShrink:0}}>{ini(f.n)}</div>
                            <div>
                              <a href={'/fund/'+toSlug(f.n)} onClick={e=>e.preventDefault()} style={{fontSize:14,fontWeight:600,color:'var(--text)',textDecoration:'none',display:'block'}}>{f.n}</a>
                              <div style={{fontSize:12,color:'var(--t3)',marginTop:1}}>{f.aum}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{padding:'10px 14px',fontSize:11,color:'var(--t2)'}}>{f.type}</td>
                        <td style={{padding:'10px 14px'}}>
                          <span style={{padding:'2px 6px',borderRadius:4,fontSize:12,fontWeight:700,background:f.tier===1?'rgba(202,138,4,.08)':'var(--bg3)',color:f.tier===1?'#ca8a04':'var(--t3)',border:`1px solid ${f.tier===1?'rgba(202,138,4,.2)':'var(--border)'}`}}>T{f.tier}</span>
                        </td>
                        <td style={{padding:'10px 14px',fontSize:14,fontFamily:"'DM Mono',monospace",color:'var(--ac)',fontWeight:500}}>{f.cos.length} <span style={{fontSize:10,color:'var(--t3)'}}>({pfc.length} pf)</span></td>
                        <td style={{padding:'10px 14px',fontSize:14,fontFamily:"'DM Mono',monospace",color:'var(--t2)'}}>{fmt(f.raised)}</td>
                        <td style={{padding:'10px 14px'}}>
                          <div style={{display:'flex',gap:3,flexWrap:'wrap'}}>
                            {f.cos.slice(0,3).map((co:any)=>(
                              <span key={co.n} style={{padding:'2px 5px',borderRadius:3,fontSize:12,background:co.pf?'var(--ac-bg)':'var(--bg3)',border:`1px solid ${co.pf?'var(--ac-b)':'var(--border)'}`,color:co.pf?'var(--ac)':'var(--t2)',whiteSpace:'nowrap'}}>{co.n.split(' ')[0]}</span>
                            ))}
                            {f.cos.length>3&&<span style={{padding:'2px 5px',borderRadius:3,fontSize:12,background:'var(--bg3)',border:'1px solid var(--border)',color:'var(--t3)'}}>+{f.cos.length-3}</span>}
                          </div>
                        </td>
                        <td style={{padding:'10px 12px'}} onClick={e=>toggleWL(f.n,e)}>
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
          </div>

          <div style={{background:'var(--bg)',overflowY:'auto',display:'flex',flexDirection:'column'}}>
            {!selected?(
              <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:8,color:'var(--t3)',textAlign:'center',padding:24}}>
                <div style={{fontSize:28,opacity:.3}}>🏦</div>
                <div style={{fontSize:13,fontWeight:600,color:'var(--t2)'}}>Select a fund</div>
                <div style={{fontSize:12}}>Click a row to see portfolio</div>
              </div>
            ):(
              <>
                <div style={{padding:'16px 18px',borderBottom:'1px solid var(--border)',position:'sticky',top:0,background:'var(--bg)'}}>
                  <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:8}}>
                    <div style={{width:36,height:36,borderRadius:9,background:'var(--bg3)',border:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,fontWeight:700,color:'var(--t2)'}}>{ini(selected.n)}</div>
                    <button onClick={e=>toggleWL(selected.n,e)} style={{display:'flex',alignItems:'center',gap:5,padding:'5px 12px',borderRadius:6,fontSize:12,fontWeight:600,background:wl.has(selected.n)?'rgba(92,210,162,.08)':'rgba(255,255,255,.05)',color:wl.has(selected.n)?'#5CD2A2':'var(--t3)',border:`1px solid ${wl.has(selected.n)?'rgba(92,210,162,.25)':'var(--border)'}`,cursor:'pointer'}}>
                      {wl.has(selected.n)?'★ Saved':'☆ Save'}
                    </button>
                  </div>
                  <div style={{fontSize:17,fontWeight:700,color:'var(--text)'}}>{selected.n}</div>
                  <div style={{fontSize:13,color:'var(--t3)',marginTop:2}}>{selected.type}{selected.aum!=='N/A'?' · AUM: '+selected.aum:''}</div>
                  <button onClick={()=>router.push('/fund/'+toSlug(selected.n))} style={{marginTop:10,padding:'6px 14px',borderRadius:6,fontSize:12,fontWeight:600,background:'var(--ac)',color:'#fff',border:'none',cursor:'pointer'}}>View full page →</button>
                </div>
                <div style={{padding:'14px 18px'}}>
                  <div style={{marginBottom:14}}>
                    <div style={{fontSize:12,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--t3)',marginBottom:7}}>Key metrics</div>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:5}}>
                      {[{l:'AI Companies',v:String(selected.cos.length),g:true},{l:'Deployed',v:fmt(selected.raised),g:false},{l:'Portfolio cos.',v:String(selected.cos.filter((c:any)=>c.pf).length),g:false},{l:'Tier',v:'Tier '+selected.tier,g:false}].map(m=>(
                        <div key={m.l} style={{background:'var(--bg2)',borderRadius:7,padding:'9px 11px'}}>
                          <div style={{fontFamily:"'DM Mono',monospace",fontSize:18,fontWeight:500,color:m.g?'var(--ac)':'var(--text)'}}>{m.v}</div>
                          <div style={{fontSize:11,textTransform:'uppercase',letterSpacing:'.06em',color:'var(--t3)',marginTop:2}}>{m.l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {selected.focus?.length>0&&(
                    <div style={{marginBottom:14}}>
                      <div style={{fontSize:12,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--t3)',marginBottom:7}}>Focus</div>
                      <div style={{display:'flex',flexWrap:'wrap',gap:5}}>
                        {selected.focus.map((f:string)=><span key={f} style={{padding:'3px 7px',borderRadius:4,fontSize:13,background:'var(--bg3)',border:'1px solid var(--border)',color:'var(--t2)'}}>{f}</span>)}
                      </div>
                    </div>
                  )}
                  {selected.cos.filter((c:any)=>c.pf).length>0&&(
                    <div style={{marginBottom:14}}>
                      <div style={{fontSize:12,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--t3)',marginBottom:7}}>★ Portfolio ({selected.cos.filter((c:any)=>c.pf).length})</div>
                      {selected.cos.filter((c:any)=>c.pf).map((co:any)=>(
                        <div key={co.n} className="fco" onClick={()=>router.push('/company/'+toSlug(co.n))} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 10px',background:'rgba(92,210,162,.04)',border:'1px solid rgba(92,210,162,.15)',borderRadius:6,marginBottom:4,cursor:'pointer',transition:'border-color .15s'}}>
                          <a href={'/company/'+toSlug(co.n)} style={{display:'contents',textDecoration:'none'}}>
                          <div style={{width:22,height:22,borderRadius:5,background:co.sc,display:'flex',alignItems:'center',justifyContent:'center',fontSize:7,fontWeight:700,color:'#fff',flexShrink:0}}>{ini(co.n)}</div>
                          <div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:'var(--text)'}}>{co.n}</div><div style={{fontSize:10,color:'var(--t3)'}}>{co.s}</div></div>
                          <div style={{textAlign:'right'}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:'var(--ac)'}}>{fmt(co.r)}</div><div style={{fontSize:11,color:'var(--t3)'}}>{co.st}</div></div>
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                  {selected.cos.filter((c:any)=>!c.pf).length>0&&(
                    <div>
                      <div style={{fontSize:12,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--t3)',marginBottom:7}}>Co-investments ({selected.cos.filter((c:any)=>!c.pf).length})</div>
                      {selected.cos.filter((c:any)=>!c.pf).map((co:any)=>(
                        <div key={co.n} className="fco" onClick={()=>router.push('/company/'+toSlug(co.n))} style={{display:'flex',alignItems:'center',gap:8,padding:'7px 10px',background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:6,marginBottom:4,cursor:'pointer',transition:'border-color .15s'}}>
                          <div style={{width:22,height:22,borderRadius:5,background:co.sc,display:'flex',alignItems:'center',justifyContent:'center',fontSize:7,fontWeight:700,color:'#fff',flexShrink:0}}>{ini(co.n)}</div>
                          <div style={{flex:1}}><div style={{fontSize:14,fontWeight:600,color:'var(--text)'}}>{co.n}</div><div style={{fontSize:10,color:'var(--t3)'}}>{co.s}</div></div>
                          <div style={{textAlign:'right'}}><div style={{fontFamily:"'DM Mono',monospace",fontSize:13,color:'var(--t2)'}}>{fmt(co.r)}</div><div style={{fontSize:11,color:'var(--t3)'}}>{co.st}</div></div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
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
                  style={{flex:1,background:'transparent',border:'none',outline:'none',fontSize:15,color:'#fff',fontFamily:"'Plus Jakarta Sans',sans-serif"}}
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
                    <div style={{fontSize:10,color:'var(--t3)',background:'var(--bg2)',padding:'2px 7px',borderRadius:4,flexShrink:0}}>{r.type==='fund'?'Fund':'→'}</div>
                  </a>
                ))}
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
