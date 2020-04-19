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
        @change="previewFilesAndStockImgUrlsInArray($event)"
      />
    </label>
    <!-- <canvas v-if="imgUploaded" :name="this.file.name" id="canvas"></canvas> -->
  </div>
</template>

<script>
// import resizeImage from 'resize-image'
export default {
  data() {
    return {
      imgUploaded: false,
      urlsArray: []
    }
  },
  methods: {
    previewFilesAndStockImgUrlsInArray(e) {
      let urlsArray = []
      e.target.files.forEach((file, index) => {
        let bigAndSmallUrls = []
        bigAndSmallUrls.name = file.name
        const previewElt = this.createPreviewElementAndCloseButton(file, index)

        let imgUrl = new Image()
        imgUrl.name = file.name
        const reader = new FileReader()

        reader.onloadend = () => {
          imgUrl.src = reader.result
          previewElt.src = reader.result
        }
        if (file) {
          reader.readAsDataURL(file)
          const smallImg = this.resize(imgUrl)
          bigAndSmallUrls.push(imgUrl)
          bigAndSmallUrls.push(smallImg)
          urlsArray.push(bigAndSmallUrls)
        } else {
          previewElt.src = ''
          imgUrl.src = ''
        }
      })

      this.toggleimgUploaded()
      this.urlsArray = urlsArray
      console.log(this.urlsArray)
    },
    resize(img) {
      return img

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
    createPreviewElementAndCloseButton(file, index) {
      const previewsContainer = document.querySelector('.previews-container')

      let previewAndbutton = document.createElement('div')
      previewAndbutton.classList.add('col-4')
      previewsContainer.appendChild(previewAndbutton)

      let preview = document.createElement('img')
      preview.id = `img-preview-number-${index}`
      preview.classList.add('col-4')
      preview.scale = 1
      previewAndbutton.appendChild(preview)

      let closePreviewButton = document.createElement('button')
      closePreviewButton.id = `close-preview-number-${index}`
      closePreviewButton.width = 100
      closePreviewButton.innerText = 'X'
      closePreviewButton.addEventListener('click', () => {
        closePreviewButton.remove()
        preview.remove()
        if (this.urlsArray.length <= 2) this.toggleimgUploaded
        let filteredArray = this.urlsArray.filter(
          bigAndSmallUrls => bigAndSmallUrls.name !== file.name
        )
        this.urlsArray = filteredArray
        console.log(this.urlsArray)
        previewAndbutton.remove()
      })
      closePreviewButton.style.cssText =
        'position: relative; bottom: 42px; right: 25px;'
      previewAndbutton.appendChild(closePreviewButton)

      return preview
    },
    toggleimgUploaded() {
      this.imgUploaded = !this.imgUploaded
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
