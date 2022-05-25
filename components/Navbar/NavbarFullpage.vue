<template>
  <div class="fullpage">
    <ul class="fullpage__list">
      <nuxt-link
        v-for="(item, key) in items"
        :key="key"
        :to="item.url"
        tag="li"
        @click.native="$emit('onSelect')"
      >
        {{ item.title }}
      </nuxt-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NavbarFullpage',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  mounted () {
    document.body.style.overflow = 'hidden'
    document.body.style.height = '100vh'
  },
  beforeDestroy () {
    document.body.style.overflow = 'none'
    document.body.style.height = 'auto'
  }
}
</script>

<style lang="sass" scoped>
@import "assets/variables"

.fullpage
  display: none
  position: fixed
  top: 0
  left: 0
  height: 100vh
  width: 100vw
  background-color: #FFFFFF
  z-index: 1000
  padding: 100px 15px 20px 30px

  &__list
    font-weight: 700
    font-size: 36px

    > li
      @include trans
      margin-bottom: 25px
      cursor: pointer

      &.nuxt-link-active
        color: red

  @include lg
    display: block
</style>
