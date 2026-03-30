'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const SECTORS = [
  {n:'Health AI',c:'#16a34a',bg:'rgba(22,163,74,.08)',companies:['Formation Bio','Prosper','Scale Medicine','Outbound AI'],desc:'Drug discovery, RCM, precision medicine, voice AI for healthcare'},
  {n:'Legal AI',c:'#7c3aed',bg:'rgba(124,58,237,.08)',companies:['EvenUp','Crosby','Irving','Norm AI'],desc:'Personal injury, contract lifecycle, M&A diligence, compliance'},
  {n:'Financial AI',c:'#2563eb',bg:'rgba(37,99,235,.08)',companies:['Harper','Rivet','Docshield'],desc:'Commercial insurance, accounting automation, document processing'},
  {n:'Software Impl.',c:'#d97706',bg:'rgba(217,119,6,.08)',companies:['Mechanical Orchard','Tessera','Rubie'],desc:'Legacy modernization, API integration, QA automation'},
  {n:'Security AI',c:'#dc2626',bg:'rgba(220,38,38,.08)',companies:['XBOW','RunSybil'],desc:'Autonomous pentesting, AI red teaming, vulnerability detection'},
  {n:'GTM AI',c:'#0891b2',bg:'rgba(8,145,178,.08)',companies:['AirOps','Evidenza'],desc:'Go-to-market automation, market research, sales intelligence'},
]

const ROUNDS = [
  {co:'Formation Bio',ticker:'FB',color:'#16a34a',round:'Series C',date:'Mar 2026',raised:'$248M',sec:'Health AI',inv:['a16z Bio','Sequoia']},
  {co:'EvenUp',ticker:'EU',color:'#7c3aed',round:'Series C',date:'Feb 2026',raised:'$135M',sec:'Legal AI',inv:['SignalFire','Bessemer']},
  {co:'Harper',ticker:'H',color:'#2563eb',round:'Series B',date:'Feb 2026',raised:'$110M',sec:'Financial AI',inv:['Emergence Capital','Ribbit Capital']},
  {co:'Crosby',ticker:'CR',color:'#7c3aed',round:'Series B',date:'Jan 2026',raised:'$95M',sec:'Legal AI',inv:['Emergence Capital','Tiger Global']},
  {co:'Scale Medicine',ticker:'SM',color:'#16a34a',round:'Series B',date:'Jan 2026',raised:'$89M',sec:'Health AI',inv:['Emergence Capital','Flagship']},
]

const STATS = [
  {v:'20+',l:'AI-Native Companies'},
  {v:'$1.4B',l:'Total Capital Raised'},
  {v:'8',l:'Service Sectors'},
  {v:'27',l:'Top Investors Tracked'},
]

const LOGOS = ['Emergence Capital','a16z','Sequoia','Bessemer','Google Ventures','Tiger Global','Salesforce Ventures','Index Ventures']

function toSlug(n:string){return n.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}

