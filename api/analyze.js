export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.body;

  if (!text || text.trim().length < 10) {
    return res.status(400).json({ error: 'Текстът е твърде кратък.' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API ключът не е конфигуриран.' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: `Анализирай следния текст и определи от коя книга, комикс или манга е. След това сподели един интересен факт за тази книга или поредицата, към която принадлежи.

Текст:
"""
${text.slice(0, 2000)}
"""

Отговори САМО с JSON обект в следния формат (без markdown, без backticks):
{
  "title": "Заглавие на книгата/комикса/мангата",
  "series": "Поредица (ако е приложимо, иначе null)",
  "type": "book" | "comic" | "manga",
  "author": "Автор",
  "confidence": "high" | "medium" | "low",
  "fact": "Интересен факт на български (2-4 изречения)",
  "factEmoji": "Подходящо емоджи за факта"
}

Ако не можеш да разпознаеш произведението, върни:
{
  "title": null,
  "error": "Не успях да разпозная произведението от този текст."
}`,
          },
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Anthropic error:', err);
      return res.status(502).json({ error: 'Грешка при свързване с Claude.' });
    }

    const data = await response.json();
    const raw = data.content?.[0]?.text || '';

    let parsed;
    try {
      const clean = raw.replace(/```json|```/g, '').trim();
      parsed = JSON.parse(clean);
    } catch {
      return res.status(200).json({ error: 'Неуспешно разпознаване. Опитай с по-дълъг текст.' });
    }

    return res.status(200).json(parsed);
  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: 'Вътрешна грешка.' });
  }
}
