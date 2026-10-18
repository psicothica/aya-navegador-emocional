import React, { useState, useRef, useEffect } from 'react';
import { Upload } from 'lucide-react';
import officialLogo from '../assets/logomarcidentidnov.png';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  className?: string;
  allowUpload?: boolean;
}

export const PsicothicaLogo: React.FC<LogoProps> = ({
  size = 'md',
  showWordmark = true,
  className = '',
  allowUpload = true
}) => {
  const pixelSizes = {
    sm: 38,
    md: 52,
    lg: 84,
    xl: 140
  };

  const dim = pixelSizes[size];
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Exact uploaded logo provided by the user
  const [logoSrc, setLogoSrc] = useState<string>(officialLogo);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // If a user previously had a mock or stale entry, reset to the exact uploaded image
    try {
      const saved = localStorage.getItem('psicothica_custom_logo');
      if (saved && saved.startsWith('data:image/')) {
        setLogoSrc(saved);
      } else {
        setLogoSrc(officialLogo);
      }
    } catch {
      setLogoSrc(officialLogo);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          try {
            localStorage.setItem('psicothica_custom_logo', result);
          } catch {
            // Storage quota
          }
          setLogoSrc(result);
          setHasError(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {/* Hidden file input to allow picking original image from device if desired */}
      {allowUpload && (
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          aria-label="Upload de logomarca original"
        />
      )}

      {/* Exact Image Display container */}
      <div 
        className="relative shrink-0 flex items-center justify-center select-none group"
        style={{ width: dim, height: dim }}
      >
        {!hasError ? (
          <img
            src={logoSrc}
            alt="Logomarca Oficial Psicothica"
            onError={() => {
              // Fallback to direct public path if needed
              if (logoSrc !== '/logomarcidentidnov.png') {
                setLogoSrc('/logomarcidentidnov.png');
              } else {
                setHasError(true);
              }
            }}
            loading="eager"
            decoding="sync"
            className="w-full h-full object-contain rounded-xl drop-shadow-[0_4px_22px_rgba(206,87,223,0.35)] transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#130169] to-[#ce57df]/30 border border-[#82e5ff]/40 flex items-center justify-center text-xs font-tech text-[#82e5ff]">
            Ψ
          </div>
        )}

        {/* Subtle hover upload trigger badge */}
        {allowUpload && (
          <button
            type="button"
            onClick={triggerUpload}
            title="Inserir / Atualizar arquivo original da logo (.png)"
            className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#130169] border border-[#02bbff]/60 text-[#82e5ff] hover:text-white hover:bg-[#ce57df] transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 shadow-md cursor-pointer z-20"
          >
            <Upload className="w-2.5 h-2.5" />
          </button>
        )}
      </div>

      {/* Wordmark: "Ecossistema Psicothica" */}
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-extrabold tracking-tight text-base sm:text-lg text-white">
              Ecossistema <span className="text-[#ce57df] glow-magenta">Psicothica</span>
            </span>
          </div>
          <span className="font-signature text-[#82e5ff] text-sm tracking-wide mt-0.5 opacity-90">
            navegação emocional & presença
          </span>
        </div>
      )}
    </div>
  );
};
