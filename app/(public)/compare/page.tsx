'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

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

function fmt(n:number){if(!n)return'—';if(n>=1000)return`$${(n/1000).toFixed(1)}B`;return`$${n}M`}
function ini(n:string){return n.split(' ').map((w:string)=>w[0]).join('').slice(0,2).toUpperCase()}
function toSlug(n:string){return n.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}

function ComparePage(){
  const router = useRouter()
  const params = useSearchParams()
  const slugs = (params.get('cos')||'').split(',').filter(Boolean)
  const companies = slugs.map(sl=>D.find(c=>toSlug(c.n)===sl)).filter(Boolean) as typeof D

  if(companies.length<2){
    return(
      <div style={{minHeight:'100vh',background:'#08080f',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:12,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
        <div style={{fontSize:28,opacity:.3}}>⚖</div>
        <div style={{fontSize:14,fontWeight:600,color:'rgba(255,255,255,.7)'}}>Select 2–3 companies to compare</div>
        <button onClick={()=>router.push('/dashboard')} style={{marginTop:8,padding:'8px 20px',borderRadius:7,fontSize:13,fontWeight:600,background:'#5CD2A2',color:'#fff',border:'none',cursor:'pointer'}}>← Back to Dashboard</button>
      </div>
    )
  }

  // Find best value for each metric
  const maxR = Math.max(...companies.map(c=>c.r))
  const maxV = Math.max(...companies.map(c=>c.v))
  const maxE = Math.max(...companies.map(c=>c.e))
  const minY = Math.min(...companies.map(c=>c.y))

  const METRICS = [
    {label:'Raised',key:'r',fmt:(v:number)=>fmt(v),best:(v:number)=>v===maxR},
    {label:'Valuation',key:'v',fmt:(v:number)=>fmt(v),best:(v:number)=>v===maxV},
    {label:'Employees',key:'e',fmt:(v:number)=>String(v),best:(v:number)=>v===maxE},
    {label:'Founded',key:'y',fmt:(v:number)=>String(v),best:(v:number)=>v===minY},
  ]

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Plus Jakarta Sans',sans-serif;background:#08080f;color:#fff;min-height:100vh}
        .co-card:hover{border-color:rgba(255,255,255,.14)!important}
      `}</style>
      <div style={{minHeight:'100vh',background:'#08080f',color:'#fff',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>

        {/* NAV */}
        <nav style={{height:48,display:'flex',alignItems:'center',padding:'0 24px',borderBottom:'1px solid rgba(255,255,255,.07)',background:'#08080f',position:'sticky',top:0,zIndex:10}}>
          <div style={{display:'flex',alignItems:'center',gap:7,fontSize:14,fontWeight:700,letterSpacing:'.1em'}}>
            <div style={{width:7,height:7,borderRadius:'50%',background:'#5CD2A2'}}/>
            INTELLIGENCE
          </div>
          <button onClick={()=>router.push('/dashboard')} style={{marginLeft:20,display:'flex',alignItems:'center',gap:6,padding:'5px 12px',borderRadius:6,fontSize:13,color:'rgba(255,255,255,.5)',background:'transparent',border:'1px solid rgba(255,255,255,.07)',cursor:'pointer'}}>
            ← Dashboard
          </button>
          <div style={{marginLeft:16,fontSize:13,color:'rgba(255,255,255,.3)'}}>
            Comparing {companies.length} companies
          </div>
        </nav>

        <div style={{maxWidth:1000,margin:'0 auto',padding:'40px 24px'}}>

          {/* COMPANY HEADERS */}
          <div style={{display:'grid',gridTemplateColumns:`200px repeat(${companies.length},1fr)`,gap:12,marginBottom:32}}>
            <div/>
            {companies.map(co=>(
              <div key={co.n} className="co-card" onClick={()=>router.push('/company/'+toSlug(co.n))}
                style={{background:'#0d0d1a',border:'1px solid rgba(255,255,255,.07)',borderRadius:12,padding:'16px',cursor:'pointer',transition:'border-color .15s',textAlign:'center'}}>
                <div style={{width:44,height:44,borderRadius:11,background:co.sc,display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,fontWeight:700,color:'#fff',margin:'0 auto 10px'}}>{ini(co.n)}</div>
                <div style={{fontSize:15,fontWeight:700,color:'#fff',marginBottom:3}}>{co.n}</div>
                <div style={{fontSize:12,color:'rgba(255,255,255,.4)',marginBottom:8}}>{co.s}</div>
                <div style={{display:'flex',gap:4,justifyContent:'center',flexWrap:'wrap'}}>
                  <span style={{padding:'2px 7px',borderRadius:4,fontSize:11,fontWeight:600,background:'rgba(111,163,239,.08)',color:'#6FA3EF',border:'1px solid rgba(111,163,239,.2)'}}>{co.st}</span>
                  {co.pf&&<span style={{padding:'2px 7px',borderRadius:4,fontSize:11,fontWeight:600,background:'rgba(92,210,162,.08)',color:'#5CD2A2',border:'1px solid rgba(92,210,162,.2)'}}>★ Portfolio</span>}
                </div>
              </div>
            ))}
          </div>

          {/* METRICS */}
          <div style={{background:'#0d0d1a',border:'1px solid rgba(255,255,255,.07)',borderRadius:12,overflow:'hidden',marginBottom:24}}>
            <div style={{padding:'12px 20px',borderBottom:'1px solid rgba(255,255,255,.07)',fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'rgba(255,255,255,.3)'}}>Key Metrics</div>
            {METRICS.map((m,mi)=>(
              <div key={m.label} style={{display:'grid',gridTemplateColumns:`200px repeat(${companies.length},1fr)`,gap:12,padding:'14px 20px',borderBottom:mi<METRICS.length-1?'1px solid rgba(255,255,255,.05)':'none',alignItems:'center'}}>
                <div style={{fontSize:13,color:'rgba(255,255,255,.4)',fontWeight:500}}>{m.label}</div>
                {companies.map(co=>{
                  const val = co[m.key as keyof typeof co] as number
                  const isBest = m.best(val)
                  return(
                    <div key={co.n} style={{textAlign:'center'}}>
                      <div style={{fontFamily:"'DM Mono',monospace",fontSize:20,fontWeight:500,color:isBest?'#5CD2A2':'rgba(255,255,255,.8)'}}>{m.fmt(val)}</div>
                      {isBest&&<div style={{fontSize:10,color:'#5CD2A2',marginTop:2,letterSpacing:'.05em'}}>▲ highest</div>}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>

          {/* SECTOR & STAGE */}
          <div style={{background:'#0d0d1a',border:'1px solid rgba(255,255,255,.07)',borderRadius:12,overflow:'hidden',marginBottom:24}}>
            <div style={{padding:'12px 20px',borderBottom:'1px solid rgba(255,255,255,.07)',fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'rgba(255,255,255,.3)'}}>Classification</div>
            {[{label:'Sector',render:(co:typeof D[0])=><span style={{display:'inline-flex',alignItems:'center',gap:5,fontSize:13,color:'rgba(255,255,255,.7)'}}><span style={{width:6,height:6,borderRadius:'50%',background:co.sc,display:'inline-block'}}/>{co.sec}</span>},
              {label:'Stage',render:(co:typeof D[0])=><span style={{padding:'3px 8px',borderRadius:5,fontSize:12,fontWeight:600,background:'rgba(111,163,239,.08)',color:'#6FA3EF',border:'1px solid rgba(111,163,239,.2)'}}>{co.st}</span>},
            ].map((row,ri)=>(
              <div key={row.label} style={{display:'grid',gridTemplateColumns:`200px repeat(${companies.length},1fr)`,gap:12,padding:'14px 20px',borderBottom:ri===0?'1px solid rgba(255,255,255,.05)':'none',alignItems:'center'}}>
                <div style={{fontSize:13,color:'rgba(255,255,255,.4)',fontWeight:500}}>{row.label}</div>
                {companies.map(co=>(
                  <div key={co.n} style={{textAlign:'center'}}>{row.render(co)}</div>
                ))}
              </div>
            ))}
          </div>

          {/* INVESTORS */}
          <div style={{background:'#0d0d1a',border:'1px solid rgba(255,255,255,.07)',borderRadius:12,overflow:'hidden',marginBottom:24}}>
            <div style={{padding:'12px 20px',borderBottom:'1px solid rgba(255,255,255,.07)',fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'rgba(255,255,255,.3)'}}>Investors</div>
            <div style={{display:'grid',gridTemplateColumns:`200px repeat(${companies.length},1fr)`,gap:12,padding:'14px 20px',alignItems:'start'}}>
              <div style={{fontSize:13,color:'rgba(255,255,255,.4)',fontWeight:500,paddingTop:4}}>Backers</div>
              {companies.map(co=>(
                <div key={co.n} style={{display:'flex',flexDirection:'column',gap:4}}>
                  {co.inv.map(inv=>{
                    const sharedWith = companies.filter(c=>c.n!==co.n&&c.inv.includes(inv))
                    return(
                      <div key={inv} style={{display:'flex',alignItems:'center',gap:6,padding:'4px 8px',borderRadius:5,background:sharedWith.length>0?'rgba(92,210,162,.06)':'rgba(255,255,255,.03)',border:`1px solid ${sharedWith.length>0?'rgba(92,210,162,.2)':'rgba(255,255,255,.06)'}`,fontSize:12,color:sharedWith.length>0?'#5CD2A2':'rgba(255,255,255,.6)'}}>
                        {inv}
                        {sharedWith.length>0&&<span style={{fontSize:10,opacity:.7}}>shared</span>}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* BAR CHART — Raised */}
          <div style={{background:'#0d0d1a',border:'1px solid rgba(255,255,255,.07)',borderRadius:12,overflow:'hidden'}}>
            <div style={{padding:'12px 20px',borderBottom:'1px solid rgba(255,255,255,.07)',fontSize:11,fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase',color:'rgba(255,255,255,.3)'}}>Raised comparison</div>
            <div style={{padding:'20px 24px',display:'flex',flexDirection:'column',gap:12}}>
              {companies.map(co=>(
                <div key={co.n} style={{display:'flex',alignItems:'center',gap:12}}>
                  <div style={{width:120,fontSize:13,fontWeight:600,color:'rgba(255,255,255,.7)',flexShrink:0}}>{co.n.split(' ')[0]}</div>
                  <div style={{flex:1,background:'rgba(255,255,255,.05)',borderRadius:4,height:24,overflow:'hidden'}}>
                    <div style={{width:`${(co.r/maxR)*100}%`,height:'100%',background:co.r===maxR?'#5CD2A2':co.sc,borderRadius:4,transition:'width .5s',display:'flex',alignItems:'center',paddingLeft:8}}>
                      <span style={{fontSize:11,fontWeight:600,color:'#fff',whiteSpace:'nowrap'}}>{fmt(co.r)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default function ComparePageWrapper(){
  return(
    <Suspense fallback={<div style={{minHeight:'100vh',background:'#08080f'}}/>}>
      <ComparePage/>
    </Suspense>
  )
}
