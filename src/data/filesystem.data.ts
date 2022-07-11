const fileSystemData = [
  {
    _id: "root",
    title: "root",
    type: "directory",
    extension: null,
    children: ["dir1", "dir2", "file1"],
    content: null,
  },
  {
    _id: "dir1",
    title: "Documents",
    type: "directory",
    extension: null,
    children: [],
    content: null,
  },
  {
    _id: "dir2",
    title: "Photos",
    type: "directory",
    extension: null,
    children: [],
    content: null,
  },
  {
    _id: "file1",
    title: "hello.txt",
    type: "file",
    extension: ".txt",
    children: [],
    content: null,
  },
];

export default fileSystemData;
