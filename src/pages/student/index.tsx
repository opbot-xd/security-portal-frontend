import React from "react";
import { Label } from "../../components/ui/Label";
import { Input } from "../../components/ui/input";
import axios from "axios";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import {LabelInputContainer} from "../../components/ui/LabelInputContainer"
import {BottomGradient} from "../../components/ui/BottomGradient"
import Drawer from '../../components/ui/Drawer'


const StudentPage = () => {
  const [enrollment, setEnrollment] = React.useState("");
  const [error, setError] = React.useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Reset error message
    console.log("hello");
    const creds = { username: enrollment };
    try {
      const response = await axios.post(``, creds);
      console.log(response.data);
      if (response.status === 200) {
        const dynamicUrl = `/student/${enrollment}`;
        window.location.href = dynamicUrl;
      } else {
        setError("An error occurred. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  const onChangeEnrollment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnrollment(e.target.value);
  };

  return (
    <div className="flex flex-col bg-slate-900 justify-center items-center h-screen">
      <Drawer />
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Enter the enrollment number
        </h2>
        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor='text'>Enrollment Number</Label>
            <Input id="text" placeholder="Enrollment Number" type="text" onChange={onChangeEnrollment} />
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
      </div>
    </div>
  );
};

export default StudentPage;
