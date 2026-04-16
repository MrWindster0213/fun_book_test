# 📚 BookFacts — Открий тайните зад страниците

Постави текст от книга, комикс или манга и платформата ще го разпознае и ще сподели интересен факт за него.

## Как работи

1. Потребителят поставя текст
2. Vercel Serverless Function изпраща заявка към Claude API
3. Claude разпознава произведението и връща интересен факт
4. Резултатът се показва в красив карт

## Deployment на Vercel (стъпка по стъпка)

### 1. Качи проекта в GitHub

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/ТУК_ТВОЕТО_USERNAME/book-facts.git
git push -u origin main
```

### 2. Свържи с Vercel

1. Отиди на [vercel.com](https://vercel.com) и влез с GitHub акаунта си
2. Кликни **Add New Project**
3. Избери репото `book-facts`
4. Vercel автоматично ще открие Vite — кликни **Deploy**

### 3. Добави API ключа

1. В Vercel → Settings → **Environment Variables**
2. Добави: `ANTHROPIC_API_KEY` = твоят ключ от [console.anthropic.com](https://console.anthropic.com)
3. Кликни **Save** и след това **Redeploy**

### 4. Готово! 🎉

Сайтът ще е достъпен на `https://book-facts-xxxxxxx.vercel.app`

## Локална разработка

```bash
npm install
cp .env.example .env.local
# Добави API ключа в .env.local
npm run dev
```

## Технологии

- **React 18** + Vite
- **Vercel Serverless Functions** (Node.js)
- **Claude API** (claude-sonnet-4)
- Dark/Light mode с CSS variables
