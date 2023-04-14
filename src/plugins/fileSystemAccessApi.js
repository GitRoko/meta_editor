export async function accessFolder() {
  const directoryHandle = await window.showDirectoryPicker({
    mode: "readwrite",
  });

  return directoryHandle;
}

export async function readDirectory(directoryHandle) {
  const dirHandle = directoryHandle;
  const promises = [];

  const getDirectoryData = async (data) => {
    const file = await data.getFile();
    let fileHandle = await dirHandle.getFileHandle(file.name);

    return {
      fileName: file.name,
      fileHandle,
    };
  };

  for await (const entry of dirHandle.values()) {
    const fileExtension = entry.name.split(".")[1];
    // console.log(entry);
    if (entry.kind !== "file") {
      break;
    }

    if (fileExtension === "yaml" || fileExtension === "yml" && !entry.name.includes("_harmonized")) {
      promises.push(getDirectoryData(entry, fileExtension));
    }
  }

  const dataDirectory = await Promise.all(promises);

  function byField(field) {
    return (a, b) => (a[field] > b[field] ? 1 : -1);
  }

  let result = dataDirectory.sort(byField("fileName"));

  return result;
}

export async function readFile(handle = false) {
  let fileHandle;
  let file;
  if (handle) {
    file = await handle.getFile();
  } else {
    [fileHandle] = await window.showOpenFilePicker({ mode: "readwrite" });
    file = await fileHandle.getFile();
  }

  const contents = await file.text();

  return contents;
}

export async function renameFile(fileHandle, newName) {
  await fileHandle.move(newName);
}
