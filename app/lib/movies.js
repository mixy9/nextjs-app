export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch(
    'https://api.themoviedb.org/3/movie/550?api_key=a300ecd09165adc9d5756bea72c8642c',
  );
  return res.json();
}
