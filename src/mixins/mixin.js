import NProgress from 'nprogress'
export default {
  methods: {
    publicationError(error) {
      NProgress.done()
      const notification = {
        type: 'error',
        message:
          `Il y a eu un problème durant la publication de votre ${this.publicationType} : ` +
          error.message
      }
      this.$store.dispatch('notification/add', notification)
    },

    connectionTest() {
      const testRequest = new Request('fb')
      fetch(testRequest)
        .catch(() => {
          throw new Error(`Impossible d'établir la connexion`)
        })
        .catch(error => {
          this.publicationError(error)
        })
    }
  }
}
