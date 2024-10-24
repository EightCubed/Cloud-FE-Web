export interface FileInfo {
    filename: string;
    filetype: "file" | "folder"
    absolutefilepath: string;
}

export interface FileNode {
    file: FileInfo;
    adjacent: FileNode[];
    filepath: string;
}

export interface TreeDirectoryResponse {
    data: FileNode;
    path: string[];
    message: string;
}