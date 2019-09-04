

window.onload = init
function init(){
     const tl = new TimelineMax({ })
    const item = $('.item-img')
    
    

   slideInit(tl)
   slideChange(tl)
   handleFormSubmit()
    handleBurgerClicked()
    item.on('click',function(){
        
         modalEffect(tl,this.name,this.alt,this.src)
    })
    

   
    
 
}


function slideChange(tl){
    const homeSlide = $('.slide-home')
     const menuSlide = $('.slide-menu')
     const contactSlide = $('.slide-contact')
     const aboutSlide = $('.slide-about')
     // slide select
    const homeButton = $('.home-btn')
    const aboutButton = $('.about-btn')
    const contactButton =$('.contact-btn')
    const menuButton = $('.menu-btn')
   // nav button select
    
    let currentSlide =  homeSlide
    let currentDot = $('.dot-home')
    // slide change effect 
    function slideEffect(slide){
             if (window.matchMedia('(max-width: 850px)').matches) {
                $('.nav-bar').removeClass('nav-open')
            }           
            function dotChange(dotName){
                    currentDot.attr("src","./img/dot-empty.svg")
                    $(dotName).attr("src","./img/dot-full.svg")
                    currentDot = $(dotName)

            }
             if(currentSlide == slide){
                return
            }
           
                tl.to(currentSlide,0.5,{opacity:0})
                .to(slide,0.5,{opacity:1})
                setTimeout(function(){
                     currentSlide.addClass('hide-slide')
                slide.removeClass('hide-slide')
                currentSlide = slide
                if(slide == homeSlide){
                   dotChange($('.dot-home'))

                }
                if(slide == menuSlide){
                    dotChange($('.dot-menu'))
                }
                if(slide == contactSlide){
                    dotChange($('.dot-contact'))
                }
                if(slide == aboutSlide){
                    dotChange($('.dot-about'))
                }
                
                },500)
               
            
        
    }
    menuButton.add('.dot-menu').on('click',()=> slideEffect(menuSlide))
    homeButton.add('.dot-home').on('click',()=>slideEffect(homeSlide))
    contactButton.add('.dot-contact').on('click',()=>slideEffect(contactSlide))
    aboutButton.add('.dot-about').on('click',()=>slideEffect(aboutSlide))
}


function slideInit(tl){
       const mainChildren = $('main').children()
    const main = $('main')
     
    tl.from(main,0.5,{x:'-100%'})
    .from(main,1,{height:'1px'})
    .from(mainChildren,1,{opacity:0})
}

function modalEffect(tl,name,price,imgSrc){
    function generateNameProduct(name,price){
        return `${name} ........ $${price}`
    }
   
    const modal = $('.modal')
    const modalContent = $('.modal-content')
    const image = $('.modal-img')
    const productName = $('.product-name')
    const buttons = $('.modal-button')
    const exitButton = $('.exit-button')
    productName.text(generateNameProduct(name,price))
    image.attr("src",imgSrc)

    modal.css('display','block')
    tl.from(modalContent,0.5,{opacity:0})
    .from(image,0.7,{y:'-120%'})
    .from(productName,0.3,{opacity:0})
    .from(buttons,0.3,{y:'140%'})
    exitButton.on('click',function(){
        modal.css('display','none')
    })
 
 

   
}
function handleFormSubmit(){
    const form = $('form')
    form.submit(function(e){
        e.preventDefault()
        $.ajax({
            type:form.attr('method'),
            url:form.attr('action'),
            data:form.serialize(),
            success:function(data){
                $('.form-response').text('Thank you for contacting us, we will response in 24 hours')
                form.trigger('reset')
                setTimeout(()=>{
                     
                     $('.form-response').text('')
                    
                },3000)
            },
            error:function(data){
                 $('.form-response').text('Unable to send')
            }
        })
    })
}
function handleBurgerClicked(){
    const burger = $('.hamburger')
    burger.on('click',function(){
        $('.nav-bar').toggleClass('nav-open')
    })
}