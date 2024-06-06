import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <div className='flex justify-center items-center h-dvh'>
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>

        <CardContent>
          <form className='flex flex-col gap-4'>
            <Input type="text" placeholder='Username' />
            <Input type="email" placeholder='Email Address' />
            <Input type="password" placeholder='Password' />
            <Button type='submit'>Login</Button>
          </form>
        </CardContent>

        <CardFooter className='flex flex-col gap-4'>
          <span>or</span>
          <form>
            <Button
              type='submit'
              variant='outline'>
              Login with Google
            </Button>
          </form>

          <Link
            href='/login'
            className='text-sm flex gap-1'>
            Have an account?<span className="underline">Login</span>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUpPage;
