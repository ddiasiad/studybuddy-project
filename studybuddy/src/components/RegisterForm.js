import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Step1BasicInfo from './steps/Step1BasicInfo'
import Step2StudyInfo from './steps/Step2StudyInfo'
import Step3StudyInterests from './steps/Step3StudyInterests'
import Step4UploadPhoto from './steps/Step4UploadPhoto'

export default function RegistrationForm() {
    const [step, setStep] = useState(1)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        university: '',
        field: '',
        year: '',
        courses: '',
        interests: '',
        environment: '',
        photo: null,
    })

    const nextStep = () => setStep(prev => prev + 1)
    const prevStep = () => setStep(prev => prev - 1)

    const updateForm = (fields) => {
        setFormData(prev => ({
            ...prev,
            ...fields,
        }))
    }

    const steps = {
        1: <Step1BasicInfo next={nextStep} data={formData} update={updateForm} />,
        2: <Step2StudyInfo next={nextStep} back={prevStep} data={formData} update={updateForm} />,
        3: <Step3StudyInterests next={nextStep} back={prevStep} data={formData} update={updateForm} />,
        4: <Step4UploadPhoto back={prevStep} data={formData} update={updateForm} />,
    }

    return (
        <div>
            <div className="form-header">
                <h2 className="form-title">
                    {step === 1 && "Become a Study Buddy"}
                    {step === 2 && "Welcome Sarah!"}
                    {step === 3 && "Study Interests"}
                    {step === 4 && "Upload Your Photo"}
                </h2>

            </div>


            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                >
                    {steps[step]}

                    {/* ✅ Show dots only on step 2, 3, 4 */}
                    {step > 1 && (
                        <div className="step-dots">
                            {[2, 3, 4].map((s) => (
                                <span
                                    key={s}
                                    className={`dot ${step === s ? 'active' : ''}`}
                                />
                            ))}
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

        </div>
    )
}
