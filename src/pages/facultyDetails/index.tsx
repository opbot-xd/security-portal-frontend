import { useState } from 'react';
import Modal from 'react-modal';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {FingerprintButton} from "../../components/ui/FingerprintButton"
import Drawer from '../../components/ui/Drawer'
const FacultyDetailsPage = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCapture = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
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

  return (
    <div className="text-gray-50 w-screen bg-slate-900 h-screen flex flex-col justify-center items-center">
      <Drawer />
      <div className="flex w-4/5 h-1/2 bg-gray-500 justify-center items-center">
        <p className='text-black'>channelI data</p>
      </div>
      <FingerprintButton onCapture={handleCapture} />
      {image && (
        <div className="flex justify-center items-center">
          <Stack spacing={2} direction="row">
            <Button onClick={handleView} variant="contained">View</Button>
            <Button onClick={handleSubmit} variant="contained" color="success">Submit</Button>
          </Stack>
        </div>
      )}
      <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="View Image">
        <h2>Captured Fingerprint</h2>
        <img src={image || ''} alt="Captured Fingerprint" />
        <Button onClick={closeModal} variant="contained" color="error">
            Close
        </Button>
      </Modal>
    </div>
  );
};

export default FacultyDetailsPage;
