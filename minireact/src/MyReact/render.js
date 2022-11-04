let nextUnitOfWork = null;

function perforUnitOfWork(fiber){
    // 执行单元任务,reactElement 转换成一个真实DOM
    if(!fiber.dom){
        fiber.dom = createDOM(fiber);
    }
    if(fiber.parent){
        fiber.parent.dom.appendChild(fiber.dom);
    }
    // 为当前的fiber创造他子节点的fiber
    const element = fiber?.props?.children;
    let prevSibing = null;
    element.forEach((childrenElement,index)=>{
        const newFiber = {
            parent:fiber,
            props:childrenElement.props,
            type:childrenElement.type,
            dom:null,
            
        }
        if(index === 0){
            fiber.child = newFiber;
        }else{
            prevSibing.sibing = newFiber;  
        }
        prevSibing = newFiber;
    })
    // return出下一个任务单元
    if(fiber.child){
        return fiber.child
    }

    let nextfiber = fiber
    while(nextfiber){
        if(nextfiber.sibing){
            return nextfiber.sibing
        }
        nextfiber = nextfiber.parent
    }
}

function workLoop(deadline){
    let shouldYield = true
    while(nextUnitOfWork && shouldYield){
        nextUnitOfWork = perforUnitOfWork(nextUnitOfWork);
        //得知浏览器当前帧剩余的时间，
        shouldYield = deadline.timeRemaining() > 1;
    }
    requestIdleCallback(workLoop);//空闲时期
}

requestIdleCallback(workLoop);


function createDOM(element){
    let dom = element.type === 'TEXT_LELEM'
        ? document.createTextNode('')
        : document.createElement(element.tyep)

    const isProperty = key => key !== 'children'

    Object.keys(element?.props)
        .filter(isProperty)
        .forEach(name => dom[name] = element.props[name])

    return dom
}

function render(element, container) {
    nextUnitOfWork = {
        dom:container,
        props:{
            children:[element]
        }
    }
}

export default render