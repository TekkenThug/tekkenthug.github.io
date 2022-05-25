<template>
  <nav class="navbar">
    <button
      :class="[
        'navbar__burger',
        {
          'navbar__burger--active': activeMenu
        }
      ]"
      @click="activeMenu = !activeMenu"
    >
      <span />
    </button>
    <ul class="navbar__nav">
      <nuxt-link
        v-for="(item, key) in categories"
        :key="key"
        :to="item.url"
        tag="li"
      >
        {{ item.title }}
      </nuxt-link>
    </ul>

    <img class="navbar__logo" src="/logo.svg" alt="Logo">

    <navbar-fullpage
      v-if="activeMenu"
      :items="categories"
      @onSelect="activeMenu = false"
    />
  </nav>
</template>

<script>
import config from '~/config'
import NavbarFullpage from '@/components/Navbar/NavbarFullpage'

export default {
  name: 'Navbar',
  components: { NavbarFullpage },
  data () {
    return {
      categories: [...config.categories],
      searchQuery: '',
      activeMenu: false
    }
  }
}
</script>

<style lang="sass" scoped>
  @import "assets/variables.scss"

  .navbar
    display: flex
    align-items: center
    justify-content: space-between
    width: 100%

    &__logo
      height: 60px

    &__nav
      display: flex
      font-weight: 600
      font-size: 24px
      margin-right: 15px

      @include lg
        display: none

      > li
        @include trans
        padding: 0 0 10px
        cursor: pointer
        position: relative

        &.nuxt-link-active
          color: red

        &:not(:last-child)
          margin-right: 20px

        &::after
          opacity: 0
          position: absolute
          content: ""
          left: 0
          bottom: 0
          height: 2px
          transform: translateY(15px)
          width: 100%
          background-color: red
          pointer-events: none
          @include trans

        &:hover
          color: red

          &:not(.nuxt-link-active)::after
            opacity: 1
            transform: translateY(0)

    &__search-field
      margin-top: 0
      padding-top: 0
      max-width: 320px

    &__burger
      width: 20px
      height: 16px
      position: relative
      display: none
      margin-right: 15px
      margin-top: 10px
      z-index: 1001

      @include lg
        display: block

      &::after,
      &::before
        @include trans
        content: ''
        position: absolute
        width: 100%
        height: 2px
        background-color: #000000
        left: 0

      &::after
        bottom: 0

      &::before
        top: 0

      &:hover
        span,
        &::after,
        &::before
          background: red

      span
        @include trans
        display: block
        width: 100%
        height: 2px
        background-color: #000000

      &--active
        span
          opacity: 0

        &::after
          transform: rotate(45deg)
          bottom: 0
          top: 50%

        &::before
          transform: rotate(-45deg)
          top: 50%
</style>
