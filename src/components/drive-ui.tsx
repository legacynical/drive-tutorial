"use client";

import { useState, useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "src/components/ui/breadcrumb"; // Adjusted to @/
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "src/components/ui/tabs";
import {
  FileIcon,
  FolderIcon,
  GridIcon,
  ListIcon,
  Moon,
  PlusIcon,
  SearchIcon,
  Sun,
  UploadIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";

const initialDriveData = {
  root: {
    id: "root",
    name: "My Drive",
    type: "folder",
    children: ["folder1", "folder2", "file1", "file2"],
    path: [],
  },
  folder1: {
    id: "folder1",
    name: "Documents",
    type: "folder",
    children: ["folder3", "file3", "file4"],
    path: ["root"],
  },
  // ... rest of initialDriveData unchanged
};

type DriveItem = {
  id: string;
  name: string;
  type: string;
  children?: string[];
  size?: string;
  modified?: string;
  path: string[];
};

export function DriveUI() {
  const [currentFolder, setCurrentFolder] = useState<string>("root");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [breadcrumbPath, setBreadcrumbPath] = useState<string[]>([]);
  const [driveData] = useState<Record<string, DriveItem>>(initialDriveData);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleFolderClick = (folderId: string) => {
    setCurrentFolder(folderId);
    setBreadcrumbPath([...driveData[folderId].path, folderId]);
  };

  const handleBreadcrumbClick = (index: number) => {
    if (index === -1) {
      setCurrentFolder("root");
      setBreadcrumbPath([]);
      return;
    }
    const newPath = breadcrumbPath.slice(0, index + 1);
    setCurrentFolder(newPath[newPath.length - 1] ?? "root");
    setBreadcrumbPath(newPath);
  };

  const handleUploadClick = () => {
    alert(
      "Upload functionality would open a file picker in a real application",
    );
  };

  const renderFileIcon = (type: string) => {
    switch (type) {
      case "folder":
        return (
          <FolderIcon className="h-5 w-5 text-blue-500 dark:text-blue-400" />
        );
      case "document":
        return (
          <FileIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        );
      case "spreadsheet":
        return (
          <FileIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
        );
      case "pdf":
        return <FileIcon className="h-5 w-5 text-red-600 dark:text-red-400" />;
      case "image":
        return (
          <FileIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        );
      default:
        return <FileIcon className="h-5 w-5" />;
    }
  };

  const currentItems = driveData[currentFolder]?.children ?? [];

  return (
    <div className="flex h-screen flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="flex h-16 items-center border-b border-gray-200 px-6 dark:border-gray-800">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Drive
          </h1>
        </div>
        <div className="mx-4 flex-1">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() => handleBreadcrumbClick(-1)}
                  className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  My Drive
                </BreadcrumbLink>
              </BreadcrumbItem>
              {breadcrumbPath.slice(1).map((id, index) => (
                <>
                  <BreadcrumbSeparator key={`separator-${index}`} />
                  <BreadcrumbItem key={id}>
                    <BreadcrumbLink
                      onClick={() => handleBreadcrumbClick(index + 1)}
                      className="hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      {driveData[id].name}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="rounded-full"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <UserIcon className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <div className="relative mb-4">
            <div className="flex items-center rounded-md border border-gray-200 bg-gray-50 px-3 dark:border-gray-700 dark:bg-gray-800">
              <SearchIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                type="search"
                placeholder="Search in Drive"
                className="border-0 bg-transparent shadow-none focus-visible:ring-0"
              />
            </div>
          </div>
          <Button
            className="mb-4 w-full justify-start gap-2"
            onClick={handleUploadClick}
          >
            <PlusIcon className="h-4 w-4" />
            New
          </Button>
          <div className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              onClick={() => {
                setCurrentFolder("root");
                setBreadcrumbPath([]);
              }}
            >
              <FolderIcon className="h-4 w-4" />
              My Drive
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <UserIcon className="h-4 w-4" />
              Shared with me
            </Button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6 dark:bg-gray-800">
          <div className="mb-4 flex items-center justify-end">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <GridIcon
                  className={`h-4 w-4 ${viewMode === "grid" ? "text-blue-600 dark:text-blue-400" : ""}`}
                />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <ListIcon
                  className={`h-4 w-4 ${viewMode === "list" ? "text-blue-600 dark:text-blue-400" : ""}`}
                />
              </Button>
              <Button
                variant="outline"
                className="gap-2"
                onClick={handleUploadClick}
              >
                <UploadIcon className="h-4 w-4" />
                Upload
              </Button>
            </div>
          </div>

          <Tabs defaultValue="files" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="files">Files</TabsTrigger>
              <TabsTrigger value="shared">Shared</TabsTrigger>
            </TabsList>
            <TabsContent value="files">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {currentItems.map((itemId: string) => {
                    const item = driveData[itemId];
                    return (
                      <div
                        key={item.id}
                        className="group flex flex-col items-center rounded-lg border border-gray-200 bg-white p-4 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
                        onClick={() =>
                          item.type === "folder" && handleFolderClick(item.id)
                        }
                        style={{
                          cursor:
                            item.type === "folder" ? "pointer" : "default",
                        }}
                      >
                        <div className="mb-2 flex h-12 w-12 items-center justify-center">
                          {renderFileIcon(item.type)}
                        </div>
                        {item.type === "folder" ? (
                          <div className="text-center font-medium">
                            {item.name}
                          </div>
                        ) : (
                          <Link
                            href={`#file-${item.id}`}
                            className="text-center font-medium"
                          >
                            {item.name}
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
                  <div className="grid grid-cols-12 gap-4 border-b border-gray-200 bg-gray-50 p-3 font-medium dark:border-gray-700 dark:bg-gray-800">
                    <div className="col-span-6">Name</div>
                    <div className="col-span-3">Last modified</div>
                    <div className="col-span-3">Size</div>
                  </div>
                  {currentItems.map((itemId: string) => {
                    const item = driveData[itemId];
                    return (
                      <div
                        key={item.id}
                        className="grid grid-cols-12 gap-4 border-b border-gray-200 p-3 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                        onClick={() =>
                          item.type === "folder" && handleFolderClick(item.id)
                        }
                        style={{
                          cursor:
                            item.type === "folder" ? "pointer" : "default",
                        }}
                      >
                        <div className="col-span-6 flex items-center gap-2">
                          {renderFileIcon(item.type)}
                          {item.type === "folder" ? (
                            <div className="font-medium">{item.name}</div>
                          ) : (
                            <Link
                              href={`#file-${item.id}`}
                              className="font-medium"
                            >
                              {item.name}
                            </Link>
                          )}
                        </div>
                        <div className="col-span-3 text-gray-600 dark:text-gray-400">
                          {item.modified ?? "-"}
                        </div>
                        <div className="col-span-3 text-gray-600 dark:text-gray-400">
                          {item.size ?? "-"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </TabsContent>
            <TabsContent value="shared">
              <div className="flex h-40 items-center justify-center rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
                <p className="text-gray-500 dark:text-gray-400">
                  No shared files
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
