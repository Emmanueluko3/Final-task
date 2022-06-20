
let allPost = [];
const refreshPostContainer = () => {
    let postsDiv = document.querySelector('#post-container')
    postsDiv.innerHTML = '';
    allPost.forEach(item => {
        let htmlBuild = `
            <div class="card m-1">
                <div class="card-body">
                    <p class="card-text">${item.body}</p>
                    <a href="#" onclick="deletePost(this)" data-id="${item.id}" class="btn btn-danger">delete</a>
                </div>
            </div>`

        postsDiv.insertAdjacentHTML('beforeend', htmlBuild)


    })
}

const getAllPost = () => {
    fetch(
        "https://my-json-server.typicode.com/Emmanueluko3/json-placeholder/posts"
    )
    .then(response => response.json())
    .then(data => {
        allPost = [
            ...data
        ]
        refreshPostContainer()
    })
}

getAllPost()


const createPost = (attr) => {
    let event = this.event;
    event = event || window.event 
    event.preventDefault()

    const content = {
        body: document.querySelector('#text').value,
        id: Math.floor(Math.random() * 100)
    }

    fetch("https://my-json-server.typicode.com/Emmanueluko3/json-placeholder/posts", {
        method: 'POST',
        body: JSON.stringify(content),
        headers: {
            'Content-Type': 'application/json; charset=UTf-8'
        }
    })
    .then(data => data.json())
    .then(data => {
        allPost.push(data)
        refreshPostContainer()
        document.querySelector('#text').value = '';
    })
}

const deletePost = (attr) => {
    event = event || window.event 
    event.preventDefault()

    let id = attr.getAttribute('data-id')
    fetch(`https://my-json-server.typicode.com/Emmanueluko3/json-placeholder/posts/${id}`, {
        method: 'DELETE',
    })
    .then(data => data.json())
    .then(data => {
        allPost = allPost.filter(item => item.id != id)

        refreshPostContainer()
    }) 

}