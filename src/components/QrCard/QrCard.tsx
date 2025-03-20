import { Copy } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';

interface QrCardProps {
  title: string;
  url: string;
  className?: string;
}

export function QrCard({ title, url, className = '' }: QrCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy URL:', error);
    }
  };

  const handleDownloadQr = () => {
    const svg = document.querySelector('#qr-code')?.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `${title}-qr.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className={`w-full rounded-2xl border border-gray-200 p-6 ${className}`}>
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>

      <div id="qr-code" className="mt-4 flex justify-center">
        <QRCodeSVG value={url} size={140} />
      </div>

      <div className="mt-4 flex flex-col items-center gap-2 text-sm">
        <button
          onClick={handleDownloadQr}
          className="font-medium text-blue-600 hover:text-blue-700 active:text-blue-800"
        >
          Descargar QR
        </button>

        <button
          onClick={handleCopyUrl}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-700 active:text-gray-800"
        >
          <Copy className="h-4 w-4" />
          {copied ? 'Copiado!' : 'Copiar enlace para compartir'}
        </button>
      </div>
    </div>
  );
}
