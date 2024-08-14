import React, { useState, useEffect } from "react";
import { basicAxiosPost } from "@/services/basic-axios";
import Drawer from "@/components/ui/Drawer";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/input";
import Alert from "@mui/material/Alert";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { BottomGradient } from "@/components/ui/BottomGradient";
import Stack from "@mui/material/Stack";

type StepIndicatorProps = {
  currentStep: number;
};

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const steps = [1, 2];

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

const RequestGatePassPage = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [selfPhoto, setSelfPhoto] = useState<string | null>(null);
  const [document, setDocument] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); 
  const [details, setDetails] = useState({
    name: "",
    phone: "",
    idNumber: "",
    selfPhoto: "",
    document: "",
  });

  useEffect(() => {
    if (error || successMessage) {
      const timer = setTimeout(() => {
        setError("");
        setSuccessMessage("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, successMessage]);

  const handleCapture = (
    file: File,
    setter: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setter(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitStep1 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); 

    if (!selfPhoto || !document) {
      setError("Please upload both self photo and document.");
      return;
    }

    setDetails({ name, phone, idNumber, selfPhoto, document });
    setStep(2);
  };

  const handleBackToStep1 = () => {
    setName("");
    setPhone("");
    setIdNumber("");
    setSelfPhoto("");
    setDocument("");
    setStep(1);
  };

  const handleSubmitStep2 = async () => {
    setError(""); 
    setSuccessMessage(""); 

    const creds = {
      name: details.name,
      phone: details.phone,
      idNumber: details.idNumber,
      selfPhoto: details.selfPhoto,
      document: details.document,
    };

    try {
        const response = await basicAxiosPost(
            "/your-endpoint", 
            creds
        );

      if (response.status === 200) {
        setSuccessMessage("Details submitted successfully!"); 
      } else {
        setError("Request failed. Please try again.");
      }
    } catch (err) {
      setError("Request not accepted. Please try again.");
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <form onSubmit={handleSubmitStep1}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Name"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="Phone Number"
                type="text"
                onChange={(e) => setPhone(e.target.value)}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="idNumber">ID Number</Label>
              <Input
                id="idNumber"
                placeholder="ID Number"
                type="text"
                onChange={(e) => setIdNumber(e.target.value)}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="selfPhoto">Upload Self Photo</Label>
              <Input
                id="selfPhoto"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleCapture(e.target.files?.[0]!, setSelfPhoto)
                }
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="document">Upload Document</Label>
              <Input
                id="document"
                type="file"
                accept=".pdf,.doc,.docx,image/*"
                onChange={(e) =>
                  handleCapture(e.target.files?.[0]!, setDocument)
                }
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
                <img
                  src={details.selfPhoto}
                  alt="Self Photo"
                  className="w-32 h-32 object-cover mb-4"
                />
              </>
            )}
            {details.document && (
              <>
                <h4 className="text-white h-min-screen">Uploaded Document:</h4>
                <img
                  src={details.document}
                  alt="Document"
                  className="w-32 h-32 object-cover mb-4"
                />
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
              onClick={handleSubmitStep2}
            >
              Confirm &rarr;
              <BottomGradient />
            </button>
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
          Step {step} of 2
        </h2>
        {renderStepContent()}
        {error && (
          <Stack
            sx={{ 
              width: "100%",
              position: "fixed", 
              top: "10px", 
              right: "10px", 
              zIndex: 1000 
            }}
            spacing={2}
          >
            <Alert variant="filled" severity="error">
              {error}
            </Alert>
          </Stack>
        )}
        {successMessage && (
          <Stack
            sx={{ 
              width: "100%",
              position: "fixed", 
              top: "10px", 
              right: "10px", 
              zIndex: 1000 
            }}
            spacing={2}
          >
            <Alert variant="filled" severity="success">
              {successMessage}
            </Alert>
          </Stack>
        )}
      </div>
    </div>
  );
};

export default RequestGatePassPage;
