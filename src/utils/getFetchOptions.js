import https from 'https';

const agent = new https.Agent({
  keepAlive: true,
});

export default function getFetchOptions() {
  return {
    headers: {
      'user-agent': 'byggreal',
    },
    agent,
    timeout: 6000,
  };
}
