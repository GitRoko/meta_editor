import { ref } from "vue";

export default function useDropZone() {
    const dragActive = ref(false);
    const droppedFolder = ref(null);

    const toggle_active = () => {
        if (droppedFolder.value == null) {
            dragActive.value = !dragActive.value;
        }
    };

    const drop = (event) => {
        [...event.dataTransfer.items]  
        .filter((item) => {
          return item.kind === "file";
        })
        .forEach((item) => {
            item.getAsFileSystemHandle({
                mode: "readwrite",
              }).then((fileHandle) => {
                droppedFolder.value = fileHandle;
            });
        });;
    };

    return {
        dragActive,
        droppedFolder,
        toggle_active,
        drop,
        // selectedFile,
        // clearDropped,
    }
}