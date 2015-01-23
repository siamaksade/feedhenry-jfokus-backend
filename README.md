# FeedHenry Lead Registration MBaaS Server

Lead endpoint

## lead [POST] 

Lead submission endpoint

+ Request (application/json)
    + Body
            { 
                "name": "John Doe", 
                "email": "john@doe.com", 
                "company": "Home Ltd.",
                "job": "Architect"
            }

+ Response 200 (application/json)
    + Body
            {
              "msg": "Hello world"
            }
