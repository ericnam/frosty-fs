const navigationData = [
  // {
  //   title: "Dashboard",
  //   sortOrder: 1,
  //   dropDown: false,
  //   route: "dashboard",
  // },
  {
    title: "My Files",
    sortOrder: 1,
    dropDown: true,
    route: "my-files",
    section: 1,
    isFileSystem: true,
  },
  {
    title: "Favorites",
    sortOrder: 1,
    dropDown: false,
    route: "favorites",
    section: 2,
    isFileSystem: false,
  },
  {
    title: "Recents",
    sortOrder: 2,
    dropDown: false,
    route: "recents",
    section: 2,
    isFileSystem: false,
  },
  {
    title: "Trash",
    sortOrder: 3,
    dropDown: false,
    route: "trash",
    section: 2,
    isFileSystem: false,
  },
];

export default navigationData;
