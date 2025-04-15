/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  async redirects() {
    // route group 배열 선언
    const noteRouteGroups = ['note']; // note 서브도메인으로 접근할 route group들
    const galleryRouteGroups = ['gallery', 'interactive']; // gallery 서브도메인으로 접근할 route group들

    const redirectRules = [];

    // 1. 메인 도메인에서 note route group 접근 시 note 서브도메인으로 리다이렉트
    noteRouteGroups.forEach((group) => {
      redirectRules.push({
        source: `/${group}/:path*`,
        has: [
          {
            type: 'host',
            value: 'haeram.life',
          },
        ],
        destination: `https://note.haeram.life/${group}/:path*`,
        permanent: false,
      });
    });

    // 2. 메인 도메인에서 gallery route group 접근 시 gallery 서브도메인으로 리다이렉트
    galleryRouteGroups.forEach((group) => {
      redirectRules.push({
        source: `/${group}/:path*`,
        has: [
          {
            type: 'host',
            value: 'haeram.life',
          },
        ],
        destination: `https://gallery.haeram.life/${group}/:path*`,
        permanent: false,
      });
    });

    // 3. note 서브도메인에서 특정 route group이 아닌 경로는 메인 도메인으로 리다이렉트
    // 배열을 동적으로 정규식에 반영
    const noteGroupPattern = noteRouteGroups.join('|');
    redirectRules.push({
      source: '/',
      has: [
        {
          type: 'host',
          value: 'note.haeram.life',
        },
      ],
      destination: 'https://haeram.life/',
      permanent: false,
    });

    redirectRules.push({
      source: `/:path((?!${noteGroupPattern}).*)*`,
      has: [
        {
          type: 'host',
          value: 'note.haeram.life',
        },
      ],
      destination: 'https://haeram.life/:path*',
      permanent: false,
    });

    // 4. gallery 서브도메인에서 특정 route group이 아닌 경로는 메인 도메인으로 리다이렉트
    // 배열을 동적으로 정규식에 반영
    const galleryGroupPattern = galleryRouteGroups.join('|');
    redirectRules.push({
      source: '/',
      has: [
        {
          type: 'host',
          value: 'gallery.haeram.life',
        },
      ],
      destination: 'https://haeram.life/',
      permanent: false,
    });

    redirectRules.push({
      source: `/:path((?!${galleryGroupPattern}).*)*`,
      has: [
        {
          type: 'host',
          value: 'gallery.haeram.life',
        },
      ],
      destination: 'https://haeram.life/:path*',
      permanent: false,
    });

    return redirectRules;
  },
};

export default nextConfig;
