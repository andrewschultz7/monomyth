import ImageSlider from "./ImageSlider"

function MainPage() {



  const slides = [
    {url: "/monomyth/Monomyth01.jpg", title:"Monomyth01"},
    {url: "/monomyth/Monomyth02.jpg", title:"Monomyth02"},
    {url: "/monomyth/Monomyth03.jpg", title:"Monomyth03"},
    {url: "/monomyth/Monomyth04.jpg", title:"Monomyth04"},
    {url: "/monomyth/Monomyth05.jpg", title:"Monomyth05"},
    {url: "/monomyth/Monomyth06.jpg", title:"Monomyth06"}
  ]

  const containerStyles = {
    width: '100%',
    height: '500px',
  };



  return (
    <>
    <div style={containerStyles} >
        <ImageSlider slides={slides}/>
    </div>
    </>





  );
}

export default MainPage;
