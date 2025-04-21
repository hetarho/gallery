/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  async redirects() {
    const redirectRules = [];

    // note 서브도메인에서 메인 도메인으로 리다이렉트 (note 경로 추가)
    redirectRules.push({
      source: '/:path*',
      has: [
        {
          type: 'host',
          value: 'note.haeram.life',
        },
      ],
      destination: 'https://haeram.life/note/:path*',
      permanent: false,
    });

    // gallery 서브도메인에서 메인 도메인으로 리다이렉트 (gallery 경로 추가)
    redirectRules.push({
      source: '/:path*',
      has: [
        {
          type: 'host',
          value: 'gallery.haeram.life',
        },
      ],
      destination: 'https://haeram.life/gallery/:path*',
      permanent: false,
    });

    // gallery 서브도메인에서 메인 도메인으로 리다이렉트 (gallery 경로 추가)
    redirectRules.push({
      source: '/:path*',
      has: [
        {
          type: 'host',
          value: 'profile.haeram.life',
        },
      ],
      destination: 'https://haeram.life/profile/:path*',
      permanent: false,
    });

    return redirectRules;
  },
};

export default nextConfig;
