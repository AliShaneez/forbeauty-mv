import { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' }

export default function Button({ variant = 'primary', className = '', ...props }: Props) {
  const base = 'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variants: Record<string, string> = {
    primary: 'bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 focus:ring-brand-400',
    secondary: 'bg-white text-brand-700 border border-brand-200 hover:bg-brand-50 focus:ring-brand-300',
    ghost: 'bg-transparent text-brand-700 hover:bg-brand-50 focus:ring-brand-300'
  }
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />
}
