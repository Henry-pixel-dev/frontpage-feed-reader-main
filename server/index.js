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

app.get('/api/preview-feed', async (req, res) => {
  const { url } = req.query

  if (!url) {
    return res.status(400).json({ error: 'Feed URL is required' })
  }

  try{
    const feed = await parser.parseURL(url)
    const domain = new URL(url).hostname
     res.json({
      title: feed.title,
      description: feed.description,
      feedUrl: url,
      favicon: `https://www.google.com/s2/favicons?domain=${domain}&sz=32`,
      format: null,
      category: null,
      siteUrl: new URL(url).origin,
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
     try{
      const response = await fetch(url)
      const html = await response.text()

      const match = html.match(
        /<link[^>]*type="application\/(rss|atom)\+xml"[^>]*href="([^"]+)"/i
      )

      if (match) {
        let feedUrl = match[2]
        // feedUrl might be relative like "/feed/"
        // need to make it absolute
        if (feedUrl.startsWith('/')) {
          feedUrl = `${new URL(url).origin}${feedUrl}`
        }
        // now parse this feed URL

        const feed = await parser.parseURL(feedUrl)
        const domain = new URL(url).hostname
        return res.json({
          title: feed.title,
          description: feed.description,
          feedUrl: feedUrl,
          favicon: `https://www.google.com/s2/favicons?domain=${domain}&sz=32`,
          format: null,
          category: null,
          siteUrl: new URL(url).origin,
          items: feed.items.map(item => ({
            title: item.title,
            url: item.link,
            summary: item.contentSnippet,
            content: item.content,
            author: item.creator,
            publishedAt: item.pubDate,
          }))
        })
      } else {
        return res.status(404).json({ 
          error: 'No RSS feed found on this website' 
        })
      }

     } catch (error) {
      res.status(500).json({ error: 'Failed to fetch or parse feed' })
     }
    
  }
})


const PORT = 3000

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})