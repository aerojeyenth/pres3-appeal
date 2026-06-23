import { Hero } from './components/Hero'
import { MCIR_WEBSITE_URL } from './constants/consultation'
import './App.css'

function App() {
  return (
    <main className="page">
      <Hero />
      <footer className="footer">
        Thank you for standing with internationally qualified doctors. For the latest
        information on Medical Council registration, visit{' '}
        <a href={MCIR_WEBSITE_URL} target="_blank" rel="noopener noreferrer">
          medicalcouncil.ie
        </a>
        .
      </footer>
    </main>
  )
}

export default App
