function render(element, container) {
    let dom = element.type === 'TEXT_LELEM'
        ? document.createTextNode('')
        : document.createElement(element.tyep)

    const isProperty = key => key !== 'children'

    Object.keys(element?.props)
        .filter(isProperty)
        .forEach(name => dom[name] = element.props[name])

    element?.props?.children?.forEach(child =>
        render(child, dom)
    )
    container.appendChild(dom);
}

export default render