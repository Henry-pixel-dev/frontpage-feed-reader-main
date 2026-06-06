const express = require('express');
const cors = require('cors');
const Parser = require('rss-parser');

const app = express();
const parser = new Parser();

app.use(cors())
app.use(express.json())

app.get('/api/feed', async (req, res) => {
  const { url } = req.query

  if (!url) {
    return res.status(400).json({ error: 'Feed URL is required' })
  }

  try {
    const feed = await parser.parseURL(url)
    res.json({
      title: feed.title,
      description: feed.description,
      items: feed.items.map(item => ({
        title: item.title,
        url: item.link,
        summary: item.contentSnippet,
        content: item.content,
        author: item.creator,
        publishedAt: item.pubDate,
      }))
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch or parse feed' })
  }
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})