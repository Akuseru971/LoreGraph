import type { NextConfig } from "next";

const slugRedirects = [
  ["kai-sa", "kaisa"],
  ["cho-gath", "chogath"],
  ["kha-zix", "khazix"],
  ["leblanc", "leblanc"],
  ["rek-sai", "reksai"],
  ["k-sante", "ksante"],
  ["nunu", "nunu-willump"],
  ["bel-veth", "belveth"],
  ["vel-koz", "velkoz"],
  ["dr-mundo", "dr-mundo"],
  ["miss-fortune", "miss-fortune"],
  ["twisted-fate", "twisted-fate"],
];

const nextConfig: NextConfig = {
  async redirects() {
    return slugRedirects.map(([from, to]) => ({
      source: `/champion/${from}`,
      destination: `/champion/${to}`,
      permanent: true,
    }));
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ddragon.leagueoflegends.com",
        pathname: "/cdn/**",
      },
    ],
  },
};

export default nextConfig;
