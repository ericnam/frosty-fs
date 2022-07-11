import fileSystemData from "@data/filesystem.data";

export default {
  Query: {
    fileSystem: () => {
      return fileSystemData;
    },
    directories: (parent: any, args: any, context: any, info: any) => {
      let directory = fileSystemData.find(
        (file) => file._id === args.directoryId
      );

      if (!!directory) {
        let children: string[] = directory.children;

        return fileSystemData.filter(
          (file) =>
            file.type === "directory" && children.indexOf(file._id) >= 0
        );
      } else {
        return null;
      }
    },
  },
};
