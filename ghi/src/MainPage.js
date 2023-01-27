import ImageSlider from "./ImageSlider"

function MainPage() {



  const slides = [
    { url: "/Monomyth/Monomyth01.jpg", title: "Monomyth01" },
    { url: "/Monomyth/Monomyth02.jpg", title: "Monomyth02" },
    { url: "/Monomyth/Monomyth03.jpg", title: "Monomyth03" },
    { url: "/Monomyth/Monomyth04.jpg", title: "Monomyth04" },
    { url: "/Monomyth/Monomyth05.jpg", title: "Monomyth05" },
    { url: "/Monomyth/Monomyth06.jpg", title: "Monomyth06" },
  ];

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
