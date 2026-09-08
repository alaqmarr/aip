import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import { createAdminUser } from "./actions"

export default async function SetupPage() {
  const userCount = await prisma.user.count()

  if (userCount > 0) {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-brand-sun rounded-full flex items-center justify-center text-brand-navy font-bold text-2xl">AIP</div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Initial Setup
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Create the first administrator account. This page will be disabled afterwards.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200">
          <form action={createAdminUser as any} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <div className="mt-1">
                <input id="name" name="name" type="text" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-sun focus:border-brand-sun sm:text-sm" />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <div className="mt-1">
                <input id="email" name="email" type="email" autoComplete="email" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-sun focus:border-brand-sun sm:text-sm" />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1">
                <input id="password" name="password" type="password" autoComplete="new-password" required className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-sun focus:border-brand-sun sm:text-sm" />
              </div>
            </div>

            <div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-navy hover:bg-brand-navy-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-sun">
                Create Admin Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
