import { useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';

const FingerprintButton = ({ onCapture }: { onCapture: (file: File) => void }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
  
    const handleClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };
  
    const handleCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        onCapture(file);
      }
    };
  
    return (
      <div className="fingerprint-button flex justify-center items-center">
        <input
          type="file"
          id="upload-fingerprint"
          className="hidden"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleCapture}
          style={{ display: 'none' }}
        />
        <IconButton aria-label="fingerprint" color="secondary" onClick={handleClick} sx={{ fontSize: 40, padding: '2rem' }}>
          <Fingerprint />
        </IconButton>
      </div>
    );
  };

  FingerprintButton.displayName = "FingerprintButton";
  export { FingerprintButton };