import './terms.css';

interface TermsProps {
  close: () => void;
}


export function Terms({ close }: TermsProps) {
  return (
    <div className="Terms animate__animated animate__fadeInUp">
      <div className="container_text">
        <p>
          Termos e condições infinitas. Texto a ser enviado pelo cliente.
        </p>

        <p>...</p>
      </div>

      <button type='button' className='submit-button-terms' onClick={close}>Ok</button>
    </div>
  )        
}