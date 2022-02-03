/* This example requires Tailwind CSS v2.0+ */
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Image from 'next/image'
import Link from 'next/link'

const navigation = [
  { name: 'All items', href: '/' },
  { name: 'New item', href: '/new' },
]

export default function Navbar() {
  return (
    <Disclosure as="div" className="shadow-md mb-4">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                {/* Left Logo */}
                <Link href={'/'}>
                  <a className="flex-shrink-0 flex items-center">
                    <Image
                      className="block h-8 w-auto"
                      width={'32'}
                      height={'32'}
                      src="/logo.png"
                      alt="Logo"
                    />
                  </a>
                </Link>
                {/*Large device links*/}
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item, i) => (
                      <Link key={i} href={item.href}>
                        <a
                          key={item.name}
                          className="text-gray-700 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*Drop down links*/}
          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                  {item.name + 'halla'}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
