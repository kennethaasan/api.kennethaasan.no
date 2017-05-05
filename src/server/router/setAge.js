export default function setAge(res, maxAge = 10) {
  const expires = new Date();
  const lastModified = expires.toUTCString();
  expires.setSeconds(expires.getSeconds() + maxAge);

  res.set({
    'Cache-Control': `public,max-age=${maxAge}`,
    Expires: expires.toUTCString(),
    'Last-Modified': lastModified,
  });
}
