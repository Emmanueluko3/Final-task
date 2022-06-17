
fetch(
    "https://my-json-server.typicode.com/Emmanueluko3/json-placeholder/posts"
)
.then(response => response.json())
.then(data => {
    let postsDiv = document.querySelector('#post-container')
    postsDiv.innerHTML = '';
    data.forEach(item => {
        let htmlBuild = `
            <div class="card m-1">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.body}</p>
                    <a href="#" class="btn btn-danger">delete</a>
                </div>
            </div>`

        postsDiv.insertAdjacentHTML('beforeend', htmlBuild)


    })
})

