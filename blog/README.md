# Blog

This directory contains the markdown-based blog system for the personal website.

## Structure

```text
blog/
├── posts/              # Markdown blog posts
│   ├── welcome.md
│   ├── ai-research-journey.md
│   └── markdown-blog-setup.md
└── README.md          # This file
```

## Adding New Posts

To add a new blog post:

1. **Create the markdown file** in `posts/` directory
2. **Update the blog configuration** in `../js/blog-loader.js`

### Markdown File Format

Each post should be a standard markdown file with proper headings and formatting:

```markdown
# Post Title

Introduction paragraph...

## Section Heading

Content with **bold**, *italic*, and `code` formatting.

### Code Blocks

```javascript
function example() {
    console.log("Hello, World!");
}
```

## Conclusion

Closing thoughts...
```

### Blog Configuration

Add the post to the `posts` array in `../js/blog-loader.js`:

```javascript
{
    id: 'unique-slug',              // Used in URL hash
    title: 'Post Title',            // Display title
    date: '2025-07-02',            // Publication date (YYYY-MM-DD)
    category: 'technical',          // Category for filtering
    excerpt: 'Brief description...', // Preview text
    file: 'blog/posts/filename.md'  // Path to markdown file
}
```

## Categories

Available categories:

- `general` - General topics
- `research` - Research-related posts
- `technical` - Technical tutorials and guides
- `academic` - Academic life and experiences

## Features

- Markdown rendering with syntax highlighting
- Category-based filtering
- Responsive design
- Reading time estimation
- Social sharing capabilities
- Hash-based navigation (SEO-friendly URLs)
