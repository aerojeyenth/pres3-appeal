import { CONSULTATION_DEADLINE } from '../constants/consultation'

export function Appeal() {
  return (
    <section className="section appeal" aria-labelledby="appeal-heading">
      <div className="section-header">
        <h2 id="appeal-heading">Why this matters</h2>
        <p>
          Qualified international graduates are ready to work, but limited PRES 3 places
          leave them waiting months to register.
        </p>
      </div>

      <div className="appeal__cards">
        <article className="appeal-card">
          <p className="appeal-card__label">The problem</p>
          <h3>PRES 3 delays</h3>
          <p>
            Doctors who have passed other recognised assessments still cannot enter the
            workforce. Patients wait longer while hospitals stay understaffed.
          </p>
        </article>

        <article className="appeal-card appeal-card--accent">
          <p className="appeal-card__label">The solution</p>
          <h3>Recognise PLAB 2</h3>
          <p>
            The Medical Council has assessed PLAB 2 as equivalent to PRES 3 — a fair,
            evidence-based route without lowering standards.
          </p>
        </article>

        <article className="appeal-card">
          <p className="appeal-card__label">The outcome</p>
          <h3>Doctors serving sooner</h3>
          <p>
            More qualified graduates in GP surgeries, hospitals, and communities across
            Ireland — strengthening a health service that urgently needs them.
          </p>
        </article>
      </div>

      <div className="how-it-works">
        <h2>How it works</h2>
        <ol className="how-it-works__steps">
          <li className="how-it-works__step">
            <span className="how-it-works__number" aria-hidden="true">
              1
            </span>
            <p>Add your details. Answers are pre-filled — edit anything.</p>
          </li>
          <li className="how-it-works__step">
            <span className="how-it-works__number" aria-hidden="true">
              2
            </span>
            <p>Download your response as a PDF.</p>
          </li>
          <li className="how-it-works__step">
            <span className="how-it-works__number" aria-hidden="true">
              3
            </span>
            <p>
              Email it to the Medical Council before{' '}
              <strong className="deadline-text">{CONSULTATION_DEADLINE}</strong>.
            </p>
          </li>
        </ol>
        <p className="how-it-works__note">
          This is an official consultation response — not a petition. Open to IMGs,
          healthcare workers, patients, and anyone who supports a fairer registration
          path.
        </p>
      </div>
    </section>
  )
}
