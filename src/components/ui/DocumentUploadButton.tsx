import { useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import Description from '@mui/icons-material/Description';

const DocumentUploadButton = ({ onCapture }: { onCapture: (file: File) => void }) => {
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
        <div className="document-upload-button flex justify-center items-center">
            <input
                type="file"
                id="upload-document"
                className="hidden"
                accept="application/pdf"
                ref={fileInputRef}
                onChange={handleCapture}
                style={{ display: 'none' }}
            />
            <IconButton aria-label="document" color="primary" onClick={handleClick} sx={{ fontSize: 40, padding: '2rem' }}>
                <Description />
            </IconButton>
        </div>
    );
};

DocumentUploadButton.displayName = "DocumentUploadButton";
export { DocumentUploadButton };
