// Blog content loader for GitHub Pages
// This script loads and renders markdown blog posts

class BlogLoader {
    constructor() {
        this.blogContent = document.getElementById('blog-post-content');
        this.blogList = document.getElementById('blog-post-list');
        this.blogCategories = document.getElementById('blog-categories');
        
        // Configure marked.js options
        if (typeof marked !== 'undefined') {
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
        }
        
        // Blog posts configuration
        this.posts = [
            {
                id: 'welcome',
                title: 'Welcome to My Blog',
                date: '2025-07-02',
                category: 'general',
                excerpt: 'Welcome to my personal blog where I share thoughts on computer science, AI research, and academic life.',
                file: 'blog/posts/welcome.md'
            },
            {
                id: 'markdown-blog-setup',
                title: 'Setting Up a Markdown-Based Blog',
                date: '2025-06-30',
                category: 'technical',
                excerpt: 'How I built this blog system using vanilla JavaScript and markdown files for GitHub Pages.',
                file: 'blog/posts/markdown-blog-setup.md'
            }
            // Add more posts here
        ];
        
        this.categories = {
            'general': { name: 'General', color: '#17a2b8' },
            'research': { name: 'Research', color: '#28a745' },
            'technical': { name: 'Technical', color: '#dc3545' },
            'academic': { name: 'Academic', color: '#6f42c1' }
        };
        
        this.init();
    }

    init() {
        this.renderBlogList();
        this.renderCategories();
        this.handleUrlHash();
        window.addEventListener('hashchange', () => this.handleUrlHash());
    }

    renderBlogList() {
        // Sort posts by date (newest first)
        const sortedPosts = [...this.posts].sort((a, b) => new Date(b.date) - new Date(a.date));
        
        let html = '';
        sortedPosts.forEach(post => {
            const formattedDate = this.formatDate(post.date);
            const categoryInfo = this.categories[post.category] || { name: post.category, color: '#6c757d' };
            
            html += `
                <div class="blog-post-list-item">
                    <a href="#${post.id}">${post.title}</a>
                    <div class="post-date">
                        <i class="fas fa-calendar-alt"></i> ${formattedDate}
                    </div>
                    <div class="post-excerpt">${post.excerpt}</div>
                    <div class="mt-2">
                        <span class="category-tag" style="background-color: ${categoryInfo.color}20; color: ${categoryInfo.color}; border: 1px solid ${categoryInfo.color}40;">
                            ${categoryInfo.name}
                        </span>
                    </div>
                </div>
            `;
        });
        
        this.blogList.innerHTML = html;
    }

    renderCategories() {
        const categoryCount = {};
        this.posts.forEach(post => {
            categoryCount[post.category] = (categoryCount[post.category] || 0) + 1;
        });
        
        let html = '';
        Object.entries(categoryCount).forEach(([category, count]) => {
            const categoryInfo = this.categories[category] || { name: category, color: '#6c757d' };
            html += `
                <a href="#category-${category}" class="category-tag" style="background-color: ${categoryInfo.color}; color: white;">
                    ${categoryInfo.name} (${count})
                </a>
            `;
        });
        
        this.blogCategories.innerHTML = html;
    }

    handleUrlHash() {
        const hash = window.location.hash.substring(1);
        
        if (hash.startsWith('category-')) {
            const category = hash.replace('category-', '');
            this.showCategoryPosts(category);
        } else if (hash) {
            const post = this.posts.find(p => p.id === hash);
            if (post) {
                this.loadPost(post);
            } else {
                this.showBlogIndex();
            }
        } else {
            this.showBlogIndex();
        }
    }

