// PDF content loader for GitHub Pages
// This script loads PDF files and displays them using PDF.js

class PDFLoader {
    constructor() {
        this.pdfContainer = document.getElementById('pdf-content');
        this.pdfList = document.getElementById('pdf-list');
        this.pdfs = [
            {
                id: 'cv',
                title: 'Curriculum Vitae',
                file: 'pdfs/cv.pdf',
                type: 'document',
                description: 'Academic CV and Resume'
            }
            // Add more PDFs here as needed
        ];
        this.init();
    }

    init() {
        this.renderPDFList();
        this.handleUrlHash();
        window.addEventListener('hashchange', () => this.handleUrlHash());
    }

    renderPDFList() {
        const theses = this.pdfs.filter(p => p.type === 'thesis');
        const documents = this.pdfs.filter(p => p.type === 'document');
        const papers = this.pdfs.filter(p => p.type === 'paper');

        let html = '';
        
        if (theses.length > 0) {
            html += '<div class="pdf-category"><h4>Theses</h4><ul class="pdf-links">';
            theses.forEach(pdf => {
                html += `<li><a href="#${pdf.id}" class="pdf-link" title="${pdf.description}">${pdf.title}</a></li>`;
            });
            html += '</ul></div>';
        }

        if (papers.length > 0) {
            html += '<div class="pdf-category"><h4>Research Papers</h4><ul class="pdf-links">';
            papers.forEach(pdf => {
                html += `<li><a href="#${pdf.id}" class="pdf-link" title="${pdf.description}">${pdf.title}</a></li>`;
            });
            html += '</ul></div>';
        }

        if (documents.length > 0) {
            html += '<div class="pdf-category"><h4>Documents</h4><ul class="pdf-links">';
            documents.forEach(pdf => {
                html += `<li><a href="#${pdf.id}" class="pdf-link" title="${pdf.description}">${pdf.title}</a></li>`;
            });
            html += '</ul></div>';
        }

        this.pdfList.innerHTML = html;
    }

    handleUrlHash() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const pdf = this.pdfs.find(p => p.id === hash);
            if (pdf) {
                this.loadPDF(pdf);
            }
        }
    }

    async loadPDF(pdf) {
        try {
            // Show loading message
            this.pdfContainer.innerHTML = '<div class="loading">Loading PDF...</div>';
            
            console.log('Loading PDF:', pdf.file);
            
            // Create PDF viewer directly (skip HEAD request that might cause CORS issues)
            this.pdfContainer.innerHTML = `
                <div class="pdf-header">
                    <span class="pdf-type badge ${this.getBadgeClass(pdf.type)}">${pdf.type}</span>
                    <h1>${pdf.title}</h1>
                    <p class="text-muted">${pdf.description}</p>
                    <div class="pdf-controls mb-3">
                        <a href="${pdf.file}" target="_blank" class="btn btn-primary btn-sm">
                            <i class="fas fa-external-link-alt"></i> Open in New Tab
                        </a>
                        <a href="${pdf.file}" download class="btn btn-outline-secondary btn-sm">
                            <i class="fas fa-download"></i> Download PDF
                        </a>
                    </div>
                </div>
                <div class="pdf-viewer">
                    <iframe 
                        src="${pdf.file}#toolbar=1&navpanes=1&scrollbar=1" 
                        width="100%" 
                        height="800px" 
                        style="border: 1px solid #ddd; border-radius: 8px;"
                        title="${pdf.title}"
                        onload="console.log('PDF iframe loaded successfully')"
                        onerror="console.error('PDF iframe failed to load')">
                        <p>Your browser does not support PDFs. 
                           <a href="${pdf.file}" target="_blank">Download the PDF</a> instead.</p>
                    </iframe>
                </div>
            `;
            
            // Highlight active link
            document.querySelectorAll('.pdf-link').forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector(`a[href="#${pdf.id}"]`)?.classList.add('active');
            
            // Scroll to top of content
            this.pdfContainer.scrollTop = 0;
            
        } catch (error) {
            console.error('Error loading PDF:', error);
            this.pdfContainer.innerHTML = `
                <div class="error-message">
                    <h2>Error Loading PDF</h2>
                    <p>Sorry, there was an error loading "${pdf.title}".</p>
                    <p class="text-muted">Error: ${error.message}</p>
                    <div class="alert alert-warning mt-3">
                        <h6>Troubleshooting Tips:</h6>
                        <ul class="mb-0">
                            <li>Make sure the PDF file exists in the <code>pdfs/</code> directory</li>
                            <li>Check that the filename matches exactly (case-sensitive)</li>
                            <li>If testing locally, try using a local web server instead of opening HTML files directly</li>
                            <li>Some browsers block local file access for security reasons</li>
                        </ul>
                    </div>
                    <div class="mt-3">
                        <button class="btn btn-outline-primary" onclick="location.reload()">Reload Page</button>
                        <a href="${pdf.file}" target="_blank" class="btn btn-primary ms-2">Try Direct Link</a>
                    </div>
                </div>
            `;
        }
    }

    getBadgeClass(type) {
        switch(type) {
            case 'thesis': return 'bg-primary';
            case 'paper': return 'bg-success';
            case 'document': return 'bg-info';
            default: return 'bg-secondary';
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PDFLoader();
});
