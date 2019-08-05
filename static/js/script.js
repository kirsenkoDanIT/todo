console.log('conected');
const formTodo = document.getElementById('formTodo')
const count = counter()

document.body.addEventListener('click', (e) => {
    let id = e.target.dataset.id
    console.log(e.target);
    if (e.target.classList.contains('todoCreateBtn')) {
        console.log(e.target.parentNode.parentNode);
        createTodoList()
        e.target.parentNode.parentNode.appendChild(addSpinner())
        setTimeout(() => {
            window.location.href = '/'
        }, 500);
    }
    if (e.target.classList.contains('todoDeleteBtn')) {
        deleteTodoList(id)
        window.location.href = '/'
    }
    if (e.target.classList.contains('view-btn')) {
        window.location.href = `/lists/${id}`
    }
    if (e.target.classList.contains('todoEditBtn')) {
        console.log(id);
        replaceFilds('label')
        const saveBtn = document.createElement('button')
        saveBtn.innerText = 'save'
        saveBtn.classList = "btn btn-dark saveBtn"
        saveBtn.setAttribute('data-id', id)
        e.target.parentNode.replaceChild(saveBtn, e.target)
    }
    if (e.target.classList.contains('addTodoInputBtn')) {
        addInput(formTodo)
    }
    if (e.target.classList.contains('close')) {
        e.target.parentNode.parentNode.remove()
    }
    if (e.target.classList.contains('saveBtn')) {
        editTodoList(id)
        window.location.href = `/lists/${id}`
    }
})

async function createTodoList() {
    try {
        let text = document.querySelectorAll('[name=todoText]')
        text = [...text].reduce((acc, item) => {
            acc.push(item.value)
            return acc
        }, [])

        let data = {
            text: text
        }
        await fetch("/api/lists", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    } catch (error) {
        console.log(error);
    }
}

async function editTodoList(id) {
    try {
        let text = document.querySelectorAll('[name=todoText]')
        text = [...text].reduce((acc, item) => {
            acc.push(item.value)
            return acc
        }, [])

        let data = {
            text: text
        }
        console.log(data);
        await fetch(`/api/lists/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    } catch (error) {
        console.log(error);
    }
}

async function deleteTodoList(id) {
    try {
        let data = {
            id: id
        }
        await fetch(`/api/lists/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
    } catch (error) {
        console.log(error);
    }
}

function counter() {
    let count = 0
    return function () {
        count++
        return count
    }
}

function addInput(parentForm) {
    const todoInputWrapper = document.createElement('div')
    todoInputWrapper.style.display = 'flex'
    todoInputWrapper.style.alignItems = 'center'
    todoInputWrapper.classList = 'form-group'
    const todoInputBlock = ` 
            <span>${count()}.</span>
            <input type="text" class="form-control" placeholder="Enter something"   name="todoText">
            <button type="button" class="close" aria-label="Close">
            <span aria-hidden="true" class="close">&times;</span>
            </button>`
    todoInputWrapper.innerHTML = todoInputBlock
    parentForm.appendChild(todoInputWrapper)
}

function replaceFilds(fieldForReplace) {
    const oldFields = document.querySelectorAll(fieldForReplace)
    console.log(oldFields);
    oldFields.forEach(item => {
        const closeBtn = document.createElement('div')
        const span = `<span aria-hidden="true" class="close">&times;</span>`
        closeBtn.innerHTML = span
        closeBtn.className = 'close'
        closeBtn.setAttribute('aria-label', 'Close')
        closeBtn.setAttribute('type', 'button')
        item.previousSibling.remove()
        const input = document.createElement('input')
        input.setAttribute("name", "todoText")
        input.value = item.innerText
        item.parentNode.appendChild(closeBtn)
        item.parentNode.replaceChild(input, item)
    })
}

function addSpinner() {
    const spinnerWrapper = document.createElement('div')
    const spinner = `
    <div class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
    </div>`
    spinnerWrapper.classList = `fixed-top fixed-bottom d-flex justify-content-center align-items-center`
    spinnerWrapper.style.backgroundColor = 'rgba(0,0,0,0.2)'
    spinnerWrapper.innerHTML = spinner
    return spinnerWrapper
}