    showBlogIndex() {
        let html = `
            <div class="blog-index">
                <div class="row">
        `;
        
        // Sort posts by date (newest first)
        const sortedPosts = [...this.posts].sort((a, b) => new Date(b.date) - new Date(a.date));
        
        sortedPosts.forEach(post => {
            const formattedDate = this.formatDate(post.date);
            const categoryInfo = this.categories[post.category] || { name: post.category, color: '#6c757d' };
            
            html += `
                <div class="col-md-6 mb-4">
                    <div class="card h-100 blog-post-card" style="cursor: pointer;" onclick="window.location.hash = '${post.id}'">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <span class="category-tag" style="background-color: ${categoryInfo.color};">
                                    ${categoryInfo.name}
                                </span>
                                <small class="text-muted">
                                    <i class="fas fa-calendar-alt"></i> ${formattedDate}
                                </small>
                            </div>
                            <h5 class="card-title">${post.title}</h5>
                            <p class="card-text">${post.excerpt}</p>
                            <a href="#${post.id}" class="btn btn-outline-primary btn-sm">
                                Read More <i class="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
        
        this.blogContent.innerHTML = html;
        document.title = "Michal's Personal Page - Blog";
    }

    showCategoryPosts(category) {
        const categoryPosts = this.posts.filter(p => p.category === category);
        const categoryInfo = this.categories[category] || { name: category, color: '#6c757d' };
        
        let html = `
            <div class="category-posts">
                <div class="d-flex align-items-center mb-4">
                    <span class="category-tag me-3" style="background-color: ${categoryInfo.color};">
                        ${categoryInfo.name}
                    </span>
                    <h2 class="mb-0">Posts in ${categoryInfo.name}</h2>
                </div>
                <div class="row">
        `;
        
        categoryPosts.forEach(post => {
            const formattedDate = this.formatDate(post.date);
            
            html += `
                <div class="col-md-6 mb-4">
                    <div class="card h-100 blog-post-card" style="cursor: pointer;" onclick="window.location.hash = '${post.id}'">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <small class="text-muted">
                                    <i class="fas fa-calendar-alt"></i> ${formattedDate}
                                </small>
                            </div>
                            <h5 class="card-title">${post.title}</h5>
                            <p class="card-text">${post.excerpt}</p>
                            <a href="#${post.id}" class="btn btn-outline-primary btn-sm">
                                Read More <i class="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
                <div class="mt-4">
                    <a href="#" class="btn btn-secondary">
                        <i class="fas fa-arrow-left"></i> Back to All Posts
                    </a>
                </div>
            </div>
        `;
        
        this.blogContent.innerHTML = html;
        document.title = `Michal's Personal Page - ${categoryInfo.name} Posts`;
    }

    async loadPost(post) {
        try {
            // Show loading message
            this.blogContent.innerHTML = '<div class="loading"><i class="fas fa-spinner"></i><br>Loading post...</div>';
            
            console.log('Loading blog post:', post.file);
            
            // Fetch the markdown file
            const response = await fetch(post.file);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const markdown = await response.text();
            
            // Parse markdown to HTML
            let htmlContent = '';
            if (typeof marked !== 'undefined') {
                htmlContent = marked.parse(markdown);
            } else {
                // Fallback: simple markdown-like parsing
                htmlContent = this.simpleMarkdownParse(markdown);
            }
            
            // Render the blog post
            const formattedDate = this.formatDate(post.date);
            const categoryInfo = this.categories[post.category] || { name: post.category, color: '#6c757d' };
            
            this.blogContent.innerHTML = `
                <article class="blog-post">
                    <header class="blog-post-header">
                        <h2>${post.title}</h2>
                        <div class="blog-post-meta">
                            <div class="meta-item">
                                <i class="fas fa-calendar-alt"></i>
                                <span>${formattedDate}</span>
                            </div>
                            <div class="meta-item">
                                <i class="fas fa-tag"></i>
                                <span>${categoryInfo.name}</span>
                            </div>
                            <div class="meta-item">
                                <i class="fas fa-clock"></i>
                                <span>${this.estimateReadingTime(markdown)} min read</span>
                            </div>
                        </div>
                    </header>
                    <div class="blog-post-content">
                        ${htmlContent}
                    </div>
                    <nav class="blog-nav">
                        <a href="#" class="btn btn-outline-secondary">
                            <i class="fas fa-arrow-left"></i> Back to Blog
                        </a>
                        <div>
                            <button class="btn btn-outline-primary btn-sm" onclick="this.sharePost('${post.title}', '${post.id}')">
                                <i class="fas fa-share"></i> Share
                            </button>
                        </div>
                    </nav>
                </article>
            `;
            
            // Update page title
            document.title = `${post.title} - Michal's Personal Page`;
            
            // Highlight code blocks if Prism is available
            if (typeof Prism !== 'undefined') {
                Prism.highlightAll();
            }
            
            // Scroll to top
            window.scrollTo(0, 0);
            
        } catch (error) {
            console.error('Error loading blog post:', error);
            this.blogContent.innerHTML = `
                <div class="error-message">
                    <h4><i class="fas fa-exclamation-triangle"></i> Error Loading Post</h4>
                    <p>Sorry, there was an error loading "${post.title}".</p>
                    <p class="text-muted">Error: ${error.message}</p>
                    <div class="mt-3">
                        <button class="btn btn-outline-primary" onclick="location.reload()">Reload Page</button>
                        <a href="#" class="btn btn-secondary ms-2">Back to Blog</a>
                    </div>
                </div>
            `;
        }
    }

    simpleMarkdownParse(markdown) {
        // Simple fallback markdown parser
        let html = markdown
            // Headers
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            // Bold
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            // Italic
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            // Code blocks
            .replace(/```([^`]*)```/gim, '<pre><code>$1</code></pre>')
            // Inline code
            .replace(/`([^`]*)`/gim, '<code>$1</code>')
            // Links
            .replace(/\[([^\]]*)\]\(([^)]*)\)/gim, '<a href="$2">$1</a>')
            // Line breaks
            .replace(/\n/gim, '<br>');
        
        return html;
    }

    formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    estimateReadingTime(text) {
        const wordsPerMinute = 200;
        const words = text.trim().split(/\s+/).length;
        return Math.ceil(words / wordsPerMinute);
    }

    sharePost(title, id) {
        if (navigator.share) {
            navigator.share({
                title: title,
                url: window.location.href
            });
        } else {
            // Fallback: copy URL to clipboard
            const url = `${window.location.origin}${window.location.pathname}#${id}`;
            navigator.clipboard.writeText(url).then(() => {
                alert('Link copied to clipboard!');
            }).catch(() => {
                prompt('Copy this link:', url);
            });
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BlogLoader();
});
