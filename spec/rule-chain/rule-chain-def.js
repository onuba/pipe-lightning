module.exports = [
    {
        name: 'operation_succesfull_locator',
        description: 'Locate sucessfull operations flow',
        conditions: [
            {
                must: true,
                validate: (data) => data.name === 'sender' && data.attributes.type === 'user_request',
                regexp: [
                    {
                        path_to_apply: 'attributes.content',
                        exp: /user\s+(?<userId>\d+)\s+request\s+operation\s+(?<operationId>\d+)/
                    }
                ],
                func: (parserContext, match) => {
                    parserContext.locating_operation = true
                    parserContext.userId = match['userId']
                    parserContext.operationId = match['operationId']
                    return true
                },
                ref: 'requestNode'
            },
            {
                must: true,
                validate: (data) => data.name === 'receiver' && data.attributes.type === 'user_request_receive',
                regexp: [
                    {
                        path_to_apply: 'attributes.content',
                        exp: /do\s+operation\s+(?<operationId>\d+)\s+for\s+user\s+(?<userId>\d+)/
                    }
                ],
                func: (parserContext, match) => {
                    return parserContext.userId === match['userId'] &&
                        parserContext.operationId === match['operationId']
                },
                ref: 'userRequestReceiveNode'
            },
            {
                must: true,
                validate: (data) => data.name === 'sender' && data.attributes.type === 'user_response',
                regexp: [
                    {
                        path_to_apply: 'attributes.content',
                        exp: /do\s+operation\s+(?<operationId>\d+)\s+for\s+user\s+(?<userId>\d+)\s+response\s+(?<response>\w+)/
                    }
                ],
                func: (parserContext, match) => {
                    return parserContext.userId === match['userId'] &&
                        parserContext.operationId === match['operationId'] &&
                        'OK' === match['response']
                },
                ref: 'responseNode'
            }
        ],
        successfull: (parserContext, context, refs) => {
            // all conditions were satisfied
            refs['requestNode'].name = 'requestOk'
            refs['requestNode'].attributes.userId = parserContext.userId
            refs['requestNode'].attributes.operationId = parserContext.operationId

            refs['responseNode'].name = 'ignore'
            refs['userRequestReceiveNode'].name = 'ignore'
        }
    }
]