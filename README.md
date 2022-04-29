# Fetch nodejs polyfill for HTTP & HTTPS
Created:  2022-04-27

&nbsp;

This is taken from gjuoun's original fetch nodejs polyfill and modified to allow fetching from both HTTP and HTTPS. 

[1]: https://gist.github.com/gjuoun/f08f5f0298be14f88f32ffb46315e0dd
## [Here is a link to his version][1]

&nbsp;

## Note
---

&nbsp;

Recommended to use a name like _fetch, so that it won't get confused for any native fetch funtion as shown below

&nbsp;

### **Example:** 
<!-- code below -->

```javascript

const _fetch = require("./fetch")

```

&nbsp;

<!-- code below -->

```javascript

   fetchExample(){
        _fetch('http://testexample.com/json', {}, true)
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.log(error)
        })
    }

```
