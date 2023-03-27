import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useMetaDirectoryStore } from "@/stores/metaDirectory";

export const useCurrentFileStore = defineStore('currentFile', () => {
  let version = ref(0);
  let description = ref('');
  let group = ref('');
  let fields = ref(null);
  let handle = ref(null);
  let name = ref('');

  const setFileData = (data) => {
    version.value = data.fileData.version;
    description.value = data.fileData.description;
    group.value = data.fileData.group;
    fields.value = data.fileData.fields;
    handle.value = data.fileHandle;
    name.value = data.fileName;
  }

  const getFilesListForCurrentFile = computed(() => {
    const metaDirectoryStore = useMetaDirectoryStore();
    const list = metaDirectoryStore.filesNamesList;
    return list.filter(item => item !== name.value) || [];
  });

  const getFieldsNamesListForCurrentFile = computed(() => {
    const list = [];

    for (const key in fields.value) {
      list.push(key);
    }

    return list;
  });

  return {
    version,
    description,
    group,
    fields,
    handle,
    name,
    setFileData,
    getFilesListForCurrentFile,
    getFieldsNamesListForCurrentFile,
  }
})