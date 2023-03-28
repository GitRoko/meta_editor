// //************************************************** */
// // Using Vue Test Utils in Vitest (need use happy-dom)!!!
// // https://www.youtube.com/watch?v=iNl6TA29hBM

import { defineStore } from "pinia";
import { accessFolder, readDirectory, readFile } from "@/plugins/fileSystemAccessApi";
import Yaml from "yaml";
// import { useCurrentFileStore } from "@/stores/currentFile";
// import { useIndexFileStore } from "@/stores/indexFile";
import { ref, computed } from "vue";

export const useMetaDirectoryStore = defineStore("metaDirectory", () => {
  const files = ref(null);
  const index = ref(null);
  const directoryHandle = ref(null);
  const isLoad = ref(false);
  const currentFileName = ref("");
  const filesNamesList = ref([]);

  function $reset() {
    files.value = null;
    index.value = null;
    directoryHandle.value = null;
    isLoad.value = false;
    currentFileName.value = "";
    filesNamesList.value = [];
  }

  const getFiles = () => {
    return files;
  };
  const getIndex = () => {
    return index;
  };
  const getDirectoryHandle = () => {
    return directoryHandle;
  };

  const getCurrentFileData = computed(() => {
    if (files.value) {
      return files.value[currentFileName.value];
    }
    return null;
  });

  const accessingFolder = async () => {
    let result = await accessFolder();
    if (result) {
      directoryHandle.value = result;
      await readFolder();
    } else {
      throw new Error("You must give permission to folder access");
    }
  };

  const readFolder = async () => {
    let directoryEntries = [];
    let result = {};

    if (directoryHandle.value) {
      directoryEntries = await readDirectory(directoryHandle.value);
    } else {
      await accessingFolder();
    }
    
    for await (const entry of directoryEntries) {
      result[entry.fileName] = {
        fileData: await readingFileData(entry.fileHandle),
        fileHandle: entry.fileHandle,
        fileName: entry.fileName,
      };
      let parsedData = null;
      try {
        parsedData = Yaml.parse(result[entry.fileName].fileData);
      } catch (e) {
        console.error(e);
      }

      if (parsedData) {
        result[entry.fileName].fileData = parsedData;
      } else {
        throw new Error(
          `Can't parse file "${entry.fileName}", wrong YAML format or data.`
        );
      }
    }

    // find index file and separate it from the rest if exists, otherwise return null
    index.value = result["index.yaml"] ? result["index.yaml"] : null;

    // set indexData file data
    // const indexFileStore = useIndexFileStore();
    // indexFileStore.setFileData(result["index.yaml"]);

    //delete index file from result
    if (index.value) delete result["index.yaml"];

    // set files
    files.value = result;

    // create list of files names
    for (const key in files.value) {
      filesNamesList.value.push(key);
    }

    // set current file name
    currentFileName.value = filesNamesList.value[0];
    // const currentFileStore = useCurrentFileStore();
    // currentFileStore.setFileData(result[currentFileName.value]);
    

    // set isLoad
    isLoad.value = files.value ? true : false;
  };

  const readingFileData = async (fileHandle) => {
    const result = await readFile(fileHandle);
    return result;
  };

  const verifyPermission = async (fileHandle, writable) => {
    const result = await fileHandle.queryPermission({ writable });
    return result;
  };

  return {
    $reset,
    files,
    index,
    directoryHandle,
    isLoad,
    currentFileName,
    filesNamesList,
    getFiles,
    getIndex,
    getDirectoryHandle,
    getCurrentFileData,
    accessingFolder,
    readFolder,
    readingFileData,
    verifyPermission,
  };
});
