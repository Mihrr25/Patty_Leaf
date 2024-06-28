import react,{ useState,useRef } from 'react'

const corousel = () => {
    let images = ["Restr/Burgers-1.jpg", "Restr/Pasta.jpg","Restr/Fries.jpg","Restr/Shake.jpg" ,"Restr/Burgers-2.jpg"];
    let currentIndex = 0;
    const cref=useRef(null);
    const nref=useRef(null);

    function showImage(index, direction) {
        if(cref.current&&nref.current){
        const nextImageSrc = images[index];
    
        nref.current.src = nextImageSrc;
        nref.current.style.display = 'block';
    
        if (direction === 'next') {
            nref.current.style.transform = 'translateX(100%)';
        } else {
            nref.current.style.transform = 'translateX(-100%)';
        }
    
        setTimeout(() => {
            nref.current.style.transform = 'translateX(0)';
            cref.current.style.transform = 'translateX(0)';
        }, 50);
    
        setTimeout(() => {
            cref.current.src = nextImageSrc;
            nref.current.style.display = 'none';
            cref.current.style.transform = 'none';
            nref.current.style.transform = 'none';
        }, 550);
    }
    
    }
    let interv=setInterval(() => {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        showImage(currentIndex, 'next');
    }, 2500);
    
    function prevImage() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        clearInterval(interv);
        showImage(currentIndex, 'prev');
        interv=setInterval(() => {
            currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
            showImage(currentIndex, 'next');
        }, 2500);
    }
    function nextImage() {
        clearInterval(interv);
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        showImage(currentIndex, 'next');
        interv=setInterval(() => {
            currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
            showImage(currentIndex, 'next');
        }, 2500);
    }
    
  return (
    <div className="block">
        <div className="carousel-container">
          <div className="carousel">
            <button className="prev" onClick={prevImage} >&#10094;</button>
            <div className="image-wrapper">
              <img id="current-image" ref={cref} src="Restr/Burgers-1.jpg" alt="Image" />
              <img id="next-image" ref={nref} src="Restr/Pasta.jpg" alt="Image" style={{ display: 'none' }} />
            </div>
            <button className="next" onClick={nextImage} >&#10095;</button>
          </div>
        </div>
      </div>
  )
}

export default corousel