import { useRef, useState, useEffect } from 'react'
import { FaCamera } from 'react-icons/fa'
import { saveProfile } from '@/utils/api'; 

export default function Step4UploadPhoto({ back, data, update }) {
    const fileInputRef = useRef()
    const [preview, setPreview] = useState(null)

    useEffect(() => {
        
        if (data.photo) {
            const file = data.photo
            const url = typeof file === 'string' ? file : URL.createObjectURL(file)
            setPreview(url)

            // Cleanup object URL if not a string
            return () => {
                if (typeof file !== 'string') {
                    URL.revokeObjectURL(url)
                }
            }
        }
    }, [data.photo])

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent form reload
    
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You must be logged in');
            return;
        }
    
        const profileData = {
            academicYear: data.academicYear,
            courses: data.courses,
            studyPreferences: data.studyPreferences,
            availability: data.availability,
            studyInterests: data.studyInterests,
            studyEnvironment: data.studyEnvironment,
            // photo: data.photo  // only include this if you handle image uploads separately
        };
    
        try {
            const response = await saveProfile(profileData, token);
            console.log('✅ Profile saved:', response);
            alert('Profile saved successfully!');
        } catch (error) {
            console.error('❌ Error saving profile:', error.message);
            alert('Failed to save profile: ' + error.message);
        }
    };
    

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            update({ photo: file }) // store actual File in formData
        }
    }

    return (
        <form className="auth-form photo-upload-form" onSubmit={handleSubmit}>

            <p className="form-subtitle">
                Upload a photo to complete your profile. This helps other study buddies recognize you.
            </p>

            <div className="photo-upload">
                <div
                    className="photo-icon-wrapper"
                    onClick={() => fileInputRef.current.click()}
                >
                    {preview ? (
                        <img src={preview} alt="Preview" className="profile-preview" />
                    ) : (
                        <FaCamera size={50} />
                    )}
                </div>

                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />

                <p
                    className="upload-link"
                    onClick={() => fileInputRef.current.click()}
                >
                    Upload from device
                </p>
            </div>

            <div className="form-nav">
                <button type="button" onClick={back}>Back</button>
                <button type="submit">Finish</button>
            </div>
        </form>
    )
}

