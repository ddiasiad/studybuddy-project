import { useState } from 'react'

export default function Step3StudyInterests({ next, back, data, update }) {
    const [courseInput, setCourseInput] = useState('')
    const [courses, setCourses] = useState(
        data.courses?.split(',').filter(Boolean) || []
    )

    const [interestInput, setInterestInput] = useState('')
    const [interests, setInterests] = useState(
        data.interests?.split(',').filter(Boolean) || []
    )


    const handleAddCourse = () => {
        if (courseInput.trim() && !courses.includes(courseInput.trim())) {
            const updatedCourses = [...courses, courseInput.trim()]
            setCourses(updatedCourses)
            update({ courses: updatedCourses.join(',') })
            setCourseInput('')
        }
    }

    const handleRemoveCourse = (course) => {
        const updatedCourses = courses.filter((c) => c !== course)
        setCourses(updatedCourses)
        update({ courses: updatedCourses.join(',') })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        next()
    }

    const handleAddInterest = () => {
        if (interestInput.trim() && !interests.includes(interestInput.trim())) {
            const updated = [...interests, interestInput.trim()]
            setInterests(updated)
            update({ interests: updated.join(',') })
            setInterestInput('')
        }
    }

    const handleRemoveInterest = (item) => {
        const updated = interests.filter((i) => i !== item)
        setInterests(updated)
        update({ interests: updated.join(',') })
    }


    return (
        <form onSubmit={handleSubmit} className="auth-form box-style">
            {/*<h2 className="form-title">Study Interests</h2>*/}
            <p className="form-subtitle">
                Tell us a little about what you’re studying — and how you prefer to study.
            </p>

            <label>
                Where are your current courses?
                <div className="course-input-group">
                    <input
                        type="text"
                        placeholder="Add a new class"
                        value={courseInput}
                        onChange={(e) => setCourseInput(e.target.value)}
                    />
                    <button type="button" onClick={handleAddCourse}>+</button>
                </div>
                <div className="course-tags">
                    {courses.map((course) => (
                        <span key={course} className="course-tag">
              {course}
                            <button
                                type="button"
                                className="tag-remove"
                                onClick={() => handleRemoveCourse(course)}
                            >
  ×
</button>

            </span>
                    ))}
                </div>
            </label>

            <label>
                What are your subjects of interest?
                <div className="course-input-group">
                    <input
                        type="text"
                        placeholder="e.g. AI, Economics"
                        value={interestInput}
                        onChange={(e) => setInterestInput(e.target.value)}
                    />
                    <button type="button" onClick={handleAddInterest}>+</button>
                </div>
                <div className="course-tags">
                    {interests.map((interest) => (
                        <span key={interest} className="course-tag">
        {interest}
                            <button
                                type="button"
                                className="tag-remove"
                                onClick={() => handleRemoveInterest(interest)}
                            >
  ×
</button>

      </span>
                    ))}
                </div>
            </label>


            <label>
                Do you prefer any specific study environment?
                <div className="checkbox-group">
                    {["On-Campus", "Online", "Group-Setting", "One-to-One"].map((label) => {
                        const value = label.toLowerCase().replace(/ /g, '-')
                        const selected = data.environment?.split(',')?.includes(value)

                        return (
                            <label key={value} className="checkbox-option">
                                <input
                                    type="checkbox"
                                    value={value}
                                    checked={selected}
                                    onChange={(e) => {
                                        let updated = data.environment?.split(',').filter(Boolean) || []

                                        if (e.target.checked) {
                                            updated.push(value)
                                        } else {
                                            updated = updated.filter((item) => item !== value)
                                        }

                                        update({ environment: updated.join(',') })
                                    }}
                                />
                                {label}
                            </label>
                        )
                    })}
                </div>
            </label>



            <div className="form-nav">
                <button type="button" onClick={back}>Back</button>
                <button type="submit">Next</button>
            </div>
        </form>
    )
}
