export default defineNuxtConfig({

    compatibilityDate: '2025-07-15',
    devtools: {
        enabled: true,
    
        timeline: {
          enabled: true
        }
      },
    modules: ['@nuxt/content', 'nuxt-llms'],
    
    content: {
        preview: {
            dev: true,
          }
    },
    llms:{
        domain: 'https://jointelscope.com',
        title: 'Telescope - Cortex',
        description: 'Embeddable Semantic Layer',
    }
  })
  



  