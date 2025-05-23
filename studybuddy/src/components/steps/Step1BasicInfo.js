import { useState, useEffect } from 'react'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

export default function Step1BasicInfo({ next, data, update }) {
    const [rules, setRules] = useState({})
    const [confirmError, setConfirmError] = useState(null)
    const [touched, setTouched] = useState({})

    const validatePassword = (password) => {
        return {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            number: /[0-9]/.test(password)
        }
    }

    useEffect(() => {
        if (touched.password) {
            setRules(validatePassword(data.password || ''))
        }

        if (touched.confirmPassword) {
            setConfirmError(
                data.password !== data.confirmPassword ? 'Passwords do not match.' : null
            )
        }
    }, [data.password, data.confirmPassword, touched])

    const handleChange = (e) => {
        const { name, value } = e.target
        update({ [name]: value })
        setTouched((prev) => ({ ...prev, [name]: true }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const passRules = validatePassword(data.password || '')
        const allValid = Object.values(passRules).every(Boolean)
        const confirmValid = data.password === data.confirmPassword

        if (allValid && confirmValid) {
            next()
        } else {
            setTouched({ password: true, confirmPassword: true })
            setRules(passRules)
            setConfirmError(confirmValid ? null : 'Passwords do not match.')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <label className="form-label">
                Full Name:
                <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    required
                />
            </label>

            <label className="form-label">
                E-mail:
                <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    required
                />
            </label>

            <label className="form-label">
                Password:
                <input
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    required
                />
            </label>

            {touched.password && (
                <ul className="form-errors">
                    <li style={{ color: rules.length ? 'green' : 'crimson' }}>
                        {rules.length ? <FaCheckCircle /> : <FaTimesCircle />} Password must be at least 8 characters.
                    </li>
                    <li style={{ color: rules.uppercase ? 'green' : 'crimson' }}>
                        {rules.uppercase ? <FaCheckCircle /> : <FaTimesCircle />} Must include at least one uppercase letter.
                    </li>
                    <li style={{ color: rules.number ? 'green' : 'crimson' }}>
                        {rules.number ? <FaCheckCircle /> : <FaTimesCircle />} Must include at least one number.
                    </li>
                </ul>
            )}

            <label className="form-label">
                Confirm Password:
                <input
                    type="password"
                    name="confirmPassword"
                    value={data.confirmPassword}
                    onChange={handleChange}
                    required
                />
            </label>
            {touched.confirmPassword && confirmError && (
                <div className="form-errors">
                    <p style={{ color: 'crimson' }}>{confirmError}</p>
                </div>
            )}

            <div className="terms">
                <input id="terms" type="checkbox" required />
                <label htmlFor="terms">
                    I accept the <a href="#">terms & conditions</a>.
                </label>
            </div>

            <button type="submit">Next</button>
        </form>
    )
}
