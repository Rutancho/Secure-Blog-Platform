'use client';

import {
    NavbarItem,
    Avatar,
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent
} from '@nextui-org/react';
import { useSession, signIn, signOut } from 'next-auth/react';  // next-auth/react에서 직접 가져오기

export default function HeaderAuth(){
    const { data: session } = useSession();  // 세션 데이터를 구조분해할당으로 사용

    let authContent: React.ReactNode;
    if(session?.user){
        authContent =  
        <Popover placement="left">
            <PopoverTrigger>
                <Avatar src={session.user.image || ''}/>
            </PopoverTrigger>

            <PopoverContent>
                <div className='p-4'>
                    <Button onClick={() => signOut()} type="button">Sign Out</Button>  {/* signOut 함수를 사용 */}
                </div>
            </PopoverContent>
        </Popover>
    } else {
        authContent = (
        <>
        <NavbarItem>
            <Button onClick={() => signIn()} type="submit" color="secondary" variant="bordered">Sign In</Button>  {/* signIn 함수를 사용 */}
        </NavbarItem>

        <NavbarItem>
            <Button onClick={() => signOut()} type="submit" color="primary" variant="flat">Sign Out</Button>
        </NavbarItem>
        </>
        );
    }

    return authContent;
}
