import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function AuthCallback() {
  const navigate = useNavigate()
  const [status, setStatus] = useState('Connexion...')

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    let subscription: { unsubscribe: () => void } | null = null

    const handle = async () => {
      try {
        const hash = new URLSearchParams(window.location.hash.substring(1))
        const query = new URLSearchParams(window.location.search)
        const accessToken = hash.get('access_token')
        const refreshToken = hash.get('refresh_token') || ''
        const code = query.get('code')
        const errorParam = query.get('error') || hash.get('error')

        if (errorParam) {
          setStatus('Erreur: ' + errorParam)
          timeout = setTimeout(() => navigate('/'), 3000)
          return
        }

        if (accessToken) {
          setStatus('Connexion établie...')
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken
          })
          if (!error) {
            navigate('/compte', { replace: true })
            return
          }
        }

        if (code) {
          setStatus('Vérification...')
          const { error } = await supabase.auth.exchangeCodeForSession(code)
          if (!error) {
            navigate('/compte', { replace: true })
            return
          }
        }

        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          navigate('/compte', { replace: true })
          return
        }

        setStatus('En attente...')
        const { data } = supabase.auth.onAuthStateChange((event, session) => {
          if (event === 'SIGNED_IN' && session) {
            data.subscription.unsubscribe()
            navigate('/compte', { replace: true })
          }
        })
        subscription = data.subscription

        timeout = setTimeout(() => {
          subscription?.unsubscribe()
          navigate('/')
        }, 5000)
      } catch (err) {
        console.error('Auth callback error:', err)
        navigate('/')
      }
    }

    handle()

    return () => {
      clearTimeout(timeout)
      subscription?.unsubscribe()
    }
  }, [])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      gap: '16px',
      background: '#faf9f6'
    }}>
      <div style={{
        width: '36px',
        height: '36px',
        border: '3px solid #d1fae5',
        borderTop: '3px solid #15803d',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      <p style={{
        color: '#6b7280',
        fontSize: '14px',
        fontFamily: 'inherit'
      }}>
        {status}
      </p>
    </div>
  )
}
