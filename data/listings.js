// data/listings.js
let listings = [
  { id: 1, title: "Hyundai i20", status: "pending" },
  { id: 2, title: "Toyota Innova", status: "pending" },
];

export function getListings() {
  return listings;
}

export function updateListing(id, updates) {
  listings = listings.map((item) =>
    item.id === id ? { ...item, ...updates } : item
  );
}

export function getListingById(id) {
  return listings.find((item) => item.id === id);
}
