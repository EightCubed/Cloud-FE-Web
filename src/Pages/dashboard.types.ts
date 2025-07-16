export interface FileInfo {
    filename: string;
    filetype: "file" | "folder"
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
    absolutePath: string;
}

export interface DeleteHandlerResponse {
    success_count: number;
    failure_count: number;
    message: string
}