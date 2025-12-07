import { InputHTMLAttributes } from 'react'

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`w-full rounded-md border border-primary bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary ${props.className ?? ''}`} />
}
