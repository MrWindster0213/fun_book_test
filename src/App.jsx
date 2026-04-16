import { useState, useEffect } from 'react'
import BookInput from './components/BookInput'
import ResultCard from './components/ResultCard'
import ThemeToggle from './components/ThemeToggle'
import './App.css'

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  const handleAnalyze = async (text) => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      const data = await res.json()

      if (data.error) {
        setError(data.error)
      } else {
        setResult(data)
      }
    } catch {
      setError('Мрежова грешка. Провери интернет връзката си.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-icon">📚</span>
            <span className="logo-text">BookFacts</span>
          </div>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </header>

      <main className="main">
        <section className="hero">
          <h1 className="hero-title">Открий тайните зад страниците</h1>
          <p className="hero-subtitle">
            Постави текст от любима книга, комикс или манга и научи нещо ново за нея.
          </p>
        </section>

        <div className="content">
          <BookInput onAnalyze={handleAnalyze} loading={loading} />

          {error && (
            <div className="error-box">
              <span className="error-icon">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {result && <ResultCard result={result} />}
        </div>
      </main>

      <footer className="footer">
        <p>Задвижван от Claude · направен с ❤️</p>
      </footer>
    </div>
  )
}

export default App
