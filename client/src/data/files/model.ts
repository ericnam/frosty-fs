export interface IFileModel {
  fileId: string;
  parentId: string;
  title: string;
  type: string;
  extension: string;
  children: string[];
  content: string;
  active: boolean;
}

class FileModel implements IFileModel {
  fileId: string;
  parentId: string;
  title: string;
  type: string;
  extension: string;
  children: string[];
  content: string;
  active: boolean;

  constructor(gqlObject: any) {
    this.fileId = gqlObject.filedId;
    this.parentId = gqlObject.parentId;
    this.title = gqlObject.title;
    this.type = gqlObject.type;
    this.extension = gqlObject.extension;
    this.children = gqlObject.children;
    this.content = gqlObject.content;

    this.active = false;
  }
}

export { FileModel };
