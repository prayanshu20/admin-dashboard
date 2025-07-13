import { isAuthenticated } from '../../lib/auth';
import { useState } from 'react';
import Head from 'next/head';

export async function getServerSideProps(context) {
  if (!isAuthenticated(context.req)) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const listings = [
    { id: 1, title: 'Hyundai i20', status: 'pending' },
    { id: 2, title: 'Toyota Innova', status: 'approved' },
    { id: 3, title: 'Honda City', status: 'rejected' },
    { id: 4, title: 'Suzuki Swift', status: 'pending' },
  ];

  return {
    props: { listings },
  };
}

export default function Dashboard({ listings }) {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filteredListings = listings
    .filter((item) => filter === 'all' || item.status === filter)
    .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));

  const handleLogout = () => {
    window.location.href = '/login';
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
      </Head>

      <div className="min-h-screen bg-gray-100 p-6 font-sans flex flex-col items-center">
        <div className="w-full max-w-6xl relative">
          <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">Admin Dashboard</h1>
          <h2 className="text-xl text-center text-gray-600 mb-6">Car Listings</h2>

          <button
            onClick={handleLogout}
            className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>

          {/* Filter Buttons */}
          <div className="flex justify-center mb-4 gap-2">
            {['all', 'pending', 'approved', 'rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3 py-1 rounded font-medium ${
                  filter === status ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="flex justify-center mb-6">
            <input
              type="text"
              placeholder="Search by car title..."
              className="px-4 py-2 border border-gray-300 rounded w-full max-w-md text-center"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded shadow bg-white">
            <table className="min-w-full text-center text-gray-700">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredListings.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-gray-500 italic">
                      No matching listings found.
                    </td>
                  </tr>
                ) : (
                  filteredListings.map((listing) => (
                    <tr key={listing.id} className="border-b hover:bg-gray-100">
                      <td className="px-6 py-4">{listing.id}</td>
                      <td className="px-6 py-4 font-medium">{listing.title}</td>
                      <td className="px-6 py-4 capitalize">{listing.status}</td>
                      <td className="px-6 py-4 flex items-center justify-center gap-2">
                        <button className="bg-green-500 text-white px-2 py-1 rounded text-sm hover:bg-green-600">
                          Approve
                        </button>
                        <button className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600">
                          Reject
                        </button>
                        <button className="bg-yellow-500 text-white px-2 py-1 rounded text-sm hover:bg-yellow-600">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
