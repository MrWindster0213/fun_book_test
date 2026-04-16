import { useState } from 'react'

export default function BookInput({ onAnalyze, loading }) {
  const [text, setText] = useState('')
  const maxChars = 3000

  const handleSubmit = () => {
    if (text.trim().length >= 10) onAnalyze(text)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleSubmit()
  }

  return (
    <div className="input-card">
      <label className="input-label" htmlFor="book-text">
        Постави или напиши текст от книга, комикс или манга
      </label>
      <textarea
        id="book-text"
        className="textarea"
        placeholder="Например: „Не е трудно да умреш, Санчо." Старецът го гледаше с печални очи..."
        value={text}
        onChange={e => setText(e.target.value.slice(0, maxChars))}
        onKeyDown={handleKeyDown}
        disabled={loading}
      />
      <div className="input-footer">
        <span className="char-count">
          {text.length} / {maxChars} символа
          {text.length < 10 && text.length > 0 && ' · нужни са поне 10'}
        </span>
        <button
          className="btn"
          onClick={handleSubmit}
          disabled={loading || text.trim().length < 10}
        >
          {loading ? (
            <>
              <span className="spinner" />
              Анализирам…
            </>
          ) : (
            <>
              <span>🔍</span>
              Разпознай и научи
            </>
          )}
        </button>
      </div>
    </div>
  )
}
