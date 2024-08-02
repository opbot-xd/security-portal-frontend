import { useState, useRef } from 'react';
import Modal from 'react-modal';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';
import Drawer from '../../components/ui/Drawer'
const StudentDetailsPage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleView = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    // Handle submit action
    console.log('Submitted');
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="text-gray-50 w-screen bg-slate-900 h-screen flex flex-col justify-center items-center">
      <Drawer />
      <div className="flex w-4/5 h-1/2 bg-gray-500 justify-center items-center">
        <p className='text-black'>channelI data</p>
      </div>
      <div className="flex justify-center items-center">
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
      {image && (
        <div className="flex justify-center items-center">
          <Stack spacing={2} direction="row">
            <Button onClick={handleView} variant="contained">View</Button>
            <Button onClick={handleSubmit} variant="contained" color="success">Submit</Button>
          </Stack>
        </div>
      )}
      <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="View Image">
        <h2 className='font-mono font-bold text-xl antialiased'>Captured Fingerprint</h2>
        <img src={image || ''} alt="Captured Fingerprint" />
        <Button onClick={closeModal} variant="contained" color="error">
            Close
        </Button>
      </Modal>
    </div>
  );
};

export default StudentDetailsPage;
