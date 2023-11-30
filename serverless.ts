import { AWS } from '@serverless/typescript'

const config: AWS = {
    service: 'experiment-mark-serverless-go',
    provider: {
        profile: 'sweepbright-${self:provider.stage}',
        region: 'eu-west-1',
        architecture: 'arm64', // <-- important
        runtime: 'provided.al2', // <-- important
        name: 'aws',
        versionFunctions: false,
        stage: 'dev',
    },
    plugins: [
        'serverless-go-plugin', // <-- important
        'serverless-offline',
    ],
    custom: {
        go: {
            cmd: 'GOOS=linux GOARCH=arm64 go build -ldflags="-s -w"', // <-- important
            supportedRuntimes: ['provided.al2'], // <-- important
            buildProvidedRuntimeAsBootstrap: true, // <-- important
        },
    },


    functions: {
        triangle: {
            handler: './functions/triangle', // <-- important (path to go file instead of binary)
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
            handler: './functions/circle', // <-- important (path to go file instead of binary)
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