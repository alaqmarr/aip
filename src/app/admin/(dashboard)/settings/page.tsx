import prisma from "@/lib/prisma"
import { saveSettings } from "./actions"

export default async function SettingsPage() {
  const settingsRecords = await prisma.setting.findMany()
  const settings = settingsRecords.reduce((acc, curr) => {
    acc[curr.key] = curr.value
    return acc
  }, {} as Record<string, string>)

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>
        <p className="text-gray-500 mt-2">Manage contact details and global site preferences.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 max-w-2xl">
        <form action={saveSettings as any} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
            <input 
              name="WHATSAPP_NUMBER" 
              defaultValue={settings['WHATSAPP_NUMBER'] || ''} 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-sun focus:border-brand-sun outline-none" 
              placeholder="+91 98765 43210"
            />
            <p className="text-xs text-gray-500 mt-1">Include country code. Used for floating buttons.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
            <input 
              name="CONTACT_PHONE" 
              defaultValue={settings['CONTACT_PHONE'] || ''} 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-sun focus:border-brand-sun outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
            <input 
              name="CONTACT_EMAIL" 
              type="email"
              defaultValue={settings['CONTACT_EMAIL'] || ''} 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-sun focus:border-brand-sun outline-none" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Physical Address</label>
            <textarea 
              name="ADDRESS" 
              defaultValue={settings['ADDRESS'] || ''} 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-brand-sun focus:border-brand-sun outline-none resize-none" 
              rows={3}
            />
          </div>
          <div>
            <button type="submit" className="bg-brand-navy hover:bg-brand-navy-light text-white px-6 py-2 rounded-md font-medium transition-colors">
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
