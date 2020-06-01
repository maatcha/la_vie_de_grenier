<template>
  <div>
    <p
      class="clickableText"
      v-if="!showCustomerList"
      @click="toggleCustomerList"
    >
      Afficher la liste des prospects
    </p>

    <transition
      @before-enter="beforeListEnter"
      @before-leave="beforeListLeave"
      @enter="listEnter"
      @leave="listLeave"
      :css="false"
      mode="out-in"
    >
      <div v-if="showCustomerList">
        <p
          class="clickableText"
          v-if="showCustomerList"
          @click="toggleCustomerList"
        >
          Cacher la liste des prospects
        </p>
        <ul>
          <li class="customerList">
            <p>Souscription</p>
            <p>E-mail</p>
            <p>Prénom</p>
            <p>Nom</p>
          </li>
        </ul>
        <hr />
        <ul v-for="(customer, index) in customerList" :key="index">
          <li v-if="showCustomerList" class="customerList">
            <p>{{ customer.createdOn | dateFromNow }}</p>
            <p>{{ customer.email }}</p>
            <p v-if="customer.firstName">
              {{ customer.firstName }}
            </p>
            <p v-if="customer.lastName">
              {{ customer.lastName }}
            </p>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    customerList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      showCustomerList: false
    }
  },
  methods: {
    toggleCustomerList() {
      this.showCustomerList = !this.showCustomerList
    },
    beforeListEnter(el) {
      this.$emit('before-list-enter', el)
    },
    listEnter(el, done) {
      this.$emit('list-enter', el, done)
    },
    beforeListLeave(el) {
      this.$emit('before-list-leave', el)
    },
    listLeave(el, done) {
      this.$emit('list-leave', el, done)
    }
  }
}
</script>

<style scoped>
ul {
  margin: 0;
  padding: 0 1vw;
}

p {
  padding-left: 1vw;
}

.customerList {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.customerList > p {
  margin: 0;
  padding: 0;
}
</style>
