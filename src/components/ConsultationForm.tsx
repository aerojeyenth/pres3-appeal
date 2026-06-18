import { useState, type FormEvent } from 'react'
import {
  CONSULTATION_DEADLINE,
  DEFAULT_ANSWER_21,
  DEFAULT_ANSWER_22,
  DEFAULT_INTEREST,
  PDF_DOWNLOAD_FILENAME,
} from '../constants/consultation'
import { fillConsultationPdf } from '../lib/fillConsultationPdf'
import { downloadBlob } from '../lib/downloadBlob'
import { EmailInstructions } from './EmailInstructions'

type FormErrors = {
  name?: string
  interest?: string
  organisation?: string
  role?: string
}

export function ConsultationForm() {
  const [name, setName] = useState('')
  const [interest, setInterest] = useState(DEFAULT_INTEREST)
  const [isOrganisation, setIsOrganisation] = useState(false)
  const [organisation, setOrganisation] = useState('')
  const [role, setRole] = useState('')
  const [answer21, setAnswer21] = useState(DEFAULT_ANSWER_21)
  const [answer22, setAnswer22] = useState(DEFAULT_ANSWER_22)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [generated, setGenerated] = useState(false)

  function clearFieldError(field: keyof FormErrors) {
    setErrors((current) => {
      if (!current[field]) {
        return current
      }

      const { [field]: _removed, ...rest } = current
      return rest
    })
  }

  function validate(): FormErrors {
    const nextErrors: FormErrors = {}

    if (!name.trim()) {
      nextErrors.name = 'Please enter your name.'
    }

    if (!interest.trim()) {
      nextErrors.interest = 'Please describe your interest in this consultation.'
    }

    if (isOrganisation) {
      if (!organisation.trim()) {
        nextErrors.organisation = 'Please enter your organisation name.'
      }
      if (!role.trim()) {
        nextErrors.role = 'Please enter your role or position.'
      }
    }

    return nextErrors
  }

  function focusFirstError(nextErrors: FormErrors) {
    const fieldOrder: Array<keyof FormErrors> = [
      'name',
      'interest',
      'organisation',
      'role',
    ]

    const firstError = fieldOrder.find((field) => nextErrors[field])
    if (!firstError) {
      return
    }

    document.getElementById(`${firstError}-input`)?.focus()
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitError('')

    const nextErrors = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      focusFirstError(nextErrors)
      return
    }

    setIsSubmitting(true)

    try {
      const pdfBytes = await fillConsultationPdf({
        name: name.trim(),
        interest: interest.trim(),
        isOrganisation,
        organisation: organisation.trim(),
        role: role.trim(),
        answer21: answer21.trim(),
        answer22: answer22.trim(),
      })

      downloadBlob(pdfBytes, PDF_DOWNLOAD_FILENAME, 'application/pdf')
      setGenerated(true)

      window.requestAnimationFrame(() => {
        document.getElementById('email-instructions')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      })
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Something went wrong while creating your PDF.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="section" id="consultation-form" aria-labelledby="form-heading">
      <div className="section-header">
        <p className="step-label">Steps 1 &amp; 2 of 3</p>
        <h2 id="form-heading">Fill in and download your response</h2>
        <p>
          Your official response supporting PLAB 2 recognition is ready — just add your
          details and download.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <section className="form-section">
          <h2>About you</h2>
          <p className="section-note">
            These details appear on the official form sent to the Medical Council.
          </p>
          <label className={errors.name ? 'field field--error' : 'field'}>
            <span>Full name</span>
            <input
              id="name-input"
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value)
                clearFieldError('name')
              }}
              autoComplete="name"
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name ? (
              <span id="name-error" className="field-error" role="alert">
                {errors.name}
              </span>
            ) : null}
          </label>

          <label className={errors.interest ? 'field field--error' : 'field'}>
            <span>Why you are responding</span>
            <textarea
              id="interest-input"
              rows={8}
              value={interest}
              onChange={(event) => {
                setInterest(event.target.value)
                clearFieldError('interest')
              }}
              aria-invalid={errors.interest ? true : undefined}
              aria-describedby={errors.interest ? 'interest-error' : undefined}
            />
            {errors.interest ? (
              <span id="interest-error" className="field-error" role="alert">
                {errors.interest}
              </span>
            ) : null}
          </label>

          {/* <label className="checkbox-field hidden">
            <input
              type="checkbox"
              checked={isOrganisation}
              onChange={(event) => {
                const checked = event.target.checked
                setIsOrganisation(checked)
                if (!checked) {
                  setErrors((current) => {
                    const { organisation: _org, role: _role, ...rest } = current
                    return rest
                  })
                }
              }}
            />
            <span>I am responding on behalf of an organisation</span>
          </label> */}

          {isOrganisation ? (
            <>
              <label
                className={errors.organisation ? 'field field--error' : 'field'}
              >
                <span>Organisation</span>
                <input
                  id="organisation-input"
                  type="text"
                  value={organisation}
                  onChange={(event) => {
                    setOrganisation(event.target.value)
                    clearFieldError('organisation')
                  }}
                  aria-invalid={errors.organisation ? true : undefined}
                  aria-describedby={
                    errors.organisation ? 'organisation-error' : undefined
                  }
                />
                {errors.organisation ? (
                  <span id="organisation-error" className="field-error" role="alert">
                    {errors.organisation}
                  </span>
                ) : null}
              </label>

              <label className={errors.role ? 'field field--error' : 'field'}>
                <span>Role / position</span>
                <input
                  id="role-input"
                  type="text"
                  value={role}
                  onChange={(event) => {
                    setRole(event.target.value)
                    clearFieldError('role')
                  }}
                  aria-invalid={errors.role ? true : undefined}
                  aria-describedby={errors.role ? 'role-error' : undefined}
                />
                {errors.role ? (
                  <span id="role-error" className="field-error" role="alert">
                    {errors.role}
                  </span>
                ) : null}
              </label>
            </>
          ) : null}
        </section>

        <section className="form-section">
          <h2>Your answers</h2>
          <p className="section-note">
            Pre-filled to support PLAB 2 recognition — edit the wording or add your own
            experience.
          </p>

          <label className="field">
            <span>
              2.1 Is the PLAB exemption justified and proportionate?
            </span>
            <textarea
              rows={10}
              value={answer21}
              onChange={(event) => setAnswer21(event.target.value)}
            />
          </label>

          <label className="field">
            <span>2.2 General observations on the proposed rule change</span>
            <textarea
              rows={12}
              value={answer22}
              onChange={(event) => setAnswer22(event.target.value)}
            />
          </label>
        </section>

        {submitError ? <p className="form-error">{submitError}</p> : null}
        {generated ? (
          <p className="form-success">
            PDF downloaded. One step left — email it to the Medical Council using the
            steps below.
          </p>
        ) : null}

        <div className="form-actions">
          <button type="submit" className="button" disabled={isSubmitting}>
            {isSubmitting ? 'Preparing PDF…' : 'Download my response (PDF)'}
          </button>
          <p className="form-actions__note">
            No account needed. Nothing is sent automatically — you email the PDF
            yourself in the next step. Submit before{' '}
            <span className="deadline-text">{CONSULTATION_DEADLINE}</span>.
          </p>
        </div>
      </form>

      <div id="email-instructions">
        <EmailInstructions name={name.trim()} visible={generated} />
      </div>
    </section>
  )
}
