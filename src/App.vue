<template>
  <div class="app-wrapper">
    <TheHeader />
    <main class="main-content">
      <router-view></router-view>
    </main>
    <TheFooter />
    <ScrollTopButton />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import { useRoute } from 'vue-router'
import TheFooter from './components/layout/TheFooter.vue'
import TheHeader from './components/layout/TheHeader.vue'
import ScrollTopButton from './components/ui/ScrollTopButton.vue'
import { siteConfig } from './config/site'

export default {
  name: 'App',
  components: {
    ScrollTopButton,
    TheHeader,
    TheFooter
  },
  setup() {
    const route = useRoute()

    useHead(
      computed(() => {
        const seo = route.meta.seo || {}
        const shouldPreventIndexing =
          siteConfig.environment !== 'production' || seo.noindex
        const head = {
          title: seo.title || "Jenny's Flowers",
          meta: [
            {
              name: 'description',
              content: seo.description || ''
            }
          ],
          link: seo.canonicalPath
            ? [
                {
                  rel: 'canonical',
                  href: new URL(
                    seo.canonicalPath,
                    `${siteConfig.siteUrl}/`
                  ).href
                }
              ]
            : []
        }

        if (shouldPreventIndexing) {
          head.meta.push({ name: 'robots', content: 'noindex, nofollow' })
        }

        return head
      })
    )
  }
}
</script>

<style>
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main-content {
  flex: 1 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: var(--space-5);
}
</style>
