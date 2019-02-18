module.exports = {
    dest: './build/static/docs',
    locales: {
        '/': {
            lang: 'en-US',
            title: 'My Reads',
            description: 'A Shelf book area, to read your prefer books'
        },
        '/br/': {
            lang: 'pt-BR',
            title: 'Minhas Leituras',
            description: 'Uma estante de livros, para ler seus livros preferidos'
        }
    },
    themeConfig: {
        locales: {
            '/': {
                selectText: 'Languages',
                label: 'English',
                sidebar: [
                    '/',
                    '/main',
                    '/features',
                    '/structure',
                    '/run',
                    '/test',
                    '/docs',
                ]
            },
            '/br/': {
                selectText: 'Idiomas',
                label: 'Português',
                sidebar: [
                    '/',
                    '/br/main',
                    '/br/features',
                    '/br/structure',
                    '/br/run',
                    '/br/test',
                    '/br/docs',
                ]
            }
        },
    }
}
