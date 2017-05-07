import https from 'https';

const agent = new https.Agent({
  keepAlive: true,
});

export default function getFetchOptions() {
  return {
    headers: {
      'user-agent': 'api.kennethaasan.no',
    },
    agent,
    timeout: 6000,
  };
}
