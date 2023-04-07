// //************************************************** */
// // Using Vue Test Utils in Vitest (need use happy-dom)!!!
// // https://www.youtube.com/watch?v=iNl6TA29hBM

import { defineStore } from 'pinia'
import { accessFolder, readDirectory, readFile, renameFile } from '@/plugins/fileSystemAccessApi'
import Yaml from 'yaml'
// import { useCurrentFileStore } from "@/stores/currentFile";
// import { useIndexFileStore } from "@/stores/indexFile";
import { ref, computed } from 'vue'
import { objectToArray } from '@/plugins/utils'

export const useMetaDirectoryStore = defineStore('metaDirectory', () => {
  const files = ref(null)
  const index = ref(null)
  const directoryHandle = ref(null)
  const isLoad = ref(false)
  const currentFileName = ref('')
  // const filesNamesList = ref([]);

  function $reset() {
    files.value = null
    index.value = null
    directoryHandle.value = null
    isLoad.value = false
    currentFileName.value = ''
    // filesNamesList.value = [];
  }

  const getFiles = () => {
    return files
  }
  const getIndex = () => {
    return index
  }
  const getDirectoryHandle = () => {
    return directoryHandle
  }

  const getCurrentFileData = computed(() => {
    if (files.value) {
      let currentFileKey = Object.keys(files.value).find((key) => key === currentFileName.value)

      console.log(currentFileKey)
      return files.value[currentFileKey] || null

      // return files.value[currentFileName.value];
    }
    return null
  })
  const filesNamesList = computed(() => {
    if (files.value) {
      return Object.keys(files.value).map((key) => files.value[key].fileName)
    }
    return null
  })

  const accessingFolder = async () => {
    let result = await accessFolder()
    if (result) {
      directoryHandle.value = result
      await readFolder()
    } else {
      throw new Error('You must give permission to folder access')
    }
  }

  const updateFileName = async (oldFileName, newFileName) => {
    const file = files.value[oldFileName]
    let fileHandle = files.value[oldFileName].fileHandle
    
    await files.value[oldFileName].fileHandle.move(newFileName)

    renameFile(fileHandle, newFileName)

    files.value[newFileName] = file
    files.value[newFileName].fileName = newFileName

    currentFileName.value = newFileName

    delete files.value[oldFileName]
  }

  const readFolder = async () => {
    let directoryEntries = []
    let result = {}

    if (directoryHandle.value) {
      directoryEntries = await readDirectory(directoryHandle.value)
    } else {
      await accessingFolder()
    }

    for await (const entry of directoryEntries) {
      result[entry.fileName] = {
        fileData: await readingFileData(entry.fileHandle),
        fileHandle: entry.fileHandle,
        fileName: entry.fileName
      }

      let parsedData = null
      try {
        parsedData = Yaml.parse(result[entry.fileName].fileData)
      } catch (e) {
        console.error(e)
      }

      if (parsedData) {
        result[entry.fileName].fileData = parsedData
      } else {
        throw new Error(`Can't parse file "${entry.fileName}", wrong YAML format or data.`)
      }
    }

    // find index file and separate it from the rest if exists, otherwise return null
    index.value = result['index.yaml'] ? result['index.yaml'] : null

    // set indexData file data
    // const indexFileStore = useIndexFileStore();
    // indexFileStore.setFileData(result["index.yaml"]);

    //delete index file from result
    if (index.value) delete result['index.yaml']

    // set files
    files.value = result

    // create list of files names
    // for (const key in files.value) {
    //   filesNamesList.value.push(key);
    // }

    // set current file name
    currentFileName.value = filesNamesList.value[0]
    // const currentFileStore = useCurrentFileStore();
    // currentFileStore.setFileData(result[currentFileName.value]);

    // transform fileData object to array

    for (const key in result) {
      // eslint-disable-next-line no-debugger
      // debugger;
      files.value[key].fileData.fields = objectToArray(result[key].fileData.fields)
    }

    // set isLoad
    isLoad.value = files.value ? true : false
  }

  const readingFileData = async (fileHandle) => {
    const result = await readFile(fileHandle)
    return result
  }

  const verifyPermission = async (fileHandle, writable) => {
    const result = await fileHandle.queryPermission({ writable })
    return result
  }

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
    updateFileName
  }
})
