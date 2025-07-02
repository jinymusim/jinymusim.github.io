# Setting Up a Markdown-Based Blog

When I decided to add a blog to my personal website, I wanted something simple, fast, and easy to maintain. After considering various options, I settled on a custom markdown-based solution that works perfectly with GitHub Pages. Here's how I built it and why you might want to consider a similar approach.

## Why Markdown for Blogging?

### Advantages of Markdown

- **Simplicity**: Writing in markdown is much simpler than HTML
- **Portability**: Markdown files can be easily converted to other formats
- **Version Control**: Text files work perfectly with Git
- **Fast Loading**: No database queries or server-side processing needed
- **GitHub Pages Compatible**: Works seamlessly with static site hosting

### Comparison with Alternatives

| Solution | Pros | Cons |
|----------|------|------|
| WordPress | Feature-rich, themes | Requires server, database |
| Jekyll | GitHub Pages native | Ruby dependency, build step |
| Custom Markdown | Simple, fast, flexible | Requires custom development |
| Static Generators | Many options | Build complexity |

## Architecture Overview

My blog system consists of several key components:

```text
blog/
├── posts/           # Markdown files
│   ├── welcome.md
│   └── markdown-blog-setup.md
├── blog.html        # Main blog page
├── js/
│   └── blog-loader.js   # JavaScript for loading posts
└── styles/
    └── blog-styles.css  # Blog-specific styling
```

## Core Components

### 1. Blog Loader JavaScript

The heart of the system is a JavaScript class that handles:

```javascript
class BlogLoader {
    constructor() {
        this.posts = [
            {
                id: 'welcome',
                title: 'Welcome to My Blog',
                date: '2025-07-02',
                category: 'general',
                excerpt: 'Welcome message...',
                file: 'blog/posts/welcome.md'
            }
            // More posts...
        ];
    }
    
    async loadPost(post) {
        const response = await fetch(post.file);
        const markdown = await response.text();
        const html = marked.parse(markdown);
        // Render the HTML...
    }
}
```

### 2. Markdown Parsing

I'm using the [Marked.js](https://marked.js.org/) library for parsing markdown:

```javascript
marked.setOptions({
    highlight: function(code, lang) {
        if (typeof Prism !== 'undefined' && lang && Prism.languages[lang]) {
            return Prism.highlight(code, Prism.languages[lang], lang);
        }
        return code;
    },
    breaks: true,
    gfm: true
});
```

### 3. Syntax Highlighting

