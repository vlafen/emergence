'use client'
import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function AuthForm(){
  const router = useRouter()
  const params = useSearchParams()
  const [mode, setMode] = useState<'login'|'signup'>(params.get('mode')==='signup'?'signup':'login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(){
    if(!email.includes('@')){setError('Enter a valid email');return}
    if(password.length<6){setError('Password must be at least 6 characters');return}
    if(mode==='signup'&&!name.trim()){setError('Enter your name');return}
    setError('')
    setDone(true)
    setTimeout(()=>router.push('/dashboard'),1500)
  }

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Plus Jakarta Sans',sans-serif;background:#08080f;color:#fff;min-height:100vh}
        input:focus{outline:none;border-color:#5CD2A2!important}
        .auth-input{width:100%;padding:11px 14px;border-radius:8px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);fontSize:14px;color:#fff;font-family:'Plus Jakarta Sans',sans-serif;transition:border-color .15s}
        .auth-input::placeholder{color:rgba(255,255,255,.3)}
        .submit-btn:hover{opacity:.9}
        .switch-link{color:#5CD2A2;cursor:pointer;text-decoration:underline}
        .social-btn:hover{background:rgba(255,255,255,.08)!important}
      `}</style>
      <div style={{minHeight:'100vh',background:'#08080f',display:'flex',flexDirection:'column',fontFamily:"'Plus Jakarta Sans',sans-serif"}}>

        {/* NAV */}
        <nav style={{height:52,display:'flex',alignItems:'center',padding:'0 32px',borderBottom:'1px solid rgba(255,255,255,.06)'}}>
          <div onClick={()=>router.push('/')} style={{display:'flex',alignItems:'center',gap:7,fontSize:14,fontWeight:700,letterSpacing:'.1em',cursor:'pointer'}}>
            <div style={{width:7,height:7,borderRadius:'50%',background:'#5CD2A2'}}/>
            INTELLIGENCE
          </div>
        </nav>

        {/* FORM */}
        <div style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',padding:'40px 24px'}}>
          <div style={{width:'100%',maxWidth:400}}>

            {done?(
              <div style={{textAlign:'center'}}>
                <div style={{width:56,height:56,borderRadius:'50%',background:'rgba(92,210,162,.1)',border:'1px solid rgba(92,210,162,.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,margin:'0 auto 16px'}}>✓</div>
                <div style={{fontSize:18,fontWeight:700,color:'#fff',marginBottom:8}}>{mode==='signup'?'Account created!':'Welcome back!'}</div>
                <div style={{fontSize:14,color:'rgba(255,255,255,.4)'}}>Redirecting to dashboard…</div>
              </div>
            ):(
              <>
                <div style={{textAlign:'center',marginBottom:32}}>
                  <h1 style={{fontSize:26,fontWeight:700,color:'#fff',marginBottom:8}}>
                    {mode==='login'?'Welcome back':'Create your account'}
                  </h1>
                  <p style={{fontSize:14,color:'rgba(255,255,255,.4)'}}>
                    {mode==='login'?'Sign in to your Intelligence account':'Start tracking AI-native companies today'}
                  </p>
                </div>

                {/* Social buttons */}
                <div style={{display:'flex',flexDirection:'column',gap:8,marginBottom:20}}>
                  <button className="social-btn" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:10,padding:'11px',borderRadius:8,background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.1)',fontSize:14,fontWeight:500,color:'rgba(255,255,255,.8)',cursor:'pointer',transition:'background .15s'}}>
                    <span style={{fontSize:16}}>G</span> Continue with Google
                  </button>
                  <button className="social-btn" style={{display:'flex',alignItems:'center',justifyContent:'center',gap:10,padding:'11px',borderRadius:8,background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.1)',fontSize:14,fontWeight:500,color:'rgba(255,255,255,.8)',cursor:'pointer',transition:'background .15s'}}>
                    <span style={{fontSize:16}}>in</span> Continue with LinkedIn
                  </button>
                </div>

                <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:20}}>
                  <div style={{flex:1,height:1,background:'rgba(255,255,255,.08)'}}/>
                  <span style={{fontSize:12,color:'rgba(255,255,255,.3)'}}>or</span>
                  <div style={{flex:1,height:1,background:'rgba(255,255,255,.08)'}}/>
                </div>

                {/* Form fields */}
                <div style={{display:'flex',flexDirection:'column',gap:12,marginBottom:16}}>
                  {mode==='signup'&&(
                    <input className="auth-input" value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" type="text"
                      style={{width:'100%',padding:'11px 14px',borderRadius:8,background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.1)',fontSize:14,color:'#fff',fontFamily:"'Plus Jakarta Sans',sans-serif"}}/>
                  )}
                  <input className="auth-input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email address" type="email"
                    style={{width:'100%',padding:'11px 14px',borderRadius:8,background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.1)',fontSize:14,color:'#fff',fontFamily:"'Plus Jakarta Sans',sans-serif"}}/>
                  <input className="auth-input" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password"
                    onKeyDown={e=>e.key==='Enter'&&handleSubmit()}
                    style={{width:'100%',padding:'11px 14px',borderRadius:8,background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.1)',fontSize:14,color:'#fff',fontFamily:"'Plus Jakarta Sans',sans-serif"}}/>
                </div>

                {error&&<div style={{padding:'10px 14px',borderRadius:7,background:'rgba(220,38,38,.08)',border:'1px solid rgba(220,38,38,.2)',fontSize:13,color:'#f87171',marginBottom:12}}>{error}</div>}

                <button className="submit-btn" onClick={handleSubmit} style={{width:'100%',padding:'12px',borderRadius:8,fontSize:14,fontWeight:700,background:'#5CD2A2',color:'#08080f',border:'none',cursor:'pointer',transition:'opacity .15s',marginBottom:16}}>
                  {mode==='login'?'Sign in →':'Create account →'}
                </button>

                <div style={{textAlign:'center',fontSize:13,color:'rgba(255,255,255,.4)'}}>
                  {mode==='login'?(
                    <>Don't have an account? <span className="switch-link" onClick={()=>setMode('signup')}>Sign up free</span></>
                  ):(
                    <>Already have an account? <span className="switch-link" onClick={()=>setMode('login')}>Sign in</span></>
                  )}
                </div>

                {mode==='login'&&(
                  <div style={{textAlign:'center',marginTop:10}}>
                    <span style={{fontSize:12,color:'rgba(255,255,255,.3)',cursor:'pointer'}}>Forgot password?</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default function AuthPage(){
  return(
    <Suspense fallback={<div style={{minHeight:'100vh',background:'#08080f'}}/>}>
      <AuthForm/>
    </Suspense>
  )
}
