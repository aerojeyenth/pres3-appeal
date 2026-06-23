import {
  CONSULTATION_DEADLINE,
  CONSULTATION_OFFICIAL_URL,
  MCIR_WEBSITE_URL,
} from '../constants/consultation'

export function Hero() {
  return (
    <header className="hero">
      <div className="hero__content">
        <p className="eyebrow">Medical Council public consultation</p>
        <p className="hero__deadline">Consultation closed — deadline was {CONSULTATION_DEADLINE}</p>
        <h1>Thank you to everyone who responded</h1>
        <p className="lead">
          The public consultation on recognising PLAB 2 as an alternative to PRES 3 has
          now closed. Your support helped international medical graduates make their voices
          heard.
        </p>
        <p className="hero__official">
          For official updates on the proposed registration changes, visit the{' '}
          <a href={MCIR_WEBSITE_URL} target="_blank" rel="noopener noreferrer">
            Medical Council website
          </a>
          . You can also{' '}
          <a
            href={CONSULTATION_OFFICIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            read the original consultation announcement
          </a>
          .
        </p>
      </div>
    </header>
  )
}
