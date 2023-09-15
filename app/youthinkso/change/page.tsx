'use client'
import { useState, useEffect, FormEvent } from 'react'
import { signOut } from 'next-auth/react'

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
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

interface Data {
  twitterLink: string
  telegramLink: string
  contractAddress: string
}

export default function Change() {
  const [data, setData] = useState<Data>({
    twitterLink: '',
    telegramLink: '',
    contractAddress: '',
  })
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.id]: e.target.value })
  }
  const fetchLinkData = async () => {
    const res = await fetch('/api/link')
    const data_fetch = await res.json()

    setData(data_fetch)
  }

  useEffect(() => {
    fetchLinkData()
  }, [])
  const { toast } = useToast()
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/')
    },
  })
  if (status === 'loading') {
    return <p>Loading....</p>
  }
  const toastSuccess = () => {
    toast({
      title: 'Success ✅ ',
      description: 'Your link has been changed ✅',
    })
  }

  const toastError = () => {
    toast({
      variant: 'destructive',
      title: 'Uh oh! Something went wrong.',
      description: 'There was a problem with your request.',
    })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (res.status === 200) {
      toastSuccess()
    } else {
      toastError()
    }
  }

  return (
    <div className='h-[100vh] w-full bg-slate-200 flex flex-col justify-start items-center'>
      <div className='flex w-full justify-end items-center p-4'>
        <Button
          className='w-15'
          onClick={() => signOut({ callbackUrl: '/youthinkso' })}
        >
          Logout
        </Button>
      </div>
      <Card className='min-w-[340px] w-1/2'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-2xl'>Change Your Link</CardTitle>
          <CardDescription>Change Your Link and Hit Save</CardDescription>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <span className='w-full border-t' />
            </div>
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='twitter link'>Twitter Link</Label>
            <Input
              id='twitterLink'
              type='string'
              placeholder='Twitter Link'
              className='text-[12px]'
              onChange={changeHandler}
              value={data.twitterLink}
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='telegram link'>Telegram Link</Label>
            <Input
              id='telegramLink'
              type='string'
              placeholder='Telegram Link'
              className='text-[12px]'
              onChange={changeHandler}
              value={data.telegramLink}
            />
          </div>
          <div className='grid gap-2'>
            <Label htmlFor='coin contract address'>Coin Contract Address</Label>
            <Input
              id='contractAddress'
              type='string'
              placeholder='Coin Contract Address'
              className='text-[12px]'
              onChange={changeHandler}
              value={data.contractAddress}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className='w-full'
            onClick={(e) => {
              submitHandler(e)
            }}
          >
            Save
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
