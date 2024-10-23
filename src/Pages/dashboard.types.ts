export interface FileInfo {
    filename: string;
    filetype: "file" | "folder"
}

export interface FileNode {
    file: FileInfo
    adjacent: FileNode[]
}

export interface TreeDirectoryResponse {
    data: FileNode
    message: string;
}