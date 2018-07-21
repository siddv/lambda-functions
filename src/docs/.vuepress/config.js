module.exports = {
  locales: {
    '/': {
      lang: 'en-GB',
      title: `Sidd's Lambda Functions`,
      description: 'A collection of Lambda Functions built by Sidd'
    },
    '/ca/': {
      lang: 'ca-ES',
      title: 'Funcions Lambda del Sidd',
      description: 'Una col · lecció de Funcions Lambda construïda per Sidd'
    }
  },
  themeConfig: {
    locales: {
      '/': {
        selectText: 'English',
        label: 'English',
        editLinkText: 'Edit on Github',
        sidebar: {
          '/': [/* ... */],
          '/nested/': [/* ... */]
        }
      },
      '/ca/': {
        selectText: 'Catalan',
        label: 'Catalan',
        editLinkText: 'Edita a Github',
        sidebar: {
          '/ca/': [/* ... */],
          '/ca/nested/': [/* ... */]
        }
      }
    }
  }
}