Code blocks are highlighted using [Prism.js](https://prismjs.com/):

```html
<!-- Prism.js for code syntax highlighting -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css" rel="stylesheet" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
```

## Implementation Details

### URL Routing with Hash Navigation

The blog uses hash-based routing to avoid server-side requirements:

```javascript
handleUrlHash() {
    const hash = window.location.hash.substring(1);
    
    if (hash.startsWith('category-')) {
        const category = hash.replace('category-', '');
        this.showCategoryPosts(category);
    } else if (hash) {
        const post = this.posts.find(p => p.id === hash);
        if (post) {
            this.loadPost(post);
        }
    } else {
        this.showBlogIndex();
    }
}
```

### Post Configuration

Each blog post is defined in the JavaScript configuration:

```javascript
{
    id: 'unique-post-id',           // Used for URL hash
    title: 'Post Title',            // Display title
    date: '2025-07-02',            // Publication date
    category: 'technical',          // Category for filtering
    excerpt: 'Short description...', // Preview text
    file: 'blog/posts/filename.md'  // Path to markdown file
}
```

### Categories and Filtering

Posts can be organized by categories with color coding:

```javascript
this.categories = {
    'general': { name: 'General', color: '#17a2b8' },
    'research': { name: 'Research', color: '#28a745' },
    'technical': { name: 'Technical', color: '#dc3545' },
    'academic': { name: 'Academic', color: '#6f42c1' }
};
```

## Styling and UI

### Responsive Design

The blog uses Bootstrap for responsive layout:

```html
<div class="container">
    <div class="row">
        <div class="col-lg-8">
            <!-- Main content -->
        </div>
        <div class="col-lg-4">
            <!-- Sidebar -->
        </div>
    </div>
</div>
```

### Custom CSS

Blog-specific styling enhances the reading experience:

```css
.blog-post {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin-bottom: 2rem;
    overflow: hidden;
}

.blog-post-content {
    padding: 1.5rem;
    line-height: 1.7;
}
```

## Features

### 1. Post Index

The main blog page shows all posts in a card layout with:

- Post title and date
- Category tags
- Excerpt preview
- Read more links

### 2. Individual Post View

Each post displays with:

- Full markdown content rendered as HTML
- Metadata (date, category, reading time)
- Navigation controls
- Social sharing

### 3. Category Filtering

Posts can be filtered by category:

- Category tags in sidebar
- Dedicated category views
- Post counts per category

### 4. Reading Time Estimation

Automatic reading time calculation:

```javascript
estimateReadingTime(text) {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
}
```

### 5. Error Handling

Graceful handling of missing files or network issues:

```javascript
try {
    const response = await fetch(post.file);
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    // Process the response...
} catch (error) {
    // Show user-friendly error message
}
```

## Deployment

Since this is a static site, deployment is straightforward:

1. **GitHub Pages**: Automatic deployment from the repository
2. **No Build Step**: Everything runs in the browser
3. **CDN Benefits**: Fast loading from GitHub's CDN

## Adding New Posts

Adding a new blog post involves two steps:

### 1. Create the Markdown File

Create a new `.md` file in `blog/posts/`:

```markdown
# Your Post Title

Your content here using standard markdown syntax...

## Subheading

- List items
- More items

```python
# Code blocks with syntax highlighting
def hello_world():
    print("Hello, World!")
```

### 2. Update the Configuration

Add the post to the JavaScript configuration:

```javascript
{
    id: 'your-post-slug',
    title: 'Your Post Title',
    date: '2025-07-02',
    category: 'technical',
    excerpt: 'Brief description of your post...',
    file: 'blog/posts/your-post.md'
}
```

## Performance Considerations

### Lazy Loading

Posts are only loaded when requested, keeping the initial page load fast.

### Caching

Browsers cache the markdown files, improving repeat visits.

### Minimal Dependencies

Only essential libraries are loaded:

- Marked.js for markdown parsing
- Prism.js for syntax highlighting
- Bootstrap for responsive layout

## Future Enhancements

Some features I'm considering adding:

### Search Functionality

Implement client-side search across all posts:

```javascript
searchPosts(query) {
    return this.posts.filter(post => 
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase())
    );
}
```

### Tags System

More granular categorization with tags:

```javascript
{
    id: 'post-id',
    title: 'Post Title',
    tags: ['javascript', 'web-development', 'tutorial']
}
```

### RSS Feed

Generate an RSS feed for subscribers:

```javascript
generateRSSFeed() {
    // Create RSS XML from posts array
}
```

## Lessons Learned

### What Worked Well

- **Simplicity**: The system is easy to understand and maintain
- **Performance**: Fast loading with no server-side processing
- **Flexibility**: Easy to customize and extend
- **GitHub Integration**: Works perfectly with GitHub Pages

### Challenges

- **SEO**: Hash-based routing isn't ideal for search engines
- **No Comments**: Static sites don't support native commenting
- **Manual Updates**: Need to update JavaScript configuration for each post

### Solutions

For SEO, I could implement:

- Server-side rendering for crawler bots
- Proper meta tags for social sharing
- XML sitemap generation

For comments, options include:

- Third-party services like Disqus
- GitHub Issues integration
- Staticman for form handling

## Conclusion

Building a custom markdown-based blog has been a rewarding project. It strikes the right balance between simplicity and functionality for my needs. The system is fast, maintainable, and perfectly suited for a technical blog.

If you're comfortable with JavaScript and prefer having full control over your blog's functionality, this approach might work well for you too. The complete source code is available in my [GitHub repository](https://github.com/jinymusim/jinymusim.github.io).

## Resources

- [Marked.js Documentation](https://marked.js.org/)
- [Prism.js Syntax Highlighting](https://prismjs.com/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Markdown Guide](https://www.markdownguide.org/)

---

*Have questions about the implementation? Want to see specific features added? Feel free to reach out via [email](mailto:peritum.michal@gmail.com) or open an issue on GitHub!*
