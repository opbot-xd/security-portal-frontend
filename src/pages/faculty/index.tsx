import React from "react";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/input";
import {LabelInputContainer} from "@/components/ui/LabelInputContainer"
import {BottomGradient} from "@/components/ui/BottomGradient"
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Drawer from '@/components/ui/Drawer'
import {  channelI_POST } from '@/services/basic-axios';


const FacultyPage = () => {
  const [fid, setFid] = React.useState("");
  const [error, setError] = React.useState(""); // State to manage error message

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Reset error message

    const creds = { username: fid };

    try {
      const response = await channelI_POST(
        '/your-endpoint', // replace with the actual endpoint
        creds
      );

      console.log(response.data);

      if (response.status === 200) {
        const dynamicUrl = `/student/${fid}`;
        window.location.href = dynamicUrl;
      } else {
        setError("An error occurred. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFid(e.target.value);
};


  return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-900">
      <Drawer />
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Enter the Faculty Id
        </h2>
        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor='text'>Faculty Id</Label>
            <Input id="text" placeholder="Faculty Id" type="text" onChange={onChangeId} />
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

export default FacultyPage;
