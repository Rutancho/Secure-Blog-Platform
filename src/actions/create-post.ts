'use server';


import type { Post } from "@prisma/client"; 
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/auth";
import { db } from "@/db";

const createPostSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(10)
});

interface CreateTopicFormState {
    errors:{
        title?: string[],
        content?: string[],
        _form?: string[]
    }
}

export async function createPost(
    slug: string,
    formState: CreateTopicFormState, 
    formData: FormData
): Promise<CreateTopicFormState> {
    const result = createPostSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content')
    });

    if(!result.success){
        return{
            errors: result.error.flatten().fieldErrors,
        };
    }

    const session = await auth();
    if(!session || !session.user){
        return{
            errors:{
                _form: ['You must signed in to do this'],
            },
        };
    }

    const topic = await db.topic.findFirst({
        where:{slug}
    });

    if(!topic){
        return{
            errors: {
                _form: ['Can not find topic']
            }
        }
    }

    return{
        errors: {}
    };

}