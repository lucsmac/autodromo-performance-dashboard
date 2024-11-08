export const setUpQuery = (url: string): string => {
  const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
  const targetUrl = encodeURIComponent(url)
  const key = process.env.GOOGLE_API_KEY;
  const category = 'performance';
  const strategy = 'mobile'

  const query = `${api}?url=https://${targetUrl}&key=${key}&category=${category}&strategy=${strategy}`;

  return query;
}