const baseUrl = "http://localhost:3003/api/";

let onSuccess = (response) => {
    return response.json();
};
let onError = (error) => {
    console.log(error);
};

function get(url) {
    return fetch(baseUrl + url).then(onSuccess, onError);
}   
function del(url) {
    const request = new Request(baseUrl + url, {
        method: "DELETE"
    });
    return fetch(request).then(onSuccess, onError);
}
function create(dog, url) {
    const request = new Request(baseUrl + url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dog)
    });
    return fetch(request).then(onSuccess, onError);
}

function put(dog, url) {
    const request = new Request(baseUrl + url, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dog)
    });
    return fetch(request).then(onSuccess, onError);
}

export function createDog(dog) {
    return create(dog, "dog");
}
export function putDog(id) {
    return put(`dog/${id}`);
}
export function getDogs() {
    return get("dog");
}
export function deleteDog(id) {
    return del(`dog/${id}`);
}