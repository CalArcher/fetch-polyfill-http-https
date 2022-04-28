const http = require("http");
const https = require("https");
const fs = require("fs");
this.http = http
this.https = https

//beware of http flag, defaults to true or false
const fetch = (url, options = {}, ishttp = false) => {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    let req
    let protocol
    if(ishttp){
      protocol = 'http'
    }else{
      protocol = 'https'
    }

    req = this[protocol].request(urlObj, options, (res) => {
      const response = new Response({
        statusCode: res.statusCode,
        headers: res.headers,
        url: res.url,
      });
    
      const buffers = [];
    
      res.on("data", (data) => {
        buffers.push(data);
      });
    
      res.on("end", () => {
        response.setBody(buffers);
        resolve(response)
      });
    }) 

    req.on("error", (e) => {
      reject(e);
    });

    req.end();
  });
};



class Response {
  headers;
  #body;
  url;
  statusCode;

  constructor({ headers, body, statusCode, url }) {
    this.headers = headers;
    this.body = body;
    this.statusCode = statusCode;
    this.url = url;
  }

  async json() {
    return JSON.parse(Buffer.concat(this.body).toString());
  }

  async text() {
    return Buffer.concat(this.body).toString();
  }

  async blob() {
    return Buffer.concat(this.body);
  }

  setBody(body) {
    this.body = body;
  }
}

//main() is an example of how to use the fetch function

// async function main() {
//   try {
//     const res = await fetch(
//       "https://cdn.pixabay.com/photo/2022/04/02/12/32/easter-tree-7106933__480.jpg",
//       {
//         method: "GET",
//       }
//     );

//     // const data = await res.json();
//     const data = await res.blob();
//     fs.writeFileSync("./picture.jpg", data);
//   } catch (e) {
//     console.log(e.message);
//   }
// }

// main();

module.exports = fetch;