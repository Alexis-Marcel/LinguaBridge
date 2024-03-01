
export default function SimpleTable({formatData, data}) {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    {formatData.map((format) => (
                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        {format.name}
                      </th>
                    ))}
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only">View</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((session) => (
                    <tr key={session.id}>
                      {formatData.map((format) => (
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{session[format.data]}</td>
                      ))}
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          View<span className="sr-only">, {session.id}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }