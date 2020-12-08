
FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
  )
  FilePond.setOptions({
    stylePanelAspectRatio: 1 / 0.75,
    imageResizeTargetWidth: 325,
    imageResizeTargetHeight: 450
  })

FilePond.parse(document.body);