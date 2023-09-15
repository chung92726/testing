'use client'
import { useEffect, useState } from 'react'
import Navbar from '../components/navbar/navbar_normal'
import { NextUIProvider } from '@nextui-org/react'

interface Data {
  twitterLink: string
  telegramLink: string
  contractAddress: string
}

const navoption = [
  {
    name: 'Contact',
    href: '#',
    Classes: '',
  },
  {
    name: 'Blog',
    href: '#',
    Classes: '',
  },
  {
    name: 'Work',
    href: '#',
    Classes: '',
  },
  {
    name: 'Home',
    href: '#',
    Classes: '',
  },
]

export default function Home() {
  const [data, setData] = useState<Data>({
    twitterLink: '',
    telegramLink: '',
    contractAddress: '',
  })
  const [uniswapLink, setUniswapLink] = useState<string>(
    'https://app.uniswap.org/#/swap?exactField=input&exactAmount=10&inputCurrency=ETH&outputCurrency='
  )
  const [dextoolLink, setDextoolLink] = useState<string>(
    'http://dextools.io/app/en/ether/pair-explorer/0xde90022e08a142d4a2d35aac8d1f2a0264d34ade'
  )
  const dextoolLink2 =
    'https://www.dextools.io/app/en/ether/pair-explorer/0x647b364ee561b8a00245d724309b9fa5c72fa65c'

  const fetchLinkData = async () => {
    const res = await fetch('/api/link', {
      next: { tags: ['update'] },
    })
    const data_fetch = await res.json()
    setData(data_fetch)
    setUniswapLink((uniswapLink) => uniswapLink + data_fetch.contractAddress)
    // setDextoolLink(
    //   (dextoolLink) =>
    //     dextoolLink +
    //     data_fetch.contractAddress +
    //     '?theme=light&chartType=2&chartResolution=30&drawingToolbars=false'
    // )
  }

  useEffect(() => {
    fetchLinkData()
  }, [])
  return (
    <NextUIProvider>
      <main className='flex min-h-screen flex-col items-center'>
        <Navbar />
        <h1 className='text-4xl font-bold text-center h-[200vh]'>
          Welcome to <a href='https://nextjs.org'>Next.js!</a>
          <a onClick={() => window.open(dextoolLink, '_blank')} target='_blank'>
            {dextoolLink2}
          </a>
        </h1>
      </main>
    </NextUIProvider>
  )
}
