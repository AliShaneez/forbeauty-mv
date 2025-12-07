import { useState } from 'react'
import Input from '@components/Input'
import Button from '@components/Button'
import { useAdmin } from '@context/AdminContext'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const { hasPassword, signIn, setPassword } = useAdmin()
  const [password, setPasswordInput] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!hasPassword) {
      if (!password || password.length < 8) { setError('Use at least 8 characters'); return }
      if (password !== confirm) { setError('Passwords do not match'); return }
      setPassword(password)
      navigate('/admin', { replace: true })
      return
    }
    const ok = await (signIn(password) as unknown as Promise<boolean>)
    if (ok) {
      navigate('/admin', { replace: true })
    } else {
      setError('Incorrect password')
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 container-max">
      <div className="mx-auto max-w-md rounded-lg border border-brand-100 bg-white p-6">
        <h1 className="text-xl font-semibold mb-4">{hasPassword ? 'Admin Login' : 'Set Admin Password'}</h1>
        <form onSubmit={onSubmit} className="space-y-3">
          <Input type="password" placeholder="Password" value={password} onChange={e => setPasswordInput(e.target.value)} />
          {!hasPassword && (
            <Input type="password" placeholder="Confirm Password" value={confirm} onChange={e => setConfirm(e.target.value)} />
          )}
          {error && <div className="text-sm text-red-600">{error}</div>}
          <Button type="submit" className="w-full">{hasPassword ? 'Login' : 'Set Password'}</Button>
        </form>
      </div>
    </div>
  )
}
