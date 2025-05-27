export default function Step2StudyInfo({ next, back, data, update }) {
    const handleSubmit = (e) => {
        e.preventDefault()
        next()
    }

    return (
        <form onSubmit={handleSubmit} className="auth-form box-style">
            <label>
                In which university are you studying?
                <input
                    type="text"
                    value={data.university}
                    onChange={(e) => update({ university: e.target.value })}
                    required
                />
            </label>

            <label>
                What are you studying?
                <input
                    type="text"
                    value={data.field}
                    onChange={(e) => update({ field: e.target.value })}
                    required
                />
            </label>

            <label>
                In which academic year are you currently?
                <select
                    value={data.year}
                    onChange={(e) => update({ year: e.target.value })}
                    required
                >
                    <option value="">Select year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                    <option value="master">Master’s</option>
                    <option value="phd">PhD</option>
                </select>
            </label>

            <label>
                Availability:
                <select
                    value={data.availability || ''}
                    onChange={e => update({ availability: e.target.value })}
                    required
                >
                    <option value="">Select availability</option>
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                </select>
            </label>

            <div className="form-nav">
                <button type="button" onClick={back}>Back</button>
                <button type="submit">Next</button>
            </div>
        </form>


    )
}
