import ArtisteLogo3 from "../assets/images/svgs/ArtisteLogo3";
export const onboardingData = [
  {
    title: "Earn as You Listen",
    description: "Earn rewards by streaming and giving feedback on music.",
    image: require("../assets/images/images_ratio.png"),
    progress: 1,
  },
  {
    title: "run feedback campaigns",
    description:
      "Get music enthusiasts to listen to your music, give valuable feedbacks, and grow your fan base.",
    image: require("../assets/images/images_ratio.png"),
    progress: 2,
  },
  {
    title: "Find and spotlight Talents",
    description:
      "Find talents and gain insights from running feedback campaigns.",
    image: require("../assets/images/images_ratio.png"),
    progress: 3,
  },
];

export const profileTypes = [
  {
    id: "listener",
    label: "Listeners",
    description:
      "Earn and redeem rewards by listening  to music and giving feedback in split seconds. ",
    emoji: ArtisteLogo3,
  },
  {
    id: "artiste",
    label: "Artistes",
    description:
      "Run feedback campaigns, and reach a wider audience of potential fans and music professionals. ",
    emoji: ArtisteLogo3 ,
  },
  {
    id: "music-pro",
    label: "Music Pros",
    description:
      "Anonymously give feedbacks, run campaigns, and discover talent.",
    emoji: ArtisteLogo3,
  },
];
