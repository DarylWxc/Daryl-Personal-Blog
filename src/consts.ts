// Central site configuration, ported from the old Hexo/Butterfly _config files.

export const SITE = {
  title: "DarylWxc",
  subtitle: "",
  author: "DarylWxc",
  description: "DarylWxc's personal blog",
  language: "en",
  since: 2019,
  // Background image shown behind the whole site (Butterfly: `background`).
  webBackground: "/img/ghost-blade.jpg",
  // Default banner / cover image (Butterfly: index_img / default_top_img).
  defaultBanner: "/img/Princess.png",
  avatar: "/img/Aren.jpg",
  github: "https://github.com/DarylWxc",
  announcement: "My favorite music type is melodic progressive house",
  // Fixed-bottom NetEase player playlist id (start paused).
  neteasePlaylist: "8515499831",
};

export type NavItem = { name: string; href: string; icon: string };

// Top navigation — order & icons mirror the old Butterfly menu.
export const NAV: NavItem[] = [
  { name: "Home", href: "/", icon: "fas fa-home" },
  { name: "Archives", href: "/archives/", icon: "fas fa-archive" },
  { name: "Tags", href: "/tags/", icon: "fas fa-tags" },
  { name: "Categories", href: "/categories/", icon: "fas fa-folder-open" },
  { name: "About", href: "/about/", icon: "fas fa-heart" },
];

export type SocialItem = { name: string; href: string; icon: string; color: string };

export const SOCIAL: SocialItem[] = [
  { name: "Github", href: "https://github.com/DarylWxc", icon: "fab fa-github", color: "#24292e" },
  { name: "Email", href: "mailto:DarylWxc@outlook.com", icon: "far fa-envelope", color: "#24292e" },
  { name: "Youtube", href: "https://www.youtube.com", icon: "fab fa-youtube", color: "#FF0000" },
  { name: "MyFavorite", href: "https://soundcloud.com/roaldvelden", icon: "fas fa-music", color: "#FF5500" },
];

export const PAGE_SIZE = 10;
