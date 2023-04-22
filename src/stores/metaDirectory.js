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

  const getCurrentFileData = computed(() => {
    if (files.value) {
      return files.value[currentFileName.value]
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

  const updateFileName = async (updateData) => {
    const { oldName, newName } = updateData
    await files.value[oldName].fileHandle.move(newName)

    files.value[newName] = files.value[oldName]
    files.value[newName].fileName = newName

    currentFileName.value = newName

    delete files.value[oldName]
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

    //delete index file from result
    if (index.value) delete result['index.yaml']

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
    getCurrentFileData,
    accessingFolder,
    readFolder,
    readingFileData,
    verifyPermission,
    updateFileName,
  }
})
