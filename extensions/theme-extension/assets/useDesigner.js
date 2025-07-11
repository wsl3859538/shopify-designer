

window.addEventListener('load', function() {

    if(window.designParams){
        let id = '#' + window.designParams.id;

        console.log('id',id)

        let nodes = document.querySelectorAll('.d-button');

        console.log(`${id}`,nodes)

        for (let index = 0; index < nodes.length; index++) {
            const element = nodes[index];

            if(element.getAttribute('data-id') === window.designParams.id){
                element.addEventListener('click',function(){

                    


                    // 最外层
                    let divNode = document.createElement('div');
                    divNode.className = 'dinhoo-modal-root';
                    divNode.id = 'dinhoo-modal-0530';

                    // mask层
                    let maskNode = document.createElement('div');
                    maskNode.className = 'dinhoo-modal-mask';

                    // modal层
                    let modalNode = document.createElement('div');
                    modalNode.className = 'dinhoo-modal-modal-wrap';

                    // modal-header层
                    let modalHeaderNode = document.createElement('div');
                    modalHeaderNode.className = 'dinhoo-modal-header';
                    modalHeaderNode.innerHTML = `<span class="title">设计</span> <span id="dinhoo-close">X</span>`;

                    // modal-content（放iframe)
                    let modalContentNode = document.createElement('div');
                    modalContentNode.className = 'dinhoo-modal-content';


                
                    

                    let iframeNode = document.createElement('iframe');
                    iframeNode.id = 'dinhoo_iframe';
                    iframeNode.src = 'https://design.dinwow.com/#/designer_pc?design=business&product_id=512&appType=2&website=https://xpod.dinwow.com/&locale=en'; // 
              
                    // console.log('id',document.querySelector(params.element))
              
                    setTimeout(() => {

                        modalContentNode.appendChild(iframeNode)
              

                        modalNode.appendChild(modalHeaderNode)
                        modalNode.appendChild(modalContentNode)
    
                        divNode.appendChild(maskNode)
                        divNode.appendChild(modalNode)

                        let parentElement = document.body;
                        parentElement.appendChild(divNode);

                        document.querySelector('#dinhoo-close').addEventListener('click',function(){
                            parentElement.removeChild(divNode)
                        })
              
                    }, 0);

                })


            }
            
        }

    

    }

})

