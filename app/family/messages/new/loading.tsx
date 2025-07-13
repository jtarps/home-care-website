export default function NewMessageLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-1"></div>
                <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Form Skeleton */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-96 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {/* Client Selection Skeleton */}
              <div className="space-y-2">
                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-12 w-full bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Priority Skeleton */}
              <div className="space-y-2">
                <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-12 w-full bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Subject Skeleton */}
              <div className="space-y-2">
                <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-12 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Message Skeleton */}
              <div className="space-y-2">
                <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-32 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Common Topics Skeleton */}
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>

              {/* Submit Button Skeleton */}
              <div className="flex items-center justify-between pt-4">
                <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section Skeleton */}
        <div className="bg-white rounded-lg shadow-sm border mt-6">
          <div className="p-6 border-b">
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="h-5 w-20 bg-gray-200 rounded animate-pulse mb-2 mx-auto"></div>
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-3 mx-auto"></div>
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="h-5 w-20 bg-gray-200 rounded animate-pulse mb-2 mx-auto"></div>
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-3 mx-auto"></div>
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
