import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function AuthCallback() {
  const navigate = useNavigate()
  const [status, setStatus] = useState('Connexion...')

  useEffect(() => {
    let timeout: any

    const handle = async () => {
      const hash = window.location.hash
      const query = window.location.search
      const hashParams = new URLSearchParams(hash.substring(1))
      const queryParams = new URLSearchParams(query)

      const accessToken = hashParams.get('access_token')
      const code = queryParams.get('code')
      const errorParam = queryParams.get('error') || hashParams.get('error')

      console.log('[AuthCallback] accessToken:', !!accessToken, 'code:', !!code, 'error:', errorParam)

      if (errorParam) {
        setStatus('Erreur: ' + errorParam)
        timeout = setTimeout(() => navigate('/'), 3000)
        return
      }

      // Implicit flow: token in hash
      if (accessToken) {
        setStatus('Token détecté...')
        const refreshToken = hashParams.get('refresh_token') || ''

        const { data, error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken
        })

        console.log('setSession result:', data, error)

        if (!error && data.session) {
          navigate('/compte', { replace: true })
          return
        }

        // If setSession fails, try getSession
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          navigate('/compte', { replace: true })
          return
        }

        // Last resort - wait for auth state
        setStatus('Récupération session...')
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, session) => {
            console.log('Auth event:', event, !!session)
            if (event === 'SIGNED_IN' && session) {
              subscription.unsubscribe()
              navigate('/compte', { replace: true })
            }
          }
        )

        timeout = setTimeout(() => {
          subscription.unsubscribe()
          navigate('/')
        }, 5000)
        return
      }

      // PKCE flow: code in query
      if (code) {
        setStatus('Échange du code...')
        const { data, error } = await supabase.auth.exchangeCodeForSession(code)
        console.log('[AuthCallback] PKCE result:', { session: !!data?.session, error })

        if (!error && data?.session) {
          navigate('/compte', { replace: true })
          return
        }
      }

      // No token/code: check existing session (detectSessionInUrl may have handled it)
      setStatus('Vérification session...')
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        navigate('/compte', { replace: true })
        return
      }

      // Final fallback
      setStatus('Attente...')
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          if (session) {
            subscription.unsubscribe()
            navigate('/compte', { replace: true })
          }
        }
      )

      timeout = setTimeout(() => {
        subscription.unsubscribe()
        navigate('/')
      }, 5000)
    }

    handle()
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      gap: '16px',
      fontFamily: 'sans-serif'
    }}>
      <div style={{
        width: '32px', height: '32px',
        border: '3px solid #d1fae5',
        borderTop: '3px solid #16a34a',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <p style={{ color: '#6b7280', fontSize: '13px', maxWidth: '300px', textAlign: 'center' }}>
        {status}
      </p>
    </div>
  )
}
