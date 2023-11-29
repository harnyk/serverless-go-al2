import { AWS } from '@serverless/typescript'

const config: AWS = {
    service: 'experiment-mark-serverless-go',
    provider: {
        profile: 'sweepbright-${self:provider.stage}',
        region: 'eu-west-1',
        architecture: 'arm64',
        runtime: 'provided.al2',
        name: 'aws',
        versionFunctions: false,
        stage: 'dev',
    },
    plugins: [
        'serverless-go-plugin',
        'serverless-offline',
    ],
    custom: {
        go: {
            cmd: 'GOOS=linux GOARCH=arm64 go build -ldflags="-s -w"',
            supportedRuntimes: ['provided.al2'],
            buildProvidedRuntimeAsBootstrap: true,
        },
    },


    functions: {
        triangle: {
            handler: 'functions/triangle/main.go',
            events: [
                {
                    http: {
                        method: 'get',
                        path: '/triangle',
                    },
                },
            ],
        },
        circle: {
            handler: 'functions/circle/main.go',
            events: [
                {
                    http: {
                        method: 'get',
                        path: '/circle',
                    },
                },
            ],
        }
    }

}

module.exports = config