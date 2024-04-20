import "../../stylesheets/Footer.css"

const Footer = () => {

  const date = new Date();
  const year = date.getFullYear();

  return(
      <>
   
      <p className='copyright'>©Copyright <span>{year}</span> Zaid</p>
      </>
  )
}

export default Footer