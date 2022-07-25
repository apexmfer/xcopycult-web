### TODO

-build specs for post, thread, and category 

-build basic frontend 


#### Tasks 

- design frontend 
    - base off other nice website like DO / pinata 
    - should let you login to a dashboard, then manage your projects + endpoints + slugs (generate QRs)
    





CHAKRA SAMPLES 
https://chakra-templates.dev/forms/authentication

https://github.com/chakra-ui/chakra-ui-vue/blob/develop/examples/nuxt-js/pages/index.vue



- fix session stuff for making a new endpoint 

 sessionID: 'nrEqI84ZF8h17fLhdpR-NDEVs12-3GUh',
    session: Session { cookie: [Object] },


use these instead of my own sessionToken 

#### Polish 

-on mobile, make dashboard nav slide out 

-add projects + (multiple slugs per endpoint) + tracking  for paid subscribers only [later]



#### Database Architecture 

- [Endpoint] 

    - owned by a user, or a team 

    - has one splash page (set of instructions for what to do)

    - has many [Slugs]
        
        - has 1 URL Slug  ( hash that acts as an incoming path for this endpoint  )


        - This url Slug is formatted into a QR code 

        - belongs to a endpoint   


