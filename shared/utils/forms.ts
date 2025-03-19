export const focusOnErrorInput = (event) => {
    const id = event.errors[0].id || event.errors[0].path
    const element = document.getElementById(id)

    element?.focus()
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}
