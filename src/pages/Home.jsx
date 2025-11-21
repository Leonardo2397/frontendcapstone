import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
    

      <div className="container my-5">
        <h1 className="text-center mb-4">Benvenuto nella HomePage!</h1>

        <p className="lead text-center">
          Questa è la homepage accessibile dopo il login o la registrazione.
        </p>

        <div className="text-center mt-4">
          <img 
            src="https://via.placeholder.com/800x300"
            alt="banner"
            className="img-fluid rounded"
          />
        </div>
      </div>

    </>
  );
}
