import { useState } from 'react'
import { site } from '../../data/site'
import { Button } from '../ui/Button'

type Status = 'idle' | 'submitting' | 'success' | 'error'
type Fields = { name: string; email: string; company: string; message: string }
type Errors = Partial<Record<keyof Fields, string>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const emptyFields: Fields = { name: '', email: '', company: '', message: '' }

function validate(fields: Fields): Errors {
  const errors: Errors = {}
  if (!fields.name.trim()) errors.name = 'Please enter your name.'
  if (!fields.email.trim()) errors.email = 'Please enter your email.'
  else if (!emailPattern.test(fields.email)) errors.email = 'Please enter a valid email.'
  if (fields.message.trim().length < 10) errors.message = 'Tell us a little more (10+ characters).'
  return errors
}

/* Same delivery logic — Formspree endpoint when configured, demo mode until then. */
export function ContactForm() {
  const [fields, setFields] = useState<Fields>(emptyFields)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [serverError, setServerError] = useState('')

  const update = (key: keyof Fields) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((prev) => ({ ...prev, [key]: event.target.value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    const nextErrors = validate(fields)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('submitting')
    setServerError('')

    try {
      if (!site.formEndpoint) {
        // Demo mode: no endpoint configured yet (see src/data/site.ts).
        await new Promise((resolve) => setTimeout(resolve, 800))
        setStatus('success')
        setFields(emptyFields)
        return
      }

      const response = await fetch(site.formEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })

      if (!response.ok) throw new Error('Request failed')
      setStatus('success')
      setFields(emptyFields)
    } catch {
      setStatus('error')
      setServerError('Something went wrong. Please email us directly instead.')
    }
  }

  if (status === 'success') {
    return (
      <div className="channel flex flex-col items-center justify-center p-10 text-center">
        <span className="grid size-14 place-items-center border border-border-strong bg-surface text-brand">
          <svg className="size-7" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 13l4 4L20 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3 className="mt-5 text-xl normal-case">Message sent</h3>
        <p className="mt-2 max-w-xs text-sm leading-7 text-muted">
          Thanks for reaching out — we'll get back to you within a couple of business days.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm font-medium text-brand hover:text-heading"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="channel p-6 md:p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id="name"
          label="Name"
          value={fields.name}
          onChange={update('name')}
          error={errors.name}
          autoComplete="name"
        />
        <Field
          id="email"
          label="Email"
          type="email"
          value={fields.email}
          onChange={update('email')}
          error={errors.email}
          autoComplete="email"
        />
      </div>
      <div className="mt-4">
        <Field
          id="company"
          label="Company"
          optional
          value={fields.company}
          onChange={update('company')}
          autoComplete="organization"
        />
      </div>
      <div className="mt-4">
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-text">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          value={fields.message}
          onChange={update('message')}
          aria-invalid={errors.message ? 'true' : undefined}
          aria-describedby={errors.message ? 'message-error' : undefined}
          placeholder="What are you looking to build?"
          className={`field resize-none ${errors.message ? '' : ''}`}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-xs text-accent">
            {errors.message}
          </p>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={status === 'submitting'} withArrow={status !== 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Send message'}
        </Button>
        <p className="text-xs text-muted" aria-live="polite">
          {status === 'error' ? (
            <span role="alert" className="text-accent">
              {serverError}
            </span>
          ) : (
            <>
              Prefer email?{' '}
              <a href={`mailto:${site.email}`} className="text-brand hover:text-heading">
                {site.email}
              </a>
            </>
          )}
        </p>
      </div>
    </form>
  )
}

type FieldProps = {
  id: string
  label: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  type?: string
  optional?: boolean
  autoComplete?: string
}

function Field({ id, label, value, onChange, error, type = 'text', optional, autoComplete }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-text">
        {label}
        {optional && <span className="ml-1 text-muted">(optional)</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="field"
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-accent">
          {error}
        </p>
      )}
    </div>
  )
}
