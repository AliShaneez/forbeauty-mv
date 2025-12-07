import { SelectHTMLAttributes } from 'react'

export default function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`w-full rounded-md border border-primary bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary ${props.className ?? ''}`} />
}
