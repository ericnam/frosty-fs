import fileSystemData from "@data/filesystem.data";
import jsonData from "@data/fileSystem.data.json";
import fs from "fs";

export default {
  Query: {
    fileSystem: () => {
      return fileSystemData;
    },
    files: (parent: any, args: any, context: any, info: any) => {
      return jsonData.filter((fs) => args.ids.indexOf(fs.fileId) >= 0);
    },
    favorite: (parent: any, args: any, context: any, info: any) => {
      return jsonData.filter((fs) => fs.favorite);
    },
    trash: (parent: any, args: any, context: any, info: any) => {
      return jsonData.filter((fs) => fs.trash);
    },
    recent: (parent: any, args: any, context: any, info: any) => {
      let currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() - 1);
      return fileSystemData.filter((fs) => fs.lastUpdated >= currentDate);
    },
    subDirectories: (parent: any, args: any, context: any, info: any) => {
      let directory = jsonData.find((file) => file.fileId === args.directoryId);

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
      let directory = jsonData.find((file) => file.fileId === args.directoryId);

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
  Mutation: {
    setFavorites: (parent: any, args: any, context: any, info: any) => {
      console.log(args);
      let { fileIds, favoriteFlag } = args;
      for (let file of jsonData) {
        if (fileIds.indexOf(file.fileId) >= 0) {
          file.favorite = favoriteFlag;
        }
      }

      console.log(jsonData);

      fs.writeFile(
        "./../data/filesystem.data.json",
        JSON.stringify(jsonData),
        (err) => {
          console.log(err);
        }
      );

      return true; 
    },
  },
};
