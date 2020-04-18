<template>
  <div class="container">
    <div class="previews-container"></div>
    <label
      v-if="!imgUploaded"
      for="input"
      class="files-uploader-btn btn-treehouse"
      >Importer mes photos
      <input
        type="file"
        multiple
        id="input"
        @change="filesToImgUrlArrayAndPreviews($event)"
      />
    </label>
    <!-- <canvas v-if="imgUploaded" :name="this.file.name" id="canvas"></canvas> -->
  </div>
</template>

<script>
// import resizeImage from 'resize-image'
export default {
  methods: {
    filesToImgUrlArrayAndPreviews(e) {
      let filesArray = []
      e.target.files.forEach((file, index) => {
        const previewElt = this.createPreviewElement(file, index)

        let imgUrl = new Image()
        imgUrl.name = file.name
        const reader = new FileReader()

        reader.onloadend = () => {
          imgUrl.src = reader.result
          previewElt.src = reader.result
        }
        reader.readAsDataURL(file)
        filesArray.push(imgUrl)

        reader.onerror(console.error)
      })

      console.log(filesArray)
    },
    resize(file) {
      console.log(file)

      // -------------------------------------------------------
      // createImageBitmap(file, {
      //   resizeWidth: 300,
      //   resizeHeight: 234,
      //   resizeQuality: 'high'
      // }).then(imageBitmap => {
      //   document
      //     .getElementById('canvas')
      //     .getContext('2d')
      //     .drawImage(imageBitmap, 0, 0)
      // })
      // const canvas = document.getElementById('canvas')
      // console.log(canvas)
      // canvas.toBlob(blob => (this.smallFile = blob))
    },
    createPreviewElement(file, index) {
      const previewsContainer = document.querySelector('.previews-container')
      let preview = document.createElement('img')
      preview.id = `img-preview-number-${index}`
      preview.width = 200
      preview.classList.add('col-4')
      preview.style.cssText =
        'display: block; margin-left: auto; margin-right: auto;'
      previewsContainer.appendChild(preview)
      return preview

      // const reader = new FileReader()

      // reader.onloadend = () => {
      //   preview.src = reader.result
      // }
      // if (this.file) {
      //   reader.readAsDataURL(this.file)
      //   this.toggleimgUploaded()
      // } else {
      //   preview.src = ''
      // }
    }
  }
}
</script>

<style scoped>
.previews-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
}
</style>
