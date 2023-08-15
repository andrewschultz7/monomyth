import ImageSlider from "./ImageSlider";

function MainPage() {
  const slides = [
    { url: "/Monomyth01.jpg", title: "Monomyth01" },
    { url: "/Monomyth02.jpg", title: "Monomyth02" },
    { url: "/Monomyth03.jpg", title: "Monomyth03" },
    { url: "/Monomyth04.jpg", title: "Monomyth04" },
    { url: "/Monomyth05.jpg", title: "Monomyth05" },
    { url: "/Monomyth06.jpg", title: "Monomyth06" },
  ];

  const containerStyles = {
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <>
      <div style={containerStyles}>
        <ImageSlider slides={slides} />
      </div>
    </>
  );
}

export default MainPage;
