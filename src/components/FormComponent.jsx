// formik yup
import { useFormik } from 'formik'
import * as Yup from 'yup'


// FileParser
import { FileParser } from '../utils/FileParser'
FileParser

function FormComponent() {
    // size
    const KB = 1024;
    const MB = KB * 1024;
    // type
    const VALID_TYPE = ['image/png', 'image/jpg', 'image/jpeg']

    // formik
    const Formik = useFormik({
    // 1. initialValues
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      birthDate: '',
      gender: '',
      image: ''
    },

    // 2. Validation
    validationSchema: Yup.object({
      firstName: Yup.string()
      .required('Field is required!'),
      lastName: Yup.string()
      .required('Field is required!'),
      email: Yup.string()
      .email('Enter valid E-Mail')
      .required('Field is required!'),
      password: Yup.string()
      .min(4, 'Shorter than 5 Characters!')
      .max(20, 'Longer than 20 Characters!')
      .required('Field is required!'),
      birthDate: Yup.string()
      .required('Field is required!'),
      gender: Yup.string()
      .required('Field is required!'),
      image: Yup.mixed()
      .required('Field is required!')
      .test('fileSize', 'Wrong file size!', (value) => value.size < 2 * MB)
      .test('fileType', 'Wrong file type', (value) => VALID_TYPE.includes(value.type) )
    }),

    // 3. onSubmit
    onSubmit: (values) => {
      console.log(values)
      FileParser(values.image)
        .then((res) => console.log({ ...values, image: res }))
        .catch((err) => console.log(err))
      Formik.resetForm()
    }
  })

  const showError = (name) => 
    Formik.errors[name] && Formik.touched[name] && Formik.errors[name]
  


  return (
    <form 
    onSubmit={Formik.handleSubmit}
    className='w-[400px] mx-auto flex flex-col gap-3'
    >
        <div className="flex flex-col gap-1">
            <label className='text-sm text-gray-50' htmlFor="firstName">
              First Name
            <span className='text-[12px] text-red-600 ml-5'>{showError("firstName")}</span>
            </label>
            <input 
            className='px-4 py-2 outline-none rounded-lg'
            type="text" 
            name="firstName" 
            id="firstName" 
            value={Formik.values.firstName}
            onChange={Formik.handleChange}
            />
        </div>
        <div className="flex flex-col gap-1">
            <label className='text-sm text-gray-50' htmlFor="lastName">
              Last Name
            <span className='text-[12px] text-red-600 ml-5'>{showError("lastName")}</span>
            </label>
            <input 
            className='px-4 py-2 outline-none rounded-lg'
            type="text" 
            name="lastName" 
            id="lastName" 
            value={Formik.values.lastName}
            onChange={Formik.handleChange}
            />
        </div>
        <div className="flex flex-col gap-1">
            <label className='text-sm text-gray-50' htmlFor="email">
              E-Mail
            <span className='text-[12px] text-red-600 ml-5'>{showError("email")}</span>
            </label>
            <input 
            className='px-4 py-2 outline-none rounded-lg'
            type="email" 
            name="email" 
            id="email" 
            value={Formik.values.email}
            onChange={Formik.handleChange}
            />
        </div>
        <div className="flex flex-col gap-1">
            <label className='text-sm text-gray-50' htmlFor="password">
              Password
            <span className='text-[12px] text-red-600 ml-5'>{showError("password")}</span>
            </label>
            <input 
            className='px-4 py-2 outline-none rounded-lg'
            type="password" 
            name="password" 
            id="password" 
            value={Formik.values.password}
            onChange={Formik.handleChange}
            />
        </div>
        <div className="flex flex-col gap-1">
            <label className='text-sm text-gray-50' htmlFor="birthDate">
              Birth Date
            <span className='text-[12px] text-red-600 ml-5'>{showError("birthDate")}</span>
            </label>
            <input 
            className='px-4 py-2 outline-none rounded-lg'
            type="date" 
            name="birthDate" 
            id="birthDate" 
            value={Formik.values.birthDate}
            onChange={Formik.handleChange}
            />
        </div>
        <div className="flex flex-col gap-1">
            <label className='text-sm text-gray-50' htmlFor="gender">
              Gender
            <span className='text-[12px] text-red-600 ml-5'>{showError("gender")}</span>
            </label>
            <select 
            className='px-4 py-2 outline-none rounded-lg' 
            name="gender" 
            id="gender"
            value={Formik.values.gender}
            onChange={Formik.handleChange}
            >
              <option value="" defaultChecked>Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
        </div>
        <div className="flex flex-col gap-1">
            <label className='text-sm text-gray-50' htmlFor="image">
              Image
            <span className='text-[12px] text-red-600 ml-5'>{showError("image")}</span>
            </label>
            <input 
            className='px-4 py-2 outline-none rounded-lg'
            type="file" 
            name="image" 
            id="image" 
            accept='image/png, image/jpg, image/jpeg'
            // value={Formik.values.image}
            onChange={(e) => {
                return Formik.setFieldValue(e.target.name, e.target.files[0])
            }}
            />
        </div>

        <button
        type='submit' 
        className='mt-4 w-full py-3 bg-blue-600 rounded-lg text-gray-50 text-lg'
        >
          Register
        </button>
    </form>
  )
}

export default FormComponent