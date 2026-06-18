import { useState } from 'react'
import {
  CONSULTATION_DEADLINE,
  CONSULTATION_EMAIL,
  CONSULTATION_SUBJECT,
  buildEmailDraft,
  buildGmailComposeLink,
  buildMailtoLink,
  buildOutlookComposeLink,
} from '../constants/consultation'

type EmailInstructionsProps = {
  name: string
  visible: boolean
}

export function EmailInstructions({ name, visible }: EmailInstructionsProps) {
  const [copied, setCopied] = useState(false)
  const displayName = name || '[Your name]'
  const draft = buildEmailDraft(displayName)
  const gmailLink = buildGmailComposeLink(displayName)
  const outlookLink = buildOutlookComposeLink(displayName)
  const mailtoLink = buildMailtoLink(displayName)

  async function handleCopy() {
    await navigator.clipboard.writeText(draft)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section
      className={`email-instructions${visible ? ' email-instructions--visible' : ''}`}
      aria-labelledby="email-heading"
    >
      {!visible ? (
        <p className="email-instructions__placeholder">
          Step 3: your emailing instructions unlock here once you download your PDF
          above.
        </p>
      ) : null}

      <div className="email-instructions__hidden">
        <p className="step-label">Step 3 of 3</p>
        <h2 id="email-heading">Email your response</h2>
        <p className="section-note">
          Almost done — send your downloaded PDF to the Medical Council before{' '}
          <span className="deadline-text">{CONSULTATION_DEADLINE}</span>.
        </p>
        <ol className="steps">
          <li>
            Send to{' '}
            <a href={`mailto:${CONSULTATION_EMAIL}`}>{CONSULTATION_EMAIL}</a>
          </li>
          <li>
            Subject: <strong>{CONSULTATION_SUBJECT}</strong>
          </li>
          <li>Attach the PDF you just downloaded.</li>
          <li>
            Send before{' '}
            <span className="deadline-text">{CONSULTATION_DEADLINE}</span>.
          </li>
        </ol>

        <div className="email-draft">
          <div className="email-draft__header">
            <h3>Email draft</h3>
            <button type="button" className="button button--secondary" onClick={handleCopy}>
              {copied ? 'Copied' : 'Copy email'}
            </button>
          </div>
          <textarea readOnly rows={8} value={draft} aria-label="Email draft" />
          <p className="attach-reminder" role="note">
            Attach the PDF before sending.
          </p>
          <div className="email-compose-links">
            <p className="email-compose-links__label">Open draft in:</p>
            <ul className="email-compose-links__list">
              <li>
                <a href={gmailLink} target="_blank" rel="noopener noreferrer">
                  Gmail
                </a>
              </li>
              <li>
                <a href={outlookLink} target="_blank" rel="noopener noreferrer">
                  Outlook
                </a>
              </li>
              <li>
                <a href={mailtoLink}>Email app</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
