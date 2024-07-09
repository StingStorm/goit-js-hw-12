export default function fetchingGallery(userRequest) {
  const searchParams = new URLSearchParams({
    key: '44842729-8004d444f82c9829d0058eeb4',
    q: userRequest,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return fetch(`https://pixabay.com/api/?${searchParams}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      const { hits } = data;
      return hits;
    });
}
