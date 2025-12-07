import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type AdminContextType = {
  authenticated: boolean
  signIn: (password: string) => boolean
  signOut: () => void
  hasPassword: boolean
  setPassword: (password: string) => void
}

const AdminContext = createContext<AdminContextType | null>(null)

const PWD_KEY = 'forbeauty.admin.pwd_hash'

function sha256(str: string) {
  const encoder = new TextEncoder()
  const data = encoder.encode(str)
  return crypto.subtle.digest('SHA-256', data).then(buf => {
    const hashArray = Array.from(new Uint8Array(buf))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    return hashHex
  })
}

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false)
  const [pwdHash, setPwdHash] = useState<string | null>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(PWD_KEY)
      if (stored) setPwdHash(stored)
    } catch {}
  }, [])

  const signIn = (password: string) => {
    if (!pwdHash) return false
    return sha256(password).then(h => {
      const ok = h === pwdHash
      if (ok) setAuthenticated(true)
      return ok
    }) as unknown as boolean
  }

  const signOut = () => setAuthenticated(false)

  const setPassword = (password: string) => {
    sha256(password).then(h => {
      try {
        localStorage.setItem(PWD_KEY, h)
        setPwdHash(h)
        setAuthenticated(true)
      } catch {}
    })
  }

  const hasPassword = !!pwdHash

  return (
    <AdminContext.Provider value={{ authenticated, signIn, signOut, hasPassword, setPassword }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('AdminContext not found')
  return ctx
}

export function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { authenticated } = useAdmin()
  const navigate = useNavigate()
  useEffect(() => {
    if (!authenticated) navigate('/admin/login', { replace: true })
  }, [authenticated, navigate])
  return authenticated ? <>{children}</> : null
}
