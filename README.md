# FeedHenry Hello World MBaaS Server

This is a blank 'hello world' FeedHenry MBaaS. Use it as a starting point for building your APIs. 

# Backend API

# hello [/hello]

'Hello world' endpoint.

## hello [POST] 

'Hello world' endpoint.

+ Request (application/json)
    + Body
            {
              "hello": "world"
            }

+ Response 200 (application/json)
    + Body
            {
              "msg": "Hello world"
            }

# lead [/lead]

Lead endpoint

## lead [POST] 

	Lead submission endpoint

+ Request (application/json)
    + Body
            { 
            	"name": "John Doe", 
            	"email": "john@doe.com", 
            	"company": "Home Ltd."
            	"job": "Architect"
            }

+ Response 200 (application/json)
    + Body
            {
              "msg": "Hello world"
            }
