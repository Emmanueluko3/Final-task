
let allPost = [];
const refreshPostContainer = () => {
    let postsDiv = document.querySelector('#post-container')
    postsDiv.innerHTML = '';
    allPost.forEach(item => {
        let htmlBuild = `
            <div class="card m-1 py-1">
                <div class="card-body">
                    <p class="card-text">${item.title}</p>
                    <a href="#" onclick="viewPost(${item.id})" data-id="${item.id}" class="btn btn-info">View</a>
                    <a href="#" onclick="editPost(this)" data-id="${item.id}" class="btn btn-primary">Update</a>
                    <a href="#" onclick="deletePost(this)" data-id="${item.id}" class="btn btn-danger">Delete</a>
                </div>
            </div>`

        postsDiv.insertAdjacentHTML('beforeend', htmlBuild)


    })
}

//myjsonserver url "https://my-json-server.typicode.com/Emmanueluko3/json-placeholder/"

const getAllPost = () => {
    fetch(
        "https://jsonplaceholder.typicode.com/posts"
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
        title: document.querySelector('#title').value,
        id: Math.floor(Math.random() * 100)
    }

    fetch("https://jsonplaceholder.typicode.com/posts", {
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
        document.querySelector('#title').value = '';
    })
}

const deletePost = (attr) => {
    let event = this.event;
    event = event || window.event 
    event.preventDefault()

    let id = attr.getAttribute('data-id')
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
    })
    .then(data => data.json())
    .then(data => {
        allPost = allPost.filter(item => item.id != id)

        refreshPostContainer()
    }) 

}

const editPost = (attr) => {

    let event = this.event;
    event = event || window.event 
    event.preventDefault()

    let postForm = document.querySelector('#post-form')

    let postTitle = postForm.querySelector('#title')
    let postBody = postForm.querySelector('#text')
    let submitBTN = postForm.querySelector('#submit-btn')

    let id = attr.getAttribute('data-id')
    editedPost = allPost.find(item => item.id == id)

    postTitle.value = editedPost.title
    postBody.value = editedPost.body

    submitBTN.setAttribute('onclick', `updatePost(${editedPost.id})`) 
    submitBTN.textContent = 'Update Post'
    window.scrollTo(document.body.scrollHeight, 10)
}

const updatePost = (postId) => {
    
    let event = this.event;
    event = event || window.event 
    event.preventDefault()

    let postForm = document.querySelector('#post-form')

    let postTitle = postForm.querySelector('#title')
    let postBody = postForm.querySelector('#text')
    let submitBTN = postForm.querySelector('#submit-btn')

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
            title: postTitle.value,
            body: postBody.value,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
    })
    .then(data => data.json())
    .then(data => {

        console.log(data)
        allPost = allPost.map(item => {
            if (item.id == postId) {
                item.title = data.title ?? item.title;
                item.body = data.body ?? item.title;
            }

            return item;
        })

        postTitle.value = ''
        postBody.value = ''
    
        submitBTN.setAttribute('onclick', `createPost(this)`)
        submitBTN.textContent = 'Create Post'

        refreshPostContainer()
    }) 
}

const viewPost = (postId) => {
    
    let event = this.event;
    event = event || window.event 
    event.preventDefault()

    console.log(postId)
    let modelEl = document.querySelector('#view-post-modal');

    let modal = new bootstrap.Modal(modelEl);

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'GET',
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then(data => data.json())
    .then(data => {
        console.log(data)
        modelEl.querySelector('.modal-title').textContent = data.title
        modelEl.querySelector('.modal-body').textContent = `${data.body}`
        modal.show()
    }) 
}
