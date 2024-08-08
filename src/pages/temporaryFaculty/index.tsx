import React, { useState } from 'react';
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/input";
import Alert from '@mui/material/Alert';
import Modal from 'react-modal';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { BottomGradient } from "@/components/ui/BottomGradient";
import { FingerprintButton } from "@/components/ui/FingerprintButton";
import { PhotoUploadButton } from "@/components/ui/PhotoUploadButton";
import { DocumentUploadButton } from "@/components/ui/DocumentUploadButton";
import Drawer from '@/components/ui/Drawer';
import axios from 'axios';

function TemporaryFaculty() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [idNumber, setIdNumber] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccues] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [photo, setPhoto] = useState<string | null>(null);
    const [idDocument, setIdDocument] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [openPhotoModal, setOpenPhotoModal] = useState(false);
    const [openIdDocumentModal, setOpenIdDocumentModal] = useState(false);
    const handleMainSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
            setError("");
            setSuccues("");
            e.preventDefault();
            const creds = { name: name, phone:phone, id:idNumber, fingerprint:image, photo:photo, IdDocument: idDocument  };
            try {
                const response = await axios.post(``, creds);
                console.log(response.data);
                if (response.status === 200) {
                  setSuccues("Added successfully.")
                  const dynamicUrl = `/enroll`;
                  window.location.href = dynamicUrl;
                } else {
                  setError("An error occurred. Please try again.");
                }
              } catch (err) {
                setError("An error occurred. Please try again.");
            }
        };
    const handleCapture = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handlePhotoCapture = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setPhoto(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleDocumentCapture = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setIdDocument(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleView = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    
    const handleOpenPhotoModal = () => setOpenPhotoModal(true);
    const handleClosePhotoModal = () => setOpenPhotoModal(false);

    const handleOpenIdDocumentModal = () => setOpenIdDocumentModal(true);
    const handleCloseIdDocumentModal = () => setOpenIdDocumentModal(false);

    
    
    return (
        <div className="flex bg-slate-900 min-h-screen flex-col justify-center items-center">
            <Drawer />
            <div className="mt-12 mb-12 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                    Enter your details
                </h2>
                <form className="my-8" onSubmit={handleMainSubmit}>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor='name'>Name</Label>
                        <Input id="name" placeholder="Name" type="text" onChange={(e) => setName(e.target.value)} />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor='phone'>Phone Number</Label>
                        <Input id="phone" placeholder="Phone Number" type="text" onChange={(e) => setPhone(e.target.value)} />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor='idNumber'>ID Number</Label>
                        <Input id="idNumber" placeholder="ID Number" type="text" onChange={(e) => setIdNumber(e.target.value)} />
                        <div className="flex justify-center">
                            <FingerprintButton onCapture={handleCapture} />
                            {image && (
                                <div className="flex justify-center items-center">
                                    <Stack spacing={2} direction="row">
                                        <Button onClick={handleView} variant="contained">View</Button>
                                    </Stack>
                                </div>
                            )}
                        </div>
                        <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="View Image">
                            <h2>Captured Fingerprint</h2>
                            <img src={image || ''} alt="Captured Fingerprint" />
                            <Button onClick={closeModal} variant="contained" color="error">
                                Close
                            </Button>
                        </Modal>
                    </LabelInputContainer>

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor='photo'>Upload Photo</Label>
                        <div className="flex justify-center">
                            <PhotoUploadButton onCapture={handlePhotoCapture} />
                            {photo && (
                                <div className="flex justify-center items-center">
                                    <Stack spacing={2} direction="row">
                                        <Button onClick={handleOpenPhotoModal} variant="contained">View</Button>
                                    </Stack>
                                </div>
                            )}
                        </div>
                        <Modal isOpen={openPhotoModal} onRequestClose={handleClosePhotoModal} contentLabel="View Photo">
                            <h2>Uploaded Photo</h2>
                            <img src={photo || ''} alt="Uploaded Photo" />
                            <Button onClick={handleClosePhotoModal} variant="contained" color="error">
                                Close
                            </Button>
                        </Modal>
                    </LabelInputContainer>

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor='idDocument'>Upload ID Document</Label>
                        <div className="flex justify-center">
                            <DocumentUploadButton onCapture={handleDocumentCapture} />
                            {idDocument && (
                                <div className="flex justify-center items-center">
                                    <Stack spacing={2} direction="row">
                                        <Button onClick={handleOpenIdDocumentModal} variant="contained">View</Button>
                                    </Stack>
                                </div>
                            )}
                        </div>
                        <Modal isOpen={openIdDocumentModal} onRequestClose={handleCloseIdDocumentModal} contentLabel="View ID Document">
                            <h2>Uploaded ID Document</h2>
                            <embed src={idDocument || ''} type="application/pdf" width="100%" height="600px" />
                            <Button onClick={handleCloseIdDocumentModal} variant="contained" color="error">
                                Close
                            </Button>
                        </Modal>
                    </LabelInputContainer>

                    <button
                        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                        type="submit"
                    >
                        Submit &rarr;
                        <BottomGradient />
                    </button>
                    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
                </form>
                {error && (
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert variant="filled" severity="error">{error}</Alert>
                    </Stack>
                )}
                {success && (
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert variant="filled" severity="success">{success}</Alert>
                    </Stack>
                )}
            </div>
        </div>
    );
}

export default TemporaryFaculty;
