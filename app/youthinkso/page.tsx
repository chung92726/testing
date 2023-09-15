'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signIn } from 'next-auth/react'

export default function LoginPage() {
  return (
    <div className='w-full bg-slate-200 h-[100vh] flex justify-center items-center'>
      <Card>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl'>Admin Login In</CardTitle>
          {/* <CardDescription>👅👅👅👅👅👅👅👅👅👅</CardDescription> */}
        </CardHeader>
        {/* <CardContent className='grid gap-4'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background px-2 text-muted-foreground'>
                👀👀👀
              </span>
            </div>
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' type='email' placeholder='m@example.com' />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='password'>Password</Label>
            <Input id='password' type='password' />
          </div>
        </CardContent> */}
        <CardFooter>
          <Button
            className='w-full'
            onClick={() =>
              signIn('change', { callbackUrl: '/youthinkso/change' })
            }
          >
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
