import { FileDown } from 'lucide-react';
import { exportToPdf } from '../../utils/pdf';

interface PdfExportProps {
  elementId: string;
  filename: string;
  label?: string;
}

export default function PdfExport({ elementId, filename, label = 'Exporter PDF' }: PdfExportProps) {
  return (
    <button
      onClick={() => exportToPdf(elementId, filename)}
      className="flex items-center gap-2 px-4 py-2 border border-primary/30 text-primary rounded-lg text-sm font-medium hover:bg-primary/5 transition-colors no-print"
    >
      <FileDown className="w-4 h-4" /> {label}
    </button>
  );
}
