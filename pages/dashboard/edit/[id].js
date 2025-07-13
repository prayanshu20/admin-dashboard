// pages/dashboard/edit/[id].js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { getListingById, updateListing } from '../../../data/listings';

export async function getServerSideProps({ params }) {
  const id = parseInt(params.id);
  const listing = getListingById(id);

  if (!listing) {
    return { notFound: true };
  }

  return {
    props: {
      listing,
    },
  };
}

export default function EditListing({ listing }) {
  const router = useRouter();
  const [title, setTitle] = useState(listing.title);
  const [status, setStatus] = useState(listing.status);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/listings/${listing.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, status }),
    });

    if (res.ok) {
      router.push('/dashboard');
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Listing</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title:</label>
          <input
            className="border px-3 py-2 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Status:</label>
          <select
            className="border px-3 py-2 w-full"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
