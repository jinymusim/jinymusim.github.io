# PDFs Directory

This directory contains PDF documents that can be displayed on the website.

## Adding New PDFs

1. Place your PDF files in this directory
2. Update the `pdfs` array in `/js/pdf-loader.js` to include your new PDF
3. Commit and push the changes

## Supported PDF Types

- **thesis**: Academic theses (Bachelor's, Master's, PhD)
- **paper**: Research papers and publications  
- **document**: CVs, resumes, certificates, etc.

## Example PDF Entry

```javascript
{
    id: 'my-paper',
    title: 'My Research Paper',
    file: 'pdfs/my-paper.pdf',
    type: 'paper',
    description: 'Description of the paper'
}
```

## Note

Make sure your PDF files are:
- Optimized for web viewing
- Not too large (recommended < 10MB for good loading times)
- Named descriptively without spaces (use hyphens or underscores)
