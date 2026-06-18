import { Hero } from './components/Hero'
import { Appeal } from './components/Appeal'
import { ConsultationForm } from './components/ConsultationForm'
import './App.css'

function App() {
  return (
    <main className="page">
      <Hero />
      <Appeal />
      <ConsultationForm />
      <footer className="footer">
        Review your PDF before emailing. You are responsible for what you submit to the
        Medical Council.
      </footer>
    </main>
  )
}

export default App
