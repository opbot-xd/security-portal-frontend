import { useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const PhotoUploadButton = ({ onCapture }: { onCapture: (file: File) => void }) => {
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
        <div className="photo-upload-button flex justify-center items-center">
            <input
                type="file"
                id="upload-photo"
                className="hidden"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleCapture}
                style={{ display: 'none' }}
            />
            <IconButton aria-label="photo" color="primary" onClick={handleClick} sx={{ fontSize: 40, padding: '2rem' }}>
                <PhotoCamera />
            </IconButton>
        </div>
    );
};

PhotoUploadButton.displayName = "PhotoUploadButton";
export { PhotoUploadButton };
