const assert = require("assert");

/*
function getAnimals(id) { 
   return fetch('http://api.animalfarmgame.com/animals/' + id) // window.fetch 
   .then(response => response.json())
   .then(data => data.results[0])
}
*/
// Now the function uses dependency injection which is fetch
function getAnimals(fetch, id) {
  return fetch("http://api.animalfarmgame.com/animals/" + id) // window.fetch
    .then((response) => response.json())
    .then((data) => data.results[0]);
}
// why dependency injection? if getAnimals had too many dependecies we can inject all in the args getAnimals(fetch, id, bb, dfbbf, etc) insted of hiding it
//but the real reason is unit testing

/* Invoking the function
getAnimals(window.fetch, 123)
    .then(animal => document.querySelector('.animal').innerHTML = animal.name) */

//mock data

// {
//     results: [
//         {
//             name: "fluffy",
//             type: "robot"
//         }
//     ]
// }

// Unit test

describe("getAnimals", () => {
  it("calls fetch with correct url", () => {
    const fakeFetch = (url) => {
      assert(url === "http://api.animalfarmgame.com/animals/123");
      return new Promise(function (resolve) {});
    };
    getAnimals(fakeFetch, 123); // the test doesnt have any way to get into getAnimals body and cannot inspect what is going in it
  });

  it("parses the response of the fetch correctly", (done) => {
    const fakeFetch = () => {
      return Promise.resolve({
        json: () =>
          Promise.resolve({
            results: [
              {
                name: "fluffy",
                type: "robot",
              },
            ],
          }),
      });
    };
    getAnimals(fakeFetch, 12345)
        .then(result => {
            assert(result.name === "fluffy")
            done()
        })
        
  });
});
