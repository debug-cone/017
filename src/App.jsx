

// components
import FormComponent from "./components/FormComponent"

function App() {
  return (
    <div className="bg-slate-800 h-screen flex flex-col items-center justify-center">
      <h1 
      className="text-3xl text-blue-600 uppercase mb-4"
      >
        formik & yup
      </h1>
      <FormComponent />
    </div>
  )
}

export default App
