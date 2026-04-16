export default function ThemeToggle({ theme, onToggle }) {
  return (
    <button className="theme-toggle" onClick={onToggle} aria-label="Смени темата">
      {theme === 'dark' ? '☀️ Светла' : '🌙 Тъмна'}
    </button>
  )
}
