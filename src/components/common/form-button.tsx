'use client';

import { useFormStatus } from "react-dom";
import { Button, chip } from "@nextui-org/react";
import React, { Children } from "react";

interface FormButtonProps{
    children: React.ReactNode;
}


export default function FormButton({children}: FormButtonProps){

    const { pending } = useFormStatus();
    
    

    return (
    <Button type = "submit" isLoading={pending}>
      {children}
    </Button>
    )
}