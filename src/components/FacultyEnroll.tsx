import React from "react";
import Drawer from '@/components/ui/Drawer';
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/input";
import { basicAxiosPost } from "@/services/basic-axios";
import Alert from "@mui/material/Alert";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { BottomGradient } from "@/components/ui/BottomGradient";
import { useState } from "react";
import Modal from 'react-modal';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { FingerprintButton } from "@/components/ui/FingerprintButton";

type StepIndicatorProps = {
  currentStep: number; // Define the type for currentStep
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

const FacultyPage = () => {
  const [step, setStep] = useState(1);
  const [enrollment, setEnrollment] = useState("");
  const [error, setError] = useState("");
  const [details, setDetails] = useState(""); // Assuming you'll fetch details in step 2
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

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitStep1 = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Reset error message

    const creds = { username: enrollment };
    try {
      const response = await basicAxiosPost(
        "/your-endpoint", // replace with the actual endpoint
        creds
      );

      if (response.status === 200) {
        setDetails(response.data.details); // Replace with actual data
        setStep(2);
      } else {
        // setError("An error occurred. Please try again.");
        setStep(2);
      }
    } catch (err) {
      // setError("An error occurred. Please try again.");
      setStep(2);
    }
  };
  const handleBackToStep1 = () => {
    setEnrollment("");
    setDetails("");
    setImage(null);
    setStep(1);
  };
  const handleSubmitStep3 = () => {
    if (image) {
      // Handle image upload here
      console.log("Image uploaded:", image);
    } else {
      setError("Please upload an image.");
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <form onSubmit={handleSubmitStep1}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="text">Enter Employee ID</Label>
              <Input
                id="text"
                placeholder="Employee ID"
                type="text"
                onChange={(e) => setEnrollment(e.target.value)}
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
            <FingerprintButton onCapture={handleCapture} />
            <button
              className=" my-2 bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="button"
              onClick={() => setStep(2)}
            >
              &larr; Back
              <BottomGradient />
            </button>
            {image && (
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
              <img src={image || ""} alt="Captured Fingerprint" />
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
    <div className="flex flex-col bg-slate-900 justify-center items-center h-screen">
      <Drawer />
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
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

export default FacultyPage;
