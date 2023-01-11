import { useState } from 'react'

const ImageSlider = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const sliderStyles = {
        height: "100%",
        width: '100%',
        position: "static",

    }
    const slideStyles = {
        width: '100%',
        height: '150%',
        borderRadius: '10px',
        objectFit: 'fill',
        backgroundPosition: 'center',
        backgroundSize: "cover",
        backgroundImage: `url(${slides[currentIndex].url})`,


    }


    const leftArrowStyles = {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        left: '32px',
        fontSize: '55px',
        color: '#7f7f7f',
        zIndex: 1,
        cursor: "pointer",
    }

    const rightArrowStyles = {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        right: '32px',
        fontSize: '55px',
        color: '#7f7f7f',
        zIndex: 1,
        cursor: "pointer",
    }

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
        setCurrentIndex(newIndex)
    }

    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1
        const newIndex = isLastSlide ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)
    }
    return (

            <div  style={sliderStyles}>
                <div style={leftArrowStyles} onClick={goToPrevious}> ❰ </div>
                <div style={slideStyles}>
                    <div style={rightArrowStyles} onClick={goToNext}>  ❱  </div>
                </div>
            </div>


    )
}


export default ImageSlider
