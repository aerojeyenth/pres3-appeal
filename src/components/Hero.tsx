import {
  CONSULTATION_DEADLINE,
  CONSULTATION_OFFICIAL_URL,
} from '../constants/consultation'

export function Hero() {
  return (
    <header className="hero">
      <div className="hero__content">
        <p className="eyebrow">Medical Council public consultation</p>
        <p className="hero__deadline">Respond by {CONSULTATION_DEADLINE}</p>
        <h1>
          Help international doctors join Ireland&apos;s health service sooner
        </h1>
        <p className="lead">
          Back PLAB 2 as a fair route to Irish Medical Council registration.
        </p>
        <p className="hero__official">
          <a
            href={CONSULTATION_OFFICIAL_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read the official consultation announcement
          </a>
        </p>
        <div className="hero__actions">
          <a href="#consultation-form" className="button button--hero">
            Start your response
          </a>
          <span className="hero__cta-note">Takes about 5 minutes</span>
        </div>
      </div>
    </header>
  )
}
