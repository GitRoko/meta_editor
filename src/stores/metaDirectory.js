// //************************************************** */
// // Using Vue Test Utils in Vitest (need use happy-dom)!!!
// // https://www.youtube.com/watch?v=iNl6TA29hBM

import { defineStore } from 'pinia'
import { accessFolder, readDirectory, readFile } from '@/plugins/fileSystemAccessApi'
import Yaml from 'yaml'
import { ref, computed } from 'vue'
import { objectToArray } from '@/plugins/utils'

export const useMetaDirectoryStore = defineStore('metaDirectory', () => {
  // files object structure
  const files = ref(null)
  // index file object structure
  const index = ref(null)
  const directoryHandle = ref(null)
  const isLoad = ref(false)
  const currentFileName = ref('')

  function $reset() {
    files.value = null
    index.value = null
    directoryHandle.value = null
    isLoad.value = false
    currentFileName.value = ''
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

  const getCurrentFile = computed(() => {
    if (files.value) {
      return files.value.find(file => file.fileName === currentFileName.value)
    }
    return null
  })
  const filesNamesList = computed(() => {
    if (files.value) {
      return files.value.map((file) => file.fileName)
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

  const updateFileName = async (newName) => {
    await getCurrentFile.value.fileHandle.move(newName)
    getCurrentFile.value.fileName = newName
    currentFileName.value = newName
  }

  const readFolder = async () => {
    let directoryEntries = []
    let result = []

    if (directoryHandle.value) {
      directoryEntries = await readDirectory(directoryHandle.value)
    } else {
      await accessingFolder()
    }

    for await (const entry of directoryEntries) {
      let file = {
        fileHandle: entry.fileHandle,
        fileName: entry.fileName
      }
      let fileData = await readingFileData(entry.fileHandle)

      let parsedData = null
      try {
        parsedData = Yaml.parse(fileData)
      } catch (e) {
        console.error(e)
      }

      if (parsedData) {
        file.fileData = parsedData
        result.push(file)
      } else {
        throw new Error(`Can't parse file "${entry.fileName}", wrong YAML format or data.`)
      }
    }

    // find index file and separate it from the rest if exists, otherwise return null
    const indexFileIndex = result.findIndex(file => file.fileName === 'index.yaml')
    index.value = result.splice(indexFileIndex, 1)[0]

    //delete index file from result
    // if (index.value) delete result['index.yaml']

    // set files
    files.value = result

    // set first file in list as current file name
    currentFileName.value = filesNamesList.value[0]

    // transform fileData object to array and change structure of field object from {key: value} to {key: key, items: value} like in index file
    for (const key in result) {
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
    getCurrentFile,
    accessingFolder,
    readFolder,
    readingFileData,
    verifyPermission,
    updateFileName,
  }
})
