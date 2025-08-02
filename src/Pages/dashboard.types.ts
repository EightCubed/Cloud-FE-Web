export enum FileType {
    FileTypeFile = "file",
    FileTypeFolder = "folder"
}

export interface FileInfo {
    filename: string;
    filetype: FileType
    absolutefilepath: string;
}

export interface FileNode {
    file: FileInfo;
    children: FileNode[];
    filepath: string;
    parentdirectory: string;
}

export interface TreeDirectoryResponse {
    data: FileNode;
    path: BreadCrumbType[];
    message: string;
}

export interface UploadHandlerResponse {
    success: boolean;
    message: string;
}

export interface BreadCrumbType {
    title: string;
    relativePath: string;
}
