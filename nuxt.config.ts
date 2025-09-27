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
        },
        build: {
            markdown: {
                highlight: {
                    // Theme used in all color schemes
                    // theme: 'one-light',
                    // OR for multiple themes (compatible with Color Mode module)
                    // theme: {
                    //     default: 'one-light',
                    //     dark: 'night-owl',
                    //     sepia: 'aurora-x'
                    // },
                    // Languages to load for syntax highlighting
                    langs: [
                        'python',
                        'javascript', 
                        'typescript',
                        'json',
                        'html',
                        'css',
                        'sql',
                        'bash',
                        'yaml',
                        'markdown'
                    ]
                }
            }
        }
    },
    server: {
        port: 8080,
        host: '0.0.0.0'
    },
    llms:{
        domain: 'https://jointelscope.com',
        title: 'Telescope - Cortex',
        description: 'Embeddable Semantic Layer',
        full: {
            title: 'Cortex Semantic Layer',
            description: 'Data Analytics Platform for AI first companies',
          },
    }
  })
  



  