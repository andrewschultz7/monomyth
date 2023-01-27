import ImageSlider from "./ImageSlider"

function MainPage() {



  const slides = [
    {url: "http://localhost:3000/Monomyth01.jpg", title:"Monomyth01"},
    {url: "http://localhost:3000/Monomyth02.jpg", title:"Monomyth02"},
    {url: "http://localhost:3000/Monomyth03.jpg", title:"Monomyth03"},
    {url: "http://localhost:3000/Monomyth04.jpg", title:"Monomyth04"},
    {url: "http://localhost:3000/Monomyth05.jpg", title:"Monomyth05"},
    {url: "http://localhost:3000/Monomyth06.jpg", title:"Monomyth06"}
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
