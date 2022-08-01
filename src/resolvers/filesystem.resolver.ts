import fileSystemData from "@data/filesystem.data";

export default {
  Query: {
    fileSystem: () => {
      return fileSystemData;
    },
    files: (parent: any, args: any, context: any, info: any) => {
      console.log("files");
      return fileSystemData.filter((fs) => args.ids.indexOf(fs.fileId) >= 0);
    },
    favorite: (parent: any, args: any, context: any, info: any) => {
      console.log("fav");
      return fileSystemData.filter((fs) => fs.favorite);
    },
    trash: (parent: any, args: any, context: any, info: any) => {
      return fileSystemData.filter((fs) => fs.trash);
    },
    subDirectories: (parent: any, args: any, context: any, info: any) => {
      let directory = fileSystemData.find(
        (file) => file.fileId === args.directoryId
      );

      if (!!directory) {
        let children: string[] = directory.children;

        return fileSystemData.filter(
          (file) =>
            file.type === "directory" && children.indexOf(file.fileId) >= 0
        );
      } else {
        return null;
      }
    },
    directoryContent: (parent: any, args: any, context: any, info: any) => {
      let directory = fileSystemData.find(
        (file) => file.fileId === args.directoryId
      );

      if (!!directory) {
        let children: string[] = directory.children;

        return fileSystemData.filter(
          (file) => children.indexOf(file.fileId) >= 0
        );
      } else {
        return null;
      }
    },
  },
};
