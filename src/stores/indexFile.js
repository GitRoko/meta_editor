import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useIndexFileStore = defineStore('indexFile', () => {
  let versionFile = ref(0); // version
  let nameModule = ref(''); // module[0].name
  let descriptionModule = ref(''); // module[0].description
  let dataModule = ref(null); // module[0].data
  let handle = ref(null); // fileHandle
  let name = ref(''); // fileName

  const exportData = () => {
    const data = {
      version: versionFile.value,
      module: [
        {
          name: nameModule.value,
          description: descriptionModule.value,
          data: dataModule.value,
        }
      ]
    }

    return data;
  };

  const setFileData = (data) => {
    versionFile.value = data.fileData.version;
    nameModule.value = data.fileData.module[0].name;
    descriptionModule.value = data.fileData.module[0].description;
    dataModule.value = data.fileData.module[0].data;
    handle.value = data.fileHandle;
    name.value = data.fileName;
  };
  
  const getIndexFieldsNamesList = computed(() => {
    const list = [];

    for (const key in dataModule.value) {
      list.push(key);
    }

    return list;
  });

  return {
    versionFile,
    nameModule,
    descriptionModule,
    dataModule,
    handle,
    name,
    setFileData,
    exportData,
    getIndexFieldsNamesList,
  }
})