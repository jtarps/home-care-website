export default function DashboardLoading() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header Skeleton */}
      <div className="bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse p-6 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-8 bg-gray-300 rounded w-64 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-96"></div>
          </div>
          <div className="text-right">
            <div className="h-6 bg-gray-300 rounded w-20 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-24"></div>
          </div>
        </div>
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white border rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <div className="h-5 w-5 bg-gray-300 rounded animate-pulse"></div>
              <div>
                <div className="h-4 bg-gray-300 rounded w-24 mb-1 animate-pulse"></div>
                <div className="h-8 bg-gray-300 rounded w-12 animate-pulse"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cards Skeleton */}
      {[1, 2].map((i) => (
        <div key={i} className="bg-white border rounded-lg">
          <div className="p-6 border-b">
            <div className="h-6 bg-gray-300 rounded w-48 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-64 animate-pulse"></div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[1, 2].map((j) => (
                <div key={j} className="border rounded-lg p-4">
                  <div className="h-4 bg-gray-300 rounded w-full mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Loading Indicator */}
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    </div>
  )
}
