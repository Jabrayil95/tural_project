const btn = document.querySelector('.btn button')
let form = document.querySelector('form')
const sorting = document.querySelector('.sort svg')

form.addEventListener('submit', (e) => {
    e.preventDefault()
})

btn.addEventListener('click', () => {
    let input = document.createElement('input')
    input.setAttribute('type', 'text')
    let div = document.createElement('div')
    let span = document.createElement('span')
    span.innerHTML = '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" y="0.5" width="19" height="19" rx="9.5" stroke="#C4C4C4" /><path d="M6 6L14 14" stroke="#C4C4C4" />                         <path d="M6 14L14 6" stroke="#C4C4C4" /></svg>'
    div.setAttribute('class', 'input')
    div.setAttribute('id', Math.random())
    div.append(input, span)
    form.append(div)
    const remove = [...document.querySelectorAll('form span')]
    deleteIpt(remove)
    func()
})



const func = () => {
    const inputDivs = document.querySelectorAll('.input');
    console.log('inouts: ', inputDivs)
    inputDivs.forEach(item => {
        item.setAttribute('draggable', 'true')
    })
    inputDivs.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text', e.currentTarget.id)
            console.log(e.target)
        })
        item.addEventListener('dragover', (e) => {
            // e.preventDefault()
        })
        item.addEventListener('drop', (e) => {
            e.preventDefault()

            const elmentId = e.dataTransfer.getData('text')
            const el = document.getElementById(elmentId)

            form.insertBefore(el, e.currentTarget)

            
        })
    })

}




const deleteIpt = (items) => {
    items.forEach(item => {
        item.addEventListener('click', () => {
            if (form.children.length > 1) {
                item.parentElement.remove()
            } else {
                item.parentElement.firstElementChild.value = ''
            }
        })
    })
}

let change = false

sorting.addEventListener('click', () => {
    let forms = [...form.children]
    if (!change) {
        forms.sort((a, b) => (a.firstElementChild.value > b.firstElementChild.value) ? 1 : -1)
        
        sorting.style.transform = 'rotateX(180deg)'
    } else {
        forms.sort((a, b) => (a.firstElementChild.value < b.firstElementChild.value) ? 1 : -1)
        sorting.style.transform = 'rotateX(0deg)'
        console.log(forms)
    }
    change = !change
    forms.forEach(item => {
        form.append(item)
    })
})