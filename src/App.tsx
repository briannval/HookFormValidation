import React from 'react';
import './App.css';
import { z , ZodType } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react'

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  cpassword: string;
}

function App() {

  const UserSchema: ZodType<UserData> = z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(10),
    cpassword: z.string().min(10)
  }).refine((data) => data.password === data.cpassword,{
    message: "Not matching passwords!",
    path: ["cpassword"]
  })

  const {
    register,
    handleSubmit,
    formState: {errors , isSubmitting}, } = useForm<UserData>({resolver: zodResolver(UserSchema)})

  const submitData = (data: UserData) => {
    console.log("here is your data");
    console.log(data)
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit(submitData)}>
      <FormControl>
        <FormLabel>First Name:</FormLabel>
        <Input type="text" {...register("firstName")} />
        {errors.firstName && <span>{errors.firstName.message}</span>}
        <FormLabel>Last Name:</FormLabel>
        <Input type="text" {...register("lastName")} />
        {errors.lastName && <span>{errors.lastName.message}</span>}
        <FormLabel>Email:</FormLabel>
        <Input type="text" {...register("email")} />
        {errors.email && <span>{errors.email.message}</span>}
        <FormLabel>Password:</FormLabel>
        <Input type="password" {...register("password")} />
        {errors.password && <span>{errors.password.message}</span>}
        <FormLabel>Confirm Password:</FormLabel>
        <Input type="password" {...register("cpassword")} />
        {errors.cpassword && <span>{errors.cpassword.message}</span>}
        <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
        Submit
      </Button>
      </FormControl>
      </form>
    </div>
  );
}

export default App;
