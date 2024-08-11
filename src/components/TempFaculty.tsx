import React, { useState } from "react";
import Drawer from '@/components/ui/Drawer';
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/input";
import Alert from "@mui/material/Alert";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { BottomGradient } from "@/components/ui/BottomGradient";
import Modal from 'react-modal';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { FingerprintButton } from "@/components/ui/FingerprintButton";


type StepIndicatorProps = {
  currentStep: number;
};

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [1, 2, 3];

  return (
    <div className="flex justify-center items-center mb-6">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div
            className={`px-4 py-2 rounded-full text-white ${
              currentStep >= step ? "bg-blue-600" : "bg-gray-400"
            }`}
          >
            {step}
          </div>
          {index < steps.length - 1 && (
            <div className="w-10 h-1 bg-gray-400 flex-shrink-0"></div>
          )}
        </div>
      ))}
    </div>
  );
};

const TempFacultyPage = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [selfPhoto, setSelfPhoto] = useState<string | null>(null);
  const [document, setDocument] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [details, setDetails] = useState({
    name: "",
    phone: "",
    idNumber: "",
    selfPhoto: "",
    document: ""
  });
  const [fingerprintImage, setFingerprintImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCapture = (file: File, setter: React.Dispatch<React.SetStateAction<string | null>>) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setter(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleView = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitStep1 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Reset error message

    if (!selfPhoto || !document) {
      setError("Please upload both self photo and document.");
      return;
    }

    // Store all details in the state to show in step 2
    setDetails({ name, phone, idNumber, selfPhoto, document });
    setStep(2);
  };
  const handleBackToStep1 = () => {
    setName("");
    setPhone("");
    setIdNumber("")
    setSelfPhoto("")
    setDocument("")
    setStep(1);
  };
  const handleSubmitStep3 = () => {
    if (fingerprintImage) {
      // Handle fingerprint image upload here
      console.log("Fingerprint uploaded:", fingerprintImage);
    } else {
      setError("Please upload a fingerprint image.");
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <form onSubmit={handleSubmitStep1}>
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
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="selfPhoto">Upload Self Photo</Label>
              <Input
                id="selfPhoto"
                type="file"
                accept="image/*"
                onChange={(e) => handleCapture(e.target.files?.[0]!, setSelfPhoto)}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="document">Upload Document</Label>
              <Input
                id="document"
                type="file"
                accept=".pdf,.doc,.docx,image/*"
                onChange={(e) => handleCapture(e.target.files?.[0]!, setDocument)}
              />
            </LabelInputContainer>
            <button
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Submit &rarr;
              <BottomGradient />
            </button>
          </form>
        );
      case 2:
        return (
          <div>
            <h3 className="font-bold text-xl text-white">Details</h3>
            <p className="text-white">Name: {details.name}</p>
            <p className="text-white">Phone Number: {details.phone}</p>
            <p className="text-white">ID Number: {details.idNumber}</p>
            {details.selfPhoto && (
              <>
                <h4 className="text-white">Self Photo:</h4>
                <img src={details.selfPhoto} alt="Self Photo" className="w-32 h-32 object-cover mb-4" />
              </>
            )}
            {details.document && (
              <>
                <h4 className="text-white h-min-screen">Uploaded Document:</h4>
                <img src={details.document} alt="Document" className="w-32 h-32 object-cover mb-4" />
                </>
            )}
            <button
              className=" my-2 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="button"
              onClick={handleBackToStep1}
            >
              &larr; Back
              <BottomGradient />
            </button>
            <button
              className=" my-2 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
              onClick={() => setStep(3)}
            >
              Confirm &rarr;
              <BottomGradient />
            </button>
          </div>
        );
      case 3:
        return (
          <div>
            <h3 className="font-bold text-xl text-white">Upload Fingerprint</h3>
            <FingerprintButton onCapture={(file) => handleCapture(file, setFingerprintImage)} />
            <button
              className=" my-2 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="button"
              onClick={() => setStep(2)}
            >
              &larr; Back
              <BottomGradient />
            </button>
            {fingerprintImage && (
              <div className="flex justify-center items-center">
                <Stack spacing={2} direction="row">
                  <Button onClick={handleView} variant="contained">
                    View
                  </Button>
                  <Button
                    onClick={handleSubmitStep3}
                    variant="contained"
                    color="success"
                  >
                    Submit
                  </Button>
                </Stack>
              </div>
            )}
            <Modal
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              contentLabel="View Image"
            >
              <h2>Captured Fingerprint</h2>
              <img src={fingerprintImage || ""} alt="Captured Fingerprint" />
              <Button onClick={closeModal} variant="contained" color="error">
                Close
              </Button>
            </Modal>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col bg-slate-900 justify-center items-center min-h-screen">
      <Drawer />
      <div className="my-12 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        {/* Step Indicator */}
        <StepIndicator currentStep={step} />
        
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 mb-6">
          Step {step} of 3
        </h2>
        {renderStepContent()}
        {error && (
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert variant="filled" severity="error">
              {error}
            </Alert>
          </Stack>
        )}
      </div>
    </div>
  );
};

export default TempFacultyPage;
