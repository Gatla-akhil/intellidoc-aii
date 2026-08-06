import { DocumentItem } from '../types';

export const exportDocumentData = (doc: DocumentItem, format: 'JSON' | 'CSV' | 'PDF' | 'Markdown') => {
  let fileContent = '';
  let fileName = `${doc.title.replace(/\s+/g, '_')}_export`;
  let mimeType = 'text/plain';

  if (format === 'JSON') {
    fileContent = JSON.stringify(doc, null, 2);
    fileName += '.json';
    mimeType = 'application/json';
  } else if (format === 'CSV') {
    const headers = ['Entity Field', 'Extracted Value', 'Confidence Score', 'Category'];
    const rows = doc.extractedFields.map((f) => [
      `"${f.key.replace(/"/g, '""')}"`,
      `"${f.value.replace(/"/g, '""')}"`,
      `"${(f.confidence * 100).toFixed(1)}%"`,
      `"${f.category}"`,
    ]);
    fileContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    fileName += '.csv';
    mimeType = 'text/csv';
  } else if (format === 'Markdown') {
    fileContent = `# Document Extraction Report: ${doc.title}

- **Category**: ${doc.category}
- **Confidence Score**: ${(doc.confidenceScore * 100).toFixed(1)}%
- **Status**: ${doc.status}
- **Processed Date**: ${doc.createdAt}

## AI Executive Summary
${doc.summary}

## Extracted Entities
${doc.extractedFields.map((f) => `- **${f.key}**: ${f.value} (Confidence: ${(f.confidence * 100).toFixed(0)}%)`).join('\n')}

## Risk Flags & Key Insights
${doc.riskFlags.map((r) => `- ⚠️ ${r}`).join('\n')}
${doc.keyInsights.map((k) => `- ✨ ${k}`).join('\n')}
`;
    fileName += '.md';
    mimeType = 'text/markdown';
  } else if (format === 'PDF') {
    fileContent = `INTELLIDOC AI - EXECUTIVE EXTRACTION REPORT
==========================================
Document Title: ${doc.title}
Category: ${doc.category}
Confidence Score: ${(doc.confidenceScore * 100).toFixed(1)}%

AI EXECUTIVE SUMMARY:
${doc.summary}

EXTRACTED ENTITIES:
${doc.extractedFields.map((f) => `${f.key}: ${f.value}`).join('\n')}

KEY INSIGHTS:
${doc.keyInsights.join('\n')}
`;
    fileName += '.pdf.txt';
    mimeType = 'text/plain';
  }

  // Trigger browser download
  const blob = new Blob([fileContent], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
