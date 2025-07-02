# Michal Chudoba - Personal Website

A personal website featuring a markdown-based blog system, document viewer, and academic CV.

## 🌐 Live Site
Visit: [https://jinymusim.github.io](https://jinymusim.github.io)

## 📖 About
This is a personal website for Michal Chudoba, a computer science doctoral student at the University of Stavanger. The site features:

- **Blog** - Markdown-based blog system (main page)
- **Documents** - PDF viewer for academic documents and CV
- **Professional Links** - LinkedIn and contact information

## 🏗️ Structure

```text
├── index.html              # Main page (blog)
├── documents.html          # Document viewer page
├── blog/                   # Blog system
│   ├── posts/             # Markdown blog posts
│   └── README.md          # Blog documentation
├── js/                    # JavaScript modules
│   ├── blog-loader.js     # Blog engine
│   └── pdf-loader.js      # PDF viewer
├── styles/                # CSS stylesheets
│   ├── shared-styles.css  # Common styles
│   ├── blog-styles.css    # Blog-specific styles
│   └── documents-styles.css # Document viewer styles
├── images/                # Logo and images
├── pdfs/                  # PDF documents
└── old-index.html         # Backup of original homepage
```

## ✨ Features

### Blog System
- **Markdown-based** - Write posts in simple markdown
- **Syntax highlighting** - Code blocks with Prism.js
- **Categories** - Organize posts by topic
- **Responsive design** - Mobile-friendly layout
- **Fast loading** - Static files, no database

### Document Viewer
- **PDF integration** - View PDFs directly in browser
- **CV display** - Academic curriculum vitae
- **Download options** - Direct download links

## 🚀 Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **CSS Framework**: Bootstrap 5.2
- **Markdown Parser**: Marked.js
- **Syntax Highlighting**: Prism.js
- **Icons**: Font Awesome 6
- **Hosting**: GitHub Pages

## 📝 Adding Blog Posts

1. Create a markdown file in `blog/posts/`
2. Add post configuration to `js/blog-loader.js`
3. Commit and push to GitHub

See `blog/README.md` for detailed instructions.

## 🎨 Customization

The site uses a consistent yellow/gold color scheme (`#ffc107`) throughout. Key styling files:

- `styles/shared-styles.css` - Common components
- `styles/blog-styles.css` - Blog-specific styling
- `styles/documents-styles.css` - Document viewer styling

## 📄 License

This project is licensed under the terms found in the [LICENSE](LICENSE) file.

## 👤 Contact

- **Email**: peritum.michal@gmail.com
- **LinkedIn**: [Michal Chudoba](http://linkedin.com/in/michal-chudoba-06603b241)
- **Institution**: University of Stavanger
