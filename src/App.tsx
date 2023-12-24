// components
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import { FiSend } from 'react-icons/fi'

import UserForm from './components/UserForm'
import ReviewForm from './components/ReviewForm'
import Thanks from './components/Thanks'
import Steps from './components/stepBar/Steps'

// styles
import './App.css'

// hooks
import { useState } from 'react'
import { useForm } from './hooks/useForm'

type FormFields = {
  name: string;
  email: string;
  review: string;
  comment: string;
}

const formTemplate: FormFields = {
  name: "",
  email: "",
  review: "",
  comment: "",
}

const App = () => {
  const [data, setData] = useState(formTemplate)

  const updateFieldHandler = (key: string, value: string) => {
    setData((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const formComponents = [
    <UserForm data={data} updateFieldHandler={updateFieldHandler} />,
    <ReviewForm data={data} updateFieldHandler={updateFieldHandler} />,
    <Thanks data={data} />
  ]

  const { currentStep, currentComponent, changeStep, isLastStep } = useForm(formComponents);

  return (
    <div>
      <div className="header">
        <h2>Deixe sua avaliação</h2>
        <p>Ficamos felizes com a sua compra, utilize o formulário abaixo para avaliar o produto</p>
      </div>
      <div className="form-container">
        <Steps currentStep={currentStep} />
        <form onSubmit={(e) => changeStep(currentStep + 1, e)}>
          <div className="inputs-container">{currentComponent}</div>
          <div className="actions">
            <button type='button' onClick={() => changeStep(currentStep - 1)}>
              <GrFormPrevious />
              <span>
                Voltar
              </span>
            </button>
            <button type='submit' >
              <span>
              {isLastStep ? 'Enviar' : 'Avançar'}
              </span>
              {isLastStep ? <FiSend /> : <GrFormNext />}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App