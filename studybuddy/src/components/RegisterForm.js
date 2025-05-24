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

    // Registration handler for final step
    const handleRegister = async () => {
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: formData.name,
                    email: formData.email,
                    password: formData.password,
                    university: formData.university,
                    field: formData.field,
                    year: formData.year,
                    courses: formData.courses,
                    interests: formData.interests,
                    environment: formData.environment,
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                alert(data.message || 'Registration failed');
                return false;
            }
            // Redirect to login page after successful registration
            alert('Registration successful! Please log in.');
            window.location.href = '/login';
            return true;
        } catch (err) {
            alert('Something went wrong during registration.');
            return false;
        }
    };

    // Step navigation
    const nextStep = async () => {
        setStep(prev => prev + 1);
    }

    const prevStep = () => setStep(prev => prev - 1)

    const updateForm = (fields) => {
        setFormData(prev => ({
            ...prev,
            ...fields,
        }))
    }

    // Called when user clicks Finish on Step 4
    const handleFinish = async () => {
        await handleRegister();
    }

    const steps = {
        1: <Step1BasicInfo next={nextStep} data={formData} update={updateForm} />,
        2: <Step2StudyInfo next={nextStep} back={prevStep} data={formData} update={updateForm} />,
        3: <Step3StudyInterests next={nextStep} back={prevStep} data={formData} update={updateForm} />,
        4: <Step4UploadPhoto back={prevStep} data={formData} update={updateForm} onFinish={handleFinish} />, // Pass onFinish
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
