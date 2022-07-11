interface IFileSystemModel {
  title: string;
  type: string;
  extension: string;
  children: string[];
  content: string;
}

class FileSystemModel implements IFileSystemModel {
  title: string;
  type: string;
  extension: string;
  children: string[];
  content: string;

  constructor(gqlObject: any) {
    this.title = gqlObject.title;
    this.type = gqlObject.type;
    this.extension = gqlObject.extension;
    this.children = gqlObject.children;
    this.content = gqlObject.content;
  }
}

export { FileSystemModel };
