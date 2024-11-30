'use client'
import Link from 'next/link'
import React from 'react'
import SettingsModal from './SettingsModal'
import { usePathname } from 'next/navigation'

const Header = () => {
    const pathName = usePathname()

    return (
        <div>
            <div className='fixed left-0 p-4'>Focus Flare</div>
            <div className='fixed w-screen flex justify-center'>
                <div className='flex justify-between w-96 p-4'>
                    {
                        menuItems.map(item => {
                            let className = ''

                            if (item.link == pathName) {
                                className = 'text-purple-600 border-b-2 border-purple-900'
                            }
                            return <div key={item.title} className={className}>{item.item}</div>
                        })
                    }
                    <SettingsModal />
                </div>
            </div>
        </div>
    )
}

const menuItems = [
    {
        title: 'about',
        link: '/',
        item: <Link href={'/'}>about</Link>
    },
    {
        title: 'timer',
        link: '/timer',
        item: <Link href={'/timer'}>timer</Link>
    }
]

export default Header