export default function LandingPage(){
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(){
    if(!email.includes('@')) return
    setSubmitted(true)
    setEmail('')
  }

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Plus Jakarta Sans',sans-serif;background:#08080f;color:#fff;overflow-y:auto}
        .nav-tab:hover{color:rgba(255,255,255,.7)!important}
        .sec-card:hover{border-color:rgba(255,255,255,.14)!important;transform:translateY(-1px)}
        .row:hover td{background:rgba(255,255,255,.03)}
        .inv-tag:hover{border-color:rgba(255,255,255,.2)!important;color:#fff!important}
        .cta-btn:hover{opacity:.9}
        .ghost-btn:hover{background:rgba(255,255,255,.08)!important}
        input:focus{outline:none;border-color:#5CD2A2!important}
      `}</style>

      <div style={{minHeight:'100vh',background:'#08080f',color:'#fff',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>

        {/* NAV */}
        <nav style={{height:52,display:'flex',alignItems:'center',padding:'0 32px',borderBottom:'1px solid rgba(255,255,255,.06)',background:'rgba(8,8,15,.95)',position:'sticky',top:0,zIndex:100,backdropFilter:'blur(12px)'}}>
          <div style={{display:'flex',alignItems:'center',gap:8,fontSize:14,fontWeight:700,letterSpacing:'.1em'}}>
            <div style={{width:7,height:7,borderRadius:'50%',background:'#5CD2A2'}}/>
            INTELLIGENCE
          </div>
          <div style={{display:'flex',marginLeft:28,gap:2}}>
            {[['Dashboard','/dashboard'],['Funds','/funds']].map(([t,href])=>(
              <div key={t} className="nav-tab" onClick={()=>router.push(href)} style={{padding:'0 14px',height:52,display:'flex',alignItems:'center',fontSize:13,fontWeight:500,color:'rgba(255,255,255,.4)',cursor:'pointer',transition:'color .15s'}}>{t}</div>
            ))}
          </div>
          <div style={{display:'flex',alignItems:'center',gap:8,marginLeft:'auto'}}>
            <button className="ghost-btn" style={{padding:'7px 18px',border:'1px solid rgba(255,255,255,.1)',borderRadius:7,fontSize:13,fontWeight:500,color:'rgba(255,255,255,.6)',background:'transparent',cursor:'pointer',transition:'background .15s'}}>Log in</button>
            <button className="cta-btn" onClick={()=>router.push('/dashboard')} style={{padding:'7px 18px',borderRadius:7,fontSize:13,fontWeight:600,background:'#5CD2A2',color:'#08080f',border:'none',cursor:'pointer',transition:'opacity .15s'}}>Get access →</button>
          </div>
        </nav>

        {/* HERO */}
        <div style={{maxWidth:820,margin:'0 auto',padding:'96px 32px 72px',textAlign:'center'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:6,padding:'5px 14px',borderRadius:20,background:'rgba(92,210,162,.08)',border:'1px solid rgba(92,210,162,.2)',fontSize:12,fontWeight:600,color:'#5CD2A2',marginBottom:28,letterSpacing:'.04em'}}>
            AI-NATIVE SERVICES INTELLIGENCE
          </div>
          <h1 style={{fontSize:58,fontWeight:800,lineHeight:1.05,letterSpacing:'-.025em',marginBottom:22,color:'#fff'}}>
            The market intelligence<br/>
            platform for <span style={{color:'#5CD2A2'}}>AI-native<br/>service companies</span>
          </h1>
          <p style={{fontSize:17,color:'rgba(255,255,255,.5)',lineHeight:1.7,maxWidth:520,margin:'0 auto 40px',fontWeight:400}}>
            Track funding, investors, and competitive landscape across Health, Legal, Financial, and Software AI companies replacing traditional professional services.
          </p>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:10}}>
            <button className="cta-btn" onClick={()=>router.push('/dashboard')} style={{padding:'13px 28px',borderRadius:9,fontSize:14,fontWeight:700,background:'#5CD2A2',color:'#08080f',border:'none',cursor:'pointer',transition:'opacity .15s'}}>
              Explore the platform →
            </button>
            <button className="ghost-btn" onClick={()=>router.push('/funds')} style={{padding:'13px 28px',borderRadius:9,fontSize:14,fontWeight:600,background:'rgba(255,255,255,.05)',color:'rgba(255,255,255,.7)',border:'1px solid rgba(255,255,255,.1)',cursor:'pointer',transition:'background .15s'}}>
              View investors
            </button>
          </div>
        </div>

        {/* SOCIAL PROOF — STATS */}
        <div style={{maxWidth:900,margin:'0 auto 80px',padding:'0 32px'}}>
          <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:1,background:'rgba(255,255,255,.06)',borderRadius:14,overflow:'hidden',border:'1px solid rgba(255,255,255,.06)'}}>
            {STATS.map(s=>(
              <div key={s.l} style={{background:'#0d0d1a',padding:'28px 24px',textAlign:'center'}}>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:32,fontWeight:500,color:'#5CD2A2',marginBottom:6}}>{s.v}</div>
                <div style={{fontSize:12,color:'rgba(255,255,255,.35)',textTransform:'uppercase',letterSpacing:'.07em'}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* INVESTOR LOGOS */}
        <div style={{maxWidth:900,margin:'0 auto 96px',padding:'0 32px',textAlign:'center'}}>
          <div style={{fontSize:11,fontWeight:600,letterSpacing:'.1em',textTransform:'uppercase',color:'rgba(255,255,255,.25)',marginBottom:24}}>Backed by the world's top investors</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:8,justifyContent:'center'}}>
            {LOGOS.map(l=>(
              <div key={l} style={{padding:'6px 14px',borderRadius:8,background:'#0d0d1a',border:'1px solid rgba(255,255,255,.07)',fontSize:12,fontWeight:500,color:'rgba(255,255,255,.4)'}}>
                {l}
              </div>
            ))}
          </div>
        </div>

        {/* SECTORS */}
        <div style={{maxWidth:1100,margin:'0 auto 96px',padding:'0 32px'}}>
          <div style={{textAlign:'center',marginBottom:48}}>
            <div style={{fontSize:11,fontWeight:600,letterSpacing:'.1em',textTransform:'uppercase',color:'rgba(255,255,255,.3)',marginBottom:14}}>Coverage</div>
            <h2 style={{fontSize:34,fontWeight:700,letterSpacing:'-.02em',marginBottom:12}}>6 service sectors tracked</h2>
            <p style={{fontSize:15,color:'rgba(255,255,255,.4)',maxWidth:480,margin:'0 auto'}}>From legal tech to healthcare AI — every major professional service being disrupted by AI-native companies.</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:8}}>
            {SECTORS.map(s=>(
              <div key={s.n} className="sec-card" onClick={()=>router.push('/dashboard')} style={{background:'#0d0d1a',border:'1px solid rgba(255,255,255,.07)',borderRadius:12,padding:'20px',cursor:'pointer',transition:'all .2s'}}>
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:12}}>
                  <div style={{width:8,height:8,borderRadius:'50%',background:s.c,flexShrink:0}}/>
                  <div style={{fontSize:14,fontWeight:700,color:'#fff'}}>{s.n}</div>
                  <div style={{marginLeft:'auto',fontFamily:"'DM Mono',monospace",fontSize:12,color:'rgba(255,255,255,.3)'}}>{s.companies.length}</div>
                </div>
                <div style={{fontSize:12,color:'rgba(255,255,255,.35)',lineHeight:1.6,marginBottom:14}}>{s.desc}</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
                  {s.companies.slice(0,3).map(c=>(
                    <span key={c} style={{padding:'2px 8px',borderRadius:4,fontSize:11,background:s.bg,color:s.c,border:`1px solid ${s.c}30`,fontWeight:500}}>{c.split(' ')[0]}</span>
                  ))}
                  {s.companies.length>3&&<span style={{padding:'2px 8px',borderRadius:4,fontSize:11,background:'rgba(255,255,255,.04)',color:'rgba(255,255,255,.3)',border:'1px solid rgba(255,255,255,.07)'}}>+{s.companies.length-3}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT FUNDRAISING */}
        <div style={{maxWidth:1000,margin:'0 auto 96px',padding:'0 32px'}}>
          <div style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:24}}>
            <div>
              <div style={{fontSize:11,fontWeight:600,letterSpacing:'.1em',textTransform:'uppercase',color:'rgba(255,255,255,.3)',marginBottom:10}}>Latest rounds</div>
              <h2 style={{fontSize:28,fontWeight:700,letterSpacing:'-.02em'}}>Recent fundraising events</h2>
            </div>
            <button onClick={()=>router.push('/dashboard')} style={{padding:'8px 18px',borderRadius:7,fontSize:13,fontWeight:600,background:'rgba(92,210,162,.08)',color:'#5CD2A2',border:'1px solid rgba(92,210,162,.2)',cursor:'pointer',whiteSpace:'nowrap'}}>
              View all →
            </button>
          </div>
          <div style={{background:'#0d0d1a',border:'1px solid rgba(255,255,255,.07)',borderRadius:14,overflow:'hidden'}}>
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <thead style={{background:'#111124'}}>
                <tr style={{borderBottom:'1px solid rgba(255,255,255,.06)'}}>
                  {['#','Company','Round','Date','Raised','Sector','Investors'].map(h=>(
                    <th key={h} style={{padding:'11px 18px',textAlign:'left',fontSize:11,fontWeight:700,letterSpacing:'.07em',textTransform:'uppercase',color:'rgba(255,255,255,.25)',whiteSpace:'nowrap'}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROUNDS.map((r,i)=>(
                  <tr key={r.co} className="row" onClick={()=>router.push('/company/'+toSlug(r.co))} style={{borderBottom:'1px solid rgba(255,255,255,.04)',cursor:'pointer',transition:'background .1s'}}>
                    <td style={{padding:'15px 18px',fontSize:13,color:'rgba(255,255,255,.25)',fontFamily:"'DM Mono',monospace",width:40}}>{String(i+1).padStart(2,'0')}</td>
                    <td style={{padding:'15px 18px'}}>
                      <div style={{display:'flex',alignItems:'center',gap:10}}>
                        <div style={{width:34,height:34,borderRadius:9,background:r.color,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,color:'#fff',flexShrink:0}}>{r.ticker}</div>
                        <div style={{fontSize:14,fontWeight:600,color:'#fff'}}>{r.co}</div>
                      </div>
                    </td>
                    <td style={{padding:'15px 18px'}}>
                      <span style={{padding:'3px 8px',borderRadius:5,fontSize:12,fontWeight:600,background:'rgba(111,163,239,.08)',color:'#6FA3EF',border:'1px solid rgba(111,163,239,.2)'}}>{r.round}</span>
                    </td>
                    <td style={{padding:'15px 18px',fontSize:13,color:'rgba(255,255,255,.35)',fontFamily:"'DM Mono',monospace"}}>{r.date}</td>
                    <td style={{padding:'15px 18px',fontSize:15,fontFamily:"'DM Mono',monospace",color:'#5CD2A2',fontWeight:600}}>{r.raised}</td>
                    <td style={{padding:'15px 18px',fontSize:12,color:'rgba(255,255,255,.5)'}}>{r.sec}</td>
                    <td style={{padding:'15px 18px'}}>
                      <div style={{display:'flex',gap:4}}>
                        {r.inv.map(inv=>(
                          <span key={inv} className="inv-tag" onClick={e=>{e.stopPropagation();router.push('/fund/'+toSlug(inv))}}
                            style={{padding:'2px 8px',borderRadius:4,fontSize:11,background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.08)',color:'rgba(255,255,255,.4)',cursor:'pointer',transition:'all .12s',whiteSpace:'nowrap'}}>{inv}</span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* EMAIL CTA */}
        <div style={{maxWidth:600,margin:'0 auto 96px',padding:'0 32px',textAlign:'center'}}>
          <div style={{background:'#0d0d1a',border:'1px solid rgba(255,255,255,.07)',borderRadius:16,padding:'48px 40px'}}>
            <div style={{fontSize:11,fontWeight:600,letterSpacing:'.1em',textTransform:'uppercase',color:'rgba(255,255,255,.3)',marginBottom:14}}>Newsletter</div>
            <h2 style={{fontSize:26,fontWeight:700,marginBottom:10,letterSpacing:'-.01em'}}>Stay ahead of AI-native services</h2>
            <p style={{fontSize:14,color:'rgba(255,255,255,.4)',lineHeight:1.6,marginBottom:28}}>Weekly digest of new fundraising rounds, investor moves, and market shifts across all 6 sectors.</p>
            {submitted?(
              <div style={{padding:'12px 24px',borderRadius:8,background:'rgba(92,210,162,.08)',border:'1px solid rgba(92,210,162,.2)',fontSize:14,color:'#5CD2A2',fontWeight:500}}>
                ✓ You're on the list! We'll send the first digest soon.
              </div>
            ):(
              <div style={{display:'flex',gap:8}}>
                <input value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleSubmit()}
                  placeholder="your@email.com" type="email"
                  style={{flex:1,padding:'11px 16px',borderRadius:8,background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.1)',fontSize:14,color:'#fff',fontFamily:"'Plus Jakarta Sans',sans-serif",transition:'border-color .15s'}}/>
                <button className="cta-btn" onClick={handleSubmit} style={{padding:'11px 22px',borderRadius:8,fontSize:14,fontWeight:600,background:'#5CD2A2',color:'#08080f',border:'none',cursor:'pointer',whiteSpace:'nowrap',transition:'opacity .15s'}}>
                  Subscribe →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div style={{borderTop:'1px solid rgba(255,255,255,.06)',padding:'28px 32px',display:'flex',alignItems:'center',justifyContent:'space-between',maxWidth:1100,margin:'0 auto'}}>
          <div style={{display:'flex',alignItems:'center',gap:7,fontSize:13,fontWeight:700,letterSpacing:'.1em',color:'rgba(255,255,255,.5)'}}>
            <div style={{width:6,height:6,borderRadius:'50%',background:'#5CD2A2'}}/>
            INTELLIGENCE
          </div>
          <div style={{fontSize:12,color:'rgba(255,255,255,.2)'}}>AI-Native Services Market Intelligence Platform</div>
          <div style={{display:'flex',gap:16}}>
            {[['Dashboard','/dashboard'],['Funds','/funds'],['Watchlist','/watchlist']].map(([t,href])=>(
              <div key={t} onClick={()=>router.push(href)} style={{fontSize:12,color:'rgba(255,255,255,.3)',cursor:'pointer'}}>{t}</div>
            ))}
          </div>
        </div>

      </div>
    </>
  )
}
