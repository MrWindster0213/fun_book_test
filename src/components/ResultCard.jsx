const TYPE_LABELS = {
  book: 'Книга',
  comic: 'Комикс',
  manga: 'Манга',
}

const CONF_LABELS = {
  high: 'Сигурен',
  medium: 'Вероятно',
  low: 'Несигурен',
}

export default function ResultCard({ result }) {
  const typeLabel = TYPE_LABELS[result.type] || 'Произведение'
  const confClass = `result-confidence conf-${result.confidence || 'medium'}`
  const confLabel = CONF_LABELS[result.confidence] || ''

  return (
    <div className="result-card">
      <div className="result-header">
        <span className="result-type-badge">{typeLabel}</span>
        <div className="result-titles">
          <div className="result-title">{result.title}</div>
          {result.series && (
            <div className="result-series">Поредица: {result.series}</div>
          )}
          {result.author && (
            <div className="result-author">✍️ {result.author}</div>
          )}
        </div>
        {result.confidence && (
          <span className={confClass}>{confLabel}</span>
        )}
      </div>

      <div className="result-fact">
        <span className="fact-emoji">{result.factEmoji || '💡'}</span>
        <div>
          <div className="fact-label">Интересен факт</div>
          <p className="fact-text">{result.fact}</p>
        </div>
      </div>
    </div>
  )
}
