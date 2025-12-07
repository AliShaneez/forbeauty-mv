import { ButtonHTMLAttributes } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' }

export default function Button({ variant = 'primary', className = '', ...props }: Props) {
  const base = 'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variants: Record<string, string> = {
    primary: 'bg-secondary text-white hover:opacity-90 active:opacity-100 focus:ring-accent',
    secondary: 'bg-white text-charcoal border border-primary hover:bg-primary focus:ring-accent',
    ghost: 'bg-transparent text-charcoal hover:bg-primary focus:ring-accent'
  }
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />
}
