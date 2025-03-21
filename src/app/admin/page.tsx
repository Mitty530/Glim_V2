'use client'

import React, { useEffect, useState } from 'react'

interface WaitlistEntry {
  firstName: string;
  email: string;
  waitlistPosition: number;
  createdAt: string;
  comments?: string;
}

interface WaitlistData {
  totalSignups: number;
  entries?: WaitlistEntry[];
  error?: string;
}

export default function AdminPage() {
  const [waitlistData, setWaitlistData] = useState<WaitlistData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWaitlistData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/api/waitlist/admin', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        
        if (!response.ok) {
          throw new Error('Failed to fetch waitlist data')
        }
        
        const data = await response.json()
        
        if (data.error) {
          setError(data.error)
        } else {
          setWaitlistData(data)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchWaitlistData()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <div className="animate-spin w-10 h-10 border-t-2 border-blue-500 rounded-full mx-auto mb-4"></div>
          <p>Loading waitlist data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="max-w-md mx-auto bg-red-900/30 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Waitlist Admin</h1>
        
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Waitlist Summary</h2>
          <p className="text-2xl font-bold text-blue-400">
            Total Signups: {waitlistData?.totalSignups || 0}
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Data source: {waitlistData?.entries?.length ? 'Supabase & Local Storage' : 'Local Storage'}
          </p>
        </div>
        
        {waitlistData?.entries && waitlistData.entries.length > 0 ? (
          <div className="bg-gray-800 rounded-lg p-6 overflow-x-auto">
            <h2 className="text-xl font-bold mb-4">Waitlist Entries</h2>
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-300 uppercase tracking-wider">
                    Comments
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {waitlistData.entries.map((entry, index) => (
                  <tr key={entry.email || index} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      #{entry.waitlistPosition || index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {entry.firstName || 'Unknown'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {entry.email || 'No email'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {entry.createdAt ? new Date(entry.createdAt).toLocaleDateString() : 'Unknown'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {entry.comments || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-6">
            <p className="text-gray-400">No waitlist entries yet.</p>
          </div>
        )}
      </div>
    </div>
  )
} 